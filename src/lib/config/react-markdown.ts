import { type Components } from 'react-markdown';
import {
  Heading1,
  Heading2,
  Heading3,
} from '../../components/markdown/Headings';
import { Paragraph } from '../../components/markdown/Paragraph';

const config: Components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  img: Image,
};

export default config;
