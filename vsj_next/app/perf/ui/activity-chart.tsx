"use client";

import React, { useEffect } from "react";
import Chart from "chart.js/auto"; // Chart.js auto-register
import Card from "@/app/components/ui/card";

// Exemple de données par défaut.
// Ici, on utilise un OBJET unique au lieu d'un tableau
const defaultStat = {
  title: "Dos crawlé",
  statValue: "3,682",
  percentage: 57.1,
  chartId: "chartUnique",
  chartData: {
    labels: [1, 2, 1, 3, 5, 4, 7],
    datasets: [
      {
        backgroundColor: "rgba(101, 116, 205, 0.1)",
        borderColor: "rgba(101, 116, 205, 0.8)",
        borderWidth: 2,
        data: [1, 2, 1, 3, 5, 4, 7],
        tension: 0.25,
        fill: true,
      },
    ],
  },
};

const chartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { display: false },
    },
    y: {
      grid: { display: false },
      ticks: { display: false, suggestedMin: 0, suggestedMax: 10 },
    },
  },
};

export default function ActivityChart({ stat = defaultStat }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = document.getElementById(stat.chartId) as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      new Chart(ctx, {
        type: "line",
        data: stat.chartData,
        options: chartOptions,
      });
    }
  }, [stat]);

  // Décide la couleur selon si le pourcentage est positif ou négatif
  const isPositive = stat.percentage >= 0;
  const arrowSymbol = isPositive ? "▲" : "▼";

  return (
    <Card className="relative overflow-hidden h-full w-full">
      <div className="py-1 text-center relative z-10">
        <h4 className="text-sm uppercase text-gray-500 leading-tight">
          {stat.title}
        </h4>
        <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
          {stat.statValue}
        </h3>
        <p
          className={`text-xs leading-tight ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {arrowSymbol} {Math.abs(stat.percentage)}%
        </p>
      </div>
      <div className="absolute -bottom-2 inset-x-0 h-1/2 w-[110%] -left-2">
        <canvas id={stat.chartId} height="70" />
      </div>
    </Card>
  );
}
