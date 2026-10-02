export const siteConfig = {
  name: "JOIA",
  concept: "NIGHTSHIFT",
  locale: "it-IT",
  locales: ["it", "en"] as const,
  city: "Napoli",
  routes: {
    home: "/",
    privateEvents: "/private-events/",
    nightlife: "/nightlife/",
    location: "/location/",
  },
  featureFlags: {
    webglSwitch: true,
    hlsVideo: true,
    communitySignup: true,
    privateConfigurator: true,
  },
} as const;
