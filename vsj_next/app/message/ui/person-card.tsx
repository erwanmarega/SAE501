"use client";

import React from "react";
import Profil from "@/app/components/profil/profil";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";

interface PersonCardProps {
  name: string;
  text: string;
  date: string;
  icon?: string; // Facultatif, si tu souhaites afficher une icône/lettre dans le footer
}

const PersonCard: React.FC<PersonCardProps> = ({ name, text, date, icon }) => {
  return (
    <div className="relative border-[#f7f7f7] border-t-2 w-full overflow-hidden hover:bg-gray-100 cursor-pointer">
      <section className="grid grid-cols-[50px_1fr] py-3 px-4 gap-4 w-full">
        <Profil size={52.5} />
        <main className="h-full w-5/6 flex flex-col justify-between">
          <H4 className="!text-xl">{name}</H4>
          <P className="truncate w-[90%]">{text}</P>
        </main>
        <footer className="absolute right-4 top-1 flex gap-2 items-center">
          <p>{date}</p>
          {icon && (
            <p className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center font-outfit text-xs font-bold">
              {icon}
            </p>
          )}
        </footer>
      </section>
    </div>
  );
};

export default PersonCard;
