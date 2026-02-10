"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment } from "@react-three/drei";
import ShoeModel from "./ShoeModel";
import { Suspense } from "react";

export default function ThreeScene({ modelScale = 2 }: { modelScale?: number }) {
  return (
    // UPDATED: Fully interactive on all devices (No pointer-events-none)
    <div className="w-full h-full">
      <Canvas 
        
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]} 
        gl={{ antialias: false, powerPreference: "high-performance" }} 
        className="w-full h-full"
      >
        <Suspense fallback={null}>
            
            {/* --- 1. LIGHTING --- */}
            <Environment files="/forest.exr" background={false} />
            
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#ffffff" /> 

            {/* --- 2. SHOE (Floats) --- */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
               <ShoeModel scale={modelScale} />
            </Float>

            {/* --- 3. PODIUM (Fixed) --- */}
            <mesh position={[0, -1.8, 0]} receiveShadow>
                <cylinderGeometry args={[1.8, 1.8, 0.2, 64]} />
                <meshStandardMaterial 
                    color="#000000" 
                    metalness={0.4} 
                    roughness={0.15} 
                />
            </mesh>

            <mesh position={[0, -1.85, 0]}>
                <cylinderGeometry args={[1.85, 1.85, 0.1, 64]} />
                <meshBasicMaterial color="#ffffff" /> 
            </mesh>


            {/* AutoRotate enabled, but user can INTERRUPT it to rotate manually */}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}