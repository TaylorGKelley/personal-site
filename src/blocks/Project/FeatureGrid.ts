import type { Block } from "payload";
import { TechStackCard } from "./FeatureGridCards/TechStack.Card";
import { InformationCard } from "./FeatureGridCards/Information.Card";
import { MetricCard } from "./FeatureGridCards/Metric.Card";

export const FeatureGrid: Block = {
  slug: 'feature-grid',
  interfaceName: 'FeatureGridBlock',
  labels: {
    singular: 'Feature Grid Block',
    plural: 'Feature Grid Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'The Brief',
      required: true,
    },
    {
      name: 'summaryTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'cards',
      type: 'blocks',
      blocks: [TechStackCard, MetricCard, InformationCard],
    }
  ],
}
