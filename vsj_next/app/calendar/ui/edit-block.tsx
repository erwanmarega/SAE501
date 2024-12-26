// components/ui/edit-block.jsx

import React from "react";
import Image from "next/image";

interface EditBlockProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  groupName: string;
  additionalClasses?: string;
  isSelected: boolean;
  onClick: () => void;
}

const EditBlock: React.FC<EditBlockProps> = ({
  id,
  imageSrc,
  imageAlt,
  groupName,
  additionalClasses = "",
  isSelected,
  onClick,
}) => {
  let borderClass = "border-2 border-[#E5E7EB]";
  let opacityClass = "opacity-50";

  if (isSelected) {
    opacityClass = "opacity-100";
    if (groupName === "Ajouter") {
      borderClass = "border-2 border-primary";
    } else if (groupName === "Supprimer") {
      borderClass = "border-2 border-secondary-agenda";
    }
  }

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-xl bg-white ${borderClass} p-6 flex flex-col items-center cursor-pointer transition-opacity duration-150 ${opacityClass} ${additionalClasses}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={35}
        height={35}
        className="-mt-1"
      />
      <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
        {groupName}
      </h5>
    </div>
  );
};

export default EditBlock;
