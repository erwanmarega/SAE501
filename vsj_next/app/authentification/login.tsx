"use client";

import React, { useState } from "react";
import Input from "@/app/components/ui/input";
import { useRouter } from "next/navigation"; 

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  

  const handleLogin = async () => {
    try {
      const response = await fetch("/swimmer/login", {
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
        setError(data.message); 
      }
    } catch (error) {
      setError("Une erreur est survenue");
    }
  };

  return (
    <main className="flex flex-col items-center gap-6">
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
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
};

export default LoginPage;
