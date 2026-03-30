// "use client"

// import { useCart } from "@/app/store/useCart";
// import { CreditCard, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Smartphone,Calendar } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// // মোবাইল ব্যাংকিং টাইপস
// type MobileProvider = 'bkash' | 'nagad' | 'rocket' | null;

// export default function PaymentPage() {
//   const items = useCart((state: any) => state.items);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // নতুন স্টেট: কোন মেথড সিলেক্ট করা হয়েছে
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | null>(null);

//   // Hydration error এড়াতে mounted চেক
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ক্যালকুলেশন লজিক
//   const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
//   const baseShipping = 120;
//   const shipping = subtotal >= 1000 ? 0 : subtotal >= 500 ? baseShipping * 0.5 : baseShipping;
//   const total = subtotal + shipping;

//   // const handlePayment = () => {
//   //   setIsProcessing(true);
//   //   // ফেক পেমেন্ট প্রসেসিং টাইমআউট
//   //   setTimeout(() => {
//   //     setIsProcessing(false);
//   //     setIsSuccess(true);
//   //   }, 2500);
//   // };

//   const handlePayment = () => {
//     if (!paymentMethod) return alert("দয়া করে একটি পেমেন্ট মেথড সিলেক্ট করুন!");
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsSuccess(true);
//     }, 2500);
//   };

//   if (!mounted) return null;

//   // পেমেন্ট সফল হলে এই UI দেখাবে
//   if (isSuccess) {
//     return (
//       <div className="container mx-auto py-32 px-4 text-center animate-in fade-in zoom-in duration-500">
//         <div className="bg-green-100 dark:bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
//           <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
//         </div>
//         <h1 className="text-4xl font-black mb-4 text-zinc-900 dark:text-white uppercase tracking-tighter">Order Placed!</h1>
//         <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto font-medium">
//           আপনার পেমেন্ট সফল হয়েছে। খুব শীঘ্রই কনফার্মেশন মেইল পাবেন।
//         </p>
//         <Link href="/" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl">
//           Back to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12 md:py-20 px-6 max-w-5xl min-h-screen">
//       <Link href="/cart" className="flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white mb-10 transition-colors font-semibold group">
//         <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
//       </Link>

//       <div className="grid lg:grid-cols-2 gap-16 items-start">
//         {/* বাম পাশ: পেমেন্ট মেথড সিলেকশন */}
//         <div className="space-y-10">
//           <div>
//             <h1 className="text-4xl font-black dark:text-white text-zinc-900 mb-2 tracking-tighter">PAYMENT</h1>
//             <p className="text-zinc-500 font-medium">নিরাপদ পেমেন্ট গেটওয়ে সিলেক্ট করুন</p>
//           </div>
          
//           <div className="space-y-4">
//             {/* ক্রেডিট কার্ড কার্ড (Active State) */}
//             {/* <div className="p-6 border-2 border-indigo-600 rounded-[2.5rem] bg-indigo-50/30 dark:bg-indigo-500/5 flex items-center justify-between relative overflow-hidden group cursor-pointer shadow-xl shadow-indigo-500/5">
//               <div className="flex items-center gap-5">
//                 <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
//                   <CreditCard size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white text-lg">Credit / Debit Card</p>
//                   <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Selected Method</p>
//                 </div>
//               </div>
//               <div className="w-6 h-6 rounded-full border-4 border-indigo-600 bg-white dark:bg-zinc-900"></div>
//             </div> */}

//             <div 
//               onClick={() => setPaymentMethod('card')}
//               className={`p-6 border-2 rounded-[2.5rem] flex items-center justify-between cursor-pointer transition-all ${
//                 paymentMethod === 'card' 
//                 ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-500/5 shadow-xl shadow-indigo-500/5" 
//                 : "border-zinc-100 dark:border-zinc-800"
//               }`}
//             >
//               <div className="flex items-center gap-5">
//                 <div className={`${paymentMethod === 'card' ? 'bg-indigo-600' : 'bg-zinc-400'} p-3 rounded-2xl text-white shadow-lg`}>
//                   <CreditCard size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white text-lg">Credit / Debit Card</p>
//                   <p className="text-xs text-zinc-500">Visa, Mastercard, Amex</p>
//                 </div>
//               </div>
//               <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'card' ? 'border-indigo-600 bg-white' : 'border-zinc-300'}`}></div>
//             </div>

