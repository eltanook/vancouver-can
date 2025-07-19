"use client"

import { useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { useStore } from "@/lib/store"

function FooterContent() {
  const [email, setEmail] = useState("")
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

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Logo - Ahora con imagen */}
            <div>
              <div className="flex justify-center mb-8">
                <Link href={`/${activeGender}`}>
                  <img 
                    src="/logo.png" 
                    alt="Vancouver Canning" 
                    className="h-12 w-auto logo-original cursor-pointer"
                  />
                </Link>
              </div>
              {/* Social Media - Movido más a la derecha */}
              <div className="flex space-x-3 justify-center md:justify-center">
                <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <Facebook className="h-5 w-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <Instagram className="h-5 w-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <Youtube className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <Link href="/" className="block hover:text-white transition-colors">
                  Inicio
                </Link>
                <Link href="/catalogo" className="block hover:text-white transition-colors">
                  Catálogo
                </Link>
                <Link href="/tienda" className="block hover:text-white transition-colors">
                  Ver Todos
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Carrito
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+54 9 11 3281-5864</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Mariano Castex 1257 / 77<br />Local 117 Shopping Plaza Canning<br />Canning, Buenos Aires</span>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold mb-4">Atención al cliente</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <Link href="/como-comprar" className="block hover:text-white transition-colors">
                  Cómo comprar
                </Link>
                <Link href="/preguntas-frecuentes" className="block hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
                <Link href="/contacto" className="block hover:text-white transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vancouver Canning. Todos los derechos reservados.</p>
          <p className="mt-2">
            Desarrollado por{" "}
            <a 
              href="https://nexiumsolutions.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              Nexium Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Footer() {
  return (
    <Suspense fallback={
      <footer className="bg-black text-white">
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              <div>
                <div className="flex justify-center mb-8">
                  <img 
                    src="/logo.png" 
                    alt="Vancouver Canning" 
                    className="h-12 w-auto logo-original"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Vancouver Canning. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    }>
      <FooterContent />
    </Suspense>
  )
}
