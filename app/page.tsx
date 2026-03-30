// app/page.tsx
import HeroSection from "@/app/components/hero-section"
import ProductCard from "@/app/components/product-card"
import { products } from "@/app/data/products"

export default function Home() {
  return (
    // bg-background ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে লাইট/ডার্ক কালার নিবে
    <main className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ১. Hero Section (আগের দেওয়া ডার্ক মোড রেসপনসিভ কোডটি এখানে থাকবে) */}
      <HeroSection />

      {/* ২. Product Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
           <div>
              <h2 className="text-4xl font-black tracking-tight uppercase">
                Featured <span className="text-teal-500">Collection</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Discover the latest trends in premium fashion.</p>
           </div>
           <div className="h-[2px] flex-1 bg-slate-100 dark:bg-white/5 mx-8 hidden lg:block" />
        </div>

        {/* ৩. Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}