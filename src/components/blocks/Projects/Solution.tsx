import { PayloadIcon } from '@/components/PayloadIcon';
import { PayloadImage } from '@/components/PayloadImage';
import type { SolutionBlock } from '@/payload-types';

type SolutionProps = SolutionBlock;

export const Solution = ({ eyebrow, heading, features, media }: SolutionProps) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div>
            {eyebrow && (
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 leading-tight">
              {heading}
            </h2>
          </div>

          <div className="space-y-6">
            {features?.map((feature) => (
              <div key={feature.id} className="flex gap-4 items-start">
                <div className="p-3 mt-1 rounded-full bg-indigo-100 text-indigo-600 shadow-sm">
                  <PayloadIcon name={feature.icon.name} className='w-5 h-5' />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-neutral-600 text-sm font-light leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-lg group">
            <PayloadImage
              media={media}
              className="object-cover group-hover:scale-[1.01] transition-transform duration-150"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
