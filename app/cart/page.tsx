// "use client"

// import { useCart } from "@/app/store/useCart";
// import Link from "next/link";
// import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
// import { useRouter } from "next/navigation";
// export default function CartPage() {
//   const items = useCart((state: any) => state.items);
//   const { increase, decrease, removeFromCart } = useCart() as any;
//     // payment page ফাংশনের ভেতরে:
// const router = useRouter();

//   // ১. ক্যালকুলেশন লজিক
//   const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
//   const baseShipping = 120;
//   let shippingCharge = baseShipping;

//   if (subtotal === 0) {
//     shippingCharge = 0;
//   } else if (subtotal >= 1000) {
//     shippingCharge = 0; // Free
//   } else if (subtotal >= 500) {
//     shippingCharge = baseShipping * 0.5; // 50% Off
//   }

//   const finalTotal = subtotal + shippingCharge;

//   // কার্ট খালি থাকলে যা দেখাবে
//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto py-32 px-4 text-center">
//         <ShoppingBag className="mx-auto mb-6 text-zinc-400" size={64} />
//         <h1 className="text-4xl font-bold mb-4  dark:text-white ">আপনার কার্টটি খালি! 🛒</h1>
//         <p className="text-zinc-500 mb-8 font-medium italic">মনে হচ্ছে আপনি এখনো কিছু পছন্দ করেননি।</p>
//         <Link 
//           href="/" 
//           className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-full font-bold transition-transform active:scale-95 shadow-lg"
//         >
//           <ArrowLeft size={18} /> শপিং চালিয়ে যান
//         </Link>
//       </div>
//     );

  
//   }

//   return (
//     <div className="container mx-auto py-12 md:py-24 px-6 min-h-screen">
//       <h1 className="text-4xl font-extrabold mb-12 tracking-tight text-zinc-900 dark:text-white">Shopping Cart</h1>

//       <div className="grid lg:grid-cols-12 gap-12">
//         {/* ১. কার্ট আইটেম লিস্ট (Left Side) */}
//         <div className="lg:col-span-8 space-y-6">
//           {items.map((item: any) => (
//             <div 
//               key={item.id} 
//               className="flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm"
//             >
//               {/* প্রোডাক্ট ইমেজ */}
//               <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
//                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//               </div>

//               {/* প্রোডাক্ট ডিটেইলস */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{item.name}</h2>
//                     <p className="text-zinc-500 text-sm mt-1">Premium Edition</p>
//                   </div>
//                   <p className="text-xl font-bold text-zinc-900 dark:text-white">৳{item.price}</p>
//                 </div>

//                 <div className="flex justify-between items-center mt-6">
//                   {/* কোয়ান্টিটি কন্ট্রোল */}
//                   <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700">
//                     <button onClick={() => decrease(item.id)} className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
//                       <Minus size={16} />
//                     </button>
//                     <span className="font-bold w-4 text-center text-zinc-900 dark:text-white">{item.quantity}</span>
//                     <button onClick={() => increase(item.id)} className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
//                       <Plus size={16} />
//                     </button>
//                   </div>
                  
//                   {/* রিমুভ বাটন */}
//                   <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors">
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ২. অর্ডার সামারি (Right Side) */}
//         <div className="lg:col-span-4">
//           <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black sticky top-24 shadow-2xl transition-colors duration-300">
//             <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            
//             <div className="space-y-4">
//               {/* সাবটোটাল */}
//               <div className="flex justify-between text-zinc-400 dark:text-zinc-500 font-medium">
//                 <span>Subtotal</span>
//                 <span>৳{subtotal}</span>
//               </div>
//                 {/* <div className="space-y-4 mb-8">

//               <div className="flex justify-between text-zinc-400 dark:text-zinc-500">

//                 <span>Subtotal</span>

//                 <span className="font-medium">${totalPrice}</span>

//               </div>

//               <div className="flex justify-between text-zinc-400 dark:text-zinc-500">

//                 <span>Shipping</span>

//                 <span className="font-medium text-green-500 font-bold">Free</span>

//               </div>

//               <hr className="border-zinc-800 dark:border-zinc-200" />

//               <div className="flex justify-between text-xl font-bold">

//                 <span>Total</span>

//                 <span>${totalPrice}</span>

//               </div>

//             </div> */}

//             {/******************************  2nd card method Start****************************************************** */}

//             {/* <div className="space-y-4 mb-8"> */}
//             {/* সাবটোটাল */}
//             {/* <div className="flex justify-between text-zinc-400 dark:text-zinc-500">
//               <span>Subtotal</span>
//               <span className="font-medium">${subtotal}</span>
//             </div> */}



//             {/* শিপিং চার্জ কন্ডিশনাল UI */}

//             {/* <div className="flex justify-between text-zinc-400 dark:text-zinc-500">
//               <span>Shipping</span>
//               <span className={`font-bold ${shippingCharge === 0 ? "text-green-500" : "text-indigo-500"}`}>
//                 {shippingCharge === 0 ? (
//                   "Free"
//                 ) : subtotal >= 500 ? (
//                   <span>{`shippingCharge-50%`} <small className="text-[10px] line-through text-zinc-400">(50% Off)</small></span>
//                 ) : (
//                   `$${shippingCharge}`
//                 )}
//               </span>
//             </div> */}

