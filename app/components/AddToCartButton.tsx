// "use client" // এটি ক্লায়েন্ট সাইড ইন্টারঅ্যাকশন হ্যান্ডেল করবে

// import { useCart } from "@/app/store/useCart";
// import { useRouter } from "next/navigation";

// export default function AddToCartButton({ product }: { product: any }) {
//   const addToCart = useCart((state: any) => state.addToCart);
//   const router = useRouter();

//   const handleAddToCart = () => {
//     addToCart(product); // স্টোরে ডাটা সেভ করবে
//     // আপনি চাইলে সরাসরি কার্ট পেজে পাঠিয়ে দিতে পারেন
//     router.push("/cart"); 
//   };

//   return (
//     <button 
//       onClick={handleAddToCart}
//       className="bg-black text-white dark:bg-white dark:text-black py-4 rounded-full font-bold active:scale-95 transition-transform"
//     >
//       Add to Cart
//     </button>
//   );
// }

// "use client"

// import { useCart } from "@/app/store/useCart";
// import { useRouter } from "next/navigation";
// import { ShoppingBag } from "lucide-react"; // আইকন যোগ করলে সুন্দর লাগে

// export default function AddToCartButton({ product }: { product: any }) {
//   const addToCart = useCart((state: any) => state.addToCart);
//   const router = useRouter();

//   const handleAddToCart = () => {
//     addToCart(product);
//     router.push("/cart"); 
//   };

//   return (
//     <button 
//       onClick={handleAddToCart}
//       // w-full বা নির্দিষ্ট px-12 যোগ করা হয়েছে যাতে বাটনটি ছোট না দেখায়
//       // bg-indigo-600 ব্যবহার করা হয়েছে কারণ আপনার প্রাইস এবং অন্যান্য থিম নীল রঙের
//       className="flex items-center justify-center gap-2 w-full md:w-max px-12 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-full font-bold active:scale-95 transition-all hover:opacity-90 shadow-lg dark:shadow-white/5"
//     >
//       <ShoppingBag size={20} />
//       Add to Cart
//     </button>
//   );
// }

"use client"

import { useCart } from "@/app/store/useCart";
import { useRouter } from "next/navigation";
import { ShoppingBag, CheckCircle2 } from "lucide-react"; 
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCart((state: any) => state.addToCart);
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product);
    
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