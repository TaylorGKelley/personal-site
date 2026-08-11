const YOUTUBE_REGEX = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/

export function extractYouTubeId(url?: string | null): string | null {
  if (!url) return null
  const match = url.match(YOUTUBE_REGEX)
  return match && match[1]?.length === 11 ? match[1] : null
}

export function getYouTubeThumbnailUrl(url?: string | null, quality: 'maxresdefault' | 'hqdefault' = 'hqdefault'): string | null {
  const id = extractYouTubeId(url)
  if (!id) return null
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}
