"use client"

import HeaderInternal from "@/components/header-internal"
import Footer from "@/components/footer"
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"

export default function Contacto() {
  return (
    <>
      <HeaderInternal />
      <main className="min-h-[calc(100vh-200px)] bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-black dark:bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Contacto</h1>
            <p className="text-gray-300 dark:text-white text-lg max-w-2xl">
              ¿Tenés alguna pregunta o sugerencia? Estamos acá para ayudarte.
              Contactanos por cualquiera de nuestros canales de atención.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
            {/* Contact Info Cards */}
            <div className="flex flex-col h-full justify-between gap-6">
              {/* Phone Card */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">Teléfono</h3>
                  <p className="text-gray-600 dark:text-white mt-1">+54 9 11 3281-5864</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">Dirección</h3>
                  <p className="text-gray-600 dark:text-white mt-1">
                    Mariano Castex 1257 / 77<br />
                    Local 117 Shopping Plaza Canning<br />
                    Canning, Buenos Aires
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">Horarios</h3>
                  <p className="text-gray-600 dark:text-white mt-1">Lunes a Sábado: 10:00 a 20:00</p>
                  <p className="text-gray-600 dark:text-white">Domingos y Feriados: 12:00 a 20:00</p>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-black dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">Soporte Rápido</h3>
                  <p className="text-gray-600 dark:text-white mt-1">Estamos disponibles para ayudarte</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <form
                action="https://formsubmit.co/shop@vancouverjeans.com"
                method="POST"
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg flex flex-col h-full"
              >
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">Envianos un mensaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="nombre" className="block text-sm font-medium mb-2 dark:text-white">
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      name="Nombre"
                      required
                      className="bg-white border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">
                      Email
                    </label>
                    <input
                      id="email"
                      name="Email"
                      type="email"
                      required
                      className="bg-white border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="telefono" className="block text-sm font-medium mb-2 dark:text-white">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="Teléfono"
                    type="tel"
                    className="bg-white border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex flex-col mb-6 flex-1">
                  <label htmlFor="mensaje" className="block text-sm font-medium mb-2 dark:text-white">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="Mensaje"
                    required
                    rows={5}
                    className="bg-white border border-gray-300 rounded px-3 py-2 min-h-[120px]"
                  />
                </div>
                {/* Formsubmit hidden fields */}
                <input type="hidden" name="_next" value="https://vancouverjeans.com/gracias" />
                <input type="hidden" name="_captcha" value="false" />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-black dark:bg-gray-800 text-white py-3 rounded hover:bg-gray-800 transition-colors mt-auto"
                >
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.9661056373766!2d-58.50847492345274!3d-34.85843617185106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd7e5bfdb0d3d%3A0x4e69e6e947cd5bc5!2sMariano%20Castex%201257%2C%20B1804EXY%20Canning%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1711396824630!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </main>
      <Footer />
    </>
  )
} 