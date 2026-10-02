export type VisualCapability = "full" | "reduced" | "static";

export function getPreferredVisualCapability(): VisualCapability {
  if (typeof window === "undefined") return "static";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    "connection" in navigator &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

  if (reducedMotion || saveData) return "static";

  const memory = "deviceMemory" in navigator
    ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    : undefined;

  if (memory !== undefined && memory <= 4) return "reduced";
  return "full";
}
