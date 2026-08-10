import type { HeroBlock, ProjectBlock, RecentPostsBlock } from "@/payload-types";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { RecentPosts } from "./RecentPosts";

const ComponentBlocks = {
  'hero': Hero,
  'projects': Projects,
  'recent-posts': RecentPosts,
}

export interface RenderBlocksProps {
  blocks?: (HeroBlock | ProjectBlock | RecentPostsBlock)[] | null;
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        if (block.blockType in ComponentBlocks) {
          const Component = ComponentBlocks[block.blockType] as React.ComponentType<any>;
          return <Component key={block.id} {...(block as any)} />;
        }
      })}
    </>
  );
}