//             {/* কার্ড ডিটেইলস ইনপুট (শুধুমাত্র কার্ড সিলেক্ট করলে দেখাবে) */}
//             {paymentMethod === 'card' && (
//               <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in slide-in-from-top-4 duration-300">
//                 <div className="space-y-2">
//                   <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Card Number</label>
//                   <div className="relative">
//                     <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 ring-indigo-500/20 transition-all dark:text-white" />
//                     <CreditCard className="absolute left-4 top-4 text-zinc-400" size={20} />
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Expiry Date</label>
//                     <div className="relative">
//                       <input type="text" placeholder="MM/YY" className="w-full p-4 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 ring-indigo-500/20 transition-all dark:text-white" />
//                       <Calendar className="absolute left-4 top-4 text-zinc-400" size={20} />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-xs font-bold uppercase text-zinc-500 ml-1">CVV</label>
//                     <div className="relative">
//                       <input type="password" placeholder="123" className="w-full p-4 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 ring-indigo-500/20 transition-all dark:text-white" />
//                       <Lock className="absolute left-4 top-4 text-zinc-400" size={20} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}


//             {/* মোবাইল ব্যাংকিং (Disabled for now) */}
//             {/* <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex items-center justify-between opacity-50 grayscale bg-zinc-50 dark:bg-zinc-900/50">
//               <div className="flex items-center gap-5">
//                 <div className="bg-zinc-200 dark:bg-zinc-800 p-3 rounded-2xl text-zinc-600 dark:text-zinc-400">
//                   <Smartphone size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white text-lg">Mobile Banking</p>
//                   <p className="text-xs text-zinc-400 font-medium">Bkash, Nagad, Rocket</p>
//                 </div>
//               </div>
//               <Lock size={18} className="text-zinc-400" />
//             </div> */}

//             <div 
//               onClick={() => setPaymentMethod('mobile')}
//               className={`p-6 border-2 rounded-[2.5rem] flex items-center justify-between cursor-pointer transition-all ${
//                 paymentMethod === 'mobile' 
//                 ? "border-pink-600 bg-pink-50/30 dark:bg-pink-500/5 shadow-xl shadow-pink-500/5" 
//                 : "border-zinc-100 dark:border-zinc-800"
//               }`}
//             >
//               <div className="flex items-center gap-5">
//                 <div className={`${paymentMethod === 'mobile' ? 'bg-pink-600' : 'bg-zinc-400'} p-3 rounded-2xl text-white shadow-lg`}>
//                   <Smartphone size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white text-lg">Mobile Banking</p>
//                   <p className="text-xs text-zinc-500">bKash, Nagad, Rocket</p>
//                 </div>
//               </div>
//               <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'mobile' ? 'border-pink-600 bg-white' : 'border-zinc-300'}`}></div>
//             </div>

//             {/* মোবাইল ব্যাংকিং ইনপুট */}
//             {paymentMethod === 'mobile' && (
//               <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in slide-in-from-top-4 duration-300">
//                 <div className="space-y-2">
//                   <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Mobile Number</label>
//                   <input type="text" placeholder="01XXXXXXXXX" className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 ring-pink-500/20 transition-all dark:text-white" />
//                 </div>
//                 <p className="text-[11px] text-zinc-400 italic font-medium">আপনি পেমেন্ট কনফার্ম করলে আপনার মোবাইলে একটি OTP যাবে।</p>
//               </div>
//             )}
//           </div>

