import styles from "./PrivateWorld.module.css";

const pillars = [
  {
    index: "01",
    title: "Space",
    copy: "La sala cambia assetto: cena, cocktail, lounge o party vengono costruiti intorno al numero di ospiti e al ritmo dell’evento.",
  },
  {
    index: "02",
    title: "Food",
    copy: "Cena, catering e beverage entrano nella regia dell’esperienza, non restano un servizio separato.",
  },
  {
    index: "03",
    title: "Production",
    copy: "Luce, video, scenografia, performance e suono trasformano la percezione dello stesso spazio.",
  },
  {
    index: "04",
    title: "Service",
    copy: "Brief, coordinamento e gestione operativa tengono insieme ogni passaggio prima, durante e dopo l’evento.",
  },
] as const;

export function PrivatePillars() {
  return (
    <div className={styles.pillarGrid}>
      {pillars.map((pillar) => (
        <article className={styles.pillarCard} key={pillar.index}>
          <span className={styles.pillarIndex}>{pillar.index}</span>
          <h3>{pillar.title}</h3>
          <p>{pillar.copy}</p>
        </article>
      ))}
    </div>
  );
}
