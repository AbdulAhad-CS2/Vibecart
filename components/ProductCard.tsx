"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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

export default function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <div 
      className="group relative h-[450px] w-full rounded-3xl transition-all duration-500 
      hover:-translate-y-2 
      border border-white/5 hover:border-[#BF953F]
      hover:shadow-[0_0_30px_rgba(191,149,63,0.5)]" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LINK LAYER (Z-10) 
         Covers the card for general clicking, but sits below the buttons 
      */}
      <a href={`/product/${product.id}`} className="absolute inset-0 z-10" />

      {/* ============================================================== */}
      {/* GLASS ARCHITECTURE (Z-0) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
          {/* Base Structure */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-white/[0.02] to-black/20 backdrop-blur-2xl border-[1.5px] border-t-white/40 border-l-white/30 border-r-white/10 border-b-white/5 rounded-3xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"></div>

          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
          
          {/* Moving Sheen Reflection */}
          <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.2] to-transparent -rotate-[25deg] scale-[2] pointer-events-none transition-transform duration-[1500ms] ease-in-out ${isHovered ? 'translate-x-[100%]' : '-translate-x-[100%]'}`} />

          {/* Inner Highlight */}
          <div className="absolute inset-[1.5px] rounded-3xl shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3)] pointer-events-none"></div>

          {/* Gold Tint on Hover */}
          <div className={`absolute inset-0 bg-[#BF953F] mix-blend-overlay transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />
      </div>


      {/* ============================================================== */}
      {/* CONTENT LAYER (Z-20) */}
      {/* ============================================================== */}
      <div className="relative h-full flex flex-col z-20 p-6 pointer-events-none">
        
        {/* TOP ROW */}
        <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
                {product.isNew && (
                    <Badge className="bg-[#BF953F] text-black border-none text-[9px] font-black tracking-widest px-2 py-1 rounded-sm shadow-[0_2px_10px_rgba(191,149,63,0.3)]">
                        NEW ARRIVAL
                    </Badge>
                )}
                {product.discount && (
                    <Badge className="bg-white/10 border border-white/30 text-white text-[9px] font-bold px-2 py-1 backdrop-blur-md shadow-[inset_0_0_5px_rgba(255,255,255,0.1)]">
                        -{product.discount}%
                    </Badge>
                )}
            </div>
            
            {/* WISHLIST BUTTON (Z-30, Clickable) */}
            <button className="relative p-2.5 rounded-full overflow-hidden transition-all duration-300 z-30 pointer-events-auto group/btn bg-white/10 border border-white/30 hover:bg-[#BF953F] hover:border-[#BF953F] hover:shadow-[0_0_15px_#BF953F]">
                <Heart className="relative z-10 w-4 h-4 text-white/80 group-hover/btn:text-black transition-colors" />
            </button>
        </div>

        {/* IMAGE AREA */}
        <div className="flex-1 relative flex items-center justify-center py-8">
            <div className={`absolute w-40 h-40 bg-[#BF953F] rounded-full blur-[80px] mix-blend-screen transition-all duration-700 ease-in-out ${isHovered ? "opacity-40 scale-150" : "opacity-0 scale-50"}`} />
            
            <div className={`relative w-full h-full transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isHovered ? "scale-120 -translate-y-4 rotate-3" : "scale-110"}`}>
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-auto space-y-5">
            <div>
                <p className="text-[#BF953F] text-[10px] font-bold tracking-[0.3em] uppercase mb-2 opacity-90">{product.brand}</p>
                <h3 className="text-white font-serif text-2xl leading-none tracking-tight group-hover:text-[#F3E5AB] transition-colors line-clamp-1 drop-shadow-sm">
                    {product.name}
                </h3>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

            <div className="flex items-center justify-between">
                <div className="flex flex-col leading-none gap-1">
                    {product.originalPrice && (
                        <span className="text-[11px] text-white/50 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-xl font-bold text-white drop-shadow-md leading-none">
                        Rs. {product.price.toLocaleString()}
                    </span>
                </div>

                {/* ADD TO CART BUTTON (Z-30, Clickable) */}
                <Button 
                    size="icon"
                    onClick={(e) => {
                       e.preventDefault();
                       e.stopPropagation(); 
                       addToCart(product, selectedColor); 
                    }}
                    className="h-11 w-11 rounded-full overflow-hidden relative z-30 pointer-events-auto transition-all duration-300 group/cart bg-white/10 border border-white/20 hover:bg-[#BF953F] hover:border-[#BF953F] hover:shadow-[0_0_20px_rgba(191,149,63,0.6)]"
                >
                    <ShoppingBag className="relative z-10 w-4 h-4 text-white transition-colors duration-300 group-hover/cart:text-black" />
                </Button>
            </div>
        </div>

      </div>
    </div>
  );
}