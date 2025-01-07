import React from "react";
import H3 from "./texts/h3";
import DeleteElement from "./delete-element";
import { Input } from "postcss";

const Popup = () => {
  return (
    <section className="h-screen w-screen fixed bg-black/25 flex justify-center items-center z-10 top-0 left-0">
      <div
        className="m-auto border-[1px] border-gray-300 bg-white h-max w-96 flex flex-col items-center p-4 rounded-xl shadow-card relative"
        id="popup-container"
      >
        <DeleteElement className="z-10 top-1 right-1" />
        <H3>Ajouter un coach</H3>
        <div className="flex flex-col">
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default Popup;
