export function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function calculateTimeToRead(content: string): number {
  const sanitized = content
    .toLowerCase()
    .replace(/[^a-z\s]+/g, " ")
    .trim();
  const words = sanitized ? sanitized.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.ceil(words / 200);
  return minutes;
}
