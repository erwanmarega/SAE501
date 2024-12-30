"use client";

import React from "react";
import Profil from "@/app/components/profil/profil";
import Card from "@/app/components/ui/card";
import clsx from "clsx";

type SwimmerCardProps = {
  number: number;
  name: string;
  dob: string; // date of birth
  note: string;
  size: number;
};

const SwimmerCard: React.FC<SwimmerCardProps> = ({
  number,
  name,
  dob,
  note,
  size,
}) => {
  return (
    <Card
      className={clsx(
        "flex flex-row h-20 w-80 justify-between p-2 z-10 items-center",
        number % 2 === 0 ? "ml-0 mr-auto" : "mr-0 ml-auto"
      )}
    >
      <section className="flex gap-2">
        <Profil size={56} />
        <div className="flex-col justify-center items-center h-max">
          <h3 className="text-[#6E6E6E] font-outfit font-semibold text-nowrap">
            {name}
          </h3>
          <p className="text-xs font-mona text-[#3B3B3B]">{dob}</p>
        </div>
      </section>
      <p>{note}</p>
    </Card>
  );
};

export default SwimmerCard;
