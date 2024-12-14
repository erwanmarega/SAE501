import React, { useEffect, useState } from "react";
import { fr } from "date-fns/locale";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  eachDayOfInterval,
  endOfMonth,
  isSameMonth,
} from "date-fns";
import clsx from "clsx";

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
  const DataEvents = [
    { "25/12/2024": "trainnig" },
    { "02/12/2024": "trainnig" },
    { "06/12/2024": "competition" },
    { "31/12/2024": "trainnig" },
    { "03/01/2025": "competition" },
  ];

  return (
    <main
      className="grid grid-cols-7 h-full"
      style={{
        gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
      }}
    >
      {days.map((day) => {
        return (
          <div
            key={day.toISOString()}
            className={clsx(
              "border-[#F5F5F5] border-[1px] p-2 text-center flex",
              {
                "bg-gray-50": !isSameMonth(currentDate, day),
              }
            )}
          >
            {day.getDate()}
          </div>
        );
      })}
    </main>
  );
};

export default CalendarComposant;
