"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X } from "lucide-react"; 
import { Button } from "@/components/ui/button";

// --- MOCK DATA ---
const ALL_PRODUCTS: Product[] = [
  { id: "1", name: "Air Max Pulse", brand: "Nike", category: "Classic", price: 150, image: "/Air Max Pulse.webp", colors: ["#000"], isNew: true },
  { id: "2", name: "Ultraboost Light", brand: "Adidas", category: "Sports", price: 190, image: "/Ultraboost Light.webp", colors: ["#000"], isSale: true },
  { id: "3", name: "Piel Becerro Negro", brand: "New Balance", category: "Office", price: 145, image: "/formal shoe.webp", colors: ["#000"] },
  { id: "4", name: "RS-X Efekt", brand: "Puma", category: "New Arrival", price: 110, image: "/RS-X Efekt.webp", colors: ["#000"], isNew: true },
  { id: "5", name: "Dunk Low", brand: "Nike", category: "Best Selling", price: 115, image: "/Duck Low.webp", colors: ["#000"] },
  { id: "6", name: "B44 Blade", brand: "Dior", category: "New Arrival", price: 950, image: "/B44 Blade.webp", colors: ["#fff", "#000", "#4b1218"], isNew: true }
];

// --- CONSTANTS (Moved Outside) ---
const BRANDS = ["Nike", "Adidas", "Puma", "New Balance", "Dior"];
const CATEGORIES = ["Classic", "Sports", "Office", "New Arrival", "Best Selling"];

// --- REUSABLE FILTER COMPONENT (Moved Outside) ---
interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedBrands: string[];
  setSelectedBrands: (val: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
}

function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories
}: FilterProps) {

  // Helper to toggle items in arrays
  const toggleFilter = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="space-y-8">
       {/* Search */}
       <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            placeholder="Search shoes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border-white/10 pl-10 text-white focus:border-blue-500 transition-colors"
          />
       </div>
       <Separator className="bg-white/10" />

       {/* Brands */}
       <div className="space-y-4">
          <h3 className="font-bold text-sm tracking-widest text-gray-400 uppercase">Brands</h3>
          <div className="space-y-3">
             {BRANDS.map((brand) => (
                <div key={brand} className="flex items-center space-x-3">
                   <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                      className="border-white/30 data-[state=checked]:bg-blue-600 w-5 h-5"
                   />
                   <label htmlFor={`brand-${brand}`} className="text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors">{brand}</label>
                </div>
             ))}
          </div>
       </div>
       <Separator className="bg-white/10" />

       {/* Collections */}
       <div className="space-y-4">
          <h3 className="font-bold text-sm tracking-widest text-gray-400 uppercase">Collections</h3>
          <div className="space-y-3">
             {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-3">
                   <Checkbox 
                      id={`cat-${cat}`} 
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                      className="border-white/30 data-[state=checked]:bg-blue-600 w-5 h-5"
                   />
                   <label htmlFor={`cat-${cat}`} className="text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors">{cat}</label>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

// --- INNER COMPONENT (Handles Logic) ---
function ProductContent() {
  const searchParams = useSearchParams();
  
  // STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // AUTO-SELECT FILTERS FROM URL
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    if (brandParam) setSelectedBrands([brandParam]);
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [searchParams]);

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* --- MOBILE FILTER TOGGLE --- */}
        <div className="lg:hidden flex items-center justify-between mb-4">
           <span className="text-gray-400 text-sm">{filteredProducts.length} Results</span>
           <Button 
             variant="outline" 
             onClick={() => setIsMobileFiltersOpen(true)}
             className="border-white/20 bg-white/5 text-white hover:bg-white/10 gap-2"
           >
              <Filter className="w-4 h-4" /> Filters
           </Button>
        </div>

        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden lg:block w-64 space-y-8 flex-shrink-0 sticky top-24 h-fit">
           <ProductFilters 
             searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
             selectedBrands={selectedBrands}
             setSelectedBrands={setSelectedBrands}
             selectedCategories={selectedCategories}
             setSelectedCategories={setSelectedCategories}
           />
        </aside>

        {/* --- MOBILE DRAWER --- */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileFiltersOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[85vw] max-w-[350px] bg-[#0a0a0a] border-l border-white/10 p-6 z-50 lg:hidden overflow-y-auto shadow-2xl"
              >
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold tracking-tight">FILTERS</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)} className="hover:bg-white/10 rounded-full">
                       <X className="w-6 h-6" />
                    </Button>
                 </div>

                 {/* REUSED FILTER COMPONENT */}
                 <ProductFilters 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                 />

                 <div className="mt-8 pt-6 border-t border-white/10">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-500 font-bold py-6"
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                       SHOW {filteredProducts.length} RESULTS
                    </Button>
                 </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- MAIN GRID --- */}
        <div className="flex-1 min-h-[50vh]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
                <Search className="w-12 h-12 opacity-20" />
                <p>No products found matching your criteria.</p>
                <Button 
                   variant="link" 
                   className="text-blue-500"
                   onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSearchQuery(""); }}
                >
                   Clear all filters
                </Button>
             </div>
          )}
        </div>
    </div>
  );
}

// --- MAIN PAGE WRAPPER ---
export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* HEADER */}
      <div className="relative py-12 px-6 border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <p className="text-blue-500 font-bold text-xs tracking-widest mb-2">SOLE VAULT STORE</p>
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">ALL <span className="text-white">PRODUCTS</span></h1>
          </div>
        </div>
      </div>
      
      <Suspense fallback={<div className="text-white text-center py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" /></div>}>
        <ProductContent />
      </Suspense>

      <Footer />
    </main>
  );
}