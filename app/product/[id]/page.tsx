import { productService, getImageUrl } from "@/app/lib/apiClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";
import ReviewsPanel from "./ReviewsPanel";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id || id === "undefined") notFound();

  const response = await productService.getById(id);
  const product = response?.product;

  if (!product) notFound();

  const imageUrl = getImageUrl(product.images?.[0]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="container mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Image Section */}
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl aspect-square overflow-hidden border dark:border-white/10 relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name ?? "Product image"}
                fill
                className="object-cover"
                priority // পেজ লোড স্পিড বাড়ানোর জন্য
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                No Image Available
              </div>
            )}
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
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
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

        <ReviewsPanel
          productId={id}
          initialRating={Number(product.ratings || 0)}
          initialCount={Number(product.numOfReviews || 0)}
        />
      </div>
    </div>
  );
}
