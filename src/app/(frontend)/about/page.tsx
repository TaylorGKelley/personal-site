import { getAboutPage } from "@/actions/pages.globals"
import { RenderBlocks } from "@/components/blocks/About";
import { PayloadImage } from "@/components/PayloadImage";
import { ErrorState } from "@/components/ErrorState";
import { draftMode } from 'next/headers';

export default async function AboutPage() {
  const { isEnabled } = await draftMode();
  const { data, error } = await getAboutPage({ draft: isEnabled });

  if (!data) {
    return (
      <main className="max-w-6xl mx-auto px-6 font-sans text-slate-900">
        <ErrorState message={error} />
      </main>
    )
  }

  return (<main className="max-w-6xl mx-auto px-6 font-sans text-slate-900">
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
            {data?.heading}
          </h1>
          {data?.subheading &&
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                {data.subheading}
              </p>
          }
        </div>
        {data?.portrait &&
            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-lg bg-slate-100 aspect-[4/5] shadow-sm">
                <PayloadImage
                  media={data.portrait}
                  className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"/>
              </div>
            </div>
        }
      </div>
    </section>
    {data && <RenderBlocks blocks={data.content} />}
  </main>)
}
