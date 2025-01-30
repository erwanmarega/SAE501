"use client"; // Assure l'exécution côté client (nécessaire en App Router Next.js 13+)

import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";

// Calcul des positions pour remplacer les valeurs
const calculatePositions = (data) => {
  const sorted = [...data].sort((a, b) => b - a); // Trier par ordre décroissant
  return data.map((value) => sorted.indexOf(value) + 1); // Renvoyer les positions
};

const defaultSeries = [
  {
    name: "Ranking",
    data: calculatePositions([
      18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000,
      60000, 70000,
    ]),
  },
];

const defaultCategories = [
  "25 January 2023",
  "26 January 2023",
  "27 January 2023",
  "28 January 2023",
  "29 January 2023",
  "30 January 2023",
  "31 January 2023",
  "1 February 2023",
  "2 February 2023",
  "3 February 2023",
  "4 February 2023",
  "5 February 2023",
];

export default function GraphChart({
  series = defaultSeries,
  categories = defaultCategories,
  chartTitle = "",
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Configuration du graphique
    const chartOptions = {
      chart: {
        height: "80%",
        width: "100%",
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series,
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      grid: {
        strokeDashArray: 2,
        borderColor: "#e5e7eb",
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.8,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        type: "category",
        tickPlacement: "on",
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#9ca3af",
            fontSize: "13px",
            fontFamily: "Inter, ui-sans-serif",
            fontWeight: 400,
          },
          formatter: (val) => {
            if (!val) return val;
            const [day, month] = val.split(" ");
            return `${day} ${month.slice(0, 3)}`;
          },
        },
      },
      yaxis: {
        labels: {
          align: "left",
          style: {
            colors: "#9ca3af",
            fontSize: "13px",
            fontFamily: "Inter, ui-sans-serif",
            fontWeight: 400,
          },
          formatter: (value) => value, // Afficher la position telle quelle
        },
      },
      tooltip: {
        x: { format: "MMMM yyyy" },
        y: {
          formatter: (value) => `Position: ${value}`, // Afficher la position dans l'infobulle
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: { height: "100%" },
            xaxis: {
              labels: {
                style: { fontSize: "11px" },
                formatter: (val) => (val ? val.slice(0, 3) : val),
              },
            },
            yaxis: {
              labels: { style: { fontSize: "11px" } },
            },
          },
        },
      ],
      title: {
        text: chartTitle,
        align: "left",
      },
      colors: ["#2563eb", "#9333ea"],
    };

    // Instanciation du graphique
    chartInstance.current = new ApexCharts(chartRef.current, chartOptions);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [series, categories, chartTitle]);

  return (
    <>
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2" />
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Rankings
          </span>
        </div>
      </div>
      <div className="w-full h-80" ref={chartRef} />
    </>
  );
}
