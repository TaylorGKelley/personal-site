"use client";

import { cn } from "@/src/utils/tw";
import Image from "next/image";

export type ImageProps = Readonly<
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
    src: string;
    alt?: string;
  }
>;

export function image({
  className,
  src,
  alt,
  width,
  height,
  ...props
}: ImageProps) {
  return (
    <span className="block mx-auto my-4">
      <Image
        {...props}
        width={typeof width === "string" ? parseInt(width) : width || 1024}
        height={typeof height === "string" ? parseInt(height) : height || 768}
        src={src}
        alt={alt || "Post image"}
        className={cn("aspect-video w-full rounded-2xl", className)}
      />
      {alt && alt.length > 0 && (
        <span className="inline-block w-full mt-2 text-center text-gray-600">
          {alt}
        </span>
      )}
    </span>
  );
}
