"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative h-screen">
      {/* Background Images Only */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black">
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col sm:flex-row">
        {/* Men's Section */}
        <div className="flex-1 relative group cursor-pointer">
          {/* Background image for men */}
          <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-300">
            <img
              src="/Productos/4025108OV.jpg"
              alt="Buzo Hombre"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Gradiente overlay como en las cards de categorías */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">
              HOMBRE
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-md drop-shadow-lg">
              Descubre nuestro estilo urbano para hombre
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 text-lg"
              onClick={() => window.location.href = '/hombre'}
            >
              Ver Colección
            </Button>
          </div>
        </div>

        {/* Women's Section */}
        <div className="flex-1 relative group cursor-pointer">
          {/* Background image for women */}
          <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-300">
            <img
              src="/Productos/4001035F.png"
              alt="Buzo Mujer"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Gradiente overlay como en las cards de categorías */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">
              MUJER
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-md drop-shadow-lg">
              Encuentra tu estilo perfecto en nuestra colección
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 text-lg"
              onClick={() => window.location.href = '/mujer'}
            >
              Ver Colección
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
