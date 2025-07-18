"use client"

import { useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, User, ShoppingCart, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useStore } from "@/lib/store"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenuContent({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { products } = useStore()
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

  // Lógica para determinar el género activo
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

  if (!isOpen) return null

  const menuItems = [
    "HOMBRE",
    "REMERAS",
    "PANTALONES",
    "CAMISAS",
    "CAMPERAS",
    "BUZOS",
    "CALZADO",
    "ACCESORIOS",
    "MUJER",
    "COLECCIÓN",
  ]

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href={`/${activeGender}`}>
            <img 
              src="/logo.png" 
              alt="Vancouver Canning" 
              className="h-8 w-auto logo-filter cursor-pointer"
            />
          </Link>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* User section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4" />
            <span>Ingresar | Registrarse</span>
          </div>
        </div>

        {/* Cart */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">$0</span>
            <ShoppingCart className="h-4 w-4" />
            <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </div>
        </div>

        {/* Menu items */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b">
              <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                <span className="font-medium">{item}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="p-4 border-t">
          <div className="flex justify-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
              <span className="text-xs font-bold">FB</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
              <span className="text-xs font-bold">IG</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
              <span className="text-xs font-bold">TW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <img 
              src="/logo.png" 
              alt="Vancouver Canning" 
              className="h-8 w-auto logo-filter"
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    }>
      <MobileMenuContent isOpen={isOpen} onClose={onClose} />
    </Suspense>
  )
}
