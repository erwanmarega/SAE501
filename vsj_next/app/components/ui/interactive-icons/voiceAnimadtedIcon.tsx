// components/AnimatedIcon.tsx

"use client";

import React from "react";
import Lottie from "lottie-react";
// Importez le JSON selon l'endroit où vous l'avez placé

// Option 1 : Si placé dans public/animations
// Vous devrez utiliser fetch pour charger le JSON
import { useEffect, useState } from "react";

const VoiceAnimatedIcon: React.FC = () => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/assets/animations/voice_animated.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) =>
        console.error("Erreur lors du chargement de l'animation :", error)
      );
  }, []);

  if (!animationData) {
    return <div>Chargement...</div>; // Vous pouvez personnaliser le loader
  }

  return (
    <div style={{ width: 50, height: 50 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default VoiceAnimatedIcon;
