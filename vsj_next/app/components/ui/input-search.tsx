import React from "react";
import Image from "next/image";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputSearch = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) => {
  return (
    <div className={`flex items-center w-max relative ${className}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          bg-white border border-gray-300 rounded-md 
          px-4 py-2 h-10 text-black font-medium text-sm 
          focus:outline-none focus:ring-2 focus:ring-black 
          placeholder-gray-400
        `}
      />

      <Image
        src="/assets/icons/search.svg"
        height={25}
        width={25}
        alt="Search"
        className="absolute right-2"
      />
    </div>
  );
};

export default InputSearch;
