// filepath: /c:/SAE501/website/SAE501/vsj_next/app/map/vestiaire.tsx
import React, { useState, useRef } from "react";
import Card from "../components/ui/card";
import Header from "../components/header/header";
import { useLanguage } from "../components/header/ui/context/language-provider";
import UnityPage from "../components/3D/UnityPage";

const Vestiaires = ({ showHeader }: { showHeader: boolean }) => {
  const { language } = useLanguage();
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioButtonClick = () => {
    setIsAudioVisible(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (!isDragging && audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        audioRef.current.duration
      );
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = () => {
    setIsDragging(false);
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && duration > 0) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      setCurrentTime(Math.min(Math.max(newTime, 0), duration));
    }
  };

  const [selected, setSelected] = useState("");

  const Title = (selected: string) => {
    switch (selected) {
      case "Bureau":
        return "Bureau";
      case "Bassi Olympique":
        return "Bassi Olympique";
      case "Hammam":
        return "Hammam";
      case "Sauna":
        return "Sauna";
      case "Vestaires":
        return "Vestaires";
      case "Accueil":
        return "Accueil";
      case "Pateaugoire":
        return "Pateaugoire";
      default:
        return "Vestiaires";
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 w-[90%] lg:w-[1400px] h-auto">
          <Card className="!px-0 !py-0 h-full">
            <UnityPage setSelected={setSelected} />
          </Card>

          <section className="grid grid-rows-[1fr_2fr] gap-4 h-full">
            <Card className="flex flex-col items-center justify-center text-center p-6 relative">
              <span className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-600 dark:bg-blue-200 dark:text-blue-700 py-1 px-4 rounded-full font-mona">
                {language === "en"
                  ? "Comfort & Practicality"
                  : "Confort & Praticité"}
              </span>

              <h2 className="text-4xl font-semibold text-gray-800 font-mona dark:text-white">
                {Title(selected)}
              </h2>
              <p className="text-lg text-[#353535] font-mona dark:text-white">
                {language === "en"
                  ? "Comfort and practicality at your service"
                  : "Confort et praticité à votre service"}
              </p>

              {!isAudioVisible ? (
                <div className="group">
                  <button
                    onClick={handleAudioButtonClick}
                    className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                  >
                    <img
                      src="./assets/img/Vector.png"
                      alt={language === "en" ? "Listen" : "Écouter"}
                      className="w-5 h-5"
                    />
                    <span className="font-medium">
                      {language === "en" ? "Listen" : "Écouter"}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-start mt-12 gap-4 w-full pl-8">
                  <button
                    onClick={() => skipTime(-15)}
                    className="flex items-center justify-center"
                  >
                    <img
                      src="./assets/img/recu.png"
                      alt={language === "en" ? "Rewind 15s" : "Reculer de 15s"}
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                    onClick={toggleAudio}
                    className="w-10 h-10 text-white rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <img
                        src="./assets/img/pause.png"
                        alt={language === "en" ? "Pause" : "Pause"}
                        className="w-10 h-10"
                      />
                    ) : (
                      <img
                        src="./assets/img/rectan.png"
                        alt={language === "en" ? "Play" : "Lire"}
                        className="w-9 h-9"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => skipTime(15)}
                    className="flex items-center justify-center"
                  >
                    <img
                      src="./assets/img/avan.png"
                      alt={language === "en" ? "Forward 15s" : "Avancer de 15s"}
                      className="w-8 h-8"
                    />
                  </button>
                  <div
                    className="relative flex items-center gap-2 w-48"
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                  >
                    <div className="relative w-full h-1 bg-gray-300 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full"
                        style={{
                          width: `${(currentTime / duration) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${(currentTime / duration) * 100}%`,
                        }}
                        onMouseDown={handleDragStart}
                      ></div>
                    </div>
                    <span>
                      {Math.floor(currentTime / 60)}:
                      {("0" + Math.floor(currentTime % 60)).slice(-2)}
                    </span>
                  </div>

                  <div className="relative flex items-center gap-2 w-24">
                    <img
                      src="./assets/img/volume.png"
                      alt={language === "en" ? "Volume" : "Volume"}
                      className="w-6 h-6 cursor-pointer"
                      onClick={toggleVolumeVisibility}
                    />
                    <div
                      className={`absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                        isVolumeVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-full"
                      }`}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-12 h-2 appearance-none rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <audio
                ref={audioRef}
                src="./assets/audio/TEST.mp3"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnd}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </Card>

            <section className="grid grid-cols-2 grid-rows-2 gap-6 mt-8 overflow-auto">
              {/* Card 1 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6 min-h-[200px] overflow-auto">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/cadenas.png"
                    alt={language === "en" ? "Padlock" : "Icone Cadenas"}
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030] dark:text-white">
                    {language === "en" ? "Padlock" : "Cadenas"}
                  </h3>
                </div>
                <p className="text-6xl font-bold text-[#303030] font-outfit mt-12 dark:text-white">
                  {language === "en" ? "Yes" : "Oui"}
                </p>
                <p className="text-gray-500 font-outfit dark:text-white">
                  {language === "en" ? "Lock provided" : "Cadenas fourni"}
                </p>
              </Card>

              {/* Card 2 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6 min-h-[200px] overflow-auto">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/capa.png"
                    alt={language === "en" ? "Capacity" : "Icone Capacité"}
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030] dark:text-white">
                    {language === "en" ? "Capacity" : "Capacité"}
                  </h3>
                </div>
                <p className="text-7xl font-bold text-[#303030] font-outfit mt-12 dark:text-white">
                  50
                </p>
                <p className="text-gray-500 font-outfit dark:text-white">
                  {language === "en" ? "lockers" : "casiers"}
                </p>
              </Card>

              {/* Card 3 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6 min-h-[200px] overflow-auto">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/access.png"
                    alt={
                      language === "en"
                        ? "Accessibility"
                        : "Icone Accessibilité"
                    }
                    className="w-11 h-11"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030] dark:text-white">
                    {language === "en" ? "Accessibility" : "Accessibilité"}
                  </h3>
                </div>
                <p className="text-6xl font-bold text-[#303030] font-outfit mt-12 dark:text-white">
                  {language === "en" ? "Yes" : "Oui"}
                </p>
                <p className="text-gray-500 font-outfit dark:text-white">
                  {language === "en" ? "Accessible PMR" : "Accessible PMR"}
                </p>
              </Card>

              {/* Card 4 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6 min-h-[200px] overflow-auto">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/equi.png"
                    alt={language === "en" ? "Equipment" : "Icone Équipements"}
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030] dark:text-white">
                    {language === "en" ? "Equipment" : "Équipements"}
                  </h3>
                </div>
                <p className="text-6xl font-bold text-[#303030] font-outfit mt-12 dark:text-white">
                  {language === "en" ? "Yes" : "Oui"}
                </p>
                <p className="text-gray-500 font-outfit dark:text-white">
                  {language === "en"
                    ? "Benches, showers, hair dryers"
                    : "Bancs, douches, sèches cheveux"}
                </p>
              </Card>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Vestiaires;
