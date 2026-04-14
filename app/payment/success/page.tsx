"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/app/store/cartStore";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const tranId = searchParams.get("tranId");
  const clearCart = useCart((state: any) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#020617]">
      <div className="w-full max-w-xl rounded-3xl border border-emerald-200/30 bg-white dark:bg-slate-900 p-8 text-center shadow-xl">
        <CheckCircle2 className="mx-auto mb-5 text-emerald-500" size={56} />
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Payment Successful</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Your transaction is confirmed and your order is being processed.
        </p>
        {orderId && <p className="mt-4 text-xs font-bold text-slate-500">Order: {orderId}</p>}
        {tranId && <p className="text-xs font-bold text-slate-500">Transaction: {tranId}</p>}
        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/profile" className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Go to Profile
          </Link>
          <Link href="/" className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
