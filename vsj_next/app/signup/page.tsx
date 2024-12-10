"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Logo from "../components/ui/logo";

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNextStep = () => {
    if (step === 3) {
      setShowConfetti(true);
      setStep(4);
    } else {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePreviousStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepTitles = ["Informations personnelles", "Résidence", "Coordonnées"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-base md:text-lg">
      {showConfetti && <Confetti />}
      <div className="w-full max-w-4xl p-8 min-h-[400px]">
        {step === 4 ? (
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-6 flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Profil bien enregistré
            </h1>
            <div className="text-6xl mb-6">👏</div>
            <button
              className="bg-blue-500 text-white font-medium text-sm py-3 px-12 rounded-md hover:bg-blue-600 transition-all"
              onClick={() => (window.location.href = "/")}
            >
              Démarrer l'expérience →
            </button>
          </div>
        ) : (
          <>
            {/* En-tête */}
            <div className="flex flex-col items-center mb-10">
              <Logo placement="center" />
              <h1 className="text-xl font-semibold text-gray-700 text-center leading-tight">
                <span className="text-blue-500 underline">Bienvenue</span>, pour
                continuer votre inscription, veuillez compléter votre profil
              </h1>
              <h2 className="text-lg font-bold text-gray-600 mt-6">
                {stepTitles[step - 1]}
              </h2>
            </div>

            {/* Progression */}
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${
                    step >= 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  1
                </div>
                <motion.div
                  className="h-[3px] bg-gray-300"
                  animate={{ width: step > 1 ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  style={{ width: "4rem" }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${
                    step >= 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  2
                </div>
                <motion.div
                  className="h-[3px] bg-gray-300"
                  animate={{ width: step === 3 ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  style={{ width: "4rem" }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${
                    step === 3
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>

            {/* Formulaires */}
            {step === 1 && (
              <form className="grid grid-cols-3 gap-4 mb-8">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  name="dateNaissance"
                  placeholder="JJ/MM/AAAA"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {step === 2 && (
              <form className="grid grid-cols-3 gap-4 mb-8">
                <input
                  type="text"
                  name="adresse"
                  placeholder="Adresse"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="codePostal"
                  placeholder="Code Postal"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="ville"
                  placeholder="Ville"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {step === 3 && (
              <form className="grid grid-cols-3 gap-4 mb-8">
                <input
                  type="text"
                  name="telephone"
                  placeholder="Téléphone"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse mail"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="ville"
                  placeholder="Ville"
                  className="col-span-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}

            {/* Boutons */}
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-blue-500 text-white font-medium text-sm py-3 rounded-md hover:bg-blue-600 transition-all"
              >
                Continuer →
              </button>
              <div className="h-12">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={`w-full text-black font-medium text-sm py-3 rounded-md border-none hover:underline transition-all ${
                    step > 1
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
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
