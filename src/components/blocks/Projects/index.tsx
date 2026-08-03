import type { ArchitectureDiagramBlock, ProjectCodeBlock, FeatureGridBlock, SolutionBlock, GalleryBlock, OverviewBlock } from "@/payload-types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CodeBlock } from "./CodeBlock";
import { FeatureGrid } from "./FeatureGrid";
import { Solution } from "./Solution";
import { Gallery } from "./Gallery";
import { Overview } from "./Overview";


const ComponentBlocks = {
  'architecture-diagram': ArchitectureDiagram,
  'code-block': CodeBlock,
  'feature-grid': FeatureGrid,
  'solution': Solution,
  'gallery': Gallery,
  'overview': Overview,
}

export interface RenderBlocksProps {
  blocks?: (OverviewBlock | GalleryBlock | SolutionBlock | FeatureGridBlock | ProjectCodeBlock | ArchitectureDiagramBlock)[] | null;
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
