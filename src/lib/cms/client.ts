import { createClient } from "next-sanity";
import { getSanityPublicEnv } from "./env";

let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSanityClient() {
  if (cachedClient) return cachedClient;
  const env = getSanityPublicEnv();

  cachedClient = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2026-10-01",
    useCdn: true,
    perspective: "published",
  });

  return cachedClient;
}
