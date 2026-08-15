import csv
import json
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Detection Performance Evaluator
# Version: 0.1
#
# PURPOSE:
# Compare reconciliation findings against synthetic ground truth.
#
# IMPORTANT:
# This file is for TESTING AND VALIDATION ONLY.
#
# The Reconciliation Engine and AI Agents must NEVER use
# ground_truth.csv during detection or investigation.
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


OUTPUT_DIR = (
    Path(__file__).resolve().parent
    / "output"
)


REPORT_FILE = (
    OUTPUT_DIR
    / "performance_report.json"
)


CASE_RESULTS_FILE = (
    OUTPUT_DIR
    / "case_evaluation.csv"
)


MISSED_CASES_FILE = (
    OUTPUT_DIR
    / "missed_cases.csv"
)


FALSE_POSITIVES_FILE = (
    OUTPUT_DIR
    / "false_positive_findings.csv"
)


# ============================================================
# ACCEPTABLE DETECTION MAPPINGS
# ============================================================

ACCEPTABLE_FINDING_TYPES = {

    "WRONG_MAPPING": {
        "WRONG_MAPPING",
        "HARM_IMPACT",
    },

    "HARM_IMPACT": {
        "HARM_IMPACT",
    },

    "DATA_MISMATCH": {
        "DATA_MISMATCH",
    },

    "ORPHAN_RECORD": {
        "ORPHAN_RECORD",
    },

    "DUPLICATE_IDENTITY": {
        "DUPLICATE_IDENTITY",
    },

    "DUPLICATE_BIOMETRIC": {
        "DUPLICATE_BIOMETRIC",
    },

    # Complex conflicts may produce several valid findings.
    "COMPLEX_CONFLICT": {
        "WRONG_MAPPING",
        "HARM_IMPACT",
        "DUPLICATE_BIOMETRIC",
    },
}


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


def parse_bool(value):

    return str(value).strip().lower() in {
        "true",
        "1",
        "yes",
        "y"
    }


def safe_float(value):

    try:
        return float(value)

    except (
        TypeError,
        ValueError
    ):
        return 0.0


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


def calculate_f1(
    precision,
    recall
):

    if (
        precision + recall
        == 0
    ):
        return 0.0

    return round(
        2
        * (
            precision
            * recall
        )
        / (
            precision
            + recall
        ),
        2
    )


# ============================================================
# FINDING INDEX
# ============================================================

def build_findings_index(
    findings
):

    index = {}

    for finding in findings:

        biometric_id = finding[
            "biometric_id"
        ]

        index.setdefault(
            biometric_id,
            []
        ).append(
            finding
        )

    return index


# ============================================================
# FIND BEST MATCHING FINDING
# ============================================================

def find_best_matching_finding(
    truth_case,
    candidate_findings
):

    expected_type = truth_case[
        "anomaly_type"
    ]

    acceptable_types = (
        ACCEPTABLE_FINDING_TYPES.get(
            expected_type,
            {
                expected_type
            }
        )
    )

    compatible = [
        finding
        for finding in candidate_findings
        if finding[
            "finding_type"
        ]
        in acceptable_types
    ]

    if not compatible:
        return None

    compatible.sort(
        key=lambda finding: (
            safe_float(
                finding.get(
                    "protective_priority_score"
                )
            ),
            safe_float(
                finding.get(
                    "risk_score"
                )
            ),
            safe_float(
                finding.get(
                    "ai_confidence"
                )
            ),
        ),
        reverse=True
    )

    return compatible[0]


# ============================================================
# CASE EVALUATION
# ============================================================

