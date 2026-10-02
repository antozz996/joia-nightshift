export type PrivateBriefPayload = {
  eventType: string;
  people: number;
  date: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export const budgetOptions = [
  "Fino a €2.000",
  "€2.000 – €4.000",
  "€4.000 – €7.000",
  "Oltre €7.000",
  "Da definire",
] as const;

export function buildBriefText(payload: PrivateBriefPayload) {
  return [
    "Richiesta Private Events — JOIA",
    "",
    "Tipo evento: " + payload.eventType,
    "Persone: " + payload.people,
    "Data: " + payload.date,
    "Budget: " + payload.budget,
    "",
    "Nome: " + payload.name,
    "Email: " + payload.email,
    "Telefono: " + payload.phone,
    payload.message ? "Note: " + payload.message : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(payload: PrivateBriefPayload, phone: string) {
  const normalized = phone.replace(/\D/g, "");
  return "https://wa.me/" + normalized + "?text=" + encodeURIComponent(buildBriefText(payload));
}

export function buildMailtoUrl(payload: PrivateBriefPayload, recipient: string) {
  const subject = "Richiesta Private Events — " + payload.eventType;
  return (
    "mailto:" +
    recipient +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(buildBriefText(payload))
  );
}
