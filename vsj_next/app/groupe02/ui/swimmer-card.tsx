"use client";

import React from "react";
import Profil from "@/app/components/profil/profil";
import Card from "@/app/components/ui/card";
import clsx from "clsx";

type SwimmerCardProps = {
  number: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  dob: string; // date of birth
  note: string;
  size: number;
  variant?: "default" | "small";
};

const SwimmerCard: React.FC<SwimmerCardProps> = ({
  number,
  name,
  first_name,
  last_name,
  dob,
  note,
  size,
  variant = "default",
}) => {
  return (
    <Card
      className={clsx(
        "flex flex-row justify-between p-2 z-10 items-center",
        variant === "default" &&
          `h-16 w-72 ${number % 2 === 0 ? "ml-0 mr-auto" : "mr-0 ml-auto"}`,
        variant === "small" && "h-16 w-[205px] !rounded-2xl !px-3"
      )}
    >
      <section className="flex gap-2">
        <Profil size={variant === "small" ? 44 : 50} />
        <div className="flex-col justify-center items-center h-max">
          <h3 className="text-[#2C2C2C] font-outfit font-base text-nowrap">
            {first_name} <span className="font-bold">{last_name}</span>
          </h3>
          <p className="text-xs font-mona text-[#3B3B3B] font-light">{dob}</p>
        </div>
      </section>
      {variant === "default" && <p>{note}</p>}
    </Card>
  );
};

export default SwimmerCard;
