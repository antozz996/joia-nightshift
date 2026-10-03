export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const CONSENT_KEY = "joia_consent_v1";
const ATTRIBUTION_KEY = "joia_attribution_v1";

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value ? (JSON.parse(value) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function writeConsent(consent: ConsentState) {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("joia:consent", { detail: consent }));
}

export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const next: Attribution = {};
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;

  for (const key of keys) {
    const value = params.get(key);
    if (value) next[key] = value.slice(0, 160);
  }

  if (!Object.keys(next).length) return;
  window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const value = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return value ? (JSON.parse(value) as Attribution) : {};
  } catch {
    return {};
  }
}

export function marketingConsentHeader() {
  return readConsent()?.marketing ? "1" : "0";
}

export function dispatchConversion(
  name: string,
  eventId?: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("joia:conversion", {
      detail: { name, eventId, params },
    }),
  );
}
