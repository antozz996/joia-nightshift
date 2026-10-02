import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artisti",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "portrait", title: "Foto", type: "mediaImage" }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
  ],
});
