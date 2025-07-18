"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { useStore } from "@/lib/store"

interface TiendaGridProps {
  onFilterClick: () => void
  filters: any
}

export default function TiendaGrid({ onFilterClick, filters }: TiendaGridProps) {
  const { getFilteredProducts } = useStore()
  const products = getFilteredProducts()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="typography-primary text-3xl font-bold dark:text-white">TODOS LOS PRODUCTOS</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onFilterClick} className="flex items-center gap-2 bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">
              <Filter className="h-4 w-4" />
              FILTRAR
            </Button>
            <span className="text-gray-600 dark:text-gray-300">{products.length} productos</span>
          </div>
        </div>

        {/* Products Grid - All products without pagination */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {products.map((product) => (
            <Link key={product.id} href={`/producto/${product.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden mb-2 sm:mb-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-all duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={product.hoverImage || "/placeholder.svg"}
                    alt={`${product.name} hover`}
                    className="absolute inset-0 w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg"
                  />
                  {/* Label overlay para productos reales */}
                  {product.isReal && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        REAL
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-xs sm:text-sm mb-1 uppercase line-clamp-2 dark:text-white">{product.name}</h3>
                <p className="typography-accent font-bold text-sm sm:text-base dark:text-white">${product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg dark:text-gray-400">No se encontraron productos con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  )
}
