import React from "react";
import AdhesionCard from "./ui/adhesion-card";
import H4 from "@/app/components/ui/texts/h4";

const Adhesion = () => {
  const adhesions = [
    {
      variant: "default",
      price: 120.0,
      startDate: "24 Septembre 2024",
      endDate: "24 Juillet 2025",
      sport: "Natation",
      category: "Natation Adolescents",
      membership: "Annuel",
    },
    {
      variant: "default",
      price: 90.0,
      startDate: "24 Septembre 2024",
      endDate: "24 Juillet 2025",
      sport: "Aquagym",
      category: "Aquagym Adultes",
      membership: "Annuel",
    },
  ];



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
      <H4>Adhésion</H4>
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
