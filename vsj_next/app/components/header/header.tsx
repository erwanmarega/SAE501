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
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, 
            },
          });

          if (response.ok) {
            const data = await response.json();
            setPrenom(data.prenom);  
          } else if (response.status === 401) {
            console.warn("Token expiré ou non valide. Redirection vers la page de connexion.");
            localStorage.removeItem("authToken"); 
            router.push("/authentification"); 
          } else {
            console.error("Erreur lors de la récupération des données utilisateur");
          }
        } catch (error) {
          console.error("Erreur réseau lors de la récupération des données utilisateur", error);
          router.push("/login"); 
        }
      };

      fetchUserData();
    } else {
      router.push("/login"); 
    }
  }, [router]);

  return (
    <div className="flex flex-row w-full h-16 items-center justify-between px-8 absolute top-0">
      <div>
        <H1 className="dark:text-white">
          {language === "en" ? `Welcome, ${prenom || "User"}` : `Bienvenue, ${prenom || "Utilisateur"}`}
        </H1>
        <div
          className={clsx("bg-primary rounded-full h-1 w-22 mr-0", {
            "ml-[62%]": language === "en",
            "ml-[64%]": language === "fr",
          })}
        ></div>
      </div>
      <div>
        <Logo placement="center" />
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
