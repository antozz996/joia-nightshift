import type { Metadata } from "next";
import { absoluteUrl } from "./site-url";

export type CmsSeoFields = {
  title?: string;
  description?: string;
  imageUrl?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  focusKeyword?: string;
};

type BuildSeoMetadataInput = {
  defaultTitle: string;
  defaultDescription: string;
  path: string;
  seo?: CmsSeoFields;
  fallbackImageUrl?: string;
  openGraphType?: "website" | "article";
};

export function buildSeoMetadata({
  defaultTitle,
  defaultDescription,
  path,
  seo,
  fallbackImageUrl,
  openGraphType = "website",
}: BuildSeoMetadataInput): Metadata {
  const title = seo?.title?.trim() || defaultTitle;
  const description = seo?.description?.trim() || defaultDescription;
  const canonical = seo?.canonicalUrl?.trim() || absoluteUrl(path);
  const imageUrl = seo?.imageUrl || fallbackImageUrl;

  const openGraph =
    openGraphType === "article"
      ? {
          type: "article" as const,
          title,
          description,
          url: canonical,
          images: imageUrl ? [{ url: imageUrl }] : undefined,
        }
      : {
          type: "website" as const,
          title,
          description,
          url: canonical,
          images: imageUrl ? [{ url: imageUrl }] : undefined,
        };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
        },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
