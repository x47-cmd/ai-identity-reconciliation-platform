"use client";

import {
  useSyncExternalStore,
} from "react";

import {
  ALL_DETECTED_CASES,
} from "./demo-data";


/* =========================================================
   CASE STORE

   Browser-local persistence for the synthetic demo only.

   CURRENT CASE MODEL
   ---------------------------------------------------------
   53 total detected cases
   = 52 active cases
   + 1 historical closed case

   ACTIVE CASES
   → Cases workspace

   CLOSED CASES
   → Reports & Audit

   A case is NOT deleted after completion.
   It remains stored and is moved from active → closed.

   DEMO IDENTITY NAME POLICY
   ---------------------------------------------------------
   - First Name + Second Name only
   - No third name
   - No family name
   - No surname
   - No tribe name

   SECURITY
   ---------------------------------------------------------
   Never store real PII or real biometric data here.
   ========================================================= */


/* =========================================================
   STORAGE VERSION

   v3 introduces:
   - active / closed lifecycle
   - full 53-case baseline
   - workflow transitions
   - cross-page persistent approvals
   - execution state
   - verification state
   - audit history
   ========================================================= */

const STORAGE_KEY =
  "ai-biometric-case-store-v3";


const LEGACY_STORAGE_KEYS = [
  "ai-biometric-case-store-v1",
  "ai-biometric-case-store-v2",
];


const STORE_EVENT =
  "ai-biometric-case-store-change";


const STORE_VERSION =
  3;


/* =========================================================
   SERVER / MEMORY STATE
   ========================================================= */

const SERVER_SNAPSHOT =
  Object.freeze({
    version:
      STORE_VERSION,

    initialized:
      false,

    cases:
      [],

    updatedAt:
      null,
  });


let memoryState = {
  version:
    STORE_VERSION,

  initialized:
    false,

  cases:
    [],

  updatedAt:
    null,
};


let hydrated =
  false;


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function isBrowser() {
  return (
    typeof window !==
    "undefined"
  );
}


function now() {
  return (
    new Date().toISOString()
  );
}


function normalizeId(
  value
) {
  return String(
    value || ""
  ).trim();
}


/* =========================================================
   IDENTITY NAME POLICY
   ========================================================= */

function normalizeTwoPartIdentityName(
  value
) {
  if (
    typeof value !==
    "string"
  ) {
    return value;
  }


  const parts =
    value
      .trim()
      .split(
        /\s+/
      )
      .filter(
        Boolean
      );


  if (
    parts.length <= 2
  ) {
    return (
      parts.join(
        " "
      )
    );
  }


  return (
    parts
      .slice(
        0,
        2
      )
      .join(
        " "
      )
  );
}


function normalizeLocalizedIdentityName(
  value
) {
  if (
    typeof value ===
    "string"
  ) {
    return (
      normalizeTwoPartIdentityName(
        value
      )
    );
  }


  if (
    !value ||
    typeof value !==
      "object" ||
    Array.isArray(
      value
    )
  ) {
    return value;
  }


  const normalized = {
    ...value,
  };


  if (
    typeof normalized.en ===
    "string"
  ) {
    normalized.en =
      normalizeTwoPartIdentityName(
        normalized.en
      );
  }


  if (
    typeof normalized.ar ===
    "string"
  ) {
    normalized.ar =
      normalizeTwoPartIdentityName(
        normalized.ar
      );
  }


  return normalized;
}


/* =========================================================
   APPLY IDENTITY NAME POLICY

   Only explicit identity-person fields are normalized.

   Human role labels / workflow actor names are NOT changed.
   ========================================================= */

function applyIdentityNamePolicy(
  caseData
) {
  if (
    !caseData ||
    typeof caseData !==
      "object"
  ) {
    return caseData;
  }


  const normalized = {
    ...caseData,
  };


  const identityNameFields = [
    "person",

    "fullName",

    "registeredName",

    "identityName",

    "subjectName",

    "affectedPersonName",

    "currentIdentityName",

    "proposedIdentityName",

    "canonicalIdentityName",

    "beforeName",

    "afterName",
  ];


  identityNameFields.forEach(
    (
      field
    ) => {

      if (
        Object.prototype.hasOwnProperty.call(
          normalized,
          field
        )
      ) {
        normalized[
          field
        ] =
          normalizeLocalizedIdentityName(
            normalized[
              field
            ]
          );
      }

    }
  );


  /*
     Execution Before / After display names.
  */

  if (
    normalized.execution &&
    typeof normalized.execution ===
      "object" &&
    !Array.isArray(
      normalized.execution
    )
  ) {
    normalized.execution = {
      ...normalized.execution,
    };


    if (
      Object.prototype.hasOwnProperty.call(
        normalized.execution,
        "beforeName"
      )
    ) {
      normalized.execution.beforeName =
        normalizeLocalizedIdentityName(
          normalized.execution.beforeName
        );
    }


    if (
      Object.prototype.hasOwnProperty.call(
        normalized.execution,
        "afterName"
      )
    ) {
      normalized.execution.afterName =
        normalizeLocalizedIdentityName(
          normalized.execution.afterName
        );
    }
  }


  return normalized;
}


/* =========================================================
   EXECUTION STATUS
   ========================================================= */

function getExecutionStatus(
  caseData
) {
  if (
    caseData?.execution &&
    typeof caseData.execution ===
      "object"
  ) {
    return (
      caseData.execution.status ||
      "NOT_AUTHORIZED"
    );
  }


  return (
    caseData?.correction ||
    caseData?.execution ||
    "NOT_AUTHORIZED"
  );
}


