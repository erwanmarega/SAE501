// components/ui/badge/Badge.tsx
"use client";

import React from "react";
import Image from "next/image";

interface BadgeProps {
  edit: boolean;
  text: string;
  onChange?: (newValue: string) => void;
}

const Badge = ({ edit, text, onChange }: BadgeProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <>
      {edit ? (
        <div className="relative inline-block">
          <Image
            src="/assets/icons/edit.svg"
            width={15}
            height={15}
            alt="Modifier catégorie"
            className="absolute left-3 top-2"
          />
          <select
            value={text}
            onChange={handleSelectChange}
            className="bg-primary/15 text-primary font-mona font-medium text-xs text-center whitespace-nowrap cursor-pointer rounded-full py-2 pl-8 appearance-none border-none focus:outline-none"
          >
            <option value="Brasses">Brasses</option>
            <option value="Crawl">Crawl</option>
            <option value="Dos Crawlé">Dos Crawlé</option>
            <option value="Papillon">Papillon</option>
          </select>
        </div>
      ) : (
        <div className="bg-primary/15 rounded-full py-2 px-4">
          <p className="text-primary font-mona font-medium text-xs text-center whitespace-nowrap flex gap-2 items-center cursor-pointer">
            {text}
          </p>
        </div>
      )}
    </>
  );
};

export default Badge;
