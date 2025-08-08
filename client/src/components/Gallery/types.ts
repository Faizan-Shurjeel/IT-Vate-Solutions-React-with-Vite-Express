export type ImageItem = {
  type: "image";
  src: string;
  alt?: string;
  title?: string;
};

export type VideoItem = {
  type: "video";
  provider: "youtube" | "vimeo" | "local";
  title?: string;
  thumbnail?: string; // optional grid thumbnail
  src?: string; // for provider: 'local'
  videoId?: string; // for provider: 'youtube' | 'vimeo'
  startAtSeconds?: number;
};

export type GalleryItem = ImageItem | VideoItem;

export type GalleryProps = {
  title?: string;
  items: GalleryItem[];
  maxItems?: number; // show top N items
  className?: string;
};
