"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, FlameIcon as Fire, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

// Menu data
const menuCategories = [
  { id: "espetinhos", label: "Espetinhos" },
  { id: "acompanhamentos", label: "Acompanhamentos" },
  { id: "bebidas", label: "Bebidas" },
  { id: "combos", label: "Combos" },
]

const menuItems = {
  espetinhos: [
    {
      id: 1,
      name: "Picanha Premium",
      description: "Corte nobre de picanha temperada com sal grosso e ervas",
      price: 15.9,
      image: "/images/picanha.jpg",
      popular: true,
    },
    {
      id: 2,
      name: "Medalhão de Frango",
      description: "Suculento medalhão de frango com bacon",
      price: 12.9,
      image: "/images/frango.jpg",
    },
    {
      id: 3,
      name: "Linguiça Artesanal",
      description: "Linguiça artesanal com temperos especiais",
      price: 13.9,
      image: "/images/linguica.jpg",
    },
    {
      id: 4,
      name: "Mix de Legumes",
      description: "Abobrinha, pimentão, cebola e tomate grelhados",
      price: 10.9,
      image: "/images/legumes.jpg",
    },
  ],
  acompanhamentos: [
    {
      id: 5,
      name: "Vinagrete Especial",
      description: "Tomate, cebola, pimentão e temperos especiais",
      price: 7.9,
      image: "/images/vinagrete.jpg",
    },
    {
      id: 6,
      name: "Farofa da Casa",
      description: "Farofa crocante com bacon e temperos",
      price: 8.9,
      image: "/images/farofa.jpg",
      popular: true,
    },
  ],
  bebidas: [
    {
      id: 7,
      name: "Caipirinha",
      description: "Caipirinha tradicional de limão",
      price: 14.9,
      image: "/images/caipirinha.jpg",
    },
    {
      id: 8,
      name: "Cerveja Artesanal",
      description: "Cerveja artesanal local 600ml",
      price: 16.9,
      image: "/images/cerveja.jpg",
      popular: true,
    },
  ],
  combos: [
    {
      id: 9,
      name: "Combo Família",
      description: "4 espetinhos de picanha, 4 de frango, 2 acompanhamentos",
      price: 89.9,
      image: "/images/combo-familia.jpg",
      popular: true,
    },
    {
      id: 10,
      name: "Combo Casal",
      description: "2 espetinhos de picanha, 2 de frango, 1 acompanhamento",
      price: 49.9,
      image: "/images/combo-casal.jpg",
    },
  ],
}

export function MenuTabs() {
  const [activeTab, setActiveTab] = useState("espetinhos")
  const { addItem, items } = useCart()
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({})

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })

    // Show visual feedback
    setAddedItems((prev) => ({ ...prev, [item.id]: true }))

    // Reset after animation
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }))
    }, 1500)
  }

  // Check if item is in cart
  const isInCart = (id: number) => {
    return items.some((item) => item.id === id)
  }

  return (
    <Tabs defaultValue="espetinhos" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
        {menuCategories.map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="text-base py-3">
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {menuCategories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {menuItems[category.id].map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden group h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={`${item.name} - ${item.description}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      {item.popular && (
                        <Badge className="absolute top-2 right-2 bg-primary" variant="secondary">
                          <Fire className="h-3 w-3 mr-1" /> Popular
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-2xl font-bold text-primary">{formatCurrency(item.price)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(item)}
                        variant={addedItems[item.id] ? "secondary" : "default"}
                      >
                        {addedItems[item.id] ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Adicionado
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {isInCart(item.id) ? "Adicionar Mais" : "Adicionar"}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
