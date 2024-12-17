"use client";

// sidebar-card.tsx
import React, { useState } from "react";
import Card from "@/app/components/ui/card";
import SideBarTypes from "./ui/sideBarTypes";
import SideBarNew from "./ui/sideBarNew";
import SideBarShow from "./ui/sidebarShow";
import { useEvents } from "../database/events-context";

const SidebarCard = () => {
  const { whatShow, setWhatShow } = useEvents();

  const showThat = () => {
    switch (whatShow) {
      case "type":
        return <SideBarTypes setWhatShow={setWhatShow} />;
        break;
      case "new":
        return <SideBarNew setWhatShow={setWhatShow} />;
        break;
      case "show":
        return <SideBarShow setWhatShow={setWhatShow} />;
        break;

      default:
        break;
    }
  };

  return (
    <Card className="h-full rounded-3xl px-4 py-4 flex flex-col gap-2 relative">
      {showThat()}
    </Card>
  );
};

export default SidebarCard;
