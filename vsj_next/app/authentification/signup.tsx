"use client";

import React from "react";
import Image from "next/image";
import Input from "@/app/components/ui/input";

interface SignupPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
}

const SignupPage = ({ handleToggle }: SignupPageProps) => {
  return (
    <>
      <main className="flex flex-col items-center gap-6 justify-start">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Entrez votre adresse mail"
          className="w-full"
          classNameContainer="w-full"
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Entrez votre mot de passe"
          className="w-full"
          classNameContainer="w-full"
        />
        <Input
          label="Confirmer mot de passe"
          name="password"
          type="password"
          placeholder="Confirmez votre mot de passe"
          className="w-full"
          classNameContainer="w-full"
        />
      </main>
    </>
  );
};

export default SignupPage;
