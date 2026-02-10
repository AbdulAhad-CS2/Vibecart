"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ShieldCheck, Lock, CreditCard } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if not signed in (Double check security)
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  // --- HANDLE ORDER SUBMISSION ---
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API Call / Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart(); // Empty the cart
    }, 2000);
  };

  if (!isLoaded || !isSignedIn) return null; // or a loading spinner

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">ORDER CONFIRMED</h1>
            <p className="text-gray-400">
              Thank you, {user?.firstName}! Your order <span className="text-white font-mono">#SV-{Math.floor(Math.random() * 10000)}</span> has been placed successfully.
            </p>
            <div className="bg-white/5 p-4 rounded-lg text-sm text-gray-300">
               Check your email at <span className="text-blue-400">{user?.primaryEmailAddress?.emailAddress}</span> for tracking details.
            </div>
            <Link href="/product">
              <Button className="w-full h-12 bg-white text-black hover:bg-blue-600 hover:text-white font-bold rounded-full mt-4">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  // --- EMPTY CART VIEW ---
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
           <h2 className="text-2xl font-bold">Your cart is empty</h2>
           <Link href="/product">
             <Button>Browse Products</Button>
           </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // --- MAIN CHECKOUT FORM ---
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-8">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. SHIPPING INFO */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                   <ShieldCheck className="w-5 h-5 text-blue-500" /> Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">FIRST NAME</label>
                      <Input defaultValue={user?.firstName || ""} className="bg-white/5 border-white/10 text-white" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">LAST NAME</label>
                      <Input defaultValue={user?.lastName || ""} className="bg-white/5 border-white/10 text-white" required />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500">EMAIL</label>
                      <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} className="bg-white/5 border-white/10 text-white" disabled />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500">ADDRESS</label>
                      <Input placeholder="123 Street Name" className="bg-white/5 border-white/10 text-white" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">CITY</label>
                      <Input placeholder="City" className="bg-white/5 border-white/10 text-white" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">ZIP CODE</label>
                      <Input placeholder="00000" className="bg-white/5 border-white/10 text-white" required />
                   </div>
                </form>
              </CardContent>
            </Card>

            {/* 2. PAYMENT INFO */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                   <CreditCard className="w-5 h-5 text-blue-500" /> Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex gap-4 mb-4">
                    <div className="flex-1 bg-blue-600/20 border border-blue-500 text-center py-3 rounded-lg text-sm font-bold text-blue-400 cursor-pointer">
                       Credit Card
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 text-center py-3 rounded-lg text-sm font-bold text-gray-500 cursor-not-allowed">
                       PayPal
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500">CARD NUMBER</label>
                    <div className="relative">
                       <Input placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/10 text-white pl-10" required />
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500">EXPIRY</label>
                       <Input placeholder="MM/YY" className="bg-white/5 border-white/10 text-white" required />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500">CVC</label>
                       <Input placeholder="123" className="bg-white/5 border-white/10 text-white" required />
                    </div>
                 </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 bg-[#0a0a0a] border border-white/10 rounded-xl p-6 space-y-6">
                <h3 className="font-bold text-lg">Order Summary</h3>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                   {cart.map((item) => (
                      <div key={item.cartId} className="flex gap-4">
                         <div className="relative w-16 h-16 bg-white/5 rounded border border-white/10 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-400">{item.brand}</p>
                            <div className="flex justify-between mt-1 text-sm">
                               <span className="text-gray-500">x{item.quantity}</span>
                               <span className="font-bold">${item.price * item.quantity}</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2 text-sm">
                   <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-green-400">Free</span>
                   </div>
                   <div className="flex justify-between text-gray-400">
                      <span>Tax (Est.)</span>
                      <span>${(cartTotal * 0.08).toFixed(2)}</span>
                   </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex justify-between text-xl font-black">
                   <span>TOTAL</span>
                   <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>

                {/* THE SUBMIT BUTTON - LINKED TO THE FORM ID */}
                <Button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full h-12 bg-white text-black hover:bg-blue-600 hover:text-white font-bold rounded-full transition-all text-lg"
                >
                   {isProcessing ? (
                     <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> PROCESSING...</>
                   ) : (
                     "PLACE ORDER"
                   )}
                </Button>

                <p className="text-xs text-center text-gray-500">
                   By placing this order, you agree to the Terms of Service and Privacy Policy.
                </p>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}