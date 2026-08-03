import type { ArchitectureDiagramBlock } from '@/payload-types';
import { PayloadImage } from '@/components/PayloadImage';

type ArchitectureDiagramProps = ArchitectureDiagramBlock;

export const ArchitectureDiagram = ({ diagram, callouts }: ArchitectureDiagramProps) => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      <div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-white border border-gray-200 shadow">
            <PayloadImage
              media={diagram}
              className="object-contain p-4"
            />
          </div>

        {callouts && callouts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-300 pt-6">
            {callouts.map(({ id, description }, i) => (
              <div key={id} className="flex gap-3 items-start">
                <span className="text-emerald-700 font-mono text-sm">{String(i + 1).padStart(2, '0')}.</span>
                <p className="text-xs font-mono text-gray-700 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
