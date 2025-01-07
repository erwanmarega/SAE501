"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

interface DeleteElementProps {
  className?: string;
  onClick?: () => void; // Ajout de la prop onClick
}

const DeleteElement: React.FC<DeleteElementProps> = ({
  className,
  onClick,
}) => {
  return (
    <motion.div
      className={clsx(
        "bg-secondary-agenda p-1 cursor-pointer w-max h-max rounded-lg absolute -top-1 -right-1",
        className
      )}
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
      }}
      onClick={onClick} // Ajout de l'événement onClick
    >
      <Image
        alt="Supprimer"
        width={10}
        height={10}
        src="/assets/icons/white_plus.svg"
        className="rotate-45"
      />
    </motion.div>
  );
};

export default DeleteElement;
