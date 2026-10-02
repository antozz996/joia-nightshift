import { defineField, defineType } from "sanity";

export const privateEventType = defineType({
  name: "privateEventType",
  title: "Tipologie eventi privati",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "hero", title: "Hero", type: "mediaImage" }),
    defineField({ name: "intro", title: "Introduzione", type: "text", rows: 4 }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
