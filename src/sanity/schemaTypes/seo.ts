import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titolo SEO",
      type: "string",
      description:
        "Opzionale. Se vuoto, il sito genera automaticamente il titolo dal contenuto.",
      validation: (rule) =>
        rule.max(60).warning("Meglio restare entro circa 60 caratteri."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "Opzionale. Se vuota, il sito genera una descrizione automatica.",
      validation: (rule) =>
        rule.max(160).warning("Meglio restare entro circa 160 caratteri."),
    }),
    defineField({
      name: "image",
      title: "Immagine social / Open Graph",
      type: "mediaImage",
      description:
        "Opzionale. Se manca, viene usata la cover/poster del contenuto o la grafica automatica JOIA.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL personalizzata",
      type: "url",
      description:
        "Lascia vuoto normalmente. Usala solo se questo contenuto deve dichiarare un'altra URL come versione principale.",
    }),
    defineField({
      name: "noIndex",
      title: "Non indicizzare sui motori di ricerca",
      type: "boolean",
      initialValue: false,
      description:
        "Attivalo per bozze editoriali, pagine duplicate o contenuti che non devono apparire su Google.",
    }),
    defineField({
      name: "focusKeyword",
      title: "Tema / keyword principale",
      type: "string",
      description:
        "Solo guida editoriale interna: non viene inserita in un meta tag keywords.",
      validation: (rule) => rule.max(80),
    }),
  ],
});
