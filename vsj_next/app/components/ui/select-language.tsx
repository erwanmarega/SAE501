import React from "react";
import { Globe } from "lucid-react";
import Image from "next/image";

const SelectLanguage = () => {
  return (
    <div>
      <Globe className="w-4 h-4" />
      <div className="w-4 rounded-3xl">
        <Image src="/assets/icons/frenchFlagLove.svg" alt="France" />
      </div>
    </div>
  );
};

export default SelectLanguage;
