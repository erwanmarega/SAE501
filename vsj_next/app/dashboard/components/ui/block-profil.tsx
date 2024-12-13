import Profil from "@/app/components/profil/profil";
import H6 from "@/app/components/ui/texts/h6";
import React from "react";

interface BlockProfilProps {
  name: string;
  bio: string;
}

const BlockProfil: React.FC<BlockProfilProps> = ({ name, bio }) => {
  return (
    <div
      className="grid grid-cols-[35px_1fr] gap-2 p-2 bg-gray-50 dark:bg-[#545454] rounded-xl"
      style={{ minWidth: 200 }}
    >
      <Profil size={35} />
      <div className="flex flex-col ">
        <H6>{name}</H6>
        <p className="text-3xs font-mona font-light text-[#636363]">{bio}</p>
      </div>
    </div>
  );
};

export default BlockProfil;
