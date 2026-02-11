import ReactMarkdown from "react-markdown";
import * as textComponents from "./text-components";
import { code as Code, type CodeProps } from "./code-component";
import { image as Image, type ImageProps } from "./image-component";

export default function RenderMarkdown({
  children,
}: Readonly<{ children: string }>) {
  return (
    <ReactMarkdown
      components={{
        ...textComponents,
        code: (props) => <Code {...(props as CodeProps)} />,
        img: (props) => <Image {...(props as ImageProps)} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
