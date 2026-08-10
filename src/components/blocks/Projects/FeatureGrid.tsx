import type { FeatureGridBlock } from "@/payload-types";
import { RenderBlocks } from "./FeatureGridCards";

type FeatureGridProps = FeatureGridBlock;

export const FeatureGrid = ({ eyebrow, summaryTitle, cards }: FeatureGridProps) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">
          {summaryTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards && <RenderBlocks blocks={cards} />}
      </div>
    </section>
  );
};
