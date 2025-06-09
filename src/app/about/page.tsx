import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Users, Globe, Code, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Town Library</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your digital gateway to millions of books, powered by the Open Library project and enhanced with Wikipedia
            integration.
          </p>
        </div>

        {/* Mission Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We believe that access to knowledge should be universal and free. Our digital library platform connects
              you to millions of books from around the world, making it easy to discover, explore, and learn. By
              combining the vast collection of Open Library with additional information from Wikipedia, we provide a
              comprehensive reading experience for book lovers, students, and researchers alike.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                Vast Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access millions of books from the Open Library database, including classics, contemporary works, and
                rare publications from around the world.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5 text-primary" />
                Advanced Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Find exactly what you're looking for with our powerful search filters. Search by title, author, subject,
                publication year, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-primary" />
                Wikipedia Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get additional context and information about books through our Wikipedia integration, including
                summaries, images, and links to detailed articles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Community Driven
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built on the collaborative efforts of the Open Library community, ensuring our collection is constantly
                growing and improving.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-primary" />
                Modern Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with modern web technologies to provide a fast, responsive, and accessible experience across all
                devices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-primary" />
                Free & Open
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Completely free to use with no registration required. We believe knowledge should be accessible to
                everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technology & Data Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Data Sources</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>Open Library API:</strong> Primary source for book data and metadata
                </li>
                <li>
                  • <strong>Wikipedia API:</strong> Additional context and information about books
                </li>
                <li>
                  • <strong>Open Library Covers API:</strong> Book cover images
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Built With</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>Next.js 15:</strong> React framework with App Router
                </li>
                <li>
                  • <strong>TypeScript:</strong> Type-safe development
                </li>
                <li>
                  • <strong>Tailwind CSS:</strong> Utility-first CSS framework
                </li>
                <li>
                  • <strong>shadcn/ui:</strong> Beautiful and accessible UI components
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Get In Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> contact@townlibrary.com
              </p>
              <p>
                <strong>GitHub:</strong> github.com/townlibrary
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
