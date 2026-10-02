import { defineField, defineType } from "sanity";

export const privateEventType = defineType({
  name: "privateEventType",
  title: "Tipologie eventi privati",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "hero", title: "Hero", type: "mediaImage" }),
    defineField({ name: "intro", title: "Introduzione", type: "text", rows: 4 }),
    defineField({ name: "statement", title: "Statement", type: "text", rows: 5 }),
    defineField({
      name: "moments",
      title: "Sequenza evento",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "mediaImage" }],
    }),
    defineField({
      name: "beforeImage",
      title: "Sala prima",
      type: "mediaImage",
    }),
    defineField({
      name: "afterImage",
      title: "Sala trasformata",
      type: "mediaImage",
    }),
    defineField({
      name: "layoutCapacities",
      title: "Capienze layout",
      type: "object",
      fields: [
        defineField({
          name: "dinner",
          title: "Cena",
          type: "number",
          validation: (rule) => rule.positive().integer(),
        }),
        defineField({
          name: "cocktail",
          title: "Cocktail",
          type: "number",
          validation: (rule) => rule.positive().integer(),
        }),
        defineField({
          name: "party",
          title: "Party",
          type: "number",
          validation: (rule) => rule.positive().integer(),
        }),
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
