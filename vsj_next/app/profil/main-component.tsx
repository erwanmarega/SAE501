"use client";

import React, { useState } from "react";
import Card from "../components/ui/card";
import License from "./main-components/license";
import Adhesion from "./main-components/adhesion";
import AdminDocs from "./main-components/admin-docs";
import Button from "../components/ui/button";

const MainComponent = () => {
  const [selected, setSelected] = useState<string>("License");

  const options = [
    { id: "License", label: "License" },
    { id: "Adhésion", label: "Adhésion" },
    { id: "Administration et Documents", label: "Administration et Documents" },
  ];

  const handleClick = (id: string) => {
    setSelected(id);
  };

  const whatShow = (selected: string) => {
    switch (selected) {
      case "License":
        return <License />;
        break;
      case "Adhésion":
        return <Adhesion />;
        break;
      case "Administration et Documents":
        return <AdminDocs />;
        break;

      default:
        break;
    }
  };

  return (
    <section className="row-start-6 row-end-10 flex flex-col gap-4 lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-6 h-full w-full">
      <section className="flex justify-between">
        <Card className="flex justify-between w-max gap-4 rounded-xl">
          {options.map((option) => (
            <div
              key={option.id}
              className={`rounded-md cursor-pointer py-1 px-2 flex items-center ${
                selected === option.id
                  ? "text-primary bg-primary/25"
                  : "hover:text-primary hover:bg-primary/25"
              }`}
              onClick={() => handleClick(option.id)}
            >
              <h5>{option.label}</h5>
            </div>
          ))}
        </Card>
        <Button className="!w-36">Se déconnecter</Button>
      </section>

      <Card id="main" className="bg-white shadow-md h-full w-full !px-6 !py-4 ">
        {whatShow(selected)}
      </Card>
    </section>
  );
};

export default MainComponent;
