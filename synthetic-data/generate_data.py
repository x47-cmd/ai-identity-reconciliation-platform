import csv
import json
import math
import random
import hashlib
from pathlib import Path
from datetime import date, datetime, timedelta


# ============================================================
# AI Identity Reconciliation Platform
# Synthetic Data Generator
# Version: 0.1
#
# IMPORTANT:
# This script generates SYNTHETIC DEMO DATA ONLY.
# It does not use real identities or real biometric information.
# ============================================================


SEED = 20260815

MASTER_COUNT = 3000
BIOMETRIC_COUNT = 1000

OUTPUT_DIR = Path(__file__).parent / "output"

random.seed(SEED)


# ============================================================
# DEMO CONFIGURATION
# ============================================================

ANOMALY_COUNTS = {
    "wrong_mapping": 12,
    "harm_impact": 5,
    "data_mismatch": 15,
    "orphan_record": 4,
    "duplicate_identity": 6,
    "duplicate_biometric": 8,
    "complex_conflict": 3,
}


FIRST_NAMES = [
    "Ahmed",
    "Mohammed",
    "Yousef",
    "Ali",
    "Omar",
    "Khalid",
    "Saeed",
    "Hamad",
    "Abdullah",
    "Salem",
    "Mansoor",
    "Rashed",
    "Sultan",
    "Nasser",
    "Majid",
    "Hassan",
    "Ibrahim",
    "Essa",
    "Tariq",
    "Fahad",
]

MIDDLE_NAMES = [
    "Ali",
    "Mohammed",
    "Ahmed",
    "Saeed",
    "Salem",
    "Khalid",
    "Hassan",
    "Ibrahim",
    "Abdullah",
    "Omar",
]

FAMILY_NAMES = [
    "Al Noor",
    "Al Fahad",
    "Al Rashed",
    "Al Mansoor",
    "Al Salem",
    "Al Saeed",
    "Al Majid",
    "Al Nasser",
    "Al Hamad",
    "Al Sultan",
]

NATIONALITIES = [
    "Demo-UAE",
    "Demo-GCC-A",
    "Demo-GCC-B",
    "Demo-Country-A",
    "Demo-Country-B",
]

ADVERSE_TYPES = [
    "Financial Review",
    "Administrative Hold",
    "Compliance Review",
    "Legal Review",
    "Operational Restriction",
]


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def generate_name():
    return (
        f"{random.choice(FIRST_NAMES)} "
        f"{random.choice(MIDDLE_NAMES)} "
        f"{random.choice(FAMILY_NAMES)}"
    )


def generate_birth_date():
    start = date(1960, 1, 1)
    end = date(2005, 12, 31)

    days = (end - start).days

    return start + timedelta(days=random.randint(0, days))


def deterministic_vector(key, dimensions=32):
    """
    Generates a reproducible synthetic biometric vector.

    This is NOT a real biometric template.
    It is only numerical demo data.
    """

    values = []

    counter = 0

    while len(values) < dimensions:
        digest = hashlib.sha256(
            f"{key}:{counter}".encode("utf-8")
        ).digest()

        for byte in digest:
            value = (byte / 255.0) * 2.0 - 1.0
            values.append(round(value, 6))

            if len(values) >= dimensions:
                break

        counter += 1

    return values


def add_noise(vector, noise=0.015):
    """
    Adds small noise to simulate multiple captures
    of the same synthetic biometric identity.
    """

    return [
        round(value + random.uniform(-noise, noise), 6)
        for value in vector
    ]


def vector_to_json(vector):
    return json.dumps(vector)


def now_string(offset_minutes=0):
    dt = datetime(2026, 8, 15, 8, 0, 0)

    dt = dt + timedelta(minutes=offset_minutes)

    return dt.isoformat(sep=" ")


# ============================================================
# MASTER REFERENCE SYSTEM
# ============================================================

def generate_master_persons():

    persons = []

    for i in range(1, MASTER_COUNT + 1):

        master_id = f"REF-{i:06d}"

        has_adverse_record = random.random() < 0.08

        adverse_type = None
        adverse_description = None

        if has_adverse_record:
            adverse_type = random.choice(ADVERSE_TYPES)

            adverse_description = (
                f"Synthetic demonstration record: "
                f"{adverse_type}. "
                f"No real-world person or event is represented."
            )

        person = {
            "master_id": master_id,
            "full_name": generate_name(),
            "date_of_birth": generate_birth_date().isoformat(),
            "nationality": random.choice(NATIONALITIES),
            "master_status": "ACTIVE",
            "has_adverse_record": has_adverse_record,
            "adverse_type": adverse_type or "",
            "adverse_description": adverse_description or "",
            "created_at": now_string(i % 500),
            "updated_at": now_string(i % 500),
        }

        persons.append(person)

    return persons


