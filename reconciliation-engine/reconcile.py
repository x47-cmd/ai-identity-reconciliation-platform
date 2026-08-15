import csv
import json
import math
import hashlib
from pathlib import Path
from datetime import datetime
from difflib import SequenceMatcher


# ============================================================
# AI Identity Reconciliation Platform
# Reconciliation Engine
# Version: 0.1
#
# PURPOSE:
# Compare the synthetic Biometric System against the
# authoritative Master Reference System.
#
# IMPORTANT:
# ground_truth.csv is NEVER read by this engine.
#
# The engine must discover inconsistencies independently.
# ============================================================


REPO_ROOT = Path(__file__).resolve().parent.parent

SYNTHETIC_OUTPUT = (
    REPO_ROOT
    / "synthetic-data"
    / "output"
)

MASTER_FILE = (
    SYNTHETIC_OUTPUT
    / "master_persons.csv"
)

BIOMETRIC_FILE = (
    SYNTHETIC_OUTPUT
    / "biometric_records.csv"
)

OUTPUT_DIR = (
    Path(__file__).resolve().parent
    / "output"
)

FINDINGS_FILE = (
    OUTPUT_DIR
    / "findings.csv"
)

SUMMARY_FILE = (
    OUTPUT_DIR
    / "reconciliation_summary.json"
)


# ============================================================
# THRESHOLDS
# ============================================================

STRONG_BIOMETRIC_MATCH = 0.970

VERY_STRONG_BIOMETRIC_MATCH = 0.985

LOW_LINKED_IDENTITY_MATCH = 0.700

FULL_SEARCH_TRIGGER = 0.900

DATA_NAME_THRESHOLD = 0.920


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def load_csv(path):
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


def normalize_text(value):
    if value is None:
        return ""

    return " ".join(
        str(value)
        .strip()
        .lower()
        .split()
    )


def name_similarity(a, b):
    return SequenceMatcher(
        None,
        normalize_text(a),
        normalize_text(b)
    ).ratio()


def deterministic_vector(
    key,
    dimensions=32
):
    """
    Recreates the same synthetic reference vectors
    used by the Synthetic Data Generator.

    These are NOT real biometric templates.
    """

    values = []

    counter = 0

    while len(values) < dimensions:

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
                round(value, 6)
            )

            if (
                len(values)
                >= dimensions
            ):
                break

        counter += 1

    return values


def parse_vector(value):

    if not value:
        return []

    if isinstance(value, list):
        return value

    return json.loads(value)


def cosine_similarity(
    vector_a,
    vector_b
):

    if (
        not vector_a
        or not vector_b
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
        or magnitude_b == 0
    ):
        return 0.0

    return (
        dot_product
        / (
            magnitude_a
            * magnitude_b
        )
    )


# ============================================================
# MASTER REFERENCE INDEX
# ============================================================

def build_master_index(
    master_records
):

    master_lookup = {}

    demographic_index = {}

    for person in master_records:

        master_id = person[
            "master_id"
        ]

        person[
            "has_adverse_record"
        ] = parse_bool(
            person.get(
                "has_adverse_record"
            )
        )

        master_lookup[
            master_id
        ] = person

        key = (
            normalize_text(
                person[
                    "full_name"
                ]
            ),
            person[
                "date_of_birth"
            ],
            normalize_text(
                person[
                    "nationality"
                ]
            ),
        )

        demographic_index.setdefault(
            key,
            []
        ).append(
            master_id
        )

    return (
        master_lookup,
        demographic_index
    )


# ============================================================
# BIOMETRIC REFERENCE GENERATION
# ============================================================

def reference_templates(
    master_id
):

    return {
        "face":
            deterministic_vector(
                f"FACE:{master_id}"
            ),

        "fingerprint":
            deterministic_vector(
                f"FINGERPRINT:{master_id}"
            ),

        "iris":
            deterministic_vector(
                f"IRIS:{master_id}"
            ),
    }


