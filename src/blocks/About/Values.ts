import { type Block } from "payload";

export const Values: Block = {
  slug: 'values',
  interfaceName: 'ValuesBlock',
  labels: {
    singular: 'Values Block',
    plural: 'Values Blocks',
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
      type: 'textarea',
      required: true,
    },
  ],
}
