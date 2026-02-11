"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";

// --- IMPORTS FROM YOUR PROJECT ---
// Make sure these components exist in your project
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MirrorSection from "../components/CollectionsSection"; 
import ProductCard from "@/components/ProductCard";
import CollectionsSection from "../components/CollectionsSection";

// =========================================
// DATA CONSTANTS
// =========================================

// 1. HERO DATA
const HERO_ITEMS = [
  {
    id: 1,
    title: "ROYAL OAK",
    subtitle: "SILVER EDITION",
    description: "The definition of prestige. Stainless steel finish with a 3-day checking warranty.",
    price: "Rs. 3,500",
    image: "/watch-1.png", 
    accent: "from-gray-200 to-gray-500",
    bgGlow: "bg-gray-500/20"
  },
  {
    id: 2,
    title: "SAUVAGE",
    subtitle: "IMPRESSION OIL",
    description: "Smells 100% identical to the original. Lasts 12+ hours in Karachi heat.",
    price: "Rs. 1,800",
    image: "/perfume-1.png",
    accent: "from-blue-400 to-blue-700",
    bgGlow: "bg-blue-500/20"
  },
  {
    id: 3,
    title: "PATEK",
    subtitle: "NAUTILUS STYLE",
    description: "Automatic movement style. The most demanded watch in Pakistan right now.",
    price: "Rs. 4,200",
    image: "/watch-2.png",
    accent: "from-yellow-400 to-yellow-700",
    bgGlow: "bg-yellow-500/20"
  }
];

// 2. TRENDING PRODUCTS DATA (12 Items)
const FEATURED_PRODUCTS = [
  // Set 1
  { id: "1", name: "Royal Oak", brand: "Luxury", category: "Classic", price: 3500, image: "/watch-1.png", colors: ["#000"] },
  { id: "2", name: "Sauvage Oil", brand: "Scents", category: "Perfume", price: 1800, image: "/perfume-1.png", colors: ["#000"] },
  { id: "3", name: "Nautilus", brand: "Luxury", category: "Classic", price: 4200, image: "/watch-2.png", colors: ["#000"] },
  { id: "4", name: "Hublot Style", brand: "Sport", category: "Sport", price: 2900, image: "/watch-1.png", colors: ["#000"] },
  // Set 2
  { id: "5", name: "Creed Aventus", brand: "Scents", category: "Perfume", price: 2200, image: "/perfume-1.png", colors: ["#000"] },
  { id: "6", name: "Daytona", brand: "Luxury", category: "Classic", price: 4500, image: "/watch-2.png", colors: ["#000"] },
  { id: "7", name: "Bleu de Chanel", brand: "Scents", category: "Perfume", price: 1950, image: "/perfume-1.png", colors: ["#000"] },
  { id: "8", name: "G-Shock Style", brand: "Sport", category: "Sport", price: 1500, image: "/watch-1.png", colors: ["#000"] },
  // Set 3
  { id: "9", name: "Datejust", brand: "Luxury", category: "Classic", price: 3800, image: "/watch-2.png", colors: ["#000"] },
  { id: "10", name: "Tom Ford Oud", brand: "Scents", category: "Perfume", price: 2500, image: "/perfume-1.png", colors: ["#000"] },
  { id: "11", name: "Richard Mille", brand: "Luxury", category: "Sport", price: 5500, image: "/watch-1.png", colors: ["#000"] },
  { id: "12", name: "Baccarat Rouge", brand: "Scents", category: "Perfume", price: 3000, image: "/perfume-1.png", colors: ["#000"] },
];

// 3. SPOTLIGHT DATA (Multiple Slides with Dynamic Shadows)
const SPOTLIGHT_ITEMS = [
  {
    id: 1,
    tag: "Limited Edition Drop",
    title: "MIDNIGHT",
    highlight: "GOLD",
    highlightColor: "from-yellow-300 to-yellow-600",
    desc: "Designed for the nightlife. Watches that catch every light in the room and fragrances that last until the sun comes up.",
    image: "/watch-2.png",
    link: "/shop/midnight",
    shadowClass: "drop-shadow-[0_20px_60px_rgba(234,179,8,0.5)]"
  },
  {
    id: 2,
    tag: "Summer Essentials",
    title: "OCEAN",
    highlight: "NOIR",
    highlightColor: "from-blue-400 to-blue-700",
    desc: "Fresh, aquatic scents paired with silver-tone timepieces. Perfect for the Karachi heat.",
    image: "/perfume-1.png",
    link: "/shop/summer",
    shadowClass: "drop-shadow-[0_20px_60px_rgba(59,130,246,0.5)]"
  },
  {
    id: 3,
    tag: "Executive Series",
    title: "URBAN",
    highlight: "ONYX",
    highlightColor: "from-gray-200 to-white",
    desc: "Understated dominance. Matte black finishes and woody notes for the modern professional.",
    image: "/watch-1.png",
    link: "/shop/urban",
    shadowClass: "drop-shadow-[0_20px_60px_rgba(255,255,255,0.3)]"
  }
];

// =========================================
// SUB-COMPONENTS
// =========================================

