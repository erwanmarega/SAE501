import React from "react";
import clsx from "clsx";

interface TextareaProps {
  name: string;
  placeholder: string;
  rows?: number;
  className?: string; // Prop pour les classes personnalisées du textarea
  classNameContainer?: string; // Prop pour les classes personnalisées du conteneur
}

const Textarea = ({
  name,
  placeholder,
  rows = 4, // Valeur par défaut pour le nombre de lignes
  className,
  classNameContainer,
}: TextareaProps) => {
  return (
    <div className={clsx("flex flex-col", classNameContainer)}>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 w-80 max-w-md text-black font-mona font-medium text-sm bg-transparent focus:outline-none focus:border-2 focus:border-black appearance-none placeholder:font-normal resize-y",
          className // Ajout des classes personnalisées ici
        )}
      />
    </div>
  );
};

export default Textarea;
