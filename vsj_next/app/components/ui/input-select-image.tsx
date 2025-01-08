"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Profil from "../profil/profil";

interface Option {
  id: number | string;
  name: string;
}

interface InputSelectImageProps {
  options: Option[]; // Liste des options dynamiques
  placeholder?: string; // Texte de placeholder personnalisé
  onSelect?: (selected: Option | null) => void; // Callback lors de la sélection
}

const InputSelectImage = ({
  options = [],
  placeholder = "Rechercher un élément",
  onSelect,
}: InputSelectImageProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const selectRef = useRef<HTMLDivElement>(null);

  // Filtrer les options dynamiquement
  useEffect(() => {
    const filtered = searchTerm
      ? options.filter((option) =>
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  // Ferme le menu si on clique à l'extérieur du composant
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="w-56">
      <div className="bg-white border-2 border-[#f7f7f7] p-2 rounded-lg flex items-center">
        <Profil size={30} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsActive(true);
          }}
          onFocus={() => setIsActive(true)}
          placeholder={selectedValue ? selectedValue.name : placeholder}
          className="border-none outline-none ml-2 w-full text-sm"
        />
      </div>
      {isActive && (
        <section
          className="flex flex-col gap-4 mt-2 shadow-card border-2 border-[#f7f7f7] p-2 rounded-lg bg-white max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-[6px]
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          {filteredOptions.map((element) => (
            <div
              className="flex gap-1 items-center cursor-pointer hover:bg-gray-50 rounded-md px-1 py-2 relative"
              key={element.id}
              onClick={() => {
                setSelectedValue(element); // Stocke l'élément sélectionné
                setSearchTerm(""); // Réinitialise la recherche
                setIsActive(false);
                if (onSelect) onSelect(element); // Appelle le callback si fourni
              }}
            >
              <Profil size={30} />
              <h6 className="font-mona text-sm text-gray-900">
                {element.name}
              </h6>
              {selectedValue?.id === element.id && (
                <Image
                  alt="Validé"
                  width={15}
                  height={15}
                  src={"/assets/icons/validate.svg"}
                  className="absolute right-2"
                />
              )}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="text-gray-500 text-sm text-center">
              Aucun résultat trouvé
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default InputSelectImage;
