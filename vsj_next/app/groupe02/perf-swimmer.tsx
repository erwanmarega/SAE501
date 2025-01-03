import React, { useState } from "react";
import Card from "../components/ui/card";

const PerfSwimmer = () => {
  const options = [
    { id: "Natation Ados", label: "Natation Ados" },
    { id: "Aquagym", label: "Aquagym" },
    { id: "Aquabike", label: "Aquabike" },
  ];

  const [selected, setSelected] = useState<string>("License");

  return (
    <div className="grid grid-rows-9 h-[82.5vh] max-h-[700px] w-full max-w-[1500px] gap-5 mt-20">
      {/* Barre d'onglets */}
      <Card className="h-full w-max flex justify-between gap-4 rounded-xl">
        {options.map((option) => (
          <div
            key={option.id}
            className={`rounded-md cursor-pointer py-1 px-2 flex items-center ${
              selected === option.id
                ? "text-primary bg-primary/25"
                : "hover:text-primary hover:bg-primary/25"
            }`}
            onClick={() => handleClick(option.id)}
          >
            <h5>{option.label}</h5>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default PerfSwimmer;
