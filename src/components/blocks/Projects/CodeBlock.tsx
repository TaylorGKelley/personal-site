'use server';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ProjectCodeBlock } from "@/payload-types";
import { codeToHtml } from "shiki";

type CodeBlockProps = ProjectCodeBlock

export const CodeBlock = async ({
  title,
  description,
  code: {
    fileLabel,
    language,
    code,
  },
}: CodeBlockProps) => {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'catppuccin-mocha',
  })

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div className="lg:col-span-5 space-y-3 pt-2">
          {title && (
            <>
              <span className="block text-xs font-mono tracking-widest text-neutral-500 uppercase">
                {title.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 tracking-tight leading-tight">
                {title.heading}
              </h2>
            </>
          )}
          {description && (
            <p className="mt-6 text-sm font-sans text-neutral-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden bg-[#24272e] border border-neutral-800/60 shadow-xl text-neutral-100 font-mono text-xs md:text-sm">
            {(fileLabel || language) && (
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/40 border-b border-neutral-800/50">
                <span className="text-xs text-neutral-400">{fileLabel}</span>
                <span className="text-xs uppercase text-neutral-500">{language}</span>
              </div>
            )}
            <div className="p-6">
              <ScrollArea className="w-full">
                <div
                   className="font-mono [&>pre]:!bg-transparent [&>pre]:!p-0 [&_code]:font-mono leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
