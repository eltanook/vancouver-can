"use client"

import { create } from "zustand"

interface ColorImageAssociation {
  color: { name: string; color: string; hex: string }
  images: string[]
}

export interface Product {
  id: number
  name: string
  price: number // Precio de lista (hasta 3 cuotas sin interés)
  cashPrice: number // Precio en efectivo (con descuento)
  image: string
  hoverImage: string
  slug: string
  category: string
  subcategory: string
  gender: "hombre" | "mujer" | "unisex"
  season: "primavera" | "verano" | "otoño" | "invierno"
  colors: Array<{ name: string; color: string; hex: string }>
  sizes: string[]
  description: string
  inStock: boolean
  images?: string[]
  colorImageAssociations?: ColorImageAssociation[]
  isReal?: boolean // Indica si es un producto real de la tienda
  productCode?: string // Código de referencia del producto
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

interface StoreState {
  products: Product[]
  cartItems: CartItem[]
  searchTerm: string
  sortOrder: {
    field: 'name' | 'price'
    direction: 'asc' | 'desc'
  } | null
  selectedFilters: {
    colors: string[]
    sizes: string[]
    categories: string[]
    seasons: string[]
    priceRange: [number, number]
  }
  paginationMemory: {
    [key: string]: number // Key es el path de la página, value es el número de página
  }
  addToCart: (product: Product, quantity: number, color: string, size: string) => void
  removeFromCart: (productId: number, color: string, size: string) => void
  updateQuantity: (productId: number, color: string, size: string, quantity: number) => void
  clearCart: () => void
  setSearchTerm: (term: string) => void
  setFilters: (filters: any) => void
  setSortOrder: (field: 'name' | 'price', direction: 'asc' | 'desc') => void
  savePaginationState: (path: string, page: number) => void
  getPaginationState: (path: string) => number
  clearPaginationMemory: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number
  getFilteredProducts: () => Product[]
  getProductsByCategory: (category: string, gender?: string) => Product[]
}

// Productos definitivos desde CSV - CORREGIDOS
const products: Product[] = [
  {
    "id": 1,
    "name": "BUZO ZABA",
    "price": 88600,
    "cashPrice": 68200,
    "image": "/Productos/Buzo Zaba.jpg",
    "hoverImage": "/Productos/Buzo Zaba.png",
    "slug": "buzo-zaba",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Blanco",
        "color": "blanco",
        "hex": "#FFFFFF"
      },
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "description": "Buzo oversize canguro con estampa",
    "inStock": true,
    "images": [
      "/Productos/Buzo Zaba.jpg",
      "/Productos/Buzo Zaba.png",
      "/Productos/4025108OV.jpg"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Blanco",
          "color": "blanco",
          "hex": "#FFFFFF"
        },
        "images": [
          "/Productos/Buzo Zaba.jpg",
          "/Productos/4025108OV.jpg"
        ]
      },
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/Buzo Zaba.png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4025108OV"
  },
  {
    "id": 2,
    "name": "GORRA GABARDINA",
    "price": 44500,
    "cashPrice": 34200,
    "image": "/Productos/558.png",
    "hoverImage": "/Productos/558 (1).png",
    "slug": "gorra-gabardina",
    "category": "accesorios",
    "subcategory": "gorras",
    "gender": "hombre",
    "season": "verano",
        "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      },
      {
        "name": "GRIS",
        "color": "gris",
        "hex": "#808080"
      },
      {
        "name": "MARRÓN",
        "color": "marron",
        "hex": "#8B4513"
      }
],
    "sizes": [],
    "description": "Gorra de gabardina bordada",
    "inStock": true,
    "images": [
      "/Productos/558.png",
      "/Productos/558 (1).png",
      "/Productos/558 (2).png"
],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/558.png"
        ]
      },
      {
        "color": {
          "name": "GRIS",
          "color": "gris",
          "hex": "#808080"
        },
        "images": [
          "/Productos/558 (1).png"
        ]
      },
      {
        "color": {
          "name": "MARRÓN",
          "color": "marron",
          "hex": "#8B4513"
        },
        "images": [
          "/Productos/558 (2).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "558"
  },
  {
    "id": 3,
    "name": "BUZO KAL",
    "price": 103200,
    "cashPrice": 79400,
    "image": "/Productos/4025096BF.png",
    "hoverImage": "/Productos/4025096BF (1).png",
    "slug": "buzo-kal",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      },
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      }
    ],
    "sizes": ["S", "M", "L"],
    "description": "Buzo de corte boxy fit en degrade",
    "inStock": true,
    "images": [
      "/Productos/4025096BF.png",
      "/Productos/4025096BF (1).png",
      "/Productos/4025096BF (2).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/4025096BF.png",
          "/Productos/4025096BF (2).png"
        ]
      },
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/4025096BF (1).png"
        ]
      },

    ],
    "isReal": true,
    "productCode": "4025096BF"
  },
  {
    "id": 4,
    "name": "SWEATER AGNER",
    "price": 99800,
    "cashPrice": 76800,
    "image": "/Productos/7025087.png",
    "hoverImage": "/Productos/7025087 (1).png",
    "slug": "sweater-agner",
    "category": "buzos",
    "subcategory": "sweater",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": ["S", "M", "L"],
    "description": "Sweater tejido a dos tonos",
    "inStock": true,
    "images": [
      "/Productos/7025087.png",
      "/Productos/7025087 (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/7025087.png",
          "/Productos/7025087 (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4025096BF"
  },
  {
    "id": 5,
    "name": "BUZO NOSHAQ",
    "price": 103200,
    "cashPrice": 79400,
    "image": "/Productos/4025036BF.png",
    "hoverImage": "/Productos/4025036BF (1).png",
    "slug": "buzo-noshaq",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "description": "Buzo de corte boxy fit en degrade",
    "inStock": true,
    "images": [
      "/Productos/4025036BF.png",
      "/Productos/4025036BF (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/4025036BF.png",
          "/Productos/4025036BF (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4025036BF"
  },

  {
    "id": 7,
    "name": "CAMPERA HUBBARD",
    "price": 143000,
    "cashPrice": 110000,
    "image": "/Productos/3025130.png",
    "hoverImage": "/Productos/3025130 (1).png",
    "slug": "campera-hubbard",
    "category": "camperas",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "description": "Campera estilo pufer con capucha escondida",
    "inStock": true,
    "images": [
      "/Productos/3025130.png",
      "/Productos/3025130 (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/3025130.png",
          "/Productos/3025130 (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "3025130"
  },
  {
    "id": 8,
    "name": "CAMPERA DE ABRIGO",
    "price": 101000,
    "cashPrice": 77800,
    "image": "/Productos/80016V.png",
    "hoverImage": "/Productos/80016V (1).png",
    "slug": "campera-de-abrigo",
    "category": "camperas",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Marrón",
        "color": "marron",
        "hex": "#8B4513"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "description": "Campera inflable con interior interno de frisa",
    "inStock": true,
    "images": [
      "/Productos/80016V.png",
      "/Productos/80016V (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Marrón",
          "color": "marron",
          "hex": "#8B4513"
        },
        "images": [
          "/Productos/80016V.png",
          "/Productos/80016V (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "80016V"
  },
  {
    "id": 9,
    "name": "CAMPERA BERT",
    "price": 169000,
    "cashPrice": 130000,
    "image": "/Productos/3025105.png",
    "hoverImage": "/Productos/3025105 (1).png",
    "slug": "campera-bert",
    "category": "camperas",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      },
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      }
    ],
    "sizes": [
      "M",
      "L"
    ],
    "description": "Campera tipo polar con interior de piel",
    "inStock": true,
    "images": [
      "/Productos/3025105.png",
      "/Productos/3025105 (1).png",
      "/Productos/3025105 (2).png",
      "/Productos/3025105 (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/3025105.png",
          "/Productos/3025105 (1).png"
        ]
      },
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/3025105 (2).png",
          "/Productos/3025105 (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "3025105"
  },
  {
    "id": 10,
    "name": "CAMPERA PARKA",
    "price": 169,
    "cashPrice": 130,
    "image": "/Productos/366V.jpg",
    "hoverImage": "/Productos/366V (1).jpg",
    "slug": "campera-parka",
    "category": "camperas",
    "subcategory": "parka",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
            "name": "NEGRO",
            "color": "negro",
            "hex": "#000000"
      }
],
    "sizes": ["M", "L"],
    "description": "Campera tipo parka con capucha",
    "inStock": true,
    "images": [
      "/Productos/366V.jpg",
      "/Productos/366V (1).jpg"
],
    "colorImageAssociations": [
      {
            "color": {
                  "name": "NEGRO",
                  "color": "negro",
                  "hex": "#000000"
            },
            "images": [
                  "/Productos/366V.jpg",
                  "/Productos/366V (1).jpg"
            ]
      }
    ],
    "isReal": true,
    "productCode": "366V"
  },
  {
    "id": 11,
    "name": "JOGGING MERON",
    "price": 70700,
    "cashPrice": 54400,
    "image": "/Productos/1025119.png",
    "hoverImage": "/Productos/1025119 (1).png",
    "slug": "jogging-meron",
    "category": "pantalones",
    "subcategory": "jogging",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      },
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "description": "Jogging de frisa con botamanga regulable",
    "inStock": true,
    "images": [
      "/Productos/1025119.png",
      "/Productos/1025119 (1).png",
      "/Productos/1025119 (2).png",
      "/Productos/1025119 (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/1025119.png",
          "/Productos/1025119 (1).png"
        ]
      },
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/1025119 (2).png",
          "/Productos/1025119 (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025119"
  },
  {
    "id": 12,
    "name": "JEAN SANT",
    "price": 80300,
    "cashPrice": 61800,
    "image": "/Productos/1025057.png",
    "hoverImage": "/Productos/1025057 (1).png",
    "slug": "jean-sant",
    "category": "jeans",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Celeste",
        "color": "celeste",
        "hex": "#87CEEB"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "description": "Jean mom clasico 100% denim",
    "inStock": true,
    "images": [
      "/Productos/1025057.png",
      "/Productos/1025057 (1).png",
      "/Productos/1025057 (2).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Celeste",
          "color": "celeste",
          "hex": "#87CEEB"
        },
        "images": [
          "/Productos/1025057.png",
          "/Productos/1025057 (1).png",
          "/Productos/1025057 (2).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025057"
  },
  {
    "id": 14,
    "name": "CARGO CABOX",
    "price": 108100,
    "cashPrice": 83200,
    "image": "/Productos/1025132.jpg",
    "hoverImage": "/Productos/1025132.jpg",
    "slug": "cargo-cabox",
    "category": "pantalones",
    "subcategory": "cargo",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Blanco",
        "color": "blanco",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "description": "cargo con cintura elastizada  de microfibra",
    "inStock": true,
    "images": [
      "/Productos/1025132.jpg"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Blanco",
          "color": "blanco",
          "hex": "#FFFFFF"
        },
        "images": [
          "/Productos/1025132.jpg"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025132"
  },
  {
    "id": 15,
    "name": "CARGO ROBSON",
    "price": 108100,
    "cashPrice": 83200,
    "image": "/Productos/1025131.jpg",
    "hoverImage": "/Productos/1025131 (1).jpg",
    "slug": "cargo-robson",
    "category": "pantalones",
    "subcategory": "cargo",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "description": "cargo con cintura elastizada  de microfibra",
    "inStock": true,
    "images": [
      "/Productos/1025131.jpg",
      "/Productos/1025131 (1).jpg"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/1025131.jpg",
          "/Productos/1025131 (1).jpg"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025131"
  },
  {
    "id": 17,
    "name": "PERFUMES",
    "price": 49900,
    "cashPrice": 38400,
    "image": "/Productos/695.png",
    "hoverImage": "/Productos/695.png",
    "slug": "perfumes",
    "category": "accesorios",
    "subcategory": "perfumes",
    "gender": "hombre",
    "season": "verano",
    "colors": [],
    "sizes": [],
    "description": "Perfumes de 100ml",
    "inStock": true,
    "images": [
      "/Productos/695.png"
    ],
    "colorImageAssociations": [],
    "isReal": true,
    "productCode": "695"
  },
  {
    "id": 18,
    "name": "CINTOS",
    "price": 36400,
    "cashPrice": 28000,
    "image": "/Productos/671.webp",
    "hoverImage": "/Productos/671.webp",
    "slug": "cintos",
    "category": "accesorios",
    "subcategory": "cintos",
    "gender": "hombre",
    "season": "verano",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "95",
      "100",
      "105"
    ],
    "description": "Cintos 100% de cuero",
    "inStock": true,
    "images": [
      "/Productos/671.webp"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/671.webp"
        ]
      }
    ],
    "isReal": true,
    "productCode": "671"
  },

  {
    "id": 20,
    "name": "BOXER",
    "price": 54300,
    "cashPrice": 41800,
    "image": "/Productos/94.png",
    "hoverImage": "/Productos/94.png",
    "slug": "boxer",
    "category": "accesorios",
    "subcategory": "ropa-interior",
    "gender": "hombre",
    "season": "verano",
    "colors": [
      {
            "name": "Negro",
            "color": "negro",
            "hex": "#000000"
      }
],
    "sizes": ["S", "M", "L", "XL"],
    "description": "Boxer de algodón cómodo y transpirable",
    "inStock": true,
    "images": [
      "/Productos/94.png"
],
    "colorImageAssociations": [
      {
            "color": {
                  "name": "Negro",
                  "color": "negro",
                  "hex": "#000000"
            },
            "images": [
                  "/Productos/94.png"
            ]
      }
],
    "isReal": true,
    "productCode": "558"
  },
  {
    "id": 21,
    "name": "RIÑONERA",
    "price": 54300,
    "cashPrice": 41800,
    "image": "/Productos/002.png",
    "hoverImage": "/Productos/002.png",
    "slug": "rionera",
    "category": "accesorios",
    "subcategory": "bolsos",
    "gender": "hombre",
    "season": "verano",
    "colors": [
      {
        "name": "Verde",
        "color": "verde",
        "hex": "#228B22"
      }
    ],
    "sizes": [],
    "description": "Riñonera amplia con compartimentos",
    "inStock": true,
    "images": [
      "/Productos/002.png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Verde",
          "color": "verde",
          "hex": "#228B22"
        },
        "images": [
          "/Productos/002.png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "2"
  },
  {
    "id": 22,
    "name": "BUZO CHULI",
    "price": 88600,
    "cashPrice": 68200,
    "image": "/Productos/4025098OV (1).png",
    "hoverImage": "/Productos/4025098OV (2).png",
    "slug": "buzo-chuli",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Marrón",
        "color": "marron",
        "hex": "#8B4513"
      },
      {
        "name": "Blanco",
        "color": "blanco",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "description": "Buzo canguro de frisa estampado",
    "inStock": true,
    "images": [
      "/Productos/4025098OV (1).png",
      "/Productos/4025098OV (2).png",
      "/Productos/4025098OV (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Marrón",
          "color": "marron",
          "hex": "#8B4513"
        },
        "images": [
          "/Productos/4025098OV (1).png"
        ]
      },
      {
        "color": {
          "name": "Blanco",
          "color": "blanco",
          "hex": "#FFFFFF"
        },
        "images": [
          "/Productos/4025098OV (2).png",
          "/Productos/4025098OV (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4025098OV"
  },
  {
    "id": 23,
    "name": "CAMPERA TARA",
    "price": 125000,
    "cashPrice": 96000,
    "image": "/Productos/3025097.png",
    "hoverImage": "/Productos/3025097 (1).png",
    "slug": "campera-tara",
    "category": "camperas",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "invierno",
    "colors": [
      {
        "name": "Marrón",
        "color": "marron",
        "hex": "#8B4513"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "description": "Campera corderoy con capucha, interior de corderito",
    "inStock": true,
    "images": [
      "/Productos/3025097.png",
      "/Productos/3025097 (1).png",
      "/Productos/3025097 (2).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Marrón",
          "color": "marron",
          "hex": "#8B4513"
        },
        "images": [
          "/Productos/3025097.png",
          "/Productos/3025097 (1).png",
          "/Productos/3025097 (2).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "3025097"
  },
  {
    "id": 24,
    "name": "JEAN ROUND",
    "price": 80300,
    "cashPrice": 61800,
    "image": "/Productos/1025114.png",
    "hoverImage": "/Productos/1025114 (1).png",
    "slug": "jean-round",
    "category": "jeans",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "description": "Jean baggy negro desgastado bolsillos grandes",
    "inStock": true,
    "images": [
      "/Productos/1025114.png",
      "/Productos/1025114 (1).png",
      "/Productos/1025114 (2).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/1025114.png",
          "/Productos/1025114 (1).png",
          "/Productos/1025114 (2).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025114"
  },
  {
    "id": 25,
    "name": "REMERA TOJA",
    "price": 42900,
    "cashPrice": 33000,
    "image": "/Productos/5025125OV.png",
    "hoverImage": "/Productos/5025125OV (1).png",
    "slug": "remera-toja",
    "category": "remeras",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "verano",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      },
      {
        "name": "Gris",
        "color": "gris",
        "hex": "#808080"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "description": "Remera oversize con tela de micropiqué",
    "inStock": true,
    "images": [
      "/Productos/5025125OV.png",
      "/Productos/5025125OV (1).png",
      "/Productos/5025125OV (2).png",
      "/Productos/5025125OV (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/5025125OV.png",
          "/Productos/5025125OV (1).png"
        ]
      },
      {
        "color": {
          "name": "Gris",
          "color": "gris",
          "hex": "#808080"
        },
        "images": [
          "/Productos/5025125OV (2).png",
          "/Productos/5025125OV (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "5025125OV"
  },
  {
    "id": 26,
    "name": "REMERA CATE",
    "price": 42900,
    "cashPrice": 33000,
    "image": "/Productos/5025126R.png",
    "hoverImage": "/Productos/5025126R (1).png",
    "slug": "remera-cate",
    "category": "remeras",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "verano",
    "colors": [
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      },
      {
        "name": "Gris",
        "color": "gris",
        "hex": "#808080"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "description": "Remera de micropiqué de corte regular",
    "inStock": true,
    "images": [
      "/Productos/5025126R.png",
      "/Productos/5025126R (1).png",
      "/Productos/5025126R (2).png",
      "/Productos/5025126R (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/5025126R.png",
          "/Productos/5025126R (1).png"
        ]
      },
      {
        "color": {
          "name": "Gris",
          "color": "gris",
          "hex": "#808080"
        },
        "images": [
          "/Productos/5025126R (2).png",
          "/Productos/5025126R (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "5025126R"
  },
  {
    "id": 27,
    "name": "PANTALON CARGO",
    "price": 108100,
    "cashPrice": 83200,
    "image": "/Productos/P02.jpg",
    "hoverImage": "/Productos/P02.png",
    "slug": "pantalon-cargo",
    "category": "pantalones",
    "subcategory": "cargo",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Gris",
        "color": "gris",
        "hex": "#808080"
      }
    ],
    "sizes": [
      "40",
      "42",
      "44",
      "46"
    ],
    "description": "Cargo de gabardina con multiples bolsillos",
    "inStock": true,
    "images": [
      "/Productos/P02.jpg",
      "/Productos/P02.png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Gris",
          "color": "gris",
          "hex": "#808080"
        },
        "images": [
          "/Productos/P02.jpg",
          "/Productos/P02.png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "P02"
  },
  {
    "id": 28,
    "name": "JEAN KOFEL",
    "price": 88600,
    "cashPrice": 68200,
    "image": "/Productos/1025064.png",
    "hoverImage": "/Productos/1025064 (1).png",
    "slug": "jean-kofel",
    "category": "jeans",
    "subcategory": "basic",
    "gender": "hombre",
    "season": "primavera",
    "colors": [
      {
        "name": "Gris",
        "color": "gris",
        "hex": "#808080"
      }
    ],
    "sizes": [
      "40",
      "42",
      "44",
      "46"
    ],
    "description": "Jean recto, detalles limpios, ruedo ancho",
    "inStock": true,
    "images": [
      "/Productos/1025064.png",
      "/Productos/1025064 (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Gris",
          "color": "gris",
          "hex": "#808080"
        },
        "images": [
          "/Productos/1025064.png",
          "/Productos/1025064 (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025064"
  },
  {
    "id": 29,
    "name": "BUZO COLORS",
    "price": 37400,
    "cashPrice": 28800,
    "image": "/Productos/4023115D.png",
    "hoverImage": "/Productos/4023115D (1).png",
    "slug": "buzo-colors",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "mujer",
    "season": "invierno",
    "colors": [
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      },
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "description": "Corto de frisa, canchero, Fit relajado",
    "inStock": true,
    "images": [
      "/Productos/4023115D.png",
      "/Productos/4023115D (1).png",
      "/Productos/4023115D (2).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/4023115D.png",
          "/Productos/4023115D (1).png"
        ]
      },
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/4023115D (2).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4023115D"
  },
  {
    "id": 30,
    "name": "BUZO HOREB",
    "price": 59500,
    "cashPrice": 45800,
    "image": "/Productos/4001037F.png",
    "hoverImage": "/Productos/4001037F (1).png",
    "slug": "buzo-horeb",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "mujer",
    "season": "invierno",
    "colors": [
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "description": "Buzo de frisa, cuello redondo, fit relajado",
    "inStock": true,
    "images": [
      "/Productos/4001037F.png",
      "/Productos/4001037F (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/4001037F.png",
          "/Productos/4001037F (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4001037F"
  },
  {
    "id": 31,
    "name": "BUZO KAN",
    "price": 84500,
    "cashPrice": 65000,
    "image": "/Productos/4001035F.png",
    "hoverImage": "/Productos/4001035F (1).png",
    "slug": "buzo-kan",
    "category": "buzos",
    "subcategory": "basic",
    "gender": "mujer",
    "season": "invierno",
    "colors": [
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      },
      {
        "name": "Marrón",
        "color": "marron",
        "hex": "#8B4513"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "description": "Hoodie de frisa, detalles premium y capucha amplia",
    "inStock": true,
    "images": [
      "/Productos/4001035F.png",
      "/Productos/4001035F (1).png",
      "/Productos/4001035F (2).png",
      "/Productos/4001035F (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/4001035F.png",
          "/Productos/4001035F (1).png"
        ]
      },
      {
        "color": {
          "name": "Marrón",
          "color": "marron",
          "hex": "#8B4513"
        },
        "images": [
          "/Productos/4001035F (2).png",
          "/Productos/4001035F (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "4001035F"
  },
  {
    "id": 32,
    "name": "CARGO EIGER",
    "price": 84500,
    "cashPrice": 65,
    "image": "/Productos/1025028F.png",
    "hoverImage": "/Productos/1025028F (1).png",
    "slug": "cargo-eiger",
    "category": "pantalones",
    "subcategory": "cargo",
    "gender": "mujer",
    "season": "primavera",
    "colors": [
      {
        "name": "Beige",
        "color": "beige",
        "hex": "#D2B48C"
      },
      {
        "name": "Negro",
        "color": "negro",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42"
    ],
    "description": "Pantalon de gabardina, modelo tipo cargo",
    "inStock": true,
    "images": [
      "/Productos/1025028F.png",
      "/Productos/1025028F (1).png",
      "/Productos/1025028F (2).png",
      "/Productos/1025028F (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Beige",
          "color": "beige",
          "hex": "#D2B48C"
        },
        "images": [
          "/Productos/1025028F.png",
          "/Productos/1025028F (1).png"
        ]
      },
      {
        "color": {
          "name": "Negro",
          "color": "negro",
          "hex": "#000000"
        },
        "images": [
          "/Productos/1025028F (2).png",
          "/Productos/1025028F (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1025028F"
  },
  {
    "id": 33,
    "name": "JEAN DOWEL",
    "price": 88600,
    "cashPrice": 68200,
    "image": "/Productos/1001031F.png",
    "hoverImage": "/Productos/1001031F (1).png",
    "slug": "jean-dowel",
    "category": "jeans",
    "subcategory": "basic",
    "gender": "mujer",
    "season": "primavera",
    "colors": [
      {
        "name": "Marrón",
        "color": "marron",
        "hex": "#8B4513"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42"
    ],
    "description": "Jean habano con estructura y lavado acid wash",
    "inStock": true,
    "images": [
      "/Productos/1001031F.png",
      "/Productos/1001031F (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Marrón",
          "color": "marron",
          "hex": "#8B4513"
        },
        "images": [
          "/Productos/1001031F.png",
          "/Productos/1001031F (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1001031F"
  },
  {
    "id": 34,
    "name": "JEAN RIMO",
    "price": 83200,
    "cashPrice": 64000,
    "image": "/Productos/1001026F.png",
    "hoverImage": "/Productos/1001026F (1).png",
    "slug": "jean-rimo",
    "category": "jeans",
    "subcategory": "basic",
    "gender": "mujer",
    "season": "primavera",
    "colors": [
      {
        "name": "Celeste",
        "color": "celeste",
        "hex": "#87CEEB"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42"
    ],
    "description": "Jean clasico, recto con detalles que lo sacan de lo común",
    "inStock": true,
    "images": [
      "/Productos/1001026F.png",
      "/Productos/1001026F (1).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Celeste",
          "color": "celeste",
          "hex": "#87CEEB"
        },
        "images": [
          "/Productos/1001026F.png",
          "/Productos/1001026F (1).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1001026F"
  },
  {
    "id": 35,
    "name": "JEAN SALK",
    "price": 81100,
    "cashPrice": 62400,
    "image": "/Productos/1001011F.png",
    "hoverImage": "/Productos/1001011F (1).png",
    "slug": "jean-salk",
    "category": "jeans",
    "subcategory": "basic",
    "gender": "mujer",
    "season": "primavera",
    "colors": [
      {
        "name": "Azul",
        "color": "azul",
        "hex": "#1E40AF"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "description": "Jean con un corte baggy, ajustado a la cintura",
    "inStock": true,
    "images": [
      "/Productos/1001011F.png",
      "/Productos/1001011F (1).png",
      "/Productos/1001011F (2).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "Azul",
          "color": "azul",
          "hex": "#1E40AF"
        },
        "images": [
          "/Productos/1001011F.png",
          "/Productos/1001011F (1).png",
          "/Productos/1001011F (2).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "1001011F"
  },
  {
    "id": 36,
    "name": "GORRA BORDADA",
    "price": 44500,
    "cashPrice": 34200,
    "image": "/Productos/558 (3).png",
    "hoverImage": "/Productos/558 (3).png",
    "slug": "gorra-bordada",
    "category": "accesorios",
    "subcategory": "gorras",
    "gender": "hombre",
    "season": "verano",
    "colors": [
      {
        "name": "GRIS",
        "color": "gris",
        "hex": "#808080"
      }
    ],
    "sizes": [],
    "description": "Gorra bordada de gabardina con diseño exclusivo",
    "inStock": true,
    "images": [
      "/Productos/558 (3).png"
    ],
    "colorImageAssociations": [
      {
        "color": {
          "name": "GRIS",
          "color": "gris",
          "hex": "#808080"
        },
        "images": [
          "/Productos/558 (3).png"
        ]
      }
    ],
    "isReal": true,
    "productCode": "558B"
  }
]

export const useStore = create<StoreState>((set, get) => ({
  products,
  cartItems: [],
  searchTerm: "",
  sortOrder: null,
  selectedFilters: {
    colors: [],
    sizes: [],
    categories: [],
    seasons: [],
    priceRange: [0, 1000000],
  },
  paginationMemory: {},

  addToCart: (product, quantity, color, size) => {
    // Validar que todos los parámetros sean válidos
    if (!product || !product.id) {
      console.error('Producto inválido para agregar al carrito')
      return
    }
    
    const validQuantity = Math.max(1, Math.min(quantity || 1, 10))
    const validColor = color || 'default'
    const validSize = size || 'default'
    
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id && item.selectedColor === validColor && item.selectedSize === validSize,
      )

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + validQuantity, 10)
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id && item.selectedColor === validColor && item.selectedSize === validSize
              ? { ...item, quantity: newQuantity }
              : item,
          ),
        }
      }

      return {
        cartItems: [...state.cartItems, { product, quantity: validQuantity, selectedColor: validColor, selectedSize: validSize }],
      }
    })
  },

  removeFromCart: (productId, color, size) => {
    const validColor = color || 'default'
    const validSize = size || 'default'
    
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !(item.product.id === productId && item.selectedColor === validColor && item.selectedSize === validSize),
      ),
    }))
  },

  updateQuantity: (productId, color, size, quantity) => {
    const validQuantity = Math.max(1, Math.min(quantity || 1, 10))
    const validColor = color || 'default'
    const validSize = size || 'default'
    
    if (validQuantity <= 0) {
      get().removeFromCart(productId, validColor, validSize)
      return
    }

    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId && item.selectedColor === validColor && item.selectedSize === validSize
          ? { ...item, quantity: validQuantity }
          : item,
      ),
    }))
  },

  clearCart: () => set({ cartItems: [] }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setFilters: (filters) => set({ selectedFilters: filters }),

  setSortOrder: (field, direction) => {
    set({ sortOrder: { field, direction } })
  },

  savePaginationState: (path, page) => {
    set((state) => ({
      paginationMemory: {
        ...state.paginationMemory,
        [path]: page
      }
    }))
  },

  getPaginationState: (path) => {
    const { paginationMemory } = get()
    return paginationMemory[path] || 1
  },

  clearPaginationMemory: () => set({ paginationMemory: {} }),

  getCartTotal: () => {
    const { cartItems } = get()
    return cartItems.reduce((total, item) => {
      const price = item.product.cashPrice || item.product.price || 0
      const quantity = item.quantity || 0
      return total + (price * quantity)
    }, 0)
  },

  getCartItemsCount: () => {
    const { cartItems } = get()
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0)
  },

  getFilteredProducts: () => {
    const { products, searchTerm, selectedFilters, sortOrder } = get()
    
    let filtered = products.filter((product) => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      if (selectedFilters.colors.length > 0) {
        const hasColor = product.colors.some(color => selectedFilters.colors.includes(color.color))
        if (!hasColor) return false
      }
      
      if (selectedFilters.sizes.length > 0) {
        const hasSize = product.sizes.some(size => selectedFilters.sizes.includes(size))
        if (!hasSize) return false
      }
      
      if (selectedFilters.categories.length > 0) {
        if (!selectedFilters.categories.includes(product.category)) return false
      }
      
      if (selectedFilters.seasons.length > 0) {
        if (!selectedFilters.seasons.includes(product.season)) return false
      }
      
      if (product.price < selectedFilters.priceRange[0] || product.price > selectedFilters.priceRange[1]) {
        return false
      }
      
      return true
    })
    
    if (sortOrder) {
      filtered.sort((a, b) => {
        const aValue = sortOrder.field === 'name' ? a.name : a.price
        const bValue = sortOrder.field === 'name' ? b.name : b.price
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        } else {
          return sortOrder.direction === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
        }
      })
    }
    
    return filtered
  },

  getProductsByCategory: (category, gender) => {
    const { products } = get()
    return products.filter(product => {
      const matchesCategory = product.category === category
      const matchesGender = !gender || product.gender === gender || product.gender === 'unisex'
      return matchesCategory && matchesGender
    })
  },
}))
