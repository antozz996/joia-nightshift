"use server";

import { createClient } from "next-sanity";
import type { CmsSeoFields } from "@/lib/seo/metadata";

export type CmsPrivateEventType = {
  title: string;
  slug: string;
  eyebrow?: string;
  intro?: string;
  statement?: string;
  moments?: string[];
  heroUrl?: string;
  gallery?: { url: string; alt?: string; caption?: string }[];
  beforeImageUrl?: string;
  afterImageUrl?: string;
  layoutCapacities?: {
    dinner?: number;
    cocktail?: number;
    party?: number;
  };
  updatedAt?: string;
  seo?: CmsSeoFields;
  seoTitle?: string;
  seoDescription?: string;
};

const SEO_PROJECTION = `seo{
  title,
  description,
  canonicalUrl,
  noIndex,
  focusKeyword,
  "imageUrl": image.asset->url
}`;

const PRIVATE_PROJECTION = `{
  title,
  "slug": slug.current,
  eyebrow,
  intro,
  statement,
  moments,
  "heroUrl": hero.asset->url,
  "gallery": gallery[]{
    "url": asset->url,
    alt,
    caption
  },
  "beforeImageUrl": beforeImage.asset->url,
  "afterImageUrl": afterImage.asset->url,
  layoutCapacities,
  "updatedAt": _updatedAt,
  ${SEO_PROJECTION},
  seoTitle,
  seoDescription
}`;

function getOptionalClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-10-01",
    useCdn: true,
    perspective: "published",
  });
}

export async function getPrivateEventTypeBySlug(
  slug: string,
): Promise<CmsPrivateEventType | null> {
  const client = getOptionalClient();
  if (!client) return null;

  return client.fetch<CmsPrivateEventType | null>(
    `*[_type == "privateEventType" && slug.current == $slug][0] ${PRIVATE_PROJECTION}`,
    { slug },
    { next: { revalidate: 600 } },
  );
}

export async function getAllPrivateEventTypes(): Promise<CmsPrivateEventType[]> {
  const client = getOptionalClient();
  if (!client) return [];

  return client.fetch<CmsPrivateEventType[]>(
    `*[_type == "privateEventType"] | order(title asc) ${PRIVATE_PROJECTION}`,
    {},
    { next: { revalidate: 600 } },
  );
}
