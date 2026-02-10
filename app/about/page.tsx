"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, Cpu, Globe, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- MOBILE COMPONENTS ---

const MobileHero = () => (
  <section className="md:hidden relative w-full py-20 px-6 flex flex-col items-center justify-center text-center border-b border-white/10 pt-32">
     {/* Reduced blur size for mobile performance */}
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none" />
     
     <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }}  variants={fadeInUp} className="relative z-10 space-y-6">
        <Badge className="bg-white/10 text-blue-400 border-blue-500/20 px-3 py-1 text-[10px] tracking-[0.2em] uppercase">Since 2025</Badge>
        <h1 className="text-4xl font-black tracking-tighter uppercase leading-tight">
           WE DON'T JUST SELL KICKS. <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">WE ARCHIVE CULTURE.</span>
        </h1>
        <p className="text-base text-gray-400 leading-relaxed px-2">
           Sole Vault is the premier destination for the digital generation. Bridging the gap between the metaverse and the streets.
        </p>
     </motion.div>
  </section>
);

const MobileStory = () => (
  <section className="md:hidden py-16 px-6">
     <div className="flex flex-col gap-10">
        {/* Image on top for mobile */}
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-white/10">
           <Image src="/new arrival.webp" alt="Our Story" fill className="object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>

        <div className="space-y-6 text-center">
           <h2 className="text-3xl font-bold tracking-tight uppercase">The Vault <br/> <span className="text-blue-500">Philosophy</span></h2>
           <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>It started with a simple idea: The sneaker game was broken. Too many bots, too many fakes.</p>
              <p>We built <strong>Sole Vault</strong> to be a fortress of authenticity. Every pair is hand-verified by experts.</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                 <h4 className="text-3xl font-black text-white">10K+</h4>
                 <span className="text-[10px] text-gray-500 uppercase tracking-widest">Verified Orders</span>
              </div>
              <div>
                 <h4 className="text-3xl font-black text-white">50+</h4>
                 <span className="text-[10px] text-gray-500 uppercase tracking-widest">Brand Partners</span>
              </div>
           </div>
        </div>
     </div>
  </section>
);

const MobileValues = () => (
  <section className="md:hidden py-16 bg-[#0a0a0a] border-y border-white/10 px-6">
     <div className="text-center mb-10">
        <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Why Choose Us</span>
        <h2 className="text-3xl font-bold uppercase tracking-tighter">BUILT ON TRUST</h2>
     </div>

     <div className="flex flex-col gap-6">
        <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 text-center">
           <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
           </div>
           <h3 className="text-lg font-bold mb-2">100% Authenticity</h3>
           <p className="text-sm text-gray-500">No fakes. No B-grades. Every item goes through a rigorous inspection.</p>
        </div>

        <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 text-center">
           <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Cpu className="w-6 h-6 text-purple-400" />
           </div>
           <h3 className="text-lg font-bold mb-2">Tech-First Retail</h3>
           <p className="text-sm text-gray-500">AI-driven pricing and 3D modeling for an immersive experience.</p>
        </div>

        <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 text-center">
           <div className="w-12 h-12 bg-green-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Globe className="w-6 h-6 text-green-400" />
           </div>
           <h3 className="text-lg font-bold mb-2">Global Community</h3>
           <p className="text-sm text-gray-500">We ship worldwide. Join 50,000+ sneakerheads globally.</p>
        </div>
     </div>
  </section>
);

const MobileCTA = () => (
  <section className="md:hidden py-20 px-6 text-center">
     <div className="space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter">READY TO STEP UP?</h2>
        <p className="text-gray-400 text-base">Browse the collection and find your next grail.</p>
        <div className="flex flex-col gap-3 w-full">
           <Link href="/product" className="w-full">
              <Button size="lg" className="w-full bg-white text-black font-bold rounded-full h-12 hover:bg-blue-500 hover:text-white">SHOP ALL PRODUCTS</Button>
           </Link>
           <Link href="/new" className="w-full">
              <Button variant="outline" size="lg" className="w-full  bg-white text-black font-bold rounded-full h-12 hover:bg-blue-500 hover:text-white">VIEW NEW DROPS</Button>
           </Link>
        </div>
     </div>
  </section>
);


// --- DESKTOP COMPONENTS ---

