import csv
import json
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Investigation Agent
# Version: 0.1
#
# PURPOSE:
# Transform aggregated identity cases into structured
# AI investigation packages ready for human review.
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


CASES_FILE = (
    REPO_ROOT
    / "case-engine"
    / "output"
    / "cases.csv"
)


CASE_FINDINGS_FILE = (
    REPO_ROOT
    / "case-engine"
    / "output"
    / "case_findings.csv"
)


MASTER_FILE = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
    / "master_persons.csv"
)


BIOMETRIC_FILE = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
    / "biometric_records.csv"
)


OUTPUT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    / "output"
)


INVESTIGATIONS_FILE = (
    OUTPUT_DIR
    / "investigations.json"
)


INVESTIGATIONS_CSV_FILE = (
    OUTPUT_DIR
    / "investigations.csv"
)


RECOMMENDATIONS_FILE = (
    OUTPUT_DIR
    / "proposed_corrections.csv"
)


SUMMARY_FILE = (
    OUTPUT_DIR
    / "investigation_summary.json"
)


# ============================================================
# HELPERS
# ============================================================

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


def safe_float(value):

    try:
        return float(value)

    except (
        TypeError,
        ValueError
    ):
        return 0.0


def parse_bool(value):

    return str(value).strip().lower() in {
        "true",
        "1",
        "yes",
        "y"
    }


def split_csv_value(value):

    if not value:
        return []

    return [
        item.strip()
        for item in value.split(",")
        if item.strip()
    ]


def write_csv(
    path,
    rows
):

    if not rows:
        return

    fieldnames = []

    for row in rows:

        for key in row.keys():

            if key not in fieldnames:
                fieldnames.append(key)

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

        writer.writerows(rows)


# ============================================================
# INDEXES
# ============================================================

def build_indexes(
    master_records,
    biometric_records,
    case_findings
):

    master_lookup = {
        row["master_id"]: row
        for row in master_records
    }

    biometric_lookup = {
        row["biometric_id"]: row
        for row in biometric_records
    }

    findings_by_case = {}

    for finding in case_findings:

        case_id = finding[
            "case_id"
        ]

        findings_by_case.setdefault(
            case_id,
            []
        ).append(
            finding
        )

    return (
        master_lookup,
        biometric_lookup,
        findings_by_case
    )


# ============================================================
# INVESTIGATION LOGIC
# ============================================================

def determine_investigation_title(
    case
):

    case_type = case[
        "case_type"
    ]

    titles = {

        "HARM_IMPACT":
            "Potential Wrong-Person Harm",

        "CRITICAL_HARM_IDENTITY_CONFLICT":
            "Critical Cross-Identity Harm Conflict",

        "COMPLEX_IDENTITY_CONFLICT":
            "Complex Identity Conflict",

        "WRONG_MAPPING":
            "Incorrect Biometric Identity Mapping",

        "ORPHAN_RECORD":
            "Orphan Biometric Record",

        "DUPLICATE_BIOMETRIC":
            "Duplicate Biometric Association",

        "DUPLICATE_IDENTITY":
            "Duplicate Identity Registration",

        "DATA_MISMATCH":
            "Identity Data Mismatch",
    }

    return titles.get(
        case_type,
        "Identity Integrity Investigation"
    )


def determine_root_cause(
    case
):

    case_type = case[
        "case_type"
    ]

    root_causes = {

        "HARM_IMPACT":
            (
                "A biometric record appears to be linked "
                "to an identity carrying adverse information "
                "that likely belongs to another person."
            ),

        "CRITICAL_HARM_IDENTITY_CONFLICT":
            (
                "Multiple identity signals indicate a cross-person "
                "mapping conflict with potential harmful consequences "
                "for an unrelated individual."
            ),

        "COMPLEX_IDENTITY_CONFLICT":
            (
                "Multiple biometric and identity relationships "
                "conflict across linked records."
            ),

        "WRONG_MAPPING":
            (
                "The biometric record appears assigned to the "
                "wrong Master Reference identity."
            ),

        "ORPHAN_RECORD":
            (
                "The biometric record references a Master identity "
                "that does not exist."
            ),

        "DUPLICATE_BIOMETRIC":
            (
                "The same biometric evidence appears associated "
                "with more than one identity."
            ),

        "DUPLICATE_IDENTITY":
            (
                "Multiple biometric records appear to resolve "
                "to the same Master identity."
            ),

        "DATA_MISMATCH":
            (
                "The biometric ownership appears valid, but one "
                "or more demographic fields differ from the "
                "Master Reference."
            ),
    }

    return root_causes.get(
        case_type,
        (
            "The platform detected an identity integrity "
            "inconsistency requiring review."
        )
    )