//           <div className="flex items-start gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
//             <ShieldCheck className="text-indigo-600 flex-shrink-0" size={24} />
//             <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">
//               আপনার সকল তথ্য সম্পূর্ণ ইনক্রিপ্টেড এবং ১০০% সুরক্ষিত। আমরা কার্ডের কোনো তথ্য স্টোর করি না।
//             </p>
//           </div>
//         </div>

//         {/* ডান পাশ: ফাইনাল সামারি এবং পে বাটন */}
//         <div className="lg:sticky lg:top-24">
//           <div className="p-10 rounded-[3rem] bg-zinc-900 dark:bg-white text-white dark:text-black shadow-2xl relative overflow-hidden">
//             {/* Background Accent */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px]"></div>

//             <h2 className="text-2xl font-black mb-8 border-b border-white/10 dark:border-black/10 pb-4">ORDER REVIEW</h2>
            
//             <div className="space-y-5 mb-10">
//                <div className="flex justify-between text-zinc-400 dark:text-zinc-500 font-semibold">
//                   <span>Subtotal</span>
//                   <span className="text-white dark:text-black">৳{subtotal}</span>
//                </div>
//                <div className="flex justify-between text-zinc-400 dark:text-zinc-500 font-semibold">
//                   <span>Shipping Cost</span>
//                   <span className={`font-bold ${shipping === 0 ? "text-green-400" : "text-white dark:text-black"}`}>
//                     {shipping === 0 ? "FREE" : `৳${shipping}`}
//                   </span>
//                </div>
               
//                <div className="pt-6 mt-6 border-t border-white/10 dark:border-black/10 flex justify-between items-end">
//                   <div>
//                     <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Payable</p>
//                     <p className="text-4xl font-black tracking-tighter">৳{total}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[10px] bg-indigo-600 text-white px-3 py-1 rounded-full font-black uppercase">Secured</p>
//                   </div>
//                </div>
//             </div>

//             <button 
//               onClick={handlePayment}
//               disabled={isProcessing}
//               className={`w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl ${
//                 isProcessing 
//                 ? "bg-zinc-700 dark:bg-zinc-200 cursor-not-allowed" 
//                 : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
//               }`}
//             >
//               {isProcessing ? (
//                 <>
//                   <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   <span>PROCESSING...</span>
//                 </>
//               ) : (
//                 `CONFIRM & PAY $${total}`
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client"

// import { useCart } from "@/app/store/useCart";
// import { CreditCard, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Smartphone, Calendar } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// // মোবাইল ব্যাংকিং টাইপস
// type MobileProvider = 'bkash' | 'nagad' | 'rocket' | null;

// export default function PaymentPage() {
//   const items = useCart((state: any) => state.items);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // স্টেটস: মেথড এবং নির্দিষ্ট প্রোভাইডার
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | null>(null);
//   const [selectedProvider, setSelectedProvider] = useState<MobileProvider>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ক্যালকুলেশন লজিক
//   const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
//   const baseShipping = 120;
//   const shipping = subtotal >= 1000 ? 0 : subtotal >= 500 ? baseShipping * 0.5 : baseShipping;
//   const total = subtotal + shipping;

//   const handlePayment = () => {
//     if (!paymentMethod) return alert("দয়া করে একটি পেমেন্ট মেথড সিলেক্ট করুন!");
//     if (paymentMethod === 'mobile' && !selectedProvider) return alert("একটি মোবাইল ব্যাংকিং অপারেটর সিলেক্ট করুন!");
    
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsSuccess(true);
//     }, 2500);
//   };

//   // প্রোভাইডার অনুযায়ী কালার থিম সেট করা
//   const getBrandColor = () => {
//     if (selectedProvider === 'bkash') return "border-pink-500 bg-pink-50/30 dark:bg-pink-500/10 ring-pink-500";
//     if (selectedProvider === 'nagad') return "border-orange-500 bg-orange-50/30 dark:bg-orange-500/10 ring-orange-500";
//     if (selectedProvider === 'rocket') return "border-purple-600 bg-purple-50/30 dark:bg-purple-500/10 ring-purple-600";
//     return "border-zinc-200 dark:border-zinc-800";
//   };

