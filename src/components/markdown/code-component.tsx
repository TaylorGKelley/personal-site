"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ExtraProps } from "react-markdown";
import { cn } from "@/src/utils/tw";

export type CodeProps = Readonly<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLElement> & ExtraProps & { inline: boolean }
  >
>;

export function code({
  inline,
  className,
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node, // Prevent this from being passed to the DOM element
  ...props
}: CodeProps) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  if (!inline) {
    return (
      <div className={cn("rounded-2xl overflow-clip shadow-md", className)}>
        <SyntaxHighlighter
          {...props}
          style={dracula}
          language={match ? language : "text"}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  } else {
    return (
      <code className={cn("rounded-2xl", className)} {...props}>
        {children}
      </code>
    );
  }
}
