export const mediaPaths = {
  switch: {
    privateVideo: "/media/switch/private-room.mp4",
    nightVideo: "/media/switch/night-room.mp4",
    privatePoster: "/media/switch/private-room-poster.webp",
    nightPoster: "/media/switch/night-room-poster.webp",
  },
  private: "/media/private/",
  nightlife: "/media/nightlife/",
  archive: "/media/archive/",
} as const;

export type MediaFallbackLevel = "video" | "image" | "generative";
