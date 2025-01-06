"use client";

import React, { useState } from "react";
import Card from "../components/ui/card";
import Header from "../components/header/header";

const BassinOlympique = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="grid grid-cols-[4fr_1fr_1fr] grid-rows-4 gap-7 w-[90%] lg:w-[1400px] h-[85%]">
        <Card className="!p-0 h-full col-start-1 col-end-1 row-start-1 row-end-5">
          <img
            src="/images/piscine.jpg"
            alt="Piscine Olympique"
            className="w-full h-full object-cover rounded-lg"
          />
        </Card>

        <Card className="relative flex flex-col items-center justify-center text-center p-6 col-start-2 col-end-4 row-start-1 row-end-3">
          <span className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
            Natation
          </span>
          <h2 className="text-4xl font-bold text-gray-800 font-mona">
            Bassin Olympique
          </h2>
          <p className="text-lg text-gray-500 font-mona mt-2">Compétition</p>

          {/* Bouton ou Lecteur Audio */}
          <div className="mt-6 w-full flex justify-center">
            {!isPlaying ? (
              <button
                onClick={toggleAudio}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-all duration-300"
              >
                <img
                  src="./assets/img/Vector.png"
                  alt="Icône Écouteur"
                  className="w-5 h-5"
                />
                <span className="font-medium">Écouter</span>
              </button>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300 w-[300px]">
                <button
                  onClick={toggleAudio}
                  className="p-2 bg-blue-500 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 12 6 6v12z"
                    />
                  </svg>
                </button>
                <div className="w-full">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs mt-1 text-gray-500">
                    <span>00:51</span>
                    <span>01:12</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="p-1">
                    <img
                      src="./assets/img/volume.png"
                      alt="Volume"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Carte Profondeur */}
        <Card className="relative flex flex-col items-center justify-center text-center p-6 h-full col-start-2 col-end-2 row-start-3 row-end-4">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <img
              src="./assets/img/Groupe480.png"
              alt="Icône Profondeur"
              className="w-6 h-6"
            />
            <h3 className="text-sm font-semibold">Profondeur</h3>
          </div>
          <p className="text-5xl font-bold text-black mt-8 font-outfit">50</p>
          <p className="text-md text-gray-500 font-outfit">mètres</p>
        </Card>

        {/* Carte Capacité */}
        <Card className="relative flex flex-col items-center justify-center text-center p-6 h-full col-start-2 col-end-2 row-start-4 row-end-5">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <img
              src="./assets/img/capa.png"
              alt="Icône Capacité"
              className="w-6 h-6"
            />
            <h3 className="text-sm font-semibold">Capacité</h3>
          </div>
          <p className="text-5xl font-bold text-black mt-8 font-outfit">10</p>
          <p className="text-md text-gray-500">couloirs</p>
        </Card>

        {/* Carte Température */}
        <Card className="relative flex flex-col items-center justify-center text-center p-6 h-full col-start-3 col-end-3 row-start-3 row-end-4">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <img
              src="./assets/img/Group498.png"
              alt="Icône Température"
              className="w-6 h-6"
            />
            <h3 className="text-sm font-semibold font-outfit">Température</h3>
          </div>
          <p className="text-5xl font-bold text-black mt-8 font-outfit">26</p>
          <p className="text-md text-gray-500 font-outfit">°C</p>
        </Card>
      </div>
    </div>
  );
};

export default BassinOlympique;
