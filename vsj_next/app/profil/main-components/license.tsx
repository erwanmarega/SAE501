"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/components/ui/button";
import Image from "next/image";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";
import HForm from "@/app/components/ui/texts/h-form";
import HFormData from "@/app/components/ui/texts/h-form-data";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

interface User {
  prenom: string;
  nom: string;
}

const License = () => {
  const { language } = useLanguage(); // Récupère la langue actuelle
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            language === "en"
              ? "Unable to retrieve user information"
              : "Impossible de récupérer les informations utilisateur"
          );
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError(
          err.message ||
            (language === "en" ? "Unknown error" : "Erreur inconnue")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [language]); // Ajout de `language` pour s'assurer que la langue est prise en compte lors de l'appel API

  if (loading) {
    return <div>{language === "en" ? "Loading..." : "Chargement..."}</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {language === "en" ? "Error: " : "Erreur : "} {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-red-500">
        {language === "en"
          ? "No user data found."
          : "Aucune donnée utilisateur trouvée."}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-8 h-full lg:gap-2 w-full">
      <header className="flex flex-col">
        <H4>
          {language === "en" ? "Swimming License" : "License de Natation"}
        </H4>
        <P>
          {language === "en"
            ? "Here is your Swimming License, required to participate in competitions. Without it, participation is strictly prohibited!"
            : "Voici votre License de Natation, afin de participer aux compétitions, sans cela, toute compétition est formellement interdite !"}
        </P>
      </header>
      <main className="flex flex-col gap-8 h-full w-full lg:flex-row">
        <section className="flex items-center justify-center lg:justify-start w-full lg:w-max">
          <Image
            src="/assets/img/license.png"
            width={450}
            height={450}
            alt={language === "en" ? "My Swimming License" : "Ma License"}
            className="w-full max-w-96 lg:max-w-[750px]"
          />
        </section>
        <section className="flex items-center justify-center lg:w-5/6">
          <div className="grid grid-rows-4 grid-cols-2 w-3/4 lg:w-3/4">
            <HForm>{language === "en" ? "Full Name" : "Nom complet"}</HForm>
            <HFormData className="text-end">
              {user.prenom} {user.nom}
            </HFormData>
            <HForm>{language === "en" ? "League" : "Ligue"}</HForm>
            <HFormData className="text-end">Ligue FFV</HFormData>
            <HForm>
              {language === "en" ? "Expiration Date" : "Date d'expiration"}
            </HForm>
            <HFormData className="text-end">12/01/2025</HFormData>
            <HForm>{language === "en" ? "Reference" : "Référence"}</HForm>
            <HFormData className="text-end">#144173K</HFormData>
          </div>
        </section>
      </main>
      <footer className="flex justify-between w-full mt-2">
        <Button variant="outline" className="!w-2/6">
          {language === "en" ? "Make a request" : "Faire une demande"}
        </Button>
        <Button className="!w-2/6">
          {language === "en" ? "Renew" : "Renouveler"}
        </Button>
      </footer>
    </section>
  );
};

export default License;
