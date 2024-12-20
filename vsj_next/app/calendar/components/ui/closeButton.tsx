import { motion } from "framer-motion";
import Image from "next/image";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <motion.div
      className="rounded-md bg-secondary-agenda p-1 absolute top-4 right-4 cursor-pointer"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      onClick={onClick}
    >
      <Image
        src="/assets/icons/croix.svg"
        width={10}
        height={10}
        alt="fermer"
      />
    </motion.div>
  );
};

export default CloseButton;
