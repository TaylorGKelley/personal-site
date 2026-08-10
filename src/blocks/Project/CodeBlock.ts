import type { Block } from "payload";

export const CodeBlock: Block = {
  slug: 'code-block',
  interfaceName: 'ProjectCodeBlock',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'code',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'fileLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'language',
          type: 'select',
          options: [
            { label: 'TypeScript', value: 'typescript' },
            { label: 'TSX', value: 'tsx' },
            { label: 'JavaScript', value: 'javascript' },
            { label: 'JSX', value: 'jsx' },
            { label: 'Python', value: 'python' },
            { label: 'Rust', value: 'rust' },
            { label: 'HTML', value: 'html' },
            { label: 'CSS', value: 'css' },
            { label: 'JSON', value: 'json' },
            { label: 'Bash', value: 'bash' },
            { label: 'SQL', value: 'sql' },
          ],
          required: true,
        },
        {
          name: 'code',
          type: 'code',
          required: true,
        }
      ]
    }
  ],
}
