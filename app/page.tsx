// app/page.tsx
import HeroSection from "@/app/components/hero-section"
import ProductCard from "@/app/components/product-card"

// ১. Async Function to fetch products
async function getProducts() {
  try {
    const apiBase = (
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      "http://localhost:5000"
    ).replace(/\/+$/, "");
    const normalizedApiBase = apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`;
    const res = await fetch(`${normalizedApiBase}/products`, {
      cache: 'no-store', // Fresh data anar jonno
    });

    if (!res.ok) {
      console.error("Failed to fetch data from backend");
      return []; // Error hole empty array pathabe jate map function crash na kore
    }

    const data = await res.json();

    // Jodi backend theke { products: [...] } eivabe ashe
    if (data && data.products) return data.products;
    
    // Jodi backend theke sorasori [...] (Array) ashe
    if (Array.isArray(data)) return data;

    return []; // Onno kono format hole safe thakar jonno empty array
  } catch (error) {
    console.error("Backend connection error:", error);
    return []; // Backend bondho thakle empty array pathabe
  }
}

export default async function Home() {
  // ২. Products fetch kora holo
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-300">
      
      <HeroSection />

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

        {/* ৩. Grid Layout with Safety Check */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-slate-500 italic">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
