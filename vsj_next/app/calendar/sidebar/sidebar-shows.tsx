// components/SidebarCategory.tsx
"use client";

import React, { useState } from "react";
import { useEvents } from "../database/events-context";
import H4 from "@/app/components/ui/texts/h4";
import { EventsShowsCard } from "../ui/eventsShows-card";
import CloseButton from "../ui/closeButton";

interface SidebarShowsProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarShows = ({ setWhatShow }: SidebarShowsProps) => {
  const { dataEvents, currentDate, userStatus } = useEvents();
  const dateStr = currentDate.toLocaleDateString("fr-FR");
  const dayEvents = dataEvents[dateStr] || [];

  return (
    <div className="w-full h-full grid grid-rows-[130px_1fr] ">
      {userStatus !== "swimmer" && (
        <CloseButton onClick={() => setWhatShow("category")} />
      )}
      <header className="w-full h-full flex flex-col gap-4 items-center p-4">
        <H4 className="!text-2xl text-center mb-0">Entraînements</H4>
        {/* Badge date */}
        <div className="absolute left-4 top-4">
          <div className="bg-primary/15 rounded-full py-1 px-2 ">
            <p className="text-primary font-mona font-medium text-3xs text-center whitespace-nowrap">
              {dateStr}
            </p>
          </div>
        </div>
      </header>

      <main
        className="h-full max-h-[60vh] flex flex-col items-center overflow-y-auto gap-8 pr-2 -mr-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {dayEvents.map((event, index) => (
          <EventsShowsCard
            key={index}
            setWhatShow={setWhatShow}
            event={event}
          />
        ))}
      </main>
    </div>
  );
};

export default SidebarShows;
