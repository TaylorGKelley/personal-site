import type { Block } from "payload";

export const TwoColumnBlock: Block = {
  slug: 'two-column',
  labels: {
    singular: 'Two Column Section',
    plural: 'Two Column Sections'
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    }
  ],
}
