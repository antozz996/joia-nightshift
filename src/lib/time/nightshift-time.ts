export type TimePhase = "deep" | "dawn" | "day" | "golden" | "night";

export type TimePalette = {
  phase: TimePhase;
  background: string;
  foreground: string;
  muted: string;
  glow: string;
  progress: number;
};

type Keyframe = {
  minute: number;
  phase: TimePhase;
  background: string;
  foreground: string;
  muted: string;
  glow: string;
};

const DAY_MINUTES = 24 * 60;
const VENUE_TIME_ZONE = "Europe/Rome";

const KEYFRAMES: Keyframe[] = [
  { minute: 0, phase: "deep", background: "#070806", foreground: "#F4F2EA", muted: "#9BA08F", glow: "#D7FF00" },
  { minute: 5 * 60, phase: "deep", background: "#070806", foreground: "#F4F2EA", muted: "#9BA08F", glow: "#D7FF00" },
  { minute: 6 * 60 + 30, phase: "dawn", background: "#D8CAB6", foreground: "#211C16", muted: "#786B5C", glow: "#F0C99B" },
  { minute: 9 * 60 + 30, phase: "day", background: "#F3EEE4", foreground: "#1B1712", muted: "#74685A", glow: "#D6BD96" },
  { minute: 16 * 60 + 30, phase: "day", background: "#F3EEE4", foreground: "#1B1712", muted: "#74685A", glow: "#D6BD96" },
  { minute: 19 * 60, phase: "golden", background: "#BF8758", foreground: "#17120E", muted: "#4F3928", glow: "#F1C98E" },
  { minute: 20 * 60 + 45, phase: "night", background: "#10120F", foreground: "#ECEEE6", muted: "#9BA08F", glow: "#D7FF00" },
  { minute: 23 * 60 + 30, phase: "deep", background: "#070806", foreground: "#F4F2EA", muted: "#9BA08F", glow: "#D7FF00" },
  { minute: DAY_MINUTES, phase: "deep", background: "#070806", foreground: "#F4F2EA", muted: "#9BA08F", glow: "#D7FF00" },
];

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const channel = (value: number) => Math.round(value).toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

function mixHex(from: string, to: string, progress: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const mix = (start: number, end: number) => start + (end - start) * progress;
  return rgbToHex({ r: mix(a.r, b.r), g: mix(a.g, b.g), b: mix(a.b, b.b) });
}

export function getVenueMinutes(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: VENUE_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function resolveNightshiftTime(date = new Date()): TimePalette {
  const minute = getVenueMinutes(date);
  const nextIndex = KEYFRAMES.findIndex((frame) => frame.minute >= minute);
  const upper = KEYFRAMES[Math.max(nextIndex, 1)];
  const lower = KEYFRAMES[Math.max(nextIndex - 1, 0)];
  const span = Math.max(upper.minute - lower.minute, 1);
  const progress = Math.min(Math.max((minute - lower.minute) / span, 0), 1);

  return {
    phase: progress < 0.5 ? lower.phase : upper.phase,
    background: mixHex(lower.background, upper.background, progress),
    foreground: mixHex(lower.foreground, upper.foreground, progress),
    muted: mixHex(lower.muted, upper.muted, progress),
    glow: mixHex(lower.glow, upper.glow, progress),
    progress,
  };
}

export const nightshiftTimeZone = VENUE_TIME_ZONE;
