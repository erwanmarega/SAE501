"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/ui/card";
import EditIcon from "../components/ui/interactive-icons/edit";
import H4 from "../components/ui/texts/h4";
import P from "../components/ui/texts/p";
import { useLanguage } from "@/app/components/header/ui/context/language-provider"; // Import du contexte langue

const BioComponent = () => {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger la bio au montage
  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/swimmer/bio`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          language === "en"
            ? "Failed to load bio"
            : "Échec du chargement de la bio"
        );
      }

      const data = await response.json();
      setBio(data.bio || "");
    } catch (err: any) {
      setError(
        err.message ||
          (language === "en" ? "Unknown error" : "Erreur inconnue")
      );
    } finally {
      setLoading(false);
    }
  };

  const updateBio = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/swimmer/bio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ bio }),
        }
      );

      if (!response.ok) {
        throw new Error(
          language === "en"
            ? "Failed to update bio"
            : "Échec de la mise à jour de la bio"
        );
      }

      const data = await response.json();
      setBio(data.bio);
      setIsEditing(false);
    } catch (err: any) {
      setError(
        err.message ||
          (language === "en" ? "Unknown error" : "Erreur inconnue")
      );
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBio();
  };

  if (loading) {
    return (
      <div>{language === "en" ? "Loading..." : "Chargement..."}</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        {language === "en" ? "Error: " : "Erreur : "} {error}
      </div>
    );
  }

  return (
    <Card
      id="Bio"
      className="bg-white shadow-md h-full w-full flex flex-col row-start-2 row-end-3 py-2 px-2 relative lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3"
    >
      <EditIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={toggleEditing}
        isActive={isEditing}
      />
      <H4>{language === "en" ? "Bio" : "Biographie"}</H4>
      <div className="font-light font-mona text-sm text-[#3B3B3B]">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <textarea
              className="border rounded-md w-full h-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={
                language === "en"
                  ? "Enter your bio..."
                  : "Entrez votre bio..."
              }
            />
            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-1 rounded-md"
              >
                {language === "en" ? "Save" : "Sauvegarder"}
              </button>
              <button
                type="button"
                onClick={toggleEditing}
                className="bg-gray-300 px-4 py-1 rounded-md"
              >
                {language === "en" ? "Cancel" : "Annuler"}
              </button>
            </div>
          </form>
        ) : (
          <P>{bio || (language === "en" ? "No bio defined" : "Aucune bio définie")}</P>
        )}
      </div>
    </Card>
  );
};

export default BioComponent;