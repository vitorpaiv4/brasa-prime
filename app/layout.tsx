import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { CartProvider } from "@/context/cart-context"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://brasaprime.com.br"),
  title: {
    default: "Brasa Prime | Espetinhos Premium",
    template: "%s | Brasa Prime",
  },
  description:
    "Os melhores espetinhos da cidade, grelhados no ponto perfeito com ingredientes selecionados e temperos exclusivos.",
  keywords: ["espetinhos", "churrasco", "espetaria", "brasa prime", "picanha", "comida brasileira", "delivery"],
  authors: [{ name: "Brasa Prime" }],
  creator: "Brasa Prime",
  publisher: "Brasa Prime",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://brasaprime.com.br",
    title: "Brasa Prime | Espetinhos Premium",
    description:
      "Os melhores espetinhos da cidade, grelhados no ponto perfeito com ingredientes selecionados e temperos exclusivos.",
    siteName: "Brasa Prime",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brasa Prime - Espetinhos Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasa Prime | Espetinhos Premium",
    description:
      "Os melhores espetinhos da cidade, grelhados no ponto perfeito com ingredientes selecionados e temperos exclusivos.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://brasaprime.com.br",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange>
          <CartProvider>
            <Navbar />
            {children}
            <footer className="bg-muted py-8 px-4 text-center text-sm text-muted-foreground">
              <div className="max-w-7xl mx-auto">
                <img src="/images/logo.png" alt="Brasa Prime" className="h-16 mx-auto mb-4" />
                <p>© {new Date().getFullYear()} Brasa Prime. Todos os direitos reservados.</p>
                <p className="mt-2">Rua das Brasas, 123 - Centro | (11) 99999-9999</p>
              </div>
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
