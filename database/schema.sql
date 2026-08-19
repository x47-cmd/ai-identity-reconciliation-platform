-- ============================================================
-- AI Identity Reconciliation Platform
-- Database Schema
-- Version: 0.1
-- Environment: Synthetic Demo Data Only
-- Database: PostgreSQL
--
-- DEMO NAME POLICY:
-- Synthetic identity names must contain exactly two parts:
-- First Name + Second Name.
--
-- No third name, surname, family name, or tribe name is stored
-- as part of a synthetic identity.
-- ============================================================


-- ============================================================
-- 1. MASTER REFERENCE SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS master_persons (
    master_id VARCHAR(30) PRIMARY KEY,

    full_name VARCHAR(200) NOT NULL
        CHECK (
            full_name ~
            '^[^[:space:]]+[[:space:]]+[^[:space:]]+$'
        ),

    date_of_birth DATE,
    nationality VARCHAR(100),

    master_status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

    has_adverse_record BOOLEAN NOT NULL DEFAULT FALSE,
    adverse_type VARCHAR(100),
    adverse_description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. BIOMETRIC SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS biometric_records (
    biometric_id VARCHAR(30) PRIMARY KEY,

    -- Current identity mapping inside the biometric system.
    -- No foreign key is intentionally used here because
    -- incorrect/orphan mappings must be possible in the demo.
    linked_master_id VARCHAR(30),

    -- Synthetic identity names must contain exactly
    -- First Name + Second Name only.
    registered_name VARCHAR(200)
        CHECK (
            registered_name IS NULL
            OR registered_name ~
            '^[^[:space:]]+[[:space:]]+[^[:space:]]+$'
        ),

    registered_date_of_birth DATE,
    registered_nationality VARCHAR(100),

    face_template JSONB,
    fingerprint_template JSONB,
    iris_template JSONB,

    biometric_quality_score NUMERIC(5,2),

    record_status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. AI MONITORING RUNS
-- ============================================================

CREATE TABLE IF NOT EXISTS monitoring_runs (
    run_id BIGSERIAL PRIMARY KEY,

    run_type VARCHAR(30) NOT NULL DEFAULT 'FULL_SCAN',

    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,

    master_records_scanned INTEGER NOT NULL DEFAULT 0,
    biometric_records_scanned INTEGER NOT NULL DEFAULT 0,

    findings_detected INTEGER NOT NULL DEFAULT 0,
    high_risk_findings INTEGER NOT NULL DEFAULT 0,
    critical_findings INTEGER NOT NULL DEFAULT 0,

    run_status VARCHAR(30) NOT NULL DEFAULT 'RUNNING',

    summary TEXT
);


-- ============================================================
-- 4. AI FINDINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_findings (
    finding_id BIGSERIAL PRIMARY KEY,

    run_id BIGINT REFERENCES monitoring_runs(run_id)
        ON DELETE SET NULL,

    biometric_id VARCHAR(30) NOT NULL,

    current_master_id VARCHAR(30),
    suspected_correct_master_id VARCHAR(30),

    finding_type VARCHAR(100) NOT NULL,

    severity VARCHAR(20) NOT NULL DEFAULT 'LOW'
        CHECK (
            severity IN (
                'LOW',
                'MEDIUM',
                'HIGH',
                'CRITICAL'
            )
        ),

    ai_confidence NUMERIC(5,2)
        CHECK (
            ai_confidence IS NULL
            OR ai_confidence BETWEEN 0 AND 100
        ),

    risk_score NUMERIC(5,2)
        CHECK (
            risk_score IS NULL
            OR risk_score BETWEEN 0 AND 100
        ),

    harm_impact_score NUMERIC(5,2)
        CHECK (
            harm_impact_score IS NULL
            OR harm_impact_score BETWEEN 0 AND 100
        ),

    protective_priority_score NUMERIC(5,2)
        CHECK (
            protective_priority_score IS NULL
            OR protective_priority_score BETWEEN 0 AND 100
        ),

    wrongly_affected_person BOOLEAN NOT NULL DEFAULT FALSE,

    explanation TEXT,
    evidence JSONB,

    finding_status VARCHAR(30) NOT NULL DEFAULT 'OPEN',

    detected_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 5. CASE MANAGEMENT
-- ============================================================

CREATE TABLE IF NOT EXISTS cases (
    case_id VARCHAR(40) PRIMARY KEY,

    finding_id BIGINT NOT NULL REFERENCES ai_findings(finding_id),

    case_status VARCHAR(40) NOT NULL DEFAULT 'AI_INVESTIGATION',

    priority VARCHAR(20) NOT NULL DEFAULT 'LOW'
        CHECK (
            priority IN (
                'LOW',
                'MEDIUM',
                'HIGH',
                'CRITICAL',
                'IMMEDIATE'
            )
        ),

    assigned_officer VARCHAR(200),
    assigned_manager VARCHAR(200),

    opened_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,

    closure_reason TEXT
);


-- ============================================================
-- 6. AI INVESTIGATION
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_investigations (
    investigation_id BIGSERIAL PRIMARY KEY,

    case_id VARCHAR(40) NOT NULL REFERENCES cases(case_id)
        ON DELETE CASCADE,

    investigation_summary TEXT NOT NULL,

    current_identity_analysis TEXT,
    suspected_identity_analysis TEXT,

    biometric_analysis JSONB,
    identity_data_analysis JSONB,
    historical_analysis JSONB,

    root_cause_analysis TEXT,

    affected_person_analysis TEXT,

    ai_conclusion TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 7. AI CORRECTION RECOMMENDATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_recommendations (
    recommendation_id BIGSERIAL PRIMARY KEY,

    case_id VARCHAR(40) NOT NULL REFERENCES cases(case_id)
        ON DELETE CASCADE,

    current_master_id VARCHAR(30),
    proposed_master_id VARCHAR(30),

    proposed_action VARCHAR(100) NOT NULL,

    before_state JSONB,
    proposed_after_state JSONB,

    recommendation_reason TEXT,

    expected_result TEXT,

    ai_confidence NUMERIC(5,2),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 8. HUMAN APPROVALS
-- ============================================================

CREATE TABLE IF NOT EXISTS approvals (
    approval_id BIGSERIAL PRIMARY KEY,

    case_id VARCHAR(40) NOT NULL REFERENCES cases(case_id)
        ON DELETE CASCADE,

    approval_stage VARCHAR(30) NOT NULL
        CHECK (
            approval_stage IN (
                'MONITORING_OFFICER',
                'MANAGER'
            )
        ),

    approver_name VARCHAR(200),

    decision VARCHAR(30)
        CHECK (
            decision IS NULL
            OR decision IN (
                'APPROVED',
                'REJECTED',
                'RETURNED',
                'FURTHER_INVESTIGATION'
            )
        ),

    comments TEXT,

    decided_at TIMESTAMP,

    UNIQUE(case_id, approval_stage)
);


-- ============================================================
-- 9. AUTHORIZED CORRECTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS corrections (
    correction_id BIGSERIAL PRIMARY KEY,

    case_id VARCHAR(40) NOT NULL REFERENCES cases(case_id)
        ON DELETE CASCADE,

    target_system VARCHAR(50) NOT NULL DEFAULT 'BIOMETRIC_SYSTEM',

    target_record_id VARCHAR(30) NOT NULL,

    field_name VARCHAR(100) NOT NULL,

    old_value TEXT,
    new_value TEXT,

    execution_status VARCHAR(30) NOT NULL DEFAULT 'PENDING'
        CHECK (
            execution_status IN (
                'PENDING',
                'AUTHORIZED',
                'EXECUTING',
                'COMPLETED',
                'FAILED',
                'ROLLED_BACK'
            )
        ),

    executed_by VARCHAR(200),
    executed_at TIMESTAMP,

    execution_message TEXT
);


-- ============================================================
-- 10. POST-CORRECTION VERIFICATION
-- ============================================================

CREATE TABLE IF NOT EXISTS correction_verifications (
    verification_id BIGSERIAL PRIMARY KEY,

    correction_id BIGINT NOT NULL REFERENCES corrections(correction_id)
        ON DELETE CASCADE,

    identity_mapping_valid BOOLEAN,
    original_conflict_resolved BOOLEAN,
    duplicate_created BOOLEAN,
    secondary_conflict_created BOOLEAN,
    data_integrity_restored BOOLEAN,

    verification_score NUMERIC(5,2),

    verification_status VARCHAR(30)
        CHECK (
            verification_status IS NULL
            OR verification_status IN (
                'PASSED',
                'FAILED',
                'MANUAL_REVIEW_REQUIRED'
            )
        ),

    verification_summary TEXT,

    verified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 11. AUDIT TRAIL
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_events (
    audit_event_id BIGSERIAL PRIMARY KEY,

    case_id VARCHAR(40),

    actor_type VARCHAR(50) NOT NULL,

    actor_name VARCHAR(200),

    event_type VARCHAR(100) NOT NULL,

    event_description TEXT,

    before_state JSONB,
    after_state JSONB,

    metadata JSONB,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 12. DATA INTEGRITY SNAPSHOTS
-- ============================================================

CREATE TABLE IF NOT EXISTS data_integrity_snapshots (
    snapshot_id BIGSERIAL PRIMARY KEY,

    overall_integrity_score NUMERIC(5,2),

    biometric_integrity_score NUMERIC(5,2),

    identity_mapping_score NUMERIC(5,2),

    data_consistency_score NUMERIC(5,2),

    duplicate_health_score NUMERIC(5,2),

    unresolved_case_health_score NUMERIC(5,2),

    open_findings INTEGER NOT NULL DEFAULT 0,

    critical_cases INTEGER NOT NULL DEFAULT 0,

    harm_impact_cases INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 13. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_biometric_linked_master
ON biometric_records(linked_master_id);

CREATE INDEX IF NOT EXISTS idx_findings_biometric
ON ai_findings(biometric_id);

CREATE INDEX IF NOT EXISTS idx_findings_current_master
ON ai_findings(current_master_id);

CREATE INDEX IF NOT EXISTS idx_findings_suspected_master
ON ai_findings(suspected_correct_master_id);

CREATE INDEX IF NOT EXISTS idx_findings_severity
ON ai_findings(severity);

CREATE INDEX IF NOT EXISTS idx_findings_protective_priority
ON ai_findings(protective_priority_score DESC);

CREATE INDEX IF NOT EXISTS idx_cases_status
ON cases(case_status);

CREATE INDEX IF NOT EXISTS idx_cases_priority
ON cases(priority);

CREATE INDEX IF NOT EXISTS idx_audit_case
ON audit_events(case_id);


-- ============================================================
-- 14. AI CASE PRIORITY QUEUE
-- ============================================================

CREATE OR REPLACE VIEW v_ai_case_priority_queue AS

SELECT
    c.case_id,
    c.case_status,
    c.priority,

    f.biometric_id,

    f.current_master_id,
    f.suspected_correct_master_id,

    f.finding_type,
    f.severity,

    f.ai_confidence,
    f.risk_score,
    f.harm_impact_score,
    f.protective_priority_score,

    f.wrongly_affected_person,

    f.explanation,

    c.opened_at

FROM cases c

JOIN ai_findings f
ON c.finding_id = f.finding_id

WHERE c.closed_at IS NULL

ORDER BY

    f.wrongly_affected_person DESC,

    f.protective_priority_score DESC NULLS LAST,

    f.harm_impact_score DESC NULLS LAST,

    f.risk_score DESC NULLS LAST,

    f.ai_confidence DESC NULLS LAST,

    c.opened_at ASC;


-- ============================================================
-- 15. APPROVED CORRECTIONS VIEW
-- ============================================================

CREATE OR REPLACE VIEW v_authorized_cases AS

SELECT
    c.case_id,

    officer.decision AS officer_decision,
    manager.decision AS manager_decision,

    officer.approver_name AS monitoring_officer,
    manager.approver_name AS approving_manager

FROM cases c

LEFT JOIN approvals officer
ON officer.case_id = c.case_id
AND officer.approval_stage = 'MONITORING_OFFICER'

LEFT JOIN approvals manager
ON manager.case_id = c.case_id
AND manager.approval_stage = 'MANAGER'

WHERE
    officer.decision = 'APPROVED'
    AND manager.decision = 'APPROVED';


-- ============================================================
-- 16. SAFETY PRINCIPLE
-- ============================================================

-- IMPORTANT:
--
-- The Master Reference System is treated as READ ONLY.
--
-- Corrections generated by this platform are intended to target
-- the simulated Biometric System only.
--
-- No correction should be executed unless:
--
-- 1. Monitoring Officer approval = APPROVED
-- 2. Manager approval = APPROVED
--
-- Synthetic demo data only.
-- ============================================================