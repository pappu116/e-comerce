"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ফর্ম ডেটা সিমুলেশন
    setTimeout(() => {
      setIsSubmitting(false);
      alert("ধন্যবাদ! আপনার মেসেজটি আমরা পেয়েছি। আমাদের টিম শীঘ্রই যোগাযোগ করবে।");
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-500">
      {/* Decorative Background Elements - ই-কমার্স প্রিমিয়াম লুকের জন্য */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-indigo-500/10 to-transparent -z-10" />
      
      <div className="container mx-auto py-16 md:py-24 px-4 relative">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            <MessageSquare size={14} /> Support Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            কিভাবে আমরা <span className="text-indigo-600">সাহায্য</span> করতে পারি?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            আপনার অর্ডার, পেমেন্ট বা প্রোডাক্ট নিয়ে যেকোনো প্রশ্ন থাকলে আমাদের জানান। 
            আমাদের কাস্টমার সাপোর্ট ২৪/৭ আপনার পাশে আছে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto">
          
          {/* Left Side: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              
              {/* Phone Card */}
              <Card className="border-none shadow-sm bg-white/80 dark:bg-slate-900/50 backdrop-blur-md hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">ফোন করুন</h4>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">+৮৮০ ১৭০০-০০০০০০</p>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-none shadow-sm bg-white/80 dark:bg-slate-900/50 backdrop-blur-md hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-200 dark:shadow-none">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">ইমেইল সাপোর্ট</h4>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">help@yourshop.com</p>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="border-none shadow-sm bg-white/80 dark:bg-slate-900/50 backdrop-blur-md hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-200 dark:shadow-none">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">অফিস ঠিকানা</h4>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">বনানী, ঢাকা, বাংলাদেশ</p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="h-2 bg-indigo-600 w-full" />
              {/* <CardHeader className="pt-10 px-8">
                <CardTitle className="text-2xl font-bold">সরাসরি মেসেজ দিন</CardTitle>
                <CardDescription>আমরা সাধারণত ২ ঘণ্টার মধ্যে উত্তর দিয়ে থাকি।</CardDescription>
              </CardHeader> */}
              <CardHeader className="pt-10 px-8">
                {/* text-slate-900 (লাইট মোডে কালো) এবং dark:text-white (ডার্ক মোডে সাদা) যোগ করা হয়েছে */}
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                  সরাসরি মেসেজ দিন
                </CardTitle>
                <CardDescription className="dark:text-slate-400">
                  আমরা সাধারণত ২ ঘণ্টার মধ্যে উত্তর দিয়ে থাকি।
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">আপনার নাম</Label>
                      <Input id="name" name="name" placeholder="Name" required className="h-14 px-5 rounded-xl border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 focus:ring-2 ring-indigo-500/20 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">ইমেইল ঠিকানা</Label>
                      <Input id="email" name="email" type="email" placeholder="Email" required className="h-14 px-5 rounded-xl border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 focus:ring-2 ring-indigo-500/20 transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">বিষয়</Label>
                    <Input id="subject" name="subject" placeholder="যেমন: অর্ডার ডেলিভারি সমস্যা" required className="h-14 px-5 rounded-xl border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 focus:ring-2 ring-indigo-500/20 transition-all" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">বিস্তারিত মেসেজ</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="এখানে লিখুন..." 
                      className="min-h-[150px] px-5 py-4 rounded-xl border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 focus:ring-2 ring-indigo-500/20 resize-none transition-all"
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xl shadow-indigo-500/20 transition-all duration-300 font-bold text-lg uppercase tracking-wider group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      <>
                        মেসেজ পাঠান
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}