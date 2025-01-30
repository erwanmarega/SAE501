"use client";

import React, { useState } from "react";
import Logo from "../components/ui/logo";
import ToggleSlide from "./ui/toggle-slide";
import Image from "next/image";
import LoginPage from "./login";
import SignupPage from "./signup";
import Button from "../components/ui/button";
import GoogleIcon from "@/public/assets/icons/google_icon.svg";
import Message from "./ui/message";
import { useLanguage } from "../components/header/ui/context/language-provider";
import { useRouter } from "next/navigation";
import axios from "axios";
import ThemeToggle from "../components/header/ui/theme-toggle";
import LanguageSwitcher from "../components/header/ui/language-switcher";

import BackgroundIMG_01 from "@/public/assets/img/login/backgroundIMG_01.png";

const AuthentificationPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [toggleValue, setToggleValue] = useState<"Connexion" | "Inscription">(
    "Connexion"
  );

  const handleToggleAuth = (active: "Connexion" | "Inscription") => {
    setToggleValue(active);
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (): Promise<boolean> => {
    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupError("Veuillez remplir tous les champs obligatoires.");
      return false;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Les mots de passe ne correspondent pas.");
      return false;
    }

    if (signupPassword.length < 6) {
      setSignupError("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }

    try {
      setSignupError(null);
      setSignupSuccess(false);
      setIsLoading(true);

      const data = { email: signupEmail, password: signupPassword };

      const response = await axios.post("http://localhost:8000/swimmer", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSignupSuccess(true);
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
        return true;
      }
      return false;
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setSignupError("Il y a déjà un compte avec cette adresse mail.");
      } else {
        setSignupError("Vérifiez vos informations ou réessayez.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/swimmer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  const renderAuthPage = () => {
    return toggleValue === "Connexion" ? (
      <LoginPage
        handleToggle={handleToggleAuth}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        handleLogin={handleLogin}
      />
    ) : (
      <SignupPage
        handleToggle={handleToggleAuth}
        signupEmail={signupEmail}
        setSignupEmail={setSignupEmail}
        signupPassword={signupPassword}
        setSignupPassword={setSignupPassword}
        signupConfirmPassword={signupConfirmPassword}
        setSignupConfirmPassword={setSignupConfirmPassword}
        onSignup={onSignup}
        signupError={signupError}
        signupSuccess={signupSuccess}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="grid grid-cols-2 h-screen overflow-hidden relative">
      <Logo placement="left" />
      <div className="flex items-center gap-6 absolute top-0 right-0 p-6 col-start-1 col-end-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
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
            className="text-gray-900 dark:text-gray-900"
          />
        </header>

        {renderAuthPage()}

        <footer className="flex flex-col items-center gap-4">
          {toggleValue === "Connexion" ? (
            <>
              <Button variant="outline" icon={GoogleIcon}>
                {language === "fr"
                  ? "Se connecter avec Google"
                  : "Login with Google"}
              </Button>
            </>
          ) : (
            <>
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
              className="font-bold cursor-pointer text-blue-500 dark:text-blue-500"
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
