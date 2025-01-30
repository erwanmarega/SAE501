"use client";

import React, { useState } from "react";
import Card from "@/app/components/ui/card";
import Header from "@/app/components/header/header";
import H3 from "../components/ui/texts/h3";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ResultCard from "@/app/groupe02/ui/result-card";
// Import de votre composant ActivityChart
import ActivityChart from "./ui/activity-chart";
import GraphChart from "../calendar/ui/graph-chart";

// Exemples de stats pour chaque style de nage
const papillonStats = {
  title: "Papillon",
  statValue: "75",
  percentage: 10, // Score d'amélioration, par ex. +10%
  chartId: "chartPapillon",
  chartData: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        borderColor: "rgba(0, 153, 255, 1)", // Couleur du trait
        backgroundColor: "rgba(0, 153, 255, 0.2)", // Zone remplie
        data: [2, 3, 2, 5, 6, 8],
        tension: 0.3,
        fill: true,
      },
    ],
  },
};

const dosCrawleStats = {
  title: "Dos Crawlé",
  statValue: "45",
  percentage: -5,
  chartId: "chartDosCrawle",
  chartData: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        borderColor: "rgba(101, 116, 205, 1)",
        backgroundColor: "rgba(101, 116, 205, 0.2)",
        data: [1, 2, 1, 3, 5, 3],
        tension: 0.3,
        fill: true,
      },
    ],
  },
};

const brasseStats = {
  title: "Brasse",
  statValue: "80",
  percentage: 12,
  chartId: "chartBrasse",
  chartData: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        borderColor: "rgba(0, 200, 83, 1)",
        backgroundColor: "rgba(0, 200, 83, 0.2)",
        data: [2, 4, 6, 5, 7, 9],
        tension: 0.3,
        fill: true,
      },
    ],
  },
};

const crawlStats = {
  title: "Crawl",
  statValue: "90",
  percentage: 15,
  chartId: "chartCrawl",
  chartData: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        borderColor: "rgba(246, 153, 63, 1)",
        backgroundColor: "rgba(246, 153, 63, 0.2)",
        data: [3, 5, 4, 7, 8, 10],
        tension: 0.3,
        fill: true,
      },
    ],
  },
};

const PerfPage = () => {
  const options = [
    { id: "Natation Ados", label: "Natation Ados" },
    { id: "Aquagym", label: "Aquagym" },
    { id: "Aquabike", label: "Aquabike" },
  ];

  const [selected, setSelected] = useState<string>("License");
  const handleClick = (id: string) => {
    setSelected(id);
  };

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
    <div className="lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden bg-[#F7F7F7] dark:bg-[#262629]">
      {/* Composant d'en-tête */}
      <Header />
      <div className="grid grid-rows-10 grid-cols-2 h-[82.5vh] max-h-[575px] w-full max-w-[1500px] gap-5 mt-20">
        {/* Barre d'onglets */}
        <Card className="h-12 w-max flex justify-between gap-4 rounded-xl">
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

        <Card className="row-start-2 row-end-8 col-start-1 col-end-1 h-full w-full">
          <H3>Mon Niveau</H3>
        </Card>

        {/* Quatre styles de nage, affichés chacun dans un ActivityChart */}
        <section className="row-start-8 row-end-11 col-start-1 col-end-1 flex justify-between gap-4">
          <ActivityChart stat={papillonStats} />
          <ActivityChart stat={dosCrawleStats} />
          <ActivityChart stat={brasseStats} />
          <ActivityChart stat={crawlStats} />
        </section>

        <H3 className="col-start-2 col-end-2 row-start-1 row-end-1">
          Mes Résultats
        </H3>

        <section className="col-start-2 col-end-2 row-start-2 row-end-5 flex justify-between gap-4 h-full">
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

        <Card className="row-start-5 row-end-11 grid-start-2 grid-end-2 h-full w-full">
          <H3>Mes performances</H3>

          <GraphChart />
        </Card>
      </div>
    </div>
  );
};

export default PerfPage;
