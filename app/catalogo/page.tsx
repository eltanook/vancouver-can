"use client"

import { useState } from "react"
import HeaderInternal from "@/components/header-internal"
import CatalogHero from "@/components/catalog-hero"
import BenefitsSection from "@/components/benefits-section"
import CategoriesSection from "@/components/categories-section"
import CatalogGrid from "@/components/catalog-grid"
import FilterPanel from "@/components/filter-panel"
import Footer from "@/components/footer"

export default function CatalogoPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    season: [],
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeaderInternal />
      <CatalogHero />
      <BenefitsSection />
      <CategoriesSection />
      <CatalogGrid onFilterClick={() => setIsFilterOpen(true)} filters={filters} />
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
