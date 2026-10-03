export function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "https://joia-nightshift.vercel.app";

  const normalized = value.startsWith("http") ? value : "https://" + value;
  return normalized.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  return new URL(path, base + "/").toString();
}

export function localizedAlternates(itPath: string, enPath: string) {
  return {
    canonical: itPath,
    languages: {
      "it-IT": itPath,
      "en-GB": enPath,
      "x-default": itPath,
    },
  };
}
