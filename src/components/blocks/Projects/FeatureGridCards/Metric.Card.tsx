import { cn } from "@/lib/utils";
import type { MetricFeatureCardBlock } from "@/payload-types";

type MetricCardProps = MetricFeatureCardBlock;

export const MetricCard = ({ amount, label, columns }: MetricCardProps) => {
  return (
    <div className={cn("bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-center h-full",
      {
        'lg:col-span-1': columns === '1',
        'lg:col-span-2': columns === '2',
        'lg:col-span-3': columns === '3',
      })}>
      <span className="text-3xl font-serif text-neutral-900 mb-2">
        {amount}
      </span>
      <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider max-w-[200px] leading-relaxed">
        {label}
      </span>
    </div>
  );
};
