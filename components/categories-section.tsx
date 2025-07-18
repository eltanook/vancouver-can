"use client"

import Link from "next/link"

interface CategoriesSectionProps {
  gender?: string
}

export default function CategoriesSection({ gender }: CategoriesSectionProps) {
  const categories = [
    {
      name: "Remeras",
      image: gender === "hombre" ? "/Categorías/remeras_h.webp" : gender === "mujer" ? "/Categorías/remeras_m.webp" : "/Categorías/remeras_h.webp",
      category: "remeras",
    },
    {
      name: "Pantalones",
      image: gender === "hombre" ? "/Categorías/pantalones_h.webp" : gender === "mujer" ? "/Categorías/pantalones_m.webp" : "/Categorías/pantalones_h.webp",
      category: "pantalones",
    },
    {
      name: "Camperas",
      image: gender === "hombre" ? "/Categorías/camperas_h.webp" : gender === "mujer" ? "/Categorías/camperas_m.webp" : "/Categorías/camperas_h.webp",
      category: "camperas",
    },
    {
      name: "Buzos",
      image: gender === "hombre" ? "/Categorías/buzos_h.webp" : gender === "mujer" ? "/Categorías/buzos_m.webp" : "/Categorías/buzos_h.webp",
      category: "buzos",
    },
    {
      name: "Joggers",
      image: gender === "hombre" ? "/Categorías/joggers_h.webp" : gender === "mujer" ? "/Categorías/joggins_m.webp" : "/Categorías/joggers_h.webp",
      category: "joggers",
    },
  ]

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/resultados?${gender ? `gender=${gender}&` : ""}category=${category.category}`}
              className="group cursor-pointer"
            >
              <div className="relative bg-white dark:bg-gray-700 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradiente solo en la parte inferior para legibilidad del nombre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-medium text-xl sm:text-2xl">
                    {category.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-white transition-all duration-300 group-hover:w-24" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
