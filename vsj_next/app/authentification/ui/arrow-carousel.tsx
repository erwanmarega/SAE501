import React from "react";
import { motion, useAnimation } from "framer-motion";

interface ArrowCarouselProps {
  onPrevious: () => void;
  onNext: () => void;
}

const ArrowCarousel: React.FC<ArrowCarouselProps> = ({
  onPrevious,
  onNext,
}) => {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  const handleClickLeft = () => {
    controlsLeft.start({
      scale: [1, 0.85, 1],
      transition: {
        duration: 0.15,
        times: [0, 0.5, 1],
        ease: "easeOut",
      },
    });
    onPrevious();
  };

  const handleClickRight = () => {
    controlsRight.start({
      scale: [1, 0.85, 1],
      transition: {
        duration: 0.15,
        times: [0, 0.5, 1],
        ease: "easeOut",
      },
    });
    onNext();
  };

  return (
    <div className="absolute right-4 bottom-4 flex gap-3">
      {/* Flèche gauche */}
      <motion.div
        animate={controlsLeft}
        onClick={handleClickLeft}
        className="group relative flex items-center justify-center p-2 rounded-full border-2 border-white group-hover:border-transparent overflow-hidden cursor-pointer w-8 h-8"
      >
        <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
        <svg
          width="8"
          height="8"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 stroke-white group-hover:stroke-black transition-colors duration-300"
        >
          <path
            d="M15 8L1 8M1 8L8 15M1 8L8 0.999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Flèche droite */}
      <motion.div
        animate={controlsRight}
        onClick={handleClickRight}
        className="group relative flex items-center justify-center p-2 rounded-full border-2 border-white group-hover:border-transparent overflow-hidden cursor-pointer w-8 h-8"
      >
        <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
        <svg
          width="8"
          height="8"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 stroke-white group-hover:stroke-black transition-colors duration-300"
        >
          <path
            d="M1 8L15 8M15 8L8 15M15 8L8 1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ArrowCarousel;
