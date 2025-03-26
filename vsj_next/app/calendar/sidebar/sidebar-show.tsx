"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../database/events-context";

import CloseButton from "../ui/closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";

import IntensitySelect from "../ui/intensity-select";
import Group from "@/app/components/ui/group";

interface SideBarShowProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarShow = ({ setWhatShow }: SideBarShowProps) => {
  const { selectedEvent, nextTrain, nextCompetition, userStatus } = useEvents();

  if (!selectedEvent) return null;

  const { event, date } = selectedEvent;

  const intensityToLevel = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case "facile":
        return 1;
      case "moyen":
        return 2;
      case "difficile":
        return 3;
      default:
        return 1;
    }
  };

  const levelToIntensity = (level: number) => {
    switch (level) {
      case 1:
        return "Facile";
      case 2:
        return "Moyen";
      case 3:
        return "Difficile";
      default:
        return "Facile";
    }
  };

  const initialLevel = intensityToLevel(event.details.intensity || "facile");
  const [intensity, setIntensity] = useState<string>(
    levelToIntensity(initialLevel)
  );

  function capitalizeFirstLetter(
    str: "facile" | "moyen" | "difficile" | undefined
  ) {
    if (!str || typeof str !== "string" || str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleIntensitySelect = (level: number) => {
    setIntensity(levelToIntensity(level));
  };

  const isNextTrain =
    nextTrain &&
    nextTrain.date === date &&
    nextTrain.event.title === event.title &&
    nextTrain.event.status === event.status;

  const isNextCompetition =
    nextCompetition &&
    nextCompetition.date === date &&
    nextCompetition.event.title === event.title &&
    nextCompetition.event.status === event.status;

  const showPresenceButtons =
    userStatus === "swimmer" && (isNextTrain || isNextCompetition);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-between">
      {userStatus !== "swimmer" && (
        <CloseButton onClick={() => setWhatShow("category")} />
      )}
      <div className="absolute top-4 left-4">
        <div className="bg-primary/15 rounded-full py-2 px-4">
          <p className="text-primary font-mona font-medium text-xs text-center whitespace-nowrap">
            {event.details.category || "Brasse"}
          </p>
        </div>
      </div>
      <header className="w-full flex flex-col gap-4 items-center p-4 mt-4">
        <div>
          <H4 className="!text-2xl text-center mb-0">{event.title}</H4>
          <P className="text-center mt-0 !text-xs">{date}</P>
        </div>
      </header>

      <main className="flex flex-col px-2 -mt-14">
        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            <H4>Horaires</H4>
            <div className="flex items-center justify-end gap-4 ml-auto mr-0 w-full">
              <P className="text-end text-lg+ !font-light">18:00 - 19:30</P>
              <Image
                src={"/assets/icons/charts-hour/30.svg"}
                alt="Durée de 30min"
                width={60}
                height={60}
                className="-mt-2 -mr-4"
              />
            </div>
          </div>
        </section>

        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            <H4>Intensité</H4>
            <div className="flex items-center justify-end gap-4 ml-auto mr-0 w-full">
              <P className="text-end text-lg+ !font-light">
                {capitalizeFirstLetter(event.details.intensity) ||
                  "aucun niveau"}
              </P>
              <div>
                <IntensitySelect
                  onSelect={handleIntensitySelect}
                  initialLevel={initialLevel}
                  isEditable={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            {userStatus !== "swimmer" ? <H4>Groupe</H4> : <H4>Coach(s)</H4>}
            <div className="flex items-center justify-end gap-4 ml-auto w-full">
              {userStatus !== "swimmer" ? (
                <P>Natation Adolescents</P>
              ) : (
                <P>M. Marega</P>
              )}
              <Group size={45} />
            </div>
          </div>
        </section>

        <section className="border-t-2 border-b-2 border-gray-100 py-4 h-max">
          <div className="grid grid-rows-[max-content_1fr]">
            <H4>Description</H4>
            <div className="bg-gray-100 rounded-lg py-2 px-2 mt-2">
              <P className="text-xs">
                {event.details.description || "Aucune description"}
              </P>
            </div>
          </div>
        </section>
      </main>

      <footer>
        {showPresenceButtons && (
          <div className="w-full flex items-center justify-between gap-12">
            <Button className="" variant="outline">
              Absent
            </Button>
            <Button variant="primary">Présent</Button>
          </div>
        )}
        {userStatus === "coach" && event.status === "training" && (
          <div className="w-full flex items-center justify-between gap-12">
            <Button
              variant="primary"
              onClick={() => setWhatShow("new")}
              className="w-2/4 max-w-96 m-auto"
            >
              Modifier
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default SideBarShow;
