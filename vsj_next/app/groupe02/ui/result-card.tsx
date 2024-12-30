import React from "react";
import Card from "@/app/components/ui/card";
import Profil from "@/app/components/profil/profil";

type ResultCardProps = {
  position: string;
  name: string;
  date: string;
  location: string;
};

const ResultCard: React.FC<ResultCardProps> = ({
  position,
  name,
  date,
  location,
}) => {
  return (
    <Card className="flex flex-col w-56 h-40 justify-between">
      <header className="-mb-5">
        <p className="font-outfit font-semibold text-3xl text-[#3B3B3B]">
          {position}
          <span className="text-sm">ème</span>
        </p>
      </header>
      <main className="flex flex-row items-center justify-center gap-4">
        <Profil size={55} className="overflow-visible w-max" />
        <h3 className="text-[#6E6E6E] text-lg font-outfit font-semibold text-wrap w-28">
          {name}
        </h3>
      </main>
      <footer className="w-full flex justify-between">
        <p className="text-xs text-[#3B3B3B] font-mona font-light">{date}</p>
        <p className="text-xs text-[#3B3B3B] font-mona font-light">
          {location}
        </p>
      </footer>
    </Card>
  );
};

export default ResultCard;
