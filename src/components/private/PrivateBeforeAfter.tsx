import Image from "next/image";
import styles from "./PrivateWorld.module.css";

const scenes = [
  {
    index: "01",
    title: "Tavola",
    copy: "La sala rallenta: mise en place, luce calda e un ritmo costruito per stare insieme.",
    src: "/media/private/table.jpg",
    alt: "Tavola allestita per un evento privato JOIA",
  },
  {
    index: "02",
    title: "Cocktail",
    copy: "Lo spazio si apre: bar, movimento e conversazione diventano parte della scena.",
    src: "/media/private/bar.jpg",
    alt: "Bar e bottigliera della location JOIA",
  },
  {
    index: "03",
    title: "Party",
    copy: "Poi cambia intensità: luce, performance e dancefloor prendono il controllo.",
    src: "/media/private/party.jpg",
    alt: "Dancefloor durante un evento JOIA",
  },
] as const;

export function PrivateBeforeAfter() {
  return (
    <div className={styles.transformationStory} aria-label="Tre atmosfere della sala JOIA">
      {scenes.map((scene, index) => (
        <article
          className={
            styles.transformationScene +
            (index === 0 ? " " + styles.transformationSceneLead : "")
          }
          key={scene.title}
        >
          <Image
            className={styles.transformationImage}
            src={scene.src}
            alt={scene.alt}
            fill
            sizes={
              index === 0
                ? "(max-width: 700px) 100vw, 58vw"
                : "(max-width: 700px) 100vw, 28vw"
            }
          />
          <span className={styles.transformationShade} aria-hidden="true" />
          <div className={styles.transformationCopy}>
            <span className={styles.transformationIndex}>{scene.index}</span>
            <div>
              <h3>{scene.title}</h3>
              <p>{scene.copy}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