def record_templates(record):

    return {
        "face":
            parse_vector(
                record.get(
                    "face_template"
                )
            ),

        "fingerprint":
            parse_vector(
                record.get(
                    "fingerprint_template"
                )
            ),

        "iris":
            parse_vector(
                record.get(
                    "iris_template"
                )
            ),
    }


def biometric_similarity(
    record,
    master_id
):

    source = record_templates(
        record
    )

    reference = reference_templates(
        master_id
    )

    face_score = cosine_similarity(
        source["face"],
        reference["face"]
    )

    fingerprint_score = (
        cosine_similarity(
            source[
                "fingerprint"
            ],
            reference[
                "fingerprint"
            ]
        )
    )

    iris_score = cosine_similarity(
        source["iris"],
        reference["iris"]
    )

    combined_score = (
        face_score * 0.40
        + fingerprint_score * 0.35
        + iris_score * 0.25
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
                combined_score,
                6
            ),
    }


# ============================================================
# CANDIDATE RESOLUTION
# ============================================================

def get_demographic_candidates(
    record,
    demographic_index
):

    key = (
        normalize_text(
            record.get(
                "registered_name"
            )
        ),

        record.get(
            "registered_date_of_birth"
        ),

        normalize_text(
            record.get(
                "registered_nationality"
            )
        ),
    )

    return demographic_index.get(
        key,
        []
    )


def evaluate_candidates(
    record,
    candidate_ids
):

    results = []

    for master_id in set(
        candidate_ids
    ):

        scores = biometric_similarity(
            record,
            master_id
        )

        results.append({
            "master_id":
                master_id,

            "scores":
                scores,
        })

    results.sort(
        key=lambda item:
            item[
                "scores"
            ][
                "combined"
            ],
        reverse=True
    )

    return results


def full_biometric_search(
    record,
    master_records,
    top_n=5
):
    """
    Full reference search.

    This is used only when the linked identity
    and demographic candidates do not provide
    a sufficiently strong biometric match.

    Face is used for initial candidate retrieval,
    then all biometric modalities are used
    to verify the strongest candidates.
    """

    face_vector = parse_vector(
        record.get(
            "face_template"
        )
    )

    face_candidates = []

    for person in master_records:

        master_id = person[
            "master_id"
        ]

        reference_face = (
            deterministic_vector(
                f"FACE:{master_id}"
            )
        )

        score = cosine_similarity(
            face_vector,
            reference_face
        )

        face_candidates.append(
            (
                score,
                master_id
            )
        )

    face_candidates.sort(
        reverse=True
    )

    strongest_ids = [
        master_id
        for score, master_id
        in face_candidates[
            :top_n
        ]
    ]

    return evaluate_candidates(
        record,
        strongest_ids
    )


# ============================================================
# DEMOGRAPHIC ANALYSIS
# ============================================================

def compare_demographics(
    record,
    master_person
):

    name_score = name_similarity(
        record.get(
            "registered_name"
        ),
        master_person.get(
            "full_name"
        )
    )

    dob_match = (
        record.get(
            "registered_date_of_birth"
        )
        ==
        master_person.get(
            "date_of_birth"
        )
    )

    nationality_match = (
        normalize_text(
            record.get(
                "registered_nationality"
            )
        )
        ==
        normalize_text(
            master_person.get(
                "nationality"
            )
        )
    )

    mismatches = []

    if (
        name_score
        < DATA_NAME_THRESHOLD
    ):
        mismatches.append(
            "NAME"
        )

    if not dob_match:
        mismatches.append(
            "DATE_OF_BIRTH"
        )

    if not nationality_match:
        mismatches.append(
            "NATIONALITY"
        )

    return {
        "name_similarity":
            round(
                name_score,
                4
            ),

        "date_of_birth_match":
            dob_match,

        "nationality_match":
            nationality_match,

        "mismatches":
            mismatches,
    }


# ============================================================
# SCORE MODELS
# ============================================================

