import React, { useState, useRef } from "react";
import Card from "../components/ui/card";
import Header from "../components/header/header";
import { useLanguage } from "../components/header/ui/context/language-provider";

const Vestiaires = ({ showHeader }: { showHeader: boolean }) => {
  const { language } = useLanguage(); // Get the current language
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false); // Gestion du drag du cercle
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

  // Drag du cercle bleu
  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = () => {
    setIsDragging(false);
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime; // Mise à jour après déplacement
    }
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && duration > 0) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left; // Position du curseur
      const newTime = (offsetX / rect.width) * duration; // Conversion en temps
      setCurrentTime(Math.min(Math.max(newTime, 0), duration)); // Assure une limite
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center overflow-auto"
      style={{ transform: "scale(0.8)" }}
    >
      {showHeader && (
        <div className="w-full z-10">
          <Header />
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 w-[90%] lg:w-[1400px] h-auto">
          <Card className="!px-0 !py-0 h-full">
            <img
              src="/images/vestiaires.jpg"
              alt="Vestiaires"
              className="w-full h-full object-cover rounded-lg"
            />
          </Card>

          <section className="grid grid-rows-[1fr_2fr] gap-6 h-full">
            <Card className="flex flex-col items-center justify-center text-center p-6 relative">
              <span className="absolute top-4 right-4 text-sm bg-blue-100 text-blue-600 dark:bg-blue-200 dark:text-blue-700 py-1 px-4 rounded-full font-mona">
                {language === "en"
                  ? "Comfort & Practicality"
                  : "Confort & Praticité"}
              </span>

              <h2 className="text-4xl font-semibold text-gray-800 font-mona">
                {language === "en" ? "Lockers" : "Vestiaires"}
              </h2>
              <p className="text-2xl text-[#353535] font-mona">
                {language === "en"
                  ? "Comfort and practicality at your service"
                  : "Confort et praticité à votre service"}
              </p>

              {!isAudioVisible ? (
                <div className="group">
                  <button
                    onClick={handleAudioButtonClick}
                    className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 group-hover:animate-bounce"
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
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    {language === "en" ? "Padlock" : "Cadenas"}
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  {language === "en" ? "Yes" : "Oui"}
                </p>
                <p className="text-gray-500 font-outfit">
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
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    {language === "en" ? "Capacity" : "Capacité"}
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  50
                </p>
                <p className="text-gray-500 font-outfit">
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
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    {language === "en" ? "Accessibility" : "Accessibilité"}
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  {language === "en" ? "Yes" : "Oui"}
                </p>
                <p className="text-gray-500 font-outfit">
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
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    {language === "en" ? "Equipment" : "Équipements"}
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  {language === "en" ? "Yes" : "Oui"}
                </p>
                <p className="text-gray-500 font-outfit">
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
