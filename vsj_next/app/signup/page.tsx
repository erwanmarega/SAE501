"use client";

import React, { useState } from "react";
import Confetti from "react-confetti";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import H3 from "../components/ui/texts/h3";
import H2 from "../components/ui/texts/h2";

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [barWidthStep1To2, setBarWidthStep1To2] = useState(0);
  const [barWidthStep2To3, setBarWidthStep2To3] = useState(0);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
  });

  const token = localStorage.getItem("authToken");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (step === 3) {
      handleSubmit();
      setShowConfetti(true);
      setStep(4);
    } else {
      setStep((prev) => Math.min(prev + 1, 3));
    }

    if (step === 1 && barWidthStep1To2 < 100) {
      setBarWidthStep1To2((prev) => Math.min(prev + 100, 100));
    }
    if (step === 2 && barWidthStep2To3 < 100) {
      setBarWidthStep2To3((prev) => Math.min(prev + 100, 100));
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));

    if (step === 2 && barWidthStep1To2 > 0) {
      setBarWidthStep1To2((prev) => Math.max(prev - 100, 0));
    }
    if (step === 3 && barWidthStep2To3 > 0) {
      setBarWidthStep2To3((prev) => Math.max(prev - 100, 0));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/complete-registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const textResponse = await response.text();
      console.log("Réponse du serveur :", textResponse);

      if (response.ok) {
        console.log("Profil enregistré avec succès !");
        setShowConfetti(true);
        setStep(4);
      } else {
        console.error("Erreur lors de la soumission :", textResponse);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const stepTitles = ["Informations personnelles", "Résidence", "Coordonnées"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-[1.125rem] md:text-xl">
      {showConfetti && <Confetti />}
      <div className="w-full max-w-5xl p-10">
        {step === 4 ? (
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-8 flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-full">
              <img
                src="./assets/img/icon.png"
                alt="Validated"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-bold text-black mb-6">
              Profil bien enregistré
            </h1>
            <div className="text-7xl mb-8">👏</div>
            <button
              className="bg-blue-500 text-white font-medium text-lg py-4 px-16 rounded-md hover:bg-blue-600 transition-all"
              onClick={() => (window.location.href = "/activity")}
            >
              Démarrer l'expérience →
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-12">
              <img
                src="./assets/img/logo.png"
                alt="Logo"
                className="w-20 h-20 mb-6"
              />
              <H2 className="leading-tight relative">
                <span className="text-gray-700">Bienvenue</span>, pour continuer
                votre inscription, veuillez compléter votre profil
                <div
                  className="absolute left-0 bottom-[-4px] h-[3px] bg-[#348CFF] mt-1"
                  style={{
                    width: "115px",
                    borderRadius: "5px",
                  }}
                ></div>
              </H2>
              <H3 className="mt-8">{stepTitles[step - 1]}</H3>
            </div>

            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-medium ${
                    step >= 1
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {step > 1 ? (
                    <img
                      src="./assets/img/icon.png"
                      alt="Validated"
                      className="w-5 h-5"
                    />
                  ) : (
                    "1"
                  )}
                </div>
                <div className="relative w-20 h-[4px] bg-gray-300">
                  <div
                    className={`absolute left-0 top-0 h-full bg-blue-500`}
                    style={{
                      width: `${barWidthStep1To2}%`,
                      transition: "width 0.5s ease",
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-medium ${
                    step >= 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {step > 2 ? (
                    <img
                      src="./assets/img/icon.png"
                      alt="Validated"
                      className="w-5 h-5"
                    />
                  ) : (
                    "2"
                  )}
                </div>
                <div className="relative w-20 h-[4px] bg-gray-300">
                  <div
                    className={`absolute left-0 top-0 h-full bg-blue-500`}
                    style={{
                      width: `${barWidthStep2To3}%`,
                      transition: "width 0.5s ease",
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-medium ${
                    step === 3
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>

            {step === 1 && (
              <form className="grid grid-cols-3 gap-6 mb-10">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {/* Étape 2 */}
            {step === 2 && (
              <form className="grid grid-cols-3 gap-6 mb-10">
                <input
                  type="text"
                  name="adresse"
                  placeholder="Adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="codePostal"
                  placeholder="Code Postal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="ville"
                  placeholder="Ville"
                  value={formData.ville}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {step === 3 && (
              <form className="grid grid-cols-1 gap-6 mb-10">
                <input
                  type="text"
                  name="telephone"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            <div className="flex flex-col gap-6">
              <Button
                variant="primary"
                format="big"
                type="button"
                onClick={handleNextStep}
              >
                Continuer →
              </Button>
              <div className="h-16">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={`w-full text-gray-600 text-base h-full underline bg-transparent ${
                    step === 1 && "opacity-0 pointer-events-none"
                  }`}
                >
                  Revenir en arrière
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
