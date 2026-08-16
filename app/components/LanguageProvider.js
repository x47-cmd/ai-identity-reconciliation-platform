"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import translations from "../lib/translations";


const LanguageContext =
  createContext(null);


function getValue(
  object,
  path
) {
  return path
    .split(".")
    .reduce(
      (current, key) =>
        current?.[key],
      object
    );
}


export function LanguageProvider({
  children,
}) {
  const [
    language,
    setLanguage,
  ] = useState("en");


  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "identity-ai-language"
      );

    if (
      savedLanguage === "ar"
      ||
      savedLanguage === "en"
    ) {
      setLanguage(
        savedLanguage
      );
    }
  }, []);


  useEffect(() => {
    document.documentElement.lang =
      language;

    document.documentElement.dir =
      language === "ar"
        ? "rtl"
        : "ltr";

    localStorage.setItem(
      "identity-ai-language",
      language
    );
  }, [language]);


  function changeLanguage(
    nextLanguage
  ) {
    if (
      nextLanguage !== "en"
      &&
      nextLanguage !== "ar"
    ) {
      return;
    }

    setLanguage(
      nextLanguage
    );
  }


  function toggleLanguage() {
    setLanguage(
      (current) =>
        current === "en"
          ? "ar"
          : "en"
    );
  }


  function t(
    key,
    fallback = key
  ) {
    const value =
      getValue(
        translations[language],
        key
      );

    return (
      value
      ??
      fallback
    );
  }


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
      [language]
    );


  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}


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