"use server";

import { createClient } from "next-sanity";
import type { CmsSeoFields } from "@/lib/seo/metadata";

export type NightEventRecord = {
  title: string;
  slug: string;
  startsAt: string;
  subtitle?: string;
  ticketUrl?: string;
  tableUrl?: string;
  guestListEnabled?: boolean;
  artists?: { name: string; slug: string }[];
  posterUrl?: string;
  updatedAt?: string;
  seo?: CmsSeoFields;
  seoDescription?: string;
};

export type NightArtistRecord = {
  name: string;
  slug: string;
  bio?: string;
  genres?: string[];
  country?: string;
  instagram?: string;
  portraitUrl?: string;
  updatedAt?: string;
  seo?: CmsSeoFields;
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

const EVENT_PROJECTION = `{
  title,
  "slug": slug.current,
  startsAt,
  subtitle,
  ticketUrl,
  tableUrl,
  guestListEnabled,
  "posterUrl": poster.asset->url,
  "_updatedAt": _updatedAt,
  "updatedAt": _updatedAt,
  "artists": artists[]->{name, "slug": slug.current},
  ${SEO_PROJECTION},
  seoDescription
}`;

const ARTIST_PROJECTION = `{
  name,
  "slug": slug.current,
  "bio": pt::text(bio),
  genres,
  country,
  instagram,
  "portraitUrl": portrait.asset->url,
  "updatedAt": _updatedAt,
  ${SEO_PROJECTION},
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

export async function getNextNightEvent(): Promise<NightEventRecord | null> {
  const client = getOptionalClient();
  if (!client) return null;

  return client.fetch<NightEventRecord | null>(
    `*[_type == "event" && startsAt >= now() && coalesce(seo.noIndex, false) == false]
      | order(startsAt asc)[0] ${EVENT_PROJECTION}`,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getNightEventBySlug(
  slug: string,
): Promise<NightEventRecord | null> {
  const client = getOptionalClient();
  if (!client) return null;

  return client.fetch<NightEventRecord | null>(
    `*[_type == "event" && slug.current == $slug][0] ${EVENT_PROJECTION}`,
    { slug },
    { next: { revalidate: 300 } },
  );
}

export async function getFeaturedNightArtists(): Promise<NightArtistRecord[]> {
  const client = getOptionalClient();
  if (!client) return [];

  return client.fetch<NightArtistRecord[]>(
    `*[_type == "artist" && featured == true && coalesce(seo.noIndex, false) == false]
      | order(name asc)[0...12] ${ARTIST_PROJECTION}`,
    {},
    { next: { revalidate: 600 } },
  );
}

export async function getNightArtistBySlug(
  slug: string,
): Promise<NightArtistRecord | null> {
  const client = getOptionalClient();
  if (!client) return null;

  return client.fetch<NightArtistRecord | null>(
    `*[_type == "artist" && slug.current == $slug][0] ${ARTIST_PROJECTION}`,
    { slug },
    { next: { revalidate: 600 } },
  );
}

export async function getNightEventsForArtist(
  slug: string,
): Promise<NightEventRecord[]> {
  const client = getOptionalClient();
  if (!client) return [];

  return client.fetch<NightEventRecord[]>(
    `*[
      _type == "event" &&
      references(*[_type == "artist" && slug.current == $slug]._id) &&
      coalesce(seo.noIndex, false) == false
    ] | order(startsAt desc)[0...12] ${EVENT_PROJECTION}`,
    { slug },
    { next: { revalidate: 600 } },
  );
}

export async function getAllNightEvents(): Promise<NightEventRecord[]> {
  const client = getOptionalClient();
  if (!client) return [];

  return client.fetch<NightEventRecord[]>(
    `*[_type == "event"] | order(startsAt desc) ${EVENT_PROJECTION}`,
    {},
    { next: { revalidate: 600 } },
  );
}

export async function getAllNightArtists(): Promise<NightArtistRecord[]> {
  const client = getOptionalClient();
  if (!client) return [];

  return client.fetch<NightArtistRecord[]>(
    `*[_type == "artist"] | order(name asc) ${ARTIST_PROJECTION}`,
    {},
    { next: { revalidate: 600 } },
  );
}
