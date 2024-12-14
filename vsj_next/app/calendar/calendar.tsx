import React from "react";
import Card from "../components/ui/card";
import CalendarCard from "./components/calendar-card";
import SidebarCard from "./components/sidebar-card";

const Calendar = () => {
  return (
    <div className="gap-6 grid grid-cols-[1fr_minmax(250px,25%)] h-[85vh] m-5">
      <CalendarCard />
      <SidebarCard />
    </div>
  );
};

export default Calendar;
