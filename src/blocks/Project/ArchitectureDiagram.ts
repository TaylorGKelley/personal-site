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
      name: 'diagram',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'callouts',
      type: 'array',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
