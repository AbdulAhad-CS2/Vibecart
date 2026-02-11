"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- DATA: WATCH COLLECTIONS ---
const WATCH_CATS = [
  { 
    id: 1, 
    title: "The Executive", 
    subtitle: "Business & Dress", 
    image: "/watch-2.png", // Use your specific images
    bg: "bg-gradient-to-br from-gray-900 to-black"
  },
  { 
    id: 2, 
    title: "Sport & Speed", 
    subtitle: "Chronographs", 
    image: "/watch-1.png",
    bg: "bg-gradient-to-br from-blue-900/40 to-black"
  },
  { 
    id: 3, 
    title: "Mechanical", 
    subtitle: "Skeleton Series", 
    image: "/watch-2.png",
    bg: "bg-gradient-to-br from-yellow-900/20 to-black"
  },
  { 
    id: 4, 
    title: "Tactical", 
    subtitle: "Digital & Rugged", 
    image: "/watch-1.png",
    bg: "bg-gradient-to-br from-green-900/20 to-black"
  },
];

const WATCH_BRANDS = ["ROLEX STYLE", "PATEK STYLE", "NAVIFORCE", "POEDAGAR", "CURREN", "SVESTON", "SKMEI", "HUBLOT STYLE"];

// --- DATA: PERFUME COLLECTIONS ---
const PERFUME_CATS = [
  { 
    id: 1, 
    title: "French Signatures", 
    subtitle: "Fresh & Citrus", 
    image: "/perfume-1.png",
    bg: "bg-gradient-to-br from-blue-900/30 to-black"
  },
  { 
    id: 2, 
    title: "Arabic Oud", 
    subtitle: "Rich & Smoky", 
    image: "/perfume-1.png",
    bg: "bg-gradient-to-br from-yellow-900/30 to-black"
  },
  { 
    id: 3, 
    title: "Night Mode", 
    subtitle: "Sweet & Loud", 
    image: "/perfume-1.png",
    bg: "bg-gradient-to-br from-purple-900/30 to-black"
  },
  { 
    id: 4, 
    title: "Pakistani Edit", 
    subtitle: "Local Impressions", 
    image: "/perfume-1.png",
    bg: "bg-gradient-to-br from-green-900/30 to-black"
  },
];

const PERFUME_BRANDS = ["LATTAFA", "ARMAF", "PENDORA", "J.", "BONANZA", "RASASI", "AJMAL", "DUNHILL IMPRESSIONS"];

// --- SUB-COMPONENT: BRAND TICKER ---
const BrandTicker = ({ brands, color = "text-white" }: { brands: string[], color?: string }) => (
  <div className="w-full overflow-hidden border-t border-b border-white/5 py-4 bg-black/50 backdrop-blur-sm">
    <motion.div 
      className="flex whitespace-nowrap gap-12"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...brands, ...brands, ...brands].map((brand, i) => (
        <span key={i} className={`text-sm font-bold tracking-[0.2em] ${color} opacity-60`}>
          {brand}
        </span>
      ))}
    </motion.div>
  </div>
);

// --- SUB-COMPONENT: COLLECTION CARD ---
const CategoryCard = ({ item }: { item: any }) => (
  <Link href={`/shop/${item.title.toLowerCase().replace(" ", "-")}`} className="group relative h-[250px] overflow-hidden rounded-2xl border border-white/10 transition-all hover:border-white/30">
    {/* Background */}
    <div className={`absolute inset-0 ${item.bg} opacity-80 transition-opacity group-hover:opacity-100`} />
    
    {/* Text */}
    <div className="absolute top-4 left-4 z-20">
      <h3 className="text-xl font-bold text-white leading-none">{item.title}</h3>
      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{item.subtitle}</p>
    </div>

    {/* Image */}
    <div className="absolute bottom-0 right-0 w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
       <Image 
         src={item.image} 
         alt={item.title} 
         fill 
         className="object-contain object-bottom-right drop-shadow-2xl"
       />
    </div>

    {/* Arrow Icon */}
    <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight className="w-4 h-4" />
    </div>
  </Link>
);

export default function CollectionsSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 space-y-32">
      
      {/* 1. WATCH SECTION */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
           <div>
              <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase">Precision & Prestige</span>
              <h2 className="text-4xl md:text-5xl font-black italic mt-2">WATCH COLLECTION</h2>
           </div>
           <p className="text-gray-400 text-sm max-w-xs text-right">
              From the boardroom to the gym. Discover timepieces that define your status.
           </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {WATCH_CATS.map((cat) => (
             <CategoryCard key={cat.id} item={cat} />
           ))}
        </div>

        {/* Brands Ticker */}
        <BrandTicker brands={WATCH_BRANDS} color="text-yellow-500" />
      </div>


      {/* 2. PERFUME SECTION */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
           <div>
              <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">Scent & Aura</span>
              <h2 className="text-4xl md:text-5xl font-black italic mt-2">FRAGRANCE LAB</h2>
           </div>
           <p className="text-gray-400 text-sm max-w-xs text-right">
              Long-lasting impressions. Choose your vibe from our curated scent families.
           </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {PERFUME_CATS.map((cat) => (
             <CategoryCard key={cat.id} item={cat} />
           ))}
        </div>

        {/* Brands Ticker */}
        <BrandTicker brands={PERFUME_BRANDS} color="text-blue-500" />
      </div>

    </section>
  );
}