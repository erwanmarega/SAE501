"use client";

import React, { useState } from "react";
import Button from "@/app/components/ui/button";
import Image from "next/image";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";
import HForm from "@/app/components/ui/texts/h-form";
import HFormData from "@/app/components/ui/texts/h-form-data";

const License = () => {
  return (
    <section className="flex flex-col gap-8 h-full lg:gap-2 w-full">
      <header className="flex flex-col">
        <H4>License de Natation</H4>
        <P>
          Voici votre License de Natation, afin de participer aux compétitions,
          sans cela, toutes compétition est formellement interdit !{" "}
        </P>
      </header>
      <main className="flex flex-col gap-8  h-full w-full lg:flex-row">
        <section className="flex items-center justify-center lg:justify-start w-full lg:w-max">
          <Image
            src="/assets/img/license.png"
            width={450}
            height={450}
            alt="Ma License"
            className="w-full max-w-96  lg:max-w-[750px]"
          />
        </section>
        <section className="flex items-center justify-center lg:w-5/6">
          <div className="grid grid-rows-4 grid-cols-2 w-3/4 lg:w-3/4">
            <HForm>Nom complet</HForm>
            <HFormData className="text-end">Victor Ducrès</HFormData>
            <HForm>Ligue</HForm>
            <HFormData className="text-end">Ligue FFV</HFormData>
            <HForm>Date d'expiration</HForm>
            <HFormData className="text-end">12/01/2025</HFormData>
            <HForm>Référence</HForm>
            <HFormData className="text-end">#144173K</HFormData>
          </div>
        </section>
      </main>
      <footer className="flex justify-between w-full mt-2">
        <Button variant="outline" className="!w-2/6">
          Faire une demande
        </Button>
        <Button className="!w-2/6">Renouvellez</Button>
      </footer>
    </section>
  );
};

export default License;
