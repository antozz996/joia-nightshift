"use client";

import { useMemo, useState } from "react";
import type { NightlifeLeadKind } from "@/lib/nightlife/lead";
import {
  dispatchConversion,
  getAttribution,
  marketingConsentHeader,
} from "@/lib/tracking/client";
import styles from "./NightWorld.module.css";

type SubmitResult = {
  sent: boolean;
  whatsappUrl?: string;
  emailFallback?: string;
};

export function NightlifeLeadForm({
  initialKind = "community",
  initialEvent = "",
}: {
  initialKind?: NightlifeLeadKind;
  initialEvent?: string;
}) {
  const [kind, setKind] = useState<NightlifeLeadKind>(initialKind);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [event, setEvent] = useState(initialEvent);
  const [partySize, setPartySize] = useState("");
  const [channel, setChannel] = useState<"email" | "whatsapp">("whatsapp");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState("");

  const valid = useMemo(() => {
    if (name.trim().length < 2 || !privacy) return false;

    if (kind === "community") {
      return email.includes("@") || phone.trim().length >= 6;
    }

    return phone.trim().length >= 6 && Number(partySize) > 0;
  }, [email, kind, name, partySize, phone, privacy]);

  const submit = async () => {
    if (!valid || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/nightlife-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-joia-marketing-consent": marketingConsentHeader(),
        },
        body: JSON.stringify({
          kind,
          name,
          email,
          phone,
          event,
          partySize: partySize ? Number(partySize) : undefined,
          channel,
          message,
          website,
          attribution: getAttribution(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        sent?: boolean;
        whatsappUrl?: string;
        emailFallback?: string;
        error?: string;
        eventId?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Invio non riuscito.");
      }

      dispatchConversion("lead", data.eventId, {
        lead_type: kind,
        event,
      });

      setResult({
        sent: Boolean(data.sent),
        whatsappUrl: data.whatsappUrl,
        emailFallback: data.emailFallback,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Invio non riuscito.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className={styles.form}>
        <div className={styles.result}>
          <strong>
            {result.sent
              ? "Richiesta ricevuta dal team JOIA."
              : "Richiesta pronta. Completa l’invio da uno dei canali qui sotto."}
          </strong>
          <div className={styles.ctaRow} style={{ marginTop: ".8rem" }}>
            {result.whatsappUrl ? (
              <a href={result.whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp ↗
              </a>
            ) : null}
            {result.emailFallback ? <a href={result.emailFallback}>Email ↗</a> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(submitEvent) => {
        submitEvent.preventDefault();
        void submit();
      }}
    >
      <div className={styles.formTabs} role="tablist" aria-label="Tipo richiesta">
        {(
          [
            ["community", "Community"],
            ["table", "Tavolo"],
            ["guest", "Guest list"],
          ] as const
        ).map(([value, label]) => (
          <button
            type="button"
            role="tab"
            aria-selected={kind === value}
            className={styles.tab}
            data-active={kind === value}
            onClick={() => setKind(value)}
            key={value}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(changeEvent) => setWebsite(changeEvent.target.value)}
        style={{ position: "absolute", left: "-9999px" }}
      />

      <div className={styles.fieldGrid}>
        <input
          className={styles.field}
          placeholder="Nome"
          autoComplete="name"
          value={name}
          onChange={(changeEvent) => setName(changeEvent.target.value)}
        />
        <input
          className={styles.field}
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(changeEvent) => setEmail(changeEvent.target.value)}
        />
      </div>

      <input
        className={styles.field}
        type="tel"
        placeholder={kind === "community" ? "Telefono / WhatsApp (opzionale)" : "Telefono / WhatsApp"}
        autoComplete="tel"
        value={phone}
        onChange={(changeEvent) => setPhone(changeEvent.target.value)}
      />

      {kind !== "community" ? (
        <div className={styles.fieldGrid}>
          <input
            className={styles.field}
            type="number"
            min="1"
            max="1000"
            inputMode="numeric"
            placeholder="Numero persone"
            value={partySize}
            onChange={(changeEvent) => setPartySize(changeEvent.target.value)}
          />
          <input
            className={styles.field}
            placeholder="Evento / data, se già nota"
            value={event}
            onChange={(changeEvent) => setEvent(changeEvent.target.value)}
          />
        </div>
      ) : (
        <div className={styles.choiceRow} aria-label="Canale preferito">
          <button
            type="button"
            className={styles.choice}
            data-active={channel === "whatsapp"}
            onClick={() => setChannel("whatsapp")}
          >
            WhatsApp
          </button>
          <button
            type="button"
            className={styles.choice}
            data-active={channel === "email"}
            onClick={() => setChannel("email")}
          >
            Email
          </button>
        </div>
      )}

      <textarea
        className={styles.textarea}
        placeholder={
          kind === "community"
            ? "Qualcosa che vuoi dirci?"
            : "Preferenze, zona tavolo o altre note"
        }
        value={message}
        onChange={(changeEvent) => setMessage(changeEvent.target.value)}
      />

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={privacy}
          onChange={(changeEvent) => setPrivacy(changeEvent.target.checked)}
        />
        <span>
          Acconsento a essere ricontattato dal team JOIA in relazione a questa richiesta.
        </span>
      </label>

      {error ? <div className={styles.result}>{error}</div> : null}

      <button
        className={styles.submit}
        type="submit"
        disabled={!valid || submitting}
      >
        {submitting
          ? "Invio…"
          : kind === "community"
            ? "Entra nella community"
            : kind === "table"
              ? "Richiedi tavolo"
              : "Richiedi guest list"}
      </button>
    </form>
  );
}
