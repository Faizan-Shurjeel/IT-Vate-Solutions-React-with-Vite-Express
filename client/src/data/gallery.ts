import type { GalleryItem } from "@/components/Gallery";

export const homepageHighlights: GalleryItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1200&auto=format&fit=crop",
    title: "Bootcamp Session",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    title: "Team Collaboration",
  },
  {
    type: "video",
    provider: "youtube",
    videoId: "dQw4w9WgXcQ",
    title: "Highlights",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    title: "Workshop",
  },
  {
    type: "video",
    provider: "local",
    src: "/videos/highlight.mp4", // place file under public/videos/
    title: "Local Video Sample",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    title: "Cohort Showcase",
  },
];
