import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

const Input = ({ label, type, name, placeholder }: InputProps) => {
  return (
    <div className="flex flex-col">
      {/* Label avec Mona Sans Semi-bold */}

      {/* Texte des inputs avec Mona Sans Medium */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-3 py-5 h-8 w-80 max-w-md text-black font-mona font-medium text-sm bg-transparent focus:outline-none focus:border-2 focus:border-black appearance-none placeholder:font-normal"
      />
    </div>
  );
};

export default Input;
