import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

type PayloadImageProps = React.HTMLAttributes<HTMLImageElement> & {
  media: number | Media | null | undefined;
  altFallback?: string;
  className?: string;
}

export const PayloadImage: React.FC<PayloadImageProps> = ({
  media,
  altFallback = '',
  className,
  ...props
}) => {
  if (!media || typeof media === 'number') {
    return (
      <div className={`flex items-center justify-center bg-neutral-100 text-neutral-400 text-sm ${className}`}>
        No Image Available
      </div>
    );
  }

  const src = media.sizes?.hero?.url || media.url;

  if (!src) return null;

  return (
    <img
      src={src}
      alt={media.alt || altFallback}
      width={media.sizes?.hero?.width || media.width || undefined}
      height={media.sizes?.hero?.height || media.height || undefined}
      className={cn('object-cover w-full h-full',className)}
      loading="lazy"
      {...props}
    />
  );
};
