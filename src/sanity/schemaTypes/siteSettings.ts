import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({ name: "venueName", title: "Nome venue", type: "string", initialValue: "JOIA" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Indirizzo", type: "string" }),
  ],
});