def evaluate_cases(
    ground_truth,
    findings
):

    findings_index = (
        build_findings_index(
            findings
        )
    )

    results = []

    missed_cases = []

    detected_count = 0

    exact_type_count = 0

    correction_candidate_total = 0

    correction_candidate_correct = 0

    protective_total = 0

    protective_detected = 0

    protective_correctly_prioritized = 0


    candidate_resolution_types = {
        "WRONG_MAPPING",
        "HARM_IMPACT",
        "ORPHAN_RECORD",
        "COMPLEX_CONFLICT",
    }


    for truth_case in ground_truth:

        biometric_id = truth_case[
            "biometric_id"
        ]

        anomaly_type = truth_case[
            "anomaly_type"
        ]

        candidate_findings = (
            findings_index.get(
                biometric_id,
                []
            )
        )

        best_finding = (
            find_best_matching_finding(
                truth_case,
                candidate_findings
            )
        )

        detected = (
            best_finding
            is not None
        )

        exact_type_match = False

        candidate_correct = None

        protective_detected_case = None

        protective_priority_correct = None


        if detected:

            detected_count += 1

            exact_type_match = (
                best_finding[
                    "finding_type"
                ]
                ==
                anomaly_type
            )

            if exact_type_match:
                exact_type_count += 1


        # ----------------------------------------------------
        # Evaluate identity resolution
        # ----------------------------------------------------

        if (
            anomaly_type
            in candidate_resolution_types
        ):

            expected_master_id = (
                truth_case.get(
                    "expected_correct_master_id"
                )
            )

            if expected_master_id:

                correction_candidate_total += 1

                if detected:

                    suspected_master_id = (
                        best_finding.get(
                            "suspected_correct_master_id"
                        )
                    )

                    candidate_correct = (
                        suspected_master_id
                        ==
                        expected_master_id
                    )

                else:

                    candidate_correct = False


                if candidate_correct:

                    correction_candidate_correct += 1


        # ----------------------------------------------------
        # Evaluate protective priority
        # ----------------------------------------------------

        if (
            anomaly_type
            ==
            "HARM_IMPACT"
        ):

            protective_total += 1

            if detected:

                protective_detected_case = (
                    best_finding[
                        "finding_type"
                    ]
                    ==
                    "HARM_IMPACT"
                )

                if protective_detected_case:

                    protective_detected += 1


                wrongly_affected = (
                    parse_bool(
                        best_finding.get(
                            "wrongly_affected_person"
                        )
                    )
                )

                protective_score = (
                    safe_float(
                        best_finding.get(
                            "protective_priority_score"
                        )
                    )
                )

                protective_priority_correct = (
                    wrongly_affected
                    and protective_score
                    >= 95
                )

                if protective_priority_correct:

                    protective_correctly_prioritized += 1

            else:

                protective_detected_case = False
                protective_priority_correct = False


        result = {

            "biometric_id":
                biometric_id,

            "expected_anomaly_type":
                anomaly_type,

            "detected":
                detected,

            "detected_finding_type":
                (
                    best_finding[
                        "finding_type"
                    ]
                    if detected
                    else ""
                ),

            "exact_type_match":
                exact_type_match,

            "expected_correct_master_id":
                truth_case.get(
                    "expected_correct_master_id",
                    ""
                ),

            "detected_correct_master_id":
                (
                    best_finding.get(
                        "suspected_correct_master_id",
                        ""
                    )
                    if detected
                    else ""
                ),

            "identity_resolution_correct":
                (
                    candidate_correct
                    if candidate_correct
                    is not None
                    else ""
                ),

            "expected_harm_impact":
                truth_case.get(
                    "harm_impact",
                    ""
                ),

            "wrongly_affected_detected":
                (
                    best_finding.get(
                        "wrongly_affected_person",
                        ""
                    )
                    if detected
                    else ""
                ),

            "protective_priority_score":
                (
                    best_finding.get(
                        "protective_priority_score",
                        ""
                    )
                    if detected
                    else ""
                ),

            "protective_priority_correct":
                (
                    protective_priority_correct
                    if protective_priority_correct
                    is not None
                    else ""
                ),

            "risk_score":
                (
                    best_finding.get(
                        "risk_score",
                        ""
                    )
                    if detected
                    else ""
                ),

            "ai_confidence":
                (
                    best_finding.get(
                        "ai_confidence",
                        ""
                    )
                    if detected
                    else ""
                ),
        }

        results.append(
            result
        )

        if not detected:

            missed_cases.append(
                truth_case
            )


    metrics = {

        "total_ground_truth_cases":
            len(
                ground_truth
            ),

        "detected_ground_truth_cases":
            detected_count,

        "missed_ground_truth_cases":
            (
                len(
                    ground_truth
                )
                - detected_count
            ),

        "case_detection_recall":
            percentage(
                detected_count,
                len(
                    ground_truth
                )
            ),

        "exact_type_matches":
            exact_type_count,

        "exact_type_accuracy":
            percentage(
                exact_type_count,
                len(
                    ground_truth
                )
            ),

        "identity_resolution_cases":
            correction_candidate_total,

        "correct_identity_resolutions":
            correction_candidate_correct,

        "identity_resolution_accuracy":
            percentage(
                correction_candidate_correct,
                correction_candidate_total
            ),

        "protective_priority_cases":
            protective_total,

        "protective_cases_detected":
            protective_detected,

        "protective_detection_recall":
            percentage(
                protective_detected,
                protective_total
            ),

        "protective_cases_correctly_prioritized":
            protective_correctly_prioritized,

        "protective_priority_accuracy":
            percentage(
                protective_correctly_prioritized,
                protective_total
            ),
    }

    return (
        results,
        missed_cases,
        metrics
    )


