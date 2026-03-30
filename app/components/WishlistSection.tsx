// "use client";
// import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
// import { motion } from "framer-motion";

// const items = [
//   { id: 1, name: "Luxury Smart Watch", price: 4500, rating: 4.8 },
//   { id: 2, name: "Premium Hoodie", price: 1250, rating: 4.5 }
// ];

// export default function WishlistSection() {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 10 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between mb-8">
//         <h3 className="text-3xl font-black tracking-tight text-white">My Wishlist</h3>
//         <p className="text-slate-500 font-bold">{items.length} Items Saved</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {items.map((item) => (
//           <motion.div 
//             key={item.id} 
//             whileHover={{ y: -5 }}
//             className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] group hover:border-indigo-500/40 transition-all shadow-xl backdrop-blur-sm"
//           >
//             <div className="flex gap-6 items-center">
//                <div className="w-24 h-24 bg-zinc-800 rounded-[2rem] overflow-hidden border border-white/10 shrink-0 group-hover:scale-95 transition-transform" />
//                <div className="flex-1">
//                   <h5 className="font-black text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">
//                     {item.name}
//                   </h5>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Star size={12} className="text-yellow-500 fill-yellow-500" />
//                     <span className="text-xs font-bold text-slate-500">{item.rating}</span>
//                   </div>
//                   <p className="text-indigo-400 font-black mt-2 text-xl">৳{item.price}</p>
//                </div>
//             </div>

//             <div className="flex gap-3 mt-6 pt-6 border-t border-white/5">
//               <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-95">
//                 <ShoppingBag size={14} /> Add To Cart
//               </button>
//               <button className="p-3.5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shrink-0 active:scale-90">
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {items.length === 0 && (
//         <div className="p-20 bg-white/5 border border-dashed border-white/10 rounded-[3rem] text-center">
//             <Heart size={48} className="mx-auto text-slate-700 mb-4 opacity-20" />
//             <p className="text-slate-500 font-bold text-lg">Your wishlist is lonely.</p>
//         </div>
//       )}
//     </motion.div>
//   );
// }

"use client";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/app/store/useWishlist"; 
import { useCart } from "@/app/store/useCart";

export default function WishlistSection() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart() as any;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase italic">My Wishlist</h3>
        <p className="text-indigo-400 font-bold text-xs sm:text-sm bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
          {wishlist.length} {wishlist.length <= 1 ? "Item" : "Items"} Saved
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {wishlist.map((item) => (
            <motion.div 
              key={item.id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 sm:p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] group hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden shadow-2xl"
            >
              {/* Card Content Layout */}
              <div className="flex gap-4 sm:gap-6 items-center">
                {/* Image Section - Fixed size for mobile, dynamic for tablet */}
                <Link href={`/product/${item.id}`} className="shrink-0">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-600 font-bold text-[10px] uppercase">No Img</div>
                    )}
                  </div>
                </Link>

                {/* Details Section */}
                <div className="flex-1 min-w-0">
                   <Link href={`/product/${item.id}`}>
                      <h5 className="font-black text-base sm:text-xl text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
                        {item.name}
                      </h5>
                   </Link>
                   
                   <div className="flex items-center gap-2 mt-1 sm:mt-2">
                     <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-lg border border-yellow-500/10">
                       <Star size={10} className="text-yellow-500 fill-yellow-500" />
                       <span className="text-[10px] font-black text-yellow-500">{item.rating || "4.5"}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">Verified Review</span>
                   </div>

                   <p className="text-white font-black mt-2 sm:mt-3 text-lg sm:text-2xl flex items-baseline gap-1">
                      <span className="text-indigo-400 text-xs sm:text-sm font-bold">৳</span>
                      {item.price}
                   </p>
                </div>
              </div>

              {/* Action Buttons - Stacked on tiny mobile, row on larger */}
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5">
                <button 
                  onClick={() => addToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 bg-indigo-600 text-white rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95"
                >
                  <ShoppingBag size={14} className="sm:w-4 sm:h-4" /> Add To Cart
                </button>

                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-3 sm:p-4 bg-red-500/5 text-red-500 border border-red-500/10 rounded-xl sm:rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95 group/del"
                  title="Remove"
                >
                  <Trash2 size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 sm:py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] sm:rounded-[4rem] text-center flex flex-col items-center justify-center px-4"
        >
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
               <Heart size={32} className="text-slate-800 animate-pulse" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Wishlist Empty</h4>
            <p className="text-slate-500 font-bold text-xs sm:text-sm max-w-[250px] sm:max-w-none">
              Explore our collections and save your favorite items for later!
            </p>
            <Link href="/shop" className="mt-8 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
               Start Shopping
            </Link>
        </motion.div>
      )}
    </motion.div>
  );
}