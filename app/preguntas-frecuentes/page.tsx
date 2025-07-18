import HeaderInternal from "@/components/header-internal"
import Footer from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function PreguntasFrecuentes() {
  return (
    <>
      <HeaderInternal />
      <main className="min-h-[calc(100vh-200px)] bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-black dark:bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">Preguntas Frecuentes</h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Encontrá respuestas a las preguntas más comunes sobre nuestros productos, 
              envíos, cambios y más. Si no encontrás lo que buscás, no dudes en contactarnos.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-8 text-center dark:text-white">Preguntas más frecuentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="cambios" className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <AccordionTrigger className="text-lg font-medium hover:text-black dark:text-white dark:hover:text-yellow-400">
                  ¿Puedo cambiar mi compra?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <div className="space-y-3">
                    <p>Sí, tenés hasta <strong>30 días</strong> para cambiar tu compra. Condiciones:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>El producto debe estar sin uso</li>
                      <li>Con todas las etiquetas</li>
                      <li>En su empaque original</li>
                      <li>Podés hacer el cambio en cualquiera de nuestros locales</li>
                      <li>O coordinar un retiro a domicilio</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="talles" className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <AccordionTrigger className="text-lg font-medium hover:text-black dark:text-white dark:hover:text-yellow-400">
                  ¿Cómo elijo mi talle?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <div className="space-y-3">
                    <p>Para elegir el talle correcto:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>En cada producto encontrarás una guía de talles detallada</li>
                      <li>Medí una prenda similar que te quede bien</li>
                      <li>Compará las medidas con nuestra tabla</li>
                      <li>Si tenés dudas, contactanos por WhatsApp</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      También podés visitar nuestro local para probarte las prendas.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pagos" className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <AccordionTrigger className="text-lg font-medium hover:text-black dark:text-white dark:hover:text-yellow-400">
                  ¿Qué métodos de pago aceptan?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <div className="space-y-3">
                    <p>Aceptamos todos estos medios de pago:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Todas las tarjetas de crédito y débito</li>
                      <li>Hasta 1 o 3 cuotas sin interés</li>
                      <li>Mercado Pago</li>
                      <li>Transferencia bancaria</li>
                      <li>Efectivo en puntos de pago</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      Los pagos son procesados de forma segura.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">¿No encontraste tu respuesta?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Si tenés alguna pregunta específica que no está en esta lista, 
              no dudes en contactarnos. Estamos acá para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contacto" 
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Contactanos
              </a>
              <a 
                href="https://wa.me/5491132815864" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border border-black text-black dark:border-white dark:text-white px-8 py-3 rounded-lg transition-colors hover:text-[#fbb03b]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 