import { type Block } from "payload";

export const Values: Block = {
  slug: 'philosophy',
  labels: {
    singular: 'Philosophy Block',
    plural: 'Philosophy Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
  ],
}
