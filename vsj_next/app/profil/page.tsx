"use client";

import React, { useState } from "react";
import Header from "../components/header/header";
import ProfilComponent from "./profil-component";
import Card from "../components/ui/card";
import BioComponent from "./bio-component";
import Input from "../components/ui/input";
import InfosPersoComponent from "./infosPerso-component";
import MainComponent from "./main-component";

const ProfilPage = () => {
  return (
    <div className=" lg:h-[85vh] m">
      <Header />
      <div className="flex flex-col gap-4 mt-4 lg:grid lg:grid-rows-5 lg:grid-cols-3 lg:h-full m-4">
        <ProfilComponent />
        <BioComponent />
        <InfosPersoComponent />

        <MainComponent />
      </div>
    </div>
  );
};

export default ProfilPage;
