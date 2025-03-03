import React, { useState } from "react";
import Card from "../components/ui/card";
import Popup from "../components/ui/popup";
import H3 from "../components/ui/texts/h3";
import InputSelectImage from "../components/ui/input-select-image";

const EditRole = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showRolePopup, setShowRolePopup] = useState(false);

  const handleRoleChange = (member) => {
    setSelectedMember(member);
    setShowRolePopup(true);
  };

  return (
    <div className="h-full pt-10 row-start-3 row-end-9">
      <h1 className="font-outfit font-base text-[#3B3B3B] text-xl">
        Gestion des rôles
      </h1>
      <div className="border-2 border-dashed border-[#D9D9D9] h-full w-full rounded-lg p-2 flex flex-wrap gap-4">
        {members.map((member, index) => (
          <Card key={index} className="p-4 w-full md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-bold">
                  {member.first_name} {member.last_name}
                </h5>
                <p>{member.role}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleRoleChange(member)}
              >
                Modifier le rôle
              </button>
            </div>
          </Card>
        ))}
      </div>

      {showRolePopup && (
        <Popup close={() => setShowRolePopup(false)}>
          <H3>Modifier le rôle</H3>
          <RoleSelect member={selectedMember} />
        </Popup>
      )}
    </div>
  );
};

const RoleSelect = ({ member }) => {
  const [role, setRole] = useState(member.role);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    // Here you can add the logic to update the role in your backend or state
    console.log(
      `Role of ${member.first_name} ${member.last_name} changed to ${event.target.value}`
    );
  };

  return (
    <div>
      <label htmlFor="role">Rôle:</label>
      <select id="role" value={role} onChange={handleRoleChange}>
        <option value="swimmer">Nageur</option>
        <option value="coach">Coach</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default EditRole;
