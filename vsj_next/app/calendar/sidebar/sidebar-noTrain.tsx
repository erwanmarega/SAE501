import H4 from "@/app/components/ui/texts/h4";
import React from "react";
import Image from "next/image";

interface SidebarNoTrainProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarNoTrain = ({ setWhatShow }: SidebarNoTrainProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-center items-center gap-4">
      <Image
        src="/assets/icons/blue-croix.svg"
        alt="Croix"
        height={35}
        width={35}
      />
      <H4>Aucun entraînement</H4>
    </div>
  );
};

export default SidebarNoTrain;