//   if (!mounted) return null;

//   if (isSuccess) {
//     return (
//       <div className="container mx-auto py-32 px-4 text-center animate-in fade-in zoom-in duration-500">
//         <div className="bg-green-100 dark:bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
//           <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
//         </div>
//         <h1 className="text-4xl font-black mb-4 text-zinc-900 dark:text-white uppercase tracking-tighter">Order Placed!</h1>
//         <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto font-medium">আপনার পেমেন্ট সফল হয়েছে। খুব শীঘ্রই কনফার্মেশন পাবেন।</p>
//         <Link href="/" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl">Back to Home</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12 md:py-20 px-6 max-w-5xl min-h-screen">
//       <Link href="/cart" className="flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white mb-10 transition-colors font-semibold group">
//         <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
//       </Link>

//       <div className="grid lg:grid-cols-2 gap-16 items-start">
//         <div className="space-y-10">
//           <div>
//             <h1 className="text-4xl font-black dark:text-white text-zinc-900 mb-2 tracking-tighter uppercase">Payment</h1>
//             <p className="text-zinc-500 font-medium">পেমেন্ট মেথড নিশ্চিত করুন</p>
//           </div>
          
//           <div className="space-y-4">
//             {/* Credit Card Option */}
//             <div 
//               onClick={() => { setPaymentMethod('card'); setSelectedProvider(null); }}
//               className={`p-6 border-2 rounded-[2.5rem] flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'card' ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-500/5 shadow-xl shadow-indigo-500/5" : "border-zinc-100 dark:border-zinc-800"}`}
//             >
//               <div className="flex items-center gap-5">
//                 <div className={`${paymentMethod === 'card' ? 'bg-indigo-600' : 'bg-zinc-400'} p-3 rounded-2xl text-white shadow-lg`}>
//                   <CreditCard size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white text-lg">Credit / Debit Card</p>
//                   <p className="text-xs text-zinc-500">Visa, Mastercard, Amex</p>
//                 </div>
//               </div>
//               <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'card' ? 'border-indigo-600 bg-white' : 'border-zinc-300'}`}></div>
//             </div>

//             {/* Card Inputs */}
//             {paymentMethod === 'card' && (
//               <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in slide-in-from-top-4 duration-300">
//                 <div className="space-y-2">
//                   <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Card Number</label>
//                   <div className="relative">
//                     <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 ring-indigo-500/20 transition-all dark:text-white" />
//                     <CreditCard className="absolute left-4 top-4 text-zinc-400" size={20} />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <input type="text" placeholder="MM/YY" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none dark:text-white" />
//                   <input type="password" placeholder="CVV" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none dark:text-white" />
//                 </div>
//               </div>
//             )}

//             {/* Mobile Banking Option */}
//             <div 
//               onClick={() => setPaymentMethod('mobile')}
//               className={`p-6 border-2 rounded-[2.5rem] flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'mobile' ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900/30" : "border-zinc-100 dark:border-zinc-800"}`}
//             >
//               <div className="flex items-center gap-5">
//                 <div className={`${paymentMethod === 'mobile' ? 'bg-zinc-900 dark:bg-zinc-700' : 'bg-zinc-400'} p-3 rounded-2xl text-white shadow-lg`}>
//                   <Smartphone size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white text-lg">Mobile Banking</p>
//                   <p className="text-xs text-zinc-500">bKash, Nagad, Rocket</p>
//                 </div>
//               </div>
//               <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'mobile' ? 'border-zinc-900 dark:border-white bg-white' : 'border-zinc-300'}`}></div>
//             </div>

