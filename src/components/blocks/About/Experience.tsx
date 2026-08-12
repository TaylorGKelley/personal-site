import type { ExperienceBlock } from "@/payload-types";
import { formatDate } from "@/utils/date";

type ExperienceProps = ExperienceBlock;

export function Experience({ title, heading, jobs }: ExperienceProps) {
    return (
      <section className="py-16 border-t border-slate-100">
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
              {title}
            </span>
            <h2 className="text-3xl font-serif text-slate-900">
              {heading}
            </h2>
          </div>
          <div className="relative border-l border-slate-200 ml-2 space-y-12">
            {jobs && jobs.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((job, index) => (
              <div key={index} className="relative pl-8">
                <span className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-slate-900 border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="text-xl font-serif text-slate-900">{job.title}</h3>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {`${formatDate(job.startDate)}${job.current ?
                      ' - Present' : (formatDate(job.endDate) ? ` - ${formatDate(job.endDate)}` : '')}`}
                  </span>
                </div>
                <div className="text-sm font-medium text-indigo-600 mb-3">
                  {job.company}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