def calculate_wrong_mapping_scores(
    confidence
):

    confidence_percent = (
        confidence
        * 100
    )

    risk = min(
        100,
        75
        + (
            confidence_percent
            - 90
        )
    )

    return (
        round(risk, 2),
        35.0,
        70.0
    )


def calculate_harm_scores(
    confidence
):

    confidence_percent = (
        confidence
        * 100
    )

    risk = min(
        100,
        85
        + (
            confidence_percent
            - 90
        )
    )

    harm = min(
        100,
        95
        + (
            confidence_percent
            - 95
        )
        * 0.5
    )

    protective = min(
        100,
        max(
            98,
            harm
        )
    )

    return (
        round(risk, 2),
        round(harm, 2),
        round(protective, 2)
    )


# ============================================================
# FINDING FACTORY
# ============================================================

def create_finding(
    biometric_id,
    finding_type,
    severity,
    current_master_id="",
    suspected_master_id="",
    confidence=0,
    risk_score=0,
    harm_score=0,
    protective_score=0,
    wrongly_affected=False,
    explanation="",
    evidence=None,
):

    return {
        "finding_id": "",

        "biometric_id":
            biometric_id,

        "finding_type":
            finding_type,

        "severity":
            severity,

        "current_master_id":
            current_master_id or "",

        "suspected_correct_master_id":
            suspected_master_id or "",

        "ai_confidence":
            round(
                confidence * 100,
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

        "explanation":
            explanation,

        "evidence":
            json.dumps(
                evidence or {},
                ensure_ascii=False
            ),

        "detected_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),
    }


# ============================================================
# MAIN RECORD RECONCILIATION
# ============================================================

def reconcile_record(
    record,
    master_records,
    master_lookup,
    demographic_index,
):

    findings = []

    biometric_id = record[
        "biometric_id"
    ]

    linked_master_id = (
        record.get(
            "linked_master_id"
        )
    )

    linked_exists = (
        linked_master_id
        in master_lookup
    )

    demographic_candidates = (
        get_demographic_candidates(
            record,
            demographic_index
        )
    )

    candidate_ids = list(
        demographic_candidates
    )

    if linked_exists:
        candidate_ids.append(
            linked_master_id
        )

    candidate_results = (
        evaluate_candidates(
            record,
            candidate_ids
        )
        if candidate_ids
        else []
    )

    best_result = (
        candidate_results[0]
        if candidate_results
        else None
    )

    best_score = (
        best_result[
            "scores"
        ][
            "combined"
        ]
        if best_result
        else 0
    )

    # --------------------------------------------------------
    # Full search when initial candidates are weak.
    # --------------------------------------------------------

    if (
        best_score
        < FULL_SEARCH_TRIGGER
    ):

        full_results = (
            full_biometric_search(
                record,
                master_records
            )
        )

        if full_results:
            best_result = (
                full_results[0]
            )

            best_score = (
                best_result[
                    "scores"
                ][
                    "combined"
                ]
            )

    best_master_id = (
        best_result[
            "master_id"
        ]
        if best_result
        else None
    )

    best_scores = (
        best_result[
            "scores"
        ]
        if best_result
        else {}
    )

    # --------------------------------------------------------
    # Linked identity biometric score
    # --------------------------------------------------------

    linked_scores = None

    if linked_exists:

        linked_scores = (
            biometric_similarity(
                record,
                linked_master_id
            )
        )

    linked_score = (
        linked_scores[
            "combined"
        ]
        if linked_scores
        else 0
    )

    # ========================================================
    # ORPHAN RECORD
    # ========================================================

    if not linked_exists:

        explanation = (
            f"Biometric record "
            f"{biometric_id} references "
            f"Master ID "
            f"{linked_master_id}, "
            f"but that Master identity "
            f"does not exist."
        )

        if (
            best_master_id
            and best_score
            >= STRONG_BIOMETRIC_MATCH
        ):

            explanation += (
                f" Biometric analysis "
                f"identified "
                f"{best_master_id} "
                f"as the strongest "
                f"candidate."
            )

        findings.append(
            create_finding(
                biometric_id=
                    biometric_id,

                finding_type=
                    "ORPHAN_RECORD",

                severity=
                    "HIGH",

                current_master_id=
                    linked_master_id,

                suspected_master_id=
                    best_master_id,

                confidence=
                    best_score,

                risk_score=
                    82,

                harm_score=
                    50,

                protective_score=
                    80,

                explanation=
                    explanation,

                evidence={
                    "candidate_scores":
                        best_scores,

                    "demographic_candidates":
                        demographic_candidates,
                },
            )
        )

    # ========================================================
    # WRONG MAPPING / HARM IMPACT
    # ========================================================

    elif (
        best_master_id
        and best_master_id
        != linked_master_id
        and best_score
        >= STRONG_BIOMETRIC_MATCH
    ):

        current_master = (
            master_lookup[
                linked_master_id
            ]
        )

        suspected_master = (
            master_lookup[
                best_master_id
            ]
        )

        wrongly_affected = (
            current_master.get(
                "has_adverse_record",
                False
            )
            and not suspected_master.get(
                "has_adverse_record",
                False
            )
        )

        if wrongly_affected:

            finding_type = (
                "HARM_IMPACT"
            )

            severity = (
                "CRITICAL"
            )

            (
                risk,
                harm,
                protective
            ) = calculate_harm_scores(
                best_score
            )

            explanation = (
                f"Biometric record "
                f"{biometric_id} "
                f"is currently linked to "
                f"{linked_master_id}, "
                f"which contains an "
                f"adverse record. "
                f"Biometric evidence "
                f"strongly indicates that "
                f"the record belongs to "
                f"{best_master_id}, "
                f"which has no adverse "
                f"record. "
                f"A potentially unrelated "
                f"person may therefore be "
                f"wrongly affected."
            )

        else:

            finding_type = (
                "WRONG_MAPPING"
            )

            severity = (
                "HIGH"
            )

            (
                risk,
                harm,
                protective
            ) = (
                calculate_wrong_mapping_scores(
                    best_score
                )
            )

            explanation = (
                f"Biometric record "
                f"{biometric_id} "
                f"is linked to "
                f"{linked_master_id}, "
                f"but biometric evidence "
                f"indicates that "
                f"{best_master_id} "
                f"is a substantially "
                f"stronger identity match."
            )

        findings.append(
            create_finding(
                biometric_id=
                    biometric_id,

                finding_type=
                    finding_type,

                severity=
                    severity,

                current_master_id=
                    linked_master_id,

                suspected_master_id=
                    best_master_id,

                confidence=
                    best_score,

                risk_score=
                    risk,

                harm_score=
                    harm,

                protective_score=
                    protective,

                wrongly_affected=
                    wrongly_affected,

                explanation=
                    explanation,

                evidence={
                    "current_link_score":
                        linked_score,

                    "current_scores":
                        linked_scores,

                    "candidate_score":
                        best_score,

                    "candidate_scores":
                        best_scores,

                    "current_has_adverse_record":
                        current_master.get(
                            "has_adverse_record"
                        ),

                    "candidate_has_adverse_record":
                        suspected_master.get(
                            "has_adverse_record"
                        ),
                },
            )
        )

    # ========================================================
    # PURE PERSONAL DATA MISMATCH
    #
    # Only when the biometric mapping itself appears correct.
    # ========================================================

    if (
        linked_exists
        and best_master_id
        == linked_master_id
        and linked_score
        >= STRONG_BIOMETRIC_MATCH
    ):

        demographic_analysis = (
            compare_demographics(
                record,
                master_lookup[
                    linked_master_id
                ]
            )
        )

        if demographic_analysis[
            "mismatches"
        ]:

            mismatch_count = len(
                demographic_analysis[
                    "mismatches"
                ]
            )

            risk = min(
                75,
                45
                + mismatch_count
                * 10
            )

            findings.append(
                create_finding(
                    biometric_id=
                        biometric_id,

                    finding_type=
                        "DATA_MISMATCH",

                    severity=
                        (
                            "MEDIUM"
                            if mismatch_count <= 2
                            else "HIGH"
                        ),

                    current_master_id=
                        linked_master_id,

                    suspected_master_id=
                        linked_master_id,

                    confidence=
                        linked_score,

                    risk_score=
                        risk,

                    harm_score=
                        20,

                    protective_score=
                        45,

                    explanation=(
                        f"Biometric ownership "
                        f"appears valid for "
                        f"{linked_master_id}, "
                        f"but registered "
                        f"personal data differs "
                        f"from the Master "
                        f"Reference."
                    ),

                    evidence={
                        "demographic_analysis":
                            demographic_analysis,

                        "biometric_scores":
                            linked_scores,
                    },
                )
            )

    return (
        findings,
        best_master_id,
        best_score
    )


# ============================================================
# DUPLICATE BIOMETRIC DETECTION
# ============================================================

def biometric_signature(record):

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


def detect_exact_duplicate_biometrics(
    biometric_records
):

    groups = {}

    for record in biometric_records:

        signature = (
            biometric_signature(
                record
            )
        )

        groups.setdefault(
            signature,
            []
        ).append(
            record
        )

    findings = []

    for records in groups.values():

        if len(records) < 2:
            continue

        linked_ids = {
            record.get(
                "linked_master_id"
            )
            for record in records
        }

        if len(linked_ids) < 2:
            continue

        biometric_ids = [
            record[
                "biometric_id"
            ]
            for record in records
        ]

        for record in records:

            related = [
                biometric_id
                for biometric_id
                in biometric_ids
                if biometric_id
                != record[
                    "biometric_id"
                ]
            ]

            findings.append(
                create_finding(
                    biometric_id=
                        record[
                            "biometric_id"
                        ],

                    finding_type=
                        "DUPLICATE_BIOMETRIC",

                    severity=
                        "HIGH",

                    current_master_id=
                        record.get(
                            "linked_master_id"
                        ),

                    confidence=
                        1.0,

                    risk_score=
                        90,

                    harm_score=
                        60,

                    protective_score=
                        85,

                    explanation=(
                        "An identical synthetic "
                        "biometric template is "
                        "associated with more "
                        "than one identity."
                    ),

                    evidence={
                        "related_biometric_records":
                            related,

                        "linked_master_ids":
                            sorted(
                                list(
                                    linked_ids
                                )
                            ),
                    },
                )
            )

    return findings


# ============================================================
# DUPLICATE IDENTITY DETECTION
# ============================================================

def detect_duplicate_identities(
    resolved_records
):

    groups = {}

    for item in resolved_records:

        master_id = item.get(
            "resolved_master_id"
        )

        score = item.get(
            "resolution_score",
            0
        )

        if (
            not master_id
            or score
            < STRONG_BIOMETRIC_MATCH
        ):
            continue

        groups.setdefault(
            master_id,
            []
        ).append(
            item
        )

    findings = []

    for master_id, records in (
        groups.items()
    ):

        if len(records) < 2:
            continue

        biometric_ids = [
            record[
                "biometric_id"
            ]
            for record in records
        ]

        for record in records:

            related = [
                biometric_id
                for biometric_id
                in biometric_ids
                if biometric_id
                != record[
                    "biometric_id"
                ]
            ]

            findings.append(
                create_finding(
                    biometric_id=
                        record[
                            "biometric_id"
                        ],

                    finding_type=
                        "DUPLICATE_IDENTITY",

                    severity=
                        "MEDIUM",

                    current_master_id=
                        record.get(
                            "current_master_id"
                        ),

                    suspected_master_id=
                        master_id,

                    confidence=
                        record.get(
                            "resolution_score",
                            0
                        ),

                    risk_score=
                        65,

                    harm_score=
                        30,

                    protective_score=
                        60,

                    explanation=(
                        f"Multiple biometric "
                        f"records resolve to "
                        f"Master identity "
                        f"{master_id}."
                    ),

                    evidence={
                        "related_biometric_records":
                            related,

                        "resolved_master_id":
                            master_id,
                    },
                )
            )

    return findings


# ============================================================
# FINDING DEDUPLICATION
# ============================================================

def deduplicate_findings(
    findings
):

    unique = {}

    for finding in findings:

        key = (
            finding[
                "biometric_id"
            ],
            finding[
                "finding_type"
            ],
            finding[
                "current_master_id"
            ],
            finding[
                "suspected_correct_master_id"
            ],
        )

        if key not in unique:

            unique[key] = finding

            continue

        existing = unique[
            key
        ]

        if (
            finding[
                "protective_priority_score"
            ]
            >
            existing[
                "protective_priority_score"
            ]
        ):

            unique[key] = finding

    return list(
        unique.values()
    )


# ============================================================
# FINAL PRIORITY SORT
# ============================================================

def priority_sort_key(
    finding
):

    wrongly_affected = (
        1
        if finding[
            "wrongly_affected_person"
        ]
        else 0
    )

    return (
        wrongly_affected,
        finding[
            "protective_priority_score"
        ],
        finding[
            "harm_impact_score"
        ],
        finding[
            "risk_score"
        ],
        finding[
            "ai_confidence"
        ],
    )


# ============================================================
# EXPORT
# ============================================================

def export_findings(
    findings
):

    fields = [
        "finding_id",
        "biometric_id",
        "finding_type",
        "severity",
        "current_master_id",
        "suspected_correct_master_id",
        "ai_confidence",
        "risk_score",
        "harm_impact_score",
        "protective_priority_score",
        "wrongly_affected_person",
        "explanation",
        "evidence",
        "detected_at",
    ]

    with FINDINGS_FILE.open(
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
            findings
        )


def export_summary(
    master_records,
    biometric_records,
    findings
):

    type_counts = {}

    severity_counts = {}

    for finding in findings:

        finding_type = finding[
            "finding_type"
        ]

        severity = finding[
            "severity"
        ]

        type_counts[
            finding_type
        ] = (
            type_counts.get(
                finding_type,
                0
            )
            + 1
        )

        severity_counts[
            severity
        ] = (
            severity_counts.get(
                severity,
                0
            )
            + 1
        )

    wrongly_affected_count = sum(
        1
        for finding in findings
        if finding[
            "wrongly_affected_person"
        ]
    )

    immediate_priority = sum(
        1
        for finding in findings
        if finding[
            "protective_priority_score"
        ]
        >= 95
    )

    summary = {
        "project":
            "AI Identity Reconciliation Platform",

        "engine":
            "Reconciliation Engine v0.1",

        "master_records":
            len(
                master_records
            ),

        "biometric_records":
            len(
                biometric_records
            ),

        "total_findings":
            len(
                findings
            ),

        "finding_types":
            type_counts,

        "severity":
            severity_counts,

        "wrongly_affected_person_cases":
            wrongly_affected_count,

        "immediate_protective_priority_cases":
            immediate_priority,

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

    return summary


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
        " Reconciliation Engine v0.1"
    )

    print(
        "============================================"
    )

    if not MASTER_FILE.exists():

        raise FileNotFoundError(
            f"\nMaster dataset not found:\n"
            f"{MASTER_FILE}\n\n"
            f"Run synthetic-data/"
            f"generate_data.py first."
        )

    if not BIOMETRIC_FILE.exists():

        raise FileNotFoundError(
            f"\nBiometric dataset not found:\n"
            f"{BIOMETRIC_FILE}\n\n"
            f"Run synthetic-data/"
            f"generate_data.py first."
        )

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    print(
        "\nLoading Master Reference System..."
    )

    master_records = load_csv(
        MASTER_FILE
    )

    print(
        f"Loaded "
        f"{len(master_records):,} "
        f"Master identities."
    )

    print(
        "\nLoading Biometric System..."
    )

    biometric_records = load_csv(
        BIOMETRIC_FILE
    )

    print(
        f"Loaded "
        f"{len(biometric_records):,} "
        f"biometric records."
    )

    (
        master_lookup,
        demographic_index
    ) = build_master_index(
        master_records
    )

    print(
        "\nStarting cross-system reconciliation..."
    )

    findings = []

    resolved_records = []

    for index, record in enumerate(
        biometric_records,
        start=1
    ):

        (
            record_findings,
            resolved_master_id,
            resolution_score
        ) = reconcile_record(
            record,
            master_records,
            master_lookup,
            demographic_index
        )

        findings.extend(
            record_findings
        )

        resolved_records.append({
            "biometric_id":
                record[
                    "biometric_id"
                ],

            "current_master_id":
                record.get(
                    "linked_master_id"
                ),

            "resolved_master_id":
                resolved_master_id,

            "resolution_score":
                resolution_score,
        })

        if index % 100 == 0:

            print(
                f"Analyzed "
                f"{index:,} / "
                f"{len(biometric_records):,}"
            )

    print(
        "\nChecking exact biometric duplicates..."
    )

    findings.extend(
        detect_exact_duplicate_biometrics(
            biometric_records
        )
    )

    print(
        "Checking identity duplicates..."
    )

    findings.extend(
        detect_duplicate_identities(
            resolved_records
        )
    )

    print(
        "Removing duplicate findings..."
    )

    findings = (
        deduplicate_findings(
            findings
        )
    )

    findings.sort(
        key=priority_sort_key,
        reverse=True
    )

    for index, finding in enumerate(
        findings,
        start=1
    ):

        finding[
            "finding_id"
        ] = (
            f"FND-{index:06d}"
        )

    export_findings(
        findings
    )

    summary = export_summary(
        master_records,
        biometric_records,
        findings
    )

    print()
    print(
        "============================================"
    )

    print(
        " RECONCILIATION COMPLETE"
    )

    print(
        "============================================"
    )

    print(
        f"\nMaster Records:"
        f" {summary['master_records']:,}"
    )

    print(
        f"Biometric Records:"
        f" {summary['biometric_records']:,}"
    )

    print(
        f"AI Findings:"
        f" {summary['total_findings']:,}"
    )

    print(
        f"Wrongly Affected Cases:"
        f" "
        f"{summary['wrongly_affected_person_cases']}"
    )

    print(
        f"Immediate Protective Priority:"
        f" "
        f"{summary['immediate_protective_priority_cases']}"
    )

    print(
        "\nFinding Types:"
    )

    for finding_type, count in (
        summary[
            "finding_types"
        ].items()
    ):

        print(
            f" - {finding_type}: {count}"
        )

    print(
        "\nSeverity:"
    )

    for severity, count in (
        summary[
            "severity"
        ].items()
    ):

        print(
            f" - {severity}: {count}"
        )

    print(
        "\nHighest Priority Findings:"
    )

    for finding in findings[:10]:

        print(
            f" - "
            f"{finding['finding_id']} | "
            f"{finding['finding_type']} | "
            f"{finding['biometric_id']} | "
            f"Protective Priority "
            f"{finding['protective_priority_score']} | "
            f"Risk "
            f"{finding['risk_score']}"
        )

    print(
        "\nOutput Files:"
    )

    print(
        f" - {FINDINGS_FILE}"
    )

    print(
        f" - {SUMMARY_FILE}"
    )

    print()
    print(
        "IMPORTANT:"
    )

    print(
        "This engine did NOT read ground_truth.csv."
    )

    print(
        "Ground truth will only be used later "
        "to measure detection performance."
    )

    print()


if __name__ == "__main__":
    main()