# ============================================================
# BIOMETRIC SYSTEM
# ============================================================

def generate_biometric_records(master_persons):

    selected_persons = random.sample(
        master_persons,
        BIOMETRIC_COUNT
    )

    records = []

    for i, person in enumerate(selected_persons, start=1):

        biometric_id = f"BIO-{i:06d}"

        face_base = deterministic_vector(
            f"FACE:{person['master_id']}"
        )

        fingerprint_base = deterministic_vector(
            f"FINGERPRINT:{person['master_id']}"
        )

        iris_base = deterministic_vector(
            f"IRIS:{person['master_id']}"
        )

        record = {
            "biometric_id": biometric_id,

            "linked_master_id": person["master_id"],

            "registered_name": person["full_name"],

            "registered_date_of_birth":
                person["date_of_birth"],

            "registered_nationality":
                person["nationality"],

            "face_template":
                vector_to_json(
                    add_noise(face_base)
                ),

            "fingerprint_template":
                vector_to_json(
                    add_noise(fingerprint_base)
                ),

            "iris_template":
                vector_to_json(
                    add_noise(iris_base)
                ),

            "biometric_quality_score":
                round(
                    random.uniform(88.0, 99.8),
                    2
                ),

            "record_status":
                "ACTIVE",

            "registration_date":
                now_string(i),

            "created_at":
                now_string(i),

            "updated_at":
                now_string(i),

            # Internal generator field.
            # This is removed before exporting the biometric CSV.
            "_correct_master_id":
                person["master_id"],
        }

        records.append(record)

    return records


# ============================================================
# ANOMALY INJECTION
# ============================================================

