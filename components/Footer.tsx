import Image from "next/image";
import { Separator } from "@/components/ui/separator"; // <--- Import Separator

export default function Footer() {
  return (
    <footer className="w-full bg-black pt-16 pb-8 px-8 z-10 relative overflow-hidden">
      
      {/* SHADCN SEPARATOR (Top Border) */}
      <Separator className="bg-white/10 absolute top-0 left-0 w-full" />

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 relative z-10">
        
        {/* 1. BRAND COLUMN */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.webp" alt="Logo" width={40} height={40} className="opacity-80" />
            <span className="text-xl font-bold text-white tracking-tighter">SOLE VAULT</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            The world's premier destination for digital and physical footwear. Authenticity guaranteed. Experience the future of retail.
          </p>
          
          {/* PAYMENT ICONS (Same SVGs as before) */}
          <div className="pt-4">
             <p className="text-xs text-gray-600 font-bold mb-3 tracking-widest">SECURE PAYMENT</p>
             <div className="flex gap-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                {/* VISA */}
                <div className="bg-white/10 p-2 rounded w-12 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-full h-full fill-white">
                     <path d="M18.8 30.6l3-18.4h-4.9l-2.3 11.5c-0.3 1.1-1.1 1.7-2.1 1.7h-7.8l-0.1 0.4 4.8 11.2c1.1 2.5 3.1 4.6 6.5 4.6h12.8l-0.6-2.9h-8.8c-0.3 0-0.6-0.3-0.5-0.6z"/>
                     <path d="M33.4 12.2h-3.7c-1.1 0-2 0.8-2.3 1.9l-6.6 15.7h5l1.1-2.9h6.1l0.6 2.9h4.4l-4.6-17.6z m-4.8 11l2.3-6.5c0-0.1 0.1-0.2 0.2-0.2h0.1l1.1 6.7h-3.7z"/>
                     <path d="M42.2 12.2h-3.8c-1 0-1.8 0.6-2.1 1.6l-6.8 16.8h4.9l1-3.2h6.1l0.6 3.2h4.3l-4.2-18.4z"/>
                  </svg>
                </div>
                {/* MASTERCARD */}
                <div className="bg-white/10 p-2 rounded w-12 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                    <circle cx="7" cy="12" r="7" fill="#EB001B" fillOpacity="0.8"/>
                    <circle cx="17" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/>
                    <path d="M12 16.8C10.8 16.8 9.7 16.4 8.8 15.6C8 14.7 7.5 13.4 7.5 12C7.5 10.6 8 9.3 8.8 8.4C9.7 7.6 10.8 7.2 12 7.2C13.2 7.2 14.3 7.6 15.2 8.4C16 9.3 16.5 10.6 16.5 12C16.5 13.4 16 14.7 15.2 15.6C14.3 16.4 13.2 16.8 12 16.8Z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* AMEX */}
                <div className="bg-white/10 p-2 rounded w-12 h-8 flex items-center justify-center">
                   <svg viewBox="0 0 24 24" className="w-full h-full fill-blue-500">
                     <rect width="24" height="24" rx="4" fill="#006fcf"/>
                     <path d="M12.5 11h-5v5h5v-5z" fill="white" fillOpacity="0.2"/>
                     <path d="M4 14h2l1-2 1 2h2l-3-6H5l-3 6z m12-6h-3l-2 6h2l0.5-1.5h3l0.5 1.5h2l-2-6z m-6 0H7v6h3V8z" fill="white"/>
                   </svg>
                </div>
                {/* PAYPAL */}
                <div className="bg-white/10 p-2 rounded w-12 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path d="M4.63 20.5a1 1 0 0 0 1 .83h3.46a.79.79 0 0 0 .78-.65L10.93 14h2.23c3.48 0 5.4-1.7 5.4-4.84 0-3.3-2.33-5.22-6.26-5.22H4.63z" fill="#003087"/>
                        <path d="M9.63 10.88h2.22c1.78 0 2.76-.87 2.76-2.48 0-1.68-1.19-2.66-3.2-2.66H7.17l2.46 5.14z" fill="#009cde"/>
                        <path d="M8.87 21.33h3.46a.79.79 0 0 0 .78-.65L14.2 14.6h-3.46a.79.79 0 0 0-.78.65z" fill="#012169"/>
                    </svg>
                </div>
             </div>
          </div>
        </div>

        {/* 2. LINKS COLUMNS */}
        <div className="flex gap-16 mt-8 md:mt-0">
          <div>
            <h4 className="text-white font-bold mb-6">SHOP</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition">Best Sellers</li>
              <li className="hover:text-white cursor-pointer transition">Brands</li>
              <li className="hover:text-white cursor-pointer transition">Sale</li>
              <li className="hover:text-white cursor-pointer transition">Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">SUPPORT</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li className="hover:text-white cursor-pointer transition">Help Center</li>
              <li className="hover:text-white cursor-pointer transition">Returns</li>
              <li className="hover:text-white cursor-pointer transition">Shipping</li>
              <li className="hover:text-white cursor-pointer transition">Track Order</li>
              <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            </ul>
          </div>
        </div>

      </div>

      {/* COPYRIGHT SECTION */}
      <div className="mt-16 relative">
        <Separator className="bg-white/5 mb-8" />
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-bold tracking-widest uppercase">
            <p>&copy; 2025 SOLE VAULT INC. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <span className="cursor-pointer hover:text-blue-500 transition">Instagram</span>
                <span className="cursor-pointer hover:text-blue-500 transition">Twitter</span>
                <span className="cursor-pointer hover:text-blue-500 transition">TikTok</span>
            </div>
        </div>
      </div>
    </footer>
  );
}