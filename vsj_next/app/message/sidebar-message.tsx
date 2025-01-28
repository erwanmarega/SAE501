"use client";

import React, { useState } from "react";
import Image from "next/image";
import Card from "../components/ui/card";
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
  setSelectedDiscussion: (id: string) => void;
}

const SidebarMessage = ({
  searchValue,
  handleSearchChange,
  filteredPersons,
  selectedDiscussion,
  setSelectedDiscussion,
}: SidebarMessageProps) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false); 
  const [addUserSearch, setAddUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const uniquePersons = Array.from(
    new Map(filteredPersons.map((person) => [person.id, person])).values()
  );

  const handleAddUserSearch = async () => {
    if (addUserSearch.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Token d'authentification manquant !");
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/messages/search-contact?query=${addUserSearch}`;
      console.log('Appel API:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur de l'API:", errorData);
        throw new Error('Erreur lors de la recherche d\'utilisateur');
      }

      const data = await response.json();
      console.log("Résultats de la recherche:", data); 
      setSearchResults(data);
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateur:", error);
      alert("Une erreur est survenue lors de la recherche de l'utilisateur.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddUser = async (prenom: string, nom: string) => {
    try {
      setIsAddingUser(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Token d'authentification manquant !");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages/add-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prenom }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur de l'API lors de l'ajout:", errorData);
        throw new Error("Erreur lors de l'ajout du contact");
      }

      const data = await response.json();
      console.log("Utilisateur ajouté:", data); 

      setSearchResults([]);
      setAddUserSearch("");
      setShowAddUserModal(false); 

      const newContact: Person = {
        id: data.contactId,
        name: data.name,
        text: "Vous pouvez maintenant discuter avec cette personne.", 
        date: new Date().toISOString(),
        icon: "/assets/icons/Avatar03.png",
      };

      filteredPersons.push(newContact);
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact:", error);
    } finally {
      setIsAddingUser(false);
    }
  };

  return (
    <Card className="col-start-1 w-full h-full !px-0 overflow-hidden">
      <header className="flex flex-col gap-4 relative p-4 border-b border-gray-200">
        <Image
          src="/assets/icons/add_friend_message.svg"
          width={35}
          height={35}
          alt="Ajouter un contact"
          className="absolute top-4 right-4 z-10 bg-primary rounded-lg p-2 cursor-pointer hover:opacity-80"
          onClick={() => setShowAddUserModal(true)} 
        />
        <H3 className="text-lg font-semibold">Mes contacts</H3>

        <div className="flex items-center gap-2 w-full">
          <InputSearch
            type="text"
            name="search"
            placeholder="Rechercher un contact..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      </header>

      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <h3 className="text-xl font-semibold mb-4">Rechercher un contact</h3>
            <div className="flex items-center gap-2 mb-4">
              <InputSearch
                type="text"
                name="addUserSearch"
                placeholder="Rechercher un utilisateur (Prénom Nom)..."
                value={addUserSearch}
                onChange={(e) => setAddUserSearch(e.target.value)}
                className="w-full"
              />
              <button
                onClick={handleAddUserSearch}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="loader"></span>
                ) : (
                  <Image
                    src="/"
                    width={20}
                    height={20}
                    alt="Rechercher utilisateur"
                  />
                )}
              </button>
            </div>

            {searchResults.length > 0 ? (
              <ul className="mt-2 max-h-40 overflow-y-auto">
                {searchResults.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span>{user.name}</span>
                    <button
                      onClick={() => handleAddUser(user.name.split(' ')[0], user.name.split(' ')[1])}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      disabled={isAddingUser}
                    >
                      {isAddingUser ? "Ajout..." : "Ajouter"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-2">Aucun utilisateur trouvé.</p>
            )}

            <button
              onClick={() => setShowAddUserModal(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded-md w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-2 space-y-2">
        {uniquePersons.length > 0 ? (
          uniquePersons.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              text={person.text}
              date={person.date}
              selectedDiscussion={selectedDiscussion}
              setSelectedDiscussion={() => setSelectedDiscussion(String(person.id))}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            Aucun contact trouvé.
          </div>
        )}
      </main>
    </Card>
  );
};

export default SidebarMessage;
