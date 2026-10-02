import { defineField, defineType } from "sanity";

export const mediaImage = defineType({
  name: "mediaImage",
  title: "Immagine",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Testo alternativo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Didascalia",
      type: "string",
    }),
  ],
});
