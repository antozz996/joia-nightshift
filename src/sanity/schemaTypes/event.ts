import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Eventi nightlife",
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
    defineField({
      name: "startsAt",
      title: "Data e ora",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sottotitolo / claim",
      type: "string",
    }),
    defineField({ name: "poster", title: "Poster / cover", type: "mediaImage" }),
    defineField({
      name: "artists",
      title: "Artisti",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({ name: "ticketUrl", title: "Link ticket", type: "url" }),
    defineField({ name: "tableUrl", title: "Link tavolo", type: "url" }),
    defineField({
      name: "guestListEnabled",
      title: "Guest list attiva",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
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
