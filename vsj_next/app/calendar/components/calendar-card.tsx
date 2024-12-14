"use client";

import React, { useState } from "react";
import Card from "@/app/components/ui/card";
import RightCalendarArrow from "./ui/rightArrow-calendar";
import LeftCalendarArrow from "./ui/leftArrow-calendar";
import P from "@/app/components/ui/texts/p";
import CalendarComposant from "./calendar-composant";
import { addMonths, format } from "date-fns";
import { fr } from "date-fns/locale";

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  function handleMonth(changeMonth: number) {
    setCurrentDate((prevDate) => addMonths(prevDate, changeMonth));
  }

  return (
    <Card className="h-full grid grid-rows-[90px_1fr] py-0 px-0 select-none">
      <header className="px-2 py-2">
        <div className="flex justify-between items-center px-1 py-2">
          <div className="grid grid-cols-[85px_1fr] ">
            <div className="flex gap-2">
              {" "}
              <LeftCalendarArrow onClick={() => handleMonth(-1)} />
              <RightCalendarArrow onClick={() => handleMonth(+1)} />
            </div>

            <div>
              <h3 className="font-mona text-3xl font-bold flex gap-2 ">
                {format(currentDate, "MMMM", { locale: fr })}
                <span className="font-light">
                  {format(currentDate, "yyyy", { locale: fr })}
                </span>
              </h3>
            </div>
          </div>
          <div>{format(currentDate, "yyyy", { locale: fr })}</div>
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
      <CalendarComposant currentDate={currentDate} />
    </Card>
  );
};

export default CalendarCard;
