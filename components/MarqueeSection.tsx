"use client";

import { motion } from "framer-motion";

export default function MarqueeSection() {
  const text = "AUTHENTICITY GUARANTEED  •  WORLDWIDE SHIPPING  •  LIMITED DROPS  •  3D EXPERIENCE  •  ";
  
  // We repeat the text so it loops seamlessly
  const content = text.repeat(4);

  return (
    <div className="w-full bg-blue-600 py-4 overflow-hidden relative z-10 border-y border-blue-400/30">
      {/* Overlay gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-600 to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-600 to-transparent z-20" />

      <motion.div
        className="whitespace-nowrap flex"
        animate={{ x: [0, -1000] }} // Adjust -1000 based on text length
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // Speed of scroll
        }}
      >
        <span className="text-white font-bold text-lg md:text-xl tracking-[0.2em] italic mr-4">
          {content}
        </span>
      </motion.div>
    </div>
  );
}