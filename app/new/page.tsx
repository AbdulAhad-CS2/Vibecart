"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Clock, Star, Sparkles, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA ---
const TRENDING_PRODUCTS = [
  { id: "1", name: "Royal Oak Series", brand: "Rolex Style", category: "Classic", price: 3500, image: "/watch-1.png", colors: ["#000"], isNew: true },
  { id: "4", name: "Sauvage Elixir", brand: "Pendora", category: "New Arrival", price: 1800, image: "/perfume-1.png", colors: ["#0f0"], isNew: true },
  { id: "6", name: "Daytona Panda", brand: "Rolex Style", category: "Exclusive", price: 4500, image: "/watch-2.png", colors: ["#888"], isNew: true },
  { id: "2", name: "Creed Aventus", brand: "Armaf", category: "Performance", price: 2200, image: "/perfume-1.png", colors: ["#000"], isSale: true },
];

const CURATED_PICKS = [
  { title: "The Executive", subtitle: "For the Boardroom", image: "/watch-1.png", size: "col-span-2 row-span-2" },
  { title: "Night Mode", subtitle: "Evening Scents", image: "/perfume-1.png", size: "col-span-1 row-span-1" },
  { title: "Sport Luxury", subtitle: "Performance Chronographs", image: "/watch-2.png", size: "col-span-1 row-span-2" },
  { title: "Oud Series", subtitle: "Middle Eastern Gold", image: "/perfume-1.png", size: "col-span-1 row-span-1" },
];

const LAUNCH_SCHEDULE = [
  { date: "FRI, FEB 24", time: "08:00 PM", name: "Patek Nautilus 'Green' Restock", status: "VIP ONLY" },
  { date: "SUN, FEB 26", time: "10:00 AM", name: "Tom Ford 'Oud Wood' Impression", status: "DROPPING SOON" },
  { date: "MON, FEB 27", time: "09:00 PM", name: "Rolex 'Hulk' Style 2024", status: "NOTIFY ME" },
];

// --- MOBILE COMPONENTS ---

