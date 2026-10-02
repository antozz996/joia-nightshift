import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Eventi nightlife",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "startsAt", title: "Data e ora", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "poster", title: "Poster / cover", type: "mediaImage" }),
    defineField({ name: "artists", title: "Artisti", type: "array", of: [{ type: "reference", to: [{ type: "artist" }] }] }),
    defineField({ name: "ticketUrl", title: "Link ticket", type: "url" }),
    defineField({ name: "tableUrl", title: "Link tavolo", type: "url" }),
    defineField({ name: "description", title: "Descrizione", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "featured", title: "In evidenza", type: "boolean", initialValue: false }),
  ],
});
