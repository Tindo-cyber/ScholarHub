import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Building2, Eye } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useMarketplaceListings } from '@/hooks/use-data'

export default function MarketplacePage() {
  const { data: listings, isLoading } = useMarketplaceListings()
  const [query, setQuery] = useState('')

  const filtered = listings?.filter(
    (l) =>
      !query ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <FadeIn>
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
            <Building2 className="h-4 w-4" />
            Innovation Marketplace
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Discover Innovation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore groundbreaking student projects. Companies, researchers, and investors connect with the next generation of innovators.
          </p>
        </header>
      </FadeIn>

      <div className="relative mx-auto mb-12 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find Java projects, AI research, Spring Boot..."
          className="h-12 rounded-2xl pl-11"
          aria-label="Search marketplace"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((listing) => (
            <StaggerItem key={listing.id}>
              <motion.article
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={listing.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {listing.isFeatured && (
                    <Badge className="absolute left-3 top-3">Featured</Badge>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline">{listing.category}</Badge>
                    <span className="text-xs text-muted-foreground">{listing.viewCount} views</span>
                  </div>
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{listing.summary}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {listing.studentName} · {listing.department}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {listing.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${listing.projectId}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Project
                  </Link>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  )
}
