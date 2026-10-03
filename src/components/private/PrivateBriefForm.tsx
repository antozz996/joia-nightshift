"use client";

import { useMemo, useState } from "react";
import { privateEventTypes } from "@/content/private-events";
import { budgetOptions } from "@/lib/private/brief";
import {
  dispatchConversion,
  getAttribution,
  marketingConsentHeader,
} from "@/lib/tracking/client";
import styles from "./PrivateWorld.module.css";

type FormData = {
  eventType: string;
  people: string;
  date: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  privacy: boolean;
};

type SubmitResult = {
  sent: boolean;
  whatsappUrl?: string;
  emailFallback?: string;
};

const emptyForm: FormData = {
  eventType: "",
  people: "",
  date: "",
  budget: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
  privacy: false,
};

export function PrivateBriefForm({ initialEventType = "" }: { initialEventType?: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...emptyForm, eventType: initialEventType });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState("");

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(form.eventType);
    if (step === 1) return Number(form.people) > 0;
    if (step === 2) return Boolean(form.date);
    if (step === 3) return Boolean(form.budget);
    return (
      form.name.trim().length >= 2 &&
      form.email.includes("@") &&
      form.phone.trim().length >= 6 &&
      form.privacy
    );
  }, [form, step]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const next = () => {
    if (!canContinue) return;
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const previous = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const submit = async () => {
    if (!canContinue || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/private-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-joia-marketing-consent": marketingConsentHeader(),
        },
        body: JSON.stringify({
          eventType: form.eventType,
          people: Number(form.people),
          date: form.date,
          budget: form.budget,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          website: form.website,
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
        lead_type: "private_brief",
        event_type: form.eventType,
      });

      setResult({
        sent: Boolean(data.sent),
        whatsappUrl: data.whatsappUrl,
        emailFallback: data.emailFallback,
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Invio non riuscito.");
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
              ? "Brief inviato. Il team JOIA ha ricevuto la richiesta."
              : "Brief pronto. Completa l'invio con uno dei canali qui sotto."}
          </strong>
          <div className={styles.resultActions}>
            {result.whatsappUrl ? (
              <a href={result.whatsappUrl} target="_blank" rel="noreferrer">
                Apri WhatsApp ↗
              </a>
            ) : null}
            {result.emailFallback ? <a href={result.emailFallback}>Apri email ↗</a> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <div className={styles.formHeader}>
        <span>Brief evento</span>
        <span>{String(step + 1).padStart(2, "0")} / 05</span>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ transform: "scaleX(" + progress / 100 + ")" }}
        />
      </div>

      {step === 0 ? (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Che cosa stai immaginando?</h3>
          <div className={styles.optionGrid}>
            {privateEventTypes.map((item) => (
              <button
                className={styles.option}
                data-active={form.eventType === item.slug}
                key={item.slug}
                type="button"
                onClick={() => update("eventType", item.slug)}
              >
                {item.eyebrow.replace("Private / ", "")}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Quante persone vuoi coinvolgere?</h3>
          <input
            className={styles.field}
            type="number"
            min="1"
            max="3000"
            inputMode="numeric"
            placeholder="Es. 120"
            value={form.people}
            onChange={(event) => update("people", event.target.value)}
            autoFocus
          />
          <p className={styles.sectionText}>
            La capienza viene validata in base al layout scelto e alla configurazione reale della sala.
          </p>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Hai già una data?</h3>
          <input
            className={styles.field}
            type="date"
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            autoFocus
          />
        </div>
      ) : null}

      {step === 3 ? (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Che budget vuoi mettere in campo?</h3>
          <div className={styles.optionGrid}>
            {budgetOptions.map((budget) => (
              <button
                className={styles.option}
                data-active={form.budget === budget}
                key={budget}
                type="button"
                onClick={() => update("budget", budget)}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Ultimo passo. Come ti ricontattiamo?</h3>

          <input
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
            style={{ position: "absolute", left: "-9999px" }}
          />

          <div className={styles.fieldGrid}>
            <input
              className={styles.field}
              placeholder="Nome"
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
            />
            <input
              className={styles.field}
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </div>

          <input
            className={styles.field}
            type="tel"
            placeholder="Telefono"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />

          <textarea
            className={styles.textarea}
            placeholder="C'è qualcosa che vuoi dirci subito?"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
          />

          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={form.privacy}
              onChange={(event) => update("privacy", event.target.checked)}
            />
            <span>
              Acconsento a essere ricontattato in relazione a questa richiesta. L’informativa
              privacy definitiva verrà collegata prima della pubblicazione.
            </span>
          </label>

          {error ? <div className={styles.result}>{error}</div> : null}
        </div>
      ) : null}

      <div className={styles.formActions}>
        <button
          className={styles.formButton + " " + styles.formButtonSecondary}
          type="button"
          onClick={previous}
          disabled={step === 0 || submitting}
        >
          Indietro
        </button>

        {step < totalSteps - 1 ? (
          <button
            className={styles.formButton + " " + styles.formButtonPrimary}
            type="button"
            onClick={next}
            disabled={!canContinue}
          >
            Continua
          </button>
        ) : (
          <button
            className={styles.formButton + " " + styles.formButtonPrimary}
            type="submit"
            disabled={!canContinue || submitting}
          >
            {submitting ? "Invio…" : "Invia il brief"}
          </button>
        )}
      </div>
    </form>
  );
}
