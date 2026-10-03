import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artisti",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "portrait", title: "Foto", type: "mediaImage", group: "content" }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "genres",
      title: "Generi / tag",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({ name: "country", title: "Paese", type: "string", group: "content" }),
    defineField({ name: "instagram", title: "Instagram", type: "url", group: "content" }),
    defineField({
      name: "featured",
      title: "In evidenza nightlife",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO e condivisione",
      type: "seo",
      group: "seo",
    }),
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
      title: "name",
      subtitle: "country",
      media: "portrait",
    },
  },
});
