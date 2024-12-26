import React from "react";
import { motion, useAnimation } from "framer-motion";

interface LeftCalendarArrowProps {
  color?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const LeftCalendarArrow = ({ color, onClick }: LeftCalendarArrowProps) => {
  const controls = useAnimation();

  const handleClick = () => {
    // Déclenche l'animation de "coup"
    controls.start({
      scale: [1, 0.9, 1],
      transition: {
        duration: 0.15,
        times: [0, 0.5, 1],
        ease: "easeOut",
      },
    });
  };

  return (
    <motion.div
      className={`group bg-gray-100 dark:bg-dark-element hover:bg-primary h-8 w-8 rounded-full flex items-center justify-center cursor-pointer ${
        color ? `text-[${color}]` : "text-[#348CFF]"
      }`}
      animate={controls}
      onClick={(event) => {
        handleClick();
        onClick(event);
      }}
    >
      <svg
        width="10"
        height="14"
        viewBox="0 0 13 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9.73205C-0.333332 8.96225 -0.333334 7.03775 0.999999 6.26795L10 1.0718C11.3333 0.301996 13 1.26425 13 2.80385L13 13.1962C13 14.7358 11.3333 15.698 10 14.9282L1 9.73205Z"
          className="fill-current group-hover:text-white"
        />
      </svg>
    </motion.div>
  );
};

export default LeftCalendarArrow;
