'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { SearchIcon } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface BlogFiltersProps {
  allCategories: string[]
  selectedCategories: string[]
  searchQuery: string
}

export function BlogFilters({
  allCategories,
  selectedCategories,
  searchQuery,
}: BlogFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const handleSearchChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    updateParams({ q: q || null, page: null })
  })

  function handleCategoryClick(category: string) {
    if (category === 'ALL') {
      updateParams({ category: null, page: null })
      return
    }

    let next = selectedCategories.filter((c) => c !== 'ALL')

    if (next.includes(category)) {
      next = next.filter((c) => c !== category)
    } else {
      next = [...next, category]
    }

    updateParams({ category: next.length > 0 ? next.join(',') : null, page: null })
  }

  const allSelected = selectedCategories.length === 0

  return (
    <div className="max-w-2xl">
      {/* Search */}
      <div className="relative mb-6">
        <SearchIcon className="size-4 absolute top-3 left-4" />
        <input
          type="search"
          placeholder="Search articles, tags, or topics…"
          defaultValue={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-1.5">
        <Chip
          label="All"
          active={allSelected}
          onClick={() => handleCategoryClick('ALL')}
        />
        {allCategories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            active={selectedCategories.includes(cat)}
            onClick={() => handleCategoryClick(cat)}
          />
        ))}
      </div>
    </div>
  )
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-full border px-3.5 py-1 text-xs font-medium leading-normal transition-colors duration-150 cursor-pointer',
        active
          ? 'border-gray-900 bg-gray-900 text-white'
          : 'border-gray-200 bg-transparent text-gray-700 hover:border-gray-400',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
