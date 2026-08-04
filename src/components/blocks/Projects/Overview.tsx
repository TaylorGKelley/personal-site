import type { OverviewBlock } from "@/payload-types";

type OverviewProps = OverviewBlock;

export const Overview = ({ summaryTitle, summaryText, metadata }: OverviewProps) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            The Context
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 leading-snug">
            {summaryTitle}
          </h2>
        </div>

        <div className="lg:col-span-6 space-y-8">
          {metadata && metadata.length > 0 && (
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
              {metadata.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {item.heading}
                  </span>
                  <span className="text-sm font-medium text-neutral-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="text-neutral-600 font-light text-lg leading-relaxed">
            {summaryText}
          </div>
        </div>
      </div>
    </section>
  );
};
