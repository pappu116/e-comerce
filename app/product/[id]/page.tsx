import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton";
import ReviewsPanel from "./ReviewsPanel";
import { getImageUrl } from "@/app/lib/apiClient";

const getApiBase = () => {
  const rawBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:5000";
  const normalized = rawBase.replace(/\/+$/, "");
  return normalized.endsWith("/api") ? normalized : `${normalized}/api`;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = String(id || "").trim();

  if (!productId || productId === "undefined") {
    notFound();
  }

  let product: any = null;

  try {
    const response = await fetch(`${getApiBase()}/products/${productId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      notFound();
    }

    const data = await response.json();
    product = data?.product || null;
  } catch {
    product = null;
  }

  if (!product) {
    notFound();
  }

  const imageUrl = getImageUrl(product.images?.[0]);

  return (
    <div className="min-h-screen bg-white py-10 dark:bg-[#020617] md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
            <Image
              src={imageUrl}
              alt={product.name || "Product image"}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">
              {product.category || "General"}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                Tk {Number(product.price || 0).toLocaleString()}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  Number(product.stock || 0) > 0
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                    : "bg-rose-500/15 text-rose-600 dark:text-rose-300"
                }`}
              >
                {Number(product.stock || 0) > 0
                  ? `In Stock (${Number(product.stock)})`
                  : "Out of Stock"}
              </span>
            </div>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {product.description || "No description available."}
            </p>
            <div className="pt-2">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        <ReviewsPanel
          productId={productId}
          initialRating={Number(product.ratings || 0)}
          initialCount={Number(product.numOfReviews || 0)}
        />
      </div>
    </div>
  );
}
