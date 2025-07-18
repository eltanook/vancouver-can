"use client"

import { useState } from "react"
import { Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MobileMenu from "./mobile-menu"
import CategoriesPanel from "./categories-panel"
import CartPanel from "./cart-panel"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <header className="bg-white text-black sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Menu hamburger button - ARREGLADO */}
            <Button
              variant="ghost"
              size="sm"
              className="text-black hover:bg-gray-100"
              onClick={() => setIsCategoriesOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo centrado - Ahora con imagen y link */}
            <div className="flex-1 flex justify-center">
              <Link href="/#main">
                <img 
                  src="/logo.png" 
                  alt="Vancouver Canning" 
                  className="h-10 w-auto logo-filter cursor-pointer"
                />
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-black hover:bg-gray-100"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="text-sm font-medium">$0</span>
                <ShoppingCart className="h-4 w-4" />
                <span className="bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <CategoriesPanel isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} />
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
