"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "artists", label: "Artists" },
  { id: "lineup", label: "Lineups" },
  { id: "info", label: "Event Info & Terms" },
];

export function EventTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 150; // Adjust based on your sticky header height + tab bar height
      let currentActive = tabs[0].id;

      for (const tab of tabs) {
        const element = document.getElementById(tab.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section top is near the header offset
          // or if the section covers the view (top < offset and bottom > offset)
          if (rect.top <= headerOffset + 50) {
            currentActive = tab.id;
          }
        }
      }
      setActiveTab(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount to set initial active tab
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, {
        offset: -120, // Negative value to stop BEFORE the element (account for sticky nav + tabs)
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      });
      setActiveTab(id);
    } else if (element) {
      // Fallback if lenis not ready (though it should be)
      const top = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-18 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`relative py-4 text-sm font-medium tracking-wide uppercase transition-colors whitespace-nowrap hover:text-white ${
                activeTab === tab.id ? "text-white" : "text-white/60"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
