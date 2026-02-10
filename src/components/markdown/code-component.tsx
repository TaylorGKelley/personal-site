"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ExtraProps } from "react-markdown";

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
      <SyntaxHighlighter
        {...props}
        style={dracula}
        language={match ? language : "text"}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  } else {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
}
