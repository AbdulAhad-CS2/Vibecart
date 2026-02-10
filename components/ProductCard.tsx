"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number; // Added optional prop
  discount?: number;      // Added optional prop
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
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <a href={`/product/${product.id}`} className="absolute inset-0 z-10" />

      {/* --- BADGES --- */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
        {product.isNew && <Badge className="bg-blue-600 text-white border-none text-[10px] px-2 py-0.5">NEW</Badge>}
        {product.isSale && <Badge className="bg-red-600 text-white border-none text-[10px] px-2 py-0.5">SALE</Badge>}
        {product.isClearance && <Badge className="bg-gray-600 text-white border-none text-[10px] px-2 py-0.5">CLEARANCE</Badge>}
      </div>

      {/* --- DISCOUNT BADGE (Top Right) --- */}
      {product.discount && (
         <div className="absolute top-2 right-2 z-20 bg-yellow-400 text-black font-bold text-[10px] px-1.5 py-0.5 rounded-sm shadow-sm">
            -{product.discount}%
         </div>
      )}

      {/* --- WISHLIST (Below Discount) --- */}
      <button className="absolute top-8 right-2 z-20 p-1.5 rounded-full bg-black/40 text-white hover:bg-blue-600 transition-colors backdrop-blur-sm">
        <Heart className="w-3.5 h-3.5" />
      </button>

      {/* --- IMAGE SECTION --- */}
      <div className="relative h-[180px] w-full bg-gradient-to-b from-[#151515] to-[#0a0a0a] p-4 flex items-center justify-center">
        <div className={`relative w-full h-full transition-transform duration-500 ${isHovered ? "scale-110 -rotate-6" : "scale-100"}`}>
           <Image 
             src={product.image} 
             alt={product.name} 
             fill 
             className="object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
             sizes="(max-width: 768px) 50vw, 33vw"
           />
        </div>
      </div>

      {/* --- INFO SECTION --- */}
      <div className="p-2 md:p-4 flex flex-col flex-1 space-y-2">
        {/* Brand & Category Row */}
        <div className="flex justify-between items-start text-[10px] font-bold tracking-wider text-gray-500 uppercase">
          <span>{product.brand}</span>
          <span className="text-right truncate max-w-[50%]">{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-blue-400 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Color Swatches */}
        <div className="flex gap-1.5 relative z-20 pb-1">
          {product.colors.map((color, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault(); 
                setSelectedColor(color);
              }}
              className={`w-3 h-3 rounded-full border border-white/20 transition-all ${selectedColor === color ? "ring-1 ring-offset-1 ring-offset-black ring-white scale-110" : "hover:scale-110"}`}
              style={{ backgroundColor: color }}
            />
          ))}
          {product.colors.length > 3 && <span className="text-[10px] text-gray-600 self-center">+</span>}
        </div>

        {/* --- PRICE & ACTION ROW (Auto-aligned) --- */}
        <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
             {/* Original Price (Strikethrough) - Only show if exists */}
             {product.originalPrice && (
                <span className="text-[10px] text-gray-500 line-through decoration-red-500 decoration-1">
                   ${product.originalPrice}
                </span>
             )}
             {/* Current Price */}
             <span className="text-base md:text-lg font-bold text-white">
                ${product.price}
             </span>
          </div>
          
          <Button 
            size="icon"
            onClick={(e) => {
               e.preventDefault();
               e.stopPropagation(); 
               addToCart(product, selectedColor); 
            }}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors relative z-20"
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}