/* =========================================================
   VERIFICATION STATUS
   ========================================================= */

function getVerificationStatus(
  caseData
) {
  if (
    caseData?.verification &&
    typeof caseData.verification ===
      "object"
  ) {
    return (
      caseData.verification.status ||
      "NOT_STARTED"
    );
  }


  return (
    caseData?.verification ||
    "NOT_STARTED"
  );
}


/* =========================================================
   NORMALIZE CASE LIFECYCLE
   ========================================================= */

function normalizeCase(
  caseData
) {
  if (
    !caseData ||
    typeof caseData !==
      "object"
  ) {
    return null;
  }


  const protectedCase =
    applyIdentityNamePolicy(
      caseData
    );


  const id =
    normalizeId(
      protectedCase.id
    );


  if (
    !id
  ) {
    return null;
  }


  const workflowStatus =
    protectedCase.workflowStatus ||
    protectedCase.stage ||
    protectedCase.status ||
    protectedCase.finalStatus ||
    "AI_INVESTIGATED";


  const finalStatus =
    protectedCase.finalStatus ||
    workflowStatus;


  const closedByStatus =
    [
      "VERIFIED_CLOSED",
      "CLOSED",
    ].includes(
      finalStatus
    );


  const closed =
    Boolean(
      protectedCase.closed ||
      closedByStatus
    );


  const active =
    !closed;


  const completed =
    Boolean(
      protectedCase.completed ||
      closed
    );


  return {
    ...protectedCase,

    id,

    workflowStatus,

    stage:
      workflowStatus,

    status:
      finalStatus,

    finalStatus,

    active,

    closed,

    completed,

    createdAt:
      protectedCase.createdAt ||
      now(),

    updatedAt:
      protectedCase.updatedAt ||
      now(),

    closedAt:
      closed
        ? (
            protectedCase.closedAt ||
            null
          )
        : null,
  };
}


/* =========================================================
   NORMALIZE STORE STATE

   Duplicate Case IDs are automatically collapsed.
   Latest occurrence wins.
   ========================================================= */

function normalizeState(
  value
) {
  const rawCases =
    Array.isArray(
      value?.cases
    )
      ? value.cases
      : [];


  const caseMap =
    new Map();


  rawCases.forEach(
    (
      item
    ) => {

      const normalized =
        normalizeCase(
          item
        );


      if (
        normalized
      ) {
        caseMap.set(
          normalized.id,
          normalized
        );
      }

    }
  );


  const cases =
    Array.from(
      caseMap.values()
    );


  return {
    version:
      STORE_VERSION,

    initialized:
      Boolean(
        value?.initialized ||
        cases.length > 0
      ),

    cases,

    updatedAt:
      typeof value?.updatedAt ===
      "string"
        ? value.updatedAt
        : null,
  };
}


/* =========================================================
   LEGACY STORAGE CLEANUP

   v1 / v2 are removed because:
   - old identity-name format may exist
   - old case lifecycle did not distinguish active / closed
   - old seeds did not contain the complete active queue
   ========================================================= */

function cleanupLegacyStorage() {
  if (
    !isBrowser()
  ) {
    return;
  }


  LEGACY_STORAGE_KEYS.forEach(
    (
      key
    ) => {

      try {
        window.localStorage.removeItem(
          key
        );
      } catch {
        /*
           Browser-local storage may be unavailable.
           In-memory demo state remains usable.
        */
      }

    }
  );
}


/* =========================================================
   STORAGE READ
   ========================================================= */

function readStorage() {
  if (
    !isBrowser()
  ) {
    return memoryState;
  }


  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );


    if (
      !raw
    ) {
      return {
        version:
          STORE_VERSION,

        initialized:
          false,

        cases:
          [],

        updatedAt:
          null,
      };
    }


    const parsed =
      JSON.parse(
        raw
      );


    if (
      Number(
        parsed?.version
      ) !==
      STORE_VERSION
    ) {
      return {
        version:
          STORE_VERSION,

        initialized:
          false,

        cases:
          [],

        updatedAt:
          null,
      };
    }


    return (
      normalizeState(
        parsed
      )
    );

  } catch {

    return {
      version:
        STORE_VERSION,

      initialized:
        false,

      cases:
        [],

      updatedAt:
        null,
    };
  }
}


/* =========================================================
   HYDRATE
   ========================================================= */

function hydrate() {
  if (
    !isBrowser() ||
    hydrated
  ) {
    return;
  }


  cleanupLegacyStorage();


  memoryState =
    readStorage();


  hydrated =
    true;
}


/* =========================================================
   NOTIFY
   ========================================================= */

function notify() {
  if (
    !isBrowser()
  ) {
    return;
  }


  window.dispatchEvent(
    new CustomEvent(
      STORE_EVENT,
      {
        detail:
          memoryState,
      }
    )
  );
}


/* =========================================================
   SAVE
   ========================================================= */

function saveState(
  nextState
) {
  const normalized =
    normalizeState({
      ...nextState,

      initialized:
        true,

      updatedAt:
        now(),
    });


  memoryState =
    normalized;


  hydrated =
    true;


  if (
    isBrowser()
  ) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          normalized
        )
      );
    } catch {
      /*
         The demo continues using in-memory state.
      */
    }
  }


  notify();


  return memoryState;
}


