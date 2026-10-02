import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "world",
      title: "Mondo",
      type: "string",
      options: { list: [{ title: "Private", value: "private" }, { title: "Nightlife", value: "night" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "images", title: "Immagini", type: "array", of: [{ type: "mediaImage" }] }),
  ],
});
