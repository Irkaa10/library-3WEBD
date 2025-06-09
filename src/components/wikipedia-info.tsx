import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface WikipediaInfoProps {
  title: string
  author?: string
}

async function getWikipediaInfo(title: string, author?: string) {
  try {
    // Search for the book on Wikipedia
    const searchQuery = author ? `${title} ${author}` : title
    const searchResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    )

    if (searchResponse.ok) {
      const data = await searchResponse.json()
      if (data.type !== "disambiguation" && data.extract) {
        return data
      }
    }

    // If direct search fails, try searching via the search API
    const searchApiResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 86400 } },
    )

    if (searchApiResponse.ok) {
      const data = await searchApiResponse.json()
      if (data.type !== "disambiguation" && data.extract) {
        return data
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching Wikipedia info:", error)
    return null
  }
}

export async function WikipediaInfo({ title, author }: WikipediaInfoProps) {
  const wikipediaData = await getWikipediaInfo(title, author)

  if (!wikipediaData || !wikipediaData.extract) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Globe className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No additional information found on Wikipedia for this book.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Wikipedia Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Wikipedia Image */}
          {wikipediaData.thumbnail && (
            <div className="md:col-span-1">
              <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                <Image
                  src={wikipediaData.thumbnail.source || "/placeholder.svg"}
                  alt={wikipediaData.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          )}

          {/* Wikipedia Content */}
          <div className={wikipediaData.thumbnail ? "md:col-span-2" : "md:col-span-3"}>
            <h3 className="text-lg font-semibold mb-3">{wikipediaData.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{wikipediaData.extract}</p>

            <Button asChild variant="outline" size="sm">
              <Link href={wikipediaData.content_urls?.desktop?.page || "#"} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                Read more on Wikipedia
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
