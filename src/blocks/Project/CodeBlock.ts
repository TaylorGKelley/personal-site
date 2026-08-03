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
    },
    {
      name: 'caption',
      type: 'text',
    }
  ],
}
