import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, BookOpen, Globe, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BookDetailsProps {
  book: any
}

export function BookDetails({ book }: BookDetailsProps) {
  const getCoverUrl = (coverId: number | string) => {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
  }

  return (
    <div className="space-y-8">
      {/* Main Book Information */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <div className="aspect-[3/4] relative bg-muted rounded-lg overflow-hidden">
            {book.covers && book.covers.length > 0 ? (
              <Image
                src={getCoverUrl(book.covers[0]) || "/placeholder.svg"}
                alt={book.title || "Book cover"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <BookOpen className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Book Information */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{book.title}</h1>

            {book.subtitle && <h2 className="text-xl text-muted-foreground mb-4">{book.subtitle}</h2>}

            {book.authors && book.authors.length > 0 && (
              <div className="flex items-center text-lg text-muted-foreground mb-4">
                <User className="h-5 w-5 mr-2" />
                <span>by {book.authors.map((author: any) => author.name || "Unknown Author").join(", ")}</span>
              </div>
            )}
          </div>

          {/* Publication Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publication Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {book.publish_date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Published: {book.publish_date}</span>
                </div>
              )}

              {book.publishers && book.publishers.length > 0 && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Publisher: {book.publishers.join(", ")}</span>
                </div>
              )}

              {book.isbn_13 && book.isbn_13.length > 0 && (
                <div className="text-sm">
                  <strong>ISBN-13:</strong> {book.isbn_13[0]}
                </div>
              )}

              {book.isbn_10 && book.isbn_10.length > 0 && (
                <div className="text-sm">
                  <strong>ISBN-10:</strong> {book.isbn_10[0]}
                </div>
              )}

              {book.number_of_pages && (
                <div className="text-sm">
                  <strong>Pages:</strong> {book.number_of_pages}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subjects/Tags */}
          {book.subjects && book.subjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects.slice(0, 10).map((subject: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {subject}
                  </Badge>
                ))}
                {book.subjects.length > 10 && <Badge variant="outline">+{book.subjects.length - 10} more</Badge>}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Open Library
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      {book.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {typeof book.description === "string"
                ? book.description
                : book.description.value || "No description available."}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
