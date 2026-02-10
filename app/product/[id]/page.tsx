"use client";

// 1. ADD 'use' to imports
import { useState, useRef, Suspense, useEffect, useMemo, use } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, useGLTF, Environment, useProgress ,PerspectiveCamera} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ShoppingBag, Info } from "lucide-react";
import * as THREE from "three";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

// --- MOCK DATA ---
const PRODUCT_DATA = {
  id: "1",
  brand: "NIKE",
  name: "AIR MAX PULSE 97",
  collection: "Classic",
  price: 150,
  description: "The Air Max Pulse pulls inspiration from the London music scene...",
  colors: [
    { name: "Midnight Black", hex: "#1a1a1a" },
    { name: "White", hex: "#c7c9cc" },
    { name: "Wine Red", hex: "#4b1218" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"]
};

// ... (LoaderOverlay, ShoeModel, CameraManager, FormatName components stay exactly the same) ...

function LoaderOverlay() {
  const { progress } = useProgress();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setFinished(true), 200); 
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {!finished && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <motion.div initial={{ x: 0 }} exit={{ x: "-100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }} className="absolute left-0 top-0 h-full w-1/2 bg-[#050505]" />
          <motion.div initial={{ x: 0 }} exit={{ x: "100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }} className="absolute right-0 top-0 h-full w-1/2 bg-[#050505]" />
          <motion.div exit={{ opacity: 0, scale: 0.9 }} className="relative z-10 flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
             <p className="text-blue-500 font-mono text-sm tracking-[0.3em] font-bold">{Math.round(progress)}% LOADED</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ShoeModel({ color, isTransitioning, scale = 2.8 }: { color: string, isTransitioning: boolean, scale?: number }) {
  const { scene } = useGLTF("/models/Sneakers.glb"); 
  const meshRef = useRef<THREE.Group>(null);
  const clonedScene = useMemo(() => scene.clone(), [scene]);



  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material.name === "Leather_Mat.003") {
           if (!material.userData.isCloned) {
              const newMaterial = material.clone();
              newMaterial.userData.isCloned = true;
              mesh.material = newMaterial;
           }
           (mesh.material as THREE.MeshStandardMaterial).color.set(color);
        }
      }
    });
  }, [clonedScene, color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetY = isTransitioning ? -5 : -0.5;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.15);
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={meshRef} scale={scale} position={[0.5, -0.5, 0]} rotation={[0, -0.6, 0]}> 
       <primitive object={clonedScene} />
    </group>
  );
}


function CameraManager({ distance = 10 }: { distance?: number }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [camera, distance]);

  return <OrbitControls ref={controlsRef} enableZoom={false} autoRotate autoRotateSpeed={0.5} />;
}

const FormatName = ({ name }: { name: string }) => {
  const parts = name.split(" ");
  return (
    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] relative z-0">
      {parts.map((word, i) => {
        const isBlue = i === parts.length - 1 || /\d/.test(word);
        return <span key={i} className={isBlue ? "text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" : "text-white"}>{word}{" "}{i === 1 && <br/>}</span>;
      })}
    </h1>
  );
};

// --- 2. UPDATE EXPORTED FUNCTION SIGNATURE ---
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // --- 3. UNWRAP PARAMS ---
  const { id } = use(params);

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  
  const { addToCart } = useCart();

  const handleColorChange = (index: number) => {
    if (index === activeColorIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
        setActiveColorIndex(index);
        setTimeout(() => setIsTransitioning(false), 150);
    }, 300);
  };

  const colors = PRODUCT_DATA.colors;

  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex flex-col">
      <Navbar />
      <LoaderOverlay />

      {/* MOBILE VIEW */}
      <div className="md:hidden flex-1 flex flex-col px-6 overflow-y-auto">
         <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/product" className="hover:text-white">{PRODUCT_DATA.collection}</Link> / <span className="text-white">{PRODUCT_DATA.name}</span>
         </div>

         <div className="relative w-screen h-[45vh] mb-8 -mx-6 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
               <Image src="/nike.webp" alt="Brand Logo" width={800} height={800} className="w-[60vw] h-auto object-contain brightness-10 opacity-30" />
            </div>
            <Canvas 
            dpr={[1, 2]}   
            gl={{ antialias: false, powerPreference: "high-performance" }} 
            className="w-full h-full pt-10"
            >
            <Suspense fallback={null}>
               
               {/* 1. NEW CAMERA & HEADLIGHT SETUP (Matches Desktop) */}
               <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45}>
                  <directionalLight 
                     intensity={5} 
                     position={[0, 0, 5]} 
                     color="white" 
                     castShadow // Added shadow casting for mobile depth
                  />
               </PerspectiveCamera>

               {/* 2. ENVIRONMENT (Matches Desktop) */}
               <Environment 
                  files="/Untitled.hdr" 
                  
               />

               {/* 3. MODEL (Kept Mobile Scale 6.5) */}
               <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <ShoeModel 
                     color={colors[activeColorIndex].hex} 
                     isTransitioning={isTransitioning} 
                     scale={5} 
                  />
               </Float>


               {/* 5. CONTROLS (Updated to match Desktop restrictions) */}
               <OrbitControls 
                  enablePan={false} 
                  enableZoom={true} 
                  rotateSpeed={0.5} 
                  minDistance={6}  // How close they can zoom in (lower = closer)
                  maxDistance={10}
               />

            </Suspense>
            </Canvas>

            
         </div>

         <div className="w-full flex justify-center mt-4 mb-2">
            <div className="flex flex-row items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
               {colors.map((color, index) => (
                  <button
                     key={index}
                     onClick={() => handleColorChange(index)}
                     className={`w-6 h-6 rounded-full border border-white/20 transition-all duration-300 ${
                        index === activeColorIndex 
                           ? "scale-125 ring-2 ring-blue-500 opacity-100" 
                           : "scale-100 opacity-60 hover:opacity-100"
                     }`}
                     style={{ backgroundColor: typeof color === "string" ? color : color.hex }}
                  />
               ))}
            </div>
         </div>

         <div className="space-y-6 pt-5">

            <div className="text-gray-500 font-bold tracking-[0.4em] text-sm uppercase">
               {PRODUCT_DATA.brand}
            </div>
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-white">
                     AIR MAX<br/>PULSE <span className="text-blue-500">97</span>
                  </h1>
               </div>
               <div className="text-right space-y-2 pt-1">
                  <div className="text-blue-500 font-bold tracking-widest uppercase text-[10px]">
                     Classic Collection
                  </div>
                  <div className="text-3xl font-black tracking-tight text-white">
                     ${PRODUCT_DATA.price}
                  </div>
               </div>
            </div>
            <div className="space-y-3">
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Select Size</p>
               <div className="flex flex-wrap gap-3">
                  {PRODUCT_DATA.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-lg border font-bold text-sm transition-all ${selectedSize === size ? "bg-white text-black border-white" : "bg-transparent border-white/20 text-gray-400 hover:border-white"}`}
                    >
                       {size}
                    </button>
                  ))}
               </div>
            </div>
            <Button 
               size="lg" 
               onClick={() => addToCart({ id: PRODUCT_DATA.id, name: PRODUCT_DATA.name, brand: PRODUCT_DATA.brand, category: PRODUCT_DATA.collection, price: PRODUCT_DATA.price, image: "/sneaker classic.webp", colors: [colors[activeColorIndex].hex] }, colors[activeColorIndex].hex)}
               className=" h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
               ADD TO CART
            </Button>
            <div
               className={
                  isDrawerOpen
                     ? "fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
                     : "flex justify-center mt-10 pb-10"
               }
               >
               <div className="flex flex-col items-center gap-2">
                  {!isDrawerOpen && (
                     <motion.span
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-[10px] uppercase font-bold tracking-widest text-blue-400"
                     >
                     Tech Specs
                     </motion.span>
                  )}

                  <button
                     onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                     className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white hover:text-black transition-all group"
                  >
                     {isDrawerOpen ? (
                     <ChevronDown className="w-6 h-6" />
                     ) : (
                     <ChevronUp className="w-6 h-6 animate-bounce" />
                     )}
                  </button>
               </div>
               </div>

         </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex flex-1 relative w-full h-full flex-row max-w-7xl mx-auto px-6 py-12 items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
           <Image src="/nike.webp" alt="Brand Logo" width={800} height={800} className="w-[60vw] h-auto object-contain brightness-10 opacity-30" />
        </div>
        <div className="flex-1 flex flex-col justify-center space-y-6 relative z-20 pointer-events-auto max-w-[45%]">
           <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">
              <Link href="/" className="hover:text-white">Home</Link> / <Link href="/product" className="hover:text-white">{PRODUCT_DATA.collection}</Link> / <span className="text-white">{PRODUCT_DATA.name}</span>
           </div>
           <div className="text-gray-500 font-bold tracking-[0.4em] text-lg uppercase mb-2">{PRODUCT_DATA.brand}</div>
           <div className="relative z-0"><FormatName name={PRODUCT_DATA.name} /></div>
           <div className="space-y-6 relative z-30 pt-4">
              <div className="space-y-1">
                 <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">{PRODUCT_DATA.collection} Collection</span>
                 <p className="text-5xl font-black tracking-tight text-white">${PRODUCT_DATA.price}</p>
              </div>
              <div className="space-y-3">
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Select Size</p>
                 <div className="flex gap-2 flex-wrap">
                    {PRODUCT_DATA.sizes.map(size => (
                       <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 rounded-lg border font-bold text-sm transition-all ${selectedSize === size ? "bg-white text-black border-white" : "bg-transparent border-white/20 text-gray-400 hover:border-white"}`}>{size}</button>
                    ))}
                 </div>
              </div>
              <div className="pt-2">
                <Button size="lg" onClick={() => addToCart({ id: PRODUCT_DATA.id, name: PRODUCT_DATA.name, brand: PRODUCT_DATA.brand, category: PRODUCT_DATA.collection, price: PRODUCT_DATA.price, image: "/sneaker classic.webp", colors: [colors[activeColorIndex].hex] }, colors[activeColorIndex].hex)} className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg">ADD TO CART <ShoppingBag className="ml-2 w-5 h-5" /></Button>
              </div>
           </div>
        </div>
        <div className={`absolute inset-0 static w-[65%] -ml-24 h-[80vh] z-10 transition-opacity duration-300 ${isDrawerOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Canvas 
                  dpr={[1, 2]}  
                  gl={{ antialias: false, powerPreference: "high-performance" }} 
                  className="w-full h-full"
               >
                  <Suspense fallback={null}>
                  
                  {/* 2. THE HEADLIGHT (Fixed ReferenceError) */}
                  <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45}>
                     <directionalLight 
                        intensity={5} 
                        position={[0, 0, 5]} 
                        color="white" 
                     />
                  </PerspectiveCamera>

                  {/* 3. LIGHTING (Environment only) */}
                  <Environment 
                     files="/Untitled.hdr" 
                     
                  />

                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                     <ShoeModel 
                        color={colors[activeColorIndex].hex} 
                        isTransitioning={isTransitioning} 
                        scale={5.5} 
                        
                     />
                  </Float>

                  {/* 4. CONTROLS (Rotation ONLY) */}
                  <OrbitControls 
                     enablePan={false}   // BANNED: User cannot drag the shoe off-screen
                     enableZoom={true}  // BANNED: User cannot zoom in/out
                     // We removed minPolarAngle/maxPolarAngle so user can rotate X/Y freely
                     rotateSpeed={0.5} 
                     minDistance={6}  // How close they can zoom in (lower = closer)
                     maxDistance={10}
                  />

                  </Suspense>
               </Canvas>
        </div>
        <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-500 ${isDrawerOpen ? "translate-x-full" : "translate-x-0"}`}>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-64 bg-white/5 backdrop-blur-xl border-l border-white/10 rounded-l-2xl shadow-xl" />
           <div className="relative h-64 flex flex-col items-center justify-center gap-8 pr-4">
              {colors.map((color, index) => (
                 <div key={index} className="relative group">
                    <button onClick={() => handleColorChange(index)} className={`w-6 h-6 rounded-full shadow-lg transition-all duration-300 ${index === activeColorIndex ? "scale-150 ring-2 ring-blue-500" : "scale-100 opacity-60 hover:opacity-100"}`} style={{ backgroundColor: color.hex }} />
                 </div>
              ))}
           </div>
        </div>
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
           {!isDrawerOpen && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Tech Specs</motion.span>}
           <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white hover:text-black transition-all group">{isDrawerOpen ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6 animate-bounce" />}</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isDrawerOpen && (
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }} 
            className="fixed inset-0 z-40 bg-[#0a0a0a] text-white flex flex-col pt-32 px-6 overflow-y-auto"
          >
             <div className="max-w-3xl mx-auto space-y-12 pb-20">
                <div className="text-center space-y-4">
                   <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                      Behind The Design
                   </h2>
                   <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                </div>
                <div className="prose prose-invert prose-lg mx-auto text-gray-300 leading-relaxed text-center">
                   <p>The Air Max Pulse pulls inspiration from the London music scene...</p>
                   <p>Constructed with premium Flyknit and recycled materials, this shoe represents the future of sustainable streetwear. The generative design sole unit provides 30% more energy return than previous models.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
                   <div className="bg-white/5 p-6 rounded-xl text-center">
                      <h4 className="font-bold text-xl mb-2 text-blue-400">Materials</h4>
                      <p className="text-sm text-gray-400">Sustainable Flyknit, Recycled Rubber, ZoomX Foam</p>
                   </div>
                   <div className="bg-white/5 p-6 rounded-xl text-center">
                      <h4 className="font-bold text-xl mb-2 text-blue-400">Fit</h4>
                      <p className="text-sm text-gray-400">True to size. Fits like a sock for maximum comfort.</p>
                   </div>
                   <div className="bg-white/5 p-6 rounded-xl text-center">
                      <h4 className="font-bold text-xl mb-2 text-blue-400">Warranty</h4>
                      <p className="text-sm text-gray-400">Verified Authentic. 2-Year Sole Vault Guarantee.</p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}