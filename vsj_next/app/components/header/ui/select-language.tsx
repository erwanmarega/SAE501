import React from "react";
import Image from "next/image";
import GlobeLanguageIcon from "../../ui/interactive-icons/globeLanguage";

const SelectLanguage = () => {
  return (
    <div className="flex flex-row w-10 h-10">
      <GlobeLanguageIcon />
      <Image
        src="/assets/icons/globeLanguage.svg"
        alt="Changer de laangue"
        width={25}
        height={25}
      />
      <div className="w-4 rounded-3xl">
        <Image src="/assets/icons/frenchFlagLove.svg" alt="France" />
      </div>
    </div>
  );
};

export default SelectLanguage;
