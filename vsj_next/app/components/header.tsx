"use client";

import React, { useContext } from "react";
import Logo from "./ui/logo";
import ThemeToggle from "./ui/theme-toggle";
import LanguageSwitcher from "./ui/language-switcher";
import { LanguageContext } from "../contexts/language-context";

const Header = () => {
  const { currentLocale, setCurrentLocale } = useContext(LanguageContext);

  const handleLanguageChange = (locale: "en" | "fr") => {
    setCurrentLocale(locale);
  };

  return (
    <div className="flex flex-row w-full h-16 items-center">
      <div>
        <h1>
          {currentLocale === "en" ? "Welcome, Erwan" : "Bienvenue, Erwan"}
        </h1>
      </div>
      <div>
        <Logo placement="center" />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSwitcher
          currentLocale={currentLocale}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
};

export default Header;
