"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import translations from "../lib/translations";


/* =========================================================
   CONSTANTS
   ========================================================= */

const STORAGE_KEY =
  "identity-ai-language";

const DEFAULT_LANGUAGE =
  "en";

const SUPPORTED_LANGUAGES = [
  "en",
  "ar",
];


/* =========================================================
   CONTEXT
   ========================================================= */

const LanguageContext =
  createContext(null);


/* =========================================================
   HELPERS
   ========================================================= */

function isSupportedLanguage(
  language
) {
  return SUPPORTED_LANGUAGES.includes(
    language
  );
}


function getValue(
  object,
  path
) {
  if (
    !object ||
    !path ||
    typeof path !== "string"
  ) {
    return undefined;
  }

  return path
    .split(".")
    .reduce(
      (current, key) =>
        current?.[key],
      object
    );
}


function applyDocumentLanguage(
  language
) {
  if (
    typeof document ===
    "undefined"
  ) {
    return;
  }

  const isArabic =
    language === "ar";

  document.documentElement.lang =
    language;

  document.documentElement.dir =
    isArabic
      ? "rtl"
      : "ltr";
}


function readStoredLanguage() {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const savedLanguage =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    return isSupportedLanguage(
      savedLanguage
    )
      ? savedLanguage
      : null;
  } catch {
    return null;
  }
}


function saveLanguage(
  language
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      language
    );
  } catch {
    // The interface must continue working
    // even if browser storage is unavailable.
  }
}


/* =========================================================
   PROVIDER
   ========================================================= */

export function LanguageProvider({
  children,
}) {
  const [
    language,
    setLanguage,
  ] = useState(
    DEFAULT_LANGUAGE
  );

  const [
    initialized,
    setInitialized,
  ] = useState(false);


  /* -------------------------------------------------------
     LOAD SAVED LANGUAGE
     ------------------------------------------------------- */

  useEffect(() => {
    const savedLanguage =
      readStoredLanguage();

    const initialLanguage =
      savedLanguage ||
      DEFAULT_LANGUAGE;

    applyDocumentLanguage(
      initialLanguage
    );

    setLanguage(
      initialLanguage
    );

    setInitialized(true);
  }, []);


  /* -------------------------------------------------------
     APPLY LANGUAGE CHANGES
     ------------------------------------------------------- */

  useEffect(() => {
    if (!initialized) {
      return;
    }

    applyDocumentLanguage(
      language
    );

    saveLanguage(
      language
    );
  }, [
    language,
    initialized,
  ]);


  /* -------------------------------------------------------
     CHANGE LANGUAGE
     ------------------------------------------------------- */

  const changeLanguage =
    useCallback(
      (nextLanguage) => {
        if (
          !isSupportedLanguage(
            nextLanguage
          )
        ) {
          return;
        }

        setLanguage(
          nextLanguage
        );
      },
      []
    );


  /* -------------------------------------------------------
     TOGGLE LANGUAGE
     ------------------------------------------------------- */

  const toggleLanguage =
    useCallback(() => {
      setLanguage(
        (current) =>
          current === "en"
            ? "ar"
            : "en"
      );
    }, []);


  /* -------------------------------------------------------
     TRANSLATION FUNCTION
     ------------------------------------------------------- */

  const t =
    useCallback(
      (
        key,
        fallback = key
      ) => {
        const value =
          getValue(
            translations?.[
              language
            ],
            key
          );

        return (
          value ??
          fallback
        );
      },
      [language]
    );


  /* -------------------------------------------------------
     CONTEXT VALUE
     ------------------------------------------------------- */

  const value =
    useMemo(
      () => ({
        language,

        isArabic:
          language === "ar",

        direction:
          language === "ar"
            ? "rtl"
            : "ltr",

        changeLanguage,

        toggleLanguage,

        t,
      }),
      [
        language,
        changeLanguage,
        toggleLanguage,
        t,
      ]
    );


  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}


/* =========================================================
   HOOK
   ========================================================= */

export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}