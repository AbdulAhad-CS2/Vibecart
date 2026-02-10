"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA ---
const TRENDING_PRODUCTS = [
  { id: "1", name: "Air Max Pulse", brand: "Nike", category: "Classic", price: 150, image: "/Air Max Pulse.webp", colors: ["#fff"], isNew: true },
  { id: "4", name: "RS-X Efekt", brand: "Puma", category: "New Arrival", price: 110, image: "/RS-X Efekt.webp", colors: ["#0f0"], isNew: true },
  { id: "6", name: "B44 Blade", brand: "Dior", category: "Exclusive", price: 950, image: "/B44 Blade.webp", colors: ["#888"], isNew: true },
  { id: "2", name: "Ultraboost Light", brand: "Adidas", category: "Performance", price: 180, image: "/Ultraboost Light.webp", colors: ["#000"], isSale: true },
];

const STAFF_PICKS = [
  { title: "The Virgil Edit", subtitle: "Off-White x Nike", image: "/sports.webp", size: "col-span-2 row-span-2" },
  { title: "Summer Vibes", subtitle: "Yeezy Slide Pure", image: "/office.webp", size: "col-span-1 row-span-1" },
  { title: "Retro Kicks", subtitle: "Jordan 1 Chicago", image: "/sneaker classic.webp", size: "col-span-1 row-span-2" },
  { title: "Daily Driver", subtitle: "New Balance 550", image: "/best selling.webp", size: "col-span-1 row-span-1" },
];

const DROP_SCHEDULE = [
  { date: "WED, OCT 24", time: "10:00 AM", name: "Dunk Low 'Panda' Restock", status: "DROPPING SOON" },
  { date: "FRI, OCT 26", time: "08:00 AM", name: "Yeezy Boost 350 'Onyx'", status: "RAFFLE OPEN" },
  { date: "SAT, OCT 27", time: "09:00 AM", name: "Jordan 4 'Military Black'", status: "NOTIFY ME" },
];

// --- MOBILE COMPONENTS ---

const MobileHero = () => (
  <section className="md:hidden relative w-full py-20 px-6 flex flex-col items-center justify-center text-center border-b border-white/10 pt-32 overflow-hidden">
     {/* BACKGROUND LAYER */}
     <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]" />
        {/* ADDED NOISE HERE */}
        <div className="absolute inset-0 bg-[url('/noise_mobile.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
     </div>

     <div className="relative z-10 space-y-6">
        <Badge className="bg-red-600 text-white border-none px-3 py-1 text-xs tracking-widest animate-pulse">UPCOMING DROP</Badge>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
           TRAVIS SCOTT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">OLIVE LOW</span>
        </h1>
        <div className="flex justify-center gap-4 font-mono text-xl font-bold text-gray-300">
           <div className="flex flex-col items-center"><span className="text-white">02</span><span className="text-[10px] text-gray-600 font-sans tracking-widest">DAYS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">14</span><span className="text-[10px] text-gray-600 font-sans tracking-widest">HOURS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">45</span><span className="text-[10px] text-gray-600 font-sans tracking-widest">MINS</span></div>
        </div>
        <Button size="lg" className="w-full bg-white text-black font-bold rounded-full mt-4 hover:bg-blue-500 hover:text-white">NOTIFY ME <Clock className="w-4 h-4 ml-2" /></Button>
     </div>
  </section>
);

