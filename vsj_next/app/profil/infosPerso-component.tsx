"use client";

import React, { useState } from "react";
import Card from "../components/ui/card";
import Input from "../components/ui/input";
import EditIcon from "../components/ui/interactive-icons/edit";
import HForm from "../components/ui/texts/h-form";
import HFormData from "../components/ui/texts/h-form-data";
import H4 from "../components/ui/texts/h4";

const InfosPersoComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("John Doe");
  const [birthdate, setBirthdate] = useState("1990-01-01");
  const [sex, setSex] = useState("male");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("06.24.28.35.35");

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Bascule entre mode édition et affichage normal
  };

  return (
    <Card
      id="Infos-perso"
      className="flex flex-col row-start-3 row-end-6 relative !px-6 !py-4 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-6 h-full"
    >
      <EditIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={toggleEditing}
        isActive={isEditing} // Passe l'état actif à l'icône
      />

      <H4 className="mb-4"> Informations personnelles</H4>

      <main className="h-full w-full grid grid-cols-2 grid-rows-5 gap-y-4">
        {/* Nom complet */}
        <HForm className="row-start-1 col-start-1 self-center ">
          Nom complet
        </HForm>
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

        {/* Date de naissance */}
        <HForm className="row-start-2 col-start-1 self-center ">
          Date de naissance
        </HForm>
        <div className="row-start-2 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="date"
              placeholder="JJ/MM/AAAA"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData className="">{birthdate}</HFormData>
          )}
        </div>

        {/* Sexe */}
        <HForm className="row-start-3 col-start-1 self-center">Sexe</HForm>
        <div className="row-start-3 col-start-2 flex items-center">
          {isEditing ? (
            <select
              className="border rounded px-3 py-2 w-full"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          ) : (
            <HFormData>
              {sex === "male" ? "Homme" : sex === "female" ? "Femme" : "Autre"}
            </HFormData>
          )}
        </div>

        {/* Email */}
        <HForm className="row-start-4 col-start-1 self-center">Email</HForm>
        <div className="row-start-4 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{email}</HFormData>
          )}
        </div>

        {/* Téléphone */}
        <HForm className="row-start-5 col-start-1 self-center ">
          Téléphone
        </HForm>
        <div className="row-start-5 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="tel"
              placeholder="Entrez votre numéro de téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="!w-full"
            />
          ) : (
            <HFormData>{phone}</HFormData>
          )}
        </div>
      </main>
    </Card>
  );
};

export default InfosPersoComponent;
