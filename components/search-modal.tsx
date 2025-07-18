"use client"

import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { products, setSearchTerm: setGlobalSearchTerm } = useStore()
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 8)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, products])

  const handleSearch = () => {
    setGlobalSearchTerm(searchTerm)
    onClose()
    // Redirect to search results page
    window.location.href = `/buscar?q=${encodeURIComponent(searchTerm)}`
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 w-full max-w-2xl z-50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">BUSCAR PRODUCTOS</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="dark:text-white dark:hover:bg-gray-800">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full text-lg py-4 pr-12 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            autoFocus
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 dark:text-white dark:hover:bg-gray-800"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 dark:text-white">Resultados</h3>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-sm dark:text-white">{product.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
