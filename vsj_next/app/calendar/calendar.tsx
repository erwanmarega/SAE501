"use client";

import React, { useState } from "react";
import CalendarCard from "./components/calendar-card";
import SidebarCard from "./components/sidebar-card";
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
      <div className="gap-6 grid grid-cols-[1fr_minmax(250px,25%)] h-[85vh] m-5">
        <CalendarCard />
        <SidebarCard />
      </div>
    </DndContext>
  );
};

const Calendar = () => {
  return (
    <EventsProvider>
      <CalendarContent />
    </EventsProvider>
  );
};

export default Calendar;