const MobileTrending = () => (
  <section className="md:hidden py-12 px-0">
     <div className="px-6 flex justify-between items-end mb-6">
        <div>
           <h2 className="text-2xl font-bold flex items-center gap-2"><Flame className="text-orange-500 w-6 h-6" /> TRENDING HEAT</h2>
           <p className="text-gray-400 text-xs mt-1">The most hyped pairs of the week.</p>
        </div>
        <Link href="/product" className="text-blue-500 font-bold text-xs flex items-center">VIEW ALL <ArrowRight className="w-3 h-3 ml-1" /></Link>
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
        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        <h2 className="text-lg font-mono font-bold tracking-widest uppercase">DROPPING THIS WEEK</h2>
     </div>
     <div className="space-y-4">
        {DROP_SCHEDULE.map((drop, i) => (
           <div key={i} className="bg-black/40 p-4 rounded-lg border border-white/10 space-y-2">
              <div className="flex justify-between items-start">
                 <div className="text-blue-500 font-mono font-bold text-xs">{drop.date} | {drop.time}</div>
                 <Badge variant="outline" className="text-[10px] h-5 border-white/20 text-white">{drop.status}</Badge>
              </div>
              <h3 className="text-base font-bold uppercase">{drop.name}</h3>
           </div>
        ))}
     </div>
  </section>
);

const MobileStaffPicks = () => (
  <section className="md:hidden py-12 px-6 bg-[#0a0a0a]">
     <div className="mb-8 text-center">
        <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Curated by Sole Vault</span>
        <h2 className="text-3xl font-black uppercase tracking-tighter">STAFF PICKS</h2>
     </div>
     <div className="flex flex-col gap-4">
        {STAFF_PICKS.map((item, i) => (
           <div key={i} className="relative h-[250px] rounded-xl overflow-hidden border border-white/10 group">
              <Image src={item.image} alt={item.title} fill className="object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
                 <h3 className="text-xl font-bold uppercase italic">{item.title}</h3>
                 <p className="text-gray-400 text-xs">{item.subtitle}</p>
                 <span className="text-blue-500 font-bold text-[10px] mt-2 flex items-center">SHOP COLLECTION <ArrowRight className="w-3 h-3 ml-1"/></span>
              </div>
           </div>
        ))}
     </div>
  </section>
);

const MobileExclusive = () => (
  <section className="md:hidden py-12 px-6">
     <div className="bg-blue-900/10 rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden flex flex-col items-center text-center space-y-6">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-600/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative w-full h-[180px]">
           <Image src="/new arrival.webp" alt="Collab Shoe" fill className="object-contain drop-shadow-[0_10px_30px_rgba(59,130,246,0.3)] animate-pulse" />
        </div>
        <div className="relative z-10 space-y-4">
           <div className="flex items-center justify-center gap-2 text-blue-400 font-bold tracking-widest text-xs uppercase">
              <Star className="w-3 h-3" fill="currentColor" /> Exclusive Access
           </div>
           <h2 className="text-3xl font-black italic uppercase leading-none">SOLE VAULT <span className="text-white/20">X</span> <br/> NIKE LAB</h2>
           <p className="text-gray-400 text-sm">Introducing our first ever digital-physical hybrid sneaker.</p>
           <Button size="lg" className="w-full bg-white text-black font-bold rounded-full">EXPLORE THE COLLAB</Button>
        </div>
     </div>
  </section>
);


// --- DESKTOP COMPONENTS ---

const DesktopHero = () => (
  <section className="hidden md:flex relative w-full h-[70vh] items-center justify-center overflow-hidden border-b border-white/10">
     <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050505] to-[#050505]" />
        {/* ADDED bg-cover bg-center to fix display issue */}
        <div className="absolute inset-0 bg-[url('/noise_desktop.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" /> 
     </div>
     <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
        <Badge className="bg-red-600 text-white border-none px-4 py-1 text-sm tracking-widest animate-pulse">UPCOMING DROP</Badge>
        <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-none">
           TRAVIS SCOTT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">OLIVE LOW</span>
        </h1>
        <div className="flex justify-center gap-8 font-mono text-4xl font-bold text-gray-300">
           <div className="flex flex-col items-center"><span className="text-white">02</span><span className="text-xs text-gray-600 font-sans tracking-widest">DAYS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">14</span><span className="text-xs text-gray-600 font-sans tracking-widest">HOURS</span></div>
           <span>:</span>
           <div className="flex flex-col items-center"><span className="text-white">45</span><span className="text-xs text-gray-600 font-sans tracking-widest">MINS</span></div>
        </div>
        <div className="pt-8">
           <Button size="lg" className="bg-white text-black font-bold rounded-full px-8 hover:bg-blue-500 hover:text-white transition-all">NOTIFY ME <Clock className="w-4 h-4 ml-2" /></Button>
        </div>
     </div>
  </section>
);

