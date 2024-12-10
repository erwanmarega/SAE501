// contexts/LanguageContext.tsx
"use client";
import React, { createContext, useState, ReactNode, FC } from "react";
import { useContext } from "react";

type Language = "en" | "fr";

type LanguageContextType = {
  currentLocale: Language;
  setCurrentLocale: (locale: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLocale: "en",
  setCurrentLocale: () => {},
});

type Props = {
  children: ReactNode;
};

export const LanguageProvider: FC<Props> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ currentLocale, setCurrentLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
