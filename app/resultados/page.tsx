"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import HeaderInternal from "@/components/header-internal"
import CatalogGrid from "@/components/catalog-grid"
import FilterPanel from "@/components/filter-panel"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

function ResultadosPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const gender = searchParams.get("gender") || undefined
  const category = searchParams.get("category") || undefined
  const season = searchParams.get("season") || undefined

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ color: [], size: [], season: [] })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeaderInternal />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-2 mb-4 dark:border-gray-600 dark:hover:bg-gray-800">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>

      <CatalogGrid
        onFilterClick={() => setIsFilterOpen(true)}
        filters={filters}
        gender={gender}
        category={category}
        season={season as any}
      />

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <Footer />
    </div>
  )
}

export default function ResultadosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <HeaderInternal />
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Button variant="outline" size="sm" className="flex items-center gap-2 mb-4 dark:border-gray-600 dark:hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
        <Footer />
      </div>
    }>
      <ResultadosPageContent />
    </Suspense>
  )
} 