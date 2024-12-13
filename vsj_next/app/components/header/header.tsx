// components/ui/header.tsx
"use client";

import React from "react";
import Logo from "../ui/logo";
import ThemeToggle from "./ui/theme-toggle";
import LanguageSwitcher from "./ui/language-switcher";
import { useLanguage } from "./ui/context/language-provider";
import H1 from "@/app/components/ui/texts/h1";
import clsx from "clsx";
import Profil from "../profil/profil";

const Header = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-row w-full h-16 items-center justify-between px-8">
      <div>
        <H1 className="dark:text-white">
          {language === "en" ? "Welcome, Erwan" : "Bienvenue, Erwan"}
        </H1>
        <div
          className={clsx("bg-primary rounded-full h-1 w-22 mr-0", {
            "ml-[62%]": language === "en",
            "ml-[64%]": language === "fr",
          })}
        ></div>
      </div>
      <div>
        <Logo placement="center" />
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <LanguageSwitcher />
        <Profil size={50} />
      </div>
    </div>
  );
};

export default Header;
