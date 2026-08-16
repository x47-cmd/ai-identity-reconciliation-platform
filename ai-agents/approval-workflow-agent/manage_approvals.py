import argparse
import csv
import json
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Approval Workflow Agent
# Version: 0.1
#
# PURPOSE:
# Manage Human-in-the-Loop approval workflow:
#
# AI Investigation
#       ↓
# Monitoring Officer Review
#       ↓
# Officer Approval
#       ↓
# Manager Review
#       ↓
# Manager Approval
#       ↓
# Authorized for Execution
#
# IMPORTANT:
# AI cannot approve its own recommendation.
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


INVESTIGATIONS_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "investigation-agent"
    / "output"
    / "investigations.json"
)


OUTPUT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    / "output"
)


APPROVAL_STATE_FILE = (
    OUTPUT_DIR
    / "approval_state.json"
)


OFFICER_QUEUE_FILE = (
    OUTPUT_DIR
    / "officer_review_queue.csv"
)


MANAGER_QUEUE_FILE = (
    OUTPUT_DIR
    / "manager_approval_queue.csv"
)


EXECUTION_QUEUE_FILE = (
    OUTPUT_DIR
    / "authorized_execution_queue.csv"
)


AUDIT_FILE = (
    OUTPUT_DIR
    / "approval_audit.json"
)


SUMMARY_FILE = (
    OUTPUT_DIR
    / "approval_summary.json"
)


# ============================================================
# CONSTANTS
# ============================================================

OFFICER_DECISIONS = {
    "APPROVED",
    "REJECTED",
    "FURTHER_INVESTIGATION",
}


MANAGER_DECISIONS = {
    "APPROVED",
    "REJECTED",
    "RETURNED",
    "FURTHER_INVESTIGATION",
}


PRIORITY_ORDER = {
    "IMMEDIATE": 5,
    "CRITICAL": 4,
    "HIGH": 3,
    "MEDIUM": 2,
    "LOW": 1,
}


# ============================================================
# HELPERS
# ============================================================

def now():

    return datetime.now().isoformat(
        timespec="seconds"
    )


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


def parse_bool(value):

    return str(
        value
    ).strip().lower() in {
        "true",
        "1",
        "yes",
        "y",
    }


# ============================================================
# AUDIT
# ============================================================

def add_audit_event(
    audit_events,
    case_id,
    actor_type,
    actor_name,
    action,
    previous_status,
    new_status,
    decision="",
    comments="",
):

    audit_events.append({

        "event_id":
            f"AUD-{len(audit_events) + 1:06d}",

        "case_id":
            case_id,

        "actor_type":
            actor_type,

        "actor_name":
            actor_name,

        "action":
            action,

        "decision":
            decision,

        "previous_status":
            previous_status,

        "new_status":
            new_status,

        "comments":
            comments,

        "timestamp":
            now(),
    })


# ============================================================
# INITIALIZE APPROVAL STATE
# ============================================================

def initialize_workflow():

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    investigations = load_json(
        INVESTIGATIONS_FILE
    )


    states = []

    audit_events = []


    for investigation in investigations:

        case_id = investigation[
            "case_id"
        ]


        proposed_correction = (
            investigation.get(
                "proposed_correction",
                {}
            )
        )


        state = {

            "case_id":
                case_id,

            "investigation_id":
                investigation[
                    "investigation_id"
                ],

            "title":
                investigation[
                    "title"
                ],

            "case_type":
                investigation[
                    "case_type"
                ],

            "priority":
                investigation[
                    "priority"
                ],

            "primary_biometric_id":
                investigation[
                    "primary_biometric_id"
                ],

            "canonical_master_id":
                investigation[
                    "canonical_master_id"
                ],

            "canonical_confidence":
                investigation[
                    "canonical_identity_confidence"
                ],

            "risk_score":
                investigation[
                    "risk_score"
                ],

            "harm_impact_score":
                investigation[
                    "harm_impact_score"
                ],

            "protective_priority_score":
                investigation[
                    "protective_priority_score"
                ],

            "wrongly_affected_person":
                investigation[
                    "wrongly_affected_person"
                ],

            "proposed_action":
                proposed_correction.get(
                    "action",
                    ""
                ),

            "correction_target_system":
                proposed_correction.get(
                    "target_system",
                    ""
                ),

            "correction_target_record":
                proposed_correction.get(
                    "target_record_id",
                    ""
                ),

            "correction_field":
                proposed_correction.get(
                    "field",
                    ""
                ),

            "correction_before":
                proposed_correction.get(
                    "before",
                    ""
                ),

            "correction_after":
                proposed_correction.get(
                    "after",
                    ""
                ),

            "workflow_status":
                "AWAITING_OFFICER_REVIEW",

            "officer_decision":
                "PENDING",

            "officer_name":
                "",

            "officer_comments":
                "",

            "officer_decided_at":
                "",

            "manager_decision":
                "NOT_READY",

            "manager_name":
                "",

            "manager_comments":
                "",

            "manager_decided_at":
                "",

            "authorized_for_execution":
                False,

            "execution_status":
                "NOT_AUTHORIZED",

            "created_at":
                now(),

            "updated_at":
                now(),
        }


        states.append(
            state
        )


        add_audit_event(
            audit_events=audit_events,
            case_id=case_id,
            actor_type="AI_AGENT",
            actor_name="Approval Workflow Agent",
            action="WORKFLOW_CREATED",
            previous_status="AI_INVESTIGATION",
            new_status="AWAITING_OFFICER_REVIEW",
            comments=(
                "AI investigation completed and case "
                "submitted for Monitoring Officer review."
            ),
        )


    save_json(
        APPROVAL_STATE_FILE,
        states
    )


    save_json(
        AUDIT_FILE,
        audit_events
    )


    refresh_outputs(
        states,
        audit_events
    )


    print()
    print(
        "Approval workflow initialized."
    )

    print(
        f"Cases awaiting officer review: "
        f"{len(states)}"
    )


