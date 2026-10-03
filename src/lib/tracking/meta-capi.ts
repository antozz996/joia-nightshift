import { createHash, randomUUID } from "node:crypto";

type MetaLeadInput = {
  request: Request;
  email?: string;
  phone?: string;
  eventSourceUrl?: string;
  customData?: Record<string, unknown>;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function readCookie(cookieHeader: string, name: string) {
  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(name + "="));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

export async function sendMetaLead({
  request,
  email,
  phone,
  eventSourceUrl,
  customData,
}: MetaLeadInput) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const eventId = randomUUID();

  if (!pixelId || !accessToken) {
    return { eventId, sent: false };
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const userData: Record<string, unknown> = {
    client_ip_address: forwardedFor,
    client_user_agent: userAgent,
    fbp: readCookie(cookieHeader, "_fbp"),
    fbc: readCookie(cookieHeader, "_fbc"),
  };

  if (email) userData.em = [sha256(normalizeEmail(email))];
  if (phone) userData.ph = [sha256(normalizePhone(phone))];

  Object.keys(userData).forEach((key) => {
    if (!userData[key]) delete userData[key];
  });

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };

  if (process.env.META_CAPI_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  }

  const response = await fetch(
    "https://graph.facebook.com/" +
      encodeURIComponent(pixelId) +
      "/events?access_token=" +
      encodeURIComponent(accessToken),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  return { eventId, sent: response.ok };
}
