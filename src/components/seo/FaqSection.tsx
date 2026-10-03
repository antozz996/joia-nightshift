import type { FaqItem } from "@/content/faqs";
import { StructuredData } from "./StructuredData";
import styles from "./FaqSection.module.css";

export function FaqSection({
  items,
  world,
}: {
  items: readonly FaqItem[];
  world: "private" | "night";
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={styles.section + " " + styles[world]} aria-labelledby={"faq-" + world}>
      <StructuredData data={schema} id={"faq-schema-" + world} />
      <h2 className={styles.title} id={"faq-" + world}>
        Domande frequenti
      </h2>
      <div className={styles.list}>
        {items.map((item) => (
          <details className={styles.item} key={item.question}>
            <summary className={styles.question}>{item.question}</summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
