"use client";

import React from "react";
import Button from "../components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="bg-[#f8f9ff] text-black text-[15px] h-screen">
        {/* HEADER */}
        <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px]">
          <div className="relative flex flex-wrap items-center gap-4">
            {/* Logo */}
            <a href="javascript:void(0)">
              <img
                src="https://via.placeholder.com/150x50.png?text=VSJ+Natation"
                alt="logo"
                className="w-36"
              />
            </a>

            {/* MENU */}
            <div
              id="collapseMenu"
              className="max-lg:hidden lg:!block max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 z-50"
            >
              {/* Bouton pour fermer le menu en version mobile */}
              <button
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 fill-black"
                  viewBox="0 0 320.591 320.591"
                >
                  <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                  <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                </svg>
              </button>

              <ul className="lg:ml-12 lg:flex gap-x-6 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                {/* Logo en version mobile */}
                <li className="mb-6 hidden max-lg:block">
                  <a href="javascript:void(0)">
                    <img
                      src="https://via.placeholder.com/150x50.png?text=VSJ+Natation"
                      alt="logo"
                      className="w-36"
                    />
                  </a>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-primary text-primary block font-semibold transition-all"
                  >
                    Accueil
                  </a>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-primary block font-semibold transition-all"
                  >
                    Équipe
                  </a>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-primary block font-semibold transition-all"
                  >
                    Activités
                  </a>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-primary block font-semibold transition-all"
                  >
                    Actualités
                  </a>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-primary block font-semibold transition-all"
                  >
                    Le Club
                  </a>
                </li>
              </ul>
            </div>

            {/* BOUTONS DROITS */}
            <div className="flex ml-auto">
              <Link href={"/authentification"}>
                <Button className="px-6 py-3 rounded-xl text-white bg-primary transition-all hover:bg-primary/80  !max-w-40">
                  Se connecter
                </Button>
              </Link>
              <button id="toggleOpen" className="lg:hidden ml-7">
                <svg
                  className="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <div className="relative">
          <div className="px-4 sm:px-10">
            <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
              <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
                Rejoignez VSJ Natation et plongez dans l'excellence !
              </h1>
              <p className="text-base">
                Découvrez nos entraînements, nos compétitions et nos moments de
                convivialité. Que vous soyez débutant ou nageur confirmé, VSJ
                Natation vous accueille et vous accompagne.
              </p>
              <div className="mt-10">
                <Link href={"/authentification"}>
                  <Button className="px-6 py-3 rounded-xl text-white bg-primary transition-all hover:bg-primary/80 m-auto !max-w-56">
                    Nous Rejoindre
                  </Button>
                </Link>
              </div>
            </div>

            <hr className="my-12 border-gray-300" />
          </div>
          <img
            src="https://readymadeui.com/bg-effect.svg"
            className="absolute inset-0 w-full h-full"
            alt="background-effect"
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
