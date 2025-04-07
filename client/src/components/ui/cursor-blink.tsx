import { motion } from "framer-motion";

export const CursorBlink = () => {
  return (
    <motion.span 
      className="inline-block text-accent"
      animate={{ 
        opacity: [1, 0, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "loop"
        }
      }}
    >
      |
    </motion.span>
  );
};
