"use client";

import {
  useSyncExternalStore,
} from "react";


/* =========================================================
   CASE STORE

   Browser-local persistence for the synthetic demo only.

   This must NOT be used to store real biometric data,
   real PII or production-sensitive information.

   DEMO IDENTITY NAME POLICY:
   - First Name + Second Name only
   - No third name
   - No family name
   - No surname
   - No tribe name
   ========================================================= */

const STORAGE_KEY =
  "ai-biometric-case-store-v2";

const LEGACY_STORAGE_KEYS = [
  "ai-biometric-case-store-v1",
];

const STORE_EVENT =
  "ai-biometric-case-store-change";

const STORE_VERSION = 2;


/* =========================================================
   EMPTY STATE
   ========================================================= */

const SERVER_SNAPSHOT = Object.freeze({
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
   HELPERS
   ========================================================= */

function isBrowser() {
  return (
    typeof window !==
    "undefined"
  );
}


function now() {
  return new Date().toISOString();
}


function normalizeId(
  value
) {
  return String(
    value || ""
  ).trim();
}


/* =========================================================
   SYNTHETIC IDENTITY NAME POLICY

   Every synthetic identity displayed or persisted through
   the case store is restricted to exactly:

   First Name + Second Name

   Examples:

   "Salem Mohammed Al Kaabi"
   becomes
   "Salem Mohammed"

   "سالم محمد الكعبي"
   becomes
   "سالم محمد"

   This applies only to synthetic identity-name fields.
   Workflow actor names such as:
   "Demo Monitoring Officer"
   are intentionally not modified.
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
    return parts.join(
      " "
    );
  }


  return parts
    .slice(
      0,
      2
    )
    .join(
      " "
    );
}


function normalizeLocalizedIdentityName(
  value
) {
  if (
    typeof value ===
    "string"
  ) {
    return normalizeTwoPartIdentityName(
      value
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
   CASE IDENTITY NAME NORMALIZATION

   Only identity-related fields are normalized.

   Human workflow actors such as officer and manager names
   are not treated as identity records.
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
    "name",
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
     Execution state can contain Before / After
     identity display names.
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
   NORMALIZE CASE
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


  if (!id) {
    return null;
  }


  return {
    ...protectedCase,

    id,

    createdAt:
      protectedCase.createdAt ||
      now(),

    updatedAt:
      protectedCase.updatedAt ||
      now(),
  };
}


function normalizeState(
  value
) {
  const rawCases =
    Array.isArray(
      value?.cases
    )
      ? value.cases
      : [];


  const cases =
    rawCases
      .map(
        normalizeCase
      )
      .filter(
        Boolean
      );


  return {
    version:
      STORE_VERSION,

    initialized:
      Boolean(
        value?.initialized
        ||
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

   v1 may contain previously seeded three-part synthetic
   identity names.

   Because this is synthetic demo data only, the legacy
   browser-local cache is removed when v2 is first used.

   Fresh seed data will then use the current identity-name
   policy.
   ========================================================= */

function cleanupLegacyStorage() {
  if (!isBrowser()) {
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
           Demo remains operational using
           in-memory state if storage access fails.
        */
      }

    }
  );
}


/* =========================================================
   STORAGE READ
   ========================================================= */

function readStorage() {
  if (!isBrowser()) {
    return memoryState;
  }


  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );


    if (!raw) {
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


    return normalizeState(
      parsed
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


  /*
     Remove old synthetic demo storage containing
     the previous identity-name format.
  */

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
  if (!isBrowser()) {
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


  if (isBrowser()) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          normalized
        )
      );
    } catch {
      /*
         The in-memory state still works
         if browser storage is unavailable.
      */
    }
  }


  notify();


  return memoryState;
}


/* =========================================================
   CASE ID
   ========================================================= */

