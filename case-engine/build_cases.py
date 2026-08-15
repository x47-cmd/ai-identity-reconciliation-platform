import csv
import json
from collections import defaultdict
from pathlib import Path
from datetime import datetime


# ============================================================
# AI Identity Reconciliation Platform
# Case Aggregation Engine
# Version: 0.1
#
# PURPOSE:
# Convert raw reconciliation findings into coherent cases.
#
# Multiple findings may represent different pieces of evidence
# for the same underlying identity problem.
#
# Examples:
#
# WRONG_MAPPING
# + DUPLICATE_BIOMETRIC
# + DATA_MISMATCH
#
# may all belong to ONE investigation case.
#
# This engine:
#
# 1. Links related biometric records
# 2. Groups corroborating findings
# 3. Determines the primary finding
# 4. Resolves the canonical identity candidate
# 5. Calculates final case priority
# 6. Produces one investigation case per connected issue
#
# Synthetic Demo Only
# ============================================================


REPO_ROOT = (
    Path(__file__)
    .resolve()
    .parent
    .parent
)


FINDINGS_FILE = (
    REPO_ROOT
    / "reconciliation-engine"
    / "output"
    / "findings.csv"
)


OUTPUT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    / "output"
)


CASES_FILE = (
    OUTPUT_DIR
    / "cases.csv"
)


CASES_JSON_FILE = (
    OUTPUT_DIR
    / "cases.json"
)


CASE_FINDINGS_FILE = (
    OUTPUT_DIR
    / "case_findings.csv"
)


SUMMARY_FILE = (
    OUTPUT_DIR
    / "case_summary.json"
)


# ============================================================
# CASE TYPE PRIORITY
# ============================================================

FINDING_TYPE_PRIORITY = {

    "HARM_IMPACT":
        100,

    "WRONG_MAPPING":
        95,

    "ORPHAN_RECORD":
        85,

    "DUPLICATE_BIOMETRIC":
        80,

    "DUPLICATE_IDENTITY":
        75,

    "DATA_MISMATCH":
        60,
}


IDENTITY_RESOLVING_TYPES = {

    "HARM_IMPACT",

    "WRONG_MAPPING",

    "ORPHAN_RECORD",

    "DUPLICATE_IDENTITY",

    "DATA_MISMATCH",
}


# ============================================================
# HELPERS
# ============================================================

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


def safe_float(value):

    try:
        return float(value)

    except (
        TypeError,
        ValueError
    ):
        return 0.0


def parse_bool(value):

    return str(
        value
    ).strip().lower() in {

        "true",
        "1",
        "yes",
        "y"
    }


def safe_json(value):

    if not value:
        return {}

    try:

        return json.loads(
            value
        )

    except (
        json.JSONDecodeError,
        TypeError
    ):

        return {}


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
# UNION FIND
#
# Used to connect biometric records that belong to the same
# underlying investigation.
# ============================================================

class UnionFind:

    def __init__(self):

        self.parent = {}


    def add(self, item):

        if item not in self.parent:

            self.parent[item] = item


    def find(self, item):

        self.add(
            item
        )

        if (
            self.parent[item]
            != item
        ):

            self.parent[item] = (
                self.find(
                    self.parent[item]
                )
            )

        return self.parent[item]


    def union(
        self,
        item_a,
        item_b
    ):

        root_a = self.find(
            item_a
        )

        root_b = self.find(
            item_b
        )

        if root_a != root_b:

            self.parent[
                root_b
            ] = root_a


# ============================================================
# BUILD RELATIONSHIP GRAPH
# ============================================================

def build_relationship_graph(
    findings
):

    graph = UnionFind()


    for finding in findings:

        biometric_id = finding[
            "biometric_id"
        ]

        graph.add(
            biometric_id
        )


        evidence = safe_json(
            finding.get(
                "evidence"
            )
        )


        related_records = (
            evidence.get(
                "related_biometric_records",
                []
            )
        )


        if isinstance(
            related_records,
            str
        ):

            related_records = [
                related_records
            ]


        for related_id in (
            related_records
        ):

            if not related_id:
                continue

            graph.union(
                biometric_id,
                related_id
            )


    return graph


# ============================================================
# GROUP FINDINGS INTO COMPONENTS
# ============================================================

def group_findings(
    findings,
    graph
):

    groups = defaultdict(
        list
    )


    for finding in findings:

        biometric_id = finding[
            "biometric_id"
        ]

        root = graph.find(
            biometric_id
        )

        groups[
            root
        ].append(
            finding
        )


    return list(
        groups.values()
    )


