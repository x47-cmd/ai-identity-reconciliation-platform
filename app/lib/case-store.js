"use client";

import {
  useSyncExternalStore,
} from "react";


/* =========================================================
   CASE STORE

   Browser-local persistence for the synthetic demo only.

   This must NOT be used to store real biometric data,
   real PII or production-sensitive information.
   ========================================================= */

const STORAGE_KEY =
  "ai-biometric-case-store-v1";

const STORE_EVENT =
  "ai-biometric-case-store-change";

const STORE_VERSION = 1;


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


  const id =
    normalizeId(
      caseData.id
    );


  if (!id) {
    return null;
  }


  return {
    ...caseData,

    id,

    createdAt:
      caseData.createdAt ||
      now(),

    updatedAt:
      caseData.updatedAt ||
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


    return normalizeState(
      JSON.parse(raw)
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


  const newCase = {
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
  };


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


  const updated = {
    ...current,
    ...patch,

    id:
      current.id,

    createdAt:
      current.createdAt,

    updatedAt:
      now(),
  };


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
};