"use client";

import React from "react";
import Input from "@/app/components/ui/input";

interface LoginPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
  loginEmail: string;
  setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
  loginPassword: string;
  setLoginPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPage = ({
  handleToggle,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}: LoginPageProps) => {
  return (
    <main className="flex flex-col items-center gap-6 ">
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Entrez votre adresse mail"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <Input
        label="Mot de passe"
        name="password"
        type="password"
        placeholder="Entrez votre mot de passe"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
    </main>
  );
};

export default LoginPage;