# ============================================================
# FIND CASE
# ============================================================

def find_case(
    states,
    case_id
):

    for state in states:

        if (
            state[
                "case_id"
            ]
            ==
            case_id
        ):

            return state


    raise ValueError(
        f"Case not found: {case_id}"
    )


# ============================================================
# OFFICER DECISION
# ============================================================

def officer_decision(
    case_id,
    decision,
    officer_name,
    comments,
):

    decision = decision.upper()


    if (
        decision
        not in OFFICER_DECISIONS
    ):

        raise ValueError(
            f"Invalid officer decision: "
            f"{decision}"
        )


    states = load_json(
        APPROVAL_STATE_FILE
    )


    audit_events = load_json(
        AUDIT_FILE
    )


    case = find_case(
        states,
        case_id
    )


    if (
        case[
            "workflow_status"
        ]
        !=
        "AWAITING_OFFICER_REVIEW"
    ):

        raise ValueError(
            "Case is not currently awaiting "
            "Monitoring Officer review."
        )


    previous_status = case[
        "workflow_status"
    ]


    case[
        "officer_decision"
    ] = decision


    case[
        "officer_name"
    ] = officer_name


    case[
        "officer_comments"
    ] = comments


    case[
        "officer_decided_at"
    ] = now()


    if decision == "APPROVED":

        case[
            "workflow_status"
        ] = (
            "AWAITING_MANAGER_APPROVAL"
        )

        case[
            "manager_decision"
        ] = "PENDING"


    elif decision == "REJECTED":

        case[
            "workflow_status"
        ] = (
            "REJECTED_BY_OFFICER"
        )

        case[
            "manager_decision"
        ] = "NOT_REQUIRED"


    elif (
        decision
        ==
        "FURTHER_INVESTIGATION"
    ):

        case[
            "workflow_status"
        ] = (
            "FURTHER_INVESTIGATION_REQUIRED"
        )

        case[
            "manager_decision"
        ] = "NOT_READY"


    case[
        "updated_at"
    ] = now()


    add_audit_event(
        audit_events=audit_events,
        case_id=case_id,
        actor_type="MONITORING_OFFICER",
        actor_name=officer_name,
        action="OFFICER_REVIEW_COMPLETED",
        decision=decision,
        previous_status=previous_status,
        new_status=case[
            "workflow_status"
        ],
        comments=comments,
    )


    save_json(
        APPROVAL_STATE_FILE,
        states
    )


    save_json(
        AUDIT_FILE,
        audit_events
    )


    refresh_outputs(
        states,
        audit_events
    )


    print()
    print(
        f"Officer decision recorded "
        f"for {case_id}."
    )

    print(
        f"Decision: {decision}"
    )

    print(
        f"New Status: "
        f"{case['workflow_status']}"
    )


# ============================================================
# MANAGER DECISION
# ============================================================

