import React from "react";
import Card from "../components/ui/card";
import H5 from "../components/ui/texts/h5";
import P from "../components/ui/texts/p";
import BlockWeekDay from "./ui/block-weekday";

const EditPlanning = () => {
  const options = [
    { id: "01", day: "Lundi" },
    { id: "02", day: "Mardi" },
    { id: "03", day: "Mercredi" },
    { id: "04", day: "Jeudi" },
    { id: "05", day: "Vendredi" },
    { id: "06", day: "Samedi" },
    { id: "07", day: "Dimanche" },
  ];

  return (
    <div className="h-full pt-10 row-start-3 row-end-9">
      <h1 className="font-outfit font-base text-[#3B3B3B] text-xl">
        Semaine type
      </h1>
      <div className="border-2 border-dashed border-[#D9D9D9] h-full w-full rounded-lg p-2 flex flex-row items-center justify-around">
        {options.map((element) => {
          return <BlockWeekDay dayName={element.id} dayNumber={element.id} />;
        })}
      </div>
    </div>
  );
};

export default EditPlanning;
