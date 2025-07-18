"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowUpDown, Filter } from "lucide-react"
import { useStore } from "@/lib/store"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CatalogGridProps {
  onFilterClick: () => void
  filters: any
  gender?: string
  category?: string
  season?: string
}

export default function CatalogGrid({ onFilterClick, filters, gender, category, season }: CatalogGridProps) {
  const [showAll, setShowAll] = useState(false)
  const productsPerPage = 16 // 4 filas x 4 columnas
  const catalogRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const { getFilteredProducts, setSortOrder, savePaginationState, getPaginationState } = useStore()
  const sortOrderState = useStore((state) => state.sortOrder)
  
  // Usar el estado de paginación del store
  const currentPage = getPaginationState(pathname)
  const setCurrentPage = (page: number) => {
    savePaginationState(pathname, page)
  }

  let products = getFilteredProducts()

  // Filter by gender if specified
  if (gender) {
    products = products.filter((product) => product.gender === gender || product.gender === "unisex")
  }

  // Filter by category if specified
  if (category) {
    products = products.filter((product) => product.category === category)
  }

  if (season) {
    products = products.filter((product) => product.season === season)
  }

  // Pagination - Solo si NO hay filtros aplicados
  const hasFilters = 
    (filters && (
      (filters.color?.length > 0) ||
      (filters.size?.length > 0) ||
      (filters.season?.length > 0) ||
      (filters.colors?.length > 0) ||
      (filters.sizes?.length > 0) ||
      (filters.seasons?.length > 0) ||
      (filters.categories?.length > 0)
    )) || 
    (sortOrderState !== null)

  // Lógica específica para determinar si hay filtros activos (sin incluir ordenamiento)
  const hasActiveFilters = 
    (filters && (
      (filters.color?.length > 0) ||
      (filters.size?.length > 0) ||
      (filters.season?.length > 0) ||
      (filters.colors?.length > 0) ||
      (filters.sizes?.length > 0) ||
      (filters.seasons?.length > 0) ||
      (filters.categories?.length > 0)
    ))

  const totalPages = (hasFilters || showAll) ? 1 : Math.ceil(products.length / productsPerPage)
  const startIndex = (hasFilters || showAll) ? 0 : (currentPage - 1) * productsPerPage
  const endIndex = (hasFilters || showAll) ? products.length : startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Hacer scroll arriba de la sección del catálogo, no de toda la página
    catalogRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Función para manejar el clic en "Ver todo" / "Ver menos"
  const handleViewAll = () => {
    setShowAll(!showAll)
    if (!showAll) {
      // Si vamos a mostrar todo, ir a la primera página
      setCurrentPage(1)
    }
  }

  // Reset page when filters change (but not when returning from product pages)
  useEffect(() => {
    // Get current referrer to check if coming from a product page
    const referrer = document.referrer
    const isFromProductPage = referrer.includes('/producto/')
    
    // Only reset page if NOT coming from a product page
    if (!isFromProductPage) {
    setCurrentPage(1)
    }
  }, [filters, gender, category, season])

  return (
    <div className="py-8 sm:py-12 lg:py-16" ref={catalogRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
          <h2 className="typography-primary text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 dark:text-white">
            {category
              ? category.toUpperCase()
              : season
              ? season.toUpperCase()
              : gender
              ? gender === "hombre"
                ? "HOMBRE"
                : "MUJER"
              : "TODOS LOS PRODUCTOS"}
          </h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button
              variant={hasActiveFilters ? "default" : "outline"}
              onClick={onFilterClick}
              className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                hasActiveFilters 
                  ? "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" 
                  : "bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              }`}
            >
              <Filter className="h-4 w-4" />
              FILTRAR
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={sortOrderState ? "default" : "outline"}
                  className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                    sortOrderState 
                      ? "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" 
                      : "bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
                  }`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrderState ? 
                    (sortOrderState.field === 'name' ? 
                      (sortOrderState.direction === 'asc' ? 'A-Z' : 'Z-A') : 
                      (sortOrderState.direction === 'asc' ? 'Menor precio' : 'Mayor precio')
                    ) : 'ORDENAR'
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <DropdownMenuItem 
                  onClick={() => setSortOrder('name', 'asc')}
                  className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrderState?.field === 'name' && sortOrderState?.direction === 'asc' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <span className="dark:text-white">Nombre A-Z</span>
                  {sortOrderState?.field === 'name' && sortOrderState?.direction === 'asc' && <span className="ml-auto text-xs">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder('name', 'desc')}
                  className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrderState?.field === 'name' && sortOrderState?.direction === 'desc' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <span className="dark:text-white">Nombre Z-A</span>
                  {sortOrderState?.field === 'name' && sortOrderState?.direction === 'desc' && <span className="ml-auto text-xs">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder('price', 'asc')}
                  className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrderState?.field === 'price' && sortOrderState?.direction === 'asc' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <span className="dark:text-white">Menor precio</span>
                  {sortOrderState?.field === 'price' && sortOrderState?.direction === 'asc' && <span className="ml-auto text-xs">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder('price', 'desc')}
                  className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrderState?.field === 'price' && sortOrderState?.direction === 'desc' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <span className="dark:text-white">Mayor precio</span>
                  {sortOrderState?.field === 'price' && sortOrderState?.direction === 'desc' && <span className="ml-auto text-xs">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
              onClick={handleViewAll}
              className="text-gray-600 hover-yellow transition-colors text-sm whitespace-nowrap dark:text-gray-300 hover:underline"
            >
              {showAll ? "Ver menos" : `Ver todo (${products.length})`}
            </button>
          </div>
        </div>

        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {currentProducts.map((product) => (
            <Link key={product.id} href={`/producto/${product.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden mb-2 sm:mb-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-cover transition-all duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={product.hoverImage || "/placeholder.svg"}
                    alt={`${product.name} hover`}
                    className="absolute inset-0 w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-cover opacity-0 transition-all duration-300 group-hover:opacity-100"
                  />

                </div>
                <h3 className="font-medium text-xs sm:text-sm mb-1 uppercase line-clamp-2 dark:text-white">{product.name}</h3>
                <div className="flex items-baseline gap-3">
                  <p className="typography-accent font-bold text-sm sm:text-base dark:text-white">${product.price?.toLocaleString() || '0'}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Descuento efectivo: <span className="font-bold text-gray-900 dark:text-white">${product.cashPrice?.toLocaleString() || Math.floor(product.price * 0.75).toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination - Solo si NO hay filtros */}
        {!hasFilters && totalPages > 1 && (
          <div className="mt-8 sm:mt-12">
            {/* Desktop Layout - Vertical stack */}
            <div className="hidden sm:flex flex-row justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-transparent w-auto dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2">Anterior</span>
              </Button>

              <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page
                  if (totalPages <= 5) {
                    page = i + 1
                  } else if (currentPage <= 3) {
                    page = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i
                  } else {
                    page = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={page}
                      variant="outline"
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 text-sm ${
                        currentPage === page 
                          ? "bg-black text-white dark:bg-white dark:text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" 
                          : "bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
                      }`}
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-transparent w-auto dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              >
                <span className="mr-2">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Layout - Horizontal with arrows on sides */}
            <div className="flex sm:hidden justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-transparent w-12 h-12 p-0 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-1 flex-wrap justify-center">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page
                  if (totalPages <= 5) {
                    page = i + 1
                  } else if (currentPage <= 3) {
                    page = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i
                  } else {
                    page = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={page}
                      variant="outline"
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 text-xs ${
                        currentPage === page 
                          ? "bg-black text-white dark:bg-white dark:text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" 
                          : "bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
                      }`}
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-transparent w-12 h-12 p-0 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-base sm:text-lg dark:text-gray-400">
              No se encontraron productos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
