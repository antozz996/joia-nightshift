import { defineField, defineType } from "sanity";

export const privateEventType = defineType({
  name: "privateEventType",
  title: "Tipologie eventi privati",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "content" }),
    defineField({ name: "hero", title: "Hero", type: "mediaImage", group: "content" }),
    defineField({
      name: "intro",
      title: "Introduzione",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.max(420).warning("Mantieni l'introduzione sintetica."),
    }),
    defineField({
      name: "statement",
      title: "Statement",
      type: "text",
      rows: 5,
      group: "content",
    }),
    defineField({
      name: "moments",
      title: "Sequenza evento",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "content",
      of: [{ type: "mediaImage" }],
    }),
    defineField({
      name: "beforeImage",
      title: "Sala prima",
      type: "mediaImage",
      group: "content",
    }),
    defineField({
      name: "afterImage",
      title: "Sala trasformata",
      type: "mediaImage",
      group: "content",
    }),
    defineField({
      name: "layoutCapacities",
      title: "Capienze layout",
      type: "object",
      group: "content",
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
    defineField({
      name: "seo",
      title: "SEO e condivisione",
      type: "seo",
      group: "seo",
    }),
    defineField({ name: "seoTitle", title: "SEO title legacy", type: "string", hidden: true }),
    defineField({
      name: "seoDescription",
      title: "SEO description legacy",
      type: "text",
      rows: 3,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
      media: "hero",
    },
  },
});
