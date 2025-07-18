"use client"

import { useState, useEffect } from "react"
import HeaderInternal from "@/components/header-internal"
import TiendaGrid from "@/components/tienda-grid"
import FilterPanel from "@/components/filter-panel"
import Footer from "@/components/footer"

export default function TiendaPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    season: [],
  })

  useEffect(() => {
    document.title = 'Tienda Online | Vancouver Canning - Toda la Colección'
    
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Explora toda la colección de Vancouver Canning. Ropa para hombre y mujer, jeans, remeras, camperas y accesorios. Compra online con envío a todo el país.')
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeaderInternal />
      <TiendaGrid onFilterClick={() => setIsFilterOpen(true)} filters={filters} />
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
