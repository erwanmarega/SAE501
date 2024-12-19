"use client";

import "./globals.css";
import React, { useState } from "react";
import BottomBar from "./components/bottombar/bottom-bar";

// Import des composants de page
import Dashboard from "./dashboard/dashboard";
import Calendar from "./calendar/calendar";
import Message from "./message/message";
import Group from "./group/group";
import Map from "./map/map";
import Stats from "./stats/stats";

import Header from "./components/header/header";

export default function Home() {
  // État pour suivre la page actuelle, par défaut "Dashboard"
  const [currentPage, setCurrentPage] = useState("");

  // Fonction pour rendre le composant correspondant
  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Calendar":
        return <Calendar />;
      case "Message":
        return <Message />;
      case "Group":
        return <Group />;
      case "Map":
        return <Map />;
      case "Stats":
        return <Stats />;
      default:
        return <Calendar />;
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