# ============================================================
# FALSE POSITIVE ANALYSIS
# ============================================================

def analyze_false_positives(
    ground_truth,
    findings
):

    truth_biometric_ids = {
        item[
            "biometric_id"
        ]
        for item in ground_truth
    }

    false_positive_findings = [
        finding
        for finding in findings
        if finding[
            "biometric_id"
        ]
        not in truth_biometric_ids
    ]

    true_related_findings = [
        finding
        for finding in findings
        if finding[
            "biometric_id"
        ]
        in truth_biometric_ids
    ]

    precision = percentage(
        len(
            true_related_findings
        ),
        len(
            findings
        )
    )

    return (
        false_positive_findings,
        precision
    )


# ============================================================
# TYPE BREAKDOWN
# ============================================================

def build_type_breakdown(
    ground_truth,
    case_results
):

    anomaly_types = sorted(
        {
            item[
                "anomaly_type"
            ]
            for item in ground_truth
        }
    )

    breakdown = {}

    for anomaly_type in anomaly_types:

        truth_cases = [
            item
            for item in ground_truth
            if item[
                "anomaly_type"
            ]
            ==
            anomaly_type
        ]

        evaluated_cases = [
            item
            for item in case_results
            if item[
                "expected_anomaly_type"
            ]
            ==
            anomaly_type
        ]

        detected = sum(
            1
            for item in evaluated_cases
            if item[
                "detected"
            ]
        )

        exact = sum(
            1
            for item in evaluated_cases
            if item[
                "exact_type_match"
            ]
        )

        breakdown[
            anomaly_type
        ] = {

            "expected":
                len(
                    truth_cases
                ),

            "detected":
                detected,

            "missed":
                (
                    len(
                        truth_cases
                    )
                    - detected
                ),

            "recall":
                percentage(
                    detected,
                    len(
                        truth_cases
                    )
                ),

            "exact_type_matches":
                exact,
        }

    return breakdown


# ============================================================
# CSV WRITER
# ============================================================

