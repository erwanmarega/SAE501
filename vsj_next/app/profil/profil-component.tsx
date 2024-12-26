import React from "react";
import Profil from "../components/profil/profil";
import EditIcon from "../components/ui/interactive-icons/edit";
import HProfilName from "../components/ui/texts/h-profil-name";
import HProfilAge from "../components/ui/texts/h-profil-age";

const ProfilComponent = () => {
  return (
    <section
      id="Profil"
      className=" h-24 w-full flex  row-start-1 row-end-2 grid-cols-2 gap-2 lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-2"
    >
      {" "}
      <div className="flex items-end ">
        {" "}
        <Profil size={100} />
      </div>
      <div className="flex flex-col justify-between">
        <EditIcon />
        <div className="flex flex-col ">
          <HProfilAge>17 ans</HProfilAge>
          <HProfilName className="-mt-1">Erwan</HProfilName>
        </div>
      </div>
    </section>
  );
};

export default ProfilComponent;
