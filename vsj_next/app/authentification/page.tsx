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

// Images
import BackgroundIMG_01 from "@/public/assets/img/backgroundIMG_01.png";
import BackgroundIMG_02 from "@/public/assets/img/backgroundIMG_02.jpg";
import BackgroundIMG_03 from "@/public/assets/img/backgroundIMG_03.jpg";

const AuthentificationPage = () => {
  const [toggleValue, setToggleValue] = useState<"Connexion" | "Inscription">(
    "Connexion"
  );

  const handleToggle = (active: "Connexion" | "Inscription") => {
    setToggleValue(active);
  };

  function InscriptionOrConnexion(value: "Connexion" | "Inscription") {
    switch (value) {
      case "Connexion":
        return <LoginPage handleToggle={handleToggle} />;
      case "Inscription":
        return <SignupPage handleToggle={handleToggle} />;
      default:
        return <SignupPage handleToggle={handleToggle} />;
    }
  }

  return (
    <div className="grid grid-cols-2 h-screen bg-[#FAFAFA] overflow-hidden">
      <Logo />
      <section className="col-start-1 col-end-3 md:col-end-1 flex flex-col items-left m-auto gap-10 justify-start h-[500]">
        <header className="flex flex-col gap-4 h-[100]">
          <div>
            <h3 className="font-outfit font-bold text-2xl">
              {toggleValue === "Connexion" ? "Se connecter" : "S'inscrire"}
            </h3>
            <h5 className="font-outfit font-light text-lg text-[#475467]">
              Bienvenue chez VSJ natation !
            </h5>
          </div>
          <ToggleSlide
            leftLabel="Connexion"
            rightLabel="Inscription"
            onChange={(position) =>
              handleToggle(position === "left" ? "Connexion" : "Inscription")
            }
          />
        </header>

        {InscriptionOrConnexion(toggleValue)}

        <footer className="flex flex-col items-center gap-4 ">
          {toggleValue === "Connexion" ? (
            <>
              <Button variant="primary">Se connecter</Button>
              <Button variant="outline" icon={GoogleIcon}>
                Se connecter avec Google
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary">S'inscrire</Button>
              <Button variant="outline" icon={GoogleIcon}>
                S'inscrire avec Google
              </Button>
            </>
          )}

          <p className="font-mona font-light text-xs">
            Vous n'avez pas de compte ?{" "}
            <span
              className="font-bold cursor-pointer text-[#348CFF]"
              onClick={() => handleToggle("Inscription")}
            >
              S'inscrire
            </span>
          </p>
        </footer>
      </section>
      <section className="hidden md:flex relative m-3 rounded-xl overflow-hidden">
        <Image
          src={BackgroundIMG_01}
          alt="Image d'un nageur"
          className="h-full w-full object-cover"
        />
        {/* Superposition floue avec bordures arrondies */}
        <Message />
      </section>
    </div>
  );
};

export default AuthentificationPage;
