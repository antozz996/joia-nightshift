export const mediaTreatment = {
  private: {
    masks: ["arch", "soft-window", "full"],
    intent: "warm-editorial",
    notes: "Lower saturation, champagne warmth, soft vignette, restrained grain.",
  },
  night: {
    masks: ["slice", "notch", "full"],
    intent: "dense-documentary",
    notes: "Higher contrast, restrained saturation, single acid accent, stronger grain.",
  },
} as const;
