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
          name="email"
          type="email"
          placeholder="Entrez votre adresse mail"
          className="w-full"
          classNameContainer="w-full"
        />
        <Input
          name="password"
          type="password"
          placeholder="Entrez votre mot de passe"
          className="w-full"
          classNameContainer="w-full"
        />
      </main>
    </>
  );
};

export default LoginPage;