/* =========================================================
   BUILD INITIAL DATASET

   Always includes the validated 53-case baseline.

   Any supplied seed cases override matching baseline IDs.

   This protects the demo from older pages accidentally
   initializing the store with only two or three cases.
   ========================================================= */

function buildInitialDataset(
  seedCases = []
) {
  const caseMap =
    new Map();


  ALL_DETECTED_CASES.forEach(
    (
      item
    ) => {

      if (
        item?.id
      ) {
        caseMap.set(
          item.id,
          item
        );
      }

    }
  );


  if (
    Array.isArray(
      seedCases
    )
  ) {
    seedCases.forEach(
      (
        item
      ) => {

        if (
          item?.id
        ) {
          caseMap.set(
            item.id,
            item
          );
        }

      }
    );
  }


  return (
    Array.from(
      caseMap.values()
    )
  );
}


/* =========================================================
   GENERATE CASE ID
   ========================================================= */

function generateCaseId() {
  hydrate();


  const year =
    new Date().getFullYear();


  let highest =
    0;


  memoryState.cases.forEach(
    (
      item
    ) => {

      const match =
        String(
          item.id || ""
        ).match(
          /^CASE-\d{4}-(\d+)$/
        );


      if (
        !match
      ) {
        return;
      }


      const number =
        Number(
          match[1]
        );


      if (
        Number.isFinite(
          number
        ) &&
        number >
          highest
      ) {
        highest =
          number;
      }

    }
  );


  const next =
    highest +
    1;


  return (
    `CASE-${year}-${String(
      next
    ).padStart(
      5,
      "0"
    )}`
  );
}


/* =========================================================
   INITIALIZE

   The complete validated demo dataset is written once.

   52 active
   +
   1 closed
   =
   53 total
   ========================================================= */

export function initializeCaseStore(
  seedCases = []
) {
  hydrate();


  if (
    memoryState.initialized
  ) {
    return memoryState;
  }


  const timestamp =
    now();


  const initialDataset =
    buildInitialDataset(
      seedCases
    );


  const cases =
    initialDataset
      .map(
        (
          item
        ) =>
          normalizeCase({
            ...item,

            createdAt:
              item.createdAt ||
              timestamp,

            updatedAt:
              item.updatedAt ||
              timestamp,
          })
      )
      .filter(
        Boolean
      );


  return (
    saveState({
      version:
        STORE_VERSION,

      initialized:
        true,

      cases,
    })
  );
}


/* =========================================================
   INITIALIZE STANDARD DEMO

   Convenience helper for pages.
   ========================================================= */

export function initializeDemoCaseStore() {
  return (
    initializeCaseStore()
  );
}


/* =========================================================
   STATE
   ========================================================= */

export function getCaseStoreState() {
  hydrate();

  return memoryState;
}


/* =========================================================
   ALL CASES
   ========================================================= */

export function getCases() {
  hydrate();


  return [
    ...memoryState.cases,
  ];
}


/* =========================================================
   ACTIVE CASES

   Closed cases never appear here.
   ========================================================= */

export function getActiveCases() {
  hydrate();


  return (
    memoryState.cases.filter(
      (
        item
      ) =>
        item.active &&
        !item.closed &&
        item.finalStatus !==
          "VERIFIED_CLOSED"
    )
  );
}


/* =========================================================
   CLOSED / HISTORY CASES
   ========================================================= */

export function getClosedCases() {
  hydrate();


  return (
    memoryState.cases.filter(
      (
        item
      ) =>
        item.closed ||
        item.finalStatus ===
          "VERIFIED_CLOSED"
    )
  );
}


/* =========================================================
   COUNTS

   These are dynamic.

   When a case closes:
   active -1
   closed +1

   total remains unchanged.
   ========================================================= */

export function getCaseCounts() {
  const all =
    getCases();


  const active =
    all.filter(
      (
        item
      ) =>
        item.active &&
        !item.closed &&
        item.finalStatus !==
          "VERIFIED_CLOSED"
    );


  const closed =
    all.filter(
      (
        item
      ) =>
        item.closed ||
        item.finalStatus ===
          "VERIFIED_CLOSED"
    );


  return {
    total:
      all.length,

    active:
      active.length,

    closed:
      closed.length,

    immediate:
      active.filter(
        (
          item
        ) =>
          item.priority ===
          "IMMEDIATE"
      ).length,

    high:
      active.filter(
        (
          item
        ) =>
          item.priority ===
          "HIGH"
      ).length,

    medium:
      active.filter(
        (
          item
        ) =>
          item.priority ===
          "MEDIUM"
      ).length,

    protective:
      active.filter(
        (
          item
        ) =>
          Boolean(
            item.wronglyAffected
          )
      ).length,
  };
}


/* =========================================================
   ACTIVE CASE SORTING
   ========================================================= */

const PRIORITY_ORDER = {
  IMMEDIATE:
    3,

  HIGH:
    2,

  MEDIUM:
    1,
};


export function getSortedActiveCases() {
  return (
    [
      ...getActiveCases(),
    ].sort(
      (
        a,
        b
      ) => {

        const priorityDifference =
          (
            PRIORITY_ORDER[
              b.priority
            ] ||
            0
          )
          -
          (
            PRIORITY_ORDER[
              a.priority
            ] ||
            0
          );


        if (
          priorityDifference !==
          0
        ) {
          return (
            priorityDifference
          );
        }


        const protectiveDifference =
          Number(
            b.protectivePriority ||
            0
          )
          -
          Number(
            a.protectivePriority ||
            0
          );


        if (
          protectiveDifference !==
          0
        ) {
          return (
            protectiveDifference
          );
        }


        return (
          a.id.localeCompare(
            b.id
          )
        );
      }
    )
  );
}


