"use client";

import React, { useState } from "react";
import Confetti from "react-confetti";

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [barWidthStep1To2, setBarWidthStep1To2] = useState(0);
  const [barWidthStep2To3, setBarWidthStep2To3] = useState(0);

  const handleNextStep = () => {
    if (step === 3) {
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
                alt="Check"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-3xl font-bold text-black mb-6">
              Profil bien enregistré
            </h1>
            <div className="text-7xl mb-8">👏</div>
            <button
              className="bg-blue-500 text-white font-medium text-lg py-4 px-16 rounded-md hover:bg-blue-600 transition-all"
              onClick={() => (window.location.href = "/home")}
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
              <h1 className="text-2xl font-semibold text-gray-700 text-center leading-tight relative">
                <span className="text-gray-700">Bienvenue</span>, pour continuer
                votre inscription, veuillez compléter votre profil
                {/* Underline sous le texte "Bienvenue" */}
                <div
                  className="absolute left-0 bottom-[-4px] h-[3px] bg-[#348CFF] mt-1"
                  style={{
                    width: "115px",
                    borderRadius: "5px", // Arrondir les coins
                  }}
                ></div>
              </h1>
              <h2 className="text-xl font-bold text-gray-600 mt-8">
                {stepTitles[step - 1]}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-medium ${
                    step > 1
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {step > 1 ? (
                    <img
                      src="./assets/img/icon.png"
                      alt="Checked"
                      className="w-5 h-5"
                    />
                  ) : (
                    "1"
                  )}
                </div>
                <div className="relative w-20 h-[4px] bg-gray-300">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500"
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
                    step > 2
                      ? "bg-blue-500 text-white"
                      : step === 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {step > 2 ? (
                    <img
                      src="./assets/img/icon.png"
                      alt="Checked"
                      className="w-5 h-5"
                    />
                  ) : (
                    "2"
                  )}
                </div>
                <div className="relative w-20 h-[4px] bg-gray-300">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500"
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
                  {step === 3 ? <p>3</p> : "3"}
                </div>
              </div>
            </div>

            {step === 1 && (
              <form className="grid grid-cols-3 gap-6 mb-10">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  name="dateNaissance"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {step === 2 && (
              <form className="grid grid-cols-3 gap-6 mb-10">
                <input
                  type="text"
                  name="adresse"
                  placeholder="Adresse"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="codePostal"
                  placeholder="Code Postal"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="ville"
                  placeholder="Ville"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {step === 3 && (
              <form className="grid grid-cols-2 gap-6 mb-10">
                <input
                  type="text"
                  name="telephone"
                  placeholder="Téléphone"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse mail"
                  className="col-span-1 border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-blue-500 text-white font-medium text-lg py-4 rounded-md hover:bg-blue-600 transition-all"
              >
                Continuer →
              </button>
              <div className="h-16">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={`w-full text-black font-medium text-lg py-4 rounded-md border-none hover:underline transition-all ${
                    step > 1 ? "visible" : "invisible"
                  }`}
                >
                  ← Étape précédente
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
