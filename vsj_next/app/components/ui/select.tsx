import React from "react";
import clsx from "clsx";

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string; // Prop pour les classes personnalisées du select
  classNameContainer?: string; // Prop pour les classes personnalisées du conteneur
}

const Select = ({
  name,
  options,
  placeholder,
  className,
  classNameContainer,
}: SelectProps) => {
  return (
    <div className={clsx("relative flex flex-col", classNameContainer)}>
      <select
        name={name}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 w-80 max-w-md text-black font-mona font-medium text-sm bg-transparent focus:outline-none focus:border-2 focus:border-black appearance-none placeholder:font-normal",
          className
        )}
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Flèche SVG */}
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