function generateCaseId() {
  hydrate();


  const year =
    new Date().getFullYear();


  let highest =
    0;


  memoryState.cases.forEach(
    (item) => {

      const match =
        String(
          item.id || ""
        ).match(
          /^CASE-\d{4}-(\d+)$/
        );


      if (!match) {
        return;
      }


      const number =
        Number(
          match[1]
        );


      if (
        Number.isFinite(
          number
        )
        &&
        number > highest
      ) {
        highest =
          number;
      }
    }
  );


  const next =
    highest + 1;


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

   Seed cases are written only once.

   If the user later removes all cases,
   the store will NOT silently re-seed them.

   Seed identity names are normalized to the
   two-part synthetic identity policy before storage.
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


  const cases =
    Array.isArray(
      seedCases
    )
      ? seedCases
          .map(
            (
              item
            ) => {

              if (
                !item ||
                !item.id
              ) {
                return null;
              }


              return normalizeCase({
                ...item,

                createdAt:
                  item.createdAt ||
                  timestamp,

                updatedAt:
                  item.updatedAt ||
                  timestamp,
              });
            }
          )
          .filter(
            Boolean
          )
      : [];


  return saveState({
    version:
      STORE_VERSION,

    initialized:
      true,

    cases,
  });
}


/* =========================================================
   GET STATE
   ========================================================= */

export function getCaseStoreState() {
  hydrate();

  return memoryState;
}


/* =========================================================
   GET CASES
   ========================================================= */

export function getCases() {
  hydrate();

  return [
    ...memoryState.cases,
  ];
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
      (item) =>
        item.id === id
    )
    ||
    null
  );
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
    )
    ||
    generateCaseId();


  const duplicate =
    memoryState.cases.some(
      (item) =>
        item.id === id
    );


  if (duplicate) {
    throw new Error(
      `Case already exists: ${id}`
    );
  }


  const timestamp =
    now();


  const newCase =
    normalizeCase({
      status:
        "AI_INVESTIGATED",

      stage:
        "CASES",

      priority:
        "MEDIUM",

      officer:
        "PENDING",

      manager:
        "WAITING",

      correction:
        "NOT_AUTHORIZED",

      verification:
        "NOT_STARTED",

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
      (item) =>
        item.id === id
    );


  if (
    index === -1
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


  cases[index] =
    updated;


  saveState({
    ...memoryState,

    cases,
  });


  return updated;
}


/* =========================================================
   UPSERT CASE
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


  if (!id) {
    return addCase(
      caseData
    );
  }


  const existing =
    getCaseById(
      id
    );


  if (!existing) {
    return addCase(
      caseData
    );
  }


  return updateCase(
    id,
    caseData
  );
}


/* =========================================================
   UPDATE WORKFLOW

   Used when a case moves between:
   investigation → officer → manager →
   correction → verification → closed
   ========================================================= */

export function updateCaseWorkflow(
  caseId,
  workflow = {}
) {
  return updateCase(
    caseId,
    (
      current
    ) => ({
      ...current,

      ...workflow,
    })
  );
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


  return updateCase(
    caseId,
    (
      current
    ) => ({
      audit: [
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
      ],
    })
  );
}


/* =========================================================
   SET ALL CASES

   Useful when importing a synthetic case dataset.

   Identity names are normalized before they are persisted.
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


  return saveState({
    ...memoryState,

    cases:
      normalized,
  });
}


/* =========================================================
   CLEAR / RESET

   Demo utilities only.
   ========================================================= */

export function clearCaseStore() {
  return saveState({
    version:
      STORE_VERSION,

    initialized:
      true,

    cases:
      [],
  });
}


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


  if (isBrowser()) {
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


  return initializeCaseStore(
    seedCases
  );
}


/* =========================================================
   SUBSCRIBE

   Supports:
   - movement between pages
   - updates in the same browser tab
   - updates in another browser tab
   ========================================================= */

export function subscribeToCaseStore(
  callback
) {
  if (!isBrowser()) {
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
  return useSyncExternalStore(
    subscribeToCaseStore,
    getSnapshot,
    getServerSnapshot
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

  identityNamePolicy:
    "FIRST_NAME_SECOND_NAME_ONLY",

  thirdNameAllowed:
    false,

  familyNameAllowed:
    false,

  tribeNameAllowed:
    false,
};