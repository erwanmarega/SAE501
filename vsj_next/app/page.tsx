"use client";

import React, { useState, useContext } from "react";
import BottomBar from "./components/bottom-bar";

// Import des composants de page
import DashboardPage from "./dashboard/page";
import CalendarPage from "./calendar/page";
import MessagePage from "./message/page";
import GroupPage from "./group/page";
import MapPage from "./map/page";
import Header from "./components/header";
import StatsPage from "./stats/page";
import { LanguageContext } from "./contexts/language-context";

export default function Home() {
  // État pour suivre la page actuelle, par défaut "Dashboard"
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // État pour la langue, par défaut "en"
  const { currentLocale, setCurrentLocale } = useContext(LanguageContext);

  // Fonction pour changer la langue
  const handleLanguageChange = (locale: "en" | "fr") => {
    setCurrentLocale(locale);
  };

  // Fonction pour rendre le composant correspondant
  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Calendar":
        return <CalendarPage />;
      case "Message":
        return <MessagePage />;
      case "Group":
        return <GroupPage />;
      case "Map":
        return <MapPage />;
      case "Stats":
        return <StatsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="bg-[#F7F7F7] h-screen">
      <Header onLanguageChange={handleLanguageChange} />
      {/* Composant actuellement affiché */}
      {renderPage()}

      {/* Bar de navigation inférieure */}
      <BottomBar setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}
