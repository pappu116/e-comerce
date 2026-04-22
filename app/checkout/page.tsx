"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cartService, orderService, paymentService } from "@/app/lib/apiClient";
import { useCart } from "@/app/store/cartStore";
import { useAuth } from "@/app/store/authStore";
import { ArrowLeft, Loader2 } from "lucide-react";

type PaymentMethod = "sslcommerz" | "cod";
const newCheckoutKey = () => `chk_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
const PAYMENT_LABELS: Record<string, string> = {
  sslcommerz: "Pay with SSLCommerz",
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { isHydrated, isLoggedIn, loading, checkAuth } = useAuth();
  const items = useCart((state: any) => state.items);
  const completeOrder = useCart((state: any) => state.completeOrder);
  const clearCart = useCart((state: any) => state.clearCart);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("sslcommerz");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const idempotencyKeyRef = useRef(newCheckoutKey());
  const allowedMethods = (Array.isArray(quote?.allowedMethods) && quote.allowedMethods.length
    ? quote.allowedMethods
    : ["sslcommerz", "cod"]) as PaymentMethod[];

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    area: "",
    postalCode: "",
  });

  const subtotal = Number(quote?.subTotal ?? items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0));
  const shippingFee = Number(quote?.shippingCharge ?? (subtotal >= 1000 ? 0 : subtotal >= 500 ? 60 : 120));
  const taxAmount = Number(quote?.taxAmount ?? 0);
  const discountAmount = Number(quote?.discountAmount ?? 0);
  const total = Number(quote?.totalAmount ?? subtotal + shippingFee + taxAmount - discountAmount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const syncCartToBackend = async () => {
    await cartService.replace(
      items
        .map((item: any) => ({
          productId: String(item?._id || item?.id || ""),
          quantity: Number(item?.quantity || 1),
          variantKey: String(item?.variant?.key || ""),
        }))
        .filter((line: any) => line.productId)
    );
  };

  const refreshQuote = async () => {
    if (!isLoggedIn || !items.length) {
      setQuote(null);
      return;
    }
    try {
      setQuoteLoading(true);
      await syncCartToBackend();
      const quoteRes = await orderService.quote();
      setQuote(quoteRes?.quote || null);
    } catch {
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  };

  useEffect(() => {
    if (!isHydrated) return;
    const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("token"));
    if (!hasToken) return;
    checkAuth();
  }, [isHydrated, checkAuth]);

  useEffect(() => {
    if (!isHydrated || loading) return;
    if (!isLoggedIn) {
      router.replace("/login?redirect=/checkout");
    }
  }, [isHydrated, loading, isLoggedIn, router]);

  useEffect(() => {
    refreshQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, isLoggedIn, items]);

  useEffect(() => {
    if (!allowedMethods.includes(paymentMethod)) {
      setPaymentMethod((allowedMethods[0] || "sslcommerz") as PaymentMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote]);

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

      const createPayload = () => ({
        paymentMethod,
        idempotencyKey: idempotencyKeyRef.current,
        shippingAddress: {
          ...shipping,
          country: "Bangladesh",
        },
      });
      let orderRes: any;
      try {
        orderRes = await orderService.create(createPayload());
      } catch (firstErr: any) {
        const conflictStatus = Number(firstErr?.response?.status || 0);
        const conflictMsg = String(firstErr?.response?.data?.message || "");
        const isIdempotencyPayloadConflict =
          conflictStatus === 409 &&
          /idempotency key is already used with a different checkout payload/i.test(conflictMsg);
        if (!isIdempotencyPayloadConflict) throw firstErr;
        idempotencyKeyRef.current = newCheckoutKey();
        orderRes = await orderService.create(createPayload());
      }

      const order = orderRes?.order;
      const orderId = order?._id || orderRes?.orderId;
      const finalOrderTotal = Number(order?.totalAmount || total);
      if (!orderId) throw new Error("Order creation failed.");

      if (paymentMethod === "sslcommerz") {
        const paymentRes = await paymentService.init(orderId);
        const gatewayUrl = paymentRes?.url;
        if (!gatewayUrl) throw new Error("Payment gateway URL missing.");

        completeOrder({
          orderId,
          products: items,
          totalPrice: finalOrderTotal,
          paymentMethod,
          date: new Date().toISOString(),
        });
        idempotencyKeyRef.current = newCheckoutKey();

        window.location.href = gatewayUrl;
        return;
      }

      completeOrder({
        orderId,
        products: items,
        totalPrice: finalOrderTotal,
        paymentMethod: "cod",
        date: new Date().toISOString(),
      });
      idempotencyKeyRef.current = newCheckoutKey();
      await clearCart();
      router.push("/payment/success?orderId=" + orderId);
    } catch (err: any) {
      const status = Number(err?.response?.status || 0);
      const existingOrderId = String(err?.response?.data?.orderId || "");
      if (status === 409 && existingOrderId) {
        try {
          if (paymentMethod === "sslcommerz") {
            const paymentRes = await paymentService.init(existingOrderId);
            const gatewayUrl = paymentRes?.url;
            if (!gatewayUrl) throw new Error("Payment gateway URL missing.");
            completeOrder({
              orderId: existingOrderId,
              products: items,
              totalPrice: total,
              paymentMethod,
              date: new Date().toISOString(),
            });
            idempotencyKeyRef.current = newCheckoutKey();
            window.location.href = gatewayUrl;
            return;
          }
          idempotencyKeyRef.current = newCheckoutKey();
          await clearCart();
          router.push("/payment/success?orderId=" + existingOrderId);
          return;
        } catch (resumeErr: any) {
          setError(resumeErr?.response?.data?.message || resumeErr?.message || "Could not resume existing order.");
          return;
        }
      }
      setError(err?.response?.data?.message || err?.message || "Checkout failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Loader2 size={16} className="animate-spin" />
          Loading checkout...
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

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
              {allowedMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full text-left px-4 py-3 rounded-xl border ${paymentMethod === method ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-slate-200 dark:border-slate-700"}`}
                >
                  {PAYMENT_LABELS[method] || method.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 h-fit">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-5">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items</span><span>{items.length}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span>Tk {subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shippingFee === 0 ? "Free" : `Tk ${shippingFee}`}</span></div>
            {discountAmount > 0 && <div className="flex justify-between"><span>Discount</span><span>-Tk {discountAmount}</span></div>}
            {taxAmount > 0 && <div className="flex justify-between"><span>Tax</span><span>Tk {taxAmount}</span></div>}
            <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-700 font-black text-lg">
              <span>Total</span><span>Tk {total}</span>
            </div>
          </div>
          {quoteLoading && <p className="text-xs text-slate-500 mt-2">Syncing backend totals...</p>}

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
