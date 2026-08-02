import { Experience } from "./Experience";
import { Hobbies } from "./Hobbies";
import { Skills } from "./Skills";
import { Values } from "./Values";
import type { ValuesBlock, SkillsBlock, ExperienceBlock, HobbiesBlock } from "@/payload-types";

const ComponentBlocks = {
  'values': Values,
  'skills': Skills,
  'experience': Experience,
  'hobbies': Hobbies,
}

export interface RenderBlocksProps {
  blocks?: (ValuesBlock | SkillsBlock | ExperienceBlock | HobbiesBlock)[] | null;
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
