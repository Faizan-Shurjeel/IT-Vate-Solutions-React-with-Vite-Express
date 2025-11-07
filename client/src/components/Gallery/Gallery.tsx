import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem, GalleryProps } from "./types";

export default function Gallery({
  items,
  maxItems = 8,
  className,
}: GalleryProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item.type === "image").slice(0, Math.max(1, maxItems));
  }, [items, maxItems]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setActive(null);
  }, []);

  useEffect(() => {
    if (active) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [active, onKeyDown]);

  const animationDuration = `${visibleItems.length * 4}s`; // Adjust multiplier for speed

  const renderItems = (isDuplicate = false) =>
    visibleItems.map((item, idx) => (
      <div
        key={`${item.src}-${idx}${isDuplicate ? "-dup" : ""}`}
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
    ));

  return (
    <section className={["w-full", className].filter(Boolean).join(" ")}>
      <div className="relative overflow-hidden group" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
        <style>
          {`
            @keyframes scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .animate-scroll {
              animation: scroll var(--animation-duration, 40s) linear infinite;
            }
            .group:hover .animate-scroll {
              animation-play-state: paused;
            }
          `}
        </style>
        <div
          className="flex flex-nowrap"
          style={{ "--animation-duration": animationDuration } as React.CSSProperties}
        >
          <div className="flex flex-nowrap animate-scroll">{renderItems()}</div>
          <div className="flex flex-nowrap animate-scroll" aria-hidden="true">{renderItems(true)}</div>
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
