'use client'

import React from 'react'
import { IconPackProvider as BaseProvider } from 'payload-icon-picker/client'
import * as LucideIcons from 'lucide-react'

export const IconPackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BaseProvider
      icons={LucideIcons}
    >
      {children}
    </BaseProvider>
  )
}
