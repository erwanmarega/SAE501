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
import axios, { AxiosResponse } from "axios";
import ThemeToggle from "../components/header/ui/theme-toggle";
import LanguageSwitcher from "../components/header/ui/language-switcher";

import BackgroundIMG_01 from "@/public/assets/img/login/backgroundIMG_01.png";

interface AuthResponse {
  token?: string; 
  message?: string; 
}

const AuthentificationPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [toggleValue, setToggleValue] = useState<"Connexion" | "Inscription">("Connexion");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleAuth = (active: "Connexion" | "Inscription") => {
    setToggleValue(active);
    setLoginError(null);
    setSignupError(null);
    setSignupSuccess(false);
  };

  const onSignup = async (): Promise<boolean> => {
    console.log("onSignup appelé");

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
      console.log("Données d'inscription :", data);

      const response: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:8000/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponse inscription :", response);

      if (response.status === 201) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
          console.log("Jeton stocké après inscription :", token);
        } else {
          console.warn("Aucun jeton trouvé dans la réponse d'inscription");
        }
        setSignupSuccess(true);
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Erreur inscription :", err);
      if (err.response) {
        const errorData = err.response.data as AuthResponse;
        if (err.response.status === 409) {
          setSignupError("Il y a déjà un compte avec cette adresse mail.");
        } else {
          setSignupError(
            `Erreur ${err.response.status} : ${errorData.message || "Réessayez."}`
          );
        }
      } else {
        setSignupError("Une erreur réseau est survenue. Réessayez.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoginError(null);

    if (!loginEmail || !loginPassword) {
      setLoginError("Veuillez remplir tous les champs.");
      return;
    }

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

      const data: AuthResponse = await response.json();
      console.log("Réponse connexion :", data);

      if (response.ok) {
        const token = data.token;
        if (token) {
          localStorage.setItem("authToken", token);
          console.log("Jeton stocké après connexion :", token);
        } else {
          console.warn("Aucun jeton trouvé dans la réponse de connexion");
        }
        router.push("/");
      } else {
        setLoginError(data.message || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la connexion :", error);
      setLoginError("Une erreur réseau est survenue.");
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
        loginError={loginError}
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
              handleToggleAuth(position === "left" ? "Connexion" : "Inscription")
            }
            className="text-gray-900 dark:text-gray-900"
          />
        </header>

        {renderAuthPage()}

        <footer className="flex flex-col items-center gap-4">
          {toggleValue === "Connexion" ? (
            <>
              <Button variant="outline" icon={GoogleIcon}>
                {language === "fr" ? "Se connecter avec Google" : "Login with Google"}
              </Button>
              <p className="font-mona font-light text-xs">
                {language === "fr" ? "Vous n'avez pas de compte ?" : "Don't have an account?"}{" "}
                <span
                  className="font-bold cursor-pointer text-blue-500 dark:text-blue-500"
                  onClick={() => handleToggleAuth("Inscription")}
                >
                  {language === "fr" ? "S'inscrire" : "Sign Up"}
                </span>
              </p>
            </>
          ) : (
            <>
              <Button variant="outline" icon={GoogleIcon}>
                {language === "fr" ? "S'inscrire avec Google" : "Sign Up with Google"}
              </Button>
              <p className="font-mona font-light text-xs">
                {language === "fr" ? "Vous avez déjà un compte ?" : "Already have an account?"}{" "}
                <span
                  className="font-bold cursor-pointer text-blue-500 dark:text-blue-500"
                  onClick={() => handleToggleAuth("Connexion")}
                >
                  {language === "fr" ? "Se connecter" : "Login"}
                </span>
              </p>
            </>
          )}
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