/* =========================================================
   TOP ACTIVE CASES

   Used by the simplified Cases landing page.
   ========================================================= */

export function getTopActiveCases(
  limit = 3
) {
  return (
    getSortedActiveCases().slice(
      0,
      Math.max(
        0,
        Number(
          limit
        ) ||
        0
      )
    )
  );
}


/* =========================================================
   GET CASE
   ========================================================= */

export function getCaseById(
  caseId
) {
  hydrate();


  const id =
    normalizeId(
      caseId
    );


  return (
    memoryState.cases.find(
      (
        item
      ) =>
        item.id ===
        id
    ) ||
    null
  );
}


/* =========================================================
   GET ACTIVE CASE
   ========================================================= */

export function getActiveCaseById(
  caseId
) {
  const item =
    getCaseById(
      caseId
    );


  if (
    !item ||
    item.closed ||
    !item.active ||
    item.finalStatus ===
      "VERIFIED_CLOSED"
  ) {
    return null;
  }


  return item;
}


/* =========================================================
   GET CLOSED CASE
   ========================================================= */

export function getClosedCaseById(
  caseId
) {
  const item =
    getCaseById(
      caseId
    );


  if (
    !item
  ) {
    return null;
  }


  if (
    item.closed ||
    item.finalStatus ===
      "VERIFIED_CLOSED"
  ) {
    return item;
  }


  return null;
}


/* =========================================================
   ADD CASE
   ========================================================= */

export function addCase(
  caseData = {}
) {
  hydrate();


  const id =
    normalizeId(
      caseData.id
    ) ||
    generateCaseId();


  const duplicate =
    memoryState.cases.some(
      (
        item
      ) =>
        item.id ===
        id
    );


  if (
    duplicate
  ) {
    throw new Error(
      `Case already exists: ${id}`
    );
  }


  const timestamp =
    now();


  const newCase =
    normalizeCase({
      active:
        true,

      closed:
        false,

      workflowStatus:
        "AI_INVESTIGATED",

      finalStatus:
        "AI_INVESTIGATED",

      priority:
        "MEDIUM",

      officerDecision:
        "PENDING",

      managerDecision:
        "NOT_READY",

      execution: {
        status:
          "NOT_AUTHORIZED",
      },

      verification: {
        status:
          "NOT_STARTED",
      },

      completed:
        false,

      audit:
        [],

      ...caseData,

      id,

      createdAt:
        caseData.createdAt ||
        timestamp,

      updatedAt:
        timestamp,
    });


  saveState({
    ...memoryState,

    cases: [
      ...memoryState.cases,
      newCase,
    ],
  });


  return newCase;
}


/* =========================================================
   UPDATE CASE
   ========================================================= */

export function updateCase(
  caseId,
  changes
) {
  hydrate();


  const id =
    normalizeId(
      caseId
    );


  const index =
    memoryState.cases.findIndex(
      (
        item
      ) =>
        item.id ===
        id
    );


  if (
    index ===
    -1
  ) {
    return null;
  }


  const current =
    memoryState.cases[
      index
    ];


  const patch =
    typeof changes ===
    "function"
      ? changes(
          current
        )
      : changes;


  if (
    !patch ||
    typeof patch !==
      "object"
  ) {
    return current;
  }


  const updated =
    normalizeCase({
      ...current,
      ...patch,

      id:
        current.id,

      createdAt:
        current.createdAt,

      updatedAt:
        now(),
    });


  const cases = [
    ...memoryState.cases,
  ];


  cases[
    index
  ] =
    updated;


  saveState({
    ...memoryState,

    cases,
  });


  return updated;
}


/* =========================================================
   UPSERT
   ========================================================= */

export function upsertCase(
  caseData
) {
  if (
    !caseData ||
    typeof caseData !==
      "object"
  ) {
    return null;
  }


  const id =
    normalizeId(
      caseData.id
    );


  if (
    !id
  ) {
    return (
      addCase(
        caseData
      )
    );
  }


  const existing =
    getCaseById(
      id
    );


  if (
    !existing
  ) {
    return (
      addCase(
        caseData
      )
    );
  }


  return (
    updateCase(
      id,
      caseData
    )
  );
}


/* =========================================================
   GENERIC WORKFLOW UPDATE
   ========================================================= */

export function updateCaseWorkflow(
  caseId,
  workflow = {}
) {
  return (
    updateCase(
      caseId,
      (
        current
      ) => ({
        ...current,
        ...workflow,
      })
    )
  );
}


/* =========================================================
   AUDIT HELPER
   ========================================================= */

function appendAuditEvent(
  current,
  event
) {
  return [
    ...(
      Array.isArray(
        current.audit
      )
        ? current.audit
        : []
    ),

    {
      ...event,

      at:
        event.at ||
        now(),
    },
  ];
}


/* =========================================================
   ADD AUDIT EVENT
   ========================================================= */

export function addCaseAuditEvent(
  caseId,
  event
) {
  if (
    !event ||
    typeof event !==
      "object"
  ) {
    return null;
  }


  return (
    updateCase(
      caseId,
      (
        current
      ) => ({
        audit:
          appendAuditEvent(
            current,
            event
          ),
      })
    )
  );
}


