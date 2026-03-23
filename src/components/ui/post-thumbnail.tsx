import Image from "next/image";
import { getYouTubeVideoId } from "@/src/utils/helpers";
import { cn } from "@/src/utils/tw";

export default function PostThumbnail({
  youtubeUrl,
  className,
  ...props
}: { youtubeUrl: string } & Partial<React.ComponentProps<typeof Image>>) {
  const videoId = getYouTubeVideoId(youtubeUrl);
  return (
    <Image
      width={600}
      height={350}
      {...props}
      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
      alt="Post Thumbnail"
      className={cn("rounded-3xl shadow aspect-video object-cover", className)}
    />
  );
}
