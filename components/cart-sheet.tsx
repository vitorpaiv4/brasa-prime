"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingCart, AlertCircle } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type CartSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleSendToWhatsApp = () => {
    if (items.length === 0) return

    const phoneNumber = "5511999999999" // Replace with your actual WhatsApp number

    let message = "🔥 *Novo Pedido - Brasa Prime* 🔥\n\n"
    message += "*Itens do Pedido:*\n"

    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}\n`
    })

    message += "\n*Total do Pedido:* " + formatCurrency(totalPrice)
    message += "\n\nPor favor, confirme meu pedido. Obrigado!"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Show success message and clear cart
    setIsSuccessOpen(true)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-4 sm:p-6">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-xl flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Seu Carrinho
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="bg-muted rounded-full p-6 mb-4">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">Seu carrinho está vazio</h3>
              <p className="text-muted-foreground mb-6">Adicione alguns itens deliciosos do nosso cardápio</p>
              <SheetClose asChild>
                <Button>Ver Cardápio</Button>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium truncate pr-2">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-primary font-medium">{formatCurrency(item.price)}</span>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Taxa de entrega</span>
                    <span>Grátis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <SheetFooter className="mt-6 flex-col sm:flex-col gap-2">
                  <Button size="lg" className="w-full" onClick={handleSendToWhatsApp}>
                    Finalizar Pedido via WhatsApp
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={() => setIsAlertOpen(true)}>
                    Limpar Carrinho
                  </Button>
                </SheetFooter>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirm Clear Cart Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar carrinho?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover todos os itens do seu carrinho? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => clearCart()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Limpar Carrinho
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-green-600">
              <AlertCircle className="mr-2 h-5 w-5" />
              Pedido Enviado com Sucesso!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Seu pedido foi enviado para o WhatsApp da Brasa Prime. Aguarde a confirmação do estabelecimento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                clearCart()
                setIsSuccessOpen(false)
              }}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