/* =========================================================
   OFFICER DECISION

   APPROVED
   → Manager becomes ready

   REJECTED
   → No execution authorization

   MORE_INVESTIGATION
   → Returns to AI investigation
   ========================================================= */

export function submitOfficerDecision(
  caseId,
  decision = "APPROVED",
  actor = "Demo Monitoring Officer"
) {
  const normalizedDecision =
    String(
      decision
    )
      .trim()
      .toUpperCase();


  return (
    updateCase(
      caseId,
      (
        current
      ) => {

        if (
          current.closed
        ) {
          return current;
        }


        if (
          normalizedDecision ===
          "APPROVED"
        ) {
          return {
            officer: {
              ...(
                typeof current.officer ===
                "object"
                  ? current.officer
                  : {}
              ),

              role:
                "Monitoring Officer",

              actor,

              decision:
                "APPROVED",

              decidedAt:
                now(),
            },

            officerDecision:
              "APPROVED",

            manager: {
              ...(
                typeof current.manager ===
                "object"
                  ? current.manager
                  : {}
              ),

              role:
                "Supervising Manager",

              decision:
                "PENDING",
            },

            managerDecision:
              "PENDING",

            workflowStatus:
              "AWAITING_MANAGER_APPROVAL",

            stage:
              "AWAITING_MANAGER_APPROVAL",

            status:
              "AWAITING_MANAGER_APPROVAL",

            finalStatus:
              "AWAITING_MANAGER_APPROVAL",

            audit:
              appendAuditEvent(
                current,
                {
                  type:
                    "OFFICER_APPROVAL",

                  title: {
                    en:
                      "Officer review approved",

                    ar:
                      "تم اعتماد مراجعة الموظف",
                  },

                  description: {
                    en:
                      "The authorized employee reviewed the case and approved the proposed correction for Manager review.",

                    ar:
                      "راجع الموظف المخول الحالة واعتمد التصحيح المقترح لإحالته إلى المدير.",
                  },

                  actor,
                }
              ),
          };
        }


        if (
          normalizedDecision ===
          "MORE_INVESTIGATION"
        ) {
          return {
            officer: {
              ...(
                typeof current.officer ===
                "object"
                  ? current.officer
                  : {}
              ),

              role:
                "Monitoring Officer",

              actor,

              decision:
                "MORE_INVESTIGATION",

              decidedAt:
                now(),
            },

            officerDecision:
              "MORE_INVESTIGATION",

            managerDecision:
              "NOT_READY",

            workflowStatus:
              "AI_INVESTIGATED",

            stage:
              "AI_INVESTIGATED",

            status:
              "AI_INVESTIGATED",

            finalStatus:
              "AI_INVESTIGATED",

            audit:
              appendAuditEvent(
                current,
                {
                  type:
                    "MORE_INVESTIGATION_REQUESTED",

                  title: {
                    en:
                      "Additional investigation requested",

                    ar:
                      "تم طلب تحقيق إضافي",
                  },

                  description: {
                    en:
                      "The case was returned for additional investigation before approval.",

                    ar:
                      "تمت إعادة الحالة لإجراء تحقيق إضافي قبل الاعتماد.",
                  },

                  actor,
                }
              ),
          };
        }


        return {
          officer: {
            ...(
              typeof current.officer ===
              "object"
                ? current.officer
                : {}
            ),

            role:
              "Monitoring Officer",

            actor,

            decision:
              "REJECTED",

            decidedAt:
              now(),
          },

          officerDecision:
            "REJECTED",

          managerDecision:
            "NOT_READY",

          workflowStatus:
            "OFFICER_REJECTED",

          stage:
            "OFFICER_REJECTED",

          status:
            "OFFICER_REJECTED",

          finalStatus:
            "OFFICER_REJECTED",

          audit:
            appendAuditEvent(
              current,
              {
                type:
                  "OFFICER_REJECTION",

                title: {
                  en:
                    "Officer review rejected",

                  ar:
                    "تم رفض الحالة في مراجعة الموظف",
                },

                description: {
                  en:
                    "The proposed correction was not approved during the first human review.",

                  ar:
                    "لم يتم اعتماد التصحيح المقترح خلال المراجعة البشرية الأولى.",
                },

                actor,
              }
            ),
        };
      }
    )
  );
}


/* =========================================================
   MANAGER DECISION

   APPROVED
   → Correction becomes authorized

   RETURN_TO_OFFICER
   → Returns to Officer Review

   MORE_INVESTIGATION
   → Returns to investigation

   REJECTED
   → Execution remains blocked
   ========================================================= */

