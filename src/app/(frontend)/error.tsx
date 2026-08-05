'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[ErrorBoundary]', error)
  }, [error])

  return (
    <main className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
      <h3 className="text-4xl font-serif tracking-tight font-medium text-neutral-900">Something went wrong</h3>
      <p className="mt-4 text-neutral-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 cursor-pointer rounded-full bg-neutral-950 px-6 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </main>
  )
}
