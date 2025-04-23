import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { MenuTabs } from "@/components/menu-tabs"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { HeroSection } from "@/components/hero-section"
import { LoadingScreen } from "@/components/loading-screen"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Espetinhos Premium | Sabor Inigualável na Brasa",
  description:
    "Descubra os melhores espetinhos da cidade na Brasa Prime. Carnes nobres, temperos exclusivos e atendimento de qualidade. Faça seu pedido online!",
  alternates: {
    canonical: "https://brasaprime.com.br",
  },
}

export default function Home() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Brasa Prime",
    image: "https://brasaprime.com.br/images/logo.png",
    url: "https://brasaprime.com.br",
    telephone: "+551199999999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua das Brasas, 123",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01000-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.55052,
      longitude: -46.633308,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "18:00",
        closes: "23:00",
      },
    ],
    servesCuisine: "Churrasco Brasileiro",
    priceRange: "$$",
    menu: "https://brasaprime.com.br/#menu",
    acceptsReservations: "True",
  }

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={restaurantSchema} />
      <LoadingScreen />

      {/* Hero Section */}
      <HeroSection />

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Nosso Cardápio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossos deliciosos espetinhos e acompanhamentos preparados com ingredientes selecionados e muito
            sabor
          </p>
        </div>

        <MenuTabs />

        <div className="mt-10 text-center">
          <Button size="lg" className="group">
            Ver Cardápio Completo
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 md:px-8 lg:px-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">O Que Nossos Clientes Dizem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja as avaliações de quem já experimentou nossos deliciosos espetinhos
            </p>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