export function submitManagerDecision(
  caseId,
  decision = "APPROVED",
  actor = "Demo Supervising Manager"
) {
  const normalizedDecision =
    String(
      decision
    )
      .trim()
      .toUpperCase();


  const currentCase =
    getCaseById(
      caseId
    );


  if (
    !currentCase ||
    currentCase.closed
  ) {
    return currentCase;
  }


  if (
    normalizedDecision ===
      "APPROVED" &&
    currentCase.officerDecision !==
      "APPROVED"
  ) {
    throw new Error(
      "Manager approval requires Officer approval first."
    );
  }


  return (
    updateCase(
      caseId,
      (
        current
      ) => {

        if (
          normalizedDecision ===
          "APPROVED"
        ) {
          const execution =
            typeof current.execution ===
              "object"
              ? {
                  ...current.execution,

                  status:
                    "READY",
                }
              : {
                  status:
                    "READY",
                };


          return {
            manager: {
              ...(
                typeof current.manager ===
                "object"
                  ? current.manager
                  : {}
              ),

              role:
                "Supervising Manager",

              actor,

              decision:
                "APPROVED",

              decidedAt:
                now(),
            },

            managerDecision:
              "APPROVED",

            execution,

            correction:
              "READY",

            workflowStatus:
              "READY_FOR_CORRECTION",

            stage:
              "READY_FOR_CORRECTION",

            status:
              "READY_FOR_CORRECTION",

            finalStatus:
              "READY_FOR_CORRECTION",

            audit:
              appendAuditEvent(
                current,
                {
                  type:
                    "MANAGER_APPROVAL",

                  title: {
                    en:
                      "Manager approval recorded",

                    ar:
                      "تم تسجيل موافقة المدير",
                  },

                  description: {
                    en:
                      "The second human approval authorized the correction for controlled execution.",

                    ar:
                      "سمحت الموافقة البشرية الثانية بانتقال التصحيح إلى التنفيذ الخاضع للتحكم.",
                  },

                  actor,
                }
              ),
          };
        }


        if (
          normalizedDecision ===
          "RETURN_TO_OFFICER"
        ) {
          return {
            officer: {
              ...(
                typeof current.officer ===
                "object"
                  ? current.officer
                  : {}
              ),

              decision:
                "PENDING",
            },

            officerDecision:
              "PENDING",

            manager: {
              ...(
                typeof current.manager ===
                "object"
                  ? current.manager
                  : {}
              ),

              actor,

              decision:
                "RETURNED_TO_OFFICER",

              decidedAt:
                now(),
            },

            managerDecision:
              "RETURNED_TO_OFFICER",

            workflowStatus:
              "READY_FOR_OFFICER_REVIEW",

            stage:
              "READY_FOR_OFFICER_REVIEW",

            status:
              "READY_FOR_OFFICER_REVIEW",

            finalStatus:
              "READY_FOR_OFFICER_REVIEW",

            audit:
              appendAuditEvent(
                current,
                {
                  type:
                    "RETURNED_TO_OFFICER",

                  title: {
                    en:
                      "Returned to Officer",

                    ar:
                      "تمت إعادة الحالة إلى الموظف",
                  },

                  description: {
                    en:
                      "The Manager returned the case for revised first-level review.",

                    ar:
                      "أعاد المدير الحالة إلى المراجعة البشرية الأولى لإعادة التقييم.",
                  },

                  actor,
                }
              ),
          };
        }


        if (
          normalizedDecision ===
          "MORE_INVESTIGATION"
        ) {
          return {
            manager: {
              ...(
                typeof current.manager ===
                "object"
                  ? current.manager
                  : {}
              ),

              actor,

              decision:
                "MORE_INVESTIGATION",

              decidedAt:
                now(),
            },

            managerDecision:
              "MORE_INVESTIGATION",

            workflowStatus:
              "AI_INVESTIGATED",

            stage:
              "AI_INVESTIGATED",

            status:
              "AI_INVESTIGATED",

            finalStatus:
              "AI_INVESTIGATED",

            audit:
              appendAuditEvent(
                current,
                {
                  type:
                    "MANAGER_INVESTIGATION_REQUEST",

                  title: {
                    en:
                      "Manager requested more investigation",

                    ar:
                      "طلب المدير مزيدًا من التحقيق",
                  },

                  description: {
                    en:
                      "The case was returned for additional evidence before a final management decision.",

                    ar:
                      "تمت إعادة الحالة للحصول على أدلة إضافية قبل اتخاذ القرار الإداري النهائي.",
                  },

                  actor,
                }
              ),
          };
        }


        return {
          manager: {
            ...(
              typeof current.manager ===
              "object"
                ? current.manager
                : {}
            ),

            actor,

            decision:
              "REJECTED",

            decidedAt:
              now(),
          },

          managerDecision:
            "REJECTED",

          workflowStatus:
            "MANAGER_REJECTED",

          stage:
            "MANAGER_REJECTED",

          status:
            "MANAGER_REJECTED",

          finalStatus:
            "MANAGER_REJECTED",

          audit:
            appendAuditEvent(
              current,
              {
                type:
                  "MANAGER_REJECTION",

                title: {
                  en:
                    "Manager rejected correction",

                  ar:
                    "رفض المدير التصحيح",
                },

                description: {
                  en:
                    "Management authorization was not granted and controlled execution remains blocked.",

                  ar:
                    "لم يتم منح الاعتماد الإداري ويظل التنفيذ الخاضع للتحكم محظورًا.",
                },

                actor,
              }
            ),
        };
      }
    )
  );
}


/* =========================================================
   CONTROLLED EXECUTION

   Requirements:
   - Officer APPROVED
   - Manager APPROVED
   - Target system = BIOMETRIC_SYSTEM
   ========================================================= */

