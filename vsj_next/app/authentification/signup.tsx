"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/input";

interface SignupPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
  signupEmail: string;
  setSignupEmail: React.Dispatch<React.SetStateAction<string>>;
  signupPassword: string;
  setSignupPassword: React.Dispatch<React.SetStateAction<string>>;
  signupConfirmPassword: string;
  setSignupConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const SignupPage = ({
  handleToggle,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  signupConfirmPassword,
  setSignupConfirmPassword,
}: SignupPageProps) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs
    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!validateEmail(signupEmail)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Optionnel : Vérifiez la force du mot de passe
    if (signupPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      setError(null);
      setSuccess(false);
      setIsLoading(true);

      const data = { email: signupEmail, password: signupPassword };

      const response = await axios.post("http://localhost:8000/swimmer", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        // Redirection vers la page de connexion après 2 secondes
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      // Gestion des erreurs spécifiques
      if (err.response && err.response.status === 409) {
        setError("Il y a déjà un compte avec cette adresse mail.");
      } else {
        setError("Vérifiez vos informations ou réessayez.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 justify-start">
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Inscription réussie ! Redirection...</p>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Entrez votre adresse mail"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        label="Mot de passe"
        name="password"
        type="password"
        placeholder="Entrez votre mot de passe"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
        autoComplete="new-password"
      />
      <Input
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        placeholder="Confirmez votre mot de passe"
        value={signupConfirmPassword}
        onChange={(e) => setSignupConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />
    </main>
  );
};

export default SignupPage;
