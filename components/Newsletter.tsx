"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="relative w-full py-24 px-6 bg-[#050505] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase">
          UNLOCK THE <span className="text-blue-500">VAULT</span>
        </h2>
        
        <p className="text-gray-400 text-lg">
          Sign up for early access to limited edition drops, secret sales, and 3D design contests.
        </p>

        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          {/* SHADCN INPUT */}
          <Input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-full text-center md:text-left focus-visible:ring-blue-500"
          />
          
          {/* SHADCN BUTTON */}
          <Button 
            size="lg" 
            className="bg-white text-black font-bold h-12 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            JOIN NOW
          </Button>
        </form>
        
        <p className="text-xs text-gray-600 uppercase tracking-widest">
          No Spam. Only Heat.
        </p>
      </div>
    </section>
  );
}