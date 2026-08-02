'use client';

import { useState } from 'react';
import { Share2Icon, CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ActionButtonsProps {
  markdownContent: string;
}

export function ActionButtons({ markdownContent }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      toast.info('Copied markdown to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy post');
      console.error('Failed to copy post', err)
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.info('Link copied to clipboard!')
    }
  };

  return (
    <div className="flex items-center gap-2 text-neutral-400">
      <Button
        size='icon-lg'
        variant='secondary'
        onClick={handleCopy}
        title="Copy article as Markdown"
        className="rounded-full"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-green-600" /> : <CopyIcon className="h-4 w-4" />}
      </Button>

      <Button
        size='icon-lg'
        variant='secondary'
        onClick={handleShare}
        title="Share post"
        className="rounded-full"
      >
        <Share2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
