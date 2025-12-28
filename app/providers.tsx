"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";

import { LoadingScreen } from "@/components/loading-screen";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HeroUIProvider>
        <ReactLenis root>{children}</ReactLenis>
      </HeroUIProvider>
    </Suspense>
  );
}
