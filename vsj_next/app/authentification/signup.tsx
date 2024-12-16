"use client";

import React, { useState } from "react";
import axios from "axios";
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setError(null);

      const data = {
        email,
        password,
      };

      // Requête vers l'API Symfony
      const response = await axios.post("http://localhost:8000/swimmer", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 justify-start">
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSignup}>
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
          label="Confirmer mot de passe"
          name="confirmPassword"
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          S'inscrire
        </button>
      </form>
    </main>
  );
};

export default SignupPage;