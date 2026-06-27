'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { Hero } from './blocks/Hero'
import { RecentPosts } from './blocks/RecentPosts'

// Map block slugs to their structural frontend components
const blockComponents: Record<string, React.FC<any>> = {
  hero: Hero,
  recentPosts: RecentPosts,
}

interface RenderBlocksProps {
  initialLayout: any[]
  isPreview?: boolean
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ initialLayout, isPreview = false }) => {
  const { data } = isPreview ? useLivePreview({
    initialData: { layout: initialLayout },
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  }) : { data: undefined };

  // Use live layout data if previewing, otherwise fall back to server-rendered initial layout
  const activeLayout = isPreview ? data?.layout : initialLayout

  if (!activeLayout || activeLayout.length === 0) return null

  return (
    <>
      {activeLayout.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType]
        if (!BlockComponent) return null

        return <BlockComponent key={index} {...block} />
      })}
    </>
  )
}
