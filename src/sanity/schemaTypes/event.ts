import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Eventi nightlife",
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
    defineField({
      name: "startsAt",
      title: "Data e ora",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sottotitolo / claim",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "poster",
      title: "Poster / cover",
      type: "mediaImage",
      group: "content",
    }),
    defineField({
      name: "artists",
      title: "Artisti",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({ name: "ticketUrl", title: "Link ticket", type: "url", group: "content" }),
    defineField({ name: "tableUrl", title: "Link tavolo", type: "url", group: "content" }),
    defineField({
      name: "guestListEnabled",
      title: "Guest list attiva",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
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
      title: "title",
      startsAt: "startsAt",
      media: "poster",
    },
    prepare({ title, startsAt, media }) {
      return {
        title,
        subtitle: startsAt ? new Date(startsAt).toLocaleString("it-IT") : "Data da definire",
        media,
      };
    },
  },
});
