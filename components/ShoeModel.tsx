"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber"; // <--- CHANGED IMPORT

// We use ThreeElements['group'] to type the props correctly
export default function ShoeModel(props: ThreeElements['group']) {
  
  // CORRECT PATH (based on your folder structure):
  const { scene } = useGLTF("/models/Sneakers.glb");

  return (
    <primitive 
      object={scene} 
      scale={2} 
      {...props} 
    />
  );
}