'use client';

import YouTube from 'react-youtube';

function extractVideoIdFromUrl(url: string | null): string | null {
  if (!url) return null;

  // Regex pattern matching watch URLs, embed URLs, and short URLs
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (match && match[1].length === 11) ? match[1] : null;
}

type VideoEmbedProps = {
  youtubeUrl: string | null;
};

export function VideoEmbed({ youtubeUrl }: VideoEmbedProps) {
  const videoId = extractVideoIdFromUrl(youtubeUrl);

  if (!videoId) return <></>;

  return (
    <div className='rounded-2xl overflow-clip mx-auto relative shadow mb-8'>
      <YouTube videoId={videoId} loading='eager' iframeClassName='w-full aspect-video' className='w-full' />
    </div>
  );
}
