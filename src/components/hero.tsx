import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to Our
            <span className="text-primary block">Digital Library</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover millions of books, explore new worlds, and expand your knowledge with our comprehensive digital
            collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Start Exploring
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/about">
                <Users className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-2">
              <BookOpen className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Vast Collection</h3>
              <p className="text-muted-foreground">Access millions of books from around the world</p>
            </div>
            <div className="text-center space-y-2">
              <Search className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Advanced Search</h3>
              <p className="text-muted-foreground">Find exactly what you're looking for with powerful filters</p>
            </div>
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Community Driven</h3>
              <p className="text-muted-foreground">Discover books recommended by fellow readers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
