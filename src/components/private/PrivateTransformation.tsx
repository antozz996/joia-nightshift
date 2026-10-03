import Image from "next/image";
import styles from "./PrivateWorld.module.css";

const moments = [
  {
    index: "01",
    label: "Accogliere",
    title: "La tavola definisce il tono.",
    copy: "Luce calda, dettagli, servizio e composizione: l’esperienza parte da come lo spazio riceve gli ospiti.",
    src: "/media/private/table.jpg",
    alt: "Tavola allestita per un evento JOIA",
  },
  {
    index: "02",
    label: "Accendere",
    title: "La regia cambia il ritmo.",
    copy: "Performance, luce e produzione scenica trasformano la percezione della stessa sala senza ricorrere a effetti finti.",
    src: "/media/private/entertainment.jpg",
    alt: "Performance scenografica durante un evento JOIA",
  },
  {
    index: "03",
    label: "Liberare",
    title: "Poi arriva il party.",
    copy: "Quando il layout si apre, la sala lascia spazio a dancefloor, musica e un’energia completamente diversa.",
    src: "/media/private/party.jpg",
    alt: "Dancefloor durante un evento JOIA",
  },
] as const;

export function PrivateTransformation() {
  return (
    <div className={styles.transformationGrid}>
      {moments.map((moment) => (
        <article className={styles.transformationCard} key={moment.index}>
          <div className={styles.transformationMedia}>
            <Image
              src={moment.src}
              alt={moment.alt}
              fill
              sizes="(max-width: 800px) 100vw, 33vw"
              className={styles.transformationImage}
            />
            <span className={styles.transformationShade} aria-hidden="true" />
          </div>

          <div className={styles.transformationMeta}>
            <span>{moment.index}</span>
            <span>{moment.label}</span>
          </div>

          <div className={styles.transformationCopy}>
            <h3>{moment.title}</h3>
            <p>{moment.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
