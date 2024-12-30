"use client";

import { useState } from "react";
import Card from "../components/ui/card";
import SwimmerCard from "./ui/swimmer-card";
import H3 from "../components/ui/texts/h3";
import Profil from "../components/profil/profil";
import ResultCard from "./ui/result-card";

const Group02 = () => {
  const [selected, setSelected] = useState<string>("License");

  // Tableau d'options pour l'exemple
  const options = [
    { id: "Natation Ados", label: "Natation Ados" },
    { id: "Aquagym", label: "Aquagym" },
    { id: "Aquabike", label: "Aquabike" },
  ];

  const handleClick = (id: string) => {
    setSelected(id);
  };

  // Tableau de swimmers (8 exemples)
  const swimmers = [
    { name: "Stéphane Cablet", dob: "31/10/2004", note: "Graph", size: 50 },
    { name: "Jane Doe", dob: "12/05/2001", note: "Graph", size: 50 },
    { name: "Michel Durant", dob: "19/11/1998", note: "Graph", size: 50 },
    { name: "Alice Dupont", dob: "03/03/2003", note: "Graph", size: 50 },
    { name: "Carlos Gomez", dob: "15/08/2002", note: "Graph", size: 50 },
    { name: "Emma Leroy", dob: "22/09/2005", note: "Graph", size: 50 },
    { name: "Yves Martin", dob: "01/01/2000", note: "Graph", size: 50 },
    { name: "Marie Smith", dob: "17/07/2004", note: "Graph", size: 50 },
  ];

  const results = [
    {
      position: "1",
      name: "Erwan Marecage",
      date: "9 Janvier 2025",
      location: "Veudreuil",
    },
    {
      position: "2",
      name: "Marie Dubois",
      date: "15 Février 2025",
      location: "Paris",
    },
    {
      position: "3",
      name: "Lucas Leclerc",
      date: "28 Mars 2025",
      location: "Lyon",
    },
  ];

  return (
    <div className="grid grid-rows-[50px_1fr] h-[82.5vh] max-h-[700px] w-full max-w-[1500px] gap-5 mt-20">
      {/* Barre d'onglets */}
      <Card className="h-full w-max flex justify-between gap-4 rounded-xl">
        {options.map((option) => (
          <div
            key={option.id}
            className={`rounded-md cursor-pointer py-1 px-2 flex items-center ${
              selected === option.id
                ? "text-primary bg-primary/25"
                : "hover:text-primary hover:bg-primary/25"
            }`}
            onClick={() => handleClick(option.id)}
          >
            <h5>{option.label}</h5>
          </div>
        ))}
      </Card>

      {/* Contenu principal */}
      <section className="grid grid-cols-2 w-full">
        <section className="grid grid-cols-2 gap-8 mt-4 relative mr-20">
          <div className="w-20 h-[370px] absolute border-8 border-primary/25 left-[290px]  mt-12"></div>
          {swimmers.map((swimmer, index) => (
            <SwimmerCard
              key={index}
              number={index}
              name={swimmer.name}
              dob={swimmer.dob}
              note={swimmer.note}
              size={swimmer.size}
            />
          ))}
        </section>

        {/* Section de droite (placeholder) */}
        <section className="h-full grid grid-rows-[max-content_1fr] gap-6">
          <div className="flex flex-col gap-2">
            <H3>Mes derniers résultats</H3>
            <section className="flex justify-between">
              {results.map((result, index) => (
                <ResultCard
                  key={index}
                  position={result.position}
                  name={result.name}
                  date={result.date}
                  location={result.location}
                />
              ))}
            </section>
          </div>
          <div>
            <Card className="w-full h-full grid grid-rows-[50px_1fr]">
              <div className="flex justify-center">
                <H3 className="m-auto">Mes performances</H3>
              </div>
              <p>kjbqx</p>
            </Card>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Group02;
