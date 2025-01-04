import React, { useEffect, useState } from "react";
import Profil from "../components/profil/profil";
import EditIcon from "../components/ui/interactive-icons/edit";
import HProfilName from "../components/ui/texts/h-profil-name";
import HProfilAge from "../components/ui/texts/h-profil-age";
import axios from "axios";

interface UserProfile {
  prenom: string;
  nom: string;
  dateNaissance: string; 
}

const ProfilComponent = () => {
  const [prenom, setPrenom] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      console.error("Token JWT non trouvé");
      return;
    }

    axios
      .get<UserProfile>("/api/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setPrenom(data.prenom);

        const birthDate = new Date(data.dateNaissance);
        const currentDate = new Date();
        const calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
        setAge(calculatedAge);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return (
    <section
      id="Profil"
      className=" h-24 w-full flex  row-start-1 row-end-2 grid-cols-2 gap-2 lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-2"
    >
      <div className="flex items-end ">
        <Profil size={100} />
      </div>
      <div className="flex flex-col justify-between">
        <EditIcon />
        <div className="flex flex-col ">
          <HProfilAge>{age ? `${age} ans` : "Âge inconnu"}</HProfilAge>
          <HProfilName className="-mt-1">{prenom || "Prénom inconnu"}</HProfilName>
        </div>
      </div>
    </section>
  );
};

export default ProfilComponent;
