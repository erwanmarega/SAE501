"use client";

import React from "react";
import Image from "next/image";

interface GroupProps {
  size?: number; // Largeur souhaitée
  imagePath: string; // Chemin de l'image à transmettre en props
}

const originalPath =
  "M0 36C0 21.0011 0 13.5016 3.81966 8.2443C5.05325 6.5464 6.5464 5.05325 8.2443 3.81966C13.5016 0 21.0011 0 36 0H41C55.9989 0 63.4984 0 68.7557 3.81966C70.4536 5.05325 71.9468 6.5464 73.1803 8.2443C77 13.5016 77 21.0011 77 36C77 50.9989 77 58.4984 73.1803 63.7557C71.9468 65.4536 70.4536 66.9468 68.7557 68.1803C63.4984 72 55.9989 72 41 72H36C21.0011 72 13.5016 72 8.2443 68.1803C6.5464 66.9468 5.05325 65.4536 3.81966 63.7557C0 58.4984 0 50.9989 0 36Z";

// Fonction pour mettre à l'échelle le path
function scalePath(path: string, scale: number): string {
  return path.replace(/(\d+(\.\d+)?)/g, (match) => {
    const val = parseFloat(match);
    return (val * scale).toString();
  });
}

const Group: React.FC<GroupProps> = ({ size = 77, imagePath }) => {
  const scaleFactor = size / 77;
  const finalHeight = 72 * scaleFactor;
  const scaledPath = scalePath(originalPath, scaleFactor);

  return (
    <div
      className="relative bg-gray-100 overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${finalHeight}px`,
        clipPath: `path("${scaledPath}")`,
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        {/*  <Image
          src={imagePath}
          alt="Mon profil"
          width={Math.floor(50 * scaleFactor)}
          height={Math.floor(50 * scaleFactor)}
        />*/}
      </div>
    </div>
  );
};

export default Group;
