"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ICategory } from "@/types";
import { IPaginatedResponse } from "@/types/response";
import { getRandomColor } from "@/lib/randomColor";

interface CategoryShowcaseProps {
  categories: IPaginatedResponse<ICategory>;
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Filter Logic
  const categoryFilter = searchParams.get("category");

  const filteredCategories = categories.data.filter((cat) => {
    if (!categoryFilter) return true;
    if (categoryFilter === "all") return true;
    return (
      cat.slug.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      cat.name.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approx card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="category-showcase"
      ref={containerRef}
      className="relative py-20 bg-card min-h-[50vh]"
    >
      {/* Section Header */}
      <div className="container mx-auto">
        <motion.div style={{ opacity }} className="mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-accent font-bold tracking-[0.2em] uppercase block mb-6 text-sm"
          >
            EXPLORE BY CATEGORY
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif max-w-2xl"
            >
              {categoryFilter && categoryFilter !== "all"
                ? `Results for "${categoryFilter}"`
                : "Find Your Next Experience"}
            </motion.h2>

            <div className="flex items-center gap-6">
              {/* Scroll Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-foreground"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-foreground"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {categoryFilter && (
                <Link
                  href="/"
                  scroll={false}
                  className="text-sm text-accent hover:underline flex items-center gap-2"
                >
                  <X size={16} /> Clear Filters
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Categories */}
      <div className="relative">
        {filteredCategories.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className="flex gap-6 px-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
          >
            {filteredCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/events?category=${category.slug}`}
                className="group relative shrink-0 w-[320px] md:w-[400px] h-[500px] overflow-hidden rounded-xl snap-start"
              >
                {/* Image */}
                <Image
                  src={category.files[0].url || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl md:text-4xl font-serif mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/70 mb-6 font-serif">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      EXPLORE <ArrowRight className="w-4 h-4" />
                    </span>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Accent Line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: getRandomColor() }}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center text-muted-foreground">
            No categories found matching your criteria.
          </div>
        )}

        {/* Fade Edges */}
        <div className="absolute top-0 left-0 bottom-8 w-12 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-8 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
