"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

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
          "border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer",
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
          />
        </svg>
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
