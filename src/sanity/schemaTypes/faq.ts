import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Domanda", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Risposta", type: "array", of: [{ type: "block" }], validation: (r) => r.required() }),
    defineField({
      name: "scope",
      title: "Area",
      type: "string",
      options: { list: ["private", "nightlife", "location"] },
      validation: (r) => r.required(),
    }),
  ],
});
