"use client";
import React from "react";
import H4 from "@/app/components/ui/texts/h4";
import H5 from "@/app/components/ui/texts/h5";
import H6 from "@/app/components/ui/texts/h6";
import PersonCard from "./ui/person-card";
import DragCard from "./ui/drag-card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

const AdminDocs = () => {
  const { language } = useLanguage(); // Récupère la langue actuelle
  const members = [
    {
      name: "Erwan Marega",
      role:
        language === "en"
          ? "President of VSJ Swimming"
          : "Président de VSJ Natation",
      email: "erwan.marega@laposte.net",
      phone: "06.24.25.65.15",
    },
    {
      name: "Lucie Martin",
      role:
        language === "en"
          ? "Treasurer of VSJ Swimming"
          : "Trésorière de VSJ Natation",
      email: "lucie.martin@vsj-natation.fr",
      phone: "06.12.34.56.78",
    },
    {
      name: "Julien Bernard",
      role:
        language === "en"
          ? "Secretary of VSJ Swimming"
          : "Secrétaire de VSJ Natation",
      email: "julien.bernard@vsj-natation.fr",
      phone: "06.98.76.54.32",
    },
  ];

  return (
    <div className="flex flex-col h-full gap-2">
      <H4>
        {language === "en"
          ? "Administration and Documents"
          : "Administration et Documents"}
      </H4>
      <main className="flex flex-col h-full gap-3">
        <section>
          <H5>{language === "en" ? "Contact" : "Contact"}</H5>
          <div className="flex gap-4">
            {members.map((member, index) => (
              <PersonCard
                key={index}
                name={member.name}
                role={member.role}
                email={member.email}
                phone={member.phone}
              />
            ))}
          </div>
        </section>

        <section className="h-full">
          <H5>{language === "en" ? "Documents" : "Documents"}</H5>
          <div className="grid grid-cols-2 h-full gap-5">
            <DragCard />
            <div className="flex w-full justify-between">
              <h5 className="text-sm font-mona font-light">
                {language === "en"
                  ? "Required Documents:"
                  : "Documents requis :"}
              </h5>
              <div className="flex flex-col h-[85%] justify-between">
                <p className="font-mona text-sm text-[#3B3B3B]">
                  {language === "en"
                    ? "Medical certificate"
                    : "Certificat médical"}
                </p>
                <p className="font-mona text-sm text-[#3B3B3B]">
                  {language === "en" ? "Document Y" : "Document Y"}
                </p>
                <p className="font-mona text-sm text-[#3B3B3B]">
                  {language === "en" ? "Bank details (RIB)" : "RIB"}
                </p>
                <p className="font-mona text-sm text-[#3B3B3B]">
                  {language === "en"
                    ? "Parental authorization"
                    : "Autorisation parentale"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDocs;
