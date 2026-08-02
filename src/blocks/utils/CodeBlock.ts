import type { Block } from 'payload'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const CodeBlock: Block = {
  slug: 'code',
  labels: {
    singular: 'Code',
    plural: 'Code',
  },
  fields: [
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
    },
    {
      name: 'code',
      type: 'code',
      required: true,
    },
  ],
  jsx: {
    export: ({ fields }) => {
      const lang = fields?.language || ''
      const code = fields?.code || ''
      return `\`\`\`${lang}\n${code}\n\`\`\``
    },
    import: ({ props, children, openMatch }) => {
      const language =
        props?.language ||
        (openMatch ? openMatch[1] : null) ||
        'typescript'

      const code =
        typeof props?.code === 'string'
          ? props.code
          : children || ''

      return {
        fields: {
          language,
          code,
        },
      }
    },
  },
}


type CodeBlockFields = {
  code: string
  language?: string
}

export type CodeBlockNode = SerializedBlockNode<CodeBlockFields>