# ============================================================
# INFER CASE TYPE
# ============================================================

def infer_case_type(
    findings
):

    finding_types = {

        finding[
            "finding_type"
        ]

        for finding
        in findings
    }


    if (
        "HARM_IMPACT"
        in finding_types
    ):

        if (
            "DUPLICATE_BIOMETRIC"
            in finding_types
            or
            "WRONG_MAPPING"
            in finding_types
        ):

            return (
                "CRITICAL_HARM_IDENTITY_CONFLICT"
            )

        return (
            "HARM_IMPACT"
        )


    if (
        "WRONG_MAPPING"
        in finding_types
        and
        "DUPLICATE_BIOMETRIC"
        in finding_types
    ):

        return (
            "COMPLEX_IDENTITY_CONFLICT"
        )


    if (
        "WRONG_MAPPING"
        in finding_types
    ):

        return (
            "WRONG_MAPPING"
        )


    if (
        "ORPHAN_RECORD"
        in finding_types
    ):

        return (
            "ORPHAN_RECORD"
        )


    if (
        "DUPLICATE_BIOMETRIC"
        in finding_types
    ):

        return (
            "DUPLICATE_BIOMETRIC"
        )


    if (
        "DUPLICATE_IDENTITY"
        in finding_types
    ):

        return (
            "DUPLICATE_IDENTITY"
        )


    if (
        "DATA_MISMATCH"
        in finding_types
    ):

        return (
            "DATA_MISMATCH"
        )


    return (
        "IDENTITY_INTEGRITY_REVIEW"
    )


# ============================================================
# PRIMARY FINDING
# ============================================================

