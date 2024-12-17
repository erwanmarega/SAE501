"use client";

import React from "react";
import clsx from "clsx";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  classNameContainer?: string;
  value: string; // Ajout de la prop value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ajout de la prop onChange
}

const Input = ({
  type,
  name,
  placeholder,
  className,
  classNameContainer,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={clsx("flex flex-col", classNameContainer)}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value} // Utilisation de la valeur contrôlée
        onChange={onChange} // Déclenchement du callback onChange
        className={clsx(
          "bg-white border border-gray-300 rounded-md px-3 py-5 h-8 w-full max-w-md text-black font-mona font-medium text-sm focus:outline-none focus:border-2 focus:border-black appearance-none placeholder:font-normal",
          className
        )}
      />
    </div>
  );
};

export default Input;
