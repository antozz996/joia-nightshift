"use server";

import { createClient } from "next-sanity";

export type NightEventRecord = {
  title: string;
  slug: string;
  startsAt: string;
  subtitle?: string;
  ticketUrl?: string;
  tableUrl?: string;
  guestListEnabled?: boolean;
  artists?: { name: string; slug: string }[];
  seoDescription?: string;
};

export type NightArtistRecord = {
  name: string;
  slug: string;
  bio?: string;
  genres?: string[];
  country?: string;
  instagram?: string;
  seoDescription?: string;
};

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
    '*[_type == "event" && startsAt >= now()] | order(startsAt asc)[0]{title,"slug":slug.current,startsAt,subtitle,ticketUrl,tableUrl,guestListEnabled,"artists":artists[]->{name,"slug":slug.current},seoDescription}',
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
    '*[_type == "event" && slug.current == $slug][0]{title,"slug":slug.current,startsAt,subtitle,ticketUrl,tableUrl,guestListEnabled,"artists":artists[]->{name,"slug":slug.current},seoDescription}',
    { slug },
    { next: { revalidate: 300 } },
  );
}

export async function getFeaturedNightArtists(): Promise<NightArtistRecord[]> {
  const client = getOptionalClient();
  if (!client) return [];

  return client.fetch<NightArtistRecord[]>(
    '*[_type == "artist" && featured == true] | order(name asc)[0...12]{name,"slug":slug.current,genres,country,instagram,seoDescription}',
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
    '*[_type == "artist" && slug.current == $slug][0]{name,"slug":slug.current,"bio":pt::text(bio),genres,country,instagram,seoDescription}',
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
    '*[_type == "event" && references(*[_type == "artist" && slug.current == $slug]._id)] | order(startsAt desc)[0...12]{title,"slug":slug.current,startsAt,subtitle,ticketUrl,tableUrl,guestListEnabled,"artists":artists[]->{name,"slug":slug.current},seoDescription}',
    { slug },
    { next: { revalidate: 600 } },
  );
}