# ============================================================
# HARM ANALYSIS
# ============================================================

def build_harm_analysis(
    case,
    master_lookup
):

    wrongly_affected = parse_bool(
        case[
            "wrongly_affected_person"
        ]
    )

    current_ids = split_csv_value(
        case[
            "current_master_ids"
        ]
    )

    canonical_id = case[
        "canonical_master_id"
    ]

    current_adverse = []

    for master_id in current_ids:

        person = master_lookup.get(
            master_id
        )

        if not person:
            continue

        if parse_bool(
            person.get(
                "has_adverse_record"
            )
        ):

            current_adverse.append(
                {
                    "master_id":
                        master_id,

                    "adverse_type":
                        person.get(
                            "adverse_type",
                            ""
                        ),
                }
            )

    canonical_person = (
        master_lookup.get(
            canonical_id
        )
    )

    canonical_has_adverse = False

    if canonical_person:

        canonical_has_adverse = (
            parse_bool(
                canonical_person.get(
                    "has_adverse_record"
                )
            )
        )

    if wrongly_affected:

        conclusion = (
            "Potential adverse information may be affecting "
            "an identity that does not appear to own that record. "
            "Immediate human review is recommended."
        )

    elif safe_float(
        case[
            "harm_impact_score"
        ]
    ) >= 80:

        conclusion = (
            "The identity conflict has elevated potential impact "
            "and should receive expedited review."
        )

    else:

        conclusion = (
            "No immediate wrong-person adverse impact was confirmed, "
            "but the integrity issue still requires resolution."
        )

    return {

        "wrongly_affected_person":
            wrongly_affected,

        "current_adverse_records":
            current_adverse,

        "canonical_identity_has_adverse_record":
            canonical_has_adverse,

        "harm_score":
            safe_float(
                case[
                    "harm_impact_score"
                ]
            ),

        "protective_priority":
            safe_float(
                case[
                    "protective_priority_score"
                ]
            ),

        "conclusion":
            conclusion,
    }


# ============================================================
# PROPOSED CORRECTION
# ============================================================

def build_proposed_correction(
    case,
    biometric_lookup
):

    canonical_id = (
        case[
            "canonical_master_id"
        ]
    )

    primary_biometric = (
        case[
            "primary_biometric_id"
        ]
    )

    biometric_record = (
        biometric_lookup.get(
            primary_biometric
        )
    )

    if not biometric_record:

        return {

            "action":
                "MANUAL_REVIEW_REQUIRED",

            "reason":
                "Primary biometric record could not be loaded.",

            "ready_for_execution":
                False,
        }

    current_master = biometric_record.get(
        "linked_master_id",
        ""
    )

    case_type = case[
        "case_type"
    ]

    if (
        canonical_id
        and
        current_master
        and
        canonical_id != current_master
    ):

        return {

            "action":
                "REASSIGN_BIOMETRIC_IDENTITY",

            "target_system":
                "BIOMETRIC_SYSTEM",

            "target_record_id":
                primary_biometric,

            "field":
                "linked_master_id",

            "before":
                current_master,

            "after":
                canonical_id,

            "reason":
                (
                    "Aggregated biometric and identity evidence "
                    "supports reassignment to the canonical identity."
                ),

            "ready_for_execution":
                False,

            "requires_officer_approval":
                True,

            "requires_manager_approval":
                True,
        }


    if case_type == "DATA_MISMATCH":

        return {

            "action":
                "REVIEW_DEMOGRAPHIC_FIELDS",

            "target_system":
                "BIOMETRIC_SYSTEM",

            "target_record_id":
                primary_biometric,

            "reason":
                (
                    "Biometric ownership appears valid but "
                    "demographic information differs from "
                    "the Master Reference."
                ),

            "ready_for_execution":
                False,

            "requires_officer_approval":
                True,

            "requires_manager_approval":
                True,
        }


    if case_type == "DUPLICATE_IDENTITY":

        return {

            "action":
                "REVIEW_DUPLICATE_RECORDS",

            "target_system":
                "BIOMETRIC_SYSTEM",

            "target_record_id":
                primary_biometric,

            "reason":
                (
                    "Multiple biometric registrations appear "
                    "to resolve to the same identity."
                ),

            "ready_for_execution":
                False,

            "requires_officer_approval":
                True,

            "requires_manager_approval":
                True,
        }


    return {

        "action":
            "MANUAL_REVIEW_REQUIRED",

        "target_system":
            "BIOMETRIC_SYSTEM",

        "target_record_id":
            primary_biometric,

        "reason":
            (
                "The case requires human review before a specific "
                "correction can be safely proposed."
            ),

        "ready_for_execution":
            False,

        "requires_officer_approval":
            True,

        "requires_manager_approval":
            True,
    }


