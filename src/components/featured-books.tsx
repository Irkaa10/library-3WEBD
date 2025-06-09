import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getFeaturedBooks() {
  try {
    // Get trending books by searching for popular subjects
    const subjects = ["fiction", "science", "history", "biography"]
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]

    const response = await fetch(
      `https://openlibrary.org/subjects/${randomSubject}.json?limit=12`,
      { next: { revalidate: 3600 } }, // Revalidate every hour
    )

    if (!response.ok) throw new Error("Failed to fetch featured books")
    const data = await response.json()
    return data.works || []
  } catch (error) {
    console.error("Error fetching featured books:", error)
    return []
  }
}

export async function FeaturedBooks() {
  const books = await getFeaturedBooks()

  if (!books || books.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No featured books available at the moment.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.slice(0, 8).map((book: any) => (
        <Card key={book.key} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="aspect-[3/4] relative overflow-hidden bg-muted">
            {book.cover_id ? (
              <Image
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                alt={book.title || "Book cover"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <span className="text-4xl">📚</span>
              </div>
            )}
          </div>

          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                <Link href={`/book${book.key}`}>{book.title}</Link>
              </h3>

              {book.authors && book.authors.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">by {book.authors[0].name}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              {book.first_publish_year && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {book.first_publish_year}
                </div>
              )}

              {book.ratings_average && (
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  <span>{book.ratings_average.toFixed(1)}</span>
                </div>
              )}
            </div>

            {book.subject && book.subject.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {book.subject.slice(0, 2).map((subject: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                    {subject}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
