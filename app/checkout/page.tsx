"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cartService, orderService, paymentService } from "@/app/lib/apiClient";
import { useCart } from "@/app/store/cartStore";
import { useAuth } from "@/app/store/authStore";
import { ArrowLeft, Loader2 } from "lucide-react";

type PaymentMethod = "sslcommerz" | "cod";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const items = useCart((state: any) => state.items);
  const completeOrder = useCart((state: any) => state.completeOrder);
  const clearCart = useCart((state: any) => state.clearCart);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("sslcommerz");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    area: "",
    postalCode: "",
  });

  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 1000 ? 0 : subtotal >= 500 ? 60 : 120;
  const total = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const syncCartToBackend = async () => {
    await cartService.clear();

    for (const item of items) {
      const productId = item._id || item.id;
      if (!productId) continue;

      await cartService.add(productId, item.quantity || 1);
    }
  };

  const handlePlaceOrder = async () => {
    setError("");

    if (!isLoggedIn) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!shipping.fullName || !shipping.phone || !shipping.addressLine1 || !shipping.city || !shipping.area) {
      setError("Please fill all required shipping fields.");
      return;
    }

    try {
      setProcessing(true);

      await syncCartToBackend();

      const orderRes = await orderService.create({
        paymentMethod,
        shippingAddress: {
          ...shipping,
          country: "Bangladesh",
        },
      });

      const order = orderRes?.order;
      const orderId = order?._id || orderRes?.orderId;
      if (!orderId) throw new Error("Order creation failed.");

      if (paymentMethod === "sslcommerz") {
        const paymentRes = await paymentService.init(orderId);
        const gatewayUrl = paymentRes?.url;
        if (!gatewayUrl) throw new Error("Payment gateway URL missing.");

        completeOrder({
          orderId,
          products: items,
          totalPrice: total,
          paymentMethod,
          date: new Date().toISOString(),
        });

        window.location.href = gatewayUrl;
        return;
      }

      completeOrder({
        orderId,
        products: items,
        totalPrice: total,
        paymentMethod: "cod",
        date: new Date().toISOString(),
      });
      await clearCart();
      router.push("/payment/success?orderId=" + orderId);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Checkout failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] px-4 py-10">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Link href="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft size={16} /> Back to Cart
          </Link>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-5">Shipping Information</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="fullName" placeholder="Full Name *" value={shipping.fullName} onChange={handleChange} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
              <input name="phone" placeholder="Phone *" value={shipping.phone} onChange={handleChange} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
              <input name="city" placeholder="City *" value={shipping.city} onChange={handleChange} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
              <input name="area" placeholder="Area *" value={shipping.area} onChange={handleChange} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
              <input name="postalCode" placeholder="Postal Code" value={shipping.postalCode} onChange={handleChange} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
              <input name="addressLine1" placeholder="Address Line *" value={shipping.addressLine1} onChange={handleChange} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none md:col-span-2" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Payment Method</h2>
            <div className="space-y-3">
              <button onClick={() => setPaymentMethod("sslcommerz")} className={`w-full text-left px-4 py-3 rounded-xl border ${paymentMethod === "sslcommerz" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-slate-200 dark:border-slate-700"}`}>
                Pay with SSLCommerz
              </button>
              <button onClick={() => setPaymentMethod("cod")} className={`w-full text-left px-4 py-3 rounded-xl border ${paymentMethod === "cod" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-slate-200 dark:border-slate-700"}`}>
                Cash on Delivery
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 h-fit">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-5">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items</span><span>{items.length}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span>৳{subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shippingFee === 0 ? "Free" : `৳${shippingFee}`}</span></div>
            <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-700 font-black text-lg">
              <span>Total</span><span>৳{total}</span>
            </div>
          </div>

          {error && <p className="text-rose-500 text-sm font-semibold mt-4">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={processing}
            className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {processing ? <Loader2 size={18} className="animate-spin" /> : null}
            {processing ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
