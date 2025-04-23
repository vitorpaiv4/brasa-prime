"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Instagram, MessageSquare } from "lucide-react"
import { useInView } from "react-intersection-observer"

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Endereço",
      description: "Rua das Brasas, 123 - Centro",
      action: {
        label: "Ver no Mapa",
        url: "https://maps.google.com",
        external: true,
      },
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horário",
      description: "Ter-Dom: 18h às 23h",
      subDescription: "Segunda: Fechado",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefone",
      description: "(11) 99999-9999",
      action: {
        label: "Ligar Agora",
        url: "tel:+5511999999999",
        external: true,
      },
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      title: "Instagram",
      description: "@brasaprime",
      action: {
        label: "Seguir",
        url: "https://instagram.com",
        external: true,
      },
    },
  ]

  return (
    <section id="contact" className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Entre em Contato</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para atender você com o melhor da nossa culinária
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-1">{item.description}</p>
                  {item.subDescription && <p className="text-sm text-muted-foreground mb-4">{item.subDescription}</p>}
                  {item.action && (
                    <Button variant="outline" className="mt-auto" asChild>
                      <a
                        href={item.action.url}
                        target={item.action.external ? "_blank" : undefined}
                        rel={item.action.external ? "noopener noreferrer" : undefined}
                      >
                        {item.action.label}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <MessageSquare className="mr-2 h-5 w-5" />
            Fazer Pedido pelo WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
