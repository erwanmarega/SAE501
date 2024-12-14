import React, { useEffect, useState } from "react";
import { fr } from "date-fns/locale";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  eachDayOfInterval,
  endOfMonth,
  isSameMonth,
  format,
} from "date-fns";
import clsx from "clsx";
import Image from "next/image";

interface SessionType {
  coach: string[];
  intensity: "facile" | "moyen" | "difficile";
  category: "crawl" | "dos crawlé" | "papillon" | "brasse";
  duration: string;
  description: string;
}

const SessionTypes: Record<string, SessionType> = {
  "Entraînement Intensif Crawl": {
    coach: ["Martin"],
    intensity: "difficile",
    category: "crawl",
    duration: "2 heures",
    description: "Entraînement intensif pour améliorer la vitesse en crawl.",
  },
  "Session Technique Dos Crawlé": {
    coach: ["Martin", "Dupont"],
    intensity: "moyen",
    category: "dos crawlé",
    duration: "1.5 heures",
    description: "Session axée sur la technique de dos crawlé et l'endurance.",
  },
  "Compétition Papillon Interne": {
    coach: ["Martin", "Dupont", "Lefèvre"],
    intensity: "difficile",
    category: "papillon",
    duration: "2 heures",
    description: "Compétition interne pour évaluer les progrès en papillon.",
  },
  "Récupération Brasse": {
    coach: ["Martin"],
    intensity: "facile",
    category: "brasse",
    duration: "1 heure",
    description: "Récupération active et technique de brasse.",
  },
  "Compétition Régionale Papillon": {
    coach: ["Martin", "Dupont", "Lefèvre"],
    intensity: "difficile",
    category: "papillon",
    duration: "3 heures",
    description:
      "Compétition régionale avec focus sur la performance en papillon.",
  },
};

interface CalendarComposantProps {
  currentDate: Date;
}

const CalendarComposant = ({ currentDate }: CalendarComposantProps) => {
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfWeek(startOfMonth(currentDate), { locale: fr });
    const end = endOfWeek(endOfMonth(currentDate), { locale: fr });
    setDays(eachDayOfInterval({ start, end }));
  }, [currentDate]);

  const numRows = Math.ceil(days.length / 7);

  // Temporaire
  const DataEvents: Record<
    string,
    {
      type: string;
      title: string;
      details: Record<string, any> | null;
      isDefined: boolean;
    }
  > = {
    "25/12/2024": {
      type: "trainning",
      title: "",
      details: null,
      isDefined: false,
    },
    "02/12/2024": {
      type: "trainning",
      title: "",
      details: null,
      isDefined: false,
    },
    "06/12/2024": {
      type: "competition",
      title: "Compétition Papillon Interne",
      details: {
        coach: ["Martin", "Dupont", "Lefèvre"],
        intensity: "difficile",
        category: "papillon",
        duration: "2 heures",
        description:
          "Compétition interne pour évaluer les progrès en papillon.",
      },
      isDefined: true,
    },
    "31/12/2024": {
      type: "trainning",
      title: "",
      details: null,
      isDefined: false,
    },
    "03/01/2025": {
      type: "competition",
      title: "",
      details: {
        coach: ["Martin", "Dupont", "Lefèvre"],
        intensity: "difficile",
        category: "papillon",
        duration: "2 heures",
        description:
          "Compétition interne pour évaluer les progrès en papillon.",
      },
      isDefined: true,
    },
  };

  return (
    <main
      className="grid grid-cols-7 h-full"
      style={{
        gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
      }}
    >
      {days.map((day) => {
        const formattedDate = format(day, "dd/MM/yyyy");
        const eventData = DataEvents[formattedDate];
        const eventType = eventData?.type;
        const isDefined = eventData?.isDefined ?? false;

        let backgroundColor = "bg-white";
        if (eventType === "trainning") {
          backgroundColor = "bg-[#EBF3FF] hover:border-primary";
        } else if (eventType === "competition") {
          backgroundColor = "bg-[#FEFDED] hover:border-secondary-map";
        } else if (!isSameMonth(day, currentDate)) {
          backgroundColor = "bg-gray-50";
        }

        const eventClasses =
          eventData &&
          "cursor-pointer hover:shadow-xl hover:rounded-md hover:-translate-y-1";

        return (
          <div
            key={day.toISOString()}
            className={clsx(
              "border-[#F5F5F5] border-[1px] px-2 py-1 text-center flex flex-col justify-start items-start gap-1 transition-all",
              backgroundColor,
              eventClasses,
              {
                "opacity-50": !isSameMonth(currentDate, day),
              }
            )}
          >
            <p className="font-outfit font-semibold text-sm text-[#6E6E6E]">
              {day.getDate()}
            </p>
            {eventData && isDefined && (
              <div
                className={clsx("h-[40%] w-[3px] rounded-full", {
                  "bg-primary": eventType === "trainning",
                  "bg-secondary-map": eventType === "competition",
                })}
              >
                <div className="flex flex-col items-start ml-2">
                  <p className="font-outfit text-2xs font-bold text-[#818181]">
                    {eventType === "trainning" ? "Entraînement" : "Compétition"}
                  </p>
                  <p className="font-outfit text-2xs font-medium text-[#818181] text-nowrap">
                    {eventType === "trainning" ? "10X200m" : "Course finale"}
                  </p>
                </div>
              </div>
            )}
            {eventData && !isDefined && (
              <div
                className="flex flex-col justify-center items-center gap-1 w-full h-full
              "
              >
                <Image
                  src="/assets/icons/emptyCalendar.svg"
                  width={20}
                  height={20}
                  alt="Jour vide"
                />
                <p className="font-outfit text-2xs font-medium text-[#818181]">
                  Aucun entraînement
                </p>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default CalendarComposant;