def inject_anomalies(master_persons, biometric_records):

    master_lookup = {
        person["master_id"]: person
        for person in master_persons
    }

    adverse_persons = [
        person
        for person in master_persons
        if person["has_adverse_record"]
    ]

    clean_persons = [
        person
        for person in master_persons
        if not person["has_adverse_record"]
    ]

    all_indexes = list(range(len(biometric_records)))

    random.shuffle(all_indexes)

    reserved_indexes = set()

    ground_truth = []


    def reserve(count):

        available = [
            index
            for index in all_indexes
            if index not in reserved_indexes
        ]

        selected = available[:count]

        reserved_indexes.update(selected)

        return selected


    # ========================================================
    # 1. WRONG IDENTITY MAPPING
    # ========================================================

    for index in reserve(
        ANOMALY_COUNTS["wrong_mapping"]
    ):

        record = biometric_records[index]

        correct_master_id = record["_correct_master_id"]

        wrong_candidates = [
            person
            for person in master_persons
            if person["master_id"] != correct_master_id
        ]

        wrong_person = random.choice(wrong_candidates)

        record["linked_master_id"] = (
            wrong_person["master_id"]
        )

        ground_truth.append({
            "biometric_id":
                record["biometric_id"],

            "anomaly_type":
                "WRONG_MAPPING",

            "expected_correct_master_id":
                correct_master_id,

            "current_linked_master_id":
                wrong_person["master_id"],

            "related_biometric_id":
                "",

            "harm_impact":
                "LOW",

            "notes":
                "Biometric record intentionally linked "
                "to the wrong Master identity."
        })


    # ========================================================
    # 2. HARM IMPACT CASE
    #
    # Clean person biometric is incorrectly linked
    # to a Master identity containing an adverse record.
    # ========================================================

    for index in reserve(
        ANOMALY_COUNTS["harm_impact"]
    ):

        record = biometric_records[index]

        correct_master_id = record["_correct_master_id"]

        correct_person = master_lookup[
            correct_master_id
        ]

        # Ensure the actual person has no adverse record.
        if correct_person["has_adverse_record"]:

            replacement = random.choice(clean_persons)

            correct_master_id = replacement["master_id"]

            record["_correct_master_id"] = (
                correct_master_id
            )

            record["registered_name"] = (
                replacement["full_name"]
            )

            record[
                "registered_date_of_birth"
            ] = replacement["date_of_birth"]

            record[
                "registered_nationality"
            ] = replacement["nationality"]

            record["face_template"] = vector_to_json(
                add_noise(
                    deterministic_vector(
                        f"FACE:{correct_master_id}"
                    )
                )
            )

            record[
                "fingerprint_template"
            ] = vector_to_json(
                add_noise(
                    deterministic_vector(
                        f"FINGERPRINT:{correct_master_id}"
                    )
                )
            )

            record["iris_template"] = vector_to_json(
                add_noise(
                    deterministic_vector(
                        f"IRIS:{correct_master_id}"
                    )
                )
            )

        adverse_person = random.choice(
            [
                person
                for person in adverse_persons
                if person["master_id"]
                != correct_master_id
            ]
        )

        record["linked_master_id"] = (
            adverse_person["master_id"]
        )

        ground_truth.append({
            "biometric_id":
                record["biometric_id"],

            "anomaly_type":
                "HARM_IMPACT",

            "expected_correct_master_id":
                correct_master_id,

            "current_linked_master_id":
                adverse_person["master_id"],

            "related_biometric_id":
                "",

            "harm_impact":
                "CRITICAL",

            "notes":
                "Clean synthetic identity is incorrectly "
                "linked to an adverse Master identity. "
                "This case must receive Protective Priority."
        })


    # ========================================================
    # 3. PERSONAL DATA MISMATCH
    # ========================================================

    for index in reserve(
        ANOMALY_COUNTS["data_mismatch"]
    ):

        record = biometric_records[index]

        correct_master_id = record["_correct_master_id"]

        correct_person = master_lookup[
            correct_master_id
        ]

        original_dob = date.fromisoformat(
            correct_person["date_of_birth"]
        )

        wrong_dob = original_dob + timedelta(
            days=random.choice(
                [365, 730, 1095, -365, -730]
            )
        )

        record[
            "registered_date_of_birth"
        ] = wrong_dob.isoformat()

        ground_truth.append({
            "biometric_id":
                record["biometric_id"],

            "anomaly_type":
                "DATA_MISMATCH",

            "expected_correct_master_id":
                correct_master_id,

            "current_linked_master_id":
                record["linked_master_id"],

            "related_biometric_id":
                "",

            "harm_impact":
                "MEDIUM",

            "notes":
                "Date of birth intentionally differs "
                "from the Master Reference."
        })


    # ========================================================
    # 4. ORPHAN RECORD
    # ========================================================

    orphan_counter = 1

    for index in reserve(
        ANOMALY_COUNTS["orphan_record"]
    ):

        record = biometric_records[index]

        correct_master_id = record["_correct_master_id"]

        fake_reference = (
            f"REF-MISSING-{orphan_counter:04d}"
        )

        orphan_counter += 1

        record["linked_master_id"] = (
            fake_reference
        )

        ground_truth.append({
            "biometric_id":
                record["biometric_id"],

            "anomaly_type":
                "ORPHAN_RECORD",

            "expected_correct_master_id":
                correct_master_id,

            "current_linked_master_id":
                fake_reference,

            "related_biometric_id":
                "",

            "harm_impact":
                "HIGH",

            "notes":
                "Biometric record points to a Master "
                "Reference ID that does not exist."
        })


    # ========================================================
    # 5. DUPLICATE IDENTITY
    #
    # Two biometric records represent the same person.
    # ========================================================

    duplicate_identity_targets = reserve(
        ANOMALY_COUNTS["duplicate_identity"]
    )

    donor_candidates = [
        index
        for index in all_indexes
        if index not in reserved_indexes
    ]

    random.shuffle(donor_candidates)

    for target_index, donor_index in zip(
        duplicate_identity_targets,
        donor_candidates
    ):

        target = biometric_records[target_index]

        donor = biometric_records[donor_index]

        correct_master_id = (
            donor["_correct_master_id"]
        )

        donor_person = master_lookup[
            correct_master_id
        ]

        target["_correct_master_id"] = (
            correct_master_id
        )

        target["linked_master_id"] = (
            correct_master_id
        )

        target["registered_name"] = (
            donor_person["full_name"]
        )

        target[
            "registered_date_of_birth"
        ] = donor_person["date_of_birth"]

        target[
            "registered_nationality"
        ] = donor_person["nationality"]

        target["face_template"] = vector_to_json(
            add_noise(
                deterministic_vector(
                    f"FACE:{correct_master_id}"
                )
            )
        )

        target[
            "fingerprint_template"
        ] = vector_to_json(
            add_noise(
                deterministic_vector(
                    f"FINGERPRINT:{correct_master_id}"
                )
            )
        )

        target["iris_template"] = vector_to_json(
            add_noise(
                deterministic_vector(
                    f"IRIS:{correct_master_id}"
                )
            )
        )

        ground_truth.append({
            "biometric_id":
                target["biometric_id"],

            "anomaly_type":
                "DUPLICATE_IDENTITY",

            "expected_correct_master_id":
                correct_master_id,

            "current_linked_master_id":
                correct_master_id,

            "related_biometric_id":
                donor["biometric_id"],

            "harm_impact":
                "MEDIUM",

            "notes":
                "Second biometric registration created "
                "for the same Master identity."
        })


    # ========================================================
    # 6. DUPLICATE BIOMETRIC
    #
    # Biometric from one person is attached
    # to another identity.
    # ========================================================

    duplicate_biometric_targets = reserve(
        ANOMALY_COUNTS["duplicate_biometric"]
    )

    donor_candidates = [
        index
        for index in all_indexes
        if index not in reserved_indexes
    ]

    random.shuffle(donor_candidates)

    for target_index, donor_index in zip(
        duplicate_biometric_targets,
        donor_candidates
    ):

        target = biometric_records[target_index]

        donor = biometric_records[donor_index]

        donor_master_id = (
            donor["_correct_master_id"]
        )

        target["face_template"] = (
            donor["face_template"]
        )

        target["fingerprint_template"] = (
            donor["fingerprint_template"]
        )

        target["iris_template"] = (
            donor["iris_template"]
        )

        ground_truth.append({
            "biometric_id":
                target["biometric_id"],

            "anomaly_type":
                "DUPLICATE_BIOMETRIC",

            "expected_correct_master_id":
                donor_master_id,

            "current_linked_master_id":
                target["linked_master_id"],

            "related_biometric_id":
                donor["biometric_id"],

            "harm_impact":
                "HIGH",

            "notes":
                "Synthetic biometric templates copied "
                "from another identity."
        })


    # ========================================================
    # 7. COMPLEX MULTI-IDENTITY CONFLICT
    #
    # Biometric belongs to Person A
    # Current link points to Person B
    # Registered data belongs to Person C
    # ========================================================

    for index in reserve(
        ANOMALY_COUNTS["complex_conflict"]
    ):

        target = biometric_records[index]

        donor_index = random.choice(
            [
                i
                for i in all_indexes
                if i not in reserved_indexes
            ]
        )

        donor = biometric_records[
            donor_index
        ]

        biometric_owner_id = (
            donor["_correct_master_id"]
        )

        wrong_link_person = random.choice(
            [
                person
                for person in master_persons
                if person["master_id"]
                != biometric_owner_id
            ]
        )

        third_person = random.choice(
            [
                person
                for person in master_persons
                if person["master_id"]
                not in {
                    biometric_owner_id,
                    wrong_link_person["master_id"]
                }
            ]
        )

        target["face_template"] = (
            donor["face_template"]
        )

        target["fingerprint_template"] = (
            donor["fingerprint_template"]
        )

        target["iris_template"] = (
            donor["iris_template"]
        )

        target["linked_master_id"] = (
            wrong_link_person["master_id"]
        )

        target["registered_name"] = (
            third_person["full_name"]
        )

        target[
            "registered_date_of_birth"
        ] = third_person["date_of_birth"]

        target[
            "registered_nationality"
        ] = third_person["nationality"]

        ground_truth.append({
            "biometric_id":
                target["biometric_id"],

            "anomaly_type":
                "COMPLEX_CONFLICT",

            "expected_correct_master_id":
                biometric_owner_id,

            "current_linked_master_id":
                wrong_link_person["master_id"],

            "related_biometric_id":
                donor["biometric_id"],

            "harm_impact":
                "CRITICAL",

            "notes":
                "Biometric belongs to one identity, "
                "current Master link points to another, "
                "and registered demographic data belongs "
                "to a third identity."
        })

    return ground_truth


