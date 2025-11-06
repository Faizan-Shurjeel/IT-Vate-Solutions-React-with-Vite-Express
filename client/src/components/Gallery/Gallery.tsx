import React, { useMemo } from "react";
import type { GalleryItem, GalleryProps } from "./types";

export default function Gallery({
  items,
  maxItems = 6,
  className,
}: GalleryProps) {
  const visibleItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item.type === "image").slice(0, Math.max(1, maxItems));
  }, [items, maxItems]);

  // Duplicate items for seamless scrolling
  const carouselItems = [...visibleItems, ...visibleItems];

  return (
    <section className={["w-full", className].filter(Boolean).join(" ")}>
      <div className="relative overflow-hidden">
        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="flex animate-scroll">
          {carouselItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-48 h-32 sm:w-64 sm:h-48 mr-4 rounded-xl overflow-hidden bg-neutral-100"
            >
              <img
                src={item.src}
                alt={item.title || "Image"}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
