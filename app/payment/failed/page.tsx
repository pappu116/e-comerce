"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#020617]">
      <div className="w-full max-w-xl rounded-3xl border border-rose-200/30 bg-white dark:bg-slate-900 p-8 text-center shadow-xl">
        <XCircle className="mx-auto mb-5 text-rose-500" size={56} />
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Payment Failed</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          We could not complete your payment. Please try again.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/checkout" className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Retry Payment
          </Link>
          <Link href="/cart" className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
