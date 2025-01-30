"use client";

import { useState } from "react";
import Card from "../components/ui/card";
import SwimmerCard from "./ui/swimmer-card";
import H3 from "../components/ui/texts/h3";
import Profil from "../components/profil/profil";
import ResultCard from "./ui/result-card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

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
    { name: "Marie Smith", dob: "17/07/2004", note: "Graph", size: 50 },
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

  const salesData = [
    { name: "Jul", position: 10 },
    { name: "Aug", position: 8 },
    { name: "Sep", position: 4 },
    { name: "Oct", position: 6 },
    { name: "Nov", position: 5 },
    { name: "Dec", position: 6 },
    { name: "Jan", position: 3 },
    { name: "Feb", position: 5 },
    { name: "Mar", position: 8 },
    { name: "Apr", position: 2 },
    { name: "May", position: 5 },
    { name: "Jun", position: 7 },
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
        <section className="grid grid-cols-2 mt-4 relative mr-20 h-full">
          <div className="w-36 h-[400px] absolute border-8 border-primary/25 left-[260px]  mt-10"></div>
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
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D5D8E5" />
                  <XAxis dataKey={"name"} stroke="#D5D8E5" />
                  <YAxis
                    stroke="#D5D8E5"
                    reversed
                    domain={[10, 1]}
                    ticks={[1, 3, 5, 7, 9]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.05)",
                      borderColor: "#D5D8E5",
                    }}
                    itemStyle={{ color: "#374151" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="position"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Group02;
