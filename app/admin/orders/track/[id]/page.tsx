'use client';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Package, ShieldCheck, Truck } from 'lucide-react';
import { orderService } from '@/app/lib/apiClient';

const statusToStep = (status: string) => {
  if (status === 'pending') return 0;
  if (status === 'processing') return 1;
  if (status === 'shipped') return 2;
  if (status === 'delivered') return 3;
  return 0;
};

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = String(params?.id || '');

  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTracking = async () => {
      if (!orderId) return;
      setLoading(true);
      setError('');
      try {
        const response = await orderService.getTracking(orderId);
        setTracking(response?.tracking || null);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load tracking data');
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [orderId]);

  const activeStep = useMemo(() => statusToStep(tracking?.status || 'pending'), [tracking?.status]);

  const steps = [
    { title: 'Order Placed', icon: Package },
    { title: 'Processing', icon: ShieldCheck },
    { title: 'On the Way', icon: Truck },
    { title: 'Delivered', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:scale-105 transition-all shadow-sm text-slate-900 dark:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
              Track Order
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
              {orderId ? `#${orderId.slice(-8).toUpperCase()}` : 'Order'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] text-center text-slate-500 dark:text-slate-300 font-bold">
            Loading tracking data...
          </div>
        ) : error ? (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900/40 p-8 rounded-[2.5rem] text-center text-rose-500 font-bold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                <h2 className="text-lg font-black uppercase mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Clock className="text-blue-600" size={20} /> Delivery Timeline
                </h2>

                <div className="relative space-y-10">
                  <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
                  {steps.map((step, index) => {
                    const done = index < activeStep;
                    const current = index === activeStep;
                    const muted = index > activeStep;
                    return (
                      <div key={step.title} className="relative flex gap-6">
                        <div
                          className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white dark:border-[#0b1120] shadow-lg ${
                            done
                              ? 'bg-emerald-500 text-white'
                              : current
                                ? 'bg-blue-600 text-white animate-pulse'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          <step.icon size={20} />
                        </div>
                        <div>
                          <h3
                            className={`font-black uppercase text-sm ${
                              muted ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                            {tracking?.statusHistory?.[index]?.updatedAt
                              ? new Date(tracking.statusHistory[index].updatedAt).toLocaleString()
                              : current
                                ? 'Current stage'
                                : 'Pending'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-xl">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-black uppercase text-xs text-slate-400 dark:text-slate-500 mb-2">Delivery Address</h3>
                <p className="font-bold text-sm leading-relaxed text-slate-900 dark:text-slate-200">
                  {tracking?.shippingAddress?.addressLine1 || 'N/A'}
                  <br />
                  {tracking?.shippingAddress?.area || ''}, {tracking?.shippingAddress?.city || ''}
                  <br />
                  {tracking?.shippingAddress?.country || ''}
                </p>
              </div>

              <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-500/30 relative overflow-hidden">
                <Truck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                <h3 className="font-black uppercase text-[10px] opacity-80 mb-4 tracking-widest">Shipment Details</h3>
                <p className="text-xl font-black italic uppercase mb-1">{tracking?.status || 'Pending'}</p>
                <p className="text-xs font-bold opacity-90">Tracking ID: {tracking?.trackingNumber || 'Not assigned'}</p>
                <p className="mt-4 text-xs font-bold opacity-90">
                  Estimated delivery:{' '}
                  {tracking?.deliveryDate ? new Date(tracking.deliveryDate).toLocaleDateString() : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
