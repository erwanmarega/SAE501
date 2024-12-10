// dashboard/page.tsx

"use client";

import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language-context"; // Assurez-vous que le chemin est correct

const DashboardPage = () => {
  const { currentLocale } = useContext(LanguageContext);

  return (
    <main className="grid grid-cols-5 grid-rows-5 gap-5 w-full h-[73vh] p-4">
      {/* 3D MAP / CARTE 3D */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-1 row-end-5 col-start-1 col-end-4 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "3D MAP" : "CARTE 3D"}
        </h1>
      </div>

      {/* CALENDAR / CALENDRIER */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-5 row-end-6 col-start-1 col-end-4 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "CALENDAR" : "CALENDRIER"}
        </h1>
      </div>

      {/* MESSAGE 01 / MESSAGE 01 */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-1 row-end-2 col-start-4 col-end-5 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "MESSAGE 01" : "MESSAGE 01"}
        </h1>
      </div>

      {/* MESSAGE 02 / MESSAGE 02 */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-1 row-end-2 col-start-5 col-end-6 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "MESSAGE 02" : "MESSAGE 02"}
        </h1>
      </div>

      {/* GROUP / GROUPE */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-2 row-end-6 col-start-4 col-end-5 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "GROUP" : "GROUPE"}
        </h1>
      </div>

      {/* TEMPERATURE / TEMPERATURE */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-2 row-end-4 col-start-5 col-end-6 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "TEMPERATURE" : "TEMPERATURE"}
        </h1>
      </div>

      {/* STATS / STATISTIQUES */}
      <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-4 row-end-6 col-start-5 col-end-6 flex items-center bg-white">
        <h1 className="m-auto text-xl font-semibold">
          {currentLocale === "en" ? "STATS" : "STATISTIQUES"}
        </h1>
      </div>
    </main>
  );
};

export default DashboardPage;
