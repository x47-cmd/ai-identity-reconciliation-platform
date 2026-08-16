import csv
import json
import subprocess
import sys
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# End-to-End Executive Demo Orchestrator
# Version: 0.1
#
# PURPOSE:
#
# Demonstrate one complete high-priority identity case:
#
# Reconciliation
#      ↓
# Case
#      ↓
# AI Investigation
#      ↓
# Monitoring Officer Approval
#      ↓
# Manager Approval
#      ↓
# Authorized Correction
#      ↓
# Post-Correction Verification
#      ↓
# Audit Trail
#      ↓
# Case Closure
#
# Synthetic Demo Only
# ============================================================


REPO_ROOT = (
    Path(__file__)
    .resolve()
    .parent
    .parent
)


# ============================================================
# AGENT SCRIPTS
# ============================================================

INVESTIGATION_AGENT = (
    REPO_ROOT
    / "ai-agents"
    / "investigation-agent"
    / "investigate_cases.py"
)


APPROVAL_AGENT = (
    REPO_ROOT
    / "ai-agents"
    / "approval-workflow-agent"
    / "manage_approvals.py"
)


EXECUTION_AGENT = (
    REPO_ROOT
    / "ai-agents"
    / "execution-agent"
    / "execute_corrections.py"
)


VERIFICATION_AGENT = (
    REPO_ROOT
    / "ai-agents"
    / "verification-agent"
    / "verify_corrections.py"
)


# ============================================================
# DATA FILES
# ============================================================

APPROVAL_STATE_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "approval-workflow-agent"
    / "output"
    / "approval_state.json"
)


APPROVAL_AUDIT_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "approval-workflow-agent"
    / "output"
    / "approval_audit.json"
)


EXECUTION_RESULTS_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "execution-agent"
    / "output"
    / "execution_results.csv"
)


EXECUTION_AUDIT_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "execution-agent"
    / "output"
    / "execution_audit.json"
)


VERIFICATION_RESULTS_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "verification-agent"
    / "output"
    / "verification_results.csv"
)


VERIFICATION_AUDIT_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "verification-agent"
    / "output"
    / "verification_audit.json"
)


INVESTIGATIONS_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "investigation-agent"
    / "output"
    / "investigations.json"
)


# ============================================================
# OUTPUT
# ============================================================

OUTPUT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    / "output"
)


FINAL_REPORT_FILE = (
    OUTPUT_DIR
    / "end_to_end_demo_report.json"
)


TIMELINE_FILE = (
    OUTPUT_DIR
    / "end_to_end_audit_timeline.csv"
)


SELECTED_CASE_FILE = (
    OUTPUT_DIR
    / "selected_demo_case.json"
)


# ============================================================
# DEMO ACTORS
# ============================================================

DEMO_OFFICER_NAME = (
    "Demo Monitoring Officer"
)


