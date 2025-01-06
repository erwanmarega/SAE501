import React from "react";
import Card from "../components/ui/card";
import Header from "../components/header/header";

const BassinOlympique = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center bg-[#F7F7F7] dark:bg-[#262629]">
      {/* Composant d'en-tête */}
      <Header />

      {/* Conteneur principal */}
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="grid grid-cols-[3fr_2fr] gap-10 w-[90%] lg:w-[1400px] h-[85%]">
          {/* Section de l'image */}
          <Card className="!px-0 !py-0 h-full">
            <img
              src="/images/piscine.jpg"
              alt="Piscine Olympique"
              className="w-full h-full object-cover rounded-lg"
            />
          </Card>

          {/* Section des informations */}
          <section className="grid grid-rows-[1fr_2fr] gap-6 h-full">
            {/* Titre principal */}
            <Card className="flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-4xl font-semibold text-gray-800 font-mona">
                Bassin Olympique
              </h2>
              <p className="text-xl text-gray-500 font-mona">Compétition</p>
              <button className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                <img
                  src="./assets/img/Vector.png"
                  alt="Écouter Icone"
                  className="w-5 h-5"
                />
                <span className="font-medium">Écouter</span>
              </button>
            </Card>

            {/* Cartes des informations */}
            <section className="grid grid-cols-2 grid-rows-2 gap-6">
              {/* Carte Profondeur */}
              <Card className="relative flex flex-col items-center justify-center text-center p-4">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/Group 480.png"
                    alt="Icone Profondeur"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold">Profondeur</h3>
                </div>
                <p className="text-5xl font-bold text-black">50</p>
                <p className="text-gray-500">mètres</p>
              </Card>

              {/* Carte Capacité */}
              <Card className="relative flex flex-col items-center justify-center text-center p-4">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/capa.png"
                    alt="Icone Capacité"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold">Capacité</h3>
                </div>
                <p className="text-5xl font-bold text-black">10</p>
                <p className="text-gray-500">couloirs</p>
              </Card>

              {/* Carte Température */}
              <Card className="relative flex flex-col items-center justify-center text-center p-4">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/Group 498.png"
                    alt="Icone Température"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold">Température</h3>
                </div>
                <p className="text-5xl font-bold text-black">26</p>
                <p className="text-gray-500">°C</p>
              </Card>

              {/* Carte Horaires */}
              <Card className="relative flex flex-col items-center justify-center text-center p-4">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/Horloge.png"
                    alt="Icone Horaires"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold">Horaires</h3>
                </div>
                <p className="text-5xl font-bold text-black">8-18</p>
                <p className="text-gray-500">heures</p>
              </Card>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BassinOlympique;
