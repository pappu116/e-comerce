"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SPARKS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  duration: 0.5 + i * 0.12,
  delay: i * 0.08,
}));

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white overflow-hidden p-6 text-center">
      
      {/* Brain & Sparking Animation */}
      <div className="relative mb-10">
        <motion.div
          animate={{
            x: [-2, 2, -2, 2, 0],
            y: [1, -1, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="text-9xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          🧠
        </motion.div>

        {/* Chire jawa Tar (Electrical Sparks) */}
        {SPARKS.map((spark, i) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              height: [0, 40, 10],
              x: [0, (i - 2) * 40],
              y: [0, -20],
              rotate: i * 45,
            }}
            transition={{
              repeat: Infinity,
              duration: spark.duration,
              delay: spark.delay,
            }}
            className="absolute top-1/2 left-1/2 w-1 bg-yellow-400 rounded-full shadow-[0_0_10px_#fbbf24]"
          />
        ))}
      </div>

      {/* Error Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-6xl font-black text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest">
          Mathar Tar Chire Geche!
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Aww Snap! Apni emon ekta jaygay eshechen jekhane logic ar kaj korche na. 
          System error: <span className="text-yellow-500 font-mono">BRAIN_NOT_FOUND</span>
        </p>

        <Link
          href="/"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all hover:scale-110 shadow-lg shadow-blue-500/20"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Background Glitch Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </div>
  );
}
