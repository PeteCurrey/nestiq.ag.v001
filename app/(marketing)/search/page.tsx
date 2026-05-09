import { Suspense } from 'react'
import SearchResults from '@/components/search/SearchResults'
import { SearchPageSkeleton } from '@/components/search/SearchPageSkeleton'

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchResults />
    </Suspense>
  )
}
