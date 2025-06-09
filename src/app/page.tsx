import { Suspense } from "react"
import { RecentChanges } from "@/components/recent-changes"
import { FeaturedBooks } from "@/components/featured-books"
import { Hero } from "@/components/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Recent Changes Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Recent Library Updates</h2>
          <Suspense fallback={<div className="animate-pulse bg-muted h-64 rounded-lg" />}>
            <RecentChanges />
          </Suspense>
        </section>

        {/* Featured Books Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Featured Books</h2>
          <Suspense fallback={<div className="animate-pulse bg-muted h-64 rounded-lg" />}>
            <FeaturedBooks />
          </Suspense>
        </section>
      </main>
    </div>
  )
}
