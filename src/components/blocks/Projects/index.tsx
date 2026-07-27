
const ComponentBlocks = {
  '': () => <></>
}

export interface RenderBlocksProps {
  blocks: {
    id?: string | null;
    blockType: keyof typeof ComponentBlocks;
    blockName?: string | null;
    [key: string]: any;
  }[];
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
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
