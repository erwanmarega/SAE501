"use client";

import React, { useState } from "react";
import SwimmerCard from "../groupe02/ui/swimmer-card";
import EditIconButton from "../components/ui/interactive-icons/edit-icon-button";
import Card from "../components/ui/card";
import Image from "next/image";
import DeleteElement from "../components/ui/delete-element";
import Popup from "../components/ui/popup";

const EditEffectif = () => {
  const swimmers = [
    {
      first_name: "Stéphane",
      last_name: "Cablet",
      dob: "Nageur crawl",
      note: "Graph",
      size: 50,
    },
    {
      first_name: "Stéphane",
      last_name: "Cablet",
      dob: "Nageur crawl",
      note: "Graph",
      size: 50,
    },
  ];

  const coachs = [
    {
      first_name: "Stéphane",
      last_name: "Cablet",
      dob: "Coach",
      note: "Graph",
      size: 50,
    },
    {
      first_name: "Stéphane",
      last_name: "Cablet",
      dob: "Coach",
      note: "Graph",
      size: 50,
    },
  ];

  const [isActiveSwimmer, setIsActiveSwimmer] = useState(false);
  const [isActiveCoach, setIsActiveCoach] = useState(false);
  const [showNewSwimmer, setShowNewSwimmer] = useState(false);
  const [showNewCoach, setShowNewCoach] = useState(false);

  const handleClickSwimmer = () => {
    setIsActiveSwimmer(!isActiveSwimmer);
  };

  const handleClickCoach = () => {
    setIsActiveCoach(!isActiveCoach);
  };

  return (
    <>
      {/* Section des nageurs */}
      <div className="row-start-3 row-end-7 w-full border-dashed border-[#D9D9D9] border-2 rounded-xl relative">
        <section className="flex flex-wrap gap-4 p-4">
          {swimmers.map((swimmer, index) => (
            <div key={index} className="h-max w-max relative">
              <SwimmerCard
                variant="small"
                first_name={swimmer.first_name}
                last_name={swimmer.last_name}
                dob={swimmer.dob}
                note={swimmer.note}
                size={swimmer.size}
              />
              {isActiveSwimmer && <DeleteElement />}
            </div>
          ))}
          {isActiveSwimmer && (
            <Card className="flex justify-center items-center w-[205px] !rounded-2xl">
              <Image
                alt="Ajouter un nageur"
                height={20}
                width={20}
                src="/assets/icons/blue_plus.svg"
              />
            </Card>
          )}
        </section>
        <EditIconButton
          isActive={isActiveSwimmer}
          setIsActive={setIsActiveSwimmer}
          handleClick={handleClickSwimmer}
        />
      </div>

      {/* Section des coachs */}
      <div className="row-start-7 row-end-9 h-full w-full border-dashed border-[#D9D9D9] border-2 rounded-xl relative flex">
        <section className="flex flex-wrap items-center gap-4 p-4">
          {coachs.map((coach, index) => (
            <div key={index} className="h-max w-max relative">
              <SwimmerCard
                variant="small"
                first_name={coach.first_name}
                last_name={coach.last_name}
                dob={coach.dob}
                note={coach.note}
                size={coach.size}
              />
              {isActiveCoach && <DeleteElement />}
            </div>
          ))}
          {isActiveCoach && (
            <Card
              className="flex justify-center items-center w-[205px] !rounded-2xl h-16"
              onClick={() => setShowNewCoach(true)}
            >
              <Image
                alt="Ajouter un nageur"
                height={20}
                width={20}
                src="/assets/icons/blue_plus.svg"
              />
            </Card>
          )}
        </section>
        <EditIconButton
          isActive={isActiveCoach}
          setIsActive={setIsActiveCoach}
          handleClick={handleClickCoach}
        />
      </div>
      {showNewCoach && <Popup />}
    </>
  );
};

export default EditEffectif;
