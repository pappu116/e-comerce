
"use client";

import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Truck, 
  Heart 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  // স্ট্যাটিস্টিক্স ডেটা
  const stats = [
    { label: "সন্তুষ্ট কাস্টমার", value: "১০,০০০+" },
    { label: "প্রোডাক্ট কালেকশন", value: "৫০০+" },
    { label: "জেলায় ডেলিভারি", value: "৬৪" },
    { label: "পজিটিভ রিভিউ", value: "৯৯%" },
  ];

  // আমাদের ভ্যালু
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "১০০% অরিজিনাল",
      desc: "আমরা প্রতিটি পণ্যের গুণগত মান নিশ্চিত করি সরাসরি সোর্স থেকে।"
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: "দ্রুত ডেলিভারি",
      desc: "আপনার অর্ডার করা পণ্য দ্রুততম সময়ে আপনার দোরগোড়ায় পৌঁছে দেই।"
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-600" />,
      title: "সেরা সাপোর্ট",
      desc: "যেকোনো সমস্যায় আমাদের টিম ২৪/৭ আপনাকে সাহায্য করতে প্রস্তুত।"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- ১. Hero Section (The Hook) --- */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              আমরা শুধু পণ্য নয়, <span className="text-indigo-600">বিশ্বাস</span> ফেরি করি।
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">
              আপনার নিত্যদিনের প্রয়োজনকে সহজ এবং আনন্দদায়ক করতে আমরা কাজ করে যাচ্ছি নিরন্তর।
            </p>
          </div>
        </div>
        {/* Background Blur Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10" />
      </section>

      {/* --- ২. Our Story (The Journey) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/story-image.jpg" // এখানে তোমার অফিসের বা ওয়্যারহাউসের ছবি দাও
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  ওয়্যারহাউস/টিম ফটো এখানে
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">আমাদের শুরুর গল্প</h2>
                <div className="w-20 h-1.5 bg-indigo-600 rounded-full"></div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                ২০২১ সালে একটি ছোট্ট স্বপ্ন নিয়ে আমাদের যাত্রা শুরু হয়। তখন আমাদের লক্ষ্য ছিল একটাই—কিভাবে ই-কমার্স কেনাকাটাকে সাধারণ মানুষের কাছে আরও স্বচ্ছ এবং সহজ করা যায়। 
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                অনেক চড়াই-উতরাই পার করে আজ আমরা হাজারো পরিবারের আস্থার জায়গা হয়ে উঠেছি। আমরা বিশ্বাস করি, একটি ভালো প্রোডাক্ট শুধু জীবন সহজ করে না, মুখে হাসিও ফোটায়।
              </p>
              <div className="flex gap-4 pt-4">
                 <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
                    <Award className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="font-bold dark:text-white text-sm">বেস্ট কোয়ালিটি অ্যাওয়ার্ড</p>
                 </div>
                 <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                    <Zap className="w-8 h-8 text-emerald-600 mb-2" />
                    <p className="font-bold dark:text-white text-sm">ফাস্টেস্ট গ্রোয়িং শপ</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ৩. Statistics Section (Social Proof) --- */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <h3 className="text-4xl md:text-5xl font-black text-white">{stat.value}</h3>
                <p className="text-indigo-100 font-medium uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ৪. Core Values (Why Choose Us) --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">কেন আমরা আলাদা?</h2>
             <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">বাজারের হাজারো ভিড়ে আমরা আমাদের গুণমান এবং সেবা দিয়ে নিজেদের আলাদা করেছি।</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <Card key={i} className="border-none shadow-xl bg-white dark:bg-slate-900 group hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-10 space-y-6">
                  <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {v.icon}
                  </div>
                  <h4 className="text-xl font-bold dark:text-white">{v.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- ৫. Call to Action (Final Step) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">আপনার শপিং জার্নি শুরু হোক <br/> আমাদের সাথে।</h2>
              <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-colors uppercase tracking-widest text-sm">
                এখনই কেনাকাটা করুন
              </button>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 border-8 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 border-8 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
