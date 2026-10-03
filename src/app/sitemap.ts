import type { MetadataRoute } from "next";
import { archiveArtists, nightlifeFormats } from "@/content/nightlife";
import { privateEventTypes } from "@/content/private-events";
import { getAllNightArtists, getAllNightEvents } from "@/lib/cms/nightlife";
import { absoluteUrl } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, artists] = await Promise.all([
    getAllNightEvents(),
    getAllNightArtists(),
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
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/"),
          "en-GB": absoluteUrl("/en/"),
        },
      },
    },
    {
      url: absoluteUrl("/en/private-events/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/private-events/"),
          "en-GB": absoluteUrl("/en/private-events/"),
        },
      },
    },
    {
      url: absoluteUrl("/en/nightlife/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/nightlife/"),
          "en-GB": absoluteUrl("/en/nightlife/"),
        },
      },
    },
    {
      url: absoluteUrl("/en/location/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "it-IT": absoluteUrl("/location/"),
          "en-GB": absoluteUrl("/en/location/"),
        },
      },
    },
  ];

  const privatePages: MetadataRoute.Sitemap = privateEventTypes.map((item) => ({
    url: absoluteUrl("/private-events/" + item.slug + "/"),
    lastModified: now,
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
    ? artists
    : archiveArtists.map((artist) => ({ ...artist }));

  const artistPages: MetadataRoute.Sitemap = fallbackArtists.map((artist) => ({
    url: absoluteUrl("/artisti/" + artist.slug + "/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteUrl("/eventi/" + event.slug + "/"),
    lastModified: new Date(event.startsAt),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [
    ...core,
    ...privatePages,
    ...archiveFormats,
    ...artistPages,
    ...eventPages,
  ];
}