//             {/* Logo Selection (bKash, Nagad, Rocket) */}
//             {paymentMethod === 'mobile' && (
//               <div className="grid grid-cols-3 gap-3 p-2 animate-in fade-in duration-300">
//                 {['bkash', 'nagad', 'rocket'].map((provider) => (
//                   <button 
//                     key={provider}
//                     onClick={() => setSelectedProvider(provider as MobileProvider)}
//                     className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selectedProvider === provider ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' : 'border-zinc-100 dark:border-zinc-800'}`}
//                   >
//                     <div className="w-12 h-12 cursor-pointer bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
//                        <img src={`/logos/${provider}.png`} alt={provider} className="w-10 h-10 object-contain" />
//                     </div>
//                     <span className="text-[10px] font-bold uppercase dark:text-zinc-400">{provider}</span>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Mobile Banking Input Box */}
//             {selectedProvider && (
//               <div className={`p-8 rounded-[2.5rem] border-2 transition-all animate-in slide-in-from-top-4 ${getBrandColor()}`}>
//                 <div className="space-y-3">
//                   <label className="text-xs font-black uppercase opacity-60 ml-1">Your {selectedProvider} Number</label>
//                   <input 
//                     type="text" 
//                     placeholder="01XXXXXXXXX" 
//                     className="w-full p-4 rounded-xl border-none bg-white dark:bg-zinc-800 outline-none ring-2 ring-transparent focus:ring-current transition-all dark:text-white font-bold text-lg" 
//                   />
//                   <p className="text-[10px] italic opacity-70">পেমেন্ট কনফার্ম করলে ওটিপি (OTP) কোড পাঠানো হবে।</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-start gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
//             <ShieldCheck className="text-indigo-600 flex-shrink-0" size={24} />
//             <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">আপনার সকল তথ্য সম্পূর্ণ ইনক্রিপ্টেড এবং ১০০% সুরক্ষিত।</p>
//           </div>
//         </div>

//         {/* ডান পাশ: সামারি */}
//         <div className="lg:sticky lg:top-24">
//           <div className="p-10 rounded-[3rem] bg-zinc-900 dark:bg-white text-white dark:text-black shadow-2xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px]"></div>
//             <h2 className="text-2xl font-black mb-8 border-b border-white/10 dark:border-black/10 pb-4">ORDER REVIEW</h2>
//             <div className="space-y-5 mb-10 text-zinc-400 dark:text-zinc-500 font-semibold">
//               <div className="flex justify-between"><span>Subtotal</span><span className="text-white dark:text-black">৳{subtotal}</span></div>
//               <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? "text-green-400" : "text-white dark:text-black"}>{shipping === 0 ? "FREE" : `৳${shipping}`}</span></div>
//               <div className="pt-6 mt-6 border-t border-white/10 dark:border-black/10 flex justify-between items-end">
//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest mb-1">Total Payable</p>
//                   <p className="text-4xl font-black text-white dark:text-black">৳{total}</p>
//                 </div>
//               </div>
//             </div>

