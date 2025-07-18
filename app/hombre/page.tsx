"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import HeaderInternal from "@/components/header-internal"
import CatalogHero from "@/components/catalog-hero"
import BenefitsSection from "@/components/benefits-section"
import CategoriesSection from "@/components/categories-section"
import CatalogGrid from "@/components/catalog-grid"
import FilterPanel from "@/components/filter-panel"
import Footer from "@/components/footer"

export default function HombrePage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    season: [],
  })

  // Actualizar título y meta description
  useEffect(() => {
    document.title = 'Ropa para Hombre | Vancouver Canning - Jeans, Remeras, Camperas'
    
    // Actualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Descubre la mejor ropa para hombre en Vancouver Canning. Jeans, remeras, camperas, buzos y más. Estilo urbano y calidad premium.')
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeaderInternal />
      <CatalogHero />
      <BenefitsSection />
      <CategoriesSection gender="hombre" />
      <CatalogGrid onFilterClick={() => setIsFilterOpen(true)} filters={filters} gender="hombre" category={category} />
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
