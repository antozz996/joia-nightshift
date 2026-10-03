import Link from "next/link";
import { archiveArtists } from "@/content/nightlife";
import { getFeaturedNightArtists } from "@/lib/cms/nightlife";
import styles from "./NightWorld.module.css";

export async function NightArtists() {
  const cmsArtists = await getFeaturedNightArtists();
  const artists = cmsArtists.length ? cmsArtists : archiveArtists;

  return (
    <div className={styles.artistRail}>
      {artists.map((artist, index) => (
        <Link
          className={styles.artistLink}
          href={"/artisti/" + artist.slug + "/"}
          key={artist.slug}
          data-night-reveal
        >
          <span className={styles.artistIndex}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.artistName}>{artist.name}</span>
          <span className={styles.artistArrow}>↗</span>
        </Link>
      ))}
    </div>
  );
}
