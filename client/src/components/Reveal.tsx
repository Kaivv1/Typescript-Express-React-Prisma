import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
type RevealProps = {
  children: ReactNode;
};

const Reveal: FC<RevealProps> = ({ children }) => {
  return (
    <div className="relative w-fit overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-primary"
      ></motion.div>
    </div>
  );
};

export default Reveal;
