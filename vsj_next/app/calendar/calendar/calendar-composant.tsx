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

  // Force pour avoir toujours 42 jours (6 semaines * 7 jours)
  const totalDaysNeeded = 42;
  if (days.length < totalDaysNeeded) {
    const diff = totalDaysNeeded - days.length;
    const lastDay = days[days.length - 1];
    for (let i = 1; i <= diff; i++) {
      days.push(addDays(lastDay, i));
    }
  }

  const {
    dataEvents,
    draggingSessionId,
    setWhatShow,
    setSelectedEvent,
    selectedEvent,
    userStatus,
  } = useEvents();

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
        const lastEvent = eventsForDay[eventsForDay.length - 1] || null;

        const { isOver, setNodeRef } = useDroppable({ id: formattedDate });

        const isOutsideMonth = !isSameMonth(day, currentDate);
        const noEventDetails =
          !lastEvent || Object.keys(lastEvent.details || {}).length === 0;
        const isSwimmerEmpty = userStatus === "swimmer" && noEventDetails;

        // Vérifier si entraînement vide (isAucunEntrainement)
        const isTraining = lastEvent && lastEvent.status === "training";
        const isCompetition = lastEvent && lastEvent.status === "competition";
        const isAucunEntrainement = isTraining && noEventDetails;

        const blinkingClass =
          draggingSessionId && isAucunEntrainement ? "blinking-border" : "";

        // Déterminer la couleur de fond
        let backgroundColor = "bg-white";
        if (isOutsideMonth || isSwimmerEmpty) {
          backgroundColor = "bg-gray-50";
        } else if (isTraining) {
          backgroundColor = "bg-[#EBF3FF] hover:border-primary";
        } else if (isCompetition) {
          backgroundColor = "bg-[#FEFDED] hover:border-secondary-map";
        }

        // Déterminer si ce jour est le selectedEvent
        const isSelected =
          selectedEvent &&
          selectedEvent.date === formattedDate &&
          lastEvent &&
          lastEvent.status !== null;

        let selectedBorderClass = "";
        if (isSelected) {
          if (isTraining) {
            selectedBorderClass = "border-primary rounded-md";
          } else if (isCompetition) {
            selectedBorderClass = "border-secondary-map border-4 rounded-md";
          }
        }

        // Conditions pour l'animation au drag
        const canHoverDrag = draggingSessionId && isAucunEntrainement;
        const isDragOver = canHoverDrag && isOver;

        // Condition pour le hover s'il y a un event non vide
        const hasNonEmptyEvent =
          lastEvent && lastEvent.status !== null && !noEventDetails;

        const numTrainings = eventsForDay.filter(
          (event) => event.status === "training"
        ).length;

        return (
          <div
            key={day.toISOString()}
            ref={setNodeRef}
            className={clsx(
              "border-[#F5F5F5] border-[1px] px-2 py-1 text-center flex flex-col justify-start items-start gap-1 relative",
              backgroundColor,
              blinkingClass,
              selectedBorderClass,
              {
                "opacity-50": isOutsideMonth,
                "cursor-pointer hover:rounded-md hover:shadow-xl hover:-translate-y-1 hover:border-primary border-2 transition-all":
                  canHoverDrag,
                "bg-primary/25": isDragOver,
                "cursor-pointer hover:rounded-md hover:-translate-y-2 transition-transform duration-200 hover:shadow-xl":
                  hasNonEmptyEvent,
              }
            )}
            onClick={() => {
              if (lastEvent && (isTraining || isCompetition)) {
                const titleIsEmpty =
                  !lastEvent.title || lastEvent.title.trim() === "";

                if (!titleIsEmpty) {
                  setSelectedEvent({ date: formattedDate, event: lastEvent });
                  numTrainings > 1 ? setWhatShow("shows") : setWhatShow("show");
                } else if (userStatus === "coach") {
                  setWhatShow("new");
                }
              }
            }}
          >
            {numTrainings > 1 && (
              <div className="bg-primary rounded-full h-4 w-4 absolute flex items-center justify-center top-2 right-2">
                <p className="font-outfit font-black text-white text-3xs">
                  {numTrainings}
                </p>
              </div>
            )}

            <p className="font-outfit font-semibold text-sm text-[#6E6E6E]">
              {day.getDate()}
            </p>

            {lastEvent && lastEvent.status !== null ? (
              isTraining ? (
                (() => {
                  const titleIsEmpty =
                    !lastEvent.title || lastEvent.title.trim() === "";
                  const detailsAreEmpty =
                    !lastEvent.details ||
                    Object.keys(lastEvent.details).length === 0;

                  // Afficher "Aucun entraînement" uniquement si non-swimmer
                  if (
                    titleIsEmpty &&
                    detailsAreEmpty &&
                    userStatus !== "swimmer"
                  ) {
                    return (
                      <div className="flex flex-col justify-center items-center gap-1 w-full h-full">
                        <Image
                          src="/assets/icons/emptyCalendar.svg"
                          width={20}
                          height={20}
                          alt="Jour vide"
                        />
                        <p className="font-outfit text-2xs font-medium text-[#818181]">
                          Entraînement
                        </p>
                      </div>
                    );
                  } else if (!titleIsEmpty) {
                    return (
                      <div className="h-[40%] w-[3px] rounded-full bg-primary">
                        <div className="flex flex-col items-start ml-2">
                          <p className="font-outfit text-2xs font-bold text-[#818181] truncate">
                            Entraînement
                          </p>
                          <p className="font-outfit text-2xs font-medium text-[#818181] truncate">
                            {lastEvent.title || "Séance"}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()
              ) : isCompetition ? (
                <div className="h-[40%] w-[3px] rounded-full bg-secondary-map">
                  <div className="flex flex-col items-start ml-2">
                    <p className="font-outfit text-2xs font-bold text-[#818181] truncate">
                      Compétition
                    </p>
                    <p className="font-outfit text-2xs font-medium text-[#818181] truncate">
                      {lastEvent.title || "Compétition"}
                    </p>
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        );
      })}
    </main>
  );
};

export default CalendarComposant;
