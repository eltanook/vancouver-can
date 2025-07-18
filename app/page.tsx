import { Metadata } from 'next'
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Vancouver Canning - Moda Urbana y Jeans | Tienda Online',
  description: 'Descubre la mejor moda urbana en Vancouver Canning. Jeans, remeras, camperas y más. Envíos a todo el país. Calidad premium y estilo único.',
  keywords: 'vancouver, canning, moda urbana, jeans, remeras, camperas, ropa hombre, ropa mujer, tienda online',
  openGraph: {
    title: 'Vancouver Canning - Moda Urbana y Jeans',
    description: 'Descubre la mejor moda urbana en Vancouver Canning. Jeans, remeras, camperas y más.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vancouver Canning - Moda Urbana y Jeans',
    description: 'Descubre la mejor moda urbana en Vancouver Canning. Jeans, remeras, camperas y más.',
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main id="main">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}
