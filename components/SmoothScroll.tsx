"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there is a hash in the window.location
    const hash = window.location.hash;
    
    if (hash) {
      // Find the element with that ID
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        // Wait a tiny bit for the page to render fully
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname, searchParams]); // Run this whenever the URL changes

  return null; // This component renders nothing visually
}