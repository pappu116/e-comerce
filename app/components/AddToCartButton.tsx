"use client"

import { useCart } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCart((state: any) => state.addToCart);
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [variantKey, setVariantKey] = useState("");

  const variants = useMemo(
    () =>
      (Array.isArray(product?.variants) ? product.variants : []).filter(
        (v: any) => v?.isActive !== false && String(v?.key || "").trim()
      ),
    [product]
  );

  const variant = variants.find((v: any) => String(v.key) === variantKey) || null;
  const stock = Number(variant?.stock ?? product?.stock ?? 0) || 0;

  const handleAddToCart = async () => {
    if (variants.length && !variant) return;
    setIsAdded(true);

    await addToCart(
      variant
        ? {
            ...product,
            variant: {
              key: String(variant.key || ""),
              size: String(variant.size || ""),
              color: String(variant.color || ""),
              sku: String(variant.sku || ""),
              image: String(variant.image || ""),
            },
          }
        : product
    );

    setTimeout(() => {
      router.push("/cart");
    }, 800);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 p-4 backdrop-blur-lg md:relative md:border-0 md:bg-transparent md:p-0">
      {variants.length > 0 && (
        <select
          value={variantKey}
          onChange={(e) => setVariantKey(e.target.value)}
          className="mb-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="">Select Variant</option>
          {variants.map((v: any) => (
            <option key={v.key} value={v.key}>
              {[v.size, v.color].filter(Boolean).join(" / ") || v.sku || v.key}
            </option>
          ))}
        </select>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        disabled={isAdded || stock < 1 || (variants.length > 0 && !variant)}
        className={`
          flex items-center justify-center gap-3 w-full md:w-max md:min-w-[240px] px-8 py-4
          rounded-2xl md:rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl
          ${
            isAdded
              ? "bg-green-500 text-white shadow-green-500/20"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20"
          }
          dark:disabled:bg-green-600
        `}
      >
        {isAdded ? (
          <>
            <CheckCircle2 size={20} className="animate-bounce" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag size={20} />
            Add to Cart
          </>
        )}
      </motion.button>
    </div>
  );
}
