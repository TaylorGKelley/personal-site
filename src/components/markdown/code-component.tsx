import { ComponentProps } from "@m2d/react-markdown/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(extractTextFromChildren).join("");
  if (
    children !== null &&
    typeof children === "object" &&
    "props" in (children as object)
  ) {
    return extractTextFromChildren(
      (children as { props: { children: React.ReactNode } }).props.children,
    );
  }
  return "";
}

export function CodeBlock({ children, ...rest }: ComponentProps) {
  const child = Array.isArray(children) ? children[0] : children;

  if (!child || typeof child !== "object" || !("props" in (child as object))) {
    return (
      <pre {...(rest as React.HTMLAttributes<HTMLPreElement>)}>{children}</pre>
    );
  }

  const codeEl = child as React.ReactElement<ComponentProps>;
  const { className, children: codeChildren, ...codeRest } = codeEl.props;

  const match = /language-(\w+)/.exec(className ?? "");
  const language = match?.[1] ?? "text";

  const meta: string =
    ((codeRest as Record<string, unknown>)["data-meta"] as string) ?? "";

  const titleMatch = /title="([^"]+)"/.exec(meta);
  const filename = titleMatch?.[1] ?? null;

  const code = extractTextFromChildren(codeChildren).replace(/\n$/, "");

  return (
    <div className="shadow rounded-lg overflow-y-auto my-8 bg-gray-800">
      {filename && (
        <div className="bg-gray-800 py-2 px-4 text-xs font-mono text-gray-300">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          fontSize: "14px",
        }}
        showLineNumbers={code.split("\n").length > 5}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
