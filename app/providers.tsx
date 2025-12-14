"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ReactLenis root>{children}</ReactLenis>
    </HeroUIProvider>
  );
}
