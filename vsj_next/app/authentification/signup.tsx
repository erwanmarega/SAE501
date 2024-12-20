"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/input";

interface SignupPageProps {
  handleToggle: (active: "Connexion" | "Inscription") => void;
}

const SignupPage = ({ handleToggle }: SignupPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!email || !password) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setError(null);
      setSuccess(false);

      const data = { email, password };

      const response = await axios.post("http://localhost:8000/swimmer", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        router.push("/signup"); // Redirection vers la suite
      }
    } catch (err: any) {
      // Gestion des erreurs spécifiques
      if (err.response && err.response.status === 409) {
        setError("Il y a déjà un compte avec cette adresse mail.");
      } else {
        setError(
          "Vérifiez vos informations ou réessayez."
        );
      }
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 justify-start">
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSignup}
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Inscription réussie !</p>}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Entrez votre adresse mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirmer le mot de passe"
          name="confirmPassword"
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p className={`text-sm ${password !== confirmPassword ? "text-red-500" : "text-green-500"}`}>
          {password !== confirmPassword && confirmPassword
            ? "Les mots de passe ne correspondent pas."
            : password && confirmPassword
            ? "Les mots de passe correspondent."
            : ""}
        </p>

        <button
          type="submit"
          disabled={password !== confirmPassword || !password || !confirmPassword}
          className={`px-4 py-2 rounded text-white ${
            password === confirmPassword && password
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          S'inscrire
        </button>
      </form>
    </main>
  );
};

export default SignupPage;
