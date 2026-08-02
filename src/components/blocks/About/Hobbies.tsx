import { PayloadIcon } from "@/components/PayloadIcon";
import { PayloadImage } from "@/components/PayloadImage";
import type { HobbiesBlock } from "@/payload-types";

type HobbiesProps = HobbiesBlock;

export function Hobbies({ title, heading, description, tags, firstImage, secondImage }: HobbiesProps) {
  return (
      <section className="py-16 border-t border-slate-100">
        <div className="p-8 md:p-12 rounded-2xl bg-white border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                {title}
              </span>
              <h2 className="text-3xl font-serif text-slate-900">
                {heading}
              </h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-700 pt-2">
            {tags?.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <PayloadIcon name={tag.icon.name} className="w-4 h-4 text-indigo-600" />
                  <span>{tag.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-200">
              <PayloadImage
                media={firstImage}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-200">
              <PayloadImage
                media={secondImage}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    );
}
