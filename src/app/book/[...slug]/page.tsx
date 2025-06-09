import { notFound } from "next/navigation"
import { BookDetails } from "@/components/book-details"
import { WikipediaInfo } from "@/components/wikipedia-info"
import { Suspense } from "react"

interface BookPageProps {
  params: { slug: string[] }
}

async function getBookData(key: string) {
  try {
    const response = await fetch(`https://openlibrary.org${key}.json`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error("Book not found")
    return await response.json()
  } catch (error) {
    console.error("Error fetching book:", error)
    return null
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const bookKey = `/${params.slug.join("/")}`
  const book = await getBookData(bookKey)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <BookDetails book={book} />

        {book.title && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
            <Suspense fallback={<WikipediaInfoSkeleton />}>
              <WikipediaInfo title={book.title} author={book.authors?.[0]?.name} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}

function WikipediaInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-32 bg-muted rounded" />
    </div>
  )
}
