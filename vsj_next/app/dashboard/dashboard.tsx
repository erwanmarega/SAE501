"use client";

import React, { useContext } from "react";
import { useLanguage } from "../components/header/ui/context/language-provider";
import Card from "../components/ui/card";
import MapCard from "./components/map-card";
import CalendarCard from "./components/calendar-card";
import MessageCard from "./components/message-card";
import GroupCard from "./components/group-card";
import TemperatureCard from "./components/temperature-card";
import StatsCard from "./components/stats-card";
const Dashboard = () => {
  const { language } = useLanguage();

  return (
    <main className="grid grid-cols-5 grid-rows-10 gap-5 w-full h-[73vh] p-4">
      <MapCard />
      <CalendarCard />
      <MessageCard position={1} />
      <MessageCard position={2} />
      <GroupCard />
      <TemperatureCard />
      <StatsCard />
    </main>
  );
};

export default Dashboard;
