import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SearchResultsProps {
  query?: string
  author?: string
  subject?: string
  year?: string
}

async function searchBooks({ query, author, subject, year }: SearchResultsProps) {
  try {
    const searchUrl = "https://openlibrary.org/search.json?"
    const params = new URLSearchParams()

    if (query) params.append("q", query)
    if (author) params.append("author", author)
    if (subject) params.append("subject", subject)
    if (year) params.append("first_publish_year", year)

    params.append("limit", "20")

    const response = await fetch(`${searchUrl}${params.toString()}`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) throw new Error("Failed to search books")
    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error("Error searching books:", error)
    return []
  }
}

export async function SearchResults(props: SearchResultsProps) {
  const books = await searchBooks(props)

  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or using different keywords.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Found {books.length} results</p>

      <div className="grid gap-4">
        {books.map((book: any, index: number) => (
          <Card key={book.key || index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Book Cover */}
                <div className="w-16 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                  {book.cover_i ? (
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                      alt={book.title || "Book cover"}
                      width={64}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📚</div>
                  )}
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary">
                      <Link href={`/book${book.key}`}>{book.title}</Link>
                    </h3>

                    {book.author_name && book.author_name.length > 0 && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>{book.author_name.slice(0, 2).join(", ")}</span>
                        {book.author_name.length > 2 && <span> and {book.author_name.length - 2} more</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {book.first_publish_year && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {book.first_publish_year}
                      </div>
                    )}

                    {book.publisher && book.publisher.length > 0 && <span>Published by {book.publisher[0]}</span>}
                  </div>

                  {book.subject && book.subject.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {book.subject.slice(0, 3).map((subject: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {book.subject.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{book.subject.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {book.first_sentence && book.first_sentence.length > 0 && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{book.first_sentence[0]}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
