import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen } from "lucide-react"
import Link from "next/link"

async function getRecentChanges() {
  try {
    const response = await fetch("https://openlibrary.org/recentchanges.json?limit=10", {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })
    if (!response.ok) throw new Error("Failed to fetch recent changes")
    return await response.json()
  } catch (error) {
    console.error("Error fetching recent changes:", error)
    return []
  }
}

export async function RecentChanges() {
  const changes = await getRecentChanges()

  if (!changes || changes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No recent changes available at the moment.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {changes.slice(0, 6).map((change: any, index: number) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {change.kind || "Update"}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(change.timestamp).toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {change.data?.title && <h3 className="font-semibold text-sm line-clamp-2">{change.data.title}</h3>}

              {change.author?.key && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  <span>Updated by contributor</span>
                </div>
              )}

              {change.data?.key && (
                <Link
                  href={`/book${change.data.key}`}
                  className="inline-flex items-center text-xs text-primary hover:underline"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  View Details
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
