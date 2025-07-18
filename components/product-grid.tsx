"use client"

import Link from "next/link"

interface ProductGridProps {
  filter?: string
}

export default function ProductGrid({ filter = "todos" }: ProductGridProps) {
  const allProducts = [
    {
      id: 1,
      name: "REMERA VANCOUVER",
      price: 45000,
      image: "/placeholder.svg?height=400&width=300",
      slug: "remera-vancouver",
      gender: "hombre",
    },
    {
      id: 2,
      name: "PANTALÓN CARGO",
      price: 85000,
      image: "/placeholder.svg?height=400&width=300",
      slug: "pantalon-cargo",
      gender: "hombre",
    },
    {
      id: 3,
      name: "CAMPERA TARA",
      price: 125000,
      image: "/placeholder.svg?height=400&width=300",
      slug: "campera-tara",
      gender: "hombre",
    },
    {
      id: 4,
      name: "BLUSA ELEGANTE",
      price: 65000,
      image: "/placeholder.svg?height=400&width=300",
      slug: "blusa-elegante",
      gender: "mujer",
    },
    {
      id: 5,
      name: "VESTIDO CASUAL",
      price: 75000,
      image: "/placeholder.svg?height=400&width=300",
      slug: "vestido-casual",
      gender: "mujer",
    },
    {
      id: 6,
      name: "JEAN SKINNY",
      price: 95000,
      image: "/placeholder.svg?height=400&width=300",
      slug: "jean-skinny",
      gender: "mujer",
    },
  ]

  // Filtrar productos según el filtro seleccionado
  const filteredProducts = filter === "todos" ? allProducts : allProducts.filter((product) => product.gender === filter)

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/producto/${product.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                <p className="font-bold">${product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
