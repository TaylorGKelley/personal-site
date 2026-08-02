import type { SkillsBlock } from "@/payload-types";
import { PayloadIcon } from "@/components/PayloadIcon";

type SkillProps = SkillsBlock;

export function Skills({ title, heading, skills }: SkillProps) {
    return (
      <section className="py-16 border-t border-slate-100">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
              {title}
            </span>
            <h2 className="text-3xl font-serif text-slate-900">
              {heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills && skills.map((category) => {
              return (
                <div
                  key={category.id}
                  className="p-6 rounded-xl bg-white border border-slate-100 space-y-4"
                >
                  <div className="flex items-center gap-2.5 text-slate-900 font-medium">
                    <PayloadIcon name={category.icon.name} className="w-5 h-5 test-indigo-600" />
                    <span>{category.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((technology) => (
                      <span
                        key={technology.id}
                        className="px-3 py-1 bg-white rounded-md text-xs font-medium text-slate-600 border border-slate-200/60 shadow-2xs"
                      >
                        {technology.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
}
