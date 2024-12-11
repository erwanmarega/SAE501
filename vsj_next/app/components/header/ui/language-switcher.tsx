"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./context/language-provider";
import Image from "next/image";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [showLanguagePopup, setLangugagePopup] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (select: string) => {
    setLanguage(select === "en" ? "fr" : "en");
  };

  const handleLanguagePopup = () => {
    setLangugagePopup((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setLangugagePopup(false);
      }
    };

    if (showLanguagePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguagePopup]);

  return (
    <div className="gap-4 p-2 rounded-3xl relative flex" ref={popupRef}>
      <Image
        src={"/assets/icons/globeLanguage.svg"}
        alt="Changez de langue"
        width={35}
        height={35}
        onClick={handleLanguagePopup}
        className="cursor-pointer"
      />
      {language === "fr" ? (
        <Image
          src="/assets/icons/frenchFlagLove.svg"
          alt="Drapeau français"
          width={15}
          height={15}
          className="absolute top-8 right-1"
        />
      ) : (
        <Image
          src="/assets/icons/britishFlag.svg"
          alt="Drapeau anglais"
          width={15}
          height={15}
          className="absolute top-8 right-1"
        />
      )}
      {showLanguagePopup && (
        <div className="bg-white rounded-lg  w-24 flex flex-col items-center justify-center absolute top-14 -right-6 shadow-md border-[#EEEFF3] border-2">
          <div
            className={`flex gap-2 cursor-pointer hover:bg-slate-100 w-full justify-center p-1 rounded-t-md ${
              language === "fr" ? "bg-slate-50" : ""
            }`}
            onClick={() => {
              toggleLanguage("en");
              handleLanguagePopup();
            }}
          >
            <Image
              src="/assets/icons/frenchFlagLove.svg"
              alt="Drapeau anglais"
              width={15}
              height={15}
            />
            <p>{language === "fr" ? "Français" : "French"}</p>
          </div>
          <div className="h-[1px] bg-[#EEEFF3] w-full"></div>
          <div
            className={`flex gap-2 cursor-pointer hover:bg-slate-100 w-full justify-center py-1 rounded-b-md ${
              language === "en" ? "bg-slate-50" : ""
            }`}
            onClick={() => {
              toggleLanguage("fr");
              handleLanguagePopup();
            }}
          >
            <Image
              src="/assets/icons/britishFlag.svg"
              alt="Drapeau anglais"
              width={15}
              height={15}
            />
            <p>{language === "fr" ? "Anglais" : "English"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