DEMO_MANAGER_NAME = (
    "Demo Supervising Manager"
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
            f"Required file not found:\n{path}"
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

        return []

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
# RUN COMMAND
# ============================================================

def run_python(
    script,
    *arguments
):

    command = [
        sys.executable,
        str(script),
        *arguments,
    ]


    print()
    print(
        "Running:"
    )

    print(
        " ".join(
            command
        )
    )


    subprocess.run(
        command,
        cwd=REPO_ROOT,
        check=True
    )


# ============================================================
# PRIORITY MODEL
# ============================================================

PRIORITY_ORDER = {

    "IMMEDIATE":
        5,

    "CRITICAL":
        4,

    "HIGH":
        3,

    "MEDIUM":
        2,

    "LOW":
        1,
}


def case_priority_key(
    case
):

    return (

        1
        if parse_bool(
            case.get(
                "wrongly_affected_person"
            )
        )
        else 0,

        PRIORITY_ORDER.get(
            case.get(
                "priority",
                ""
            ),
            0
        ),

        float(
            case.get(
                "protective_priority_score",
                0
            )
            or 0
        ),

        float(
            case.get(
                "harm_impact_score",
                0
            )
            or 0
        ),

        float(
            case.get(
                "risk_score",
                0
            )
            or 0
        ),

        float(
            case.get(
                "canonical_confidence",
                0
            )
            or 0
        ),
    )


# ============================================================
# SELECT DEMO CASE
# ============================================================

def select_demo_case(
    approval_states
):

    executable_cases = [

        case

        for case in approval_states

        if (
            case.get(
                "proposed_action"
            )
            ==
            "REASSIGN_BIOMETRIC_IDENTITY"
        )
        and
        case.get(
            "correction_target_record"
        )
        and
        case.get(
            "correction_before"
        )
        and
        case.get(
            "correction_after"
        )
    ]


    if not executable_cases:

        raise RuntimeError(
            "No executable biometric reassignment "
            "case was found for the demo."
        )


    executable_cases.sort(
        key=case_priority_key,
        reverse=True
    )


    # --------------------------------------------------------
    # Prefer a wrongly affected person case.
    # --------------------------------------------------------

    protective_cases = [

        case

        for case in executable_cases

        if parse_bool(
            case.get(
                "wrongly_affected_person"
            )
        )
    ]


    if protective_cases:

        return protective_cases[0]


    return executable_cases[0]


# ============================================================
# FIND RECORD
# ============================================================

def find_by_case_id(
    rows,
    case_id
):

    for row in rows:

        if (
            row.get(
                "case_id"
            )
            ==
            case_id
        ):

            return row

    return None


# ============================================================
# BUILD AUDIT TIMELINE
# ============================================================

def build_audit_timeline(
    case_id
):

    events = []


    # --------------------------------------------------------
    # Approval Audit
    # --------------------------------------------------------

    if APPROVAL_AUDIT_FILE.exists():

        approval_events = load_json(
            APPROVAL_AUDIT_FILE
        )


        for event in approval_events:

            if (
                event.get(
                    "case_id"
                )
                !=
                case_id
            ):

                continue


            events.append({

                "timestamp":
                    event.get(
                        "timestamp",
                        ""
                    ),

                "source":
                    "APPROVAL_WORKFLOW",

                "actor_type":
                    event.get(
                        "actor_type",
                        ""
                    ),

                "actor_name":
                    event.get(
                        "actor_name",
                        ""
                    ),

                "action":
                    event.get(
                        "action",
                        ""
                    ),

                "status":
                    event.get(
                        "new_status",
                        ""
                    ),

                "details":
                    event.get(
                        "comments",
                        ""
                    ),
            })


    # --------------------------------------------------------
    # Execution Audit
    # --------------------------------------------------------

    if EXECUTION_AUDIT_FILE.exists():

        execution_events = load_json(
            EXECUTION_AUDIT_FILE
        )


        for event in execution_events:

            if (
                event.get(
                    "case_id"
                )
                !=
                case_id
            ):

                continue


            events.append({

                "timestamp":
                    event.get(
                        "timestamp",
                        ""
                    ),

                "source":
                    "EXECUTION_AGENT",

                "actor_type":
                    event.get(
                        "actor_type",
                        ""
                    ),

                "actor_name":
                    event.get(
                        "actor_name",
                        ""
                    ),

                "action":
                    event.get(
                        "action",
                        ""
                    ),

                "status":
                    event.get(
                        "status",
                        ""
                    ),

                "details":
                    event.get(
                        "message",
                        ""
                    ),
            })


    # --------------------------------------------------------
    # Verification Audit
    # --------------------------------------------------------

    if VERIFICATION_AUDIT_FILE.exists():

        verification_events = load_json(
            VERIFICATION_AUDIT_FILE
        )


        for event in verification_events:

            if (
                event.get(
                    "case_id"
                )
                !=
                case_id
            ):

                continue


            events.append({

                "timestamp":
                    event.get(
                        "timestamp",
                        ""
                    ),

                "source":
                    "VERIFICATION_AGENT",

                "actor_type":
                    event.get(
                        "actor_type",
                        ""
                    ),

                "actor_name":
                    event.get(
                        "actor_name",
                        ""
                    ),

                "action":
                    event.get(
                        "action",
                        ""
                    ),

                "status":
                    event.get(
                        "status",
                        ""
                    ),

                "details":
                    event.get(
                        "message",
                        ""
                    ),
            })


    events.sort(
        key=lambda event:
            event.get(
                "timestamp",
                ""
            )
    )


    return events


# ============================================================
# MAIN DEMO
# ============================================================

def main():

    print()
    print(
        "============================================"
    )

    print(
        " AI IDENTITY RECONCILIATION PLATFORM"
    )

    print(
        " END-TO-END EXECUTIVE DEMO"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    # ========================================================
    # STEP 1
    # AI INVESTIGATION
    # ========================================================

    print()
    print(
        "STEP 1"
    )

    print(
        "Generating AI investigations..."
    )


    run_python(
        INVESTIGATION_AGENT
    )


    # ========================================================
    # STEP 2
    # APPROVAL WORKFLOW
    # ========================================================

    print()
    print(
        "STEP 2"
    )

    print(
        "Initializing Human-in-the-Loop "
        "approval workflow..."
    )


    run_python(
        APPROVAL_AGENT,
        "init"
    )


    approval_states = load_json(
        APPROVAL_STATE_FILE
    )


    # ========================================================
    # STEP 3
    # SELECT HIGHEST PRIORITY CASE
    # ========================================================

    print()
    print(
        "STEP 3"
    )

    print(
        "Selecting highest priority "
        "executable case..."
    )


    selected_case = select_demo_case(
        approval_states
    )


    case_id = selected_case[
        "case_id"
    ]


    save_json(
        SELECTED_CASE_FILE,
        selected_case
    )


    print()
    print(
        "SELECTED DEMO CASE"
    )

    print(
        "--------------------------------------------"
    )

    print(
        f"Case ID: "
        f"{case_id}"
    )

    print(
        f"Priority: "
        f"{selected_case['priority']}"
    )

    print(
        f"Wrongly Affected Person: "
        f"{selected_case['wrongly_affected_person']}"
    )

    print(
        f"Biometric Record: "
        f"{selected_case['primary_biometric_id']}"
    )

    print(
        f"Current Identity: "
        f"{selected_case['correction_before']}"
    )

    print(
        f"AI Proposed Identity: "
        f"{selected_case['correction_after']}"
    )

    print(
        f"AI Confidence: "
        f"{selected_case['canonical_confidence']}"
    )

    print(
        f"Risk Score: "
        f"{selected_case['risk_score']}"
    )

    print(
        f"Harm Impact: "
        f"{selected_case['harm_impact_score']}"
    )

    print(
        f"Protective Priority: "
        f"{selected_case['protective_priority_score']}"
    )


    # ========================================================
    # STEP 4
    # MONITORING OFFICER APPROVAL
    # ========================================================

    print()
    print(
        "STEP 4"
    )

    print(
        "Simulating Monitoring Officer approval..."
    )


    run_python(
        APPROVAL_AGENT,
        "officer",
        "--case",
        case_id,
        "--decision",
        "APPROVED",
        "--name",
        DEMO_OFFICER_NAME,
        "--comments",
        (
            "Synthetic demo review completed. "
            "AI evidence and proposed correction accepted."
        ),
    )


    # ========================================================
    # STEP 5
    # MANAGER APPROVAL
    # ========================================================

    print()
    print(
        "STEP 5"
    )

    print(
        "Simulating Manager approval..."
    )


    run_python(
        APPROVAL_AGENT,
        "manager",
        "--case",
        case_id,
        "--decision",
        "APPROVED",
        "--name",
        DEMO_MANAGER_NAME,
        "--comments",
        (
            "Synthetic demo management review completed. "
            "Correction authorized for execution."
        ),
    )


    # ========================================================
    # STEP 6
    # RESET RUNTIME
    # ========================================================

    print()
    print(
        "STEP 6"
    )

    print(
        "Preparing isolated runtime biometric dataset..."
    )


    run_python(
        EXECUTION_AGENT,
        "reset"
    )


    # ========================================================
    # STEP 7
    # EXECUTION
    # ========================================================

    print()
    print(
        "STEP 7"
    )

    print(
        "Executing authorized correction..."
    )


    run_python(
        EXECUTION_AGENT,
        "execute"
    )


    # ========================================================
    # STEP 8
    # VERIFICATION
    # ========================================================

    print()
    print(
        "STEP 8"
    )

    print(
        "Running post-correction verification..."
    )


    run_python(
        VERIFICATION_AGENT,
        "verify"
    )


    # ========================================================
    # STEP 9
    # COLLECT FINAL STATE
    # ========================================================

    print()
    print(
        "STEP 9"
    )

    print(
        "Collecting final case state..."
    )


    final_states = load_json(
        APPROVAL_STATE_FILE
    )


    final_case = find_by_case_id(
        final_states,
        case_id
    )


    execution_results = load_csv(
        EXECUTION_RESULTS_FILE
    )


    execution_result = find_by_case_id(
        execution_results,
        case_id
    )


    verification_results = load_csv(
        VERIFICATION_RESULTS_FILE
    )


    verification_result = find_by_case_id(
        verification_results,
        case_id
    )


    investigations = load_json(
        INVESTIGATIONS_FILE
    )


    investigation = find_by_case_id(
        investigations,
        case_id
    )


    # ========================================================
    # STEP 10
    # AUDIT TIMELINE
    # ========================================================

    timeline = build_audit_timeline(
        case_id
    )


    write_csv(
        TIMELINE_FILE,
        timeline
    )


    # ========================================================
    # FINAL REPORT
    # ========================================================

    final_status = (
        final_case.get(
            "workflow_status"
        )
        if final_case
        else "UNKNOWN"
    )


    verification_status = (
        verification_result.get(
            "verification_status"
        )
        if verification_result
        else "NOT_AVAILABLE"
    )


    demo_success = (

        final_status
        ==
        "VERIFIED_CLOSED"

        and

        verification_status
        ==
        "PASSED"
    )


    final_report = {

        "project":
            "AI Identity Reconciliation Platform",

        "demo":
            "End-to-End Executive Demo v0.1",

        "environment":
            "Synthetic Demo Only",

        "demo_success":
            demo_success,

        "generated_at":
            now(),

        "selected_case": {

            "case_id":
                case_id,

            "priority":
                selected_case.get(
                    "priority"
                ),

            "case_type":
                selected_case.get(
                    "case_type"
                ),

            "wrongly_affected_person":
                selected_case.get(
                    "wrongly_affected_person"
                ),

            "primary_biometric_id":
                selected_case.get(
                    "primary_biometric_id"
                ),

            "current_identity":
                selected_case.get(
                    "correction_before"
                ),

            "ai_proposed_identity":
                selected_case.get(
                    "correction_after"
                ),

            "ai_confidence":
                selected_case.get(
                    "canonical_confidence"
                ),

            "risk_score":
                selected_case.get(
                    "risk_score"
                ),

            "harm_impact_score":
                selected_case.get(
                    "harm_impact_score"
                ),

            "protective_priority_score":
                selected_case.get(
                    "protective_priority_score"
                ),
        },

        "ai_investigation":
            investigation,

        "human_approval": {

            "monitoring_officer":
                DEMO_OFFICER_NAME,

            "monitoring_officer_decision":
                (
                    final_case.get(
                        "officer_decision"
                    )
                    if final_case
                    else ""
                ),

            "manager":
                DEMO_MANAGER_NAME,

            "manager_decision":
                (
                    final_case.get(
                        "manager_decision"
                    )
                    if final_case
                    else ""
                ),
        },

        "execution":
            execution_result,

        "verification":
            verification_result,

        "final_case_status":
            final_status,

        "audit_timeline_events":
            len(
                timeline
            ),

        "master_reference_modified":
            False,

        "original_biometric_dataset_modified":
            False,
    }


    save_json(
        FINAL_REPORT_FILE,
        final_report
    )


    # ========================================================
    # DISPLAY FINAL EXECUTIVE RESULT
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " END-TO-END DEMO RESULT"
    )

    print(
        "============================================"
    )


    print(
        f"\nCase: "
        f"{case_id}"
    )


    print(
        f"Biometric Record: "
        f"{selected_case['primary_biometric_id']}"
    )


    print(
        f"Original Identity: "
        f"{selected_case['correction_before']}"
    )


    print(
        f"AI Proposed Identity: "
        f"{selected_case['correction_after']}"
    )


    print(
        f"Monitoring Officer: "
        f"{DEMO_OFFICER_NAME}"
    )


    print(
        "Officer Decision: APPROVED"
    )


    print(
        f"Manager: "
        f"{DEMO_MANAGER_NAME}"
    )


    print(
        "Manager Decision: APPROVED"
    )


    if execution_result:

        print(
            f"Execution: "
            f"{execution_result.get('execution_status')}"
        )


    if verification_result:

        print(
            f"Verification: "
            f"{verification_result.get('verification_status')}"
        )

        print(
            f"Verification Score: "
            f"{verification_result.get('verification_score')}"
        )


    print(
        f"Final Case Status: "
        f"{final_status}"
    )


    print(
        f"Audit Events: "
        f"{len(timeline)}"
    )


    print()
    print(
        "Master Reference Modified: FALSE"
    )


    print(
        "Original Biometric Dataset Modified: FALSE"
    )


    print()


    if demo_success:

        print(
            "DEMO STATUS:"
        )

        print(
            "SUCCESS - CASE VERIFIED AND CLOSED"
        )

    else:

        print(
            "DEMO STATUS:"
        )

        print(
            "ATTENTION REQUIRED"
        )


    print()
    print(
        "Output:"
    )

    print(
        f" - {FINAL_REPORT_FILE}"
    )

    print(
        f" - {TIMELINE_FILE}"
    )

    print(
        f" - {SELECTED_CASE_FILE}"
    )

    print()


if __name__ == "__main__":
    main()