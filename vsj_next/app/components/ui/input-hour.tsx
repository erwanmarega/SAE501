"use client";

import React, { useRef } from "react";
import clsx from "clsx";

interface InputHourWithDurationProps {
  name: string;
  value: string; // Valeur contrôlée pour l'heure
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback pour changement d'heure
  duration: string; // Valeur contrôlée pour la durée
  onDurationChange: (newDuration: string) => void; // Callback pour changement de durée
  min?: string;
  max?: string;
  required?: boolean;
  className?: string;
  classNameContainer?: string;
}

const InputHourWithDuration = ({
  name,
  value,
  onChange,
  duration,
  onDurationChange,
  min = "00:00",
  max = "23:59",
  required = false,
  className,
  classNameContainer,
}: InputHourWithDurationProps) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDurationSelect = (selectedDuration: string) => {
    onDurationChange(selectedDuration);
    setDropdownOpen(false);
  };

  // Fermer le dropdown si on clique à l'extérieur
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      className={clsx("max-w-[13rem] mx-auto", classNameContainer)}
      ref={dropdownRef}
    >
      <div className="flex relative">
        {/* Champ Input de type Time */}
        <input
          type="time"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          required={required}
          className={clsx(
            "rounded-none rounded-s-lg bg-white border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            className
          )}
        />

        {/* Bouton Dropdown pour la Durée */}
        <button
          id="dropdown-duration-button"
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="border-s-0 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          {duration}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            id="dropdown-duration"
            className="absolute right-0 top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  type="button"
                  onClick={() => handleDurationSelect("30 minutes")}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  30 minutes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleDurationSelect("1 hour")}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  1 hour
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleDurationSelect("2 hours")}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  2 hours
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default InputHourWithDuration;
