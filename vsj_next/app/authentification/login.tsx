"use client";

import React from "react";
import Image from "next/image";
import Input from "@/app/components/ui/input";

interface LoginPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
}

const LoginPage = ({ handleToggle }: LoginPageProps) => {
  return (
    <>
      <main className="flex flex-col items-center gap-6 ">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Entrez votre adresse mail"
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Entrez votre mot de passe"
        />
      </main>
    </>
  );
};

export default LoginPage;