def manager_decision(
    case_id,
    decision,
    manager_name,
    comments,
):

    decision = decision.upper()


    if (
        decision
        not in MANAGER_DECISIONS
    ):

        raise ValueError(
            f"Invalid manager decision: "
            f"{decision}"
        )


    states = load_json(
        APPROVAL_STATE_FILE
    )


    audit_events = load_json(
        AUDIT_FILE
    )


    case = find_case(
        states,
        case_id
    )


    if (
        case[
            "workflow_status"
        ]
        !=
        "AWAITING_MANAGER_APPROVAL"
    ):

        raise ValueError(
            "Case is not currently awaiting "
            "Manager approval."
        )


    if (
        case[
            "officer_decision"
        ]
        !=
        "APPROVED"
    ):

        raise ValueError(
            "Manager approval cannot occur "
            "before Monitoring Officer approval."
        )


    previous_status = case[
        "workflow_status"
    ]


    case[
        "manager_decision"
    ] = decision


    case[
        "manager_name"
    ] = manager_name


    case[
        "manager_comments"
    ] = comments


    case[
        "manager_decided_at"
    ] = now()


    if decision == "APPROVED":

        case[
            "workflow_status"
        ] = (
            "AUTHORIZED_FOR_EXECUTION"
        )

        case[
            "authorized_for_execution"
        ] = True

        case[
            "execution_status"
        ] = "AUTHORIZED"


    elif decision == "REJECTED":

        case[
            "workflow_status"
        ] = (
            "REJECTED_BY_MANAGER"
        )

        case[
            "authorized_for_execution"
        ] = False

        case[
            "execution_status"
        ] = "NOT_AUTHORIZED"


    elif decision == "RETURNED":

        case[
            "workflow_status"
        ] = (
            "AWAITING_OFFICER_REVIEW"
        )

        case[
            "officer_decision"
        ] = "PENDING"

        case[
            "manager_decision"
        ] = "RETURNED"

        case[
            "authorized_for_execution"
        ] = False


    elif (
        decision
        ==
        "FURTHER_INVESTIGATION"
    ):

        case[
            "workflow_status"
        ] = (
            "FURTHER_INVESTIGATION_REQUIRED"
        )

        case[
            "authorized_for_execution"
        ] = False

        case[
            "execution_status"
        ] = "NOT_AUTHORIZED"


    case[
        "updated_at"
    ] = now()


    add_audit_event(
        audit_events=audit_events,
        case_id=case_id,
        actor_type="MANAGER",
        actor_name=manager_name,
        action="MANAGER_REVIEW_COMPLETED",
        decision=decision,
        previous_status=previous_status,
        new_status=case[
            "workflow_status"
        ],
        comments=comments,
    )


    save_json(
        APPROVAL_STATE_FILE,
        states
    )


    save_json(
        AUDIT_FILE,
        audit_events
    )


    refresh_outputs(
        states,
        audit_events
    )


    print()
    print(
        f"Manager decision recorded "
        f"for {case_id}."
    )

    print(
        f"Decision: {decision}"
    )

    print(
        f"New Status: "
        f"{case['workflow_status']}"
    )


# ============================================================
# QUEUE SORT
# ============================================================

def queue_sort_key(
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
    )


# ============================================================
# REFRESH QUEUES & SUMMARY
# ============================================================

def refresh_outputs(
    states,
    audit_events
):

    officer_queue = [

        case

        for case in states

        if (
            case[
                "workflow_status"
            ]
            ==
            "AWAITING_OFFICER_REVIEW"
        )
    ]


    manager_queue = [

        case

        for case in states

        if (
            case[
                "workflow_status"
            ]
            ==
            "AWAITING_MANAGER_APPROVAL"
        )
    ]


    execution_queue = [

        case

        for case in states

        if (
            case[
                "workflow_status"
            ]
            ==
            "AUTHORIZED_FOR_EXECUTION"
        )
        and
        parse_bool(
            case[
                "authorized_for_execution"
            ]
        )
    ]


    officer_queue.sort(
        key=queue_sort_key,
        reverse=True
    )


    manager_queue.sort(
        key=queue_sort_key,
        reverse=True
    )


    execution_queue.sort(
        key=queue_sort_key,
        reverse=True
    )


    write_csv(
        OFFICER_QUEUE_FILE,
        officer_queue
    )


    write_csv(
        MANAGER_QUEUE_FILE,
        manager_queue
    )


    write_csv(
        EXECUTION_QUEUE_FILE,
        execution_queue
    )


    summary = {

        "project":
            "AI Identity Reconciliation Platform",

        "agent":
            "Approval Workflow Agent v0.1",

        "total_cases":
            len(
                states
            ),

        "awaiting_officer_review":
            len(
                officer_queue
            ),

        "awaiting_manager_approval":
            len(
                manager_queue
            ),

        "authorized_for_execution":
            len(
                execution_queue
            ),

        "rejected_by_officer":
            sum(
                1
                for case in states
                if (
                    case[
                        "workflow_status"
                    ]
                    ==
                    "REJECTED_BY_OFFICER"
                )
            ),

        "rejected_by_manager":
            sum(
                1
                for case in states
                if (
                    case[
                        "workflow_status"
                    ]
                    ==
                    "REJECTED_BY_MANAGER"
                )
            ),

        "further_investigation_required":
            sum(
                1
                for case in states
                if (
                    case[
                        "workflow_status"
                    ]
                    ==
                    "FURTHER_INVESTIGATION_REQUIRED"
                )
            ),

        "audit_events":
            len(
                audit_events
            ),

        "generated_at":
            now(),
    }


    save_json(
        SUMMARY_FILE,
        summary
    )


