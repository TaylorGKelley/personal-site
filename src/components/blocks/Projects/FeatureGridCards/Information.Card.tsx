import { cn } from "@/lib/utils";
import type { InformationFeatureCardBlock } from "@/payload-types";

type InformationCardProps = InformationFeatureCardBlock;

export const InformationCard = ({ heading, description, columns }: InformationCardProps) => {
  return (
    <div className={cn("bg-white p-8 md:p-10 rounded-2xl border border-neutral-100 shadow-sm flex flex-col h-full",
      {
        'col-span-1': columns === '1',
        'col-span-2': columns === '2',
        'col-span-3': columns === '3',
      })}>
      <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 font-medium tracking-tight mb-4">
        {heading}
      </h3>
      <p className="text-neutral-500 font-sans font-light text-sm md:text-base leading-relaxed max-w-xl">
        {description}
      </p>
    </div>
  );
};
