import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll"; 
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react"; // 1. Import Suspense

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sole Vault | The 3D Sneaker Universe",
  description: "Experience the latest footwear in immersive 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey="pk_test_cnVsaW5nLW1hbW1vdGgtMzIuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang="en" className="scroll-smooth"> 
        <body className={inter.className}>
          <CartProvider>
            {/* 2. Wrap SmoothScroll in Suspense to fix the build error */}
            <Suspense fallback={null}>
               <SmoothScroll /> 
            </Suspense>
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}