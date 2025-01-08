"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../ui/logo";
import ThemeToggle from "./ui/theme-toggle";
import LanguageSwitcher from "./ui/language-switcher";
import { useLanguage } from "./ui/context/language-provider";
import H1 from "@/app/components/ui/texts/h1";
import clsx from "clsx";
import Profil from "../profil/profil";
import Link from "next/link";

const Header = () => {
  const { language } = useLanguage();
  const [prenom, setPrenom] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setPrenom(data.prenom);
          } else if (response.status === 401) {
            console.warn(
              "Token expiré ou non valide. Redirection vers la page de connexion."
            );
            localStorage.removeItem("authToken");
            //router.push("/authentification");
          } else {
            console.error(
              "Erreur lors de la récupération des données utilisateur"
            );
          }
        } catch (error) {
          console.error(
            "Erreur réseau lors de la récupération des données utilisateur",
            error
          );
          //router.push("/authentification");
        }
      };

      fetchUserData();
    } else {
      //router.push("/authentification");
    }
  }, [router]);

  return (
    <div className="flex flex-row w-full h-16 items-center justify-between px-8 absolute top-0">
      <div>
        <H1 className="dark:text-white">
          {language === "en" ? (
            <>
              Welcome,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 underline decoration-2">
                {prenom || "User"}
              </span>
            </>
          ) : (
            <>
              Bienvenue,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 underline decoration-2">
                {prenom || "Utilisateur"}
              </span>
            </>
          )}
        </H1>
      </div>
      <div>
        <Link href={"/"}>
          <Logo placement="center" />
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <LanguageSwitcher />
        <Link href={"/profil"}>
          <Profil size={50} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
