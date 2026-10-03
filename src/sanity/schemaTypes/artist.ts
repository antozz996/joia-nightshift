import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artisti",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "portrait", title: "Foto", type: "mediaImage" }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "genres",
      title: "Generi / tag",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "country", title: "Paese", type: "string" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({
      name: "featured",
      title: "In evidenza nightlife",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
  ],
});
