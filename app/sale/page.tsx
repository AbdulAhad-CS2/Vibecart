"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

// --- MOCK DATA ---
const SALE_PRODUCTS = [
  { id: "s1", name: "Ultraboost light", brand: "Adidas", category: "Sports", price: 120, originalPrice: 180, discount: 33, image: "/Ultraboost Light.webp", colors: ["#000", "#fff"], isSale: true },
  { id: "s2", name: "Air Max Pulse", brand: "Nike", category: "Classic", price: 85, originalPrice: 170, discount: 50, image: "/Air Max Pulse.webp", colors: ["#ccc"], isSale: true },
  { id: "s3", name: "RS-X Toys", brand: "Puma", category: "New Arrival", price: 60, originalPrice: 120, discount: 50, image: "/RS-X Efekt.webp", colors: ["#f00"], isSale: true },
  { id: "s4", name: "550 'White Grey'", brand: "New Balance", category: "Office", price: 90, originalPrice: 110, discount: 18, image: "/formal shoe.webp", colors: ["#fff"], isSale: true },
  { id: "s5", name: "Y-3 Kaiwa", brand: "Adidas", category: "Clearance", price: 200, originalPrice: 400, discount: 50, image: "/Duck Low.webp", colors: ["#000"], isSale: true, isClearance: true },
  { id: "s6", name: "Dunk High Retro", brand: "Nike", category: "Classic", price: 100, originalPrice: 125, discount: 20, image: "/B44 Blade.webp", colors: ["#0f0"], isSale: true }
];

function SaleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    setActiveFilter(filterParam || "all");
  }, [searchParams]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    router.push(`/sale?filter=${filter}`, { scroll: false });
  };

  const filteredProducts = SALE_PRODUCTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "20") return p.discount && p.discount >= 20;
    if (activeFilter === "50") return p.discount && p.discount >= 50;
    if (activeFilter === "clearance") return p.isClearance === true;
    return true;
  });

  const getButtonStyle = (isActive: boolean, activeColor: string) => {
    return isActive 
      ? `rounded-full px-4 md:px-6 text-sm whitespace-nowrap text-white border border-transparent ${activeColor}` 
      : `rounded-full px-4 md:px-6 text-sm whitespace-nowrap bg-transparent border border-white/20 text-white hover:bg-white/10`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      
      {/* --- FILTER TABS --- */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <Button variant="ghost" onClick={() => handleFilterChange("all")} className={activeFilter === "all" ? "rounded-full px-6 bg-white text-black hover:bg-gray-200" : "rounded-full px-6 bg-transparent border border-white/20 text-white hover:bg-white/10"}>View All</Button>
        <Button variant="ghost" onClick={() => handleFilterChange("20")} className={getButtonStyle(activeFilter === "20", "bg-blue-600 hover:bg-blue-500")}>Up to 20% Off</Button>
        <Button variant="ghost" onClick={() => handleFilterChange("50")} className={getButtonStyle(activeFilter === "50", "bg-purple-600 hover:bg-purple-500")}>Up to 50% Off</Button>
        <Button variant="ghost" onClick={() => handleFilterChange("clearance")} className={getButtonStyle(activeFilter === "clearance", "bg-red-600 hover:bg-red-500")}>Clearance</Button>
      </div>

      {/* --- PRODUCT GRID --- */}
      {/* Clean Grid - No hacks needed since ProductCard handles the UI internally */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {filteredProducts.map((item: any) => (
           <ProductCard key={item.id} product={item} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
         <div className="text-center py-20 text-gray-500">No items found.</div>
      )}

    </div>
  );
}

export default function SalePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      <section className="relative w-full h-[35vh] md:h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/10 bg-red-900/10 pt-16 md:pt-0">
         <div className="absolute inset-0 bg-[url('/noise_desktop.webp')] opacity-20 mix-blend-overlay" />
         <div className="text-center space-y-2 md:space-y-4 relative z-10 px-4">
            <div className="flex justify-center items-center gap-2 text-red-500 font-bold tracking-widest uppercase animate-pulse text-xs md:text-base">
               <Zap className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" /> Flash Deals
            </div>
            <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
               MID-SEASON <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SALE</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-base">Limited time offers. While stocks last.</p>
         </div>
      </section>

      <Suspense fallback={<div className="text-center py-20">Loading deals...</div>}>
         <SaleContent />
      </Suspense>

      <Footer />
    </main>
  );
}