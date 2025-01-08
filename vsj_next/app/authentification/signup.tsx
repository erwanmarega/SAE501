"use client";

import React, { useState } from "react";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Une erreur est survenue.");
      } else {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        router.push("/signup"); 
      }
    } catch (err) {
      setError("Une erreur réseau est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center gap-6">

      {error && <p className="text-red-500">{error}</p>}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Entrez votre adresse mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        label="Mot de passe"
        name="password"
        type="password"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <Input
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        placeholder="Confirmez votre mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />

      <Button
        variant="primary"
        type="button"
        onClick={onSignup}
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "S'inscrire"}
      </Button>
    </main>
  );
};

export default SignupPage;
