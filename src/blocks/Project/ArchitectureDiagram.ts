import type { Block } from "payload";

export const ArchitectureDiagram: Block = {
  slug: 'architecture-diagram',
  interfaceName: 'ArchitectureDiagramBlock',
  labels: {
    singular: 'Architecture Diagram Block',
    plural: 'Architecture Diagram Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Implementation',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'diagram',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    }
  ],
}
