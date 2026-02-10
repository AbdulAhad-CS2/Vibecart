"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setFinished(true), 800);
    }
  }, [progress]);

  const blueGlow = "drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]";

  return (
    <AnimatePresence>
      {!finished && (
        // --- FIX: Increased z-index from z-50 to z-[100] ---
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
          
          {/* CENTERED CONTENT */}
          <motion.div 
             className="absolute z-20 flex flex-col items-center justify-center gap-6"
             initial={{ opacity: 1 }}
             exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
              <img src="/logo.webp" alt="Sole Vault Logo" className="w-32 md:w-48 h-auto object-contain opacity-90" />
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase flex items-center">
                <span className="text-gray-200 bg-clip-text bg-gradient-to-b from-white to-gray-400 text-transparent">SOLE</span>
                <span className={`text-blue-500 ml-2 ${blueGlow}`}>VAULT</span>
              </h1>

               <p className="text-blue-400 font-mono text-sm tracking-[0.3em] font-bold mt-4">
                 INITIALIZING... {Math.round(progress)}%
               </p>
          </motion.div>

          {/* LEFT CURTAIN */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 bg-[#030712]"
            initial={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }} 
          />

          {/* RIGHT CURTAIN */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 bg-[#030712]"
            initial={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }}
          />
          
        </div>
      )}
    </AnimatePresence>
  );
}