const MobileHero = () => (
  <section className="md:hidden relative w-full py-20 px-6 flex flex-col items-center justify-center text-center border-b border-white/10 pt-32 overflow-hidden">
     {/* BACKGROUND LAYER */}
     <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-[#050505] to-[#050505]" />
     </div>

     <div className="relative z-10 space-y-6">
        <Badge className="bg-yellow-600 text-black border-none px-3 py-1 text-xs tracking-widest animate-pulse font-serif">EXCLUSIVE DROP</Badge>
        <h1 className="text-4xl font-serif font-black italic tracking-tighter uppercase leading-none">
           THE GOLDEN <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">STANDARD</span>
        </h1>
        <div className="flex justify-center gap-4 font-mono text-xl font-bold text-gray-300">
           <div className="flex flex-col items-center"><span className="text-white">02</span><span className="text-[10px] text-yellow-600 font-sans tracking-widest">DAYS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">14</span><span className="text-[10px] text-yellow-600 font-sans tracking-widest">HOURS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">45</span><span className="text-[10px] text-yellow-600 font-sans tracking-widest">MINS</span></div>
        </div>
        <Button size="lg" className="w-full bg-white text-black font-bold rounded-full mt-4 hover:bg-yellow-500 hover:text-black">JOIN WAITLIST <Clock className="w-4 h-4 ml-2" /></Button>
     </div>
  </section>
);

const MobileTrending = () => (
  <section className="md:hidden py-12 px-0">
     <div className="px-6 flex justify-between items-end mb-6">
        <div>
           <h2 className="text-2xl font-serif font-bold flex items-center gap-2"><Flame className="text-yellow-500 w-6 h-6" /> TRENDING NOW</h2>
           <p className="text-gray-400 text-xs mt-1">Pakistan's most wanted items.</p>
        </div>
        <Link href="/product" className="text-yellow-500 font-bold text-xs flex items-center">VIEW ALL <ArrowRight className="w-3 h-3 ml-1" /></Link>
     </div>
     {/* Horizontal Scroll Snap */}
     <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 [&::-webkit-scrollbar]:hidden">
        {TRENDING_PRODUCTS.map(product => (
           <div key={product.id} className="min-w-[40vw] snap-center">
              <ProductCard product={product} />
           </div>
        ))}
     </div>
  </section>
);

const MobileSchedule = () => (
  <section className="md:hidden py-12 px-6 border-y border-white/5 bg-white/5">
     <div className="flex items-center gap-3 mb-6">
        <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
        <h2 className="text-lg font-mono font-bold tracking-widest uppercase text-gray-300">UPCOMING LAUNCHES</h2>
     </div>
     <div className="space-y-4">
        {LAUNCH_SCHEDULE.map((drop, i) => (
           <div key={i} className="bg-black/40 p-4 rounded-lg border border-white/10 space-y-2">
              <div className="flex justify-between items-start">
                 <div className="text-yellow-500 font-mono font-bold text-xs">{drop.date} | {drop.time}</div>
                 <Badge variant="outline" className="text-[10px] h-5 border-white/20 text-white">{drop.status}</Badge>
              </div>
              <h3 className="text-base font-bold uppercase">{drop.name}</h3>
           </div>
        ))}
     </div>
  </section>
);

const MobileCuratedPicks = () => (
  <section className="md:hidden py-12 px-6 bg-[#0a0a0a]">
     <div className="mb-8 text-center">
        <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase mb-2 block">Handpicked for You</span>
        <h2 className="text-3xl font-serif font-black uppercase tracking-tighter">CURATOR'S CHOICE</h2>
     </div>
     <div className="flex flex-col gap-4">
        {CURATED_PICKS.map((item, i) => (
           <div key={i} className="relative h-[250px] rounded-xl overflow-hidden border border-white/10 group">
              <Image src={item.image} alt={item.title} fill className="object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
                 <h3 className="text-xl font-serif font-bold uppercase italic text-yellow-100">{item.title}</h3>
                 <p className="text-gray-400 text-xs">{item.subtitle}</p>
                 <span className="text-yellow-500 font-bold text-[10px] mt-2 flex items-center">SHOP COLLECTION <ArrowRight className="w-3 h-3 ml-1"/></span>
              </div>
           </div>
        ))}
     </div>
  </section>
);

const MobileExclusive = () => (
  <section className="md:hidden py-12 px-6">
     <div className="bg-gradient-to-br from-yellow-900/20 to-black rounded-2xl p-6 border border-yellow-500/20 relative overflow-hidden flex flex-col items-center text-center space-y-6">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-yellow-600/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative w-full h-[180px]">
           <Image src="/watch-2.png" alt="Exclusive" fill className="object-contain drop-shadow-[0_10px_30px_rgba(234,179,8,0.3)] animate-pulse" />
        </div>
        <div className="relative z-10 space-y-4">
           <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold tracking-widest text-xs uppercase">
              <Gem className="w-3 h-3" fill="currentColor" /> Private Reserve
           </div>
           <h2 className="text-3xl font-serif font-black italic uppercase leading-none">VIBE CART <br/> <span className="text-white/20">BLACK</span></h2>
           <p className="text-gray-400 text-sm">Join the elite club for early access to our most limited stock.</p>
           <Button size="lg" className="w-full bg-white text-black font-bold rounded-full">REQUEST ACCESS</Button>
        </div>
     </div>
  </section>
);


// --- DESKTOP COMPONENTS ---

const DesktopHero = () => (
  <section className="hidden md:flex relative w-full h-[70vh] items-center justify-center overflow-hidden border-b border-white/10">
     <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/30 via-[#050505] to-[#050505]" />
     </div>
     <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
        <Badge className="bg-yellow-600 text-black border-none px-4 py-1 text-sm tracking-widest animate-pulse font-serif">EXCLUSIVE DROP</Badge>
        <h1 className="text-8xl font-serif font-black italic tracking-tighter uppercase leading-none">
           THE GOLDEN <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">STANDARD</span>
        </h1>
        <div className="flex justify-center gap-8 font-mono text-4xl font-bold text-gray-300">
           <div className="flex flex-col items-center"><span className="text-white">02</span><span className="text-xs text-yellow-600 font-sans tracking-widest">DAYS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">14</span><span className="text-xs text-yellow-600 font-sans tracking-widest">HOURS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">45</span><span className="text-xs text-yellow-600 font-sans tracking-widest">MINS</span></div>
        </div>
        <div className="pt-8">
           <Button size="lg" className="bg-white text-black font-bold rounded-full px-8 hover:bg-yellow-500 hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              JOIN WAITLIST <Clock className="w-4 h-4 ml-2" />
           </Button>
        </div>
     </div>
  </section>
);

const DesktopTrending = () => (
  <section id="trending" className="hidden md:block scroll-mt-32 py-24 px-6 max-w-7xl mx-auto">
     <div className="flex justify-between items-end mb-12">
        <div>
           <h2 className="text-4xl font-serif font-bold flex items-center gap-3"><Flame className="text-yellow-500 w-8 h-8" /> TRENDING NOW</h2>
           <p className="text-gray-400 mt-2">Pakistan's most wanted items of the week.</p>
        </div>
        <Link href="/product" className="text-yellow-500 font-bold text-sm flex items-center hover:text-white transition">VIEW ALL <ArrowRight className="w-4 h-4 ml-2" /></Link>
     </div>
     <div className="hidden md:grid md:grid-cols-4 gap-8">
        {TRENDING_PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
     </div>
  </section>
);

const DesktopSchedule = () => (
  <section id="schedule" className="hidden md:block scroll-mt-32 py-12 border-y border-white/5 bg-white/5">
     <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse" />
           <h2 className="text-xl font-mono font-bold tracking-widest uppercase text-gray-300">UPCOMING LAUNCHES</h2>
        </div>
        <div className="space-y-4">
           {LAUNCH_SCHEDULE.map((drop, i) => (
              <div key={i} className="flex items-center justify-between bg-black/40 p-6 rounded-lg border border-white/10 hover:border-yellow-500/50 transition-colors group">
                 <div className="flex items-center gap-12">
                    <div className="text-yellow-500 font-mono font-bold text-sm">{drop.date} <span className="text-gray-500 mx-2">|</span> {drop.time}</div>
                    <h3 className="text-lg font-bold uppercase group-hover:text-yellow-400 transition-colors">{drop.name}</h3>
                 </div>
                 <span className="text-xs font-bold bg-white text-black px-3 py-1 rounded-full">{drop.status}</span>
              </div>
           ))}
        </div>
     </div>
  </section>
);

const DesktopCuratedPicks = () => (
  <section id="staff-picks" className="hidden md:block scroll-mt-32 py-24 bg-[#0a0a0a] border-y border-white/10">
     <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
           <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase mb-2 block">Handpicked for You</span>
           <h2 className="text-6xl font-serif font-black uppercase tracking-tighter">CURATOR'S CHOICE</h2>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
           {CURATED_PICKS.map((item, i) => (
              <motion.div key={i} className={`relative group overflow-hidden rounded-2xl bg-[#050505] border border-white/10 ${item.size}`} whileHover={{ scale: 0.98 }}>
                 <Image src={item.image} alt={item.title} fill className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
                    <h3 className="text-2xl font-serif font-bold uppercase italic text-yellow-100">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.subtitle}</p>
                    <div className="mt-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                       <span className="text-yellow-500 font-bold text-xs flex items-center">SHOP COLLECTION <ArrowRight className="w-3 h-3 ml-1"/></span>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>
     </div>
  </section>
);

const DesktopExclusive = () => (
  <section id="exclusive" className="hidden md:block scroll-mt-32 py-24 px-6 max-w-7xl mx-auto">
     <div className="flex flex-row items-center gap-12 bg-gradient-to-br from-yellow-900/20 to-black rounded-3xl p-16 border border-yellow-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex-1 space-y-6 relative z-10">
           <div className="flex items-center gap-2 text-yellow-400 font-bold tracking-widest text-sm uppercase">
              <Gem className="w-4 h-4" fill="currentColor" /> Private Reserve
           </div>
           <h2 className="text-5xl font-serif font-black italic uppercase leading-none">VIBE CART </h2>
           <p className="text-gray-400 max-w-md text-lg">Join the elite club for early access to our most limited stock and premium concierge service.</p>
           <Button size="lg" className="bg-white text-black font-bold rounded-full mt-4 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">REQUEST ACCESS</Button>
        </div>
        <div className="flex-1 relative h-[400px] w-full">
           <Image src="/watch-2.png" alt="Exclusive" fill className="object-contain drop-shadow-[0_20px_50px_rgba(234,179,8,0.3)] animate-pulse" />
        </div>
     </div>
  </section>
);


// --- MAIN PAGE ---
export default function NewAndFeaturedPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <MobileHero />
      <DesktopHero />

      {/* Trending */}
      <MobileTrending />
      <DesktopTrending />

      {/* Schedule */}
      <MobileSchedule />
      <DesktopSchedule />

      {/* Staff Picks */}
      <MobileCuratedPicks />
      <DesktopCuratedPicks />

      {/* Exclusive */}
      <MobileExclusive />
      <DesktopExclusive />

      <Footer />
    </main>
  );
}