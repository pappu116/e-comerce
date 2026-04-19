// // app/components/product-card.tsx
// import Link from "next/link"
// import Image from "next/image"

// export default function ProductCard({ product }: { product: any }) {
//   return (
//     <Link href={`/product/${product.id}`}>
//       <div className="group cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-lg">
//         <div className="relative aspect-square overflow-hidden rounded-xl">
//           <Image 
//             src={product.image} 
//             alt={product.name} 
//             fill 
//             className="object-cover transition-transform group-hover:scale-105"
//           />
//         </div>
//         <h3 className="mt-4 font-semibold">{product.name}</h3>
//         <p className="text-indigo-600 font-bold">${product.price}</p>
//       </div>
//     </Link>
//   )
// }
"use client";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/app/store/wishlistStore";

export default function ProductCard({ product }: { product: any }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const fallbackImage = "https://via.placeholder.com/400x500?text=No+Image+Available";
  
  const imageSrc = product.images && product.images.length > 0 
    ? product.images[0] 
    : fallbackImage;

  const productId = product._id || product.id;
  const isFavorite = wishlist.some((item) => (item._id || item.id) === productId);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(product);
    }
  };

  return (
    <Link href={`/product/${productId}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-3 md:p-4 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 backdrop-blur-md overflow-hidden"
      >
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all active:scale-75 shadow-xl"
        >
          <motion.div
            animate={{ scale: isFavorite ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={16}
              className={`transition-colors md:w-[18px] md:h-[18px] ${
                isFavorite ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </motion.div>
        </button>

        {/* Image Container */}
        <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900 shadow-inner">
          <img
            src={imageSrc}
            alt={product.name ?? "Product image"}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />

          {/* Desktop Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end p-4">
            <div className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest text-center translate-y-2 group-hover:translate-y-0 transition-transform">
              Quick View
            </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="mt-4 px-1 md:px-2 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-black text-slate-100 text-sm md:text-lg leading-tight group-hover:text-indigo-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {product.discountPrice && product.discountPrice > product.price && (
                <p className="text-[9px] text-slate-500 line-through font-bold">
                  ${product.discountPrice}
                </p>
              )}
              <p className="text-indigo-400 font-black text-base md:text-xl leading-none">
                <span className="text-[10px] md:text-sm mr-0.5">$</span>
                {product.price}
              </p>
            </div>

            <div className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Plus size={14} className="md:w-4 md:h-4" />
            </div>
          </div>

          {/* Tag Area */}
          <div className="pt-2 flex gap-2">
            <span className="text-[8px] md:text-[9px] font-black text-slate-500 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {product.category || "New Arrival"}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
