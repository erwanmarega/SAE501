// calendar-card.tsx
"use client";

import React, { useState } from "react";
import Card from "@/app/components/ui/card";
import RightCalendarArrow from "./ui/rightArrow-calendar";
import LeftCalendarArrow from "./ui/leftArrow-calendar";
import P from "@/app/components/ui/texts/p";
import CalendarComposant from "./calendar/calendar-composant";
import { addMonths, format } from "date-fns";
import { fr } from "date-fns/locale";
import Button from "@/app/components/ui/button";
import Image from "next/image";
import EditIcon from "@/public/assets/icons/edit.svg";
import H3 from "@/app/components/ui/texts/h3";
import { useEvents } from "./database/events-context";
import CalendarWeek from "./calendar/calendar-week";

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { whatShow, setWhatShow, userStatus, setSelectedEvent, nextEvent } =
    useEvents();

  function handleMonth(changeMonth: number) {
    setCurrentDate((prevDate) => addMonths(prevDate, changeMonth));
  }

  function whatCalendarShow(whatShow: string) {
    return <CalendarComposant currentDate={currentDate} />;
  }

  return (
    <Card className="!px-0 !py-0 h-full grid grid-rows-[1fr_5fr] select-none">
      <header className=" ">
        <div className="flex justify-between items-center px-4 py-4">
          <div className="grid grid-cols-[85px_1fr]">
            <div className="flex gap-2">
              <LeftCalendarArrow onClick={() => handleMonth(-1)} />
              <RightCalendarArrow onClick={() => handleMonth(+1)} />
            </div>
            <div>
              <H3 className="font-mona text-3xl font-bold flex gap-2">
                {format(currentDate, "MMMM", { locale: fr })}
                <span className="font-light">
                  {format(currentDate, "yyyy", { locale: fr })}
                </span>
              </H3>
            </div>
          </div>
          <div className="flex gap-2">
            {userStatus !== "swimmer" && (
              <Button variant="primary" className="max-w-12 max-h-10">
                <Image
                  src="assets/icons/editv2.svg"
                  width={30}
                  height={30}
                  alt="Modifier ce mois"
                  onClick={() => {
                    if (userStatus === "coach") {
                      setWhatShow("type");
                    } else if (userStatus === "admin") {
                      setWhatShow("edit-admin");
                    }
                  }}
                />
              </Button>
            )}

            <Button
              variant="soft"
              onClick={() => {
                setCurrentDate(new Date());
                setSelectedEvent(nextEvent);
              }}
            >
              Aujourd'hui
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 w-full">
          <P className="m-auto">Lundi</P>
          <P className="m-auto">Mardi</P>
          <P className="m-auto">Mercredi</P>
          <P className="m-auto">Jeudi</P>
          <P className="m-auto">Vendredi</P>
          <P className="m-auto">Samedi</P>
          <P className="m-auto">Dimanche</P>
        </div>
      </header>
      {whatCalendarShow(whatShow)}
    </Card>
  );
};

export default CalendarCard;
