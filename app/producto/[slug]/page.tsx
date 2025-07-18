import HeaderInternal from "@/components/header-internal"
import ProductDetail from "@/components/product-detail"
import Footer from "@/components/footer"

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeaderInternal />
      <ProductDetail slug={params.slug} />
      <Footer />
    </div>
  )
}
