// components/ui/groupBlock.jsx
import React, { useState } from "react";
import Image from "next/image";

interface GroupBlockProps {
  id: string; // Ajout de l'ID
  imageSrc: string;
  imageAlt: string;
  groupName: string;
  additionalClasses?: string; // Optionnel pour ajouter des classes supplémentaires
}

const GroupBlock: React.FC<GroupBlockProps> = ({
  id,
  imageSrc,
  imageAlt,
  groupName,
  additionalClasses = "",
}) => {
  const [isHalfOpacity, setIsHalfOpacity] = useState(false);

  const handleClick = () => {
    setIsHalfOpacity((prev) => !prev);
  };

  return (
    <>
      <div
        id={id} // Assignation de l'ID
        onClick={handleClick} // Gestion du clic
        className={`rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center cursor-pointer transition-opacity duration-150 ${
          isHalfOpacity ? "opacity-100" : "opacity-50"
        } ${additionalClasses}`}
      >
        <Image
          src={"assets/icons/groups/groupA.svg"}
          alt={imageAlt}
          width={35}
          height={35}
          className="-mt-1"
        />
        <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
          {groupName}
        </h5>
      </div>
    </>
  );
};

export default GroupBlock;
