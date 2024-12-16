import React, { useState, useRef } from "react";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
  icon: React.ReactNode; // Icône SVG associée à l'option
}

interface SelectWithIconsProps {
  name: string;
  options: Option[];
  placeholder?: string;
  className?: string; // Prop pour les classes personnalisées du conteneur principal
  classNameContainer?: string; // Prop pour les classes personnalisées du conteneur global
}

const SelectWithIcons = ({
  name,
  options,
  placeholder = "Select an option",
  className,
  classNameContainer,
}: SelectWithIconsProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string, icon: React.ReactNode) => {
    setSelectedValue(value);
    setSelectedIcon(icon);
    setOpen(false);
  };

  return (
    <div
      className={clsx("relative w-80", classNameContainer)}
      ref={dropdownRef}
    >
      <div
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {selectedIcon && <span>{selectedIcon}</span>}
          <span className="text-black font-mona font-medium text-sm">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : placeholder}
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
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option.value, option.icon)}
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
