"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Gem } from "lucide-react";

// --- MOCK DATA (Updated for Vibe Cart Inventory) ---
const SALE_PRODUCTS = [
  { id: "s1", name: "Royal Oak 'Jumbo'", brand: "Rolex Style", category: "Luxury", price: 2800, originalPrice: 3500, discount: 20, image: "/watch-1.png", colors: ["#000"], isSale: true },
  { id: "s2", name: "Sauvage Elixir", brand: "Pendora", category: "Perfume", price: 1500, originalPrice: 1800, discount: 16, image: "/perfume-1.png", colors: ["#000"], isSale: true },
  { id: "s3", name: "Nautilus Blue", brand: "Patek Style", category: "Luxury", price: 3200, originalPrice: 4200, discount: 23, image: "/watch-2.png", colors: ["#000"], isSale: true },
  { id: "s4", name: "Creed Aventus", brand: "Armaf", category: "Perfume", price: 1800, originalPrice: 2200, discount: 18, image: "/perfume-1.png", colors: ["#000"], isSale: true },
  { id: "s5", name: "Hublot Big Bang", brand: "Hublot Style", category: "Sport", price: 2000, originalPrice: 4000, discount: 50, image: "/watch-1.png", colors: ["#000"], isSale: true, isClearance: true },
  { id: "s6", name: "Oud Mood", brand: "Lattafa", category: "Perfume", price: 1200, originalPrice: 2500, discount: 52, image: "/perfume-1.png", colors: ["#000"], isSale: true, isClearance: true }
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

  const getButtonStyle = (isActive: boolean) => {
    return isActive 
      ? "bg-yellow-600 text-black border-yellow-600 font-bold" 
      : "bg-transparent text-gray-400 border-white/20 hover:border-yellow-500 hover:text-yellow-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
      
      {/* --- FILTER TABS --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("all")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "all")}`}
        >
            View All
        </Button>
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("20")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "20")}`}
        >
            Under 20% Off
        </Button>
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("50")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "50")}`}
        >
            Half Price
        </Button>
        <Button 
            variant="outline" 
            onClick={() => handleFilterChange("clearance")} 
            className={`rounded-full px-8 py-6 text-sm transition-all duration-300 ${getButtonStyle(activeFilter === "clearance")}`}
        >
            Last Chance
        </Button>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((item: any) => (
           <ProductCard key={item.id} product={item} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
         <div className="text-center py-32 flex flex-col items-center justify-center space-y-4">
            <Gem className="w-12 h-12 text-white/10" />
            <p className="text-gray-500 font-serif">No exclusive items found in this category.</p>
            <Button variant="link" className="text-yellow-500" onClick={() => handleFilterChange("all")}>View All Offers</Button>
         </div>
      )}

    </div>
  );
}

export default function SalePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[45vh] md:h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10 pt-16 md:pt-0">
         
         {/* Background Effect */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-[#050505] to-[#050505]" />
         
         <div className="text-center space-y-6 relative z-10 px-4 max-w-4xl">
            <Badge className="bg-yellow-600/10 text-yellow-500 border border-yellow-500/20 px-4 py-1.5 text-xs tracking-[0.2em] uppercase mx-auto w-fit font-serif flex items-center gap-2">
                <Clock className="w-3 h-3" /> Limited Time Access
            </Badge>
            
            <h1 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter uppercase leading-[0.9]">
               PRIVATE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">ARCHIVE</span>
            </h1>
            
            <p className="text-gray-400 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
               Exclusive pricing on our last-remaining premium stock. 
               Once these pieces are gone, they will not be restocked.
            </p>
         </div>
      </section>

      <Suspense fallback={<div className="text-center py-32 text-yellow-500">Loading exclusive offers...</div>}>
         <SaleContent />
      </Suspense>

      <Footer />
    </main>
  );
}