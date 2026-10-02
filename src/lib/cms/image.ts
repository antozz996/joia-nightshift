import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { getSanityClient } from "./client";

export function urlForImage(source: SanityImageSource) {
  return createImageUrlBuilder(getSanityClient()).image(source);
}
