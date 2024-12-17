// calendar-composant.tsx

import React from "react";
import { fr } from "date-fns/locale";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  format,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import clsx from "clsx";
import Image from "next/image";
import { useEvents } from "../database/events-context";
import { useDroppable } from "@dnd-kit/core";

interface CalendarComposantProps {
  currentDate: Date;
}

const CalendarComposant = ({ currentDate }: CalendarComposantProps) => {
  const start = startOfWeek(startOfMonth(currentDate), { locale: fr });
  const end = endOfWeek(endOfMonth(currentDate), { locale: fr });
  let days = eachDayOfInterval({ start, end });

  // Force pour avoir toujours 42 jours
  const totalDaysNeeded = 42; // 6 semaines * 7 jours
  if (days.length < totalDaysNeeded) {
    const diff = totalDaysNeeded - days.length;
    const lastDay = days[days.length - 1];
    // Ajouter les jours suivants pour atteindre 42
    for (let i = 1; i <= diff; i++) {
      days.push(addDays(lastDay, i));
    }
  }

  const { dataEvents, draggingSessionId, setWhatShow } = useEvents();

  // Toujours 42 jours, donc 6 lignes
  const numRows = 6;

  return (
    <main
      className="grid grid-cols-7 h-full"
      style={{
        gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
      }}
    >
      {days.map((day) => {
        const formattedDate = format(day, "dd/MM/yyyy");
        const eventsForDay = dataEvents[formattedDate] || [];
        const firstEvent = eventsForDay[0] || null;

        const { isOver, setNodeRef } = useDroppable({
          id: formattedDate,
        });

        // Vérification si premier évènement est un entraînement vide
        let isAucunEntrainement = false;
        if (firstEvent && firstEvent.status === "training") {
          const titleIsEmpty =
            !firstEvent.title || firstEvent.title.trim() === "";
          const detailsAreEmpty =
            !firstEvent.details || Object.keys(firstEvent.details).length === 0;
          // "Aucun entraînement" si titre ET détails sont vides
          if (titleIsEmpty && detailsAreEmpty) {
            isAucunEntrainement = true;
          }
        }

        const blinkingClass =
          draggingSessionId && isAucunEntrainement ? "blinking-border" : "";

        let backgroundColor = "bg-white";
        if (!isSameMonth(day, currentDate)) {
          backgroundColor = "bg-gray-50";
        } else if (firstEvent && firstEvent.status === "training") {
          backgroundColor = "bg-[#EBF3FF] hover:border-primary";
        } else if (firstEvent && firstEvent.status === "competition") {
          backgroundColor = "bg-[#FEFDED] hover:border-secondary-map";
        }

        return (
          <div
            key={day.toISOString()}
            ref={setNodeRef}
            className={clsx(
              "border-[#F5F5F5] border-[1px] px-2 py-1 text-center flex flex-col justify-start items-start gap-1 ",
              backgroundColor,
              blinkingClass,
              {
                "opacity-50": !isSameMonth(currentDate, day),
                "border-2 border-primary": isOver,
                "cursor-pointer hover:rounded-md hover:shadow-xl hover:-translate-y-1 hover:border-2 transition-all":
                  firstEvent?.status === "training" ||
                  firstEvent?.status === "competition",
              }
            )}
            onClick={() => {
              firstEvent?.status === "training" && setWhatShow("new");
            }}
          >
            <p className="font-outfit font-semibold text-sm text-[#6E6E6E]">
              {day.getDate()}
            </p>

            {
              firstEvent ? (
                firstEvent.status === null ? null : firstEvent.status ===
                  "training" ? (
                  (() => {
                    const titleIsEmpty =
                      !firstEvent.title || firstEvent.title.trim() === "";
                    const detailsAreEmpty =
                      !firstEvent.details ||
                      Object.keys(firstEvent.details).length === 0;

                    if (titleIsEmpty && detailsAreEmpty) {
                      // "Aucun entraînement"
                      return (
                        <div className="flex flex-col justify-center items-center gap-1 w-full h-full">
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
                      );
                    } else {
                      // Entraînement avec données
                      return (
                        <div className="h-[40%] w-[3px] rounded-full bg-primary">
                          <div className="flex flex-col items-start ml-2">
                            <p className="font-outfit text-2xs font-bold text-[#818181] truncate">
                              Entraînement
                            </p>
                            <p className="font-outfit text-2xs font-medium text-[#818181] truncate">
                              {firstEvent.title || "Séance"}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })()
                ) : firstEvent.status === "competition" ? (
                  // Compétition
                  <div className="h-[40%] w-[3px] rounded-full bg-secondary-map">
                    <div className="flex flex-col items-start ml-2">
                      <p className="font-outfit text-2xs font-bold text-[#818181] truncate">
                        Compétition
                      </p>
                      <p className="font-outfit text-2xs font-medium text-[#818181] truncate">
                        {firstEvent.title || "Compétition"}
                      </p>
                    </div>
                  </div>
                ) : null
              ) : null /* Aucun évènement du tout */
            }
          </div>
        );
      })}
    </main>
  );
};

export default CalendarComposant;
