import React from "react";
import Profil from "@/app/components/profil/profil";
import Image from "next/image";
import { PhoneIcon } from "@/app/components/ui/interactive-icons/phoneIcon";
import { EmailIcon } from "@/app/components/ui/interactive-icons/emailIcon";
import Link from "next/link";
import { useEvents } from "@/app/calendar/database/events-context";

interface PersonCardProps {
  name: string;
  role: string;
  email: string;
  phone: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  name,
  role,
  email,
  phone,
}) => {
  const { setWhatShow } = useEvents();

  const handleLinkClick = (message: string) => {
    setWhatShow(message); 
  };

  return (
    <div className="bg-[#f7f7f7] rounded-xl p-2 h-28 w-64 flex flex-col justify-between relative">
      <header className="flex gap-2">
        <Profil size={40} />
        <div>
          <p className="font-outfit font-base">{name}</p>
          <p className="font-mona font-light text-[#3B3B3B] text-xs">{role}</p>
        </div>
      </header>

      <main className="flex flex-col gap-2">
        <div className="flex gap-2 pl-2 group cursor-pointer items-center">
          <EmailIcon />
          <p className="font-mona text-xs text-[#3B3B3B]">{email}</p>
        </div>

        <div className="flex gap-2 pl-2 group cursor-pointer items-center">
          <PhoneIcon />
          <p className="font-mona text-xs text-[#3B3B3B]">{phone}</p>
        </div>
        <Link href="/" onClick={() => handleLinkClick("Message")}>
          <div className="bg-primary cursor-pointer rounded-lg p-2 flex justify-center items-center w-max absolute right-2 bottom-2 hover:bg-[#3385F1]">
            <Image
              src="/assets/icons/send.svg"
              width={15}
              height={15}
              alt="Envoyer"
            />
          </div>
        </Link>
      </main>
    </div>
  );
};

export default PersonCard;
