// File: /app/components/messages/MessageCard.tsx

import Profil from "@/app/components/profil/profil";
import React from "react";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";
import clsx from "clsx";

type MessageCardProps = {
  sender: string;
  time: string;
  text: string;
  fromMe?: boolean; // si c'est "moi" ou "l'autre"
};

const MessageCard: React.FC<MessageCardProps> = ({
  sender,
  time,
  text,
  fromMe,
}) => {
  return (
    <div
      className={`flex flex-col mb-4 gap-2 ${
        fromMe ? "items-end" : "items-start"
      }`}
    >
      {/* En-tête du message */}
      <section className={clsx("flex justify-end w-[444px] items-center")}>
        {/*<div className="bg-gray-200 rounded-full h-4 w-4"></div>*/}
        <P className="!text-xs">{time}</P>
      </section>

      {/* Corps du message */}
      <section>
        <div
          className={`${
            fromMe ? "bg-primary" : "bg-[#f7f7f7]"
          } w-max max-w-[450px] h-max py-3 px-4  rounded-lg`}
        >
          <P className={clsx("text-wrap", { "text-white text-wrap": fromMe })}>
            {text}
          </P>
        </div>
      </section>
    </div>
  );
};

export default MessageCard;
