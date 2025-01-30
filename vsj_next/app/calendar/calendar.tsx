"use client";

import React, { useState } from "react";
import CalendarCard from "./calendar-card";
import SidebarCard from "./sidebar-card";
import { EventsProvider, useEvents } from "./database/events-context";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";

const CalendarContent = () => {
  const { addSessionToDate, setDraggingSessionId } = useEvents();

  const handleDragStart = (event: DragStartEvent) => {
    const sessionId = event.active.id as string;
    setDraggingSessionId(sessionId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active) {
      const droppedDate = over.id as string;
      const sessionId = active.id as string;
      addSessionToDate(sessionId, droppedDate);
    }
    setDraggingSessionId(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="gap-6 grid grid-cols-[1fr_minmax(250px,25%)] h-[85vh] w-[98%] max-w-[1500px] max-h-[700px] mt-7">
        <CalendarCard />
        <SidebarCard />
      </div>
    </DndContext>
  );
};

const Calendar = () => {
  return <CalendarContent />;
};

export default Calendar;
