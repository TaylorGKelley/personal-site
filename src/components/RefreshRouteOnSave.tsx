'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter, useSearchParams } from 'next/navigation.js'
import React from 'react'

type RefreshRouteOnSaveProps = {
  onlyOnPreview?: boolean
}

export const RefreshRouteOnSave: React.FC<RefreshRouteOnSaveProps> = ({ onlyOnPreview }) => {
    const searchParams = useSearchParams();

  if (onlyOnPreview && searchParams.get('preview') === null) {
    return null
  }

  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000"}
    />
  )
}
