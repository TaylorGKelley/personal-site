import { type ImageBlock } from '../types/Project';

type ImageBlockProps = { image: ImageBlock };

function ImageBlock({ image }: ImageBlockProps) {
  return <img src={image.src} alt={image.alt} />;
}

export default ImageBlock;
