"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Shield,
  Thermometer,
  Wind,
  RotateCcw,
  Shirt,
  Droplets,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import Link from "next/link";

interface ProductDetailProps {
  slug: string;
}

function ProductDetailContent({ slug }: ProductDetailProps) {
  const { addToCart, products } = useStore();
  const { showToast, ToastContainer } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Find product by slug
  const product = products.find((p) => p.slug === slug) || {
    id: 1,
    name: "CAMPERA TARA",
    price: 125000,
    cashPrice: 93750, // 25% de descuento del precio de lista
    code: "3025007##",
    categories: ["Abrigos", "Camperas", "Hombre"],
    description:
      "Campera Tara: corderoy con impronta retro. Una campera que revive lo clásico con onda moderna. El corte recto, la capucha simple y el cierre metálico le dan una estructura limpia, mientras que la textura de corderoy con interior de corderito la vuelve abrigada sin perder estilo. Tiene bolsillos plaque con snaps y un aplique trasero que suma detalle sin estridencias.",
    images: Array.from(
      { length: 8 },
      (_, i) => `/placeholder.svg?height=600&width=400&text=Vista+${i + 1}`
    ),
    colors: [
      { name: "beige", color: "beige", hex: "#D2B48C" },
      { name: "negro", color: "negro", hex: "#000000" },
      { name: "blanco", color: "blanco", hex: "#FFFFFF" },
      { name: "azul", color: "azul", hex: "#1E40AF" },
    ],
    sizes: ["S", "M", "L", "XL"],
    gender: "hombre" as const,
    category: "camperas",
    subcategory: "camperas",
    image: "/placeholder.svg?height=600&width=400",
    hoverImage: "/placeholder.svg?height=600&width=400",
    inStock: true,
    colorImageAssociations: [],
  };

  // Estados para el manejo de colores e imágenes
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.color || "beige"
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Función para obtener imágenes del color seleccionado
  const getCurrentColorImages = () => {
    if (
      !product.colorImageAssociations ||
      product.colorImageAssociations.length === 0
    ) {
      return product.images || [];
    }

    const currentColorAssociation = product.colorImageAssociations.find(
      (assoc) => assoc.color.color === selectedColor
    );

    if (!currentColorAssociation) {
      return product.images || [];
    }

    // Aplicar el mismo ordenamiento por jerarquía
    const sortImagesByHierarchy = (images: string[]) => {
      return images.sort((a, b) => {
        const aMatch = a.match(/\((\d+)\)/);
        const bMatch = b.match(/\((\d+)\)/);

        // Si a no tiene número y b sí, a va primero
        if (!aMatch && bMatch) return -1;
        // Si b no tiene número y a sí, b va primero
        if (aMatch && !bMatch) return 1;
        // Si ambos no tienen números, orden alfabético
        if (!aMatch && !bMatch) return a.localeCompare(b);
        // Si ambos tienen números, ordenar por número
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      });
    };

    return sortImagesByHierarchy(currentColorAssociation.images);
  };

  // Función para obtener todas las imágenes con información de color
  const getAllImagesWithColors = () => {
    if (
      !product.colorImageAssociations ||
      product.colorImageAssociations.length === 0
    ) {
      return (product.images || []).map((img) => ({
        url: img,
        color: product.colors?.[0]?.color || "default",
        colorName: product.colors?.[0]?.name || "Default",
      }));
    }

    const allImages: Array<{ url: string; color: string; colorName: string }> =
      [];

    // Función para ordenar imágenes por jerarquía (nombre, nombre (1), nombre (2), etc.)
    const sortImagesByHierarchy = (images: string[]) => {
      return images.sort((a, b) => {
        const aMatch = a.match(/\((\d+)\)/);
        const bMatch = b.match(/\((\d+)\)/);

        // Si a no tiene número y b sí, a va primero
        if (!aMatch && bMatch) return -1;
        // Si b no tiene número y a sí, b va primero
        if (aMatch && !bMatch) return 1;
        // Si ambos no tienen números, orden alfabético
        if (!aMatch && !bMatch) return a.localeCompare(b);
        // Si ambos tienen números, ordenar por número
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      });
    };

    // Ordenar asociaciones por color para consistencia
    const sortedAssociations = product.colorImageAssociations.sort((a, b) =>
      a.color.color.localeCompare(b.color.color)
    );

    sortedAssociations.forEach((assoc) => {
      const sortedImages = sortImagesByHierarchy(assoc.images);
      sortedImages.forEach((img) => {
        allImages.push({
          url: img,
          color: assoc.color.color,
          colorName: assoc.color.name,
        });
      });
    });

    return allImages;
  };

  // Función para encontrar el color de una imagen específica
  const findColorForImage = (imageUrl: string) => {
    if (
      !product.colorImageAssociations ||
      product.colorImageAssociations.length === 0
    ) {
      return selectedColor;
    }

    for (const assoc of product.colorImageAssociations) {
      if (assoc.images.includes(imageUrl)) {
        return assoc.color.color;
      }
    }

    return selectedColor;
  };

  // Manejar cambio de color
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    setSelectedImage(0); // Resetear a la primera imagen del nuevo color
  };

  // Manejar cambio de imagen (con actualización automática de color)
  const handleImageChange = (imageIndex: number) => {
    const allImages = getAllImagesWithColors();
    const selectedImageData = allImages[imageIndex];

    if (selectedImageData) {
      const imageColor = selectedImageData.color;

      // Si la imagen pertenece a un color diferente, actualizar el color
      if (imageColor !== selectedColor) {
        setSelectedColor(imageColor);
      }

      // Encontrar el índice relativo dentro del color específico
      const colorImages = getCurrentColorImages();
      const colorImageIndex = colorImages.findIndex(
        (img) => img === selectedImageData.url
      );

      setSelectedImage(colorImageIndex >= 0 ? colorImageIndex : 0);
    }
  };

  // Efecto para actualizar imagen cuando cambia el color
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedColor]);

  // Función para manejar el botón de atrás
  const handleBackButton = () => {
    const referrer = document.referrer;
    const currentPath = window.location.pathname;

    // Si venimos de una página específica del sitio
    if (referrer && referrer.includes(window.location.origin)) {
      // Intentar volver a la página anterior
      router.back();
    } else {
      // Si no hay referrer o es externo, ir a la página principal del género
      const genderPath = product.gender === "hombre" ? "/hombre" : "/mujer";
      router.push(genderPath);
    }
  };

  // Función para obtener productos relacionados reales
  const getRelatedProducts = () => {
    const allProducts = products.filter((p) => p.id !== product.id);

    // Filtrar por mismo género
    const sameGenderProducts = allProducts.filter(
      (p) => p.gender === product.gender
    );

    // Priorizar productos de categorías complementarias
    const complementaryCategories = {
      pantalones: ["remeras", "buzos", "camperas"],
      jeans: ["remeras", "buzos", "camperas"],
      remeras: ["pantalones", "jeans", "camperas"],
      buzos: ["pantalones", "jeans"],
      camperas: ["remeras", "pantalones", "jeans", "buzos"],
      accesorios: ["remeras", "pantalones", "jeans", "buzos", "camperas"],
    };

    const currentCategory = product.category?.toLowerCase();
    const complementaries =
      complementaryCategories[
        currentCategory as keyof typeof complementaryCategories
      ] || [];

    // Buscar productos complementarios
    const complementaryProducts = sameGenderProducts.filter((p) =>
      complementaries.includes(p.category?.toLowerCase() || "")
    );

    // Si no hay suficientes productos complementarios, agregar otros del mismo género
    const otherSameGenderProducts = sameGenderProducts.filter(
      (p) => !complementaries.includes(p.category?.toLowerCase() || "")
    );

    // Combinar y tomar máximo 4 productos
    const allRelatedProducts = [
      ...complementaryProducts,
      ...otherSameGenderProducts,
    ];

    return allRelatedProducts.slice(0, 4).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      image: p.image,
      price: p.price,
      category: p.category,
    }));
  };

  const relatedProducts = getRelatedProducts();

  const careInstructions = [
    {
      icon: <Thermometer className="h-4 w-4" />,
      text: "LAVAR A MÁQUINA MAX 30°C CENTRIFUGADO CORTO",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      text: "NO USAR LEJÍA / BLANQUEADOR",
    },
    {
      icon: <Thermometer className="h-4 w-4" />,
      text: "PLANCHAR MÁXIMO 110°C",
    },
    {
      icon: <Wind className="h-4 w-4" />,
      text: "SE PUEDE USAR SECADORA TEMPERATURA REDUCIDA",
    },
    { icon: <RotateCcw className="h-4 w-4" />, text: "NO LAVAR EN SECO" },
    { icon: <Shirt className="h-4 w-4" />, text: "NO USAR PLANCHA DE VAPOR" },
    {
      icon: <Droplets className="h-4 w-4" />,
      text: "NO USAR DETERGENTES CON ENZIMAS",
    },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    showToast("Producto agregado al carrito", "success");
  };

  // Obtener imágenes actuales
  const currentColorImages = getCurrentColorImages();
  const allImagesWithColors = getAllImagesWithColors();

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        {/* Botón de Atrás */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackButton}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Atrás</span>
          </Button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover-yellow">
            Inicio
          </Link>{" "}
          |{" "}
          <Link href={`/${product.gender}`} className="hover-yellow">
            {product.gender === "hombre" ? "Hombre" : "Mujer"}
          </Link>{" "}
          |{" "}
          <Link
            href={`/${product.gender}?category=${product.category}`}
            className="hover-yellow"
          >
            {product.category}
          </Link>{" "}
          | <span className="font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Panel - Mejorado con asociaciones de color */}
          <div className="space-y-6 lg:space-y-0 lg:flex lg:gap-4">
            {/* Desktop: Vertical Thumbnails Column */}
            <div className="hidden lg:block relative w-24">
              <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {allImagesWithColors.map((imageData, index) => (
                  <div
                    key={`${imageData.color}-${imageData.url}-${index}`}
                    className="relative"
                  >
                    <button
                      onClick={() => handleImageChange(index)}
                      className={`w-20 h-24 border-2 overflow-hidden transition-all duration-200 flex-shrink-0 ${
                        currentColorImages[selectedImage] === imageData.url
                          ? "border-black dark:border-white"
                          : "border-gray-200 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                      }`}
                    >
                      <img
                        src={imageData.url || "/placeholder.svg"}
                        alt={`${imageData.colorName} - Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {/* Indicador de color */}
                    <div
                      className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border shadow-sm ${
                        imageData.color === "blanco"
                          ? "border-gray-400 bg-white"
                          : "border-white"
                      }`}
                      style={{
                        backgroundColor:
                          imageData.color === "blanco"
                            ? "#FFFFFF"
                            : product.colors?.find(
                                (c) => c.color === imageData.color
                              )?.hex || "#808080",
                      }}
                      title={imageData.colorName}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Image - Muestra imagen del color seleccionado */}
            <div className="w-full lg:flex-1 relative">
              <div className="relative bg-gray-100 dark:bg-gray-800">
                <img
                  src={
                    currentColorImages[selectedImage] ||
                    product.image ||
                    "/placeholder.svg"
                  }
                  alt={`${product.name} - ${
                    product.colors?.find((c) => c.color === selectedColor)
                      ?.name || "Default"
                  }`}
                  className="w-full h-auto min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] max-h-[700px] object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 w-10 h-10 p-0"
                >
                  <Search className="h-5 w-5 dark:text-white" />
                </Button>
              </div>
            </div>

            {/* Mobile: Horizontal Gallery below main image */}
            <div className="lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {allImagesWithColors.map((imageData, index) => (
                  <div
                    key={`mobile-${imageData.color}-${imageData.url}-${index}`}
                    className="relative flex-shrink-0"
                  >
                    <button
                      onClick={() => handleImageChange(index)}
                      className={`w-16 h-20 border-2 overflow-hidden transition-all duration-200 ${
                        currentColorImages[selectedImage] === imageData.url
                          ? "border-black dark:border-white"
                          : "border-gray-200 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                      }`}
                    >
                      <img
                        src={imageData.url || "/placeholder.svg"}
                        alt={`${imageData.colorName} - Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {/* Indicador de color */}
                    <div
                      className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border shadow-sm ${
                        imageData.color === "blanco"
                          ? "border-gray-400 bg-white"
                          : "border-white"
                      }`}
                      style={{
                        backgroundColor:
                          imageData.color === "blanco"
                            ? "#FFFFFF"
                            : product.colors?.find(
                                (c) => c.color === imageData.color
                              )?.hex || "#808080",
                      }}
                      title={imageData.colorName}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="typography-primary text-3xl font-bold mb-2 dark:text-white">
                {product.name}
              </h1>
              <div className="h-1 w-12 bg-black dark:bg-white mb-4"></div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <p className="typography-accent text-3xl font-bold dark:text-white">
                    ${product.price?.toLocaleString() || "0"}
                  </p>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Hasta 3 cuotas sin interés
                  </span>
                </div>
                {product.cashPrice && (
                  <div className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                        DESCUENTO EFECTIVO:{" "}
                        <span className="text-xl text-yellow-900 dark:text-yellow-100">
                          ${product.cashPrice.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <span className="text-lg text-yellow-900 dark:text-yellow-100 font-bold bg-yellow-200 dark:bg-yellow-800 px-3 py-1 rounded-full">
                      25% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection - Actualizado con funcionalidad bidireccional */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="typography-secondary font-medium mb-3 dark:text-white">
                  Color:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {product.colors.find((c) => c.color === selectedColor)
                      ?.name || "Seleccionar"}
                  </span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((colorObj) => (
                    <button
                      key={colorObj.color}
                      onClick={() => handleColorChange(colorObj.color)}
                      className={`w-8 h-8 border-2 rounded-sm transition-all duration-200 ${
                        selectedColor === colorObj.color
                          ? colorObj.color === "blanco"
                            ? "border-gray-800 dark:border-gray-200 ring-2 ring-gray-800/30 dark:ring-gray-200/30 shadow-md"
                            : "border-black dark:border-white ring-2 ring-black/20 dark:ring-white/20"
                          : colorObj.color === "blanco"
                          ? "border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400 shadow-sm"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: colorObj.hex }}
                      title={colorObj.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection - Mejorado con manejo condicional */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="typography-secondary font-medium mb-3 dark:text-white">
                  Talle:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {selectedSize || "Seleccionar"}
                  </span>
                </h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedSize(size);
                      }}
                      className={`w-10 h-10 border ${
                        selectedSize === size
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 dark:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4">
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
                }
                className="w-20 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                min="1"
                max="10"
              />
              <Button
                className="flex-1 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 py-3"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "AÑADIR AL CARRITO" : "AGOTADO"}
              </Button>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Code/Category */}
              <div className="border-b dark:border-gray-700">
                <button
                  onClick={() => toggleSection("code")}
                  className="w-full flex justify-between items-center py-4 text-left dark:text-white"
                >
                  <span className="font-medium">Código / Categoría</span>
                  {expandedSections.includes("code") ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.includes("code") && (
                  <div className="pb-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Código
                      </span>
                      <span className="dark:text-white">
                        {product.productCode || product.code || "Sin código"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Categoría
                      </span>
                      <span className="dark:text-white capitalize">
                        {product.category || "Sin categoría"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Género
                      </span>
                      <span className="dark:text-white capitalize">
                        {product.gender || "Unisex"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Guide - Solo mostrar si hay talles */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="border-b dark:border-gray-700">
                  <button
                    onClick={() => toggleSection("sizes")}
                    className="w-full flex justify-between items-center py-4 text-left dark:text-white"
                  >
                    <span className="font-medium">Guía de talles</span>
                    {expandedSections.includes("sizes") ? (
                      <ChevronUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-green-600" />
                    )}
                  </button>
                  {expandedSections.includes("sizes") && (
                    <div className="pb-4">
                      <div className="bg-white dark:bg-gray-800 p-4">
                        <h4 className="font-bold mb-4 dark:text-white">
                          CÓMO MEDIRTE
                        </h4>
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <img
                              src="/placeholder.svg?height=200&width=150&text=Medidas"
                              alt="Guía de medidas"
                              className="w-full h-48 object-cover mb-4"
                            />
                          </div>
                          <div className="flex-2 space-y-3">
                            <div>
                              <span className="font-medium text-black dark:text-white">
                                1. Contorno cintura:
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {" "}
                                Coloca la cinta métrica rodeando la parte más
                                estrecha del contorno de tu cintura.
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-black dark:text-white">
                                2. Contorno cadera:
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {" "}
                                Junta los pies y coloca la cinta métrica
                                rodeando la parte más ancha del contorno de tu
                                cadera.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Care Instructions */}
              <div className="border-b dark:border-gray-700">
                <button
                  onClick={() => toggleSection("care")}
                  className="w-full flex justify-between items-center py-4 text-left dark:text-white"
                >
                  <span className="font-medium">Cuidados de la prenda</span>
                  {expandedSections.includes("care") ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.includes("care") && (
                  <div className="pb-0">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Cuidar de tus prendas es una manera de alargar su vida
                      útil. Sigue las instrucciones de cuidado y lava tus
                      prendas solo cuando sea necesario. Reduciendo los lavados
                      y los secados alargamos la vida de nuestras prendas y
                      reducimos el consumo de agua y energía.
                    </p>
                    <div className="space-y-3">
                      {careInstructions.map((instruction, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="text-black dark:text-white">
                            {instruction.icon}
                          </div>
                          <span className="text-sm dark:text-gray-300">
                            {instruction.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete Your Look */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="typography-secondary text-2xl font-bold mb-8 dark:text-white">
              COMPLETÁ TU LOOK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  href={`/producto/${relatedProduct.slug}`}
                  key={`${relatedProduct.id}-${index}`}
                  className="text-center group"
                >
                  <div className="overflow-hidden mb-4">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-sm mb-2 uppercase group-hover:text-yellow-600 transition-colors dark:text-white line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 uppercase">
                      {relatedProduct.category}
                    </p>
                    <p className="typography-accent font-bold text-base dark:text-white">
                      ${relatedProduct.price?.toLocaleString() || "0"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductDetailContent slug={slug} />
    </Suspense>
  );
}