# ============================================================
# CSV EXPORT
# ============================================================

def write_csv(path, rows, fieldnames):

    with path.open(
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()

        writer.writerows(rows)


def export_master_persons(master_persons):

    path = OUTPUT_DIR / "master_persons.csv"

    fields = [
        "master_id",
        "full_name",
        "date_of_birth",
        "nationality",
        "master_status",
        "has_adverse_record",
        "adverse_type",
        "adverse_description",
        "created_at",
        "updated_at",
    ]

    write_csv(
        path,
        master_persons,
        fields
    )


def export_biometric_records(records):

    path = OUTPUT_DIR / "biometric_records.csv"

    fields = [
        "biometric_id",
        "linked_master_id",
        "registered_name",
        "registered_date_of_birth",
        "registered_nationality",
        "face_template",
        "fingerprint_template",
        "iris_template",
        "biometric_quality_score",
        "record_status",
        "registration_date",
        "created_at",
        "updated_at",
    ]

    clean_records = []

    for record in records:

        clean_record = {
            field: record[field]
            for field in fields
        }

        clean_records.append(
            clean_record
        )

    write_csv(
        path,
        clean_records,
        fields
    )


def export_ground_truth(ground_truth):

    path = OUTPUT_DIR / "ground_truth.csv"

    fields = [
        "biometric_id",
        "anomaly_type",
        "expected_correct_master_id",
        "current_linked_master_id",
        "related_biometric_id",
        "harm_impact",
        "notes",
    ]

    write_csv(
        path,
        ground_truth,
        fields
    )


# ============================================================
# DEMO SUMMARY
# ============================================================

def create_summary(
    master_persons,
    biometric_records,
    ground_truth
):

    anomaly_summary = {}

    for item in ground_truth:

        anomaly_type = item[
            "anomaly_type"
        ]

        anomaly_summary[
            anomaly_type
        ] = anomaly_summary.get(
            anomaly_type,
            0
        ) + 1

    adverse_master_records = sum(
        1
        for person in master_persons
        if person["has_adverse_record"]
    )

    summary = {
        "project":
            "AI Identity Reconciliation Platform",

        "environment":
            "Synthetic Demo Only",

        "seed":
            SEED,

        "master_records":
            len(master_persons),

        "biometric_records":
            len(biometric_records),

        "master_adverse_records":
            adverse_master_records,

        "intentional_anomalies":
            len(ground_truth),

        "anomaly_breakdown":
            anomaly_summary,

        "protective_priority_cases":
            anomaly_summary.get(
                "HARM_IMPACT",
                0
            ),

        "generated_at":
            datetime.now().isoformat(
                timespec="seconds"
            ),
    }

    path = OUTPUT_DIR / "demo_summary.json"

    with path.open(
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

    print(
        "\n"
        "============================================"
    )

    print(
        " AI Identity Reconciliation Platform"
    )

    print(
        " Synthetic Data Generator"
    )

    print(
        "============================================"
    )

    print(
        "\nCreating output directory..."
    )

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    print(
        f"\nGenerating "
        f"{MASTER_COUNT:,} "
        f"Master Reference identities..."
    )

    master_persons = (
        generate_master_persons()
    )

    print(
        f"Generating "
        f"{BIOMETRIC_COUNT:,} "
        f"Biometric System records..."
    )

    biometric_records = (
        generate_biometric_records(
            master_persons
        )
    )

    print(
        "Injecting synthetic "
        "identity anomalies..."
    )

    ground_truth = inject_anomalies(
        master_persons,
        biometric_records
    )

    print(
        "Exporting Master Reference data..."
    )

    export_master_persons(
        master_persons
    )

    print(
        "Exporting Biometric System data..."
    )

    export_biometric_records(
        biometric_records
    )

    print(
        "Exporting validation ground truth..."
    )

    export_ground_truth(
        ground_truth
    )

    summary = create_summary(
        master_persons,
        biometric_records,
        ground_truth
    )

    print(
        "\n"
        "============================================"
    )

    print(
        " GENERATION COMPLETE"
    )

    print(
        "============================================"
    )

    print(
        f"\nMaster Records: "
        f"{summary['master_records']:,}"
    )

    print(
        f"Biometric Records: "
        f"{summary['biometric_records']:,}"
    )

    print(
        f"Intentional Anomalies: "
        f"{summary['intentional_anomalies']}"
    )

    print(
        f"Protective Priority Cases: "
        f"{summary['protective_priority_cases']}"
    )

    print(
        "\nAnomaly Breakdown:"
    )

    for anomaly, count in (
        summary[
            "anomaly_breakdown"
        ].items()
    ):

        print(
            f" - {anomaly}: {count}"
        )

    print(
        "\nOutput:"
    )

    print(
        f" {OUTPUT_DIR}"
    )

    print(
        "\nIMPORTANT:"
    )

    print(
        " ground_truth.csv is for validation only."
    )

    print(
        " The reconciliation engine must NOT "
        "use it when detecting anomalies."
    )

    print()


if __name__ == "__main__":
    main()