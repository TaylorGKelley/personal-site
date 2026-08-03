'use client';

import { useCallback, useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { codeToHtml } from "shiki";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type CodeBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  code: string;
  language?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  className,
  ...props
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
    const [hasCopied, setHasCopied] = useState(false);

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

    // Handle Copy to Clipboard
    const copyToClipboard = useCallback(() => {
      navigator.clipboard.writeText(code);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }, [code]);

    return (
      <div
        className={cn(
          "relative group rounded-lg border bg-primary text-primary-foreground overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Top Header / Copy Button */}
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-black bg-primary/50">
          <span className="text-xs font-mono">{language}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
            onClick={copyToClipboard}
          >
            {hasCopied ? (
              <CheckIcon className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <ScrollArea className="w-full">
          <div
            className="p-4 text-sm font-mono [&>pre]:!bg-transparent [&>pre]:!p-0 [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
}
