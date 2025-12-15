"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo Container */}
        <div className="relative w-80  mb-6">
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
