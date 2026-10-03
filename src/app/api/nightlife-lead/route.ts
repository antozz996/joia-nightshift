import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import {
  buildNightlifeLeadText,
  buildNightlifeMailtoUrl,
  buildNightlifeWhatsAppUrl,
  type NightlifeLeadPayload,
} from "@/lib/nightlife/lead";

const schema = z
  .object({
    kind: z.enum(["community", "table", "guest"]),
    name: z.string().min(2).max(100),
    email: z.string().email().max(160).optional().or(z.literal("")),
    phone: z.string().max(40).optional().or(z.literal("")),
    event: z.string().max(120).optional().or(z.literal("")),
    partySize: z.coerce.number().int().min(1).max(1000).optional(),
    channel: z.string().max(40).optional().or(z.literal("")),
    message: z.string().max(1600).optional().or(z.literal("")),
    website: z.string().max(0).optional().default(""),
  })
  .superRefine((value, context) => {
    if (!value.email && !value.phone) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Inserisci almeno email o telefono.",
      });
    }

    if ((value.kind === "table" || value.kind === "guest") && !value.phone) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Per tavolo e guest list serve un numero di telefono.",
      });
    }
  });

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Payload non valido." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Controlla i campi e riprova." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, sent: true });
  }

  const payload: NightlifeLeadPayload = {
    kind: parsed.data.kind,
    name: parsed.data.name,
    email: parsed.data.email || undefined,
    phone: parsed.data.phone || undefined,
    event: parsed.data.event || undefined,
    partySize: parsed.data.partySize,
    channel: parsed.data.channel || undefined,
    message: parsed.data.message || undefined,
  };

  const recipient =
    process.env.NIGHTLIFE_LEAD_EMAIL_TO ??
    process.env.PRIVATE_BRIEF_EMAIL_TO ??
    siteConfig.contacts.email;

  const whatsappUrl = buildNightlifeWhatsAppUrl(
    payload,
    siteConfig.contacts.whatsapp,
  );
  const emailFallback = buildNightlifeMailtoUrl(payload, recipient);

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.NIGHTLIFE_LEAD_EMAIL_FROM ??
    process.env.PRIVATE_BRIEF_EMAIL_FROM;

  if (!apiKey || !from) {
    return NextResponse.json({
      ok: true,
      sent: false,
      reason: "email_provider_not_configured",
      whatsappUrl,
      emailFallback,
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email || undefined,
      subject: "Nightlife / FORMĀ — " + payload.kind + " — " + payload.name,
      text: buildNightlifeLeadText(payload),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({
      ok: true,
      sent: false,
      reason: "email_provider_error",
      whatsappUrl,
      emailFallback,
    });
  }

  return NextResponse.json({
    ok: true,
    sent: true,
    whatsappUrl,
  });
}