//             {/* <hr className="border-zinc-800 dark:border-zinc-200" /> */}

//             {/* সর্বমোট দাম */}

//             {/* <div className="flex justify-between text-xl font-bold">
//               <span>Total</span>
//               <span>${finalTotal}</span>
//             </div>
//           </div> */}

// {/* 2nd card method Ending ******************************************/}

//               {/*  ডাইনামিক শিপিং চার্জ */}
//               <div className="flex justify-between items-start">
//                 <span className="text-zinc-400 dark:text-zinc-500 font-medium">Shipping</span>
//                 <div className="text-right">
//                   <span className={`font-bold transition-all ${shippingCharge === 0 ? "text-green-400" : "text-white dark:text-black"}`}>
//                     {shippingCharge === 0 ? "Free Shipping" : `৳${shippingCharge}`}
//                   </span>
//                   {subtotal >= 500 && subtotal < 1000 && (
//                     <p className="text-[10px] text-green-400 font-medium tracking-wide">
//                       (50% OFF)
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <hr className="border-zinc-800 dark:border-zinc-200 my-6" />

//               {/* গ্র্যান্ড টোটাল */}
//               <div className="flex justify-between items-center text-2xl font-black mb-10">
//                 <span>Total</span>
//                 <span className="text-indigo-400 dark:text-indigo-600">৳{finalTotal}</span>
//               </div>

//               <button onClick={() => router.push("/payment")} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all active:scale-95 shadow-xl shadow-indigo-500/20">
//                 Checkout Now
//               </button>
              
//               <p className="text-[10px] text-center text-zinc-500 dark:text-zinc-400 mt-4 italic">
//                 Secure checkout powered by PremiumStore
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useCart } from "@/app/store/useCart";
import { useAuth } from "@/app/store/useAuth";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth(); 
  
  const items = useCart((state: any) => state.items);
  const { increase, decrease, removeFromCart } = useCart() as any;

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push("/payment"); 
    } else {
      router.push("/login?redirect=/cart"); 
    }
  };

  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const baseShipping = 120;
  let shippingCharge = baseShipping;

  if (subtotal === 0) {
    shippingCharge = 0;
  } else if (subtotal >= 1000) {
    shippingCharge = 0; 
  } else if (subtotal >= 500) {
    shippingCharge = baseShipping * 0.5; 
  }

  const finalTotal = subtotal + shippingCharge;

  if (items.length === 0) {
    return (
      // bg-white dark:bg-[#020617] যোগ করা হয়েছে গ্যাপ দূর করতে
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] transition-colors duration-300">
        <div className="container mx-auto py-32 px-4 text-center">
          <ShoppingBag className="mx-auto mb-6 text-zinc-400 dark:text-zinc-600" size={64} />
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">আপনার কার্টটি খালি! 🛒</h1>
          <p className="text-zinc-500 mb-8 font-medium italic">মনে হচ্ছে আপনি এখনো কিছু পছন্দ করেননি।</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-full font-bold transition-transform active:scale-95 shadow-lg"
          >
            <ArrowLeft size={18} /> শপিং চালিয়ে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    // মেইন কন্টেইনারে ডার্ক ব্যাকগ্রাউন্ড দেওয়া হয়েছে
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="container mx-auto py-12 md:py-24 px-6">
        <h1 className="text-4xl font-extrabold mb-12 tracking-tight text-zinc-900 dark:text-white">Shopping Cart</h1>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* ১. কার্ট আইটেম লিস্ট */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item: any) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-slate-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 shadow-sm"
              >
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border dark:border-white/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{item.name}</h2>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Premium Edition</p>
                    </div>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">৳{item.price}</p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-4 bg-white dark:bg-zinc-800 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10">
                      <button onClick={() => decrease(item.id)} className="text-zinc-500 hover:text-indigo-600 transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-4 text-center text-zinc-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => increase(item.id)} className="text-zinc-500 hover:text-indigo-600 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-full transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ২. অর্ডার সামারি - ডার্ক মোডে এটি এখন ডার্ক থাকবে */}
          <div className="lg:col-span-4">
            <div className="p-8 rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900/80 text-white border border-transparent dark:border-white/10 sticky top-24 shadow-2xl">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">৳{subtotal}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-zinc-400 font-medium">Shipping</span>
                  <div className="text-right">
                    <span className={`font-bold ${shippingCharge === 0 ? "text-green-400" : "text-white"}`}>
                      {shippingCharge === 0 ? "Free Shipping" : `৳${shippingCharge}`}
                    </span>
                    {subtotal >= 500 && subtotal < 1000 && (
                      <p className="text-[10px] text-green-400 font-medium tracking-wide">(50% OFF)</p>
                    )}
                  </div>
                </div>

                <hr className="border-zinc-800 my-6" />

                <div className="flex justify-between items-center text-2xl font-black mb-10">
                  <span>Total</span>
                  <span className="text-indigo-400">৳{finalTotal}</span>
                </div>

                <button 
                  onClick={handleCheckout} 
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
                >
                  Checkout Now
                </button>
                
                <p className="text-[10px] text-center text-zinc-500 mt-4 italic">
                  {isLoggedIn ? "Redirecting to payment..." : "Please login to proceed with payment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}