const DesktopTrending = () => (
  <section id="trending" className="hidden md:block scroll-mt-32 py-24 px-6 max-w-7xl mx-auto">
     <div className="flex justify-between items-end mb-12">
        <div>
           <h2 className="text-4xl font-bold flex items-center gap-3"><Flame className="text-orange-500 w-8 h-8" /> TRENDING HEAT</h2>
           <p className="text-gray-400 mt-2">The most hyped pairs of the week.</p>
        </div>
        <Link href="/product?category=Best%20Selling" className="text-blue-500 font-bold text-sm flex items-center hover:text-white transition">VIEW ALL <ArrowRight className="w-4 h-4 ml-2" /></Link>
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
           <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
           <h2 className="text-xl font-mono font-bold tracking-widest uppercase">DROPPING THIS WEEK</h2>
        </div>
        <div className="space-y-4">
           {DROP_SCHEDULE.map((drop, i) => (
              <div key={i} className="flex items-center justify-between bg-black/40 p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors group">
                 <div className="flex items-center gap-12">
                    <div className="text-blue-500 font-mono font-bold text-sm">{drop.date} <span className="text-gray-500 mx-2">|</span> {drop.time}</div>
                    <h3 className="text-lg font-bold uppercase group-hover:text-blue-400 transition-colors">{drop.name}</h3>
                 </div>
                 <span className="text-xs font-bold bg-white text-black px-3 py-1 rounded-full">{drop.status}</span>
              </div>
           ))}
        </div>
     </div>
  </section>
);

const DesktopStaffPicks = () => (
  <section id="staff-picks" className="hidden md:block scroll-mt-32 py-24 bg-[#0a0a0a] border-y border-white/10">
     <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
           <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Curated by Sole Vault</span>
           <h2 className="text-6xl font-black uppercase tracking-tighter">STAFF PICKS</h2>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
           {STAFF_PICKS.map((item, i) => (
              <motion.div key={i} className={`relative group overflow-hidden rounded-2xl bg-[#050505] border border-white/10 ${item.size}`} whileHover={{ scale: 0.98 }}>
                 <Image src={item.image} alt={item.title} fill className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
                    <h3 className="text-2xl font-bold uppercase italic">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.subtitle}</p>
                    <div className="mt-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                       <span className="text-blue-500 font-bold text-xs flex items-center">SHOP COLLECTION <ArrowRight className="w-3 h-3 ml-1"/></span>
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
     <div className="flex flex-row items-center gap-12 bg-blue-900/10 rounded-3xl p-16 border border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex-1 space-y-6 relative z-10">
           <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest text-sm uppercase">
              <Star className="w-4 h-4" fill="currentColor" /> Exclusive Access
           </div>
           <h2 className="text-5xl font-black italic uppercase leading-none">SOLE VAULT <span className="text-white/20">X</span> <br/> NIKE LAB</h2>
           <p className="text-gray-400 max-w-md text-lg">Introducing our first ever digital-physical hybrid sneaker. Designed in the metaverse, wearable on the streets.</p>
           <Button size="lg" className="bg-white text-black font-bold rounded-full mt-4 hover:scale-105 transition-transform">EXPLORE THE COLLAB</Button>
        </div>
        <div className="flex-1 relative h-[400px] w-full">
           <Image src="/new arrival.webp" alt="Collab Shoe" fill className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] animate-pulse" />
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
      <MobileStaffPicks />
      <DesktopStaffPicks />

      {/* Exclusive */}
      <MobileExclusive />
      <DesktopExclusive />

      <Footer />
    </main>
  );
}