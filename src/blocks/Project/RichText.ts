import type { Block } from "payload";

export const RichText: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  labels: {
    singular: 'RichText Block',
    plural: 'RichText Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
