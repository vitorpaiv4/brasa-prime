"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    avatar: "/images/avatar-1.jpg",
    rating: 5,
    text: "Os melhores espetinhos que já comi! A picanha é suculenta e o atendimento é excelente. Recomendo demais!",
    date: "15/03/2023",
  },
  {
    id: 2,
    name: "Ana Oliveira",
    avatar: "/images/avatar-2.jpg",
    rating: 5,
    text: "Ambiente aconchegante e espetinhos deliciosos. O combo família é perfeito para reunir os amigos. Voltarei com certeza!",
    date: "22/04/2023",
  },
  {
    id: 3,
    name: "Marcelo Santos",
    avatar: "/images/avatar-3.jpg",
    rating: 4,
    text: "Ótima relação custo-benefício. Os espetinhos são generosos e muito saborosos. A farofa da casa é um destaque!",
    date: "10/05/2023",
  },
  {
    id: 4,
    name: "Juliana Costa",
    avatar: "/images/avatar-4.jpg",
    rating: 5,
    text: "Fiquei impressionada com a qualidade da carne. Tudo muito bem temperado e no ponto. A caipirinha é sensacional!",
    date: "05/06/2023",
  },
]

export function Testimonials() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <Card className="h-full flex flex-col">
            <CardContent className="pt-6 flex-grow">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
