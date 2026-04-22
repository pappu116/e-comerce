"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useCart } from "@/app/store/cartStore";
import { useAuth } from "@/app/store/authStore";
import { cartService, orderService } from "@/app/lib/apiClient";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const items = useCart((state: any) => state.items);
  const { increase, decrease, removeFromCart } = useCart() as any;
  const [quote, setQuote] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const getVariantKey = (item: any) => String(item?.variant?.key || "");

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

  const localSubtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const getItemId = (item: any) => item?._id || item?.id;
  const getLineKey = (item: any) => `${getItemId(item)}::${getVariantKey(item)}`;
  const syncCartToBackend = async () => {
    await cartService.replace(
      items
        .map((item: any) => ({
          productId: String(getItemId(item) || ""),
          quantity: Number(item?.quantity || 1),
          variantKey: getVariantKey(item),
        }))
        .filter((line: any) => line.productId)
    );
  };

  useEffect(() => {
    const run = async () => {
      if (!isLoggedIn || !items.length) return setQuote(null);
      try {
        setQuoteLoading(true);
        await syncCartToBackend();
        const res = await orderService.quote();
        setQuote(res?.quote || null);
      } catch {
        setQuote(null);
      } finally {
        setQuoteLoading(false);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, items]);

  const fallbackShipping = localSubtotal >= 1000 ? 0 : localSubtotal >= 500 ? 60 : localSubtotal > 0 ? 120 : 0;
  const subtotal = Number(quote?.subTotal ?? localSubtotal);
  const shippingCharge = Number(quote?.shippingCharge ?? fallbackShipping);
  const taxAmount = Number(quote?.taxAmount ?? 0);
  const discountAmount = Number(quote?.discountAmount ?? 0);
  const finalTotal = Number(quote?.totalAmount ?? subtotal + shippingCharge + taxAmount - discountAmount);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] transition-colors duration-300">
        <div className="container mx-auto px-4 py-20 text-center md:py-32">
          <ShoppingBag className="mx-auto mb-6 text-zinc-400 dark:text-zinc-600" size={64} />
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">Your cart is empty</h1>
          <p className="mb-8 text-zinc-500 italic">Looks like you have not added anything yet.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-white shadow-lg transition-transform active:scale-95 dark:bg-white dark:text-black"
          >
            <ArrowLeft size={18} /> Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:mb-12 md:text-4xl">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-8">
            {items.map((item: any) => (
              <div
                key={getLineKey(item)}
                className="flex flex-col gap-5 rounded-[1.5rem] border border-zinc-200 bg-slate-50 p-5 shadow-sm dark:border-white/5 dark:bg-zinc-900/40 sm:flex-row sm:gap-6 sm:p-6"
              >
                <div className="h-32 w-full overflow-hidden rounded-2xl border bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 sm:w-32">
                  <img src={item.image || item.images?.[0] || "/no-image.png"} alt={item.name} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{item.name}</h2>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Premium Edition</p>
                    </div>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${item.price}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 rounded-full border border-zinc-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-zinc-800">
                      <button onClick={() => decrease(getItemId(item), getVariantKey(item))} className="text-zinc-500 transition-colors hover:text-indigo-600">
                        <Minus size={16} />
                      </button>
                      <span className="w-4 text-center font-bold text-zinc-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => increase(getItemId(item), getVariantKey(item))} className="text-zinc-500 transition-colors hover:text-indigo-600">
                        <Plus size={16} />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(getItemId(item), getVariantKey(item))} className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-[2rem] border border-transparent bg-zinc-900 p-6 text-white shadow-2xl dark:border-white/10 dark:bg-zinc-900/80 md:p-8">
              <h2 className="mb-8 text-2xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between font-medium text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="font-medium text-zinc-400">Shipping</span>
                  <div className="text-right">
                    <span className={`font-bold ${shippingCharge === 0 ? "text-green-400" : "text-white"}`}>
                      {shippingCharge === 0 ? "Free Shipping" : `$${shippingCharge}`}
                    </span>
                    {!quote && subtotal >= 500 && subtotal < 1000 && (
                      <p className="text-[10px] font-medium tracking-wide text-green-400">(50% OFF)</p>
                    )}
                  </div>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-medium text-zinc-400">
                    <span>Discount</span>
                    <span className="text-green-400">-${discountAmount}</span>
                  </div>
                )}
                {taxAmount > 0 && (
                  <div className="flex justify-between font-medium text-zinc-400">
                    <span>Tax</span>
                    <span className="text-white">${taxAmount}</span>
                  </div>
                )}

                <hr className="my-6 border-zinc-800" />

                <div className="mb-10 flex items-center justify-between text-2xl font-black">
                  <span>Total</span>
                  <span className="text-indigo-400">${finalTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-indigo-600 py-5 text-lg font-bold text-white shadow-xl shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
                >
                  Checkout Now
                </button>

                <p className="mt-4 text-center text-[10px] italic text-zinc-500">
                  {isLoggedIn ? "Redirecting to payment..." : "Please login to proceed with payment"}
                </p>
                {quoteLoading && <p className="text-center text-[10px] italic text-zinc-500">Syncing backend totals...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}