# ============================================================
# EVIDENCE SUMMARY
# ============================================================

def build_evidence_summary(
    case,
    findings
):

    evidence_items = []

    for finding in findings:

        evidence_items.append({

            "finding_id":
                finding[
                    "finding_id"
                ],

            "role":
                finding[
                    "finding_role"
                ],

            "type":
                finding[
                    "finding_type"
                ],

            "biometric_id":
                finding[
                    "biometric_id"
                ],

            "current_master_id":
                finding[
                    "current_master_id"
                ],

            "candidate_master_id":
                finding[
                    "suspected_correct_master_id"
                ],

            "confidence":
                safe_float(
                    finding[
                        "ai_confidence"
                    ]
                ),

            "risk":
                safe_float(
                    finding[
                        "risk_score"
                    ]
                ),

            "harm":
                safe_float(
                    finding[
                        "harm_impact_score"
                    ]
                ),

            "protective_priority":
                safe_float(
                    finding[
                        "protective_priority_score"
                    ]
                ),
        })

    return evidence_items


# ============================================================
# AI CONCLUSION
# ============================================================

def build_ai_conclusion(
    case
):

    canonical = (
        case[
            "canonical_master_id"
        ]
        or
        "UNRESOLVED"
    )

    confidence = safe_float(
        case[
            "canonical_identity_confidence"
        ]
    )

    priority = case[
        "priority"
    ]

    wrongly_affected = (
        parse_bool(
            case[
                "wrongly_affected_person"
            ]
        )
    )

    if wrongly_affected:

        return (
            f"The platform identified a high-impact identity "
            f"integrity issue. The strongest canonical identity "
            f"candidate is {canonical} with {confidence:.2f}% "
            f"confidence. Because another person may be wrongly "
            f"affected, the case is classified as {priority} "
            f"priority and should be reviewed immediately."
        )

    return (
        f"The aggregated evidence indicates that the strongest "
        f"canonical identity candidate is {canonical} with "
        f"{confidence:.2f}% confidence. The case is classified "
        f"as {priority} priority and is ready for Monitoring "
        f"Officer review."
    )


# ============================================================
# BUILD INVESTIGATION
# ============================================================

def build_investigation(
    case,
    findings,
    master_lookup,
    biometric_lookup
):

    investigation_id = (
        "INV-"
        + case[
            "case_id"
        ].replace(
            "CASE-",
            ""
        )
    )

    harm_analysis = (
        build_harm_analysis(
            case,
            master_lookup
        )
    )

    proposed_correction = (
        build_proposed_correction(
            case,
            biometric_lookup
        )
    )

    evidence = (
        build_evidence_summary(
            case,
            findings
        )
    )

    investigation = {

        "investigation_id":
            investigation_id,

        "case_id":
            case[
                "case_id"
            ],

        "title":
            determine_investigation_title(
                case
            ),

        "status":
            "READY_FOR_OFFICER_REVIEW",

        "priority":
            case[
                "priority"
            ],

        "case_type":
            case[
                "case_type"
            ],

        "primary_biometric_id":
            case[
                "primary_biometric_id"
            ],

        "affected_biometric_ids":
            split_csv_value(
                case[
                    "affected_biometric_ids"
                ]
            ),

        "current_master_ids":
            split_csv_value(
                case[
                    "current_master_ids"
                ]
            ),

        "canonical_master_id":
            case[
                "canonical_master_id"
            ],

        "canonical_identity_confidence":
            safe_float(
                case[
                    "canonical_identity_confidence"
                ]
            ),

        "risk_score":
            safe_float(
                case[
                    "risk_score"
                ]
            ),

        "harm_impact_score":
            safe_float(
                case[
                    "harm_impact_score"
                ]
            ),

        "protective_priority_score":
            safe_float(
                case[
                    "protective_priority_score"
                ]
            ),

        "wrongly_affected_person":
            parse_bool(
                case[
                    "wrongly_affected_person"
                ]
            ),

        "what_happened":
            case[
                "case_explanation"
            ],

        "probable_root_cause":
            determine_root_cause(
                case
            ),

        "harm_analysis":
            harm_analysis,

        "evidence":
            evidence,

        "ai_conclusion":
            build_ai_conclusion(
                case
            ),

        "proposed_correction":
            proposed_correction,

        "human_approval_required":
            True,

        "approval_stages": [
            "MONITORING_OFFICER",
            "MANAGER"
        ],

        "created_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),
    }

    return investigation


