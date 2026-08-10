import type { Block } from "payload";

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: '2 Column', value: '2-column' },
        { label: '3 Column', value: '3-column' },
        // { label: 'Carousel', value: 'carousel' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'captionHeading',
          type: 'text',
          required: true,
        },
        {
          name: 'captionText',
          type: 'text',
          required: true,
        },
      ],
    }
  ],
}
