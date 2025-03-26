"use client";

import React, { useState } from "react";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

interface SignupPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
  signupEmail: string;
  setSignupEmail: React.Dispatch<React.SetStateAction<string>>;
  signupPassword: string;
  setSignupPassword: React.Dispatch<React.SetStateAction<string>>;
  signupConfirmPassword: string;
  setSignupConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onSignup: () => void;
  isLoading: boolean;
}

const SignupPage = ({
  handleToggle,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  signupConfirmPassword,
  setSignupConfirmPassword,
  onSignup,
  isLoading,
}: SignupPageProps) => {
  const { language } = useLanguage();

  return (
    <main className="flex flex-col items-center gap-6">
      <Input
        label={language === "en" ? "Email" : "Adresse mail"}
        name="email"
        type="email"
        placeholder={
          language === "en"
            ? "Enter your email address"
            : "Entrez votre adresse mail"
        }
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        label={language === "en" ? "Password" : "Mot de passe"}
        name="password"
        type="password"
        placeholder={
          language === "en"
            ? "Enter your password"
            : "Entrez votre mot de passe"
        }
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
        autoComplete="new-password"
      />
      <Input
        label={
          language === "en" ? "Confirm Password" : "Confirmer le mot de passe"
        }
        name="confirmPassword"
        type="password"
        placeholder={
          language === "en"
            ? "Confirm your password"
            : "Confirmez votre mot de passe"
        }
        value={signupConfirmPassword}
        onChange={(e) => setSignupConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />

      <Button
        variant="primary"
        type="button"
        onClick={onSignup}
        disabled={isLoading}
      >
        {isLoading
          ? language === "en"
            ? "Loading..."
            : "Chargement..."
          : language === "en"
          ? "Sign Up"
          : "S'inscrire"}
      </Button>
    </main>
  );
};

export default SignupPage;