export function executeCaseCorrection(
  caseId,
  actor = "Demo Execution Agent"
) {
  const current =
    getCaseById(
      caseId
    );


  if (
    !current ||
    current.closed
  ) {
    return current;
  }


  if (
    current.officerDecision !==
      "APPROVED" ||
    current.managerDecision !==
      "APPROVED"
  ) {
    throw new Error(
      "Controlled execution requires Officer and Manager approval."
    );
  }


  const execution =
    typeof current.execution ===
      "object"
      ? current.execution
      : {};


  if (
    execution.targetSystem &&
    execution.targetSystem !==
      "BIOMETRIC_SYSTEM"
  ) {
    throw new Error(
      "Controlled execution is restricted to BIOMETRIC_SYSTEM."
    );
  }


  return (
    updateCase(
      caseId,
      (
        latest
      ) => ({
        execution: {
          ...(
            typeof latest.execution ===
            "object"
              ? latest.execution
              : {}
          ),

          status:
            "COMPLETED",

          executedAt:
            now(),

          executedBy:
            actor,
        },

        correction:
          "COMPLETED",

        workflowStatus:
          "AWAITING_VERIFICATION",

        stage:
          "AWAITING_VERIFICATION",

        status:
          "AWAITING_VERIFICATION",

        finalStatus:
          "AWAITING_VERIFICATION",

        audit:
          appendAuditEvent(
            latest,
            {
              type:
                "CONTROLLED_CORRECTION_COMPLETED",

              title: {
                en:
                  "Controlled correction completed",

                ar:
                  "تم تنفيذ التصحيح الخاضع للتحكم",
              },

              description: {
                en:
                  "The approved biometric identity link correction was executed on the permitted operational target.",

                ar:
                  "تم تنفيذ تصحيح ربط الهوية البيومترية المعتمد على النظام التشغيلي المسموح.",
              },

              actor,
            }
          ),
      })
    )
  );
}


/* =========================================================
   VERIFICATION

   PASSED:
   - verification succeeds
   - conflict resolved
   - case becomes CLOSED
   - disappears from active Cases
   - remains in Reports & Audit

   FAILED:
   - closure blocked
   - case remains ACTIVE
   ========================================================= */

export function verifyCaseCorrection(
  caseId,
  result = {}
) {
  const current =
    getCaseById(
      caseId
    );


  if (
    !current ||
    current.closed
  ) {
    return current;
  }


  if (
    getExecutionStatus(
      current
    ) !==
    "COMPLETED"
  ) {
    throw new Error(
      "Verification requires completed correction execution."
    );
  }


  const verificationStatus =
    String(
      result.status ||
      "PASSED"
    )
      .trim()
      .toUpperCase();


  const passed =
    verificationStatus ===
    "PASSED";


  if (
    passed
  ) {
    const score =
      result.score ??
      100;


    const biometricMatchPercent =
      result.biometricMatchPercent ??
      Number(
        current.aiConfidence ||
        99.9
      );


    const biometricMatch =
      result.biometricMatch ??
      Number(
        (
          biometricMatchPercent /
          100
        ).toFixed(
          6
        )
      );


    const timestamp =
      now();


    return (
      updateCase(
        caseId,
        (
          latest
        ) => ({
          verification: {
            ...(
              typeof latest.verification ===
              "object"
                ? latest.verification
                : {}
            ),

            status:
              "PASSED",

            score,

            biometricMatch,

            biometricMatchPercent,

            identityMappingValid:
              result.identityMappingValid ??
              true,

            originalConflictResolved:
              result.originalConflictResolved ??
              true,

            secondaryConflict:
              result.secondaryConflict ??
              false,

            rollbackRequired:
              false,

            verifiedAt:
              timestamp,

            simulatedDemoResult:
              true,
          },

          workflowStatus:
            "VERIFIED_CLOSED",

          stage:
            "VERIFIED_CLOSED",

          status:
            "VERIFIED_CLOSED",

          finalStatus:
            "VERIFIED_CLOSED",

          active:
            false,

          closed:
            true,

          completed:
            true,

          closedAt:
            timestamp,

          masterModified:
            false,

          originalBiometricDatasetModified:
            false,

          audit:
            appendAuditEvent(
              latest,
              {
                type:
                  "POST_CORRECTION_VERIFICATION_PASSED",

                title: {
                  en:
                    "Post-correction verification passed",

                  ar:
                    "نجح التحقق بعد التصحيح",
                },

                description: {
                  en:
                    "The corrected relationship was verified successfully. The case was removed from the active queue and transferred to Reports & Audit history.",

                  ar:
                    "تم التحقق من العلاقة المصححة بنجاح، وأزيلت الحالة من قائمة الحالات النشطة وانتقلت إلى التقارير والسجل.",
                },

                actor:
                  result.actor ||
                  "Demo Verification Agent",
              }
            ),
        })
      )
    );
  }


  return (
    updateCase(
      caseId,
      (
        latest
      ) => ({
        verification: {
          ...(
            typeof latest.verification ===
            "object"
              ? latest.verification
              : {}
          ),

          status:
            "FAILED",

          score:
            result.score ??
            0,

          identityMappingValid:
            result.identityMappingValid ??
            false,

          originalConflictResolved:
            result.originalConflictResolved ??
            false,

          secondaryConflict:
            result.secondaryConflict ??
            true,

          rollbackRequired:
            result.rollbackRequired ??
            true,

          verifiedAt:
            now(),

          simulatedDemoResult:
            true,
        },

        workflowStatus:
          "VERIFICATION_FAILED",

        stage:
          "VERIFICATION_FAILED",

        status:
          "VERIFICATION_FAILED",

        finalStatus:
          "VERIFICATION_FAILED",

        active:
          true,

        closed:
          false,

        completed:
          false,

        closedAt:
          null,

        audit:
          appendAuditEvent(
            latest,
            {
              type:
                "POST_CORRECTION_VERIFICATION_FAILED",

              title: {
                en:
                  "Post-correction verification failed",

                ar:
                  "فشل التحقق بعد التصحيح",
              },

              description: {
                en:
                  "Case closure was blocked and the case remains active for exception handling.",

                ar:
                  "تم منع إغلاق الحالة وتظل الحالة نشطة لمعالجة الاستثناء.",
              },

              actor:
                result.actor ||
                "Demo Verification Agent",
            }
          ),
      })
    )
  );
}