# ============================================================
# STATUS
# ============================================================

def display_status():

    states = load_json(
        APPROVAL_STATE_FILE
    )


    audit_events = load_json(
        AUDIT_FILE
    )


    refresh_outputs(
        states,
        audit_events
    )


    summary = load_json(
        SUMMARY_FILE
    )


    print()
    print(
        "============================================"
    )

    print(
        " APPROVAL WORKFLOW STATUS"
    )

    print(
        "============================================"
    )


    print(
        f"\nTotal Cases: "
        f"{summary['total_cases']}"
    )

    print(
        f"Awaiting Officer Review: "
        f"{summary['awaiting_officer_review']}"
    )

    print(
        f"Awaiting Manager Approval: "
        f"{summary['awaiting_manager_approval']}"
    )

    print(
        f"Authorized for Execution: "
        f"{summary['authorized_for_execution']}"
    )

    print(
        f"Rejected by Officer: "
        f"{summary['rejected_by_officer']}"
    )

    print(
        f"Rejected by Manager: "
        f"{summary['rejected_by_manager']}"
    )

    print(
        f"Further Investigation: "
        f"{summary['further_investigation_required']}"
    )

    print(
        f"Audit Events: "
        f"{summary['audit_events']}"
    )


    print()
    print(
        "Highest Priority Officer Queue:"
    )


    officer_queue = [

        case

        for case in states

        if (
            case[
                "workflow_status"
            ]
            ==
            "AWAITING_OFFICER_REVIEW"
        )
    ]


    officer_queue.sort(
        key=queue_sort_key,
        reverse=True
    )


    for case in officer_queue[:10]:

        print()

        print(
            f"{case['case_id']} | "
            f"{case['title']}"
        )

        print(
            f"Priority: "
            f"{case['priority']}"
        )

        print(
            f"Biometric: "
            f"{case['primary_biometric_id']}"
        )

        print(
            f"Canonical Identity: "
            f"{case['canonical_master_id']}"
        )

        print(
            f"Protective Priority: "
            f"{case['protective_priority_score']}"
        )

        print(
            f"Proposed Action: "
            f"{case['proposed_action']}"
        )


    print()


# ============================================================
# COMMAND LINE
# ============================================================

def main():

    parser = argparse.ArgumentParser(
        description=(
            "AI Identity Reconciliation "
            "Approval Workflow Agent"
        )
    )


    subparsers = parser.add_subparsers(
        dest="command"
    )


    # --------------------------------------------------------
    # INIT
    # --------------------------------------------------------

    subparsers.add_parser(
        "init",
        help=(
            "Initialize approval workflow "
            "from AI investigations."
        )
    )


    # --------------------------------------------------------
    # STATUS
    # --------------------------------------------------------

    subparsers.add_parser(
        "status",
        help="Display workflow status."
    )


    # --------------------------------------------------------
    # OFFICER
    # --------------------------------------------------------

    officer_parser = (
        subparsers.add_parser(
            "officer",
            help=(
                "Record Monitoring Officer "
                "decision."
            )
        )
    )


    officer_parser.add_argument(
        "--case",
        required=True
    )


    officer_parser.add_argument(
        "--decision",
        required=True,
        choices=sorted(
            OFFICER_DECISIONS
        )
    )


    officer_parser.add_argument(
        "--name",
        required=True
    )


    officer_parser.add_argument(
        "--comments",
        default=""
    )


    # --------------------------------------------------------
    # MANAGER
    # --------------------------------------------------------

    manager_parser = (
        subparsers.add_parser(
            "manager",
            help=(
                "Record Manager decision."
            )
        )
    )


    manager_parser.add_argument(
        "--case",
        required=True
    )


    manager_parser.add_argument(
        "--decision",
        required=True,
        choices=sorted(
            MANAGER_DECISIONS
        )
    )


    manager_parser.add_argument(
        "--name",
        required=True
    )


    manager_parser.add_argument(
        "--comments",
        default=""
    )


    args = parser.parse_args()


    if args.command == "init":

        initialize_workflow()


    elif args.command == "status":

        display_status()


    elif args.command == "officer":

        officer_decision(
            case_id=args.case,
            decision=args.decision,
            officer_name=args.name,
            comments=args.comments,
        )


    elif args.command == "manager":

        manager_decision(
            case_id=args.case,
            decision=args.decision,
            manager_name=args.name,
            comments=args.comments,
        )


    else:

        parser.print_help()


if __name__ == "__main__":
    main()