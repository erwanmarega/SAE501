"use client";

import "./globals.css";
import React, { useState } from "react";
import BottomBar from "./components/bottombar/bottom-bar";

// Import des composants de page
import Dashboard from "./dashboard/dashboard";
import Calendar from "./calendar/calendar";
import Message from "./message/message";
import Group from "./group/page";
import Map from "./map/page";
import StatsPage from "./stats/page";
import clsx from "clsx";

import Header from "./components/header/header";
import { EventsProvider } from "./calendar/database/events-context";
import Group02 from "./groupe02/group02";

import MessageUpdate from "./message/message-update";

export default function Home() {
  // État pour suivre la page actuelle, par défaut "Calendar"
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // Fonction pour rendre le composant correspondant
  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Calendar":
        return <Calendar />;
      case "Message":
        return <MessageUpdate />;
      case "Group":
        return <Group02 />;
      case "Map":
        return <Map />;
      case "Stats":
        return <StatsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={clsx(
        "lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden bg-[#F7F7F7] dark:bg-[#262629]",
        { "lg:!h-[100vh]": currentPage === "Dashboard" }
      )}
    >
      {/* Composant d'en-tête */}
      <Header />

      {/* Composant actuellement affiché */}
      <EventsProvider>{renderPage()}</EventsProvider>

      {/* Barre de navigation inférieure */}
      <BottomBar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        isPage={currentPage !== "Dashboard"}
      />
    </div>
  );
}
