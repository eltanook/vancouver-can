"use client"

import { useState, useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Menu, ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import Link from "next/link"
import CategoriesPanel from "./categories-panel"
import CartPanel from "./cart-panel"
import SearchModal from "./search-modal"
import PromoBanner from "./promo-banner"
import MobileMenu from "./mobile-menu"
import ThemeToggle from "@/components/ui/theme-toggle-wrapper"

function HeaderInternalContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { getCartTotal, getCartItemsCount, products } = useStore()
  const cartTotal = getCartTotal()
  const cartItemsCount = getCartItemsCount()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const qpGender = searchParams.get("gender")

  // Detectar género del producto si estamos en una página de producto
  const getProductGender = () => {
    if (pathname.startsWith("/producto/")) {
      const slug = pathname.split("/")[2]
      const product = products.find(p => p.slug === slug)
      return product?.gender
    }
    return null
  }

  // Lógica mejorada para determinar el género activo
  const determineActiveGender = () => {
    // 1. Prioridad: URL específica de género
    if (pathname === "/hombre" || qpGender === "hombre") return "hombre"
    if (pathname === "/mujer" || qpGender === "mujer") return "mujer"
    
    // 2. Género del producto en página de producto
    const productGender = getProductGender()
    if (productGender && productGender !== "unisex") return productGender
    
    // 3. Si hay query param de género
    if (qpGender) return qpGender
    
    // 4. Si no hay contexto específico, usar hombre por defecto
    return "hombre"
  }

  const activeGender = determineActiveGender()
  const isHombrePage = activeGender === "hombre"
  const isMujerPage = activeGender === "mujer"

  return (
    <>
      <PromoBanner />

      <header className="bg-white dark:bg-[#1f2937] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Menu hamburger button */}
            <Button variant="ghost" size="sm" onClick={() => setIsCategoriesOpen(true)} className="p-2 sm:p-3 dark:text-white dark:hover:bg-gray-800">
              <Menu className="h-6 w-6 sm:h-8 sm:w-8 dark:text-white" />
            </Button>

            {/* Logo - Ahora con imagen y link */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="md:ml-8">
                <Link href={`/${activeGender}`}>
                  <img 
                    src="/logo.png" 
                    alt="Vancouver Canning" 
                    className="h-8 sm:h-10 w-auto logo-filter cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center mr-8 space-x-4">
              <nav className="flex items-center">
                <div className="relative flex border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden">
                <a
                  href="/hombre"
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ease-in-out px-6 py-2 ${
                    isHombrePage 
                      ? "text-white bg-black dark:bg-white dark:text-black hover:text-white dark:hover:text-gray-700" 
                      : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  HOMBRE
                </a>
                <a
                  href="/mujer"
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ease-in-out px-6 py-2 ${
                    isMujerPage 
                      ? "text-white bg-black dark:bg-white dark:text-black hover:text-white dark:hover:text-gray-700" 
                      : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  MUJER
                </a>
              </div>
              </nav>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="ml-2 sm:ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-400 dark:text-white"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 p-2 relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-400 dark:text-white"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="text-xs sm:text-sm font-medium">
                  ${(cartTotal || 0) > 999999 ? `${Math.floor((cartTotal || 0) / 1000)}k` : (cartTotal || 0).toLocaleString()}
                </span>
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {(cartItemsCount || 0) > 0 && (
                    <span className="cart-counter absolute -top-3 -right-3 text-xs rounded-full w-4 h-4 flex items-center justify-center text-black font-bold text-[10px] leading-none">
                      {(cartItemsCount || 0) > 9 ? "9+" : (cartItemsCount || 0)}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Only visible on tablet/mobile */}
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-center items-center py-4 space-x-4">
              <nav className="flex justify-center">
                <div className="relative flex border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden">
                <a
                  href="/hombre"
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ease-in-out px-6 py-2 ${
                    isHombrePage 
                      ? "text-white bg-black dark:bg-white dark:text-black hover:text-white dark:hover:text-gray-700" 
                      : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  HOMBRE
                </a>
                <a
                  href="/mujer"
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ease-in-out px-6 py-2 ${
                    isMujerPage 
                      ? "text-white bg-black dark:bg-white dark:text-black hover:text-white dark:hover:text-gray-700" 
                      : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  MUJER
                </a>
              </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <CategoriesPanel isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} />
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default function HeaderInternal() {
  return (
    <Suspense fallback={
      <header className="bg-white dark:bg-[#1f2937] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="md:ml-8">
                <img 
                  src="/logo.png" 
                  alt="Vancouver Canning" 
                  className="h-8 sm:h-10 w-auto logo-filter"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    }>
      <HeaderInternalContent />
    </Suspense>
  )
}


