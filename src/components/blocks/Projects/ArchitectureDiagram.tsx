import type { ArchitectureDiagramBlock, Media } from '@/payload-types';
import { PayloadImage } from '@/components/PayloadImage';

type ArchitectureDiagramProps = ArchitectureDiagramBlock

export const ArchitectureDiagram = ({
  title,
  diagram,
  caption,
}: ArchitectureDiagramProps) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      {title && (
        <>
          <div className="mb-8 space-y-3">
            <span className="block text-xs font-mono tracking-widest text-neutral-500 uppercase">
              {title.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
              {title.heading}
            </h2>
          </div>
        </>
      )}

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/80 shadow-sm p-4 md:p-6">
        <div className="flex justify-center items-center w-full overflow-clip rounded-xl">
            <PayloadImage media={diagram} />
        </div>
        {caption && (
          <p className="mt-8 text-center text-xs md:text-sm font-sans text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
};
