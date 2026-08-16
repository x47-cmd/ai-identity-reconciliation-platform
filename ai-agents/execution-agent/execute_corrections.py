import argparse
import csv
import json
from copy import deepcopy
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Execution Agent
# Version: 0.1
#
# PURPOSE:
#
# Execute ONLY corrections that have passed:
#
# Monitoring Officer Approval
#           +
# Manager Approval
#
# The Master Reference System is NEVER modified.
#
# The synthetic source biometric dataset is also preserved.
# Approved changes are applied to a runtime copy.
#
# Synthetic Demo Only
# ============================================================


REPO_ROOT = (
    Path(__file__)
    .resolve()
    .parent
    .parent
    .parent
)


# ============================================================
# INPUT FILES
# ============================================================

SOURCE_BIOMETRIC_FILE = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
    / "biometric_records.csv"
)


APPROVAL_STATE_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "approval-workflow-agent"
    / "output"
    / "approval_state.json"
)


# ============================================================
# OUTPUT FILES
# ============================================================

OUTPUT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    / "output"
)


RUNTIME_BIOMETRIC_FILE = (
    OUTPUT_DIR
    / "biometric_records_runtime.csv"
)


EXECUTION_RESULTS_FILE = (
    OUTPUT_DIR
    / "execution_results.csv"
)


EXECUTION_AUDIT_FILE = (
    OUTPUT_DIR
    / "execution_audit.json"
)


EXECUTION_SUMMARY_FILE = (
    OUTPUT_DIR
    / "execution_summary.json"
)


# ============================================================
# HELPERS
# ============================================================

def now():

    return datetime.now().isoformat(
        timespec="seconds"
    )


def parse_bool(value):

    return str(
        value
    ).strip().lower() in {
        "true",
        "1",
        "yes",
        "y",
    }


