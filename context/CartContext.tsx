// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { Product } from "@/components/ProductCard";

// // Define what a Cart Item looks like (Product + Quantity + Selected Color)
// export interface CartItem extends Product {
//   cartId: string; // Unique ID for the cart (to handle same shoe, different colors)
//   quantity: number;
//   selectedColor: string;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product, color: string) => void;
//   removeFromCart: (cartId: string) => void;
//   clearCart: () => void;
//   toggleCart: () => void; // Opens/Closes the sidebar
//   isCartOpen: boolean;
//   cartTotal: number;
//   cartCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   // 1. Load Cart from LocalStorage on startup
//   useEffect(() => {
//     setIsMounted(true);
//     const savedCart = localStorage.getItem("sole-vault-cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // 2. Save Cart to LocalStorage whenever it changes
//   useEffect(() => {
//     if (isMounted) {
//       localStorage.setItem("sole-vault-cart", JSON.stringify(cart));
//     }
//   }, [cart, isMounted]);

//   // --- ACTIONS ---

//   const addToCart = (product: Product, color: string) => {
//     setCart((prev) => {
//       // Create a unique ID based on Product ID + Color
//       const uniqueId = `${product.id}-${color}`;
//       const existing = prev.find((item) => item.cartId === uniqueId);

//       if (existing) {
//         // If exists, increase quantity
//         return prev.map((item) =>
//           item.cartId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       // If new, add to array
//       return [...prev, { ...product, cartId: uniqueId, quantity: 1, selectedColor: color }];
//     });
    
//     // Automatically open cart when adding
//     setIsCartOpen(true); 
//   };

//   const removeFromCart = (cartId: string) => {
//     setCart((prev) => prev.filter((item) => item.cartId !== cartId));
//   };

//   const clearCart = () => setCart([]);
//   const toggleCart = () => setIsCartOpen((prev) => !prev);

//   // --- CALCULATIONS ---
//   const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toggleCart, isCartOpen, cartTotal, cartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Assuming you have this exported from somewhere, otherwise define it here
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  colors: string[];
}

// Define what a Cart Item looks like (Product + Quantity + Selected Color)
export interface CartItem extends Product {
  cartId: string; // Unique ID for the cart 
  quantity: number;
  selectedColor: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: string) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  toggleCart: () => void; // Opens/Closes the sidebar
  isCartOpen: boolean;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Load Cart from LocalStorage on startup
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("vibecart-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("vibecart-cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // --- ACTIONS ---

  const addToCart = (product: Product, color: string) => {
    setCart((prev) => {
      // Create a unique ID based on Product ID + Color
      const uniqueId = `${product.id}-${color}`;
      const existing = prev.find((item) => item.cartId === uniqueId);

      if (existing) {
        // If exists, increase quantity
        return prev.map((item) =>
          item.cartId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If new, add to array
      return [...prev, { ...product, cartId: uniqueId, quantity: 1, selectedColor: color }];
    });
    
    // Automatically open cart when adding
    setIsCartOpen(true); 
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // --- CALCULATIONS ---
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toggleCart, isCartOpen, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};