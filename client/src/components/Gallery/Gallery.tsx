import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem, GalleryProps, VideoItem } from "./types";

function getYouTubeEmbedUrl(videoId: string, startAtSeconds = 0) {
  const params = new URLSearchParams();
  params.set("rel", "0");
  params.set("modestbranding", "1");
  if (startAtSeconds) params.set("start", String(startAtSeconds));
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    videoId
  )}?${params.toString()}`;
}

function getVimeoEmbedUrl(videoId: string, startAtSeconds = 0) {
  const params = new URLSearchParams();
  if (startAtSeconds) params.set("#t", `${startAtSeconds}s`);
  return `https://player.vimeo.com/video/${encodeURIComponent(
    videoId
  )}?${params.toString()}`;
}

function VideoFrame({ item }: { item: VideoItem }) {
  if (item.provider === "local" && item.src) {
    return (
      <video
        className="w-full max-h-[80vh] object-contain bg-black"
        controls
        preload="metadata"
      >
        <source src={item.src} />
        Your browser does not support the video tag.
      </video>
    );
  }
  if (item.provider === "youtube" && item.videoId) {
    return (
      <iframe
        className="w-full max-h-[80vh] aspect-video bg-black"
        src={getYouTubeEmbedUrl(item.videoId, item.startAtSeconds)}
        title={item.title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    );
  }
  if (item.provider === "vimeo" && item.videoId) {
    return (
      <iframe
        className="w-full max-h-[80vh] aspect-video bg-black"
        src={getVimeoEmbedUrl(item.videoId, item.startAtSeconds)}
        title={item.title || "Video"}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        loading="lazy"
      />
    );
  }
  return null;
}

export default function Gallery({
  title = "Highlights",
  items,
  maxItems = 6,
  className,
}: GalleryProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.slice(0, Math.max(1, maxItems));
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

  return (
    <section className={["w-full", className].filter(Boolean).join(" ")}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {visibleItems.map((item, idx) => {
          const key = `${item.type}-${idx}`;
          const isVideo = item.type === "video";
          const thumb = isVideo
            ? item.thumbnail ||
              (item.provider === "youtube" && item.videoId
                ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
                : undefined)
            : (item as any).src;

          return (
            <figure
              key={key}
              role="button"
              tabIndex={0}
              aria-label={item.title || (isVideo ? "Play video" : "View image")}
              className="relative rounded-xl overflow-hidden bg-neutral-100 aspect-[4/3] cursor-pointer group"
              onClick={() => setActive(item)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setActive(item)
              }
            >
              {thumb ? (
                <img
                  src={thumb}
                  alt={
                    item.title ||
                    (isVideo ? "Video thumbnail" : (item as any).alt || "Image")
                  }
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200" aria-hidden />
              )}

              {isVideo && (
                <>
                  <span className="absolute top-2 left-2 text-[11px] px-2 py-0.5 rounded-full text-white bg-black/60">
                    Video
                  </span>
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-black/60 grid place-items-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-white translate-x-[1px]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </figure>
          );
        })}
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
            {active.type === "image" ? (
              <img
                src={active.src}
                alt={active.alt || active.title || "Image"}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
            ) : (
              <VideoFrame item={active} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
