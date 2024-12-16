"use client";

// sidebar-card.tsx
import React, { useState } from "react";
import Card from "@/app/components/ui/card";
import SideBarTypes from "./ui/sideBarTypes";
import SideBarNew from "./ui/sideBarNew";

const SidebarCard = () => {
  const [whatShow, setWhatShow] = useState("new");

  const showThat = () => {
    switch (whatShow) {
      case "type":
        return <SideBarTypes setWhatShow={setWhatShow} />;
        break;
      case "new":
        return <SideBarNew setWhatShow={setWhatShow} />;
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
