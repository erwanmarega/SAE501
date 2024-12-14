import React from "react";
import { motion, useAnimation } from "framer-motion";

interface RightCalendarArrowProps {
  color?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const RightCalendarArrow = ({ color, onClick }: RightCalendarArrowProps) => {
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
          d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 0 14.7358 0 13.1962V2.80385C0 1.26425 1.66667 0.301996 3 1.0718L12 6.26795Z"
          className="fill-current group-hover:text-white"
        />
      </svg>
    </motion.div>
  );
};

export default RightCalendarArrow;
