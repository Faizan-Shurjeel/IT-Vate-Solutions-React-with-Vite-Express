import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem, GalleryProps } from "./types";

export default function Gallery({
  items,
  maxItems = 6,
  className,
}: GalleryProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item.type === "image").slice(0, Math.max(1, maxItems));
  }, [items, maxItems]);

  // Duplicate items for seamless scrolling
  const carouselItems = [...visibleItems, ...visibleItems];

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setActive(null);
  }, []);

  useEffect(() => {
    if (active) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [active, onKeyDown]);

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
              className="flex-shrink-0 w-48 h-32 sm:w-64 sm:h-48 mr-4 rounded-xl overflow-hidden bg-neutral-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setActive(item)}
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

      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-black/70 text-white grid place-items-center"
            >
              ✕
            </button>
            <img
              src={active.src}
              alt={active.title || "Image"}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
