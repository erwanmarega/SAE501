import React from "react";
import clsx from "clsx";

interface InputHourProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  required?: boolean;
  className?: string;
  classNameContainer?: string;
}

const InputHour = ({
  name,
  value,
  onChange,
  min = "00:00",
  max = "23:59",
  required = false,
  className,
  classNameContainer,
}: InputHourProps) => {
  return (
    <form className={clsx("max-w-[8rem] mx-auto", classNameContainer)}>
      <div className="relative">
        {/* Icône Horloge à Droite */}
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

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
            "bg-white border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            className
          )}
        />
      </div>
    </form>
  );
};

export default InputHour;