//             <button 
//               onClick={handlePayment}
//               disabled={isProcessing || !paymentMethod || (paymentMethod === 'mobile' && !selectedProvider)}
//               className={`w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl ${
//                 isProcessing || !paymentMethod || (paymentMethod === 'mobile' && !selectedProvider)
//                 ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
//                 : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
//               }`}
//             >
//               {isProcessing ? "PROCESSING..." : `CONFIRM & PAY ৳${total}`}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import { useCart } from "@/app/store/useCart";
import { CreditCard, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Smartphone, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import useStore from '@/app/store/useStore'; // তোমার স্টোর পাথ

type MobileProvider = 'bkash' | 'nagad' | 'rocket' | null;

// Frontend-এর fetch কলটি এমন হবে:
// const res = await fetch("/api/create-payment-intent", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ amount: total }),
// });

// পেমেন্ট সফল হওয়ার পর  নিচের ফাংশনটি কল করে ডাটাবেজে অর্ডার সেভ করা হয়:
// const saveOrder = async (paymentIntentId) => {
//   const orderData = {
//     items: cartItems,
//     totalAmount: total,
//     paymentMethod: "card",
//     paymentStatus: "paid",
//     stripePaymentId: paymentIntentId
//   };

//   await fetch("/api/orders", {
//     method: "POST",
//     body: JSON.stringify(orderData)
//   });
// };

export default function PaymentPage() {
  const items = useCart((state: any) => state.items);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cart, addOrder } = useStore();

  // পেমেন্ট স্টেটস
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<MobileProvider>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const baseShipping = 120;
  const shipping = subtotal >= 1000 ? 0 : subtotal >= 500 ? baseShipping * 0.5 : baseShipping;
  const total = subtotal + shipping;

  // const handlePayment = () => {
  //   if (!paymentMethod) return alert("দয়া করে একটি পেমেন্ট মেথড সিলেক্ট করুন!");
    
  //   // মোবাইল ব্যাংকিং এর জন্য OTP লজিক
  //   if (paymentMethod === 'mobile') {
  //     if (!selectedProvider) return alert("একটি অপারেটর সিলেক্ট করুন!");
  //     if (!showOtp) {
  //       setIsProcessing(true);
  //       setTimeout(() => {
  //         setIsProcessing(false);
  //         setShowOtp(true);
  //       }, 1500);
  //       return;
  //     }
  //   }

  //   // কার্ড বা ওটিপি ভেরিফিকেশনের পর ফাইনাল পেমেন্ট
  //   setIsProcessing(true);
  //   setTimeout(() => {
  //     setIsProcessing(false);
  //     setIsSuccess(true);
  //   }, 2500);
  // };

  const handlePayment = () => {
  // ১. স্টোর থেকে প্রয়োজনীয় ফাংশন ও ডেটা নিয়ে আসা (ধরে নিচ্ছি cart তোমার স্টোরে আছে)
  const { cart, addOrder, clearCart } = useStore.getState(); 
// পেমেন্ট সাকসেস হওয়ার পর
  const { items, completeOrder } = useCart.getState();

  if (!paymentMethod) return alert("দয়া করে একটি পেমেন্ট মেথড সিলেক্ট করুন!");
  
  // মোবাইল ব্যাংকিং এর জন্য OTP লজিক
  if (paymentMethod === 'mobile') {
    if (!selectedProvider) return alert("একটি অপারেটর সিলেক্ট করুন!");
    if (!showOtp) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowOtp(true);
      }, 1500);
      return;
    }
  }

  // cart clear korar jonno func 
  
  if (items.length > 0) {
  const orderDetails = {
    orderId: `ID-${Math.floor(Math.random() * 100000)}`,
    products: items,
    totalPrice: items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0),
    date: new Date().toISOString()
  };

  // এই একটি ফাংশনেই অর্ডার সেভ হবে এবং কার্ট খালি হয়ে যাবে
  completeOrder(orderDetails);
  
  setIsSuccess(true);
  alert("অর্ডার সফল হয়েছে এবং কার্ট খালি করা হয়েছে!");
}

  // কার্ড বা ওটিপি ভেরিফিকেশনের পর ফাইনাল পেমেন্ট সাকসেস লজিক
  setIsProcessing(true);
  
  setTimeout(() => {
    setIsProcessing(false);
    setIsSuccess(true);

    // ২. অর্ডার ডেটা অবজেক্ট তৈরি করা
    const finalOrder = {
      orderId: `ORD-${Date.now()}`, // ইউনিক আইডি
      items: [...cart], // বর্তমান কার্টের কপি
      totalAmount: cart.reduce((total, item) => total + item.price, 0),
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString(),
    };

    // ৩. Zustand স্টোরে সেভ করা
    addOrder(finalOrder); 

    // ৪. কার্ট খালি করে দেওয়া (যদি addOrder-এর ভেতরে না করা থাকে)
    // clearCart(); 
    
    console.log("Order saved to local store:", finalOrder);
  }, 2500);
};
  const getBrandColor = () => {
    if (selectedProvider === 'bkash') return "border-pink-500 bg-pink-50/30 dark:bg-pink-500/10 ring-pink-500 text-pink-600";
    if (selectedProvider === 'nagad') return "border-orange-500 bg-orange-50/30 dark:bg-orange-500/10 ring-orange-500 text-orange-600";
    if (selectedProvider === 'rocket') return "border-purple-600 bg-purple-50/30 dark:bg-purple-500/10 ring-purple-600 text-purple-600";
    return "border-zinc-200 dark:border-zinc-800";
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="container mx-auto py-32 px-4 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 dark:bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
          <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-black mb-4 text-zinc-900 dark:text-white uppercase tracking-tighter italic">Payment Successful!</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto font-medium">আপনার অর্ডারটি নিশ্চিত করা হয়েছে। ধন্যবাদ!</p>
        <Link href="/" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 md:py-20 px-6 max-w-5xl min-h-screen">
      <Link href="/cart" className="flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white mb-10 transition-colors font-semibold group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
      </Link>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-black dark:text-white text-zinc-900 mb-2 tracking-tighter uppercase italic">Checkout</h1>
            <p className="text-zinc-500 font-medium">আপনার পছন্দমতো পেমেন্ট মেথডটি বেছে নিন</p>
          </div>
          
          <div className="space-y-4">
            {/* --- কার্ড পেমেন্ট সেকশন --- */}
            <div 
              onClick={() => { setPaymentMethod('card'); setSelectedProvider(null); setShowOtp(false); }}
              className={`p-6 border-2 rounded-[2.5rem] flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'card' ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-500/5 shadow-xl shadow-indigo-500/5" : "border-zinc-100 dark:border-zinc-800"}`}
            >
              <div className="flex items-center gap-5">
                <div className={`${paymentMethod === 'card' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'} p-3 rounded-2xl`}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <p className="font-bold dark:text-white text-lg">Credit / Debit Card</p>
                  <p className="text-xs text-zinc-500 italic">Secure Visa, Mastercard, Amex</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'card' ? 'border-indigo-600 bg-white' : 'border-zinc-300'}`}></div>
            </div>

            {/* কার্ড ইনপুট বক্স (শুধুমাত্র কার্ড সিলেক্ট করলে দেখাবে) */}
            {paymentMethod === 'card' && (
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-zinc-400 ml-1">Card Number</label>
                  <div className="relative">
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 pl-12 rounded-xl border-none bg-white dark:bg-zinc-800 outline-none ring-2 ring-zinc-200 dark:ring-zinc-700 focus:ring-indigo-500 transition-all dark:text-white font-bold" />
                    <CreditCard className="absolute left-4 top-4 text-zinc-400" size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="p-4 rounded-xl border-none bg-white dark:bg-zinc-800 outline-none ring-2 ring-zinc-200 dark:ring-zinc-700 focus:ring-indigo-500 dark:text-white font-bold" />
                  <input type="password" placeholder="CVV" className="p-4 rounded-xl border-none bg-white dark:bg-zinc-800 outline-none ring-2 ring-zinc-200 dark:ring-zinc-700 focus:ring-indigo-500 dark:text-white font-bold" />
                </div>
              </div>
            )}

            {/* --- মোবাইল ব্যাংকিং সেকশন --- */}
            <div 
              onClick={() => { setPaymentMethod('mobile'); setShowOtp(false); }}
              className={`p-6 border-2 rounded-[2.5rem] flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'mobile' ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900/30 shadow-xl" : "border-zinc-100 dark:border-zinc-800"}`}
            >
              <div className="flex items-center gap-5">
                <div className={`${paymentMethod === 'mobile' ? 'bg-zinc-900 dark:bg-zinc-700 text-white' : 'bg-zinc-100 text-zinc-400'} p-3 rounded-2xl`}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <p className="font-bold dark:text-white text-lg">Mobile Banking</p>
                  <p className="text-xs text-zinc-500 italic">bKash, Nagad, Rocket</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'mobile' ? 'border-zinc-900 dark:border-white bg-white' : 'border-zinc-300'}`}></div>
            </div>

            {/* প্রোভাইডার লোগো এবং ওটিপি লজিক */}
            {paymentMethod === 'mobile' && (
              <div className="space-y-4">
                {!showOtp && (
                  <div className="grid grid-cols-3 gap-3 p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {['bkash', 'nagad', 'rocket'].map((provider) => (
                      <button 
                        key={provider}
                        onClick={() => setSelectedProvider(provider as MobileProvider)}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selectedProvider === provider ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 scale-105 shadow-lg' : 'border-zinc-100 dark:border-zinc-800 opacity-60'}`}
                      >
                        <div className="w-12 h-12 cursor-pointer bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-zinc-100">
                           <img src={`/logos/${provider}.png`} alt={provider} className="w-9 h-9 object-contain" />
                        </div>
                        <span className="text-[10px] font-black uppercase dark:text-zinc-400">{provider}</span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedProvider && (
                  <div className={`p-8 rounded-[2.5rem] border-2 transition-all animate-in zoom-in-95 duration-300 ${getBrandColor()}`}>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black uppercase opacity-60 ml-1">Your {selectedProvider} Number</label>
                        {showOtp && <button onClick={() => setShowOtp(false)} className="text-[10px] bg-white/50 px-2 py-1 rounded-md font-bold text-black uppercase">Change</button>}
                      </div>
                      <input 
                        type="text" 
                        disabled={showOtp}
                        placeholder="01XXXXXXXXX" 
                        className="w-full p-4 rounded-xl border-none bg-white dark:bg-zinc-800 outline-none ring-2 ring-transparent focus:ring-current transition-all dark:text-white font-bold text-xl disabled:opacity-50" 
                      />

                      {showOtp && (
                        <div className="pt-4 border-t border-current/10 space-y-4 animate-in slide-in-from-top-4 duration-500 text-center">
                           <label className="text-xs font-black uppercase opacity-80">Enter 6-Digit OTP</label>
                           <input 
                             type="text" 
                             maxLength={6}
                             value={otp}
                             onChange={(e) => setOtp(e.target.value)}
                             placeholder="------" 
                             className="w-full p-4 rounded-xl border-none bg-white dark:bg-zinc-800 text-center tracking-[1.2rem] outline-none ring-2 ring-current transition-all dark:text-white font-black text-2xl" 
                           />
                           <p className="text-[10px] font-bold opacity-60">Haven't received it? <span className="underline cursor-pointer">Resend</span></p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-start gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
            <ShieldCheck className="text-indigo-600 flex-shrink-0" size={24} />
            <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">আপনার পেমেন্ট গেটওয়ে ১০০% এনক্রিপ্টেড এবং নিরাপদ। আমরা আপনার গোপনীয়তা রক্ষা করি।</p>
          </div>
        </div>

        {/* --- ডান পাশ: সামারি এবং বাটন --- */}
        <div className="lg:sticky lg:top-24">
          <div className="p-10 rounded-[3rem] bg-zinc-900 dark:bg-white text-white dark:text-black shadow-2xl relative overflow-hidden">
            <h2 className="text-xl font-black mb-8 border-b border-white/10 dark:border-black/10 pb-4 tracking-widest italic uppercase">Order Review</h2>
            <div className="space-y-5 mb-10 font-semibold">
              <div className="flex justify-between opacity-60"><span>Subtotal</span><span>৳{subtotal}</span></div>
              <div className="flex justify-between opacity-60"><span>Shipping</span><span className={shipping === 0 ? "text-green-400" : ""}>{shipping === 0 ? "FREE" : `৳${shipping}`}</span></div>
              <div className="pt-6 mt-6 border-t border-white/10 dark:border-black/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-40">Total Amount</p>
                  <p className="text-5xl font-black tracking-tighter">৳{total}</p>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing || !paymentMethod || (paymentMethod === 'mobile' && !selectedProvider)}
              className={`w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl ${
                isProcessing || !paymentMethod || (paymentMethod === 'mobile' && !selectedProvider)
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
              }`}
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                paymentMethod === 'mobile' ? (showOtp ? "VERIFY & PAY" : "GET OTP & PAY") : "PAY SECURELY"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}