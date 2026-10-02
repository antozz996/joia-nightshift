export const siteConfig = {
  name: "JOIA",
  concept: "NIGHTSHIFT",
  locale: "it-IT",
  locales: ["it", "en"] as const,
  city: "Napoli",
  address: "Corso Europa 45, 80029 Sant'Antimo (NA)",
  contacts: {
    phone: "+39 351 393 9725",
    email: "info@joiabuilding.com",
    whatsapp: process.env.NEXT_PUBLIC_JOIA_WHATSAPP ?? "393513939725",
  },
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
