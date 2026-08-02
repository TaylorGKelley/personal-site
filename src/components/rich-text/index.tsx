import { JSX } from 'react';
import type { JSXConvertersFunction, JSXConverter } from '@payloadcms/richtext-lexical/react';
import type { Media } from '@/payload-types';
import type { CodeBlockNode } from '@/blocks/utils/CodeBlock';
import { PayloadImage } from '../PayloadImage';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { CodeBlock } from './code';

export const customConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  // Headings with IDs for TOC scrolling
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag as keyof JSX.IntrinsicElements;
    const children = nodesToJSX({ nodes: node.children });
    const textContent = node.children.map((c: any) => c.text || '').join('');
    const id = textContent
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const styles: Record<string, string> = {
      h1: 'text-3xl sm:text-4xl font-serif font-extralight tracking-tight text-neutral-900 mt-12 mb-4',
      h2: 'text-2xl sm:text-3xl font-serif font-light tracking-tight text-neutral-900 mt-10 mb-4',
      h3: 'text-xl sm:text-2xl font-serif font-light text-neutral-900 mt-8 mb-3',
      h4: 'text-lg font-serif font-normal text-neutral-900 mt-6 mb-2',
    };

    return (
      <Tag id={id} className={styles[node.tag] || styles.h2}>
        {children}
      </Tag>
    );
  },

  // Paragraphs
  paragraph: ({ node, nodesToJSX }) => {
    return (
      <p className="text-neutral-600 font-sans leading-relaxed mb-6 text-sm sm:text-base">
        {nodesToJSX({ nodes: node.children })}
      </p>
    );
  },

  // Blockquotes
  quote: ({ node, nodesToJSX }) => {
    return (
      <blockquote className="my-8 border-l-2 border-indigo-600 bg-neutral-100/70 py-4 px-6 rounded-r-lg text-neutral-700 font-serif italic text-sm sm:text-base leading-relaxed">
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    );
  },

  // Code Blocks
  blocks: {
    ...defaultConverters?.blocks,

    code: ((({ node }) => {
      const { code, language } = node.fields || {};

      return <CodeBlock code={code} language={language} />;
    }) as JSXConverter<CodeBlockNode>),
  },

  // Upload/Images
  upload: ({ node }) => {
    const media = node.value;
    if (!media || typeof media !== 'object') return null;

    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100">
        <div className="relative aspect-[16/9] w-full">
         <PayloadImage
            media={media as Media}
          />
        </div>
      </figure>
    );
  },

  // Lists
  list: ({ node, nodesToJSX }) => {
    const Tag = node.listType === 'number' ? 'ol' : 'ul';
    const listStyle = node.listType === 'number' ? 'list-decimal' : 'list-disc';

    return (
      <Tag className={`my-6 ml-6 space-y-2 ${listStyle} text-neutral-600 font-sans text-sm sm:text-base`}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
});
