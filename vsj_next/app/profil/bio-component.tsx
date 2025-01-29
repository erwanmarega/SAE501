"use client";

import React, { useState } from "react";
import Card from "../components/ui/card";
import EditIcon from "../components/ui/interactive-icons/edit";
import H4 from "../components/ui/texts/h4";
import P from "../components/ui/texts/p";

const BioComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card
      id="Bio"
      className="bg-white shadow-md h-full w-full flex flex-col row-start-2 row-end-3 py-2 px-2 relative lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3"
    >
      <EditIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={toggleEditing}
        isActive={isEditing}
      />
      <H4>Bio</H4>
      <div className="font-light font-mona text-sm text-[#3B3B3B]">
        {isEditing ? (
          <textarea
            className="border rounded-md w-full h-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <P>{bio}</P>
        )}
      </div>
    </Card>
  );
};

export default BioComponent;
