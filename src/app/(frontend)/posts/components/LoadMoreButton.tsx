'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface LoadMoreButtonProps {
  href: string
}

export function LoadMoreButton({ href }: LoadMoreButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.push(href, { scroll: false }))}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-700 transition-colors hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Loading…
        </>
      ) : (
        'Load older thoughts ↓'
      )}
    </button>
  )
}
