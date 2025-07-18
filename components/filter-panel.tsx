"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filters: any
  onFiltersChange: (filters: any) => void
}

export default function FilterPanel({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) {
  const { selectedFilters, setFilters } = useStore()
  const [localFilters, setLocalFilters] = useState(selectedFilters)

  if (!isOpen) return null

  const colors = [
    { name: "Negro", value: "negro", color: "#000000" },
    { name: "Blanco", value: "blanco", color: "#FFFFFF" },
    { name: "Gris", value: "gris", color: "#808080" },
    { name: "Beige", value: "beige", color: "#D2B48C" },
    { name: "Azul", value: "azul", color: "#0066CC" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const categories = [
    { name: "Remeras", value: "remeras" },
    { name: "Pantalones", value: "pantalones" },
    { name: "Camperas", value: "camperas" },
    { name: "Buzos", value: "buzos" },
    { name: "Accesorios", value: "accesorios" },
  ]

  const seasons = [
    { name: "Primavera", value: "primavera" },
    { name: "Verano", value: "verano" },
    { name: "Otoño", value: "otoño" },
    { name: "Invierno", value: "invierno" },
  ]

  const toggleFilter = (type: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].includes(value)
        ? prev[type as keyof typeof prev].filter((item: string) => item !== value)
        : [...prev[type as keyof typeof prev], value],
    }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
    onFiltersChange(localFilters)
    onClose()
  }

  const clearFilters = () => {
    const clearedFilters = {
      colors: [],
      sizes: [],
      categories: [],
      seasons: [],
      priceRange: [0, 200000] as [number, number],
    }
    setLocalFilters(clearedFilters)
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-bold dark:text-white">Filtrar por</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="dark:text-white dark:hover:bg-gray-800">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Color Filter */}
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Color</h3>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => toggleFilter("colors", color.value)}
                    className={`w-12 h-12 border-2 transition-colors ${
                      localFilters.colors.includes(color.value)
                        ? "border-black"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Talle</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleFilter("sizes", size)}
                    className={`py-2 px-4 border transition-colors ${
                      localFilters.sizes.includes(size)
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-300 hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Categoría</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => toggleFilter("categories", category.value)}
                    className={`w-full py-2 px-4 border text-left transition-colors ${
                      localFilters.categories.includes(category.value)
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-300 hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Season Filter */}
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Estación</h3>
              <div className="space-y-2">
                {seasons.map((season) => (
                  <button
                    key={season.value}
                    onClick={() => toggleFilter("seasons", season.value)}
                    className={`w-full py-2 px-4 border text-left transition-colors ${
                      localFilters.seasons.includes(season.value)
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-300 hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:text-white"
                    }`}
                  >
                    {season.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t dark:border-gray-700 p-4 space-y-3">
            <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={applyFilters}>
              APLICAR FILTROS
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
              LIMPIAR FILTROS
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
