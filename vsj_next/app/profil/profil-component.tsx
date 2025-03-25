import React, { useEffect, useState } from "react";
import Profil from "../components/profil/profil";
import EditIcon from "../components/ui/interactive-icons/edit";
import HProfilName from "../components/ui/texts/h-profil-name";
import HProfilAge from "../components/ui/texts/h-profil-age";
import { useLanguage } from "../components/header/ui/context/language-provider"; 
import api from "../utils/axiosInstance";

interface UserProfile {
  prenom: string;
  nom: string;
  dateNaissance: string;
}

const ProfilComponent = () => {
  const { language } = useLanguage(); 
  const [prenom, setPrenom] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token JWT non trouvé dans authToken");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await api.get<UserProfile>("/api/swimmer/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setPrenom(data.nom);

          if (data.dateNaissance) {
            const birthDate = new Date(data.dateNaissance);
            const currentDate = new Date();

            let calculatedAge =
              currentDate.getFullYear() - birthDate.getFullYear();
            const isBirthdayPassed =
              currentDate.getMonth() > birthDate.getMonth() ||
              (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() >= birthDate.getDate());

            if (!isBirthdayPassed) {
              calculatedAge -= 1;
            }

            setAge(calculatedAge);
          } else {
            console.warn("Date de naissance non définie");
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <section
      id="Profil"
      className="h-24 w-full flex row-start-1 row-end-2 grid-cols-2 gap-2 lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-2"
    >
      <div className="flex items-end">
        <Profil size={100} />
      </div>
      <div className="flex flex-col justify-between">
        <EditIcon />
        <div className="flex flex-col">
          <HProfilAge>
            {age
              ? `${age} ${language === "en" ? "years" : "ans"}`
              : language === "en"
              ? "Unknown Age"
              : "Âge inconnu"}
          </HProfilAge>
          <HProfilName className="-mt-1">
            {prenom ||
              (language === "en" ? "Unknown First Name" : "Prénom inconnu")}
          </HProfilName>
        </div>
      </div>
    </section>
  );
};

export default ProfilComponent;
