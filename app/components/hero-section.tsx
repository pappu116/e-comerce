// "use client"

// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button" 
// import Image from "next/image"
// import { PlayCircle } from "lucide-react"
// import Heroin from "@/public/logos/images (4).jpg"

// export default function HeroSection() {
//   return (
//     // bg-slate-50 (light) and dark:bg-slate-950 (dark)
//     <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50 dark:bg-[#020617] py-16 transition-colors duration-300">
      
//       {/* Background Decorative Elements - Adjusted for Dark Mode */}
//       <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/10 dark:bg-teal-500/5 skew-x-12 translate-x-20 -z-10" />
      
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

//         {/* Left Content */}
//         <div className="text-center md:text-left order-2 md:order-1">
//           <motion.span 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="text-teal-600 dark:text-teal-400 font-medium tracking-[0.2em] uppercase text-sm mb-4 block"
//           >
//             New Arrival
//           </motion.span>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             // text-slate-900 (light) and dark:text-white (dark)
//             className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white leading-[1.1]"
//           >
//             THE BEST <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
//               LOOK ANYTIME
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             // text-slate-500 (light) and dark:text-slate-400 (dark)
//           className="text-slate-500 dark:text-slate-400 mb-8 text-lg max-w-md leading-relaxed"
//           >
//             Refresh your style with on-trend pieces from our latest clothing collection. 
//             Anyone can get dressed up and glamorous.
//           </motion.p>

//           {/* Action Buttons */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="flex flex-wrap gap-6 justify-center md:justify-start items-center"
//           >
//             <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-7 text-lg rounded-none shadow-xl transition-all hover:-translate-y-1">
//               Shop Now
//             </Button>
            
//             <button className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 hover:text-teal-600 transition-colors group">
//               <PlayCircle className="w-12 h-12 text-teal-500 group-hover:scale-110 transition-transform" />
//               Watch Video
//             </button>
//           </motion.div>

//           {/* Trust Badges */}
//           <div className="mt-12 flex items-center gap-8 border-t border-slate-200 dark:border-white/10 pt-8 justify-center md:justify-start">
//              <div className="text-center md:text-left">
//                 <p className="text-2xl font-bold text-slate-900 dark:text-white">4.8</p>
//                 <p className="text-xs text-slate-400 uppercase tracking-widest">Rating</p>
//              </div>
//              <div className="text-center md:text-left">
//                 <p className="text-2xl font-bold text-slate-900 dark:text-white">12K+</p>
//                 <p className="text-xs text-slate-400 uppercase tracking-widest">Customers</p>
//              </div>
//           </div>
//         </div>

//         {/* Right Image Section */}
//         <div className="relative order-1 md:order-2 flex justify-center items-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
//             animate={{ opacity: 1, scale: 1, rotate: 0 }}
//             transition={{ duration: 1 }}
//             className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] z-20"
//           >
//             {/* Border adjusted for dark mode */}
//             <div className="absolute inset-0 border-[12px] border-white dark:border-slate-900 shadow-2xl rounded-t-full overflow-hidden transition-colors">
//                <Image
//                  src={Heroin} 
//                  alt="Model"
//                  fill
//                  className="object-cover"
//                  priority
//                />
//             </div>
            
//             <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-teal-200 dark:border-teal-900 rounded-t-full -z-10" />
//           </motion.div>

//           {/* Floating Element - Dark mode friendly */}
//           <motion.div 
//             animate={{ y: [0, -15, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute -right-4 top-20 bg-white dark:bg-slate-900 p-4 shadow-lg dark:shadow-teal-500/10 rounded-xl z-30 hidden lg:block border dark:border-white/5"
//           >
//             <div className="flex items-center gap-3">
//                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-500 text-xl font-bold">✨</div>
//                <div>
//                   <p className="text-sm font-bold dark:text-white">New Style</p>
//                   <p className="text-[10px] text-slate-400 uppercase">Just Arrived</p>
//                </div>
//             </div>
//           </motion.div>
//         </div>

//       </div>
//     </section>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" 
import Image from "next/image"
import { PlayCircle, ArrowRight, Sparkles } from "lucide-react"
import Heroin from "@/public/logos/images (4).jpg"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-[#020617] py-20 transition-colors duration-500">
      
      {/* Background Shapes & Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/5 blur-[100px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* --- Left Content --- */}
        <div className="text-center lg:text-left order-2 lg:order-1 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 mb-6"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">New Season 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black mb-8 text-slate-900 dark:text-white leading-[0.95] tracking-tighter"
          >
            DEFINE <br />
            <span className="italic font-light text-slate-400 dark:text-slate-500">YOUR</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 animate-gradient-x">
              SIGNATURE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 dark:text-slate-400 mb-10 text-lg md:text-xl max-w-lg leading-relaxed font-medium mx-auto lg:mx-0"
          >
            Discover the fusion of luxury and street culture. Our new collection brings 
            unparalleled comfort with a bold aesthetic for the modern icon.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
          >
            <Button size="lg" className="h-16 px-10 bg-teal-600 hover:bg-teal-500 text-white rounded-full text-lg font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(13,148,136,0.3)] transition-all hover:-translate-y-1 group">
              Explore Now <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <button className="flex items-center gap-4 font-black text-slate-800 dark:text-slate-200 hover:text-teal-500 transition-colors group uppercase text-sm tracking-widest">
              <div className="w-14 h-14 rounded-full border-2 border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-teal-500 transition-all">
                 <PlayCircle className="w-8 h-8 text-teal-500 fill-teal-500/10 group-hover:scale-110 transition-transform" />
              </div>
              Watch Film
            </button>
          </motion.div>

          {/* Stats Badges */}
          <div className="mt-16 flex items-center gap-12 border-t border-slate-200 dark:border-white/5 pt-10 justify-center lg:justify-start">
              <div className="relative">
                <p className="text-3xl font-black text-slate-900 dark:text-white">4.9/5</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Global Rating</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10" />
              <div className="relative">
                <p className="text-3xl font-black text-slate-900 dark:text-white">25K+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Trendsetters</p>
              </div>
          </div>
        </div>

        {/* --- Right Image Section (The Masterpiece) --- */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="relative w-[300px] h-[450px] md:w-[420px] md:h-[600px] group"
          >
            {/* Main Image Container */}
            <div className="absolute inset-0 z-20 rounded-[3rem] md:rounded-[4rem] overflow-hidden border-[1px] border-white/20 shadow-2xl">
               <Image
                 src={Heroin} 
                 alt="Model"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-110"
                 priority
               />
               {/* Overlay for depth */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60" />
            </div>

            {/* Back Decorative Frame */}
            <motion.div 
               animate={{ rotate: [-2, 2, -2] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="absolute inset-0 border-2 border-teal-500/30 rounded-[3rem] md:rounded-[4rem] translate-x-6 translate-y-6 -z-10" 
            />

            {/* Floating Glass Card */}
            <motion.div 
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 md:-right-12 bottom-20 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] z-30 border border-white/20 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={24} />
                 </div>
                 <div>
                    <p className="text-sm font-black dark:text-white uppercase tracking-tighter italic">Limited Edition</p>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest opacity-70">Sold Out Soon</p>
                 </div>
              </div>
            </motion.div>

            {/* Geometric Element */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}