
"use client"

import { useCart } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import { ShoppingBag, CheckCircle2 } from "lucide-react"; 
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCart((state: any) => state.addToCart);
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdded(true);
    await addToCart(product);
    
    // ১ সেকেন্ড পর কার্ট পেজে নিয়ে যাবে, যাতে ইউজার 'Success' এনিমেশনটি দেখতে পায়
    setTimeout(() => {
      router.push("/cart");
    }, 800);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t md:relative md:p-0 md:bg-transparent md:border-0 z-50">
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`
          flex items-center justify-center gap-3 w-full md:w-max md:min-w-[240px] px-8 py-4 
          rounded-2xl md:rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl
          ${isAdded 
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
