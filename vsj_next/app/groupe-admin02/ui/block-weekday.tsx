import React from "react";
import Card from "@/app/components/ui/card";
import P from "@/app/components/ui/texts/p";

const BlockWeekDay = ({
  dayNumber = "01",
  dayName = "Lundi",
  cardClassName = "",
  textClassName = "",
}) => {
  return (
    <Card
      className={`!h-32 !w-32 flex flex-col justify-between ${cardClassName}`}
    >
      <span className="font-outfit font-semibold text-[#6E6E6E] text-xl">
        {dayNumber}
      </span>
      <P className={`w-full m-auto mb-0 text-center ${textClassName}`}>
        {dayName}
      </P>
    </Card>
  );
};

export default BlockWeekDay;
