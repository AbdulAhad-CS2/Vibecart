"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Star,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "@/components/ProductCard";
import CollectionsSection from "../components/CollectionsSection";

// =========================================
// DATA CONSTANTS
// =========================================

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

const FEATURED_PRODUCTS = [
  { id: "1", name: "Royal Oak", brand: "Luxury", category: "Classic", price: 3500, image: "/watch-1.png", colors: ["#000"] },
  { id: "2", name: "Sauvage Oil", brand: "Scents", category: "Perfume", price: 1800, image: "/perfume-1.png", colors: ["#000"] },
  { id: "3", name: "Nautilus", brand: "Luxury", category: "Classic", price: 4200, image: "/watch-2.png", colors: ["#000"] },
  { id: "4", name: "Hublot Style", brand: "Sport", category: "Sport", price: 2900, image: "/watch-1.png", colors: ["#000"] },
  { id: "5", name: "Creed Aventus", brand: "Scents", category: "Perfume", price: 2200, image: "/perfume-1.png", colors: ["#000"] },
  { id: "6", name: "Daytona", brand: "Luxury", category: "Classic", price: 4500, image: "/watch-2.png", colors: ["#000"] },
  { id: "7", name: "Bleu de Chanel", brand: "Scents", category: "Perfume", price: 1950, image: "/perfume-1.png", colors: ["#000"] },
  { id: "8", name: "G-Shock Style", brand: "Sport", category: "Sport", price: 1500, image: "/watch-1.png", colors: ["#000"] },
  { id: "9", name: "Datejust", brand: "Luxury", category: "Classic", price: 3800, image: "/watch-2.png", colors: ["#000"] },
  { id: "10", name: "Tom Ford Oud", brand: "Scents", category: "Perfume", price: 2500, image: "/perfume-1.png", colors: ["#000"] },
  { id: "11", name: "Richard Mille", brand: "Luxury", category: "Sport", price: 5500, image: "/watch-1.png", colors: ["#000"] },
  { id: "12", name: "Baccarat Rouge", brand: "Scents", category: "Perfume", price: 3000, image: "/perfume-1.png", colors: ["#000"] },
];

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
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  isClearance?: boolean;
}
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
    <section className="relative w-full bg-[#050505] text-white overflow-hidden pt-20 pb-12 md:pt-0 md:pb-0 md:min-h-screen flex items-center">
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 pointer-events-none ${currentItem.bgGlow}`} />

      {/* ========================================= */}
      {/* 1. DEDICATED MOBILE INTERFACE (Image FIRST) */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col w-full px-6 gap-8 relative z-10">

        {/* MOBILE: IMAGE ON TOP */}
        <div className="relative w-full h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={imageVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-[300px] h-[300px]">
              <Image src={currentItem.image} alt={currentItem.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]" priority sizes="100vw" />
            </motion.div>
          </AnimatePresence>

          {/* MOBILE: ARROWS */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={handleNext} className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* MOBILE: TEXT BELOW */}
        <div className="flex flex-col items-start w-full z-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={textVariants} animate="visible" exit="exit" className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full backdrop-blur-md">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-300 text-[10px] font-bold tracking-widest uppercase">Best Seller</span>
              </div>

              <h1 className="text-5xl font-black leading-[0.9] tracking-tighter">
                {currentItem.title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentItem.accent}`}>{currentItem.subtitle}</span>
              </h1>

              <p className="text-gray-400 text-base leading-relaxed">{currentItem.description}</p>

              <div className="flex flex-col gap-4 pt-4 w-full">
                <Link href="/product" className="w-full">
                  <button className="w-full h-14 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition active:scale-95 flex items-center justify-center gap-2 text-sm">
                    Buy Now - {currentItem.price} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Cash On Delivery Nationwide
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. DEDICATED DESKTOP INTERFACE (Side by Side) */}
      {/* ========================================= */}
      <div className="hidden md:grid max-w-7xl mx-auto px-12 w-full grid-cols-2 gap-12 items-center relative z-10">

        {/* DESKTOP: TEXT ON LEFT */}
        <div className="flex flex-col items-start space-y-6 z-20 justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} variants={textVariants} animate="visible" exit="exit" className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full backdrop-blur-md">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">Best Seller</span>
              </div>

              <h1 className="text-8xl font-black leading-[0.9] tracking-tighter">
                {currentItem.title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentItem.accent}`}>{currentItem.subtitle}</span>
              </h1>

              <p className="text-gray-400 text-xl max-w-md leading-relaxed">{currentItem.description}</p>

              <div className="flex items-center gap-4 pt-4">
                <Link href="/product">
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition active:scale-95 flex items-center justify-center gap-2 text-base">
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

        {/* DESKTOP: IMAGE ON RIGHT */}
        <div className="relative flex justify-center items-center h-[600px]">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={currentIndex} custom={direction} variants={imageVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-[500px] h-[500px]">
                <Image src={currentItem.image} alt={currentItem.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]" priority sizes="50vw" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-4 z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
            <button onClick={handleNext} className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"><ChevronRight className="w-6 h-6" /></button>
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

// --- COMPONENT: SPOTLIGHT SECTION ---
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

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const current = SPOTLIGHT_ITEMS[index];

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* ========================================= */}
      {/* 1. DEDICATED MOBILE INTERFACE (Image FIRST) */}
      {/* ========================================= */}
      <div className="md:hidden relative flex flex-col gap-8 bg-white/5 border border-white/10 rounded-[2rem] p-6 py-8 z-10 backdrop-blur-md overflow-hidden group">

        {/* MOBILE: VISUAL CONTENT TOP */}
        <div className="relative h-[280px] w-full flex items-center justify-center">

          {/* Arrows overlapping image */}
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? 10 : -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? -10 : 10 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative z-10 w-full h-full px-8"
            >
              <Image src={current.image} alt={current.title} fill className={`object-contain transition-all duration-500 ${current.shadowClass}`} priority />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE: TEXT CONTENT BELOW */}
        <div className="space-y-6 relative z-20 text-left w-full">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: dir === 1 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === 1 ? -50 : 50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="inline-block px-3 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                {current.tag}
              </div>
              <h2 className="text-5xl font-black italic leading-[0.9]">
                {current.title} <br /> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${current.highlightColor}`}>{current.highlight}</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {current.desc}
              </p>
              <div className="pt-2 w-full">
                <Link href={current.link} className="w-full block">
                  <button className="w-full h-14 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                    Shop The Look
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. DEDICATED DESKTOP INTERFACE */}
      {/* ========================================= */}
      <div className="hidden md:grid relative grid-cols-2 gap-16 items-center bg-white/5 border border-white/10 rounded-[2rem] p-16 z-10 backdrop-blur-md overflow-hidden group">

        {/* DESKTOP: TEXT CONTENT LEFT */}
        <div className="space-y-8 relative z-20 px-8 text-left">
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
              <h2 className="text-7xl font-black italic leading-[0.9]">
                {current.title} <br /> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${current.highlightColor}`}>{current.highlight}</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                {current.desc}
              </p>
              <div className="flex justify-start gap-4 pt-2">
                <Link href={current.link}>
                  <button className="px-10 py-4 bg-white text-black text-base font-bold rounded-full hover:bg-gray-200 transition transform hover:-translate-y-1 shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                    Shop The Look
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP: VISUAL CONTENT RIGHT */}
        <div className="relative h-[500px] flex items-center justify-center w-full">
          <button onClick={prevSlide} className="absolute -left-8 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button onClick={nextSlide} className="absolute -right-8 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition z-30">
            <ChevronRight className="w-10 h-10" />
          </button>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? 10 : -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: dir === 1 ? -10 : 10 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative z-10 w-full h-full"
            >
              <Image src={current.image} alt={current.title} fill className={`object-contain transition-all duration-500 ${current.shadowClass}`} priority />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
        </div>

      </div>
    </section>
  );
};

// --- COMPONENT: NEWSLETTER ---
const PremiumNewsletter = () => {
  return (
    <section className="relative z-10 pb-12 md:pb-24 bg-[#050505] px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 px-4 py-12 md:px-6 md:py-24 text-center group">

          <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-600/20 rounded-full blur-[80px] group-hover:bg-yellow-600/30 transition-all duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-1000" />

          <div className="relative z-10 space-y-8 md:space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-4">
                <Star className="w-3 h-3 fill-current" /> Members Only Access
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-black text-white tracking-tighter uppercase leading-[0.9]">
                Join The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">Vibe Club</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-lg font-light">
                Unlock early access to limited drops, secret sales, and priority shipping.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto px-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold tracking-wider text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-black transition-all uppercase"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="tel"
                  placeholder="PHONE (WHATSAPP)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold tracking-wider text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-black transition-all uppercase"
                />
              </div>
              <Button className="h-auto rounded-xl px-8 py-4 md:py-5 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black font-black tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(191,149,63,0.3)]">
                JOIN CLUB
              </Button>
            </div>

            <p className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-widest pt-2 md:pt-4">
              By joining, you agree to our terms. No spam, just vibe.
            </p>

            <div className="mt-8 md:mt-10 pt-8 border-t border-white/10">
              <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 md:mb-10 uppercase tracking-widest">Or Follow Us On</p>
              <div className="flex justify-center gap-4 md:gap-6">
                <Link href="https://facebook.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-blue-500 transition">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 transition">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">Facebook</span>
                </Link>

                <Link href="https://instagram.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-pink-500 transition">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-pink-500/20 transition">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">Instagram</span>
                </Link>

                <Link href="https://twitter.com" target="_blank" className="group flex items-center gap-2 text-gray-400 hover:text-white transition">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition">
                    <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">X / Twitter</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  //   const [trendingPage, setTrendingPage] = useState(0);
  //   const itemsPerPage = 4;
  //   const totalTrendingPages = Math.ceil(FEATURED_PRODUCTS.length / itemsPerPage);

  // const nextTrending = () => {
  //   setTrendingPage((prev) => (prev + 1) % totalTrendingPages);
  // };

  // const prevTrending = () => {
  //   setTrendingPage((prev) => (prev - 1 + totalTrendingPages) % totalTrendingPages);
  // };

  // const currentTrendingProducts = FEATURED_PRODUCTS.slice(
  //     trendingPage * itemsPerPage, 
  //     (trendingPage + 1) * itemsPerPage
  // );
  const [trendingPage, setTrendingPage] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 4;
  const totalTrendingPages = Math.ceil(featuredProducts.length / itemsPerPage);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setIsLoading(true);

        // Query products, joining categories, primary images, and variants (for colors)
        const { data, error } = await supabase
          .from("products")
          .select(`
            id,
            title,
            base_price,
            categories ( name ),
            product_images ( image_url ),
            product_variants ( color )
          `)
          .eq("is_active", true)
          .eq("product_images.is_primary", true)
          .limit(12); // Fetch top 12 for the trending section

        if (error) throw error;
        console.log("Raw product data from Supabase:", data); 
        // Map database schema to your frontend Product interface
        const mappedProducts: Product[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.title,
          brand: "VibeCart", // Not in schema, keeping static for now
          category: item.categories?.name || "Classic",
          price: item.base_price,
          // Grab the first primary image, or fallback to a placeholder
          image: item.product_images?.[0]?.image_url || "/watch-1.png",
          // Extract unique colors from variants, fallback to black if none
          colors: item.product_variants?.length
            ? [...new Set(item.product_variants.map((v: any) => v.color).filter(Boolean))]
            : ["#000"],

          // Defaults for missing fields
          isNew: false,
          isSale: false,
          isClearance: false,
        }));

        setFeaturedProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  const nextTrending = () => {
    if (totalTrendingPages > 0) {
      setTrendingPage((prev) => (prev + 1) % totalTrendingPages);
    }
  };

  const prevTrending = () => {
    if (totalTrendingPages > 0) {
      setTrendingPage((prev) => (prev - 1 + totalTrendingPages) % totalTrendingPages);
    }
  };

  const currentTrendingProducts = featuredProducts.slice(
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
      <div className="py-8 md:py-12">
        <MarqueeBar />
      </div>

      {/* 4. TRENDING HEAT */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left justify-between md:flex-row md:items-end mb-8 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">
              TRENDING HEAT <span className="text-yellow-500">.</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mt-3 md:border-l-2 md:border-yellow-500 md:pl-4">
              Top rated picks by our customers this week.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW */}
            <div className="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {featuredProducts.map((product) => (
                <div key={product.id} className="min-w-[calc(50vw-20px)] shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block min-h-[400px] relative">
              {featuredProducts.length > itemsPerPage && (
                <>
                  <button
                    onClick={prevTrending}
                    className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-black/50 hover:bg-white hover:text-black transition flex items-center justify-center z-20 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTrending}
                    className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-black/50 hover:bg-white hover:text-black transition flex items-center justify-center z-20 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={trendingPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-4 gap-8"
                >
                  {currentTrendingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </section>

      {/* 5. SPOTLIGHT SECTION */}
      <SpotlightSection />

      {/* 6. MIRROR COLLECTION */}
      <div className="relative z-10 bg-[#050505]">
        <CollectionsSection />
      </div>

      {/* 7. NEWSLETTER */}
      <PremiumNewsletter />
      <Footer />

    </main>
  );
}