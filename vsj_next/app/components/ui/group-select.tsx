"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Group from "./group";

interface GroupSelectProps {
  size?: number;
  onSelect?: (group: { label: string; icon: string }) => void; // Ajout de la prop onSelect
}

const originalPath =
  "M0 36C0 21.0011 0 13.5016 3.81966 8.2443C5.05325 6.5464 6.5464 5.05325 8.2443 3.81966C13.5016 0 21.0011 0 36 0H41C55.9989 0 63.4984 0 68.7557 3.81966C70.4536 5.05325 71.9468 6.5464 73.1803 8.2443C77 13.5016 77 21.0011 77 36C77 50.9989 77 58.4984 73.1803 63.7557C71.9468 65.4536 70.4536 66.9468 68.7557 68.1803C63.4984 72 55.9989 72 41 72H36C21.0011 72 13.5016 72 8.2443 68.1803C6.5464 66.9468 5.05325 65.4536 3.81966 63.7557C0 58.4984 0 50.9989 0 36Z";

// Fonction pour mettre à l'échelle le path
function scalePath(path: string, scale: number): string {
  return path.replace(/(\d+(\.\d+)?)/g, (match) => {
    const val = parseFloat(match);
    return (val * scale).toString();
  });
}

const groups = [
  { label: "Groupe A", icon: "/assets/icons/groups/groupA.svg" },
  { label: "Groupe B", icon: "/assets/icons/groups/groupB.svg" },
  { label: "Groupe C", icon: "/assets/icons/groups/groupC.svg" },
  { label: "Groupe D", icon: "/assets/icons/groups/groupD.svg" },
];

const GroupSelect: React.FC<GroupSelectProps> = ({ size = 77, onSelect }) => {
  const scaleFactor = size / 77;
  const finalHeight = 72 * scaleFactor;
  const scaledPath = scalePath(originalPath, scaleFactor);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(groups[2]); // Par défaut groupe C
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const selectGroup = (group: { label: string; icon: string }) => {
    setSelectedGroup(group);
    setIsOpen(false);
    if (onSelect) {
      onSelect(group); // Appel de la fonction de rappel avec le groupe sélectionné
    }
  };

  return (
    <div
      className="relative" // Ajout de `relative` pour le positionnement correct
      ref={ref} // Référence pour la détection des clics extérieurs
    >
      <div
        className="border-white border-2 hover:border-black p-[1px] cursor-pointer rounded-xl"
        onClick={toggleOpen}
      >
        <div
          className="relative bg-gray-100 overflow-hidden hover:bg-gray-200"
          style={{
            width: `${size}px`,
            height: `${finalHeight}px`,
            clipPath: `path("${scaledPath}")`,
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            {/* Utilisation de selectedGroup.icon */}
            <Image
              src={selectedGroup.icon}
              alt={selectedGroup.label}
              width={Math.floor(50 * scaleFactor)}
              height={Math.floor(50 * scaleFactor)}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute px-2 right-0 flex items-center border-2 border-gray-100 mt-2 bg-white rounded-xl shadow-lg z-10 w-max">
          <ul className="py-1">
            {groups.map((g) => (
              <li
                key={g.label}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer gap-2"
                onClick={() => selectGroup(g)}
              >
                <Group imagePath={g.icon} size={30} />
                <span className="text-sm">{g.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupSelect;
