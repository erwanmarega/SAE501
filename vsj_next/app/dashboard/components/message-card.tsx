import React from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";
import { Message } from "postcss";
import clsx from "clsx";
import Profil from "@/app/components/profil/profil";

interface MessageCardProps {
  position: number;
}

const MessageCard = ({ position }: MessageCardProps) => {
  const { language } = useLanguage();
  const colposition =
    position === 1 ? " col-start-4 col-end-5 " : " col-start-5 col-end-5 ";

  return (
    <Card
      className={clsx(
        "w-full h-full row-start-1 row-end-3 grid grid-cols-[max-content_1fr] gap-2",
        colposition
      )}
    >
      <div className="-ml-1 flex items-center justify-center relative">
        <Profil size={50} />
      </div>
      <div className="flex flex-col w-full">
        <header className="flex flex-row justify-between w-full">
          <div className="relative">

        <div className="bg-secondary-message h-4 w-4 rounded-full absolute top-1 -right-1 border-white dark:border-[#2E2E2E] border-4"></div>

          <h3 className="font-outfit font-medium text-base text-[#424242] text-nowrap">
            Renaud emel
          </h3>          </div>

          <p className="font-outfit font-black text-xs mt-1 text-[#424242]">
            18:20
          </p>
        </header>
        <main>
          <p className="font-mona text-2xs font-light text-[#636363]">
            Salut, j’ai lancé une startup à 10M et je vous donne des ailes.
            #redbull
          </p>
        </main>
      </div>
    </Card>
  );
};

export default MessageCard;
