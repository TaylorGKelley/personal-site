import { cn } from "@/lib/utils";
import type { Framework, TechStackFeatureCardBlock } from "@/payload-types";
import { LayersIcon } from "lucide-react";

type TechStackCardProps = TechStackFeatureCardBlock;

export const TechStackCard = ({ frameworks, columns }: TechStackCardProps) => {
  return (
    <div className={cn("bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm flex flex-col justify-between h-full",
      {
        'lg:col-span-1': columns === '1',
        'lg:col-span-2': columns === '2',
        'lg:col-span-3': columns === '3',
      })}>
      <div>
        <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-6">
          <LayersIcon className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-serif text-neutral-900 font-medium tracking-tight mb-6">Tech Stack</h3>
      </div>
      {frameworks  && frameworks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4">
          {frameworks.map((framework, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-neutral-100 text-neutral-700 font-mono text-[10px] tracking-wider uppercase rounded-sm font-medium"
            >
              {(framework as Framework).name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