def primary_finding_score(
    finding
):

    finding_type = (
        finding.get(
            "finding_type",
            ""
        )
    )


    suspected_identity = (
        finding.get(
            "suspected_correct_master_id",
            ""
        )
        .strip()
    )


    has_identity_candidate = (

        1

        if (
            finding_type
            in IDENTITY_RESOLVING_TYPES
            and
            suspected_identity
        )

        else 0
    )


    wrongly_affected = (

        1

        if parse_bool(
            finding.get(
                "wrongly_affected_person"
            )
        )

        else 0
    )


    type_priority = (
        FINDING_TYPE_PRIORITY.get(
            finding_type,
            0
        )
    )


    return (

        wrongly_affected,

        has_identity_candidate,

        safe_float(
            finding.get(
                "protective_priority_score"
            )
        ),

        type_priority,

        safe_float(
            finding.get(
                "harm_impact_score"
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
    )


def select_primary_finding(
    findings
):

    return max(
        findings,
        key=primary_finding_score
    )


# ============================================================
# CANONICAL IDENTITY RESOLUTION
# ============================================================

def resolve_canonical_identity(
    findings
):

    candidates = defaultdict(
        lambda: {

            "score":
                0.0,

            "support":
                0,

            "findings":
                []
        }
    )


    for finding in findings:

        finding_type = finding.get(
            "finding_type",
            ""
        )


        if (
            finding_type
            not in IDENTITY_RESOLVING_TYPES
        ):

            continue


        candidate = (
            finding.get(
                "suspected_correct_master_id",
                ""
            )
            .strip()
        )


        if not candidate:
            continue


        confidence = safe_float(
            finding.get(
                "ai_confidence"
            )
        )


        risk = safe_float(
            finding.get(
                "risk_score"
            )
        )


        protective = safe_float(
            finding.get(
                "protective_priority_score"
            )
        )


        type_weight = (
            FINDING_TYPE_PRIORITY.get(
                finding_type,
                50
            )
        )


        candidate_score = (

            confidence
            * 0.50

            +

            risk
            * 0.20

            +

            protective
            * 0.15

            +

            type_weight
            * 0.15
        )


        candidates[
            candidate
        ][
            "score"
        ] += candidate_score


        candidates[
            candidate
        ][
            "support"
        ] += 1


        candidates[
            candidate
        ][
            "findings"
        ].append(
            finding.get(
                "finding_id",
                ""
            )
        )


    if not candidates:

        return {

            "master_id":
                "",

            "confidence":
                0.0,

            "support_count":
                0,

            "supporting_findings":
                [],
        }


    ranked = sorted(

        candidates.items(),

        key=lambda item: (

            item[
                1
            ][
                "score"
            ],

            item[
                1
            ][
                "support"
            ]
        ),

        reverse=True
    )


    best_master_id = (
        ranked[
            0
        ][
            0
        ]
    )


    best = (
        ranked[
            0
        ][
            1
        ]
    )


    confidence_values = [

        safe_float(
            finding.get(
                "ai_confidence"
            )
        )

        for finding in findings

        if (
            finding.get(
                "suspected_correct_master_id",
                ""
            )
            ==
            best_master_id
        )
    ]


    canonical_confidence = (

        max(
            confidence_values
        )

        if confidence_values

        else 0.0
    )


    return {

        "master_id":
            best_master_id,

        "confidence":
            round(
                canonical_confidence,
                2
            ),

        "support_count":
            best[
                "support"
            ],

        "supporting_findings":
            best[
                "findings"
            ],
    }


# ============================================================
# CASE PRIORITY
# ============================================================

def determine_case_priority(
    findings
):

    wrongly_affected = any(

        parse_bool(
            finding.get(
                "wrongly_affected_person"
            )
        )

        for finding
        in findings
    )


    protective = max(

        safe_float(
            finding.get(
                "protective_priority_score"
            )
        )

        for finding
        in findings
    )


    harm = max(

        safe_float(
            finding.get(
                "harm_impact_score"
            )
        )

        for finding
        in findings
    )


    risk = max(

        safe_float(
            finding.get(
                "risk_score"
            )
        )

        for finding
        in findings
    )


    if (
        wrongly_affected
        or
        protective >= 95
    ):

        return (
            "IMMEDIATE"
        )


    if (
        harm >= 90
        or
        risk >= 95
    ):

        return (
            "CRITICAL"
        )


    if (
        risk >= 80
        or
        protective >= 80
    ):

        return (
            "HIGH"
        )


    if (
        risk >= 50
    ):

        return (
            "MEDIUM"
        )


    return (
        "LOW"
    )


# ============================================================
# CASE EXPLANATION
# ============================================================

def build_case_explanation(
    case_type,
    primary,
    findings,
    canonical_identity
):

    biometric_ids = sorted({

        finding[
            "biometric_id"
        ]

        for finding
        in findings
    })


    finding_types = sorted({

        finding[
            "finding_type"
        ]

        for finding
        in findings
    })


    canonical = (
        canonical_identity[
            "master_id"
        ]
        or
        "UNRESOLVED"
    )


    current = (
        primary.get(
            "current_master_id",
            ""
        )
        or
        "UNKNOWN"
    )


    return (

        f"Case type {case_type}. "

        f"The platform correlated "
        f"{len(findings)} finding(s) "
        f"across {len(biometric_ids)} "
        f"biometric record(s). "

        f"Evidence types include "
        f"{', '.join(finding_types)}. "

        f"The primary current identity is "
        f"{current}. "

        f"The strongest canonical identity "
        f"candidate is {canonical}."
    )


# ============================================================
# BUILD CASE
# ============================================================

def build_case(
    findings,
    case_number
):

    primary = (
        select_primary_finding(
            findings
        )
    )


    canonical_identity = (
        resolve_canonical_identity(
            findings
        )
    )


    case_type = (
        infer_case_type(
            findings
        )
    )


    priority = (
        determine_case_priority(
            findings
        )
    )


    biometric_ids = sorted({

        finding[
            "biometric_id"
        ]

        for finding
        in findings
    })


    current_master_ids = sorted({

        finding.get(
            "current_master_id",
            ""
        )

        for finding
        in findings

        if finding.get(
            "current_master_id"
        )
    })


    finding_ids = [

        finding.get(
            "finding_id",
            ""
        )

        for finding
        in findings
    ]


    finding_types = sorted({

        finding[
            "finding_type"
        ]

        for finding
        in findings
    })


    wrongly_affected = any(

        parse_bool(
            finding.get(
                "wrongly_affected_person"
            )
        )

        for finding
        in findings
    )


    risk_score = max(

        safe_float(
            finding.get(
                "risk_score"
            )
        )

        for finding
        in findings
    )


    harm_score = max(

        safe_float(
            finding.get(
                "harm_impact_score"
            )
        )

        for finding
        in findings
    )


    protective_score = max(

        safe_float(
            finding.get(
                "protective_priority_score"
            )
        )

        for finding
        in findings
    )


    ai_confidence = max(

        safe_float(
            finding.get(
                "ai_confidence"
            )
        )

        for finding
        in findings
    )


    case_id = (
        f"CASE-2026-"
        f"{case_number:05d}"
    )


    explanation = (
        build_case_explanation(
            case_type,
            primary,
            findings,
            canonical_identity
        )
    )


    return {

        "case_id":
            case_id,

        "case_status":
            "AI_INVESTIGATION_PENDING",

        "case_type":
            case_type,

        "priority":
            priority,

        "primary_finding_id":
            primary.get(
                "finding_id",
                ""
            ),

        "primary_biometric_id":
            primary.get(
                "biometric_id",
                ""
            ),

        "affected_biometric_ids":
            ",".join(
                biometric_ids
            ),

        "current_master_ids":
            ",".join(
                current_master_ids
            ),

        "canonical_master_id":
            canonical_identity[
                "master_id"
            ],

        "canonical_identity_confidence":
            canonical_identity[
                "confidence"
            ],

        "identity_support_count":
            canonical_identity[
                "support_count"
            ],

        "finding_count":
            len(
                findings
            ),

        "corroborating_finding_count":
            max(
                0,
                len(
                    findings
                )
                - 1
            ),

        "finding_ids":
            ",".join(
                finding_ids
            ),

        "finding_types":
            ",".join(
                finding_types
            ),

        "ai_confidence":
            round(
                ai_confidence,
                2
            ),

        "risk_score":
            round(
                risk_score,
                2
            ),

        "harm_impact_score":
            round(
                harm_score,
                2
            ),

        "protective_priority_score":
            round(
                protective_score,
                2
            ),

        "wrongly_affected_person":
            wrongly_affected,

        "case_explanation":
            explanation,

        "created_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),
    }


# ============================================================
# SORT CASES
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


def case_sort_key(
    case
):

    return (

        1
        if case[
            "wrongly_affected_person"
        ]
        else 0,

        PRIORITY_ORDER.get(
            case[
                "priority"
            ],
            0
        ),

        safe_float(
            case[
                "protective_priority_score"
            ]
        ),

        safe_float(
            case[
                "harm_impact_score"
            ]
        ),

        safe_float(
            case[
                "risk_score"
            ]
        ),

        safe_float(
            case[
                "ai_confidence"
            ]
        ),
    )


# ============================================================
# CASE-FINDING MAPPING
# ============================================================

def build_case_finding_rows(
    cases,
    grouped_findings
):

    rows = []


    for case, findings in zip(
        cases,
        grouped_findings
    ):

        primary_id = (
            case[
                "primary_finding_id"
            ]
        )


        for finding in findings:

            rows.append({

                "case_id":
                    case[
                        "case_id"
                    ],

                "finding_id":
                    finding.get(
                        "finding_id",
                        ""
                    ),

                "biometric_id":
                    finding.get(
                        "biometric_id",
                        ""
                    ),

                "finding_type":
                    finding.get(
                        "finding_type",
                        ""
                    ),

                "finding_role":
                    (
                        "PRIMARY"

                        if finding.get(
                            "finding_id"
                        )
                        ==
                        primary_id

                        else
                        "CORROBORATING"
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

                "harm_impact_score":
                    finding.get(
                        "harm_impact_score",
                        ""
                    ),

                "protective_priority_score":
                    finding.get(
                        "protective_priority_score",
                        ""
                    ),
            })


    return rows


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
        " Case Aggregation Engine v0.1"
    )

    print(
        "============================================"
    )


    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


    print(
        "\nLoading reconciliation findings..."
    )


    findings = load_csv(
        FINDINGS_FILE
    )


    print(
        f"Raw Findings: "
        f"{len(findings)}"
    )


    print(
        "\nBuilding finding relationship graph..."
    )


    graph = (
        build_relationship_graph(
            findings
        )
    )


    grouped_findings = (
        group_findings(
            findings,
            graph
        )
    )


    print(
        f"Connected Issue Groups: "
        f"{len(grouped_findings)}"
    )


    # ========================================================
    # Build cases before final sorting
    # ========================================================

    temporary_cases = []


    for index, group in enumerate(
        grouped_findings,
        start=1
    ):

        case = build_case(
            group,
            index
        )

        temporary_cases.append(
            (
                case,
                group
            )
        )


    temporary_cases.sort(

        key=lambda item:
            case_sort_key(
                item[
                    0
                ]
            ),

        reverse=True
    )


    # ========================================================
    # Reassign deterministic Case IDs after sorting
    # ========================================================

    final_cases = []

    final_groups = []


    for index, (
        case,
        group
    ) in enumerate(
        temporary_cases,
        start=1
    ):

        case[
            "case_id"
        ] = (
            f"CASE-2026-"
            f"{index:05d}"
        )

        final_cases.append(
            case
        )

        final_groups.append(
            group
        )


    case_finding_rows = (
        build_case_finding_rows(
            final_cases,
            final_groups
        )
    )


    # ========================================================
    # Summary
    # ========================================================

    priority_counts = defaultdict(
        int
    )


    type_counts = defaultdict(
        int
    )


    for case in final_cases:

        priority_counts[
            case[
                "priority"
            ]
        ] += 1


        type_counts[
            case[
                "case_type"
            ]
        ] += 1


    multi_finding_cases = sum(

        1

        for case
        in final_cases

        if case[
            "finding_count"
        ] > 1
    )


    unresolved_identity_cases = sum(

        1

        for case
        in final_cases

        if not case[
            "canonical_master_id"
        ]
    )


    wrongly_affected_cases = sum(

        1

        for case
        in final_cases

        if case[
            "wrongly_affected_person"
        ]
    )


    summary = {

        "project":
            "AI Identity Reconciliation Platform",

        "engine":
            "Case Aggregation Engine v0.1",

        "environment":
            "Synthetic Demo Only",

        "raw_findings":
            len(
                findings
            ),

        "aggregated_cases":
            len(
                final_cases
            ),

        "findings_collapsed_into_existing_cases":
            (
                len(
                    findings
                )
                -
                len(
                    final_cases
                )
            ),

        "multi_finding_cases":
            multi_finding_cases,

        "wrongly_affected_cases":
            wrongly_affected_cases,

        "unresolved_identity_cases":
            unresolved_identity_cases,

        "priority_breakdown":
            dict(
                priority_counts
            ),

        "case_type_breakdown":
            dict(
                type_counts
            ),

        "generated_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),
    }


    # ========================================================
    # Export
    # ========================================================

    write_csv(
        CASES_FILE,
        final_cases
    )


    write_csv(
        CASE_FINDINGS_FILE,
        case_finding_rows
    )


    with CASES_JSON_FILE.open(
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            final_cases,
            file,
            indent=4
        )


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
    # Display
    # ========================================================

    print()
    print(
        "============================================"
    )

    print(
        " CASE AGGREGATION COMPLETE"
    )

    print(
        "============================================"
    )


    print(
        f"\nRaw Findings: "
        f"{summary['raw_findings']}"
    )


    print(
        f"Aggregated Cases: "
        f"{summary['aggregated_cases']}"
    )


    print(
        f"Corroborating Findings Collapsed: "
        f"{summary['findings_collapsed_into_existing_cases']}"
    )


    print(
        f"Multi-Finding Cases: "
        f"{summary['multi_finding_cases']}"
    )


    print(
        f"Wrongly Affected Cases: "
        f"{summary['wrongly_affected_cases']}"
    )


    print(
        f"Unresolved Identity Cases: "
        f"{summary['unresolved_identity_cases']}"
    )


    print()
    print(
        "Priority Breakdown:"
    )


    for priority, count in (
        summary[
            "priority_breakdown"
        ].items()
    ):

        print(
            f" - "
            f"{priority}: "
            f"{count}"
        )


    print()
    print(
        "Case Type Breakdown:"
    )


    for case_type, count in (
        summary[
            "case_type_breakdown"
        ].items()
    ):

        print(
            f" - "
            f"{case_type}: "
            f"{count}"
        )


    print()
    print(
        "Highest Priority Cases:"
    )


    for case in final_cases[:10]:

        print()

        print(
            f"{case['case_id']} | "
            f"{case['case_type']} | "
            f"{case['priority']}"
        )

        print(
            f" Biometric: "
            f"{case['primary_biometric_id']}"
        )

        print(
            f" Canonical Identity: "
            f"{case['canonical_master_id']}"
        )

        print(
            f" Confidence: "
            f"{case['canonical_identity_confidence']}"
        )

        print(
            f" Risk: "
            f"{case['risk_score']}"
        )

        print(
            f" Harm: "
            f"{case['harm_impact_score']}"
        )

        print(
            f" Protective Priority: "
            f"{case['protective_priority_score']}"
        )

        print(
            f" Findings: "
            f"{case['finding_count']}"
        )


    print()
    print(
        "Output:"
    )

    print(
        f" - {CASES_FILE}"
    )

    print(
        f" - {CASES_JSON_FILE}"
    )

    print(
        f" - {CASE_FINDINGS_FILE}"
    )

    print(
        f" - {SUMMARY_FILE}"
    )

    print()


if __name__ == "__main__":
    main()