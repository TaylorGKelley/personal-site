"use server";

import { Md } from "@m2d/react-markdown";
import * as textComponents from "./text-components";
import * as tableComponents from "./table-components";
import { CodeBlock } from "./code-component";
import { image as Image, type ImageProps } from "./image-component";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeHighlight from "rehype-highlight";

export default async function RenderMarkdown({
  children,
}: Readonly<{ children: string }>) {
  return (
    <Md
      remarkPlugins={[remarkParse, remarkGfm, remarkRehype]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        ...textComponents,
        ...tableComponents,
        pre: (props) => <CodeBlock {...props} />,
        img: (props) => <Image {...(props as ImageProps)} />,
      }}
    >
      {children}
    </Md>
  );
}
