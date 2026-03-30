'use client';
import { useParams, useRouter } from 'next/navigation';
import { Truck, Package, CheckCircle2, MapPin, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;

  const steps = [
    { title: "Order Placed", date: "24 March, 2026 - 10:30 AM", status: "completed", icon: Package },
    { title: "Processing", date: "25 March, 2026 - 02:15 PM", status: "completed", icon: ShieldCheck },
    { title: "On the Way", date: "In Transit", status: "current", icon: Truck },
    { title: "Delivered", date: "Expected by 28 March", status: "pending", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:scale-105 transition-all shadow-sm text-slate-900 dark:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">Track Order</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">{orderId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Timeline Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-lg font-black uppercase mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
                <Clock className="text-blue-600" size={20} /> Delivery Timeline
              </h2>
              
              <div className="relative space-y-12">
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
                
                {steps.map((step, index) => (
                  <div key={index} className="relative flex gap-6">
                    <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white dark:border-[#0b1120] shadow-lg transition-all duration-500 ${
                      step.status === 'completed' ? 'bg-emerald-500 text-white' : 
                      step.status === 'current' ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h3 className={`font-black uppercase text-sm ${
                        step.status === 'pending' ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Side Cards */}
          <div className="space-y-6">
            <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-xl">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-black uppercase text-xs text-slate-400 dark:text-slate-500 mb-2">Delivery Address</h3>
              <p className="font-bold text-sm leading-relaxed text-slate-900 dark:text-slate-200">
                House 42, Road 7, Sector 10<br />
                Uttara, Dhaka-1230, Bangladesh
              </p>
            </div>

            <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-500/30 relative overflow-hidden group">
              <Truck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="font-black uppercase text-[10px] opacity-80 mb-4 tracking-widest">Courier Partner</h3>
              <p className="text-xl font-black italic uppercase mb-1">Pathao Courier</p>
              <p className="text-xs font-bold opacity-90">ID: PATH-99203112</p>
              <button className="mt-6 w-full py-3 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
                Contact Driver
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}