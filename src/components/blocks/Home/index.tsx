import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { RecentPosts } from "./RecentPosts";

const blocks = {
  'hero': Hero,
  'projects': Projects,
  'recentPosts': RecentPosts,
}

export interface RenderBlocksProps {
  blocks: {
    id?: string | null;
    blockType: keyof typeof blocks;
    blockName?: string | null;
  }[];
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {


  return (
    <></>
  );
}
