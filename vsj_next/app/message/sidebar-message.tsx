import React from "react";
import Card from "../components/ui/card";
import Image from "next/image";
import InputSearch from "../components/ui/input-search";
import PersonCard from "./ui/person-card";
import H3 from "../components/ui/texts/h3";

type Person = {
  id: number;
  name: string;
  text: string;
  date: string;
  icon?: string;
};

interface SidebarMessageProps {
  searchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredPersons: Person[];
  selectedDiscussion: string;
  setSelectedDiscussion: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarMessage = ({
  searchValue,
  handleSearchChange,
  filteredPersons,
  selectedDiscussion,
  setSelectedDiscussion,
}: SidebarMessageProps) => {
  return (
    <Card className="col-start-1 w-full h-full !px-0">
      <header className="flex flex-col gap-4 relative">
        <Image
          src="/assets/icons/add_friend_message.svg"
          width={35}
          height={35}
          alt="Ajouter un contact"
          className="absolute top-2 right-2 z-10 bg-primary rounded-lg flex items-center justify-center m-auto p-2"
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
        {filteredPersons.map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            text={person.text}
            date={person.date}
            icon={person.icon}
            selectedDiscussion={selectedDiscussion}
            setSelectedDiscussion={setSelectedDiscussion}
          />
        ))}
      </main>
    </Card>
  );
};

export default SidebarMessage;
