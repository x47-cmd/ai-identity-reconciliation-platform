import argparse
import csv
import hashlib
import json
import math
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Verification Agent
# Version: 0.1
#
# PURPOSE:
#
# Verify every executed correction before closing a case.
#
# Execution
#     ↓
# Identity Re-check
#     ↓
# Biometric Re-check
#     ↓
# Duplicate / Conflict Check
#     ↓
# Verification Result
#
# PASS:
# VERIFIED → CASE CLOSED
#
# FAIL:
# VERIFICATION_FAILED → MANUAL REVIEW / ROLLBACK
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
# INPUTS
# ============================================================

MASTER_FILE = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
    / "master_persons.csv"
)


SOURCE_BIOMETRIC_FILE = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
    / "biometric_records.csv"
)


RUNTIME_BIOMETRIC_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "execution-agent"
    / "output"
    / "biometric_records_runtime.csv"
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


APPROVAL_STATE_FILE = (
    REPO_ROOT
    / "ai-agents"
    / "approval-workflow-agent"
    / "output"
    / "approval_state.json"
)


# ============================================================
# OUTPUTS
# ============================================================

OUTPUT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    / "output"
)


VERIFICATION_RESULTS_FILE = (
    OUTPUT_DIR
    / "verification_results.csv"
)


VERIFICATION_AUDIT_FILE = (
    OUTPUT_DIR
    / "verification_audit.json"
)


VERIFICATION_SUMMARY_FILE = (
    OUTPUT_DIR
    / "verification_summary.json"
)


CLOSED_CASES_FILE = (
    OUTPUT_DIR
    / "closed_cases.csv"
)


FAILED_CASES_FILE = (
    OUTPUT_DIR
    / "failed_verification_cases.csv"
)


# ============================================================
# THRESHOLDS
# ============================================================

MINIMUM_BIOMETRIC_MATCH = 0.970

STRONG_BIOMETRIC_MATCH = 0.985


# ============================================================
# HELPERS
# ============================================================

def now():

    return datetime.now().isoformat(
        timespec="seconds"
    )


