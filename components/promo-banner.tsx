"use client"

export default function PromoBanner() {
  const promos = [
    "ENVÍOS GRATIS A COMPRAS MAYORES DE $120.000",
    "1 O 3 CUOTAS SIN INTERÉS CON TODAS LAS TARJETAS",
    "HASTA 12 CUOTAS SIN INTERÉS CON MERCADO PAGO",
    "CAMBIOS Y DEVOLUCIONES SIN CARGO HASTA 30 DÍAS",
    "COMPRÁ AHORA Y PAGÁ EN 3 CUOTAS SIN INTERÉS",
    "PAGÁ EN EFECTIVO Y OBTENÉ 25% DE DESCUENTO",
    "PRECIO ESPECIAL EN EFECTIVO EN TODOS LOS PRODUCTOS",
    "EFECTIVO: EL MEJOR PRECIO SIEMPRE",
    "AHORRÁ MÁS PAGANDO EN EFECTIVO",
    "DESCUENTOS EXCLUSIVOS EN PAGOS EN EFECTIVO",
  ]

  return (
    <div className="bg-black text-white overflow-hidden">
      <div className="relative h-6 sm:h-7 whitespace-nowrap flex items-center">
        <div className="flex animate-scroll-infinite items-center">
          {/* Primera copia del contenido */}
          <div className="flex space-x-48 items-center min-w-max">
            {promos.map((promo, index) => (
              <span
                key={`first-${index}`}
                className="inline-block flex-shrink-0 text-[11px] sm:text-xs font-medium tracking-wide"
              >
                {promo}
              </span>
            ))}
          </div>
          {/* Segunda copia del contenido para el scroll infinito */}
          <div className="flex space-x-48 items-center ml-48 min-w-max">
            {promos.map((promo, index) => (
              <span
                key={`second-${index}`}
                className="inline-block flex-shrink-0 text-[11px] sm:text-xs font-medium tracking-wide"
              >
                {promo}
              </span>
            ))}
          </div>
          {/* Tercera copia para garantizar bucle perfecto */}
          <div className="flex space-x-48 items-center ml-48 min-w-max">
            {promos.map((promo, index) => (
              <span
                key={`third-${index}`}
                className="inline-block flex-shrink-0 text-[11px] sm:text-xs font-medium tracking-wide"
              >
                {promo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
