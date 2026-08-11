'use client';

import YouTube from 'react-youtube';
import { extractYouTubeId } from '@/utils/youtube';

type VideoEmbedProps = {
  youtubeUrl: string | null;
};

export function VideoEmbed({ youtubeUrl }: VideoEmbedProps) {
  const videoId = extractYouTubeId(youtubeUrl);

  if (!videoId) return <></>;

  return (
    <div className='rounded-2xl overflow-clip mx-auto relative shadow mb-8 aspect-video'>
      <YouTube videoId={videoId} loading='eager' opts={{ outerWidth: '100%', outerHeight: '100%' }} iframeClassName='w-full h-full' className='w-full h-full' />
    </div>
  );
}
