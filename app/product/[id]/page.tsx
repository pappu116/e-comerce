import { productService, getImageUrl } from "@/app/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;  // ✅ আগে id নিতে হবে

  if (!id || id === "undefined") notFound();

  const product = await productService.getById(id);  // ✅ এখানে, function এর ভেতরে
  console.log("Product data:", product); // চেক করুন কী আসছে

  if (!product) notFound();

  const imageUrl = getImageUrl(product.images?.[0]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="container mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Image Section */}
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl aspect-square overflow-hidden border dark:border-white/10 relative">
            <Image
              src={imageUrl}
              alt={product.name ?? "Product image"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-4">
            <span className="text-teal-500 font-bold uppercase tracking-wider text-sm">
              {product.category || "General"}
            </span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-indigo-600 dark:text-indigo-400 font-bold">
                ৳{product.price}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {product.description}
            </p>
            <div className="pt-4">
              <AddToCartButton product={product} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}