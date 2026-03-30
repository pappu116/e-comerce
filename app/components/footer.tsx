// // components/footer.tsx

// "use client"

// import Link from "next/link"
// import { Facebook, Instagram, Twitter, Github } from "lucide-react"
// import { Input } from "@/app/components/ui/input"
// import { Button } from "@/app/components/ui/button"

// export default function Footer() {
//   return (
//     <footer className="mt-24 border-t bg-background/80 backdrop-blur-xl">
//       <div className="container mx-auto px-6 py-16">
        
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

//           {/* Brand */}
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight mb-4">
//               PremiumStore
//             </h2>
//             <p className="text-muted-foreground text-sm leading-relaxed">
//               Elevate your lifestyle with premium quality products crafted 
//               for modern living.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>
//                 <Link href="/shop" className="hover:text-foreground transition">
//                   Shop
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/cart" className="hover:text-foreground transition">
//                   Cart
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-foreground transition">
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-foreground transition">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="font-semibold mb-4 text-lg">Support</h3>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>
//                 <Link href="#" className="hover:text-foreground transition">
//                   Help Center
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-foreground transition">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-foreground transition">
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="font-semibold mb-4 text-lg">Subscribe</h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Get updates on new arrivals and exclusive offers.
//             </p>
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Your email"
//                 className="rounded-full"
//               />
//               <Button className="rounded-full px-6">
//                 Join
//               </Button>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Section */}
//         <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t pt-6 text-sm text-muted-foreground gap-4">
          
//           <p>
//             © {new Date().getFullYear()} PremiumStore. All rights reserved.
//           </p>

//           <div className="flex gap-4">
//             <Link href="#" className="hover:text-foreground transition">
//               <Facebook size={18} />
//             </Link>
//             <Link href="#" className="hover:text-foreground transition">
//               <Instagram size={18} />
//             </Link>
//             <Link href="#" className="hover:text-foreground transition">
//               <Twitter size={18} />
//             </Link>
//             <Link href="#" className="hover:text-foreground transition">
//               <Github size={18} />
//             </Link>
//           </div>

//         </div>

//       </div>
//     </footer>
//   )
// }


// "use client"

// import Link from "next/link"
// import { Facebook, Instagram, Twitter, Github } from "lucide-react"
// import { Input } from "@/app/components/ui/input"
// import { Button } from "@/app/components/ui/button"

// export default function Footer() {
//   return (
//     // এখানে bg-white dark:bg-[#020617] যোগ করা হয়েছে নিশ্চিত কালারের জন্য
//     <footer className=" border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#020617] transition-colors duration-300">
//       <div className="container mx-auto px-6 py-16">
        
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

//           {/* Brand */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
//               Premium<span className="text-indigo-600">Store</span>
//             </h2>
//             <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
//               Elevate your lifestyle with premium quality products crafted 
//               for modern living. Your satisfaction is our priority.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Quick Links</h3>
//             <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
//               <li><Link href="/shop" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Shop</Link></li>
//               <li><Link href="/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Cart</Link></li>
//               <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</Link></li>
//               <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Support</h3>
//             <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
//               <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Help Center</Link></li>
//               <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</Link></li>
//               <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Service</Link></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Subscribe</h3>
//             <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
//               Get updates on new arrivals and exclusive offers.
//             </p>
//             <div className="flex flex-col gap-3">
//               <Input
//                 placeholder="Your email"
//                 className="rounded-xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:ring-indigo-500"
//               />
//               <Button className="rounded-xl px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
//                 Join Now
//               </Button>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Section */}
//         <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-slate-100 dark:border-white/5 pt-8 gap-4">
          
//           <p className="text-sm text-slate-500 dark:text-slate-400">
//             © {new Date().getFullYear()} <span className="font-bold">PremiumStore</span>. All rights reserved.
//           </p>

//           <div className="flex gap-3">
//             {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
//               <Link 
//                 key={i} 
//                 href="#" 
//                 className="p-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
//               >
//                 <Icon size={18} />
//               </Link>
//             ))}
//           </div>

//         </div>

//       </div>
//     </footer>
//   )
// }

"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Github, Send, ShieldCheck, Globe, Zap } from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      
      {/* Decorative Glow for Dark Mode */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        
        {/* Top Section: Branding & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md space-y-6">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
              Premium<span className="text-indigo-600">Store</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              We redefine luxury by bringing high-end fashion and lifestyle products 
              to your doorstep. Experience the peak of modern living with us.
            </p>
            <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <ShieldCheck size={16} className="text-indigo-500" /> Secure Payment
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Globe size={16} className="text-indigo-500" /> Global Shipping
                </div>
            </div>
          </div>

          <div className="w-full lg:w-[400px] p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Zap size={60} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Join the Inner Circle</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Get 15% off your first order & weekly drops.</p>
            <div className="relative flex items-center">
              <Input
                placeholder="Enter your email"
                className="h-14 pl-6 pr-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 focus-visible:ring-indigo-600 font-medium"
              />
              <button className="absolute right-2 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-slate-100 dark:border-white/5 py-16">
          
          {/* Collection */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Collection</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><Link href="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">Men's Wear</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">Women's Fashion</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">Limited Edition</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Company</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Press</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Help Desk</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Legal</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
              © {new Date().getFullYear()} <span className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">PremiumStore</span>. Handcrafted with passion.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
              <Link 
                key={i} 
                href="#" 
                className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 rounded-full hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-200 dark:border-white/5"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>

        </div>

      </div>
    </footer>
  )
}