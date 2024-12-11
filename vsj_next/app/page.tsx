"use client";

import React, { useState } from "react";
import BottomBar from "./components/bottombar/bottom-bar";

// Import des composants de page
import DashboardPage from "./dashboard/page";
import CalendarPage from "./calendar/page";
import MessagePage from "./message/message";
import GroupPage from "./group/page";
import MapPage from "./map/page";
import Header from "./components/header/header";
import StatsPage from "./stats/page";

export default function Home() {
  // État pour suivre la page actuelle, par défaut "Dashboard"
  const [currentPage, setCurrentPage] = useState("Dashboard");

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
    <div className="bg-[#F7F7F7] dark:bg-[#262629] h-screen overflow-hidden">
      {/* Composant d'en-tête */}
      <Header />

      {/* Composant actuellement affiché */}
      {renderPage()}

      {/* Barre de navigation inférieure */}
      <BottomBar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        isPage={currentPage !== "Dashboard"}
      />
    </div>
  );
}
