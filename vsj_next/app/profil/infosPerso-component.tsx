"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/ui/card";
import Input from "../components/ui/input";
import EditIcon from "../components/ui/interactive-icons/edit";
import HForm from "../components/ui/texts/h-form";
import HFormData from "../components/ui/texts/h-form-data";
import H4 from "../components/ui/texts/h4";

const InfosPersoComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setName(data.name);
        setPrenom(data.prenom);
        setDateNaissance(data.dateNaissance);
        setAdresse(data.adresse);
        setCodePostal(data.codePostal);
        setVille(data.ville);
        setTelephone(data.telephone);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/swimmer/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: name,
          prenom: prenom,
          dateNaissance: dateNaissance,
          adresse: adresse,
          codePostal: codePostal,
          ville: ville,
          telephone: telephone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated successfully:", data);
        setIsEditing(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Card
      id="Infos-perso"
      className="flex flex-col row-start-3 row-end-6 relative !px-6 !py-4 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-6 h-full"
    >
      <EditIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={toggleEditing}
        isActive={isEditing}
      />

      <H4 className="mb-4">Informations personnelles</H4>

      <main className="h-full w-full grid grid-cols-2 grid-rows-5 gap-y-4">
        <HForm className="row-start-1 col-start-1 self-center">Nom complet</HForm>
        <div className="row-start-1 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{name}</HFormData>
          )}
        </div>

        <HForm className="row-start-2 col-start-1 self-center">Prénom</HForm>
        <div className="row-start-2 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder="Entrez votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{prenom}</HFormData>
          )}
        </div>

        <HForm className="row-start-3 col-start-1 self-center">Date de naissance</HForm>
        <div className="row-start-3 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="date"
              placeholder="Entrez votre date de naissance"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{dateNaissance}</HFormData>
          )}
        </div>

        <HForm className="row-start-4 col-start-1 self-center">Adresse</HForm>
        <div className="row-start-4 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder="Entrez votre adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{adresse}</HFormData>
          )}
        </div>

        <HForm className="row-start-5 col-start-1 self-center">Code Postal</HForm>
        <div className="row-start-5 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder="Entrez votre code postal"
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{codePostal}</HFormData>
          )}
        </div>

     

        <HForm className="row-start-7 col-start-1 self-center">Téléphone</HForm>
        <div className="row-start-7 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder="Entrez votre téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{telephone}</HFormData>
          )}
        </div>
      </main>

      {isEditing && (
        <button onClick={handleSave} className="mt-4 self-end">
          Save
        </button>
      )}
    </Card>
  );
};

export default InfosPersoComponent;