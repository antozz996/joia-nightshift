import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import {
  buildBriefText,
  buildMailtoUrl,
  buildWhatsAppUrl,
  type PrivateBriefPayload,
} from "@/lib/private/brief";
import { sendMetaLead } from "@/lib/tracking/meta-capi";

const attributionSchema = z
  .object({
    utm_source: z.string().max(160).optional(),
    utm_medium: z.string().max(160).optional(),
    utm_campaign: z.string().max(160).optional(),
    utm_content: z.string().max(160).optional(),
    utm_term: z.string().max(160).optional(),
  })
  .optional();

const schema = z.object({
  eventType: z.string().min(2).max(80),
  people: z.coerce.number().int().min(1).max(3000),
  date: z.string().min(4).max(40),
  budget: z.string().min(2).max(80),
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  phone: z.string().min(6).max(40),
  message: z.string().max(1600).optional().default(""),
  website: z.string().max(0).optional().default(""),
  attribution: attributionSchema,
});

function attributionText(attribution: z.infer<typeof attributionSchema>) {
  if (!attribution || !Object.keys(attribution).length) return "";
  return (
    "\n\nAttribuzione:\n" +
    Object.entries(attribution)
      .filter(([, value]) => value)
      .map(([key, value]) => key + ": " + value)
      .join("\n")
  );
}

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
      { ok: false, error: "Controlla i campi del brief e riprova." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, sent: true });
  }

  const payload: PrivateBriefPayload = parsed.data;
  const recipient = process.env.PRIVATE_BRIEF_EMAIL_TO ?? siteConfig.contacts.email;
  const whatsappUrl = buildWhatsAppUrl(payload, siteConfig.contacts.whatsapp);
  const emailFallback = buildMailtoUrl(payload, recipient);
  const marketingConsent = request.headers.get("x-joia-marketing-consent") === "1";

  const meta = marketingConsent
    ? await sendMetaLead({
        request,
        email: payload.email,
        phone: payload.phone,
        eventSourceUrl: request.headers.get("referer") ?? undefined,
        customData: {
          lead_type: "private_brief",
          event_type: payload.eventType,
          people: payload.people,
          budget: payload.budget,
        },
      })
    : { eventId: undefined, sent: false };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PRIVATE_BRIEF_EMAIL_FROM;

  if (!apiKey || !from) {
    return NextResponse.json({
      ok: true,
      sent: false,
      reason: "email_provider_not_configured",
      whatsappUrl,
      emailFallback,
      eventId: meta.eventId,
    });
  }

  const text = buildBriefText(payload) + attributionText(parsed.data.attribution);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email,
      subject: "Private Events — " + payload.eventType + " — " + payload.name,
      text,
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
      eventId: meta.eventId,
    });
  }

  return NextResponse.json({
    ok: true,
    sent: true,
    whatsappUrl,
    eventId: meta.eventId,
  });
}
