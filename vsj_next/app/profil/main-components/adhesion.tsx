"use client";

import React from "react";
import AdhesionCard from "./ui/adhesion-card";
import H4 from "@/app/components/ui/texts/h4";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

const Adhesion = () => {
  const { language } = useLanguage(); 

  const adhesions = [
    {
      variant: "default",
      price: 120.0,
      startDate: language === "en" ? "September 24, 2024" : "24 Septembre 2024",
      endDate: language === "en" ? "July 24, 2025" : "24 Juillet 2025",
      sport: language === "en" ? "Swimming" : "Natation",
      category: language === "en" ? "Teen Swimming" : "Natation Adolescents",
      membership: language === "en" ? "Annual" : "Annuel",
    },
    {
      variant: "default",
      price: 90.0,
      startDate: language === "en" ? "September 24, 2024" : "24 Septembre 2024",
      endDate: language === "en" ? "July 24, 2025" : "24 Juillet 2025",
      sport: language === "en" ? "Aquagym" : "Aquagym",
      category: language === "en" ? "Adult Aquagym" : "Aquagym Adultes",
      membership: language === "en" ? "Annual" : "Annuel",
    },
  ];

  // On vérifie s’il n’y a que 2 adhésions
  // et on ajoute une "carte d'ajout" en plus :
  adhesions.push({
    variant: "add",
    price: null,
    startDate: null,
    endDate: null,
    sport: null,
    category: null,
    membership: null,
  });

  return (
    <section className="flex flex-col gap-8">
      <H4>{language === "en" ? "Membership" : "Adhésion"}</H4>
      <main className="flex flex-col lg:flex-row items-center gap-6">
        {adhesions.map((adh, index) => (
          <AdhesionCard
            key={index}
            variant={adh.variant}
            price={adh.price}
            startDate={adh.startDate}
            endDate={adh.endDate}
            sport={adh.sport}
            category={adh.category}
            membership={adh.membership}
          />
        ))}
      </main>
    </section>
  );
};

export default Adhesion;
