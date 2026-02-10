import ReactMarkdown from "react-markdown";
import * as textComponents from "./text-components";
import { code as Code, type CodeProps } from "./code-component";

export default function RenderMarkdown({
  children,
}: Readonly<{ children: string }>) {
  return (
    <ReactMarkdown
      components={{
        ...textComponents,
        code: (props) => <Code {...(props as CodeProps)} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
