"use client";

import React, { lazy, Suspense } from "react";
import Card from "@/app/components/ui/card";
import { useEvents } from "./database/events-context";

// Lazy-loaded components
const SideBarTypes = lazy(() => import("./sidebar/sideBar-types"));
const SideBarNew = lazy(() => import("./sidebar/sidebar-new"));
const SideBarShow = lazy(() => import("./sidebar/sidebar-show"));
const SidebarShows = lazy(() => import("./sidebar/sidebar-shows"));
const SidebarCategory = lazy(() => import("./sidebar/sidebar-category"));
const SideBarAdminEdit = lazy(() => import("./sidebar/sidebar-adminEdit"));
const SidebarWeek = lazy(() => import("./sidebar/sidebar-week"));

const SidebarCard = () => {
  const { whatShow, setWhatShow } = useEvents();

  // Mapping the `whatShow` state to the corresponding component
  const showThat = () => {
    switch (whatShow) {
      case "type":
        return <SideBarTypes setWhatShow={setWhatShow} />;
      case "new":
        return <SideBarNew setWhatShow={setWhatShow} />;
      case "show":
        return <SideBarShow setWhatShow={setWhatShow} />;
      case "shows":
        return <SidebarShows setWhatShow={setWhatShow} />;
      case "category":
        return <SidebarCategory setWhatShow={setWhatShow} />;
      case "edit-admin":
        return <SideBarAdminEdit setWhatShow={setWhatShow} />;
      case "edit-week":
        return <SidebarWeek setWhatShow={setWhatShow} />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full rounded-3xl px-4 py-4 flex flex-col gap-2 relative">
      <Suspense fallback={<div>Chargement...</div>}>{showThat()}</Suspense>
    </Card>
  );
};

export default SidebarCard;
