import React from "react";
import clsx from "clsx";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  className?: string; // Nouvelle prop pour les classes personnalisées
  classNameContainer?: string;
}

const Input = ({
  type,
  name,
  placeholder,
  className,
  classNameContainer,
}: InputProps) => {
  return (
    <div className={clsx("flex flex-col", classNameContainer)}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-5 h-8 w-80 max-w-md text-black font-mona font-medium text-sm bg-transparent focus:outline-none focus:border-2 focus:border-black appearance-none placeholder:font-normal",
          className // Ajout des classes personnalisées ici
        )}
      />
    </div>
  );
};

export default Input;