def load_json(path):

    if not path.exists():

        raise FileNotFoundError(
            f"Required file not found:\n"
            f"{path}"
        )

    with path.open(
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


def save_json(
    path,
    data
):

    path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with path.open(
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            indent=4
        )


def load_csv(path):

    if not path.exists():

        raise FileNotFoundError(
            f"Required file not found:\n"
            f"{path}"
        )

    with path.open(
        "r",
        encoding="utf-8",
        newline=""
    ) as file:

        return list(
            csv.DictReader(file)
        )


def write_csv(
    path,
    rows
):

    path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    if not rows:

        with path.open(
            "w",
            encoding="utf-8"
        ) as file:

            file.write("")

        return


    fieldnames = []

    for row in rows:

        for key in row.keys():

            if key not in fieldnames:

                fieldnames.append(
                    key
                )


    with path.open(
        "w",
        encoding="utf-8",
        newline=""
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()

        writer.writerows(
            rows
        )


# ============================================================
# BUILD RUNTIME COPY
# ============================================================

def create_runtime_dataset(
    force=False
):

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    if (
        RUNTIME_BIOMETRIC_FILE.exists()
        and
        not force
    ):

        print(
            "Runtime biometric dataset "
            "already exists."
        )

        return


    source_records = load_csv(
        SOURCE_BIOMETRIC_FILE
    )


    runtime_records = deepcopy(
        source_records
    )


    write_csv(
        RUNTIME_BIOMETRIC_FILE,
        runtime_records
    )


    print(
        f"Runtime biometric dataset created: "
        f"{len(runtime_records)} records."
    )


# ============================================================
# RECORD LOOKUP
# ============================================================

def build_biometric_index(
    records
):

    return {

        record[
            "biometric_id"
        ]:
            record

        for record
        in records
    }


# ============================================================
# AUTHORIZATION CHECK
# ============================================================

def validate_authorization(
    case
):

    checks = {

        "officer_approved":
            (
                case.get(
                    "officer_decision"
                )
                ==
                "APPROVED"
            ),

        "manager_approved":
            (
                case.get(
                    "manager_decision"
                )
                ==
                "APPROVED"
            ),

        "authorized_flag":
            parse_bool(
                case.get(
                    "authorized_for_execution"
                )
            ),

        "workflow_authorized":
            (
                case.get(
                    "workflow_status"
                )
                ==
                "AUTHORIZED_FOR_EXECUTION"
            ),

        "execution_authorized":
            (
                case.get(
                    "execution_status"
                )
                ==
                "AUTHORIZED"
            ),
    }


    authorized = all(
        checks.values()
    )


    return (
        authorized,
        checks
    )


# ============================================================
# EXECUTION AUDIT EVENT
# ============================================================

def add_execution_audit(
    events,
    case_id,
    action,
    status,
    target_record="",
    field="",
    before="",
    after="",
    message="",
):

    events.append({

        "event_id":
            f"EXEC-AUD-{len(events) + 1:06d}",

        "case_id":
            case_id,

        "actor_type":
            "AI_AGENT",

        "actor_name":
            "Execution Agent",

        "action":
            action,

        "status":
            status,

        "target_system":
            "BIOMETRIC_SYSTEM",

        "target_record":
            target_record,

        "field":
            field,

        "before":
            before,

        "after":
            after,

        "message":
            message,

        "timestamp":
            now(),
    })


# ============================================================
# REASSIGN BIOMETRIC IDENTITY
# ============================================================

def execute_reassignment(
    case,
    biometric_index
):

    target_record_id = (
        case.get(
            "correction_target_record",
            ""
        )
    )


    field_name = (
        case.get(
            "correction_field",
            ""
        )
    )


    proposed_before = (
        case.get(
            "correction_before",
            ""
        )
    )


    proposed_after = (
        case.get(
            "correction_after",
            ""
        )
    )


    if not target_record_id:

        return {

            "success":
                False,

            "status":
                "FAILED",

            "message":
                "Correction target record is missing.",
        }


    if (
        target_record_id
        not in biometric_index
    ):

        return {

            "success":
                False,

            "status":
                "FAILED",

            "message":
                (
                    "Target biometric record "
                    "does not exist."
                ),
        }


    if (
        field_name
        !=
        "linked_master_id"
    ):

        return {

            "success":
                False,

            "status":
                "FAILED",

            "message":
                (
                    "Execution Agent only permits "
                    "authorized linked_master_id "
                    "reassignment in v0.1."
                ),
        }


    if not proposed_after:

        return {

            "success":
                False,

            "status":
                "FAILED",

            "message":
                "Proposed new identity is missing.",
        }


    record = biometric_index[
        target_record_id
    ]


    actual_before = (
        record.get(
            field_name,
            ""
        )
    )


    # --------------------------------------------------------
    # Safety check:
    # Runtime state must still match the state reviewed
    # by the Officer and Manager.
    # --------------------------------------------------------

    if (
        proposed_before
        and
        actual_before
        !=
        proposed_before
    ):

        return {

            "success":
                False,

            "status":
                "STATE_CHANGED",

            "before":
                actual_before,

            "after":
                proposed_after,

            "message":
                (
                    "Runtime record changed after approval. "
                    "Execution stopped to prevent applying "
                    "a stale correction."
                ),
        }


    record[
        field_name
    ] = proposed_after


    record[
        "updated_at"
    ] = now()


    return {

        "success":
            True,

        "status":
            "COMPLETED",

        "before":
            actual_before,

        "after":
            proposed_after,

        "message":
            (
                f"{target_record_id} reassigned "
                f"from {actual_before} "
                f"to {proposed_after}."
            ),
    }


# ============================================================
# EXECUTE ONE CASE
# ============================================================

def execute_case(
    case,
    biometric_index,
    audit_events
):

    case_id = case[
        "case_id"
    ]


    authorized, checks = (
        validate_authorization(
            case
        )
    )


    if not authorized:

        add_execution_audit(
            events=audit_events,
            case_id=case_id,
            action="EXECUTION_BLOCKED",
            status="NOT_AUTHORIZED",
            target_record=case.get(
                "correction_target_record",
                ""
            ),
            field=case.get(
                "correction_field",
                ""
            ),
            before=case.get(
                "correction_before",
                ""
            ),
            after=case.get(
                "correction_after",
                ""
            ),
            message=(
                "Execution blocked because required "
                "human approvals were not satisfied."
            ),
        )


        return {

            "case_id":
                case_id,

            "proposed_action":
                case.get(
                    "proposed_action",
                    ""
                ),

            "target_record":
                case.get(
                    "correction_target_record",
                    ""
                ),

            "execution_status":
                "NOT_AUTHORIZED",

            "before":
                case.get(
                    "correction_before",
                    ""
                ),

            "after":
                case.get(
                    "correction_after",
                    ""
                ),

            "authorization_checks":
                json.dumps(
                    checks
                ),

            "message":
                (
                    "Required Officer and Manager "
                    "approvals were not completed."
                ),

            "executed_at":
                "",
        }


    action = case.get(
        "proposed_action",
        ""
    )


    # ========================================================
    # REASSIGNMENT
    # ========================================================

    if (
        action
        ==
        "REASSIGN_BIOMETRIC_IDENTITY"
    ):

        result = execute_reassignment(
            case,
            biometric_index
        )


        execution_status = (
            result[
                "status"
            ]
        )


        if result[
            "success"
        ]:

            case[
                "execution_status"
            ] = "COMPLETED"

            case[
                "workflow_status"
            ] = (
                "EXECUTED_PENDING_VERIFICATION"
            )

            case[
                "executed_at"
            ] = now()


        else:

            case[
                "execution_status"
            ] = execution_status

            case[
                "workflow_status"
            ] = (
                "EXECUTION_EXCEPTION"
            )


        case[
            "updated_at"
        ] = now()


        add_execution_audit(
            events=audit_events,
            case_id=case_id,
            action=action,
            status=execution_status,
            target_record=case.get(
                "correction_target_record",
                ""
            ),
            field=case.get(
                "correction_field",
                ""
            ),
            before=result.get(
                "before",
                case.get(
                    "correction_before",
                    ""
                )
            ),
            after=result.get(
                "after",
                case.get(
                    "correction_after",
                    ""
                )
            ),
            message=result[
                "message"
            ],
        )


        return {

            "case_id":
                case_id,

            "proposed_action":
                action,

            "target_record":
                case.get(
                    "correction_target_record",
                    ""
                ),

            "execution_status":
                execution_status,

            "before":
                result.get(
                    "before",
                    ""
                ),

            "after":
                result.get(
                    "after",
                    ""
                ),

            "authorization_checks":
                json.dumps(
                    checks
                ),

            "message":
                result[
                    "message"
                ],

            "executed_at":
                (
                    now()
                    if result[
                        "success"
                    ]
                    else ""
                ),
        }


    # ========================================================
    # ACTION REQUIRES HUMAN / SPECIAL HANDLING
    # ========================================================

    case[
        "execution_status"
    ] = (
        "MANUAL_ACTION_REQUIRED"
    )


    case[
        "workflow_status"
    ] = (
        "MANUAL_ACTION_REQUIRED"
    )


    case[
        "updated_at"
    ] = now()


    message = (
        f"Action {action} is not automatically "
        f"executed by Execution Agent v0.1."
    )


    add_execution_audit(
        events=audit_events,
        case_id=case_id,
        action=action,
        status="MANUAL_ACTION_REQUIRED",
        target_record=case.get(
            "correction_target_record",
            ""
        ),
        field=case.get(
            "correction_field",
            ""
        ),
        before=case.get(
            "correction_before",
            ""
        ),
        after=case.get(
            "correction_after",
            ""
        ),
        message=message,
    )


    return {

        "case_id":
            case_id,

        "proposed_action":
            action,

        "target_record":
            case.get(
                "correction_target_record",
                ""
            ),

        "execution_status":
            "MANUAL_ACTION_REQUIRED",

        "before":
            case.get(
                "correction_before",
                ""
            ),

        "after":
            case.get(
                "correction_after",
                ""
            ),

        "authorization_checks":
            json.dumps(
                checks
            ),

        "message":
            message,

        "executed_at":
            "",
    }


# ============================================================
# EXECUTE ALL AUTHORIZED CASES
# ============================================================

def execute_authorized_cases():

    print()
    print(
        "============================================"
    )

    print(
        " AI Identity Reconciliation Platform"
    )

    print(
        " Execution Agent v0.1"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    create_runtime_dataset(
        force=False
    )


    approval_states = load_json(
        APPROVAL_STATE_FILE
    )


    biometric_records = load_csv(
        RUNTIME_BIOMETRIC_FILE
    )


    biometric_index = (
        build_biometric_index(
            biometric_records
        )
    )


    audit_events = []

    if EXECUTION_AUDIT_FILE.exists():

        audit_events = load_json(
            EXECUTION_AUDIT_FILE
        )


    results = []


    authorized_cases = [

        case

        for case in approval_states

        if parse_bool(
            case.get(
                "authorized_for_execution"
            )
        )
    ]


    print(
        f"\nAuthorized Cases Found: "
        f"{len(authorized_cases)}"
    )


    for case in authorized_cases:

        result = execute_case(
            case,
            biometric_index,
            audit_events
        )

        results.append(
            result
        )


    # ========================================================
    # SAVE RUNTIME BIOMETRIC DATA
    # ========================================================

    write_csv(
        RUNTIME_BIOMETRIC_FILE,
        biometric_records
    )


    # ========================================================
    # SAVE UPDATED APPROVAL / WORKFLOW STATE
    # ========================================================

    save_json(
        APPROVAL_STATE_FILE,
        approval_states
    )


    # ========================================================
    # SAVE EXECUTION RESULTS
    # ========================================================

    write_csv(
        EXECUTION_RESULTS_FILE,
        results
    )


    save_json(
        EXECUTION_AUDIT_FILE,
        audit_events
    )


    # ========================================================
    # SUMMARY
    # ========================================================

    completed = sum(

        1

        for result in results

        if result[
            "execution_status"
        ]
        ==
        "COMPLETED"
    )


    failed = sum(

        1

        for result in results

        if result[
            "execution_status"
        ]
        in {
            "FAILED",
            "STATE_CHANGED",
        }
    )


    manual = sum(

        1

        for result in results

        if result[
            "execution_status"
        ]
        ==
        "MANUAL_ACTION_REQUIRED"
    )


    summary = {

        "project":
            "AI Identity Reconciliation Platform",

        "agent":
            "Execution Agent v0.1",

        "authorized_cases":
            len(
                authorized_cases
            ),

        "executions_completed":
            completed,

        "execution_failures":
            failed,

        "manual_action_required":
            manual,

        "master_reference_modified":
            False,

        "source_biometric_dataset_modified":
            False,

        "runtime_biometric_dataset":
            str(
                RUNTIME_BIOMETRIC_FILE
            ),

        "audit_events":
            len(
                audit_events
            ),

        "generated_at":
            now(),
    }


    save_json(
        EXECUTION_SUMMARY_FILE,
        summary
    )


    # ========================================================
    # DISPLAY
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " EXECUTION SUMMARY"
    )

    print(
        "============================================"
    )


    print(
        f"\nAuthorized Cases: "
        f"{summary['authorized_cases']}"
    )

    print(
        f"Completed Corrections: "
        f"{summary['executions_completed']}"
    )

    print(
        f"Execution Failures: "
        f"{summary['execution_failures']}"
    )

    print(
        f"Manual Action Required: "
        f"{summary['manual_action_required']}"
    )


    print()
    print(
        "Master Reference Modified:"
    )

    print(
        "FALSE"
    )


    print()
    print(
        "Original Biometric Dataset Modified:"
    )

    print(
        "FALSE"
    )


    print()
    print(
        "Approved changes were applied only "
        "to the synthetic runtime dataset."
    )


    if results:

        print()
        print(
            "Execution Results:"
        )


        for result in results:

            print()

            print(
                f"{result['case_id']} | "
                f"{result['execution_status']}"
            )

            print(
                f"Action: "
                f"{result['proposed_action']}"
            )

            print(
                f"Record: "
                f"{result['target_record']}"
            )

            print(
                f"Before: "
                f"{result['before']}"
            )

            print(
                f"After: "
                f"{result['after']}"
            )

            print(
                f"Message: "
                f"{result['message']}"
            )


    print()
    print(
        "Output:"
    )

    print(
        f" - {RUNTIME_BIOMETRIC_FILE}"
    )

    print(
        f" - {EXECUTION_RESULTS_FILE}"
    )

    print(
        f" - {EXECUTION_AUDIT_FILE}"
    )

    print(
        f" - {EXECUTION_SUMMARY_FILE}"
    )

    print()


# ============================================================
# STATUS
# ============================================================

def display_status():

    if not EXECUTION_SUMMARY_FILE.exists():

        print(
            "\nExecution Agent has not "
            "performed a run yet."
        )

        return


    summary = load_json(
        EXECUTION_SUMMARY_FILE
    )


    print()
    print(
        "============================================"
    )

    print(
        " EXECUTION AGENT STATUS"
    )

    print(
        "============================================"
    )


    for key, value in (
        summary.items()
    ):

        print(
            f"{key}: {value}"
        )


    print()


# ============================================================
# RESET RUNTIME ENVIRONMENT
# ============================================================

def reset_runtime():

    print()
    print(
        "Resetting synthetic runtime "
        "biometric dataset..."
    )


    create_runtime_dataset(
        force=True
    )


    if EXECUTION_RESULTS_FILE.exists():

        EXECUTION_RESULTS_FILE.unlink()


    if EXECUTION_AUDIT_FILE.exists():

        EXECUTION_AUDIT_FILE.unlink()


    if EXECUTION_SUMMARY_FILE.exists():

        EXECUTION_SUMMARY_FILE.unlink()


    print(
        "Runtime execution environment reset."
    )

    print()


# ============================================================
# COMMAND LINE
# ============================================================

def main():

    parser = argparse.ArgumentParser(
        description=(
            "AI Identity Reconciliation "
            "Execution Agent"
        )
    )


    subparsers = (
        parser.add_subparsers(
            dest="command"
        )
    )


    subparsers.add_parser(
        "execute",
        help=(
            "Execute all fully authorized "
            "synthetic corrections."
        )
    )


    subparsers.add_parser(
        "status",
        help=(
            "Display execution status."
        )
    )


    subparsers.add_parser(
        "reset",
        help=(
            "Reset synthetic runtime "
            "execution environment."
        )
    )


    args = parser.parse_args()


    if args.command == "execute":

        execute_authorized_cases()


    elif args.command == "status":

        display_status()


    elif args.command == "reset":

        reset_runtime()


    else:

        parser.print_help()


if __name__ == "__main__":
    main()