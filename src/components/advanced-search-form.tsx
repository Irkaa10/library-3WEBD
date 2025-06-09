"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, RotateCcw } from "lucide-react"

interface AdvancedSearchFormProps {
  initialQuery?: string
  initialAuthor?: string
  initialSubject?: string
  initialYear?: string
}

export function AdvancedSearchForm({
  initialQuery = "",
  initialAuthor = "",
  initialSubject = "",
  initialYear = "",
}: AdvancedSearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [author, setAuthor] = useState(initialAuthor)
  const [subject, setSubject] = useState(initialSubject)
  const [year, setYear] = useState(initialYear)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (author.trim()) params.set("author", author.trim())
    if (subject.trim()) params.set("subject", subject.trim())
    if (year.trim()) params.set("year", year.trim())

    router.push(`/search?${params.toString()}`)
  }

  const handleReset = () => {
    setQuery("")
    setAuthor("")
    setSubject("")
    setYear("")
    router.push("/search")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="query">Title or Keywords</Label>
              <Input
                id="query"
                type="text"
                placeholder="Enter book title or keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                type="text"
                placeholder="Enter author name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Enter subject or genre..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Publication Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="Enter year..."
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1 sm:flex-none">
              <Search className="mr-2 h-4 w-4" />
              Search Books
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
