import { ValuesBlock } from "@/payload-types";

type ValuesProps = ValuesBlock;

export const Values: React.FC<ValuesProps> = ({
  title,
  heading,
  description
}: ValuesProps) => {
  return (
    <section className="py-16 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                {title}
              </span>
              <h2 className="text-3xl font-serif text-slate-900">
                {heading}
              </h2>
            </div>
            <p className="md:col-span-8 space-y-6 text-slate-600 leading-relaxed whitespace-pre-wrap">
                {description}
            </p>
          </div>
        </section>
  );
}
