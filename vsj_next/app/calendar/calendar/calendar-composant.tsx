"use client";

import React, { useState, useEffect } from "react";
import { fr } from "date-fns/locale";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  format,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import clsx from "clsx";
import Image from "next/image";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

type Training = {
  id: number;
  title: string;
  date: string;
  duration: string;
  intensity: string;
  category: string;
  description?: string;
};

const CalendarComposant = () => {
  const { language } = useLanguage();
  const [currentDate] = useState(new Date()); // Plus besoin de setCurrentDate
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const start = startOfWeek(startOfMonth(currentDate), { locale: fr });
  const end = endOfWeek(endOfMonth(currentDate), { locale: fr });
  let days = eachDayOfInterval({ start, end });

  const totalDaysNeeded = 42;
  if (days.length < totalDaysNeeded) {
    const diff = totalDaysNeeded - days.length;
    const lastDay = days[days.length - 1];
    for (let i = 1; i <= diff; i++) {
      days.push(addDays(lastDay, i));
    }
  }

  const fetchUserTrainings = async (month: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error(
          language === "en"
            ? "No authentication token found"
            : "Aucun jeton d'authentification trouvé"
        );
      }

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/swimmer/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error(
          language === "en"
            ? "Failed to retrieve user data"
            : "Échec de la récupération des données utilisateur"
        );
      }

      const userData = await userResponse.json();
      const groupId = userData.groupId;

      if (!groupId) {
        throw new Error(
          language === "en"
            ? "No group associated with this user"
            : "Aucun groupe associé à cet utilisateur"
        );
      }

      const trainingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/group/${groupId}/trainings?month=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!trainingResponse.ok) {
        throw new Error(
          language === "en"
            ? "Failed to load trainings"
            : "Échec du chargement des entraînements"
        );
      }

      const trainingData = await trainingResponse.json();
      setTrainings(trainingData.trainings || []);
    } catch (err: any) {
      setError(
        err.message || (language === "en" ? "Unknown error" : "Erreur inconnue")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const month = format(currentDate, "yyyy-MM");
    fetchUserTrainings(month);
  }, []);

  const openTrainingModal = (training: Training) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const closeTrainingModal = () => {
    setIsModalOpen(false);
    setSelectedTraining(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        {language === "en" ? "Loading..." : "Chargement..."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {language === "en" ? "Error: " : "Erreur : "} {error}
      </div>
    );
  }

  const numRows = 6;

  return (
    <div className="flex flex-col h-full w-full p-4 relative">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
          <div
            key={index}
            className="text-center font-semibold text-gray-600 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <main
        className="grid grid-cols-7 gap-1 h-full"
        style={{
          gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
        }}
      >
        {days.map((day) => {
          const formattedDate = format(day, "dd/MM/yyyy");
          const eventsForDay = trainings.filter(
            (training) =>
              format(new Date(training.date), "dd/MM/yyyy") === formattedDate
          );
          const lastEvent = eventsForDay[eventsForDay.length - 1] || null;

          const isOutsideMonth = !isSameMonth(day, currentDate);
          const isToday =
            format(day, "dd/MM/yyyy") === format(new Date(), "dd/MM/yyyy");
          const hasTraining = !!lastEvent;

          let backgroundColor = "bg-white";
          let borderColor = "border-[#F5F5F5]";
          if (isOutsideMonth) {
            backgroundColor = "bg-gray-50";
          } else if (hasTraining) {
            backgroundColor = "bg-[#EBF3FF]";
            borderColor = "hover:border-primary";
          }
          if (isToday) {
            borderColor = "border-blue-500";
          }

          const numTrainings = eventsForDay.length;

          return (
            <div
              key={day.toISOString()}
              className={clsx(
                "border-[1px] px-2 py-1 flex flex-col justify-start items-start gap-1 relative transition-all",
                backgroundColor,
                borderColor,
                {
                  "opacity-50": isOutsideMonth,
                  "cursor-pointer hover:rounded-md hover:shadow-md hover:-translate-y-1":
                    hasTraining,
                  "border-2": isToday,
                }
              )}
              onClick={() => {
                if (lastEvent) {
                  openTrainingModal(lastEvent);
                }
              }}
            >
              {numTrainings > 1 && (
                <div className="bg-primary rounded-full h-4 w-4 absolute flex items-center justify-center top-1 right-1">
                  <p className="font-outfit font-black text-white text-3xs">
                    {numTrainings}
                  </p>
                </div>
              )}

              <p
                className={clsx(
                  "font-outfit font-semibold text-sm",
                  isToday ? "text-blue-500" : "text-[#6E6E6E]"
                )}
              >
                {day.getDate()}
              </p>

              {lastEvent ? (
                <div className="flex items-start gap-1">
                  <div className="h-6 w-1 rounded-full bg-primary" />
                  <div className="flex flex-col">
                    <p className="font-outfit text-2xs font-bold text-[#818181] truncate max-w-[80px]">
                      {language === "en" ? "Training" : "Entraînement"}
                    </p>
                    <p className="font-outfit text-2xs font-medium text-[#818181] truncate max-w-[80px]">
                      {lastEvent.title ||
                        (language === "en" ? "Session" : "Séance")}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </main>

      {isModalOpen && selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedTraining.title}
              </h3>
              <button
                onClick={closeTrainingModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <Image
                  src="/assets/icons/close.svg"
                  width={24}
                  height={24}
                  alt={language === "en" ? "Close" : "Fermer"}
                />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {new Date(selectedTraining.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-700">
                {language === "en" ? "Schedule" : "Horaires"}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  {new Date(selectedTraining.date).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(
                    new Date(selectedTraining.date).getTime() +
                      parseInt(selectedTraining.duration) * 60 * 1000
                  ).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {selectedTraining.duration} min
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-700">
                {language === "en" ? "Intensity" : "Intensité"}
              </span>
              <span className="text-gray-600">
                {selectedTraining.intensity}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-700">
                {language === "en" ? "Group" : "Groupe"}
              </span>
              <span className="text-gray-600">{selectedTraining.category}</span>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700 block mb-1">
                {language === "en" ? "Description" : "Description"}
              </span>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  {selectedTraining.description ||
                    (language === "en"
                      ? "No description available"
                      : "Aucune description disponible")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComposant;
