import React, { useState, useRef } from "react";
import Card from "../components/ui/card";
import Header from "../components/header/header";

const PlateformeDeJeux = () => {
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
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
    if (audioRef.current) {
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

  return (
    <div className="h-[100vh] flex flex-col items-center bg-[#F7F7F7] dark:bg-[#262629] overflow-hidden">
      <Header />

      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="grid grid-cols-[3fr_2fr] gap-10 w-[90%] lg:w-[1400px] h-[85%]">
          <Card className="!px-0 !py-0 h-full">
            <img
              src="/images/plateforme-de-jeux.jpg"
              alt="Plateforme de jeux"
              className="w-full h-full object-cover rounded-lg"
            />
          </Card>

          <section className="grid grid-rows-[1fr_2fr] gap-6 h-full">
            <Card className="flex flex-col items-center justify-center text-center p-6 relative">
              <span className="absolute top-4 right-4 text-md bg-blue-100 text-blue-600 py-1 px-5 rounded-full font-mona">
                Loisirs
              </span>
              <h2 className="text-4xl font-semibold text-gray-800 font-mona">
                Plateforme de jeux
              </h2>
              <p className="text-2xl text-[#353535] font-mona">
                Zone récréative pour tous
              </p>

              {!isAudioVisible ? (
                <div className="group">
                  <button
                    onClick={handleAudioButtonClick}
                    className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 group-hover:animate-bounce"
                  >
                    <img
                      src="./assets/img/Vector.png"
                      alt="Écouter Icone"
                      className="w-5 h-5"
                    />
                    <span className="font-medium">Écouter</span>
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
                      alt="Reculer de 15s"
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
                        alt="Pause"
                        className="w-10 h-10"
                      />
                    ) : (
                      <img
                        src="./assets/img/rectan.png"
                        alt="Play"
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
                      alt="Avancer de 15s"
                      className="w-8 h-8"
                    />
                  </button>
                  <div className="flex items-center gap-2 w-48 justify-center">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => {
                        if (audioRef.current) {
                          audioRef.current.currentTime = parseFloat(
                            e.target.value
                          );
                          setCurrentTime(audioRef.current.currentTime);
                        }
                      }}
                      className="w-full appearance-none rounded-full bg-gray-300"
                    />
                    <span>
                      {Math.floor(currentTime / 60)}:
                      {("0" + Math.floor(currentTime % 60)).slice(-2)}
                    </span>
                  </div>
                  <div className="relative flex items-center gap-2 w-24">
                    <img
                      src="./assets/img/volume.png"
                      alt="Volume"
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

            <section className="grid grid-cols-2 grid-rows-2 gap-6 mt-8">
              {/* Carte 1 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/Group 480.png"
                    alt="Icone Profondeur"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    Profondeur
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  1.5
                </p>
                <p className="text-gray-500 font-outfit">mètres</p>
              </Card>

              {/* Carte 2 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/capa.png"
                    alt="Icone Capacité"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    Capacité
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  50
                </p>
                <p className="text-gray-500 font-outfit">personnes</p>
              </Card>

              {/* Carte 3 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/gat.png"
                    alt="Icone Âge"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    Âge
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  6+
                </p>
                <p className="text-gray-500 font-outfit">ans</p>
              </Card>

              {/* Carte 4 */}
              <Card className="relative flex flex-col items-center justify-center text-center p-6">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src="./assets/img/Horloge.png"
                    alt="Icone Horaires"
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold font-mona text-[#303030]">
                    Horaires
                  </h3>
                </div>
                <p className="text-8xl font-bold text-[#303030] font-outfit mt-12">
                  9-18
                </p>
                <p className="text-gray-500 font-outfit">heures</p>
              </Card>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlateformeDeJeux;