# ============================================================
# MAIN
# ============================================================

def main():

    print()
    print(
        "============================================"
    )

    print(
        " AI Identity Reconciliation Platform"
    )

    print(
        " Investigation Agent v0.1"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    cases = load_csv(
        CASES_FILE
    )

    case_findings = load_csv(
        CASE_FINDINGS_FILE
    )

    master_records = load_csv(
        MASTER_FILE
    )

    biometric_records = load_csv(
        BIOMETRIC_FILE
    )


    (
        master_lookup,
        biometric_lookup,
        findings_by_case
    ) = build_indexes(
        master_records,
        biometric_records,
        case_findings
    )


    investigations = []

    correction_rows = []


    for case in cases:

        case_id = case[
            "case_id"
        ]

        findings = (
            findings_by_case.get(
                case_id,
                []
            )
        )

        investigation = (
            build_investigation(
                case,
                findings,
                master_lookup,
                biometric_lookup
            )
        )

        investigations.append(
            investigation
        )


        correction = investigation[
            "proposed_correction"
        ]


        correction_rows.append({

            "case_id":
                case_id,

            "investigation_id":
                investigation[
                    "investigation_id"
                ],

            "priority":
                investigation[
                    "priority"
                ],

            "action":
                correction.get(
                    "action",
                    ""
                ),

            "target_system":
                correction.get(
                    "target_system",
                    ""
                ),

            "target_record_id":
                correction.get(
                    "target_record_id",
                    ""
                ),

            "field":
                correction.get(
                    "field",
                    ""
                ),

            "before":
                correction.get(
                    "before",
                    ""
                ),

            "after":
                correction.get(
                    "after",
                    ""
                ),

            "reason":
                correction.get(
                    "reason",
                    ""
                ),

            "officer_approval_required":
                correction.get(
                    "requires_officer_approval",
                    True
                ),

            "manager_approval_required":
                correction.get(
                    "requires_manager_approval",
                    True
                ),

            "execution_status":
                "NOT_AUTHORIZED",
        })


    # ========================================================
    # SORT
    # ========================================================

    priority_order = {

        "IMMEDIATE": 5,
        "CRITICAL": 4,
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1,
    }


    investigations.sort(

        key=lambda item: (

            1
            if item[
                "wrongly_affected_person"
            ]
            else 0,

            priority_order.get(
                item[
                    "priority"
                ],
                0
            ),

            item[
                "protective_priority_score"
            ],

            item[
                "harm_impact_score"
            ],

            item[
                "risk_score"
            ],
        ),

        reverse=True
    )


    # ========================================================
    # EXPORT JSON
    # ========================================================

    with INVESTIGATIONS_FILE.open(
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            investigations,
            file,
            indent=4
        )


    # ========================================================
    # EXPORT INVESTIGATION CSV
    # ========================================================

    investigation_rows = []


    for item in investigations:

        correction = item[
            "proposed_correction"
        ]

        investigation_rows.append({

            "investigation_id":
                item[
                    "investigation_id"
                ],

            "case_id":
                item[
                    "case_id"
                ],

            "title":
                item[
                    "title"
                ],

            "status":
                item[
                    "status"
                ],

            "priority":
                item[
                    "priority"
                ],

            "case_type":
                item[
                    "case_type"
                ],

            "primary_biometric_id":
                item[
                    "primary_biometric_id"
                ],

            "canonical_master_id":
                item[
                    "canonical_master_id"
                ],

            "canonical_confidence":
                item[
                    "canonical_identity_confidence"
                ],

            "risk_score":
                item[
                    "risk_score"
                ],

            "harm_impact_score":
                item[
                    "harm_impact_score"
                ],

            "protective_priority_score":
                item[
                    "protective_priority_score"
                ],

            "wrongly_affected_person":
                item[
                    "wrongly_affected_person"
                ],

            "ai_conclusion":
                item[
                    "ai_conclusion"
                ],

            "proposed_action":
                correction.get(
                    "action",
                    ""
                ),

            "before":
                correction.get(
                    "before",
                    ""
                ),

            "after":
                correction.get(
                    "after",
                    ""
                ),
        })


    write_csv(
        INVESTIGATIONS_CSV_FILE,
        investigation_rows
    )


    write_csv(
        RECOMMENDATIONS_FILE,
        correction_rows
    )


    # ========================================================
    # SUMMARY
    # ========================================================

    immediate = sum(

        1

        for item in investigations

        if item[
            "priority"
        ]
        ==
        "IMMEDIATE"
    )


    wrongly_affected = sum(

        1

        for item in investigations

        if item[
            "wrongly_affected_person"
        ]
    )


    automatic_reassignment_recommendations = sum(

        1

        for item in investigations

        if item[
            "proposed_correction"
        ].get(
            "action"
        )
        ==
        "REASSIGN_BIOMETRIC_IDENTITY"
    )


    manual_review = sum(

        1

        for item in investigations

        if item[
            "proposed_correction"
        ].get(
            "action"
        )
        ==
        "MANUAL_REVIEW_REQUIRED"
    )


    summary = {

        "project":
            "AI Identity Reconciliation Platform",

        "agent":
            "Investigation Agent v0.1",

        "total_cases":
            len(
                cases
            ),

        "investigations_created":
            len(
                investigations
            ),

        "ready_for_officer_review":
            len(
                investigations
            ),

        "immediate_priority_cases":
            immediate,

        "wrongly_affected_cases":
            wrongly_affected,

        "reassignment_recommendations":
            automatic_reassignment_recommendations,

        "manual_review_cases":
            manual_review,

        "generated_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),
    }


    with SUMMARY_FILE.open(
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            summary,
            file,
            indent=4
        )


    # ========================================================
    # DISPLAY
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " INVESTIGATION AGENT COMPLETE"
    )

    print(
        "============================================"
    )


    print(
        f"\nCases Received: "
        f"{summary['total_cases']}"
    )

    print(
        f"Investigations Created: "
        f"{summary['investigations_created']}"
    )

    print(
        f"Ready for Officer Review: "
        f"{summary['ready_for_officer_review']}"
    )

    print(
        f"Immediate Priority Cases: "
        f"{summary['immediate_priority_cases']}"
    )

    print(
        f"Wrongly Affected Cases: "
        f"{summary['wrongly_affected_cases']}"
    )

    print(
        f"Biometric Reassignment Recommendations: "
        f"{summary['reassignment_recommendations']}"
    )

    print(
        f"Manual Review Cases: "
        f"{summary['manual_review_cases']}"
    )


    print()
    print(
        "Highest Priority Investigations:"
    )


    for investigation in (
        investigations[:5]
    ):

        print()

        print(
            f"{investigation['case_id']} | "
            f"{investigation['title']}"
        )

        print(
            f"Priority: "
            f"{investigation['priority']}"
        )

        print(
            f"Biometric: "
            f"{investigation['primary_biometric_id']}"
        )

        print(
            f"Canonical Identity: "
            f"{investigation['canonical_master_id']}"
        )

        print(
            f"Confidence: "
            f"{investigation['canonical_identity_confidence']}"
        )

        print(
            f"Harm: "
            f"{investigation['harm_impact_score']}"
        )

        print(
            f"Protective Priority: "
            f"{investigation['protective_priority_score']}"
        )

        print(
            f"Recommended Action: "
            f"{investigation['proposed_correction'].get('action')}"
        )

        print(
            f"Status: "
            f"{investigation['status']}"
        )


    print()
    print(
        "Output:"
    )

    print(
        f" - {INVESTIGATIONS_FILE}"
    )

    print(
        f" - {INVESTIGATIONS_CSV_FILE}"
    )

    print(
        f" - {RECOMMENDATIONS_FILE}"
    )

    print(
        f" - {SUMMARY_FILE}"
    )

    print()


if __name__ == "__main__":
    main()