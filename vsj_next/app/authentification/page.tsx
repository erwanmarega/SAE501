"use client";

import React, { useState } from "react";
import Logo from "../components/ui/logo";
import ToggleSlide from "../components/ui/toggle-slide";
import Image from "next/image";
import LoginPage from "./login";
import SignupPage from "./signup";
import Button from "../components/ui/button";
import GoogleIcon from "@/public/assets/icons/google_icon.svg";
import Message from "./ui/message";
import LanguageSwitcher from "../components/header/ui/language-switcher";
import ThemeToggle from "./ui/theme-toggle";
import { useLanguage } from "../components/header/ui/context/language-provider";

// Images
import BackgroundIMG_01 from "@/public/assets/img/backgroundIMG_01.png";

const AuthentificationPage = () => {
  const { language } = useLanguage(); // Récupération de la langue
  const [toggleValue, setToggleValue] = useState<"Connexion" | "Inscription">(
    "Connexion"
  );

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
      <section className="col-start-1 col-end-3 md:col-end-1 flex flex-col items-left m-auto gap-10 justify-start h-[500px]">
        <header className="flex flex-col gap-4 h-[100px]">
          <div>
            <h3 className="font-outfit font-bold text-2xl">
              {toggleValue === "Connexion"
                ? language === "fr"
                  ? "Se connecter"
                  : "Login"
                : language === "fr"
                ? "S'inscrire"
                : "Sign Up"}
            </h3>
            <h5 className="font-outfit font-light text-lg text-[#475467]">
              {language === "fr"
                ? "Bienvenue chez VSJ natation !"
                : "Welcome to VSJ Swimming!"}
            </h5>
          </div>
          <ToggleSlide
            leftLabel={language === "fr" ? "Connexion" : "Login"}
            rightLabel={language === "fr" ? "Inscription" : "Sign Up"}
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
                {language === "fr" ? "Se connecter" : "Login"}
              </Button>
              <Button variant="outline" icon={GoogleIcon}>
                {language === "fr"
                  ? "Se connecter avec Google"
                  : "Login with Google"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary">
                {language === "fr" ? "S'inscrire" : "Sign Up"}
              </Button>
              <Button variant="outline" icon={GoogleIcon}>
                {language === "fr"
                  ? "S'inscrire avec Google"
                  : "Sign Up with Google"}
              </Button>
            </>
          )}

          <p className="font-mona font-light text-xs">
            {language === "fr"
              ? "Vous n'avez pas de compte ?"
              : "Don't have an account?"}{" "}
            <span
              className="font-bold cursor-pointer text-[#348CFF]"
              onClick={() => handleToggleAuth("Inscription")}
            >
              {language === "fr" ? "S'inscrire" : "Sign Up"}
            </span>
          </p>
        </footer>
      </section>
      <section className="hidden md:flex relative m-3 rounded-xl overflow-hidden">
        <Image
          src={BackgroundIMG_01}
          alt={language === "fr" ? "Image d'un nageur" : "Image of a swimmer"}
          className="h-full w-full object-cover"
        />
        <Message />
      </section>
    </div>
  );
};

export default AuthentificationPage;
