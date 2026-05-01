"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Home.", "Flat.", "Rental.", "Investment.", "Forever Place."];

export function WordCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block min-w-[200px] h-[1.1em] align-top overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="absolute left-0 text-forest italic"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
