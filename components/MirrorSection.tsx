"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image"; 
import { useRouter } from "next/navigation"; // <--- 1. IMPORT ROUTER

// --- PROPS INTERFACE ---
interface MirrorCardProps {
  title: string;
  imgSrc: string;
  isLocked: boolean;
  onNavigate: () => void;
}

const MirrorCard = ({ title, imgSrc, isLocked, onNavigate }: MirrorCardProps) => {
  const [isBroken, setIsBroken] = useState(false);
  const router = useRouter(); // <--- 2. INITIALIZE ROUTER

  const handleClick = () => {
    if (isLocked || isBroken) return;

    onNavigate();
    setIsBroken(true);

    // 3. REDIRECT LOGIC
    // Wait for the animation (1.5s) then go to the filtered product page
    setTimeout(() => {
        router.push(`/product?category=${encodeURIComponent(title)}`);
    }, 1500); 
  };

  // The Shards
  const shards = [
    { clip: "polygon(0 0, 50% 0, 30% 30%, 0 40%)", x: -50, y: -50, r: -20 },
    { clip: "polygon(50% 0, 100% 0, 100% 40%, 70% 30%)", x: 50, y: -50, r: 20 },
    { clip: "polygon(0 40%, 30% 30%, 40% 60%, 0 100%)", x: -50, y: 50, r: -10 },
    { clip: "polygon(100% 40%, 100% 100%, 60% 60%, 70% 30%)", x: 50, y: 50, r: 10 },
    { clip: "polygon(30% 30%, 70% 30%, 60% 60%, 40% 60%)", x: 0, y: 0, r: 0 },
  ];

  return (
    <div 
      onClick={handleClick}
      className={`relative h-[300px] w-full overflow-hidden rounded-xl transition-all duration-300
        ${isLocked && !isBroken ? "opacity-40 cursor-not-allowed grayscale blur-[2px]" : "cursor-pointer group hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"} 
      `}
    >
      {/* 1. UNBROKEN STATE */}
      {!isBroken && (
        <div className="absolute inset-0 z-10">
          
          {/* --- NEXT.JS IMAGE OPTIMIZATION --- */}
          <div className="absolute inset-0 bg-neutral-900">
            <Image 
                src={imgSrc} 
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl font-bold tracking-widest uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] z-20 group-hover:tracking-[0.5em] transition-all duration-500">
              {title}
            </h3>
          </div>

          <div className="absolute inset-0 border-2 border-white/5 group-hover:border-blue-500/50 transition-colors duration-500 rounded-xl" />
        </div>
      )}

      {/* 2. BROKEN STATE */}
      {isBroken && (
        <div className="absolute inset-0 z-20 pointer-events-none">
           {shards.map((shard, i) => (
             <motion.div
               key={i}
               initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
               animate={{ 
                 x: shard.x * 3, 
                 y: shard.y * 3 + 100, 
                 rotate: shard.r * 2, 
                 opacity: 0 
               }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="absolute inset-0 border-l border-t border-white/20"
               style={{ 
                 clipPath: shard.clip,
                 backgroundImage: `url('${imgSrc}')`, 
                 backgroundSize: "cover",
                 backgroundPosition: "center"
               }}
             />
           ))}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="absolute inset-0 flex items-center justify-center bg-black"
           >
              <p className="text-blue-500 font-mono animate-pulse font-bold tracking-widest">ENTERING VAULT...</p>
           </motion.div>
        </div>
      )}
    </div>
  );
};

// --- MAIN SECTION ---
export default function MirrorSection() {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = () => {
    setIsNavigating(true);
    // Reset state after animation completes
    setTimeout(() => {
        setIsNavigating(false);
    }, 2500); 
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      
      <div className="mb-12 text-center md:text-left">
         <h2 className="text-4xl font-bold text-white mb-2">COLLECTIONS</h2>
         <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* UPPER ROW: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MirrorCard 
            title="Classic" 
            imgSrc="/sneaker classic.webp" 
            isLocked={isNavigating} 
            onNavigate={handleNavigate} 
          />
          <MirrorCard 
            title="Sports" 
            imgSrc="/sports.webp" 
            isLocked={isNavigating} 
            onNavigate={handleNavigate} 
          />
          <MirrorCard 
            title="Office" 
            imgSrc="/office.webp" 
            isLocked={isNavigating} 
            onNavigate={handleNavigate} 
          />
        </div>

        {/* LOWER ROW: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MirrorCard 
            // 4. FIX: Singular "New Arrival" to match filters
            title="New Arrival" 
            imgSrc="/new arrival.webp" 
            isLocked={isNavigating} 
            onNavigate={handleNavigate} 
          />
          <MirrorCard 
            title="Best Selling" 
            imgSrc="/best selling.webp" 
            isLocked={isNavigating} 
            onNavigate={handleNavigate} 
          />
        </div>

      </div>
    </section>
  );
}