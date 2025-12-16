"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BackgroundPattern } from "./background-pattern";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <BackgroundPattern />
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo Container */}
        <div className="relative w-80 mb-6">
          <div className="relative w-40 h-10 mx-auto">
            <Image
              src="/logo/dark-theme-logo.png"
              alt="UCNCEE"
              fill
              className="object-cover" // preserve aspect ratio
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
