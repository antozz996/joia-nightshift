import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  _type: z.enum(["event", "artist", "privateEventType", "siteSettings", "faq", "gallery"]),
  slug: z.string().optional(),
});

function authorized(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) return false;

  const bearer = request.headers.get("authorization");
  const headerSecret = request.headers.get("x-sanity-secret");

  return bearer === "Bearer " + expected || headerSecret === expected;
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const { _type, slug } = parsed.data;
  const paths = new Set<string>(["/sitemap.xml"]);

  if (_type === "event") {
    paths.add("/nightlife/");
    if (slug) paths.add("/eventi/" + slug + "/");
  }

  if (_type === "artist") {
    paths.add("/nightlife/");
    if (slug) paths.add("/artisti/" + slug + "/");
  }

  if (_type === "privateEventType") {
    paths.add("/private-events/");
    if (slug) paths.add("/private-events/" + slug + "/");
  }

  if (_type === "siteSettings") {
    paths.add("/");
    paths.add("/location/");
    paths.add("/private-events/");
    paths.add("/nightlife/");
  }

  if (_type === "faq") {
    paths.add("/private-events/");
    paths.add("/nightlife/");
    paths.add("/location/");
  }

  if (_type === "gallery") {
    paths.add("/private-events/");
    paths.add("/nightlife/");
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    type: _type,
    slug: slug ?? null,
    revalidated: [...paths],
  });
}
