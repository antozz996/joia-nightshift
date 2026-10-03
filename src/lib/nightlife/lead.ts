export type NightlifeLeadKind = "community" | "table" | "guest";

export type NightlifeLeadPayload = {
  kind: NightlifeLeadKind;
  name: string;
  email?: string;
  phone?: string;
  event?: string;
  partySize?: number;
  channel?: string;
  message?: string;
};

export function buildNightlifeLeadText(payload: NightlifeLeadPayload) {
  return [
    "Richiesta Nightlife / FORMĀ — JOIA",
    "",
    "Tipo: " + payload.kind,
    payload.event ? "Evento: " + payload.event : "",
    payload.partySize ? "Persone: " + payload.partySize : "",
    "",
    "Nome: " + payload.name,
    payload.email ? "Email: " + payload.email : "",
    payload.phone ? "Telefono: " + payload.phone : "",
    payload.channel ? "Canale preferito: " + payload.channel : "",
    payload.message ? "Note: " + payload.message : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildNightlifeWhatsAppUrl(payload: NightlifeLeadPayload, phone: string) {
  const normalized = phone.replace(/\D/g, "");
  return (
    "https://wa.me/" +
    normalized +
    "?text=" +
    encodeURIComponent(buildNightlifeLeadText(payload))
  );
}

export function buildNightlifeMailtoUrl(
  payload: NightlifeLeadPayload,
  recipient: string,
) {
  return (
    "mailto:" +
    recipient +
    "?subject=" +
    encodeURIComponent("Nightlife / FORMĀ — " + payload.kind) +
    "&body=" +
    encodeURIComponent(buildNightlifeLeadText(payload))
  );
}
