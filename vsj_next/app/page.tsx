"use client";

import "./globals.css";
import React, { useState } from "react";
import BottomBar from "./components/bottombar/bottom-bar";
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
import Landing from "./Landing/page";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("");

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
        return <Landing />;
    }
  };

  const isLandingPage = currentPage === "";

  return isLandingPage ? (
    <Landing />
  ) : (
    <div
      className={clsx(
        "lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden",
        { "lg:!h-[100vh]": currentPage === "Dashboard" }
      )}
    >
      <Header />

      <EventsProvider>{renderPage()}</EventsProvider>

      {!isLandingPage && (
        <BottomBar
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          isPage={currentPage !== "Dashboard"}
        />
      )}
    </div>
  );
}
