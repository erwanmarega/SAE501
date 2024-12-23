// components/ui/select-withIcons.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion"; // Import de Framer Motion

interface Option {
  value: number;
  label: string;
  icon: React.ReactNode;
}

interface SelectWithIconsProps {
  name: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  classNameContainer?: string;
  value: number; // Valeur contrôlée
  onChange: (newValue: number) => void; // Callback onChange avec la valeur directement
}

const SelectWithIcons = ({
  name,
  options,
  placeholder = "Select an option",
  className,
  classNameContainer,
  value,
  onChange,
}: SelectWithIconsProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermeture du menu au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: number) => {
    onChange(selectedValue); // Appel du callback avec la nouvelle valeur
    setOpen(false);
  };

  return (
    <div className={clsx("relative", classNameContainer)} ref={dropdownRef}>
      <div
        className={clsx(
          "bg-gray-100 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer group",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {selectedOption && <span>{selectedOption.icon}</span>}
          <span className="text-black font-mona font-medium text-sm">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        {/* SVG animé avec rotation */}
        <motion.svg
          width="17"
          height="15"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            "h-3 w-3 transition-colors ml-2",
            {
              "text-[#348CFF]": open, // Couleur bleue quand ouvert
              "text-gray-400": !open, // Couleur grise par défaut
            },
            "group-hover:text-[#348CFF]" // Couleur bleue au survol du parent
          )}
          animate={{ rotate: open ? 180 : 0 }} // Rotation conditionnelle
          transition={{ type: "spring", stiffness: 300, damping: 20 }} // Transition fluide
        >
          <path
            d="M10.1904 13.3267C9.40538 14.5682 7.59462 14.5682 6.8096 13.3267L0.481283 3.3189C-0.360795 1.98721 0.596086 0.25 2.17168 0.25H14.8283C16.4039 0.25 17.3608 1.98721 16.5187 3.3189L10.1904 13.3267Z"
            className="fill-current"
          />
        </motion.svg>
      </div>

      {open && (
        <ul className="absolute left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option.value)}
            >
              {option.icon}
              <span className="text-black font-mona font-medium text-sm">
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectWithIcons;
