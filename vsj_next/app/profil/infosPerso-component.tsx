"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/ui/card";
import Input from "../components/ui/input";
import EditIcon from "../components/ui/interactive-icons/edit";
import HForm from "../components/ui/texts/h-form";
import HFormData from "../components/ui/texts/h-form-data";
import H4 from "../components/ui/texts/h4";
import { useLanguage } from "../components/header/ui/context/language-provider";

const InfosPersoComponent = () => {
  const { language } = useLanguage(); // Get the current language
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
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Aucun token trouvé");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setName(data.nom);
          setPrenom(data.prenom);
          setDateNaissance(data.dateNaissance);
          setAdresse(data.adresse);
          setCodePostal(data.codePostal);
          setVille(data.ville);
          setTelephone(data.telephone);
        } else {
          console.error(
            "Erreur de récupération des informations utilisateur:",
            data.message
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur:",
          error
        );
      }
    };

    fetchUser();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Aucun token trouvé");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Utilisateur mis à jour avec succès:", data);
        setIsEditing(false);
      } else {
        console.error(
          "Erreur lors de la mise à jour des informations utilisateur"
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement des informations utilisateur:",
        error
      );
    }
  };

  return (
    <Card
      id="Infos-perso"
      className="flex flex-col row-start-3 row-end-6 relative !px-2 !py-1 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-6 h-full"
    >
      <EditIcon
        className="absolute top-0.5 right-0.5 cursor-pointer"
        onClick={toggleEditing}
        isActive={isEditing}
      />

      <H4 className="mb-1 text-xxs">
        {language === "en"
          ? "Personal Information"
          : "Informations personnelles"}
      </H4>

      <main className="h-full w-full grid grid-cols-2 grid-rows-4 gap-y-0.5">
        <HForm className="row-start-1 col-start-1 self-center text-xxs">
          {language === "en" ? "Full Name" : "Nom complet"}
        </HForm>
        <div className="row-start-1 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder={
                language === "en" ? "Enter your full name" : "Entrez votre nom"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{name}</HFormData>
          )}
        </div>

        <HForm className="row-start-2 col-start-1 self-center text-xxs">
          {language === "en" ? "First Name" : "Prénom"}
        </HForm>
        <div className="row-start-2 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder={
                language === "en"
                  ? "Enter your first name"
                  : "Entrez votre prénom"
              }
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{prenom}</HFormData>
          )}
        </div>

        <HForm className="row-start-3 col-start-1 self-center text-xxs">
          {language === "en" ? "Date of Birth" : "Date de naissance"}
        </HForm>
        <div className="row-start-3 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{dateNaissance}</HFormData>
          )}
        </div>

        <HForm className="row-start-4 col-start-1 self-center text-xxs">
          {language === "en" ? "Address" : "Adresse"}
        </HForm>
        <div className="row-start-4 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder={
                language === "en"
                  ? "Enter your address"
                  : "Entrez votre adresse"
              }
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{adresse}</HFormData>
          )}
        </div>

        <HForm className="row-start-5 col-start-1 self-center text-xxs">
          {language === "en" ? "Postal Code" : "Code Postal"}
        </HForm>
        <div className="row-start-5 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder={
                language === "en"
                  ? "Enter your postal code"
                  : "Entrez votre code postal"
              }
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{codePostal}</HFormData>
          )}
        </div>

        <HForm className="row-start-6 col-start-1 self-center text-xxs">
          {language === "en" ? "City" : "Ville"}
        </HForm>
        <div className="row-start-6 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder={
                language === "en" ? "Enter your city" : "Entrez votre ville"
              }
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{ville}</HFormData>
          )}
        </div>

        <HForm className="row-start-7 col-start-1 self-center text-xxs">
          {language === "en" ? "Phone" : "Téléphone"}
        </HForm>
        <div className="row-start-7 col-start-2 flex items-center">
          {isEditing ? (
            <Input
              type="text"
              placeholder={
                language === "en"
                  ? "Enter your phone number"
                  : "Entrez votre téléphone"
              }
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="!w-full !p-0.5 text-xxs"
            />
          ) : (
            <HFormData className="text-xxs">{telephone}</HFormData>
          )}
        </div>
      </main>

      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-1 self-end text-xxs bg-blue-500 text-white p-1 rounded"
        >
          {language === "en" ? "Save" : "Enregistrer"}
        </button>
      )}
    </Card>
  );
};

export default InfosPersoComponent;
