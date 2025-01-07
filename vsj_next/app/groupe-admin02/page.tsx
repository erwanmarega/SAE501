"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header/header";

import TopBar from "./top-bar";
import RightBar from "./right-bar";
import EditEffectif from "./edit-effectif";

const GroupAdmin02Page = () => {
  const [swimmerValue, setSwimmerValue] = useState(6);
  const [coachValue, setCoachValue] = useState(2);

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

  const [swimmerEffectif, setSwimmerEffectif] = useState(swimmers.length);

  useEffect(() => {
    setSwimmerEffectif(swimmers.length);
  }, [swimmers]);

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

  return (
    <div className=" lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden">
      <Header />
      <section className="2xl:h-[700px] 2xl:w-[1500px] w-full h-5/6 lg:flex lg:items-center lg:justify-center lg:mt-16 mt-20">
        <div className="h-[550px] w-[1500px] grid grid-rows-8 grid-cols-[1fr_350px] gap-6">
          <TopBar
            swimmerValue={swimmerValue}
            swimmerEffectif={swimmerEffectif}
          />
          <EditEffectif swimmers={swimmers} coachs={coachs} />
          <RightBar
            swimmerValue={swimmerValue}
            setSwimmerValue={setSwimmerValue}
            coachValue={coachValue}
            setCoachValue={setCoachValue}
          />
        </div>
      </section>
    </div>
  );
};

export default GroupAdmin02Page;