/* =========================================================
   MANUAL CLOSE

   Safety rule:
   A case cannot be manually closed unless verification
   has PASSED.
   ========================================================= */

export function closeVerifiedCase(
  caseId
) {
  const current =
    getCaseById(
      caseId
    );


  if (
    !current
  ) {
    return null;
  }


  if (
    getVerificationStatus(
      current
    ) !==
    "PASSED"
  ) {
    throw new Error(
      "A case cannot close before verification passes."
    );
  }


  const timestamp =
    now();


  return (
    updateCase(
      caseId,
      {
        workflowStatus:
          "VERIFIED_CLOSED",

        stage:
          "VERIFIED_CLOSED",

        status:
          "VERIFIED_CLOSED",

        finalStatus:
          "VERIFIED_CLOSED",

        active:
          false,

        closed:
          true,

        completed:
          true,

        closedAt:
          timestamp,
      }
    )
  );
}


/* =========================================================
   SET ALL CASES

   Intended for synthetic imports / demo maintenance.
   ========================================================= */

export function setCases(
  cases
) {
  if (
    !Array.isArray(
      cases
    )
  ) {
    return memoryState;
  }


  hydrate();


  const timestamp =
    now();


  const normalized =
    cases
      .map(
        (
          item
        ) =>
          normalizeCase({
            ...item,

            updatedAt:
              item?.updatedAt ||
              timestamp,
          })
      )
      .filter(
        Boolean
      );


  return (
    saveState({
      ...memoryState,

      cases:
        normalized,
    })
  );
}


/* =========================================================
   CLEAR

   Leaves the store intentionally empty.

   It will NOT silently re-seed until resetCaseStore()
   is called.
   ========================================================= */

export function clearCaseStore() {
  return (
    saveState({
      version:
        STORE_VERSION,

      initialized:
        true,

      cases:
        [],
    })
  );
}


/* =========================================================
   RESET

   Restores the complete validated baseline:
   52 active + 1 closed.

   Optional seed cases can override matching IDs.
   ========================================================= */

export function resetCaseStore(
  seedCases = []
) {
  hydrated =
    true;


  memoryState = {
    version:
      STORE_VERSION,

    initialized:
      false,

    cases:
      [],

    updatedAt:
      null,
  };


  if (
    isBrowser()
  ) {
    try {
      window.localStorage.removeItem(
        STORAGE_KEY
      );


      LEGACY_STORAGE_KEYS.forEach(
        (
          key
        ) => {
          window.localStorage.removeItem(
            key
          );
        }
      );

    } catch {
      /* no-op */
    }
  }


  return (
    initializeCaseStore(
      seedCases
    )
  );
}


/* =========================================================
   RESET STANDARD DEMO
   ========================================================= */

export function resetDemoCaseStore() {
  return (
    resetCaseStore()
  );
}


/* =========================================================
   SUBSCRIBE
   ========================================================= */

export function subscribeToCaseStore(
  callback
) {
  if (
    !isBrowser()
  ) {
    return () => {};
  }


  hydrate();


  const handleLocalChange =
    () => {
      callback();
    };


  const handleStorageChange =
    (
      event
    ) => {

      if (
        event.key !==
        STORAGE_KEY
      ) {
        return;
      }


      if (
        event.newValue
      ) {
        try {
          memoryState =
            normalizeState(
              JSON.parse(
                event.newValue
              )
            );
        } catch {
          memoryState =
            readStorage();
        }
      } else {
        memoryState = {
          version:
            STORE_VERSION,

          initialized:
            false,

          cases:
            [],

          updatedAt:
            null,
        };
      }


      hydrated =
        true;


      callback();
    };


  window.addEventListener(
    STORE_EVENT,
    handleLocalChange
  );


  window.addEventListener(
    "storage",
    handleStorageChange
  );


  return () => {

    window.removeEventListener(
      STORE_EVENT,
      handleLocalChange
    );


    window.removeEventListener(
      "storage",
      handleStorageChange
    );

  };
}


/* =========================================================
   REACT HOOK
   ========================================================= */

function getSnapshot() {
  hydrate();

  return memoryState;
}


function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}


export function useCaseStore() {
  return (
    useSyncExternalStore(
      subscribeToCaseStore,
      getSnapshot,
      getServerSnapshot
    )
  );
}


/* =========================================================
   STORE INFO
   ========================================================= */

export const CASE_STORE_INFO = {
  version:
    STORE_VERSION,

  storageKey:
    STORAGE_KEY,

  persistence:
    "browser-local",

  syntheticDemoOnly:
    true,

  validatedTotalCases:
    53,

  baselineActiveCases:
    52,

  baselineClosedCases:
    1,

  closedCasesDestination:
    "REPORTS_AND_AUDIT",

  identityNamePolicy:
    "FIRST_NAME_SECOND_NAME_ONLY",

  thirdNameAllowed:
    false,

  familyNameAllowed:
    false,

  tribeNameAllowed:
    false,
};