def write_csv(
    path,
    rows
):

    if not rows:
        return

    fields = list(
        rows[0].keys()
    )

    with path.open(
        "w",
        encoding="utf-8",
        newline=""
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fields
        )

        writer.writeheader()

        writer.writerows(
            rows
        )


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
        " Detection Performance Evaluator v0.1"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    print(
        "\nLoading synthetic Ground Truth..."
    )

    ground_truth = load_csv(
        GROUND_TRUTH_FILE
    )

    print(
        f"Ground Truth Cases: "
        f"{len(ground_truth)}"
    )


    print(
        "\nLoading detected findings..."
    )

    findings = load_csv(
        FINDINGS_FILE
    )

    print(
        f"Detected Findings: "
        f"{len(findings)}"
    )


    print(
        "\nEvaluating detection performance..."
    )


    (
        case_results,
        missed_cases,
        metrics
    ) = evaluate_cases(
        ground_truth,
        findings
    )


    (
        false_positive_findings,
        precision
    ) = analyze_false_positives(
        ground_truth,
        findings
    )


    type_breakdown = (
        build_type_breakdown(
            ground_truth,
            case_results
        )
    )


    recall = metrics[
        "case_detection_recall"
    ]


    f1 = calculate_f1(
        precision,
        recall
    )


    report = {

        "project":
            "AI Identity Reconciliation Platform",

        "evaluation_engine":
            "Detection Performance Evaluator v0.1",

        "environment":
            "Synthetic Demo Only",

        "generated_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),

        "overall_performance": {

            "precision":
                precision,

            "recall":
                recall,

            "f1_score":
                f1,

            "total_ground_truth_cases":
                metrics[
                    "total_ground_truth_cases"
                ],

            "detected_ground_truth_cases":
                metrics[
                    "detected_ground_truth_cases"
                ],

            "missed_ground_truth_cases":
                metrics[
                    "missed_ground_truth_cases"
                ],

            "total_findings":
                len(
                    findings
                ),

            "false_positive_findings":
                len(
                    false_positive_findings
                ),
        },

        "identity_resolution": {

            "evaluated_cases":
                metrics[
                    "identity_resolution_cases"
                ],

            "correct_resolutions":
                metrics[
                    "correct_identity_resolutions"
                ],

            "accuracy":
                metrics[
                    "identity_resolution_accuracy"
                ],
        },

        "protective_priority": {

            "expected_harm_cases":
                metrics[
                    "protective_priority_cases"
                ],

            "detected_harm_cases":
                metrics[
                    "protective_cases_detected"
                ],

            "detection_recall":
                metrics[
                    "protective_detection_recall"
                ],

            "correctly_prioritized":
                metrics[
                    "protective_cases_correctly_prioritized"
                ],

            "priority_accuracy":
                metrics[
                    "protective_priority_accuracy"
                ],
        },

        "exact_type_accuracy":
            metrics[
                "exact_type_accuracy"
            ],

        "anomaly_type_breakdown":
            type_breakdown,
    }


    with REPORT_FILE.open(
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            report,
            file,
            indent=4
        )


    write_csv(
        CASE_RESULTS_FILE,
        case_results
    )


    if missed_cases:

        write_csv(
            MISSED_CASES_FILE,
            missed_cases
        )


    if false_positive_findings:

        write_csv(
            FALSE_POSITIVES_FILE,
            false_positive_findings
        )


    # ========================================================
    # DISPLAY RESULTS
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " PERFORMANCE RESULTS"
    )

    print(
        "============================================"
    )


    print(
        f"\nPrecision: "
        f"{precision}%"
    )

    print(
        f"Recall: "
        f"{recall}%"
    )

    print(
        f"F1 Score: "
        f"{f1}%"
    )


    print(
        f"\nExpected Cases: "
        f"{metrics['total_ground_truth_cases']}"
    )

    print(
        f"Detected Cases: "
        f"{metrics['detected_ground_truth_cases']}"
    )

    print(
        f"Missed Cases: "
        f"{metrics['missed_ground_truth_cases']}"
    )


    print(
        f"\nIdentity Resolution Accuracy: "
        f"{metrics['identity_resolution_accuracy']}%"
    )


    print(
        f"\nProtective Priority Detection: "
        f"{metrics['protective_detection_recall']}%"
    )

    print(
        f"Protective Priority Accuracy: "
        f"{metrics['protective_priority_accuracy']}%"
    )


    print(
        "\nAnomaly Type Performance:"
    )


    for anomaly_type, values in (
        type_breakdown.items()
    ):

        print(
            f" - "
            f"{anomaly_type}: "
            f"{values['detected']} / "
            f"{values['expected']} "
            f"({values['recall']}%)"
        )


    if missed_cases:

        print(
            "\nMissed Cases:"
        )

        for case in missed_cases:

            print(
                f" - "
                f"{case['biometric_id']} | "
                f"{case['anomaly_type']}"
            )


    print()
    print(
        "Output:"
    )

    print(
        f" - {REPORT_FILE}"
    )

    print(
        f" - {CASE_RESULTS_FILE}"
    )


    if missed_cases:

        print(
            f" - {MISSED_CASES_FILE}"
        )


    if false_positive_findings:

        print(
            f" - {FALSE_POSITIVES_FILE}"
        )


    print()
    print(
        "IMPORTANT:"
    )

    print(
        "Ground Truth was used ONLY after detection "
        "to measure performance."
    )

    print(
        "It must never be provided to the "
        "Reconciliation Engine or AI Agents."
    )

    print()


if __name__ == "__main__":
    main()