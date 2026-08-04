import type { RichTextBlock } from "@/payload-types";
import { RichText as RichTextRenderer } from '@payloadcms/richtext-lexical/react';
import { customConverters } from '@/components/rich-text';

type RichTextProps = RichTextBlock;

export const RichText = ({ eyebrow, heading, content }: RichTextProps) => {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        {eyebrow && (
          <span className="block text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4">
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
            {heading}
          </h2>
        )}
      </div>

      <div className="prose prose-neutral max-w-none text-neutral-600 font-sans leading-relaxed text-base space-y-6">
        <RichTextRenderer
          data={content}
          converters={customConverters}
        />
      </div>
    </section>
  );
};
