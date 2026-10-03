"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  captureAttribution,
  getAttribution,
  readConsent,
  type ConsentState,
  writeConsent,
} from "@/lib/tracking/client";
import styles from "./Tracking.module.css";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function classifyCta(element: HTMLElement) {
  const anchor = element.closest("a") as HTMLAnchorElement | null;
  const button = element.closest("button") as HTMLButtonElement | null;
  const label = (anchor?.textContent ?? button?.textContent ?? "").trim().slice(0, 100);
  const href = anchor?.href ?? "";

  let kind = "cta";
  if (href.includes("wa.me")) kind = "whatsapp";
  else if (href.startsWith("mailto:")) kind = "email";
  else if (/ticket/i.test(label)) kind = "ticket";
  else if (/tavolo|table/i.test(label)) kind = "table";
  else if (/guest/i.test(label)) kind = "guest_list";
  else if (/community|join/i.test(label)) kind = "community";
  else if (href.includes("#brief")) kind = "private_brief";

  return { kind, label, href };
}

export function TrackingManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [customizing, setCustomizing] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({
    analytics: false,
    marketing: false,
  });

  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    captureAttribution();
    const existing = readConsent();
    const firstFrame = window.requestAnimationFrame(() => {
      setConsent(existing);
      if (existing) setDraft(existing);
    });

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<ConsentState>).detail;
      setConsent(detail);
      setDraft(detail);
    };

    window.addEventListener("joia:consent", onConsent);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("joia:consent", onConsent);
    };
  }, []);

  const currentUrl = useMemo(() => {
    const query = searchParams.toString();
    return pathname + (query ? "?" + query : "");
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!consent?.analytics || !gaId || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: currentUrl,
      ...getAttribution(),
    });
  }, [consent?.analytics, currentUrl, gaId]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const actionable = target.closest("a,button") as HTMLElement | null;
      if (!actionable) return;

      const detail = classifyCta(actionable);
      const attribution = getAttribution();

      if (consent?.analytics && window.gtag) {
        window.gtag("event", "cta_click", {
          cta_kind: detail.kind,
          cta_label: detail.label,
          destination: detail.href,
          ...attribution,
        });
      }

      if (consent?.marketing && window.fbq) {
        window.fbq("trackCustom", "CTA", {
          kind: detail.kind,
          label: detail.label,
        });
      }
    };

    const onConversion = (event: Event) => {
      const detail = (
        event as CustomEvent<{
          name: string;
          eventId?: string;
          params?: Record<string, unknown>;
        }>
      ).detail;

      if (consent?.analytics && window.gtag) {
        window.gtag("event", detail.name, {
          ...(detail.params ?? {}),
          ...getAttribution(),
        });
      }

      if (consent?.marketing && window.fbq) {
        window.fbq(
          "track",
          "Lead",
          detail.params ?? {},
          detail.eventId ? { eventID: detail.eventId } : undefined,
        );
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("joia:conversion", onConversion);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("joia:conversion", onConversion);
    };
  }, [consent]);

  const save = (value: ConsentState) => {
    const needsReload = Boolean(
      consent &&
        ((consent.analytics && !value.analytics) ||
          (consent.marketing && !value.marketing)),
    );

    writeConsent(value);
    setConsent(value);
    setCustomizing(false);
    setManagerOpen(false);

    if (needsReload) window.location.reload();
  };

  const gaInit =
    "window.dataLayer=window.dataLayer||[];" +
    "window.gtag=function(){window.dataLayer.push(arguments);};" +
    "window.gtag('js',new Date());" +
    "window.gtag('config','" +
    (gaId ?? "") +
    "',{send_page_view:false,anonymize_ip:true});";

  const metaInit =
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
    "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
    "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
    "fbq('init','" +
    (metaPixelId ?? "") +
    "');fbq('track','PageView');";

  return (
    <>
      {consent?.analytics && gaId ? (
        <>
          <Script
            src={"https://www.googletagmanager.com/gtag/js?id=" + gaId}
            strategy="afterInteractive"
          />
          <Script
            id="joia-ga4"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: gaInit }}
          />
        </>
      ) : null}

      {consent?.marketing && metaPixelId ? (
        <Script
          id="joia-meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: metaInit }}
        />
      ) : null}

      {consent !== null && !managerOpen ? (
        <button
          className={styles.settingsButton}
          type="button"
          onClick={() => {
            setDraft(consent);
            setCustomizing(true);
            setManagerOpen(true);
          }}
        >
          Cookie settings
        </button>
      ) : null}

      {consent === null || managerOpen ? (
        <aside className={styles.banner} aria-label="Preferenze cookie">
          <p className={styles.copy}>
            Usiamo cookie tecnici sempre necessari. Analytics e marketing partono solo con
            il tuo consenso; puoi rifiutarli senza perdere funzioni del sito.
          </p>

          {customizing ? (
            <div className={styles.preferences}>
              <label className={styles.toggle}>
                <span>Analytics</span>
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(event) =>
                    setDraft((value) => ({ ...value, analytics: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.toggle}>
                <span>Marketing / Meta</span>
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(event) =>
                    setDraft((value) => ({ ...value, marketing: event.target.checked }))
                  }
                />
              </label>
            </div>
          ) : null}

          <div className={styles.actions}>
            <button
              className={styles.button + " " + styles.primary}
              type="button"
              onClick={() => save({ analytics: true, marketing: true })}
            >
              Accetta
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={() => save({ analytics: false, marketing: false })}
            >
              Rifiuta
            </button>
            {customizing ? (
              <button className={styles.button} type="button" onClick={() => save(draft)}>
                Salva preferenze
              </button>
            ) : (
              <button
                className={styles.button}
                type="button"
                onClick={() => setCustomizing(true)}
              >
                Personalizza
              </button>
            )}
          </div>
        </aside>
      ) : null}
    </>
  );
}
