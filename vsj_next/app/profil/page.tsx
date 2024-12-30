"use client";

import React, { useState } from "react";
import Header from "../components/header/header";
import ProfilComponent from "./profil-component";
import Card from "../components/ui/card";
import BioComponent from "./bio-component";
import Input from "../components/ui/input";
import InfosPersoComponent from "./infosPerso-component";
import MainComponent from "./main-component";
import { EventsProvider } from "../calendar/database/events-context";

const ProfilPage = () => {
  return (
    <EventsProvider>
      <div className=" lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden">
        <Header />
        <section className="2xl:h-[700px] 2xl:w-[1500px] w-full h-5/6 lg:flex lg:items-center lg:justify-center lg:mt-16 mt-20">
          <div className="flex flex-col gap-4  2xl:gap-6 3xl:gap-8 mt-4 lg:grid lg:grid-rows-5 lg:grid-cols-3 h-full 2xl:h-max lg:w-[1500px] lg:items-center lg:justify-center">
            <ProfilComponent />
            <BioComponent />
            <InfosPersoComponent />

            <MainComponent />
          </div>
        </section>
      </div>
    </EventsProvider>
  );
};

export default ProfilPage;
