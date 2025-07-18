import HeaderInternal from "@/components/header-internal"
import Footer from "@/components/footer"

export default function ComoComprar() {
  return (
    <>
      <HeaderInternal />
      <main className="min-h-[calc(100vh-200px)] bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-black dark:bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">¿Cómo comprar en Vancouver?</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Comprá de manera fácil y segura en nuestra tienda online. Te explicamos paso a paso
              cómo realizar tu compra y recibir tus productos en la puerta de tu casa.
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                1
              </div>

              <h3 className="text-xl font-semibold mb-3 dark:text-white">Explorá el catálogo</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Navegá por categorías o usá el buscador para encontrar tus productos favoritos.
                Filtrá por talle, color y más.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                2
              </div>

              <h3 className="text-xl font-semibold mb-3 dark:text-white">Agregá al carrito</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seleccioná tu talle y agregá los productos al carrito. Podés seguir comprando
                o finalizar tu compra cuando quieras.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                3
              </div>

              <h3 className="text-xl font-semibold mb-3 dark:text-white">Elegí cómo pagar</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Aceptamos todos los medios de pago: tarjetas, transferencia, Mercado Pago y efectivo.
                ¡Hasta 1 o 3 cuotas sin interés!
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                4
              </div>

              <h3 className="text-xl font-semibold mb-3 dark:text-white">Recibí tu compra</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Elegí el método de envío que prefieras. Hacemos envíos a todo el país
                y podés hacer seguimiento de tu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Shipping Info */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">Envíos</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>AMBA: 24-48hs hábiles</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Interior: 3-7 días hábiles</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Envío gratis en compras mayores a $50.000</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Seguimiento online de tu pedido</span>
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">Medios de pago</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Todas las tarjetas de crédito y débito</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Hasta 1 o 3 cuotas sin interés</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Mercado Pago</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                    <span>Transferencia bancaria</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 