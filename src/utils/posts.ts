import { Post } from "@/payload-types";
import { BlocksFeature, convertLexicalToMarkdown, editorConfigFactory } from "@payloadcms/richtext-lexical";
import config from "@/payload.config";
import { CodeBlock } from "@/blocks/utils/CodeBlock";

export async function lexicalToMarkdownAsync(content: Post['content']): Promise<string> {
  if (!content) return '';

  return convertLexicalToMarkdown({
    data: content,
    editorConfig: await editorConfigFactory.fromFeatures({
      config: await config,
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        BlocksFeature({
          blocks: [CodeBlock],
        }),
      ],
    })
  })
}

export async function calculateReadTimeAsync(content: Post['content']): Promise<number> {
  const wordsPerMinute = 200;

  const markdown = await lexicalToMarkdownAsync(content)
  const cleanedContent = markdown
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Keep words, numbers, spaces, and hyphens
      .trim()
  const wordCount = cleanedContent.split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
}

export type ParsedHeading = {
  id: string;
  text: string;
  level: number;
}

export function extractHeadingsFromMarkdown(markdown: string): ParsedHeading[] {
  const headingLines = markdown.split('\n').filter((line) => line.match(/^#{1,6}\s/));

  return headingLines.map((line) => {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) return { id: '', text: '', level: 2 };

    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    return { id, text, level };
  });
}
