import csv
import json
from collections import Counter
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Diagnostic Analysis Engine
# Version: 0.1
#
# PURPOSE:
# Diagnose:
# 1. False-positive findings
# 2. Secondary/corroborating findings
# 3. Case-level precision
# 4. Identity resolution failures
#
# IMPORTANT:
# This script is evaluation-only.
# Ground truth must never be used by the live reconciliation
# or investigation engines.
# ============================================================


REPO_ROOT = Path(__file__).resolve().parent.parent


GROUND_TRUTH_FILE = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
    / "ground_truth.csv"
)


FINDINGS_FILE = (
    REPO_ROOT
    / "reconciliation-engine"
    / "output"
    / "findings.csv"
)


CASE_EVALUATION_FILE = (
    REPO_ROOT
    / "evaluation"
    / "output"
    / "case_evaluation.csv"
)


OUTPUT_DIR = (
    REPO_ROOT
    / "evaluation"
    / "output"
)


DIAGNOSTIC_REPORT_FILE = (
    OUTPUT_DIR
    / "diagnostic_report.json"
)


FALSE_POSITIVE_DIAGNOSTICS_FILE = (
    OUTPUT_DIR
    / "false_positive_diagnostics.csv"
)


RESOLUTION_ERRORS_FILE = (
    OUTPUT_DIR
    / "identity_resolution_errors.csv"
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


def safe_json(value):

    if not value:
        return {}

    try:
        return json.loads(value)

    except (
        json.JSONDecodeError,
        TypeError
    ):
        return {}


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


def percentage(
    numerator,
    denominator
):

    if denominator == 0:
        return 0.0

    return round(
        (
            numerator
            / denominator
        )
        * 100,
        2
    )


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
# BUILD GROUND TRUTH INDEXES
# ============================================================

def build_ground_truth_indexes(
    ground_truth
):

    truth_by_biometric = {}

    related_to_truth = {}

    for case in ground_truth:

        biometric_id = case[
            "biometric_id"
        ]

        truth_by_biometric[
            biometric_id
        ] = case

        related_id = (
            case.get(
                "related_biometric_id",
                ""
            )
            .strip()
        )

        if related_id:

            related_to_truth.setdefault(
                related_id,
                []
            ).append(
                case
            )

    return (
        truth_by_biometric,
        related_to_truth
    )


# ============================================================
# FALSE POSITIVE CLASSIFICATION
# ============================================================

def classify_false_positive(
    finding,
    truth_by_biometric,
    related_to_truth
):

    biometric_id = finding[
        "biometric_id"
    ]

    evidence = safe_json(
        finding.get(
            "evidence"
        )
    )

    linked_truth_cases = []

    reason = ""

    classification = (
        "UNEXPLAINED_FALSE_POSITIVE"
    )


    # --------------------------------------------------------
    # Type 1:
    # This biometric is explicitly the related partner
    # of a seeded Ground Truth case.
    # --------------------------------------------------------

    if biometric_id in related_to_truth:

        classification = (
            "SECONDARY_RELATED_RECORD"
        )

        linked_truth_cases.extend(
            related_to_truth[
                biometric_id
            ]
        )

        reason = (
            "This record is explicitly listed as the "
            "related biometric partner of a seeded "
            "Ground Truth anomaly."
        )


    # --------------------------------------------------------
    # Type 2:
    # Finding evidence references a Ground Truth biometric.
    # --------------------------------------------------------

    related_records = evidence.get(
        "related_biometric_records",
        []
    )

    if isinstance(
        related_records,
        str
    ):

        related_records = [
            related_records
        ]


    evidence_truth_ids = [
        related_id
        for related_id in related_records
        if related_id
        in truth_by_biometric
    ]


    if (
        classification
        ==
        "UNEXPLAINED_FALSE_POSITIVE"
        and evidence_truth_ids
    ):

        classification = (
            "SECONDARY_EVIDENCE_FINDING"
        )

        reason = (
            "The finding is attached to a secondary "
            "record, but its evidence directly references "
            "a seeded Ground Truth biometric."
        )

        for truth_id in evidence_truth_ids:

            linked_truth_cases.append(
                truth_by_biometric[
                    truth_id
                ]
            )


    # --------------------------------------------------------
    # Unique linked Ground Truth IDs
    # --------------------------------------------------------

    linked_truth_ids = []

    linked_anomaly_types = []

    for case in linked_truth_cases:

        truth_id = case[
            "biometric_id"
        ]

        anomaly_type = case[
            "anomaly_type"
        ]

        if truth_id not in linked_truth_ids:
            linked_truth_ids.append(
                truth_id
            )

        if (
            anomaly_type
            not in linked_anomaly_types
        ):
            linked_anomaly_types.append(
                anomaly_type
            )


    return {
        "classification":
            classification,

        "reason":
            reason,

        "linked_ground_truth_ids":
            ",".join(
                linked_truth_ids
            ),

        "linked_anomaly_types":
            ",".join(
                linked_anomaly_types
            ),
    }


# ============================================================
# DIAGNOSE FINDINGS
# ============================================================

def diagnose_false_positives(
    ground_truth,
    findings
):

    (
        truth_by_biometric,
        related_to_truth
    ) = build_ground_truth_indexes(
        ground_truth
    )


    truth_ids = set(
        truth_by_biometric.keys()
    )


    diagnostic_rows = []


    for finding in findings:

        biometric_id = finding[
            "biometric_id"
        ]

        if biometric_id in truth_ids:
            continue


        classification = (
            classify_false_positive(
                finding,
                truth_by_biometric,
                related_to_truth
            )
        )


        diagnostic_rows.append({

            "finding_id":
                finding.get(
                    "finding_id",
                    ""
                ),

            "biometric_id":
                biometric_id,

            "finding_type":
                finding.get(
                    "finding_type",
                    ""
                ),

            "severity":
                finding.get(
                    "severity",
                    ""
                ),

            "current_master_id":
                finding.get(
                    "current_master_id",
                    ""
                ),

            "suspected_correct_master_id":
                finding.get(
                    "suspected_correct_master_id",
                    ""
                ),

            "ai_confidence":
                finding.get(
                    "ai_confidence",
                    ""
                ),

            "risk_score":
                finding.get(
                    "risk_score",
                    ""
                ),

            "protective_priority_score":
                finding.get(
                    "protective_priority_score",
                    ""
                ),

            "classification":
                classification[
                    "classification"
                ],

            "diagnostic_reason":
                classification[
                    "reason"
                ],

            "linked_ground_truth_ids":
                classification[
                    "linked_ground_truth_ids"
                ],

            "linked_anomaly_types":
                classification[
                    "linked_anomaly_types"
                ],

        })


    return diagnostic_rows


# ============================================================
# IDENTITY RESOLUTION ERROR ANALYSIS
# ============================================================

def diagnose_resolution_errors(
    case_evaluation,
    ground_truth
):

    truth_lookup = {
        case[
            "biometric_id"
        ]: case
        for case in ground_truth
    }


    errors = []


    for row in case_evaluation:

        value = str(
            row.get(
                "identity_resolution_correct",
                ""
            )
        ).strip().lower()


        if value != "false":
            continue


        biometric_id = row[
            "biometric_id"
        ]

        truth = truth_lookup.get(
            biometric_id,
            {}
        )


        errors.append({

            "biometric_id":
                biometric_id,

            "anomaly_type":
                row.get(
                    "expected_anomaly_type",
                    ""
                ),

            "detected_finding_type":
                row.get(
                    "detected_finding_type",
                    ""
                ),

            "expected_correct_master_id":
                row.get(
                    "expected_correct_master_id",
                    ""
                ),

            "detected_correct_master_id":
                row.get(
                    "detected_correct_master_id",
                    ""
                ),

            "current_linked_master_id":
                truth.get(
                    "current_linked_master_id",
                    ""
                ),

            "related_biometric_id":
                truth.get(
                    "related_biometric_id",
                    ""
                ),

            "risk_score":
                row.get(
                    "risk_score",
                    ""
                ),

            "ai_confidence":
                row.get(
                    "ai_confidence",
                    ""
                ),

            "ground_truth_notes":
                truth.get(
                    "notes",
                    ""
                ),
        })


    return errors


# ============================================================
# CASE-LEVEL ANALYSIS
# ============================================================

def calculate_case_level_metrics(
    ground_truth,
    findings
):

    truth_ids = {
        case[
            "biometric_id"
        ]
        for case in ground_truth
    }


    finding_ids = {
        finding[
            "biometric_id"
        ]
        for finding in findings
    }


    detected_truth_ids = (
        truth_ids
        &
        finding_ids
    )


    false_alert_ids = (
        finding_ids
        -
        truth_ids
    )


    missed_ids = (
        truth_ids
        -
        finding_ids
    )


    case_precision = percentage(
        len(
            detected_truth_ids
        ),
        (
            len(
                detected_truth_ids
            )
            +
            len(
                false_alert_ids
            )
        )
    )


    case_recall = percentage(
        len(
            detected_truth_ids
        ),
        len(
            truth_ids
        )
    )


    return {

        "expected_cases":
            len(
                truth_ids
            ),

        "detected_expected_cases":
            len(
                detected_truth_ids
            ),

        "false_alert_case_ids":
            len(
                false_alert_ids
            ),

        "missed_case_ids":
            len(
                missed_ids
            ),

        "case_level_precision":
            case_precision,

        "case_level_recall":
            case_recall,

        "false_alert_biometric_ids":
            sorted(
                list(
                    false_alert_ids
                )
            ),

        "missed_biometric_ids":
            sorted(
                list(
                    missed_ids
                )
            ),
    }


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
        " Diagnostic Analysis Engine v0.1"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    ground_truth = load_csv(
        GROUND_TRUTH_FILE
    )


    findings = load_csv(
        FINDINGS_FILE
    )


    case_evaluation = load_csv(
        CASE_EVALUATION_FILE
    )


    print(
        f"\nGround Truth Cases: "
        f"{len(ground_truth)}"
    )


    print(
        f"Findings: "
        f"{len(findings)}"
    )


    # ========================================================
    # FALSE POSITIVE DIAGNOSTICS
    # ========================================================

    false_positive_diagnostics = (
        diagnose_false_positives(
            ground_truth,
            findings
        )
    )


    classification_counts = Counter(

        row[
            "classification"
        ]

        for row
        in false_positive_diagnostics
    )


    finding_type_counts = Counter(

        row[
            "finding_type"
        ]

        for row
        in false_positive_diagnostics
    )


    unexplained_findings = [
        row
        for row
        in false_positive_diagnostics
        if row[
            "classification"
        ]
        ==
        "UNEXPLAINED_FALSE_POSITIVE"
    ]


    secondary_findings = [
        row
        for row
        in false_positive_diagnostics
        if row[
            "classification"
        ]
        in {
            "SECONDARY_RELATED_RECORD",
            "SECONDARY_EVIDENCE_FINDING",
        }
    ]


    # ========================================================
    # RESOLUTION ERRORS
    # ========================================================

    resolution_errors = (
        diagnose_resolution_errors(
            case_evaluation,
            ground_truth
        )
    )


    # ========================================================
    # CASE LEVEL METRICS
    # ========================================================

    case_metrics = (
        calculate_case_level_metrics(
            ground_truth,
            findings
        )
    )


    # ========================================================
    # DIAGNOSTIC PRECISION
    #
    # Secondary findings are excluded because they are
    # supporting/corroborating findings rather than
    # independent false alerts.
    # ========================================================

    findings_on_truth_records = sum(

        1

        for finding in findings

        if finding[
            "biometric_id"
        ]
        in {
            case[
                "biometric_id"
            ]
            for case
            in ground_truth
        }
    )


    diagnostic_denominator = (
        findings_on_truth_records
        +
        len(
            unexplained_findings
        )
    )


    diagnostic_precision = percentage(
        findings_on_truth_records,
        diagnostic_denominator
    )


    # ========================================================
    # REPORT
    # ========================================================

    report = {

        "project":
            "AI Identity Reconciliation Platform",

        "diagnostic_engine":
            "Diagnostic Analysis Engine v0.1",

        "environment":
            "Synthetic Demo Only",

        "generated_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),

        "finding_level_analysis": {

            "total_findings":
                len(
                    findings
                ),

            "original_false_positive_findings":
                len(
                    false_positive_diagnostics
                ),

            "secondary_or_corroborating_findings":
                len(
                    secondary_findings
                ),

            "unexplained_false_positive_findings":
                len(
                    unexplained_findings
                ),

            "diagnostic_precision_excluding_secondary_findings":
                diagnostic_precision,

            "false_positive_classification":
                dict(
                    classification_counts
                ),

            "false_positive_finding_types":
                dict(
                    finding_type_counts
                ),
        },

        "case_level_analysis":
            case_metrics,

        "identity_resolution_analysis": {

            "resolution_errors":
                len(
                    resolution_errors
                ),

            "error_records":
                resolution_errors,
        },
    }


    with DIAGNOSTIC_REPORT_FILE.open(
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            report,
            file,
            indent=4
        )


    write_csv(
        FALSE_POSITIVE_DIAGNOSTICS_FILE,
        false_positive_diagnostics
    )


    if resolution_errors:

        write_csv(
            RESOLUTION_ERRORS_FILE,
            resolution_errors
        )


    # ========================================================
    # DISPLAY
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " FALSE POSITIVE DIAGNOSTICS"
    )

    print(
        "============================================"
    )


    print(
        f"\nOriginal False Positive Findings: "
        f"{len(false_positive_diagnostics)}"
    )


    print(
        f"Secondary / Corroborating Findings: "
        f"{len(secondary_findings)}"
    )


    print(
        f"Unexplained False Positives: "
        f"{len(unexplained_findings)}"
    )


    print(
        f"Diagnostic Precision "
        f"(excluding secondary findings): "
        f"{diagnostic_precision}%"
    )


    print(
        "\nClassification:"
    )


    for classification, count in (
        classification_counts.items()
    ):

        print(
            f" - "
            f"{classification}: "
            f"{count}"
        )


    print(
        "\nFalse Positive Finding Types:"
    )


    for finding_type, count in (
        finding_type_counts.items()
    ):

        print(
            f" - "
            f"{finding_type}: "
            f"{count}"
        )


    # ========================================================
    # CASE LEVEL
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " CASE LEVEL ANALYSIS"
    )

    print(
        "============================================"
    )


    print(
        f"\nCase-Level Precision: "
        f"{case_metrics['case_level_precision']}%"
    )


    print(
        f"Case-Level Recall: "
        f"{case_metrics['case_level_recall']}%"
    )


    print(
        f"False Alert Case IDs: "
        f"{case_metrics['false_alert_case_ids']}"
    )


    print(
        f"Missed Case IDs: "
        f"{case_metrics['missed_case_ids']}"
    )


    # ========================================================
    # RESOLUTION
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " IDENTITY RESOLUTION ERRORS"
    )

    print(
        "============================================"
    )


    print(
        f"\nResolution Errors: "
        f"{len(resolution_errors)}"
    )


    for error in resolution_errors:

        print()

        print(
            f"Biometric ID: "
            f"{error['biometric_id']}"
        )

        print(
            f"Anomaly Type: "
            f"{error['anomaly_type']}"
        )

        print(
            f"Expected Identity: "
            f"{error['expected_correct_master_id']}"
        )

        print(
            f"Detected Identity: "
            f"{error['detected_correct_master_id']}"
        )

        print(
            f"Current Link: "
            f"{error['current_linked_master_id']}"
        )

        print(
            f"Related Biometric: "
            f"{error['related_biometric_id']}"
        )

        print(
            f"AI Confidence: "
            f"{error['ai_confidence']}"
        )


    # ========================================================
    # UNEXPLAINED FALSE POSITIVES
    # ========================================================

    if unexplained_findings:

        print()
        print(
            "============================================"
        )

        print(
            " UNEXPLAINED FALSE POSITIVES"
        )

        print(
            "============================================"
        )


        for finding in (
            unexplained_findings[:20]
        ):

            print(
                f"\n"
                f"{finding['finding_id']} | "
                f"{finding['biometric_id']} | "
                f"{finding['finding_type']} | "
                f"Current: "
                f"{finding['current_master_id']} | "
                f"Candidate: "
                f"{finding['suspected_correct_master_id']}"
            )


    print()
    print(
        "============================================"
    )

    print(
        " DIAGNOSTIC COMPLETE"
    )

    print(
        "============================================"
    )


    print(
        f"\nReport:"
        f"\n{DIAGNOSTIC_REPORT_FILE}"
    )


    print()


if __name__ == "__main__":
    main()