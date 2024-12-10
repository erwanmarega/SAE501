"use client";

import React, { useState } from "react";
import Logo from "../components/ui/logo";
import ToggleSlide from "../components/ui/toggleSlide";
import Image from "next/image";
import LoginPage from "./login";
import SignupPage from "./signup";
import Button from "../components/ui/button";
import GoogleIcon from "@/public/assets/icons/google_icon.svg";
import Message from "./message";
import LanguageSwitcher from "../components/ui/language-switcher";

// Images
import BackgroundIMG_01 from "@/public/assets/img/backgroundIMG_01.png";
import ThemeToggle from "../components/ui/theme-toggle";

const AuthentificationPage = () => {
  const [currentLocale, setCurrentLocale] = useState<"en" | "fr">("en");
  const [toggleValue, setToggleValue] = useState<"Connexion" | "Inscription">(
    "Connexion"
  );

  const handleLanguageChange = (locale: "en" | "fr") => {
    setCurrentLocale(locale); // Change la langue localement
  };

  const handleToggleAuth = (active: "Connexion" | "Inscription") => {
    setToggleValue(active);
  };

  const renderAuthPage = () => {
    return toggleValue === "Connexion" ? (
      <LoginPage handleToggle={handleToggleAuth} />
    ) : (
      <SignupPage handleToggle={handleToggleAuth} />
    );
  };

  return (
    <div className="grid grid-cols-2 h-screen bg-[#FAFAFA] overflow-hidden">
      <Logo placement="left" />
      <LanguageSwitcher
        currentLocale={currentLocale}
        onLanguageChange={handleLanguageChange}
      />
      <ThemeToggle />
      <section className="col-start-1 col-end-3 md:col-end-1 flex flex-col items-left m-auto gap-10 justify-start h-[500]">
        <header className="flex flex-col gap-4 h-[100]">
          <div>
            <h3 className="font-outfit font-bold text-2xl">
              {toggleValue === "Connexion"
                ? currentLocale === "en"
                  ? "Login"
                  : "Se connecter"
                : currentLocale === "en"
                ? "Sign Up"
                : "S'inscrire"}
            </h3>
            <h5 className="font-outfit font-light text-lg text-[#475467]">
              {currentLocale === "en"
                ? "Welcome to VSJ Swimming!"
                : "Bienvenue chez VSJ natation !"}
            </h5>
          </div>
          <ToggleSlide
            leftLabel={currentLocale === "en" ? "Login" : "Connexion"}
            rightLabel={currentLocale === "en" ? "Sign Up" : "Inscription"}
            onChange={(position) =>
              handleToggleAuth(
                position === "left" ? "Connexion" : "Inscription"
              )
            }
          />
        </header>

        {renderAuthPage()}

        <footer className="flex flex-col items-center gap-4">
          {toggleValue === "Connexion" ? (
            <>
              <Button variant="primary">
                {currentLocale === "en" ? "Login" : "Se connecter"}
              </Button>
              <Button variant="outline" icon={GoogleIcon}>
                {currentLocale === "en"
                  ? "Login with Google"
                  : "Se connecter avec Google"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary">
                {currentLocale === "en" ? "Sign Up" : "S'inscrire"}
              </Button>
              <Button variant="outline" icon={GoogleIcon}>
                {currentLocale === "en"
                  ? "Sign Up with Google"
                  : "S'inscrire avec Google"}
              </Button>
            </>
          )}

          <p className="font-mona font-light text-xs">
            {currentLocale === "en"
              ? "Don't have an account?"
              : "Vous n'avez pas de compte ?"}{" "}
            <span
              className="font-bold cursor-pointer text-[#348CFF]"
              onClick={() => handleToggleAuth("Inscription")}
            >
              {currentLocale === "en" ? "Sign Up" : "S'inscrire"}
            </span>
          </p>
        </footer>
      </section>
      <section className="hidden md:flex relative m-3 rounded-xl overflow-hidden">
        <Image
          src={BackgroundIMG_01}
          alt={
            currentLocale === "en" ? "Image of a swimmer" : "Image d'un nageur"
          }
          className="h-full w-full object-cover"
        />
        <Message />
      </section>
    </div>
  );
};

export default AuthentificationPage;