def load_csv(path):

    if not path.exists():

        raise FileNotFoundError(
            f"Required file not found:\n{path}"
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


def parse_bool(value):

    return str(
        value
    ).strip().lower() in {
        "true",
        "1",
        "yes",
        "y",
    }


def safe_float(value):

    try:

        return float(value)

    except (
        TypeError,
        ValueError
    ):

        return 0.0


def parse_vector(value):

    if not value:
        return []

    if isinstance(
        value,
        list
    ):

        return value

    return json.loads(
        value
    )


# ============================================================
# SYNTHETIC BIOMETRIC REFERENCE
# ============================================================

def deterministic_vector(
    key,
    dimensions=32
):

    values = []

    counter = 0


    while (
        len(values)
        <
        dimensions
    ):

        digest = hashlib.sha256(
            f"{key}:{counter}".encode(
                "utf-8"
            )
        ).digest()


        for byte in digest:

            value = (
                (byte / 255.0)
                * 2.0
                - 1.0
            )


            values.append(
                round(
                    value,
                    6
                )
            )


            if (
                len(values)
                >=
                dimensions
            ):

                break


        counter += 1


    return values


# ============================================================
# COSINE SIMILARITY
# ============================================================

def cosine_similarity(
    vector_a,
    vector_b
):

    if (
        not vector_a
        or
        not vector_b
    ):

        return 0.0


    dot_product = sum(

        a * b

        for a, b in zip(
            vector_a,
            vector_b
        )
    )


    magnitude_a = math.sqrt(

        sum(
            a * a
            for a in vector_a
        )
    )


    magnitude_b = math.sqrt(

        sum(
            b * b
            for b in vector_b
        )
    )


    if (
        magnitude_a == 0
        or
        magnitude_b == 0
    ):

        return 0.0


    return (
        dot_product
        /
        (
            magnitude_a
            *
            magnitude_b
        )
    )


# ============================================================
# BIOMETRIC MATCH
# ============================================================

def biometric_similarity(
    record,
    master_id
):

    face = parse_vector(
        record.get(
            "face_template"
        )
    )


    fingerprint = parse_vector(
        record.get(
            "fingerprint_template"
        )
    )


    iris = parse_vector(
        record.get(
            "iris_template"
        )
    )


    reference_face = (
        deterministic_vector(
            f"FACE:{master_id}"
        )
    )


    reference_fingerprint = (
        deterministic_vector(
            f"FINGERPRINT:{master_id}"
        )
    )


    reference_iris = (
        deterministic_vector(
            f"IRIS:{master_id}"
        )
    )


    face_score = cosine_similarity(
        face,
        reference_face
    )


    fingerprint_score = (
        cosine_similarity(
            fingerprint,
            reference_fingerprint
        )
    )


    iris_score = cosine_similarity(
        iris,
        reference_iris
    )


    combined = (

        face_score
        * 0.40

        +

        fingerprint_score
        * 0.35

        +

        iris_score
        * 0.25
    )


    return {

        "face":
            round(
                face_score,
                6
            ),

        "fingerprint":
            round(
                fingerprint_score,
                6
            ),

        "iris":
            round(
                iris_score,
                6
            ),

        "combined":
            round(
                combined,
                6
            ),
    }


# ============================================================
# INDEX BUILDERS
# ============================================================

def build_indexes(
    master_records,
    runtime_records,
    source_records,
):

    master_lookup = {

        record[
            "master_id"
        ]:
            record

        for record
        in master_records
    }


    runtime_lookup = {

        record[
            "biometric_id"
        ]:
            record

        for record
        in runtime_records
    }


    source_lookup = {

        record[
            "biometric_id"
        ]:
            record

        for record
        in source_records
    }


    return (
        master_lookup,
        runtime_lookup,
        source_lookup
    )


# ============================================================
# EXACT BIOMETRIC SIGNATURE
# ============================================================

def biometric_signature(
    record
):

    raw = "|".join([

        record.get(
            "face_template",
            ""
        ),

        record.get(
            "fingerprint_template",
            ""
        ),

        record.get(
            "iris_template",
            ""
        ),
    ])


    return hashlib.sha256(
        raw.encode(
            "utf-8"
        )
    ).hexdigest()


# ============================================================
# DUPLICATE CONFLICT CHECK
# ============================================================

def check_duplicate_conflict(
    target_record,
    runtime_records
):

    target_signature = (
        biometric_signature(
            target_record
        )
    )


    target_master_id = (
        target_record.get(
            "linked_master_id",
            ""
        )
    )


    conflicting_records = []


    for other in runtime_records:

        if (
            other[
                "biometric_id"
            ]
            ==
            target_record[
                "biometric_id"
            ]
        ):

            continue


        if (
            biometric_signature(
                other
            )
            ==
            target_signature
        ):

            if (
                other.get(
                    "linked_master_id"
                )
                !=
                target_master_id
            ):

                conflicting_records.append({

                    "biometric_id":
                        other[
                            "biometric_id"
                        ],

                    "linked_master_id":
                        other.get(
                            "linked_master_id",
                            ""
                        ),
                })


    return {

        "duplicate_conflict_exists":
            bool(
                conflicting_records
            ),

        "conflicting_records":
            conflicting_records,
    }


# ============================================================
# FIND APPROVAL CASE
# ============================================================

def find_case(
    approval_states,
    case_id
):

    for case in approval_states:

        if (
            case[
                "case_id"
            ]
            ==
            case_id
        ):

            return case


    return None


# ============================================================
# AUDIT
# ============================================================

def add_audit_event(
    events,
    case_id,
    status,
    verification_score,
    message,
    details,
):

    events.append({

        "event_id":
            f"VER-AUD-{len(events) + 1:06d}",

        "case_id":
            case_id,

        "actor_type":
            "AI_AGENT",

        "actor_name":
            "Verification Agent",

        "action":
            "POST_CORRECTION_VERIFICATION",

        "status":
            status,

        "verification_score":
            verification_score,

        "message":
            message,

        "details":
            details,

        "timestamp":
            now(),
    })


# ============================================================
# VERIFY ONE CASE
# ============================================================

def verify_case(
    execution_result,
    approval_case,
    master_lookup,
    runtime_lookup,
    runtime_records,
):

    case_id = (
        execution_result[
            "case_id"
        ]
    )


    target_record_id = (
        execution_result.get(
            "target_record",
            ""
        )
    )


    expected_master_id = (
        execution_result.get(
            "after",
            ""
        )
    )


    # ========================================================
    # BASIC EXISTENCE CHECKS
    # ========================================================

    target_exists = (

        target_record_id
        in runtime_lookup
    )


    master_exists = (

        expected_master_id
        in master_lookup
    )


    if not target_exists:

        return {

            "case_id":
                case_id,

            "target_record":
                target_record_id,

            "expected_master_id":
                expected_master_id,

            "verification_status":
                "FAILED",

            "verification_score":
                0,

            "identity_mapping_valid":
                False,

            "master_identity_exists":
                master_exists,

            "biometric_match_valid":
                False,

            "biometric_match_score":
                0,

            "original_conflict_resolved":
                False,

            "duplicate_conflict_exists":
                False,

            "secondary_conflict_created":
                False,

            "data_integrity_restored":
                False,

            "message":
                "Target runtime biometric record was not found.",

            "verified_at":
                now(),
        }


    record = runtime_lookup[
        target_record_id
    ]


    # ========================================================
    # 1. IDENTITY MAPPING CHECK
    # ========================================================

    actual_master_id = (
        record.get(
            "linked_master_id",
            ""
        )
    )


    identity_mapping_valid = (

        actual_master_id
        ==
        expected_master_id
    )


    # ========================================================
    # 2. BIOMETRIC MATCH CHECK
    # ========================================================

    biometric_scores = {

        "face":
            0,

        "fingerprint":
            0,

        "iris":
            0,

        "combined":
            0,
    }


    if master_exists:

        biometric_scores = (
            biometric_similarity(
                record,
                expected_master_id
            )
        )


    biometric_match_score = (
        biometric_scores[
            "combined"
        ]
    )


    biometric_match_valid = (

        biometric_match_score
        >=
        MINIMUM_BIOMETRIC_MATCH
    )


    # ========================================================
    # 3. ORIGINAL CONFLICT CHECK
    # ========================================================

    old_master_id = (
        execution_result.get(
            "before",
            ""
        )
    )


    original_conflict_resolved = (

        identity_mapping_valid

        and

        (
            not old_master_id

            or

            actual_master_id
            !=
            old_master_id
        )
    )


    # ========================================================
    # 4. DUPLICATE / SECONDARY CONFLICT CHECK
    # ========================================================

    duplicate_check = (
        check_duplicate_conflict(
            record,
            runtime_records
        )
    )


    duplicate_conflict_exists = (
        duplicate_check[
            "duplicate_conflict_exists"
        ]
    )


    # For v0.1 a remaining exact biometric conflict
    # across different identities is treated as a
    # secondary conflict requiring investigation.

    secondary_conflict_created = (
        duplicate_conflict_exists
    )


    # ========================================================
    # 5. DATA INTEGRITY
    # ========================================================

    data_integrity_restored = all([

        target_exists,

        master_exists,

        identity_mapping_valid,

        biometric_match_valid,

        original_conflict_resolved,

        not secondary_conflict_created,
    ])


    # ========================================================
    # VERIFICATION SCORE
    # ========================================================

    score = 0


    if target_exists:
        score += 10


    if master_exists:
        score += 10


    if identity_mapping_valid:
        score += 25


    if biometric_match_valid:
        score += 30


    if original_conflict_resolved:
        score += 15


    if not secondary_conflict_created:
        score += 10


    verification_score = min(
        100,
        score
    )


    # ========================================================
    # FINAL STATUS
    # ========================================================

    if data_integrity_restored:

        verification_status = (
            "PASSED"
        )


        message = (
            "Correction successfully verified. "
            "Identity mapping and biometric evidence "
            "are consistent with the canonical "
            "Master Reference identity."
        )


    elif (
        identity_mapping_valid
        and
        biometric_match_valid
        and
        secondary_conflict_created
    ):

        verification_status = (
            "MANUAL_REVIEW_REQUIRED"
        )


        message = (
            "Primary correction is valid, but a remaining "
            "secondary biometric conflict requires review."
        )


    else:

        verification_status = (
            "FAILED"
        )


        message = (
            "Post-correction verification failed. "
            "The case must not be closed."
        )


    return {

        "case_id":
            case_id,

        "target_record":
            target_record_id,

        "previous_master_id":
            old_master_id,

        "expected_master_id":
            expected_master_id,

        "actual_master_id":
            actual_master_id,

        "verification_status":
            verification_status,

        "verification_score":
            verification_score,

        "identity_mapping_valid":
            identity_mapping_valid,

        "master_identity_exists":
            master_exists,

        "face_match":
            biometric_scores[
                "face"
            ],

        "fingerprint_match":
            biometric_scores[
                "fingerprint"
            ],

        "iris_match":
            biometric_scores[
                "iris"
            ],

        "biometric_match_score":
            biometric_match_score,

        "biometric_match_valid":
            biometric_match_valid,

        "original_conflict_resolved":
            original_conflict_resolved,

        "duplicate_conflict_exists":
            duplicate_conflict_exists,

        "secondary_conflict_created":
            secondary_conflict_created,

        "conflicting_records":
            json.dumps(
                duplicate_check[
                    "conflicting_records"
                ]
            ),

        "data_integrity_restored":
            data_integrity_restored,

        "message":
            message,

        "verified_at":
            now(),
    }


# ============================================================
# VERIFY EXECUTED CORRECTIONS
# ============================================================

def verify_executions():

    print()
    print(
        "============================================"
    )

    print(
        " AI Identity Reconciliation Platform"
    )

    print(
        " Verification Agent v0.1"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    master_records = load_csv(
        MASTER_FILE
    )


    runtime_records = load_csv(
        RUNTIME_BIOMETRIC_FILE
    )


    source_records = load_csv(
        SOURCE_BIOMETRIC_FILE
    )


    execution_results = load_csv(
        EXECUTION_RESULTS_FILE
    )


    approval_states = load_json(
        APPROVAL_STATE_FILE
    )


    (
        master_lookup,
        runtime_lookup,
        source_lookup
    ) = build_indexes(
        master_records,
        runtime_records,
        source_records
    )


    audit_events = []

    if VERIFICATION_AUDIT_FILE.exists():

        audit_events = load_json(
            VERIFICATION_AUDIT_FILE
        )


    results = []


    executed = [

        result

        for result in execution_results

        if (
            result.get(
                "execution_status"
            )
            ==
            "COMPLETED"
        )
    ]


    print(
        f"\nCompleted Executions Found: "
        f"{len(executed)}"
    )


    for execution_result in executed:

        case_id = (
            execution_result[
                "case_id"
            ]
        )


        approval_case = find_case(
            approval_states,
            case_id
        )


        if approval_case is None:

            print(
                f"Skipping {case_id}: "
                f"workflow state not found."
            )

            continue


        verification = verify_case(
            execution_result=execution_result,
            approval_case=approval_case,
            master_lookup=master_lookup,
            runtime_lookup=runtime_lookup,
            runtime_records=runtime_records,
        )


        results.append(
            verification
        )


        status = (
            verification[
                "verification_status"
            ]
        )


        previous_status = (
            approval_case[
                "workflow_status"
            ]
        )


        # ====================================================
        # PASSED
        # ====================================================

        if status == "PASSED":

            approval_case[
                "workflow_status"
            ] = "VERIFIED_CLOSED"


            approval_case[
                "execution_status"
            ] = "VERIFIED"


            approval_case[
                "verification_status"
            ] = "PASSED"


            approval_case[
                "verification_score"
            ] = verification[
                "verification_score"
            ]


            approval_case[
                "verified_at"
            ] = now()


            approval_case[
                "closed_at"
            ] = now()


        # ====================================================
        # MANUAL REVIEW
        # ====================================================

        elif (
            status
            ==
            "MANUAL_REVIEW_REQUIRED"
        ):

            approval_case[
                "workflow_status"
            ] = (
                "POST_CORRECTION_REVIEW_REQUIRED"
            )


            approval_case[
                "execution_status"
            ] = (
                "COMPLETED_PENDING_REVIEW"
            )


            approval_case[
                "verification_status"
            ] = (
                "MANUAL_REVIEW_REQUIRED"
            )


            approval_case[
                "verification_score"
            ] = verification[
                "verification_score"
            ]


            approval_case[
                "verified_at"
            ] = now()


        # ====================================================
        # FAILED
        # ====================================================

        else:

            approval_case[
                "workflow_status"
            ] = "VERIFICATION_FAILED"


            approval_case[
                "execution_status"
            ] = (
                "COMPLETED_VERIFICATION_FAILED"
            )


            approval_case[
                "verification_status"
            ] = "FAILED"


            approval_case[
                "verification_score"
            ] = verification[
                "verification_score"
            ]


            approval_case[
                "verified_at"
            ] = now()


        approval_case[
            "updated_at"
        ] = now()


        add_audit_event(
            events=audit_events,
            case_id=case_id,
            status=status,
            verification_score=verification[
                "verification_score"
            ],
            message=verification[
                "message"
            ],
            details={

                "previous_workflow_status":
                    previous_status,

                "new_workflow_status":
                    approval_case[
                        "workflow_status"
                    ],

                "identity_mapping_valid":
                    verification[
                        "identity_mapping_valid"
                    ],

                "biometric_match_score":
                    verification[
                        "biometric_match_score"
                    ],

                "original_conflict_resolved":
                    verification[
                        "original_conflict_resolved"
                    ],

                "secondary_conflict_created":
                    verification[
                        "secondary_conflict_created"
                    ],
            },
        )


    # ========================================================
    # SAVE UPDATED STATE
    # ========================================================

    save_json(
        APPROVAL_STATE_FILE,
        approval_states
    )


    write_csv(
        VERIFICATION_RESULTS_FILE,
        results
    )


    save_json(
        VERIFICATION_AUDIT_FILE,
        audit_events
    )


    # ========================================================
    # CLOSED / FAILED QUEUES
    # ========================================================

    closed_cases = [

        case

        for case in approval_states

        if (
            case.get(
                "workflow_status"
            )
            ==
            "VERIFIED_CLOSED"
        )
    ]


    failed_cases = [

        case

        for case in approval_states

        if case.get(
            "workflow_status"
        )
        in {

            "VERIFICATION_FAILED",

            "POST_CORRECTION_REVIEW_REQUIRED",
        }
    ]


    write_csv(
        CLOSED_CASES_FILE,
        closed_cases
    )


    write_csv(
        FAILED_CASES_FILE,
        failed_cases
    )


    # ========================================================
    # SUMMARY
    # ========================================================

    passed = sum(

        1

        for result in results

        if (
            result[
                "verification_status"
            ]
            ==
            "PASSED"
        )
    )


    failed = sum(

        1

        for result in results

        if (
            result[
                "verification_status"
            ]
            ==
            "FAILED"
        )
    )


    manual = sum(

        1

        for result in results

        if (
            result[
                "verification_status"
            ]
            ==
            "MANUAL_REVIEW_REQUIRED"
        )
    )


    average_score = (

        round(
            sum(
                safe_float(
                    result[
                        "verification_score"
                    ]
                )
                for result in results
            )
            /
            len(
                results
            ),
            2
        )

        if results

        else 0
    )


    summary = {

        "project":
            "AI Identity Reconciliation Platform",

        "agent":
            "Verification Agent v0.1",

        "executions_checked":
            len(
                results
            ),

        "verification_passed":
            passed,

        "verification_failed":
            failed,

        "manual_review_required":
            manual,

        "cases_closed":
            len(
                closed_cases
            ),

        "average_verification_score":
            average_score,

        "master_reference_modified":
            False,

        "verification_audit_events":
            len(
                audit_events
            ),

        "generated_at":
            now(),
    }


    save_json(
        VERIFICATION_SUMMARY_FILE,
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
        " VERIFICATION SUMMARY"
    )

    print(
        "============================================"
    )


    print(
        f"\nExecutions Checked: "
        f"{summary['executions_checked']}"
    )

    print(
        f"Verification Passed: "
        f"{summary['verification_passed']}"
    )

    print(
        f"Verification Failed: "
        f"{summary['verification_failed']}"
    )

    print(
        f"Manual Review Required: "
        f"{summary['manual_review_required']}"
    )

    print(
        f"Cases Closed: "
        f"{summary['cases_closed']}"
    )

    print(
        f"Average Verification Score: "
        f"{summary['average_verification_score']}"
    )


    print()
    print(
        "Master Reference Modified:"
    )

    print(
        "FALSE"
    )


    for result in results:

        print()
        print(
            f"{result['case_id']} | "
            f"{result['verification_status']}"
        )

        print(
            f"Record: "
            f"{result['target_record']}"
        )

        print(
            f"Previous Identity: "
            f"{result['previous_master_id']}"
        )

        print(
            f"Expected Identity: "
            f"{result['expected_master_id']}"
        )

        print(
            f"Actual Identity: "
            f"{result['actual_master_id']}"
        )

        print(
            f"Biometric Match: "
            f"{result['biometric_match_score']}"
        )

        print(
            f"Verification Score: "
            f"{result['verification_score']}"
        )

        print(
            f"Conflict Resolved: "
            f"{result['original_conflict_resolved']}"
        )

        print(
            f"Secondary Conflict: "
            f"{result['secondary_conflict_created']}"
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
        f" - {VERIFICATION_RESULTS_FILE}"
    )

    print(
        f" - {VERIFICATION_AUDIT_FILE}"
    )

    print(
        f" - {VERIFICATION_SUMMARY_FILE}"
    )

    print(
        f" - {CLOSED_CASES_FILE}"
    )

    print(
        f" - {FAILED_CASES_FILE}"
    )

    print()


# ============================================================
# ROLLBACK FAILED CASE
# ============================================================

def rollback_case(
    case_id
):

    print()
    print(
        "============================================"
    )

    print(
        " CONTROLLED ROLLBACK"
    )

    print(
        "============================================"
    )


    approval_states = load_json(
        APPROVAL_STATE_FILE
    )


    runtime_records = load_csv(
        RUNTIME_BIOMETRIC_FILE
    )


    execution_audit = load_json(
        EXECUTION_AUDIT_FILE
    )


    runtime_lookup = {

        record[
            "biometric_id"
        ]:
            record

        for record
        in runtime_records
    }


    case = find_case(
        approval_states,
        case_id
    )


    if case is None:

        raise ValueError(
            f"Case not found: {case_id}"
        )


    if (
        case.get(
            "workflow_status"
        )
        not in {

            "VERIFICATION_FAILED",

            "POST_CORRECTION_REVIEW_REQUIRED",
        }
    ):

        raise ValueError(
            "Rollback is only permitted for "
            "failed or post-correction review cases."
        )


    matching_events = [

        event

        for event in execution_audit

        if (
            event.get(
                "case_id"
            )
            ==
            case_id
        )
        and
        (
            event.get(
                "status"
            )
            ==
            "COMPLETED"
        )
    ]


    if not matching_events:

        raise ValueError(
            "No completed execution event "
            "was found for rollback."
        )


    execution_event = (
        matching_events[
            -1
        ]
    )


    target_record = (
        execution_event[
            "target_record"
        ]
    )


    before_value = (
        execution_event[
            "before"
        ]
    )


    after_value = (
        execution_event[
            "after"
        ]
    )


    if (
        target_record
        not in runtime_lookup
    ):

        raise ValueError(
            "Runtime target record not found."
        )


    record = runtime_lookup[
        target_record
    ]


    current_value = (
        record.get(
            "linked_master_id"
        )
    )


    # Safety:
    # Only rollback if runtime is still at
    # the value produced by the correction.

    if (
        current_value
        !=
        after_value
    ):

        raise ValueError(
            "Runtime record changed after execution. "
            "Automatic rollback blocked."
        )


    record[
        "linked_master_id"
    ] = before_value


    record[
        "updated_at"
    ] = now()


    write_csv(
        RUNTIME_BIOMETRIC_FILE,
        runtime_records
    )


    case[
        "workflow_status"
    ] = (
        "ROLLED_BACK_MANUAL_REVIEW"
    )


    case[
        "execution_status"
    ] = "ROLLED_BACK"


    case[
        "verification_status"
    ] = "ROLLED_BACK"


    case[
        "rollback_at"
    ] = now()


    case[
        "updated_at"
    ] = now()


    save_json(
        APPROVAL_STATE_FILE,
        approval_states
    )


    audit_events = []

    if VERIFICATION_AUDIT_FILE.exists():

        audit_events = load_json(
            VERIFICATION_AUDIT_FILE
        )


    audit_events.append({

        "event_id":
            f"VER-AUD-{len(audit_events) + 1:06d}",

        "case_id":
            case_id,

        "actor_type":
            "SYSTEM_CONTROL",

        "actor_name":
            "Verification Agent",

        "action":
            "CONTROLLED_ROLLBACK",

        "status":
            "ROLLED_BACK",

        "target_record":
            target_record,

        "before_rollback":
            after_value,

        "after_rollback":
            before_value,

        "message":
            (
                "Correction was rolled back after "
                "verification did not permit case closure."
            ),

        "timestamp":
            now(),
    })


    save_json(
        VERIFICATION_AUDIT_FILE,
        audit_events
    )


    print(
        f"\nCase: {case_id}"
    )

    print(
        f"Record: {target_record}"
    )

    print(
        f"Reverted From: {after_value}"
    )

    print(
        f"Restored To: {before_value}"
    )

    print(
        "Status: ROLLED_BACK_MANUAL_REVIEW"
    )

    print()


# ============================================================
# STATUS
# ============================================================

def display_status():

    if not VERIFICATION_SUMMARY_FILE.exists():

        print()
        print(
            "Verification Agent has not "
            "performed a run yet."
        )

        print()

        return


    summary = load_json(
        VERIFICATION_SUMMARY_FILE
    )


    print()
    print(
        "============================================"
    )

    print(
        " VERIFICATION AGENT STATUS"
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
# COMMAND LINE
# ============================================================

def main():

    parser = argparse.ArgumentParser(
        description=(
            "AI Identity Reconciliation "
            "Verification Agent"
        )
    )


    subparsers = (
        parser.add_subparsers(
            dest="command"
        )
    )


    subparsers.add_parser(
        "verify",
        help=(
            "Verify all completed "
            "corrections."
        )
    )


    subparsers.add_parser(
        "status",
        help=(
            "Display verification status."
        )
    )


    rollback_parser = (
        subparsers.add_parser(
            "rollback",
            help=(
                "Rollback a failed synthetic "
                "correction."
            )
        )
    )


    rollback_parser.add_argument(
        "--case",
        required=True
    )


    args = parser.parse_args()


    if args.command == "verify":

        verify_executions()


    elif args.command == "status":

        display_status()


    elif args.command == "rollback":

        rollback_case(
            args.case
        )


    else:

        parser.print_help()


if __name__ == "__main__":
    main()