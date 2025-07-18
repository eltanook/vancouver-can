"use client"

import { useState, Suspense } from "react"
import { X, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"

interface CategoriesPanelProps {
  isOpen: boolean
  onClose: () => void
}

function CategoriesPanelContent({ isOpen, onClose }: CategoriesPanelProps) {
  const { getCartTotal, getCartItemsCount } = useStore()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Detectar género activo según la URL o query param
  const genderParam = searchParams.get("gender")
  const currentGender = pathname.includes("/hombre") || genderParam === "hombre" ? "hombre" : pathname.includes("/mujer") || genderParam === "mujer" ? "mujer" : undefined
  const cartTotal = getCartTotal()
  const cartItemsCount = getCartItemsCount()
  
  const [isEstacionesOpen, setIsEstacionesOpen] = useState(false)

  const categoryHref = (cat: string) =>
    currentGender ? `/resultados?gender=${currentGender}&category=${cat}` : `/resultados?category=${cat}`

  const categories = [
    { id: "remeras", name: "Remeras", href: categoryHref("remeras") },
    { id: "pantalones", name: "Pantalones", href: categoryHref("pantalones") },
    { id: "camisas", name: "Camisas", href: categoryHref("camisas") },
    { id: "camperas", name: "Camperas", href: categoryHref("camperas") },
    { id: "buzos", name: "Buzos", href: categoryHref("buzos") },
    { id: "accesorios", name: "Accesorios", href: categoryHref("accesorios") },
  ]

  const seasonHref = (sea: string) =>
    currentGender ? `/resultados?gender=${currentGender}&season=${sea}` : `/resultados?season=${sea}`

  const estaciones = [
    { id: "primavera", name: "Primavera", href: seasonHref("primavera") },
    { id: "verano", name: "Verano", href: seasonHref("verano") },
    { id: "otono", name: "Otoño", href: seasonHref("otono") },
    { id: "invierno", name: "Invierno", href: seasonHref("invierno") },
  ]

  const footerLinks = [
    { id: "inicio", name: "Inicio", href: "/" },
    { id: "como-comprar", name: "¿Cómo comprar?", href: "/como-comprar" },
    { id: "preguntas-frecuentes", name: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
    { id: "contacto", name: "Contacto", href: "/contacto" },
  ]

  const handleCategoryClick = (href: string) => {
    onClose()
    router.push(href)
  }

  const toggleEstaciones = () => {
    setIsEstacionesOpen(!isEstacionesOpen)
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-full sm:w-96 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <Link href={`/${currentGender || 'hombre'}`}>
            <img 
              src="/logo.png" 
              alt="Vancouver Canning" 
              className="h-8 w-auto logo-filter cursor-pointer"
            />
          </Link>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <X className="h-6 w-6 dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 dark:text-white">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.href)}
                  className="w-full text-left py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg dark:text-white"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-b dark:border-gray-700">
            <button
              onClick={toggleEstaciones}
              className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg dark:text-white"
            >
              <span className="font-bold text-lg">Estaciones</span>
              {isEstacionesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {isEstacionesOpen && (
              <div className="mt-2 space-y-1 pl-4">
                {estaciones.map((estacion) => (
                  <button
                    key={estacion.id}
                    onClick={() => handleCategoryClick(estacion.href)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg dark:text-white"
                  >
                    {estacion.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-4 dark:text-white">Navegación</h3>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleCategoryClick(link.href)}
                  className="w-full text-left py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg dark:text-white"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">Tu carrito</span>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 p-2 dark:text-white dark:hover:bg-gray-800"
            >
              <span className="text-sm font-medium">
                ${(cartTotal || 0) > 999999 ? `${Math.floor((cartTotal || 0) / 1000)}k` : (cartTotal || 0).toLocaleString()}
              </span>
              <div className="relative">
                <ShoppingCart className="h-4 w-4" />
                {(cartItemsCount || 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {(cartItemsCount || 0) > 9 ? "9+" : (cartItemsCount || 0)}
                  </span>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CategoriesPanel({ isOpen, onClose }: CategoriesPanelProps) {
  if (!isOpen) return null

  return (
    <Suspense fallback={
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full sm:w-96 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <img 
              src="/logo.png" 
              alt="Vancouver Canning" 
              className="h-8 w-auto logo-filter"
            />
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <X className="h-6 w-6 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    }>
      <CategoriesPanelContent isOpen={isOpen} onClose={onClose} />
    </Suspense>
  )
}
