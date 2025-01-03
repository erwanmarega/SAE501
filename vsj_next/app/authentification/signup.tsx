"use client";

import React, { useState } from "react";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";

interface SignupPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
  handleSignup: (email: string, password: string, confirmPassword: string) => Promise<void>;
  signupError: string | null;
  signupSuccess: boolean;
  isLoading: boolean;
}

const SignupPage: React.FC<SignupPageProps> = ({
  handleToggle,
  handleSignup,
  signupError,
  signupSuccess,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const onSignup = async () => {
    setLocalError(null);

    // ✅ **Ajoutez des logs pour déboguer**
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // ✅ **Validation locale des champs**
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setLocalError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      await handleSignup(email.trim(), password.trim(), confirmPassword.trim());
    } catch (error: any) {
      setLocalError(error.message || "Une erreur est survenue.");
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 justify-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Inscription</h1>

      {/* ✅ **Gestion des erreurs** */}
      {localError && <p className="text-red-500">{localError}</p>}
      {signupError && <p className="text-red-500">{signupError}</p>}
      {signupSuccess && (
        <p className="text-green-500">Inscription réussie ! Redirection...</p>
      )}

      {/* ✅ **Champs d'entrée** */}
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

      {/* ✅ **Bouton d'inscription** */}
      <Button
        variant="primary"
        format="big"
        type="button"
        onClick={onSignup}
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "S'inscrire"}
      </Button>

      {/* ✅ **Lien vers la connexion** */}
      <p className="text-sm text-gray-600">
        Vous avez déjà un compte ?{" "}
        <span
          className="text-primary font-bold cursor-pointer"
          onClick={() => handleToggle("Connexion")}
        >
          Connectez-vous ici
        </span>
      </p>
    </main>
  );
};

export default SignupPage;