const DesktopHero = () => (
  <section className="hidden md:flex relative w-full py-32 px-6 flex-col items-center justify-center text-center overflow-hidden border-b border-white/10">
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
     <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeInUp} className="relative z-10 max-w-4xl space-y-6">
        <Badge className="bg-white/10 text-blue-400 border-blue-500/20 hover:bg-white/20 transition-colors px-4 py-1 text-xs tracking-[0.2em] uppercase">Since 2025</Badge>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">
           WE DON'T JUST SELL KICKS. <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">WE ARCHIVE CULTURE.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
           Sole Vault is the premier destination for the digital generation. Bridging the gap between the metaverse and the streets with verified authenticity.
        </p>
     </motion.div>
  </section>
);

const DesktopStory = () => (
  <section className="hidden md:block py-24 px-6 max-w-7xl mx-auto">
     <div className="flex flex-row items-center gap-16">
        <motion.div 
           initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8 }}
           className="flex-1 relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 group"
        >
           <Image src="/new arrival.webp" alt="Our Story" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
           className="flex-1 space-y-8"
        >
           <h2 className="text-5xl font-bold tracking-tight uppercase">The Vault <br/> <span className="text-blue-500">Philosophy</span></h2>
           <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>It started with a simple idea: The sneaker game was broken. Too many bots, too many fakes, and zero connection to the community.</p>
              <p>We built <strong>Sole Vault</strong> to be a fortress of authenticity. Every pair that enters our inventory is hand-verified by experts and digitally logged.</p>
           </div>
           <div className="pt-4">
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                 <div><h4 className="text-4xl font-black text-white">10K+</h4><span className="text-sm text-gray-500 uppercase tracking-widest">Verified Orders</span></div>
                 <div><h4 className="text-4xl font-black text-white">50+</h4><span className="text-sm text-gray-500 uppercase tracking-widest">Brand Partners</span></div>
              </div>
           </div>
        </motion.div>
     </div>
  </section>
);

const DesktopValues = () => (
  <section className="hidden md:block py-24 bg-[#0a0a0a] border-y border-white/10">
     <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Why Choose Us</span>
           <h2 className="text-5xl font-bold uppercase tracking-tighter">BUILT ON TRUST</h2>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} className="grid grid-cols-3 gap-8">
           <motion.div variants={fadeInUp} className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors"><ShieldCheck className="w-7 h-7 text-blue-400 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold mb-3">100% Authenticity</h3>
              <p className="text-gray-500">No fakes. No B-grades. Every item goes through a rigorous 12-point inspection process before it reaches your door.</p>
           </motion.div>
           <motion.div variants={fadeInUp} className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-purple-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors"><Cpu className="w-7 h-7 text-purple-400 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold mb-3">Tech-First Retail</h3>
              <p className="text-gray-500">We use AI-driven pricing and 3D modeling to give you the most immersive shopping experience on the web.</p>
           </motion.div>
           <motion.div variants={fadeInUp} className="bg-[#050505] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-green-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors"><Globe className="w-7 h-7 text-green-400 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold mb-3">Global Community</h3>
              <p className="text-gray-500">From Tokyo to New York, we ship worldwide. Join a community of over 50,000 sneakerheads across the globe.</p>
           </motion.div>
        </motion.div>
     </div>
  </section>
);

const DesktopCTA = () => (
  <section className="hidden md:block py-32 px-6 text-center">
     <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.3 }} className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-6xl font-black uppercase tracking-tighter">READY TO STEP UP?</h2>
        <p className="text-gray-400 text-lg">Browse the collection and find your next grail.</p>
        <div className="flex justify-center gap-4">
           <Link href="/product"><Button size="lg" className="bg-white text-black font-bold rounded-full px-8 hover:bg-blue-500 hover:text-white transition-all h-14">SHOP ALL PRODUCTS</Button></Link>
           <Link href="/new"><Button variant="outline" size="lg" className="bg-white text-black font-bold rounded-full px-8 hover:bg-blue-500 hover:text-white transition-all h-14">VIEW NEW DROPS</Button></Link>
        </div>
     </motion.div>
  </section>
);


// --- MAIN PAGE ---
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Hero */}
      <MobileHero />
      <DesktopHero />

      {/* Story */}
      <MobileStory />
      <DesktopStory />

      {/* Values */}
      <MobileValues />
      <DesktopValues />

      {/* CTA */}
      <MobileCTA />
      <DesktopCTA />

      <Footer />
    </main>
  );
}