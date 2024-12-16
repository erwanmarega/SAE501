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
        {/* Nouvelle Icône Horloge à Droite */}
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4.5V10.5H14.5M19 10.5C19 11.6819 18.7672 12.8522 18.3149 13.9442C17.8626 15.0361 17.1997 16.0282 16.364 16.864C15.5282 17.6997 14.5361 18.3626 13.4442 18.8149C12.3522 19.2672 11.1819 19.5 10 19.5C8.8181 19.5 7.64778 19.2672 6.55585 18.8149C5.46392 18.3626 4.47177 17.6997 3.63604 16.864C2.80031 16.0282 2.13738 15.0361 1.68508 13.9442C1.23279 12.8522 1 11.6819 1 10.5C1 8.11305 1.94821 5.82387 3.63604 4.13604C5.32387 2.44821 7.61305 1.5 10 1.5C12.3869 1.5 14.6761 2.44821 16.364 4.13604C18.0518 5.82387 19 8.11305 19 10.5Z"
              stroke="#C3C4C6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
