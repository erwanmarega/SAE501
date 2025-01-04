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
  fromMe?: boolean; 
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
     
      <section className="flex justify-between w-[370px] items-center">
        <div className="flex items-center gap-2">
          {!fromMe && (
            <>
              <Profil size={50} /> <H4 className="!text-xl">{sender}</H4>
            </>
          )}
        </div>
        <P className="!text-xs">{time}</P>
      </section>

     
      <section>
        <div
          className={`${
            fromMe ? "bg-primary" : "bg-[#f7f7f7]"
          } w-[450px] h-max py-3 px-4 rounded-xl`}
        >
          <P className={clsx("text-wrap", { "text-white": fromMe })}>{text}</P>
        </div>
      </section>
    </div>
  );
};

export default MessageCard;
