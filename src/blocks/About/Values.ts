import { type Block } from "payload";

export const Values: Block = {
  slug: 'philosophy',
  interfaceName: 'ValuesBlock',
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
