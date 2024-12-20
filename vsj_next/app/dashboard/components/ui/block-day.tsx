import clsx from "clsx";
import React from "react";

interface BlockDayProps {
  date: string;
  name?: string;
  type?: string;
  active_hour?: string;
  duration?: string;
  coach?: string;
}

const BlockDay = ({
  date,
  name,
  type,
  active_hour,
  duration,
  coach,
}: BlockDayProps) => {
  // Extraire le jour de la date (format "DD/MM/YYYY")
  const day = date.split("/")[0];

  const isTraining = type === "entrainement";
  const isCompetition = type === "compétition";
  const isRestDay = !type; // si pas de type => jour de repos

  return (
    <div
      className={clsx(
        "bg-[#F7F7F7] dark:bg-icon-inactive-dark rounded-xl relative grid grid-rows-3 w-[6.5rem] h-20  select-none  ",

        {
          "border-primary border-2": isTraining,
          "border-secondary-map border-2": isCompetition,
        }
      )}
    >
      <header>
        <span className="font-outfit font-semibold text-lg absolute top-0 left-2 text-[#424242] dark:text-white">
          {day}
        </span>
        {active_hour && (
          <span className="font-outfit font-black text-2xs absolute top-[0.3rem] right-2 text-[#424242] dark:text-white">
            {active_hour}
          </span>
        )}
      </header>
      <main className="ml-4">
        {/* Affichage du type et du nom de l'activité si existe, sinon jour de repos */}
        {!isRestDay && (
          <>
            <div
              className={clsx("w-[0.2rem] h-5 absolute left-2 top-7", {
                "bg-primary": isTraining,
                "bg-secondary-map": isCompetition,
              })}
            ></div>
            <p className="font-outfit text-2xs font-normal text-[#636363] dark:text-[#CACACA]">
              <span className="font-medium ">
                {isTraining
                  ? "Entrainement"
                  : isCompetition
                  ? "Compétition"
                  : ""}
              </span>
              {name && ` ${name}`}
            </p>
          </>
        )}
      </main>
      {!isRestDay && coach && (
        <footer className="absolute bottom-1 right-1 text-[#636363]">
          <p className="font-outfit text-2xs font-normal dark:text-[#CACACA] truncate">
            Coach <span className="font-medium"> {coach}</span>
          </p>
        </footer>
      )}
    </div>
  );
};

export default BlockDay;
