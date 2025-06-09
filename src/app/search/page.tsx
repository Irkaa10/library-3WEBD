import { Suspense } from "react"
import { AdvancedSearchForm } from "@/components/advanced-search-form"
import { SearchResults } from "@/components/search-results"

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""
  const author = typeof searchParams.author === "string" ? searchParams.author : ""
  const subject = typeof searchParams.subject === "string" ? searchParams.subject : ""
  const year = typeof searchParams.year === "string" ? searchParams.year : ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advanced Search</h1>
          <p className="text-muted-foreground">
            Use the filters below to find exactly what you're looking for in our collection.
          </p>
        </div>

        <AdvancedSearchForm initialQuery={query} initialAuthor={author} initialSubject={subject} initialYear={year} />

        {(query || author || subject || year) && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} author={author} subject={subject} year={year} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex gap-4 p-4 border rounded-lg">
            <div className="w-16 h-20 bg-muted rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
