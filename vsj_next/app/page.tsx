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
import Stats from "./stats/stats";

import Header from "./components/header/header";
import { EventsProvider } from "./calendar/database/events-context";
import Group02 from "./groupe02/group02";

import { redirect } from "next/navigation";
import MessageUpdate from "./message/message-update";

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
        return <MessageUpdate />;
      case "Group":
        return <Group02 />;
      case "Map":
        return <Map />;
      case "Stats":
        return <Stats />;
      default:
        return <Calendar />;
    }
  };

  return (
    <div className=" lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden bg-[#F7F7F7] dark:bg-[#262629]">
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
