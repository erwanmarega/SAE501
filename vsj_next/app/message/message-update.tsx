"use client";

import React, { useState } from "react";
import Card from "../components/ui/card";
import H3 from "../components/ui/texts/h3";
import InputSearch from "../components/ui/input-search";
import PersonCard from "./ui/person-card";
import Image from "next/image";
import Profil from "../components/profil/profil";
import H4 from "../components/ui/texts/h4";

// Type pour la liste de personnes
type Person = {
  id: number;
  name: string;
  text: string;
  date: string;
  icon?: string;
};

const MessageUpdate = () => {
  const [searchValue, setSearchValue] = useState("");

  // Ton tableau de personnes
  const persons: Person[] = [
    {
      id: 1,
      name: "Erwan",
      text: "Salut, c’est Erwan, je suis pas le meilleur...",
      date: "Dec 12",
      icon: "C",
    },
    {
      id: 2,
      name: "Alice",
      text: "Hello, je suis Alice, enchantée de vous rencontrer !",
      date: "Dec 13",
      icon: "A",
    },
    {
      id: 3,
      name: "Bob",
      text: "Salut, moi c’est Bob, j'adore coder en Next.js !",
      date: "Dec 14",
      icon: "B",
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Filtre les personnes en fonction de la recherche
  const filteredPersons = persons.filter((person) => {
    const lowerSearch = searchValue.toLowerCase();
    return (
      person.name.toLowerCase().includes(lowerSearch) ||
      person.text.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="grid grid-cols-4 h-[82.5vh] max-h-[575px] w-full max-w-[1500px] gap-5 mt-20 ">
      <Card className="col-start-1 w-full h-full !px-0">
        <header className="flex flex-col gap-4 relative">
          <Image
            src="/assets/icons/newmessage.svg"
            width={20}
            height={20}
            alt="Ajouter un contact"
            className="absolute top-2 right-2 z-10 bg-primary rounded-lg flex items-center justify-center m-auto p-4"
          />
          <H3 className="px-4">Mes contacts</H3>
          <InputSearch
            type="text"
            name="search"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            className="max-w-md items-center m-auto"
          />
        </header>
        <main className="grid mt-5">
          {/* On map sur la liste filtrée */}
          {filteredPersons.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              text={person.text}
              date={person.date}
              icon={person.icon}
            />
          ))}
        </main>
      </Card>
      <Card className="col-start-2 col-end-5 w-full h-full grid-rows-[50px_1fr_50px]">
        <header className="flex justify-between p-2 border-b-2 border-[#EBEBEB]">
          <div className="flex gap-2">
            <Profil size={65} className="" />
            <div>
              <H4 className="!text-2xl">Erwan</H4>
              <div className="flex gap-2 justify-center items-center">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <p>active</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/settingmessage.svg"
              alt="Paramètres message"
              width={5}
              height={5}
            />
          </div>
        </header>
        <main className="h-full w-full flex justify-center items-center">
          <h1>MESSAGE CONTAINER</h1>
        </main>
        <footer>
          <textarea name="" id="" className="bg-[#f7f7f7]">
            <Image
              src="/assets/icons/add_file.svg"
              alt="Paramètres message"
              width={5}
              height={5}
              className="left-2"
            />
          </textarea>
        </footer>
      </Card>
    </div>
  );
};

export default MessageUpdate;
