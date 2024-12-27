"use client";

import React, { useState } from "react";
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
  signupError: string | null;
  signupSuccess: boolean;
}

const SignupPage: React.FC<SignupPageProps> = ({
  handleToggle,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  signupConfirmPassword,
  setSignupConfirmPassword,
  signupError,
  signupSuccess,
}) => {
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  
  const handleSignup = async () => {
    if (signupPassword !== signupConfirmPassword) {
      return "Les mots de passe ne correspondent pas";
    }

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:8000/swimmer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData.message || "Erreur lors de l'inscription";
      }

      const data = await response.json();
      if (data.message === "Swimmer created successfully") {
        return null; 
      }
      return "Une erreur est survenue lors de la création du nageur.";
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      return "Erreur lors de la connexion au serveur";
    } finally {
      setLoading(false); 
    }
  };

  const handleSignupWithRedirect = async () => {
    const errorMessage = await handleSignup();
    if (!errorMessage) {
      router.push("/page"); 
    } else {
      
      alert(errorMessage); 
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 justify-start">
      {signupError && <p className="text-red-500">{signupError}</p>}
      {signupSuccess && (
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
