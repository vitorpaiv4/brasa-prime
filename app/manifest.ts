import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brasa Prime - Espetinhos Premium",
    short_name: "Brasa Prime",
    description: "Os melhores espetinhos da cidade, grelhados no ponto perfeito com ingredientes selecionados.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#C2410C",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