// --- COMPONENT: HERO SECTION ---
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); 

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === HERO_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? HERO_ITEMS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = HERO_ITEMS[currentIndex];

  const textVariants = {
    hidden: (dir: number) => ({ opacity: 0, x: dir === 1 ? 100 : -100 }),
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: (dir: number) => ({ opacity: 0, x: dir === 1 ? -100 : 100, transition: { duration: 0.4 } })
  };

  const imageVariants = {
    hidden: (dir: number) => ({ opacity: 0, x: dir === 1 ? 200 : -200, rotate: dir === 1 ? 15 : -15, scale: 0.8 }),
    visible: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: (dir: number) => ({ opacity: 0, x: dir === 1 ? -200 : 200, rotate: dir === 1 ? -15 : 15, scale: 0.8, transition: { duration: 0.5 } })
  };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen bg-[#050505] text-white overflow-hidden flex items-center pt-20 md:pt-0">
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 pointer-events-none ${currentItem.bgGlow}`} />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col items-start space-y-6 z-20 min-h-[300px] justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={textVariants} animate="visible" exit="exit" className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full backdrop-blur-md">
                 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                 <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">Best Seller</span>
               </div>
               <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                 {currentItem.title} <br />
                 <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentItem.accent}`}>{currentItem.subtitle}</span>
               </h1>
               <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">{currentItem.description}</p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center">
                 <Link href="/product">
                   <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition active:scale-95 flex items-center gap-2">
                     Buy Now - {currentItem.price} <ArrowRight className="w-4 h-4" />
                   </button>
                 </Link>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                   <ShieldCheck className="w-4 h-4 text-green-500" /> Cash On Delivery
                 </div>
               </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative flex justify-center items-center h-[400px] md:h-[600px]">
           <div className="relative w-full h-full flex items-center justify-center">
             <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentIndex} custom={direction} variants={imageVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                  <Image src={currentItem.image} alt={currentItem.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]" priority sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
             </AnimatePresence>
           </div>
           <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-4 z-30">
              <button onClick={handlePrev} className="w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={handleNext} className="w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronRight className="w-6 h-6" /></button>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: GOLD MARQUEE ---
const MarqueeBar = () => {
  return (
    <div className="relative w-full bg-yellow-500 text-black py-3 overflow-hidden border-y-4 border-black z-20 transform -rotate-1 origin-left scale-105">
       <motion.div className="flex whitespace-nowrap gap-12 text-sm font-black uppercase tracking-widest items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-12">
                OFFICIAL ROLEX & PATEK IMPRESSIONS <Star className="w-4 h-4 fill-black" /> 
                FAST SHIPPING KARACHI • LAHORE • ISLAMABAD <Star className="w-4 h-4 fill-black" />
             </span>
          ))}
       </motion.div>
    </div>
  );
};

