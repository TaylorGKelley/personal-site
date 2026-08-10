import { InformationCard } from "./Information.Card";
import { MetricCard } from "./Metric.Card";
import { TechStackCard } from "./TechStack.Card";
import type { InformationFeatureCardBlock, MetricFeatureCardBlock, TechStackFeatureCardBlock } from "@/payload-types";


const ComponentBlocks = {
  'information-card': InformationCard,
  'metric-card': MetricCard,
  'tech-stack-card': TechStackCard,
}

export interface RenderBlocksProps {
  blocks?: (InformationFeatureCardBlock | MetricFeatureCardBlock | TechStackFeatureCardBlock)[] | null;
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
