import React from 'react';
import { ArrowDownIcon } from 'lucide-react';
import type { HeroBlock } from '@/payload-types';

type HeroProps = HeroBlock;

export const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  actionText,
}: HeroBlock) => {
  return (
    <section
      id="hero-section"
      className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]"
    >
      <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight text-neutral-900 mb-6">
        {heading}
      </h1>

      {subheading && (
        <p className="text-neutral-600 text-lg md:text-xl font-sans leading-relaxed max-w-2xl mb-12">
          {subheading}
        </p>
      )}

      {actionText && (
        <div
          className="group inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest font-mono text-neutral-500 rounded-lg p-1"
        >
          <span>{actionText}</span>
          <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition-colors">
            <ArrowDownIcon className="size-4 text-black" />
          </div>
        </div>
      )}
    </section>
  );
};
