import type { MetadataRoute } from "next";
import { archiveArtists, nightlifeFormats } from "@/content/nightlife";
import { privateEventTypes } from "@/content/private-events";
import { getAllNightArtists, getAllNightEvents } from "@/lib/cms/nightlife";
import { getAllPrivateEventTypes } from "@/lib/cms/private-events";
import { absoluteUrl } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, artists, cmsPrivateTypes] = await Promise.all([
    getAllNightEvents(),
    getAllNightArtists(),
    getAllPrivateEventTypes(),
  ]);

  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/"),
          "en-GB": absoluteUrl("/en/"),
        },
      },
    },
    {
      url: absoluteUrl("/private-events/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/private-events/"),
          "en-GB": absoluteUrl("/en/private-events/"),
        },
      },
    },
    {
      url: absoluteUrl("/nightlife/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/nightlife/"),
          "en-GB": absoluteUrl("/en/nightlife/"),
        },
      },
    },
    {
      url: absoluteUrl("/location/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/location/"),
          "en-GB": absoluteUrl("/en/location/"),
        },
      },
    },
    {
      url: absoluteUrl("/en/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/en/private-events/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/en/nightlife/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/en/location/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const staticPrivatePages: MetadataRoute.Sitemap = privateEventTypes.map((item) => ({
    url: absoluteUrl("/private-events/" + item.slug + "/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticPrivateSlugs = new Set<string>(privateEventTypes.map((item) => item.slug));
  const cmsPrivatePages: MetadataRoute.Sitemap = cmsPrivateTypes
    .filter((item) => !item.seo?.noIndex && !staticPrivateSlugs.has(item.slug))
    .map((item) => ({
      url: absoluteUrl("/private-events/" + item.slug + "/"),
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const archiveFormats: MetadataRoute.Sitemap = nightlifeFormats.map((item) => ({
    url: absoluteUrl("/eventi/" + item.slug + "/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const fallbackArtists = artists.length
    ? artists.filter((artist) => !artist.seo?.noIndex)
    : archiveArtists.map((artist) => ({ ...artist }));

  const artistPages: MetadataRoute.Sitemap = fallbackArtists.map((artist) => ({
    url: absoluteUrl("/artisti/" + artist.slug + "/"),
    lastModified:
      "updatedAt" in artist && artist.updatedAt ? new Date(artist.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventPages: MetadataRoute.Sitemap = events
    .filter((event) => !event.seo?.noIndex)
    .map((event) => ({
      url: absoluteUrl("/eventi/" + event.slug + "/"),
      lastModified: event.updatedAt ? new Date(event.updatedAt) : now,
      changeFrequency: new Date(event.startsAt) >= now ? "daily" : "monthly",
      priority: new Date(event.startsAt) >= now ? 0.85 : 0.6,
    }));

  return [
    ...core,
    ...staticPrivatePages,
    ...cmsPrivatePages,
    ...archiveFormats,
    ...artistPages,
    ...eventPages,
  ];
}
