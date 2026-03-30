import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton"; // বাটনটি ইমপোর্ট করো

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id.toString() === id);

  if (!product) notFound();

  return (
      <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300"> 
  {/* এই উপরের লাইনে bg-white এবং dark:bg-[#020617] যোগ করা হয়েছে যা পুরো পেজের ব্যাকগ্রাউন্ড চেঞ্জ করবে */}
  
  <div className="container mx-auto py-20 px-4">
    <div className="grid md:grid-cols-2 gap-12">
      {/* ইমেজ সেকশন */}
      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl aspect-square overflow-hidden border dark:border-white/10">
         <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
      </div>

      {/* টেক্সট সেকশন */}
      <div className="flex flex-col justify-center space-y-4">
        {/* টেক্সট কালার ডার্ক মোডে সাদা হওয়ার জন্য text-slate-900 dark:text-white দেওয়া হয়েছে */}
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{product.name}</h1>
        <p className="text-2xl text-indigo-600 dark:text-indigo-400 font-bold">৳{product.price}</p>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{product.description}</p>
        
        <div className="pt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  </div>
</div>
  );
}