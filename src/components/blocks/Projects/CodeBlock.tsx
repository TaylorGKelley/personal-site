'use client';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ProjectCodeBlock } from "@/payload-types";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type CodeBlockProps = ProjectCodeBlock;

export const CodeBlock = ({ fileLabel, language, code, caption }: CodeBlockProps) => {
  const [html, setHtml] = useState<string>("");

    // Generate highlighted HTML via Shiki
    useEffect(() => {
      async function highlight() {
        const out = await codeToHtml(code, {
          lang: language,
          theme: 'catppuccin-mocha',
        });
        setHtml(out);
      }
      highlight();
    }, [code, language]);

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl text-neutral-100 font-mono text-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/80 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-neutral-700" />
            <span className="w-3 h-3 rounded-full bg-neutral-700" />
            <span className="w-3 h-3 rounded-full bg-neutral-700" />
            <span className="ml-2 text-xs text-neutral-400">{fileLabel}</span>
          </div>
          <span className="text-xs uppercase text-neutral-500">{language}</span>
        </div>
        <div className="p-6 overflow-x-auto leading-relaxed">
          <ScrollArea className="w-full">
            <div
              className="p-4 text-sm font-mono [&>pre]:!bg-transparent [&>pre]:!p-0 [&_code]:font-mono"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {caption && (
        <p className="mt-3 text-xs font-mono text-neutral-500 text-center">
          {caption}
        </p>
      )}
    </section>
  );
};
