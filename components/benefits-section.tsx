import { Truck, Shield, MessageCircle } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Truck className="h-8 w-8 text-black dark:text-white" />,
      title: "Envío gratis",
      description: "Para compras a partir de $120.000",
    },
    {
      icon: <Shield className="h-8 w-8 text-black dark:text-white" />,
      title: "Web Segura",
      description: "Pagá a través de Mercado Pago con todas las tarjetas, QR y saldo en tu billetera virtual.",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-black dark:text-white" />,
      title: "¿Necesitás ayuda?",
      description: "Te asesoramos con tu compra, escribinos a +54 9 11 1328-1586",
    },
  ]

  return (
    <div className="py-8 sm:py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
