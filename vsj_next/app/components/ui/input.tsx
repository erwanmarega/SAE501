import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // <-- Ajout de la prop optionnelle
}

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  className = "", // Valeur par défaut
}: InputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Label avec Mona Sans Semi-bold */}
      {/* Si tu utilises réellement le label, pense à l'afficher ici */}

      {/* Texte des inputs avec Mona Sans Medium */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          bg-white border border-gray-300 rounded-md 
          px-3 py-5 h-8 text-black font-mona font-medium text-sm 
          bg-transparent focus:outline-none focus:border-2 focus:border-black 
          appearance-none placeholder:font-normal
          
        `}
      />
    </div>
  );
};

export default Input;
