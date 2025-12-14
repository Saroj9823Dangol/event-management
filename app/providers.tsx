"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={<div className="text-center py-12">Loading events...</div>}
    >
      <HeroUIProvider>
        <ReactLenis root>{children}</ReactLenis>
      </HeroUIProvider>
    </Suspense>
  );
}
