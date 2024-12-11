// dashboard/page.tsx

"use client";

import React, { useContext } from "react";
import { useLanguage } from "../components/header/ui/context/language-provider";
import Card from "../components/ui/card";
const DashboardPage = () => {
  const { language } = useLanguage();

  return (
    <main className="grid grid-cols-5 grid-rows-10 gap-5 w-full h-[73vh] p-4">
      {/* 3D MAP / CARTE 3D */}
      <Card className="w-full h-full row-start-1 row-end-8 col-start-1 col-end-4 flex items-center">
        {" "}
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "3D MAP" : "CARTE 3D"}
        </h1>
      </Card>

      {/* CALENDAR / CALENDRIER */}
      <Card className="w-full h-full row-start-8 row-end-11 col-start-1 col-end-4 flex items-center">
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "CALENDAR" : "CALENDRIER"}
        </h1>
      </Card>

      {/* MESSAGE 01 / MESSAGE 01 */}
      <Card className="w-full h-full row-start-1 row-end-3 col-start-4 col-end-5 flex items-center">
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "MESSAGE 01" : "MESSAGE 01"}
        </h1>
      </Card>

      {/* MESSAGE 02 / MESSAGE 02 */}
      <Card className="w-full h-full row-start-1 row-end-3 col-start-5 col-end-6 flex items-center">
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "MESSAGE 02" : "MESSAGE 02"}
        </h1>
      </Card>

      {/* GROUP / GROUPE */}
      <Card className="w-full h-full row-start-3 row-end-11 col-start-4 col-end-5 flex items-center">
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "GROUP" : "GROUPE"}
        </h1>
      </Card>

      {/* TEMPERATURE / TEMPERATURE */}
      <Card className="w-full h-full row-start-3 row-end-7 col-start-5 col-end-6 flex items-center">
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "TEMPERATURE" : "TEMPERATURE"}
        </h1>
      </Card>

      {/* STATS / STATISTIQUES */}
      <Card className="w-full h-full row-start-7 row-end-11 col-start-5 col-end-6 flex items-center">
        <h1 className="m-auto text-xl font-semibold dark:text-white">
          {language === "en" ? "STATS" : "STATISTIQUES"}
        </h1>
      </Card>
    </main>
  );
};

export default DashboardPage;