// --- COMPONENT: SPOTLIGHT SECTION (Swappable & Dynamic Shadows) ---
const SpotlightSection = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const nextSlide = () => {
    setDir(1);
    setIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length);
  };

  const prevSlide = () => {
    setDir(-1);
    setIndex((prev) => (prev - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length);
  };

  // Auto-Slide Logic
  useEffect(() => {
    const timer = setInterval(() => {
        nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const current = SPOTLIGHT_ITEMS[index];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] md:blur-[120px] rounded-full pointer-events-none" />

       {/* CARD CONTAINER */}
       <div className="relative grid md:grid-cols-2 gap-16 items-center bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 z-10 backdrop-blur-md overflow-hidden group">
          
          {/* NAVIGATION ARROWS */}
          <button 
             onClick={prevSlide}
             className="absolute left-4 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30"
          >
             <ChevronLeft className="w-10 h-10" />
          </button>
          <button 
             onClick={nextSlide}
             className="absolute right-4 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30"
          >
             <ChevronRight className="w-10 h-10" />
          </button>

          {/* TEXT CONTENT (Animated) */}
          <div className="space-y-8 relative z-20 px-8">
             <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: dir === 1 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === 1 ? -50 : 50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                        {current.tag}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black italic leading-[0.9]">
                        {current.title} <br/> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${current.highlightColor}`}>{current.highlight}</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                        {current.desc}
                    </p>
                    <div className="flex gap-4">
                        <Link href={current.link}>
                            <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition transform hover:-translate-y-1 shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                            Shop The Look
                            </button>
                        </Link>
                    </div>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* VISUAL CONTENT (Animated) */}
          <div className="relative h-[300px] md:h-[500px] flex items-center justify-center">
             <AnimatePresence mode="wait" custom={dir}>
                <motion.div 
                   key={current.id}
                   initial={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? 10 : -10 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 }}
                   exit={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? -10 : 10 }}
                   transition={{ duration: 0.5, type: "spring" }}
                   className="relative z-10 w-full h-full"
                >
                    <Image 
                        src={current.image} 
                        alt={current.title} 
                        fill 
                        className={`object-contain transition-all duration-500 ${current.shadowClass}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </motion.div>
             </AnimatePresence>
             
             {/* Background Decoration */}
             <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-[pulse_3s_ease-in-out_infinite]" />
             <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
          </div>

       </div>
    </section>
  );
};
 

const PremiumNewsletter = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">JOIN THE <span className="text-blue-500">VIP CLUB</span></h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get access to secret drops, flash sales, and specific discount codes for Karachi & Lahore customers.</p>
                
                <form className="flex flex-col gap-4 max-w-lg mx-auto">
                    {/* Input Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                             <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full bg-black/50 border border-white/10 rounded-full pl-10 pr-6 py-4 text-white focus:outline-none focus:border-blue-500 transition"
                                required
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="tel" 
                                placeholder="Phone (03XX...)" 
                                className="w-full bg-black/50 border border-white/10 rounded-full pl-10 pr-6 py-4 text-white focus:outline-none focus:border-blue-500 transition"
                                required
                            />
                        </div>
                    </div>
                    
                    {/* Button Row */}
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-full transition shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                        JOIN THE CLUB
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-2">We promise not to spam. WhatsApp updates included.</p>
                </form>

                {/* --- SOCIAL LINKS SECTION --- */}
                <div className="mt-10 pt-8 border-t border-white/10">
                    <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Or Follow Us On</p>
                    <div className="flex justify-center gap-6">
                        <Link href="https://www.facebook.com/share/1GuPfSmkZs/" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-blue-500 transition">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 transition">
                                <Facebook className="w-5 h-5" />
                            </div>
                            <span className="hidden md:block text-sm font-medium">Facebook</span>
                        </Link>
                        
                        <Link href="https://instagram.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-pink-500 transition">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-pink-500/20 transition">
                                <Instagram className="w-5 h-5" />
                            </div>
                            <span className="hidden md:block text-sm font-medium">Instagram</span>
                        </Link>

                        <Link href="https://twitter.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-white transition">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition">
                                <Twitter className="w-5 h-5" />
                            </div>
                            <span className="hidden md:block text-sm font-medium">X / Twitter</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  // TRENDING PAGINATION STATE
  const [trendingPage, setTrendingPage] = useState(0);
  const itemsPerPage = 4;
  const totalTrendingPages = Math.ceil(FEATURED_PRODUCTS.length / itemsPerPage);

  const nextTrending = () => {
    setTrendingPage((prev) => (prev + 1) % totalTrendingPages);
  };

  const prevTrending = () => {
    setTrendingPage((prev) => (prev - 1 + totalTrendingPages) % totalTrendingPages);
  };

  // Get current products
  const currentTrendingProducts = FEATURED_PRODUCTS.slice(
      trendingPage * itemsPerPage, 
      (trendingPage + 1) * itemsPerPage
  );

  return (
    <main className="min-h-screen relative bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <HeroSection />

      {/* 3. MARQUEE */}
      <div className="py-12">
        <MarqueeBar />
      </div>

      {/* 4. TRENDING HEAT (Paginated 4 items at a time) */}
      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto relative z-10">
         {/* NAVIGATION ARROWS (Outside the grid, centered vertically) */}
         <button 
            onClick={prevTrending}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full border border-white/10 bg-black/50 hover:bg-white hover:text-black transition items-center justify-center z-20 backdrop-blur-sm"
         >
            <ChevronLeft className="w-6 h-6" />
         </button>
         <button 
            onClick={nextTrending}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full border border-white/10 bg-black/50 hover:bg-white hover:text-black transition items-center justify-center z-20 backdrop-blur-sm"
         >
            <ChevronRight className="w-6 h-6" />
         </button>

         {/* HEADER */}
         <div className="flex justify-between items-end mb-16">
            <div>
               <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">
                  TRENDING HEAT <span className="text-yellow-500">.</span>
               </h2>
               <p className="text-gray-400 text-sm mt-3 border-l-2 border-yellow-500 pl-4">
                  Top rated picks by our customers this week.
               </p>
            </div>
            <Link 
                href="/shop" 
                className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-white/30 pb-1 hover:border-white hover:text-yellow-400 transition"
            >
               VIEW ALL <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
         
         {/* PRODUCT GRID (Animated Swap) */}
         <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={trendingPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                >
                    {currentTrendingProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>
            </AnimatePresence>
         </div>

         {/* Mobile Navigation (Since side arrows are hidden on mobile) */}
         <div className="mt-8 flex gap-4 justify-center md:hidden">
            <button onClick={prevTrending} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black"><ChevronLeft className="w-5 h-5"/></button>
            <button onClick={nextTrending} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black"><ChevronRight className="w-5 h-5"/></button>
         </div>

         <div className="mt-8 flex justify-center md:hidden">
            <Link href="/shop">
                <button className="px-8 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">
                    View All Products
                </button>
            </Link>
         </div>
      </section>

      {/* 5. SPOTLIGHT SECTION (Swappable) */}
      <SpotlightSection />

      {/* 6. MIRROR COLLECTION */}
      <div className="relative z-10 bg-[#050505]">
        <CollectionsSection/>
      </div>

      {/* 7. NEWSLETTER */}
      <PremiumNewsletter />
      <Footer />

    </main>
  );
}