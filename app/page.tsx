"use client";

import ThreeScene from "../components/ThreeScene";
import LoadingScreen from "../components/LoadingScreen";
import MirrorSection from "../components/MirrorSection";
import MarqueeSection from "../components/MarqueeSection";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react"; // <--- ADDED ICONS

// --- MOCK DATA ---
const FEATURED_PRODUCTS = [
  { 
    id: "1", 
    name: "Air Max Pulse", 
    brand: "Nike", 
    category: "Classic", 
    price: 150, 
    image: "/Air Max Pulse.webp", 
    colors: ["#fff", "#000"], 
    isNew: true 
  },
  { 
    id: "3", 
    name: "Piel Becerro Negro", 
    brand: "New Balance", 
    category: "Office", 
    price: 145, 
    image: "/formal shoe.webp", 
    colors: ["#000"] 
  },
  { 
    id: "6", 
    name: "B44 Blade", 
    brand: "Dior", 
    category: "New Arrival", 
    price: 950, 
    image: "/B44 Blade.webp", 
    colors: ["#fff", "#000", "#4b1218"], 
    isNew: true 
  },
  { id: "5", name: "Dunk Low", brand: "Nike", category: "Best Selling", price: 115, image: "/Duck Low.webp", colors: ["#000"] }

];

// --- 1. MOBILE TRENDING (Horizontal Scroll) ---
const MobileTrending = () => (
  <section className="md:hidden py-12 px-0 relative z-10">
     <div className="px-6 flex justify-between items-end mb-6">
        <div>
           <h2 className="text-2xl font-bold flex items-center gap-2">
              <Flame className="text-orange-500 w-6 h-6" /> TRENDING HEAT
           </h2>
           <p className="text-gray-400 text-xs mt-1">The most hyped pairs of the week.</p>
        </div>
        <Link href="/product" className="text-blue-500 font-bold text-xs flex items-center">
           VIEW ALL <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
     </div>
     
     {/* Horizontal Scroll Snap Container */}
     {/* Added utility classes to hide scrollbar: [&::-webkit-scrollbar]:hidden */}
     <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 [&::-webkit-scrollbar]:hidden">
        {FEATURED_PRODUCTS.map(product => (
           <div key={product.id} className="min-w-[40vw] snap-center">
              <ProductCard product={product} />
           </div>
        ))}
     </div>
  </section>
);

// --- 2. DESKTOP TRENDING (Grid Layout) ---
const DesktopTrending = () => (
  <section id="trending" className="hidden md:block py-24 px-6 max-w-7xl mx-auto relative z-10">
     <div className="flex justify-between items-end mb-12">
        <div>
           <h2 className="text-4xl font-bold flex items-center gap-3">
              <Flame className="text-orange-500 w-8 h-8" /> TRENDING HEAT
           </h2>
           <p className="text-gray-400 mt-2">The most hyped pairs of the week.</p>
        </div>
        <Link href="/product" className="text-blue-500 font-bold text-sm flex items-center hover:text-white transition">
           VIEW ALL <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
     </div>
     <div className="hidden md:grid md:grid-cols-4 gap-8">
        {FEATURED_PRODUCTS.map(product => (
           <ProductCard key={product.id} product={product} />
        ))}
     </div>
  </section>
);

// --- 3. HERO SECTIONS (Existing) ---
const MobileHero = () => {
  return (
    <section className="md:hidden flex flex-col w-full relative z-10 pb-12">
      <div className="w-full h-[45vh] min-h-[350px] relative ">
         <ThreeScene modelScale={2.5}/>
      </div>
      <div className="flex flex-col items-center text-center pt-5 px-6 space-y-6 pointer-events-none">
         <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="pointer-events-auto"
         >
            <span className="inline-block px-3 py-1 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wide">
               MULTI-BRAND STORE
            </span>
         </motion.div>
         <h2 className="text-4xl font-extrabold leading-tight tracking-tight pointer-events-auto">
            YOUR UNIVERSE <br/>
            OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">FOOTWEAR</span>
         </h2>
         <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto pointer-events-auto">
            Experience the latest drops from Nike, Adidas, and Puma in immersive 3D.
         </p>
         <div className="flex flex-col w-full gap-3 pt-2 pointer-events-auto">
            <Link href="/product" className="w-full">
               <button className="w-full py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition active:scale-95 text-sm">
                  Shop All
               </button>
            </Link>
            <Link href="/product" className="w-full">
               <button className="w-full py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition active:scale-95 text-sm backdrop-blur-sm">
                  View Brands
               </button>
            </Link>
         </div>
         <div className="pt-4 flex flex-wrap justify-center gap-3 text-gray-500 text-[10px] font-bold tracking-widest uppercase pointer-events-auto">
            <span>Nike</span> • <span>Adidas</span> • <span>Puma</span>
         </div>
      </div>
    </section>
  );
};

const DesktopHero = () => {
  return (
    <section className="hidden md:flex relative flex-row items-center justify-between min-h-[calc(100vh-80px)] px-16 lg:px-24 w-full max-w-7xl mx-auto z-10 pt-20">
       <div className="flex-1 space-y-8 z-10 text-left">
          <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.5 }}
          >
             <span className="inline-block px-3 py-1 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wide">
                MULTI-BRAND STORE
             </span>
          </motion.div>
          <h2 className="text-7xl font-extrabold leading-[1.1] tracking-tight">
             YOUR UNIVERSE <br />
             OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">FOOTWEAR</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-md leading-relaxed">
             Experience the latest drops from Nike, Adidas, and Puma in immersive 3D.
          </p>
          <div className="flex gap-4 pt-4">
             <Link href="/product">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition transform hover:scale-105 active:scale-95 text-base">
                   Shop All
                </button>
             </Link>
             <Link href="/product">
                <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition backdrop-blur-sm active:scale-95 text-base">
                   View Brands
                </button>
             </Link>
          </div>
          <div className="pt-8 flex gap-6 text-gray-600 text-xs font-bold tracking-widest uppercase">
             <span>Nike</span> • <span>Adidas</span> • <span>Puma</span> • <span>New Balance</span>
          </div>
       </div>
       <div className="flex-1 w-full relative h-[600px]">
          <ThreeScene />
       </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. LOADER */}
      <LoadingScreen />

      {/* 2. BACKGROUND ATMOSPHERE */}
      <div className="fixed top-[-10%] right-[-20%] md:top-[-20%] md:right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />

      {/* 3. NAVBAR */}
      <Navbar />

      {/* 4. HERO SECTIONS */}
      <MobileHero />
      <DesktopHero />

      {/* 5. MARQUEE */}
      <MarqueeSection />

      {/* 6. TRENDING SECTIONS (Split Mobile/Desktop) */}
      <MobileTrending />
      <DesktopTrending />

      {/* 7. MIRROR COLLECTION */}
      <div className="relative z-10 bg-[#050505]">
        <MirrorSection />
      </div>

      {/* 8. NEWSLETTER */}
      <Newsletter />

      {/* 9. FOOTER */}
      <Footer />

    </main>
  );
}