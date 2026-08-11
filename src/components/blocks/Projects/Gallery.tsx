import { PayloadImage } from '@/components/PayloadImage';
import { cn } from '@/lib/utils';
import type { GalleryBlock } from '@/payload-types';

type GalleryProps = GalleryBlock;

export const Gallery = ({ eyebrow, heading, layout, content }: GalleryProps) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      {(eyebrow || heading) && (
        <div className="text-center max-w-2xl mx-auto mb-12">
          {eyebrow && (
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
              {heading}
            </h2>
          )}
        </div>
      )}

      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-8',
        {
          'md:grid-cols-2': layout === '2-column',
          'lg:grid-cols-3': layout === '3-column',
        })}>
        {content?.map((item, idx) => (
          <div key={idx} className="flex flex-col group">
            <div className="relative w-full h-min rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 mb-4 transition-transform duration-300 group-hover:scale-[1.01]">
              <PayloadImage
                media={item.media}
                className="object-fill"
              />
            </div>
            <p className='text-xs text-muted-foreground uppercase'>Fig {String(idx + 1).padStart(2, '0')}</p>
            <h3 className="font-serif text-xl text-neutral-900 mb-1">{item.captionHeading}</h3>
            <p className="text-sm text-neutral-500 font-light">{item.captionText}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
