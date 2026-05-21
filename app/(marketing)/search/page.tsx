import { Suspense } from 'react'
import SearchResultsClient from '@/components/search/SearchResultsClient'
import { SearchPageSkeleton } from '@/components/search/SearchPageSkeleton'

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchResultsClient />
    </Suspense>
  )
}
