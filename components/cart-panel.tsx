"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore()

  // Total basado en product.price
  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  const handleCheckout = () => {
    let message = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"
    cartItems.forEach((item) => {
      message += `• ${item.product.name}\n`
      message += `  - Talle: ${item.selectedSize || 'No especificado'}\n`

      // Buscar el color por name si existe
      const colorName = item.product.colors.find(c => c.color === item.selectedColor)?.name || item.selectedColor
      message += `  - Color: ${colorName || 'No especificado'}\n`

      message += `  - Cantidad: ${item.quantity || 0}\n`
      message += `  - Precio unitario: $${item.product.price.toLocaleString()}\n\n`
    })
    message += `\nTotal: $${(total || 0).toLocaleString()}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/5491132815864?text=${encodedMessage}`, '_blank')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out z-40 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-bold dark:text-white">CARRITO DE COMPRAS</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="dark:text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const colorName = item.product.colors.find(c => c.color === item.selectedColor)?.name || item.selectedColor

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                      className="flex gap-4 p-4 border dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-md dark:hover:shadow-gray-800"
                    >
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm dark:text-white">{item.product.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Talle: {item.selectedSize} | Color: {colorName}
                        </p>

                        {/* Mostrar cashPrice arriba, sin tachado */}
                        {item.product.cashPrice && (
                          <p className="text-sm">
                            ${item.product.cashPrice.toLocaleString()} <span className="text-xs">en efectivo</span>
                          </p>
                        )}

                        {/* Precio normal (más grande) */}
                        <p className="font-bold text-[1.1rem] dark:text-white">
                          ${item.product.price.toLocaleString()}
                        </p>

                        {/* Controles de cantidad */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              className="transition-all duration-200 ease-in-out dark:border-gray-700 dark:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium dark:text-white">{item.quantity || 0}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              className="transition-all duration-200 ease-in-out dark:border-gray-700 dark:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                            className="transition-all duration-200 ease-in-out hover:text-red-500 dark:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t dark:border-gray-700 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold dark:text-white">Total:</span>
                <span className="font-bold text-lg dark:text-white">${(total || 0).toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out"
                onClick={handleCheckout}
              >
                CONTINUAR COMPRA (WHATSAPP)
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent dark:border-gray-700 dark:text-white transition-all duration-300 ease-in-out"
                onClick={clearCart}
              >
                VACIAR CARRITO
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
