"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BackgroundPattern } from "./background-pattern";

export function Loader() {
  return (
    <div className="bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    </div>
  );
}
