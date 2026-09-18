// // // 'use client';

// // // import { motion, type Variants } from "framer-motion";
// // // import { Eye, EyeOff, Mail, Lock, Loader2, Crown, User, Check, Zap, Sparkles, Rocket } from 'lucide-react';
// // // import { useState, FormEvent } from 'react';
// // // import Link from 'next/link';
// // // import toast from 'react-hot-toast';

// // // export default function RegisterPage() {
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //   });
  
// // //   const [errors, setErrors] = useState<{
// // //     name?: string;
// // //     email?: string;
// // //     password?: string;
// // //   }>({});

// // //   const validate = () => {
// // //     const newErrors: typeof errors = {};
// // //     if (!formData.name) newErrors.name = 'Full name is required';
// // //     else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    
// // //     if (!formData.email) newErrors.email = 'Email is required';
// // //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    
// // //     if (!formData.password) newErrors.password = 'Password is required';
// // //     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault();
// // //     if (!validate()) return;
// // //     setLoading(true);
// // //     await new Promise((r) => setTimeout(r, 1500));
// // //     setLoading(false);
// // //     toast.success(`Welcome ${formData.name}! Your 7-day free trial has started. 🎉`);
// // //   };

// // //   return (
// // //     <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      
// // //       {/* SOLID GREEN BACKGROUND + GOLD GRID */}
// // //       <div
// // //         className="absolute inset-0 z-0"
// // //         style={{
// // //           backgroundColor: '#064E3B',
// // //           backgroundImage: `
// // //             linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
// // //             linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
// // //           `,
// // //           backgroundSize: '44px 44px',
// // //         }}
// // //       />

// // //       {/* Decorative gold glow */}
// // //       <div className="absolute inset-0 z-0 opacity-20">
// // //         <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl" />
// // //         <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 blur-3xl" />
// // //         <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-amber-500 blur-3xl" />
// // //       </div>

// // //       {/* MAIN CONTENT */}
// // //       <div className="relative z-10 w-full max-w-5xl">
        
// // //         {/* HEADER SECTION - INSPIRING MESSAGE */}
// // //         <motion.div
// // //           initial={{ opacity: 20, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6 }}
// // //           className="text-center mb-8"
// // //         >
// // //           {/* Small badge */}
// // //           <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 backdrop-blur-sm mb-4">
// // //             <Sparkles className="h-3.5 w-3.5 text-amber-400" />
// // //             <span className="text-xs font-medium text-amber-300 tracking-wide">Begin Your Journey</span>
// // //           </div>
          
// // //           {/* Main Header */}
// // //           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
// // //             Start Speaking Arabic
// // //             <span className="block text-amber-400 text-3xl md:text-4xl mt-2">تحدث العربية بطلاقة</span>
// // //           </h1>
          
// // //           {/* Inspiring Sub-message */}
// // //           <p className="text-amber-100/80 text-base md:text-lg max-w-2xl mx-auto">
// // //             Join thousands of Hausa speakers mastering Arabic. 
// // //             <span className="block text-amber-300 text-sm mt-2">7-day free trial • Cancel anytime • No risk</span>
// // //           </p>
// // //         </motion.div>

// // //         <motion.div
// // //           initial={{ opacity: 20, y: 30 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6, delay: 0.1 }}
// // //           className="grid md:grid-cols-2 gap-6"
// // //         >
          
// // //           {/* LEFT SIDE - REGISTRATION FORM (Glassmorphism) */}
// // //           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
// // //             <div className="mb-6 flex items-center gap-2">
// // //               <Rocket className="h-6 w-6 text-amber-400" />
// // //               <h2 className="text-xl font-bold text-white">Create Account</h2>
// // //             </div>
            
// // //             <p className="mb-5 text-amber-200/70 text-sm">
// // //               Fill in your details to begin your Arabic learning journey
// // //             </p>

// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //               {/* Full Name */}
// // //               <div>
// // //                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Full Name</label>
// // //                 <div className="relative">
// // //                   <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// // //                   <input
// // //                     type="text"
// // //                     value={formData.name}
// // //                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //                     placeholder="Musa Abdullahi"
// // //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
// // //                       errors.name
// // //                         ? 'border-red-400 focus:ring-red-300/50'
// // //                         : 'border-white/20 focus:ring-amber-400/50'
// // //                     }`}
// // //                   />
// // //                 </div>
// // //                 {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
// // //               </div>

// // //               {/* Email */}
// // //               <div>
// // //                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
// // //                 <div className="relative">
// // //                   <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// // //                   <input
// // //                     type="email"
// // //                     value={formData.email}
// // //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //                     placeholder="musa@example.com"
// // //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
// // //                       errors.email
// // //                         ? 'border-red-400 focus:ring-red-300/50'
// // //                         : 'border-white/20 focus:ring-amber-400/50'
// // //                     }`}
// // //                   />
// // //                 </div>
// // //                 {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
// // //               </div>

// // //               {/* Password */}
// // //               <div>
// // //                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Password</label>
// // //                 <div className="relative">
// // //                   <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// // //                   <input
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     value={formData.password}
// // //                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// // //                     placeholder="At least 6 characters"
// // //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-12 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
// // //                       errors.password
// // //                         ? 'border-red-400 focus:ring-red-300/50'
// // //                         : 'border-white/20 focus:ring-amber-400/50'
// // //                     }`}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300/60 hover:text-amber-200 transition"
// // //                   >
// // //                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// // //                   </button>
// // //                 </div>
// // //                 {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
// // //               </div>

// // //               {/* Register Button */}
// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg mt-6"
// // //               >
// // //                 {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Crown className="h-4 w-4" /> Start 7-Day Free Trial →</>}
// // //               </button>
// // //             </form>

// // //             {/* Login Link */}
// // //             <p className="mt-6 text-center text-sm text-white/50">
// // //               Already have an account?{' '}
// // //               <Link href="/" className="text-amber-300 hover:text-amber-200 transition font-medium">
// // //                 Sign in
// // //               </Link>
// // //             </p>
// // //           </div>

// // //           {/* RIGHT SIDE - PRICING PLANS (Glassmorphism) */}
// // //           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
// // //             <div className="mb-6 flex items-center gap-2">
// // //               <Zap className="h-6 w-6 text-amber-400" />
// // //               <h2 className="text-xl font-bold text-white">Choose Your Plan</h2>
// // //             </div>
            
// // //             <p className="mb-5 text-amber-200/70 text-sm">
// // //               Both plans include 7-day free trial
// // //             </p>

// // //             <div className="space-y-4">
// // //               {/* Monthly Plan */}
// // //               <div
// // //                 onClick={() => setSelectedPlan('monthly')}
// // //                 className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
// // //                   selectedPlan === 'monthly'
// // //                     ? 'border-amber-400 bg-amber-400/10'
// // //                     : 'border-white/20 hover:border-amber-400/50'
// // //                 }`}
// // //               >
// // //                 <div className="flex items-start justify-between">
// // //                   <div>
// // //                     <h3 className="text-xl font-bold text-white">Monthly</h3>
// // //                     <p className="text-amber-200/70 text-sm mt-1">Flexible • Cancel anytime</p>
// // //                   </div>
// // //                   {selectedPlan === 'monthly' && (
// // //                     <div className="rounded-full bg-amber-400 p-1">
// // //                       <Check className="h-4 w-4 text-green-900" />
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //                 <div className="mt-3">
// // //                   <span className="text-3xl font-bold text-white">₦5,000</span>
// // //                   <span className="text-amber-200/60">/month</span>
// // //                 </div>
// // //                 <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
// // //                   <li className="flex items-center gap-2">✓ Full curriculum access</li>
// // //                   <li className="flex items-center gap-2">✓ Progress tracking</li>
// // //                   <li className="flex items-center gap-2">✓ Exercises & quizzes</li>
// // //                 </ul>
// // //               </div>

// // //               {/* Yearly Plan (Popular) */}
// // //               <div
// // //                 onClick={() => setSelectedPlan('yearly')}
// // //                 className={`cursor-pointer rounded-xl border-2 p-5 transition-all relative ${
// // //                   selectedPlan === 'yearly'
// // //                     ? 'border-amber-400 bg-amber-400/10'
// // //                     : 'border-white/20 hover:border-amber-400/50'
// // //                 }`}
// // //               >
// // //                 {/* Popular Badge */}
// // //                 <div className="absolute -top-3 right-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-green-900">
// // //                   ⭐ BEST VALUE
// // //                 </div>
                
// // //                 <div className="flex items-start justify-between">
// // //                   <div>
// // //                     <h3 className="text-xl font-bold text-white">Yearly</h3>
// // //                     <p className="text-amber-200/70 text-sm mt-1">Save 17% • 2 months free</p>
// // //                   </div>
// // //                   {selectedPlan === 'yearly' && (
// // //                     <div className="rounded-full bg-amber-400 p-1">
// // //                       <Check className="h-4 w-5 text-green-900" />
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //                 <div className="mt-3">
// // //                   <span className="text-3xl font-bold text-white">₦50,000</span>
// // //                   <span className="text-amber-200/60">/year</span>
// // //                   <div className="text-sm text-amber-300 mt-1">₦4,167/month • Save ₦10,000</div>
// // //                 </div>
// // //                 <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
// // //                   <li className="flex items-center gap-2">✓ Everything in Monthly</li>
// // //                   <li className="flex items-center gap-2">✓ Premium support</li>
// // //                   <li className="flex items-center gap-2">✓ Early access to new content</li>
// // //                 </ul>
// // //               </div>
// // //             </div>

// // //             {/* Trust Badge */}
// // //             <div className="mt-6 text-center">
// // //               <p className="text-xs text-white/40 flex items-center justify-center gap-2">
// // //                 <Crown className="h-3 w-3" />
// // //                 Join 5,000+ happy learners
// // //                 <Crown className="h-3 w-3" />
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         {/* Terms & Privacy */}
// // //         <p className="mt-8 text-center text-xs text-white/30">
// // //           By creating an account, you agree to our Terms of Service and Privacy Policy.
// // //           Your 7-day free trial starts immediately. No charge until trial ends.
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import { motion } from 'framer-motion';
// // import {
// //   ArrowRight,
// //   BookOpen,
// //   CheckCircle2,
// //   Eye,
// //   EyeOff,
// //   Languages,
// //   Loader2,
// //   Lock,
// //   Mail,
// //   Sparkles,
// //   TrendingUp,
// //   User,
// // } from 'lucide-react';
// // import { FormEvent, useState } from 'react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import toast from 'react-hot-toast';

// // import { createClient } from '@/lib/supabase/client';

// // export default function RegisterPage() {
// //   const router = useRouter();

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //   });

// //   const [errors, setErrors] = useState<{
// //     name?: string;
// //     email?: string;
// //     password?: string;
// //     confirmPassword?: string;
// //   }>({});

// //   const validate = () => {
// //     const newErrors: typeof errors = {};

// //     const name = formData.name.trim();
// //     const email = formData.email.trim();

// //     if (!name) {
// //       newErrors.name = 'Full name is required';
// //     } else if (name.length < 2) {
// //       newErrors.name = 'Name must be at least 2 characters';
// //     }

// //     if (!email) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       newErrors.email = 'Enter a valid email address';
// //     }

// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     if (!formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Please confirm your password';
// //     } else if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Passwords do not match';
// //     }

// //     setErrors(newErrors);

// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const updateField = (
// //     field: keyof typeof formData,
// //     value: string
// //   ) => {
// //     setFormData((current) => ({
// //       ...current,
// //       [field]: value,
// //     }));

// //     if (errors[field]) {
// //       setErrors((current) => ({
// //         ...current,
// //         [field]: undefined,
// //       }));
// //     }
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault();

// //     if (!validate()) return;

// //     setLoading(true);

// //     try {
// //       const supabase = createClient();

// //       const { data, error } = await supabase.auth.signUp({
// //         email: formData.email.trim(),
// //         password: formData.password,
// //         options: {
// //           data: {
// //             full_name: formData.name.trim(),
// //           },
// //         },
// //       });

// //       if (error) {
// //         toast.error(error.message);
// //         return;
// //       }

// //       /*
// //        * If email confirmation is disabled in Supabase,
// //        * signup may return a session immediately.
// //        */
// //       if (data.session) {
// //         toast.success('Account created successfully.');

// //         router.replace('/dashboard');
// //         router.refresh();
// //         return;
// //       }

// //       /*
// //        * If email confirmation is enabled, Supabase creates
// //        * the account but asks the user to verify their email.
// //        */
// //       setRegisteredEmail(formData.email.trim());

// //       toast.success('Account created. Check your email to confirm it.');
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <main className="relative min-h-screen overflow-hidden bg-[#043f32]">
// //       {/* Background */}
// //       <div
// //         className="pointer-events-none absolute inset-0"
// //         style={{
// //           backgroundImage: `
// //             radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.11), transparent 28%),
// //             radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.13), transparent 30%),
// //             linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
// //           `,
// //           backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
// //         }}
// //       />

// //       <div className="relative z-10 grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">

// //         {/* LEFT */}
// //         <section className="relative flex items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
// //           <div className="mx-auto w-full max-w-xl">

// //             {/* Brand */}
// //             <Link href="/" className="mb-14 flex w-fit items-center gap-4">
// //               <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-1 shadow-xl">
// //                 <img
// //                   src="/logo.png"
// //                   alt="HausaArabia"
// //                   className="h-14 w-14 rounded-xl object-cover"
// //                 />
// //               </div>

// //               <div>
// //                 <div className="text-2xl font-bold tracking-tight">
// //                   <span className="text-white">HAUSA</span>
// //                   <span className="text-amber-400">ARABIA</span>
// //                 </div>

// //                 <p className="mt-1 text-xs tracking-[0.18em] text-emerald-100/60">
// //                   ARABIC · HAUSA · ENGLISH
// //                 </p>
// //               </div>
// //             </Link>

// //             <motion.div
// //               initial={{ opacity: 0, y: 18 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.55 }}
// //             >
// //               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2">
// //                 <Sparkles className="h-4 w-4 text-amber-300" />
// //                 <span className="text-sm text-amber-100">
// //                   Begin your learning journey
// //                 </span>
// //               </div>

// //               <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
// //                 Your Arabic journey
// //                 <span className="block text-amber-400">
// //                   starts here.
// //                 </span>
// //               </h1>

// //               <p
// //                 lang="ar"
// //                 dir="rtl"
// //                 className="mt-4 max-w-lg text-right text-2xl text-emerald-100/80"
// //               >
// //                 رحلتك في تعلم العربية تبدأ هنا
// //               </p>

// //               <p className="mt-6 max-w-lg text-base leading-7 text-emerald-50/65">
// //                 Learn at your own pace with Arabic lessons explained through
// //                 Hausa and English.
// //               </p>
// //             </motion.div>

// //             {/* Learning path */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 18 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.55, delay: 0.15 }}
// //               className="mt-10 space-y-3"
// //             >
// //               <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
// //                   <BookOpen className="h-5 w-5 text-amber-400" />
// //                 </div>

// //                 <div>
// //                   <p className="font-medium text-white">
// //                     Learn step by step
// //                   </p>
// //                   <p className="mt-1 text-sm leading-5 text-emerald-100/50">
// //                     Move through structured Arabic lessons from foundations
// //                     upward.
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
// //                   <Languages className="h-5 w-5 text-amber-400" />
// //                 </div>

// //                 <div>
// //                   <p className="font-medium text-white">
// //                     Understand what you learn
// //                   </p>
// //                   <p className="mt-1 text-sm leading-5 text-emerald-100/50">
// //                     Hausa and English explanations help make Arabic easier to
// //                     understand.
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
// //                   <TrendingUp className="h-5 w-5 text-amber-400" />
// //                 </div>

// //                 <div>
// //                   <p className="font-medium text-white">
// //                     See your progress
// //                   </p>
// //                   <p className="mt-1 text-sm leading-5 text-emerald-100/50">
// //                     Complete lessons, build consistency and watch your skills
// //                     grow.
// //                   </p>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </section>

// //         {/* RIGHT */}
// //         <section className="flex items-center justify-center px-4 py-8 sm:px-8 lg:bg-[#f6f7f2] lg:px-12">
// //           <motion.div
// //             initial={{ opacity: 0, x: 24 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.55 }}
// //             className="w-full max-w-lg"
// //           >
// //             <div className="rounded-[28px] border border-white/50 bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.16)] sm:p-9">

// //               {registeredEmail ? (
// //                 /* EMAIL CONFIRMATION STATE */
// //                 <div className="py-8 text-center">
// //                   <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
// //                     <CheckCircle2 className="h-8 w-8 text-emerald-700" />
// //                   </div>

// //                   <h2 className="mt-6 text-3xl font-semibold text-slate-900">
// //                     Check your email
// //                   </h2>

// //                   <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">
// //                     We created your account. Follow the confirmation link sent
// //                     to:
// //                   </p>

// //                   <p className="mt-3 font-semibold text-slate-900">
// //                     {registeredEmail}
// //                   </p>

// //                   <Link
// //                     href="/"
// //                     className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
// //                   >
// //                     Go to sign in
// //                     <ArrowRight className="h-4 w-4" />
// //                   </Link>

// //                   <p className="mt-6 text-xs text-slate-400">
// //                     You may need to check your spam or junk folder.
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <>
// //                   <div className="mb-7">
// //                     <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
// //                       Create account
// //                     </p>

// //                     <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
// //                       Join HausaArabia
// //                     </h2>

// //                     <p className="mt-2 text-sm leading-6 text-slate-500">
// //                       Create your account and start learning Arabic.
// //                     </p>
// //                   </div>

// //                   <form onSubmit={handleSubmit} className="space-y-4">

// //                     {/* Full name */}
// //                     <div>
// //                       <label
// //                         htmlFor="name"
// //                         className="mb-2 block text-sm font-medium text-slate-700"
// //                       >
// //                         Full name
// //                       </label>

// //                       <div className="relative">
// //                         <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

// //                         <input
// //                           id="name"
// //                           type="text"
// //                           autoComplete="name"
// //                           value={formData.name}
// //                           onChange={(e) =>
// //                             updateField('name', e.target.value)
// //                           }
// //                           placeholder="Musa Abdullahi"
// //                           className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
// //                             errors.name
// //                               ? 'border-red-400 focus:ring-red-100'
// //                               : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
// //                           }`}
// //                         />
// //                       </div>

// //                       {errors.name && (
// //                         <p className="mt-1.5 text-xs text-red-600">
// //                           {errors.name}
// //                         </p>
// //                       )}
// //                     </div>

// //                     {/* Email */}
// //                     <div>
// //                       <label
// //                         htmlFor="email"
// //                         className="mb-2 block text-sm font-medium text-slate-700"
// //                       >
// //                         Email address
// //                       </label>

// //                       <div className="relative">
// //                         <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

// //                         <input
// //                           id="email"
// //                           type="email"
// //                           autoComplete="email"
// //                           value={formData.email}
// //                           onChange={(e) =>
// //                             updateField('email', e.target.value)
// //                           }
// //                           placeholder="musa@example.com"
// //                           className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
// //                             errors.email
// //                               ? 'border-red-400 focus:ring-red-100'
// //                               : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
// //                           }`}
// //                         />
// //                       </div>

// //                       {errors.email && (
// //                         <p className="mt-1.5 text-xs text-red-600">
// //                           {errors.email}
// //                         </p>
// //                       )}
// //                     </div>

// //                     {/* Password */}
// //                     <div>
// //                       <label
// //                         htmlFor="password"
// //                         className="mb-2 block text-sm font-medium text-slate-700"
// //                       >
// //                         Password
// //                       </label>

// //                       <div className="relative">
// //                         <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

// //                         <input
// //                           id="password"
// //                           type={showPassword ? 'text' : 'password'}
// //                           autoComplete="new-password"
// //                           value={formData.password}
// //                           onChange={(e) =>
// //                             updateField('password', e.target.value)
// //                           }
// //                           placeholder="At least 6 characters"
// //                           className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
// //                             errors.password
// //                               ? 'border-red-400 focus:ring-red-100'
// //                               : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
// //                           }`}
// //                         />

// //                         <button
// //                           type="button"
// //                           aria-label={
// //                             showPassword ? 'Hide password' : 'Show password'
// //                           }
// //                           onClick={() =>
// //                             setShowPassword((current) => !current)
// //                           }
// //                           className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
// //                         >
// //                           {showPassword ? (
// //                             <EyeOff className="h-5 w-5" />
// //                           ) : (
// //                             <Eye className="h-5 w-5" />
// //                           )}
// //                         </button>
// //                       </div>

// //                       {errors.password && (
// //                         <p className="mt-1.5 text-xs text-red-600">
// //                           {errors.password}
// //                         </p>
// //                       )}
// //                     </div>

// //                     {/* Confirm password */}
// //                     <div>
// //                       <label
// //                         htmlFor="confirmPassword"
// //                         className="mb-2 block text-sm font-medium text-slate-700"
// //                       >
// //                         Confirm password
// //                       </label>

// //                       <div className="relative">
// //                         <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

// //                         <input
// //                           id="confirmPassword"
// //                           type={showPassword ? 'text' : 'password'}
// //                           autoComplete="new-password"
// //                           value={formData.confirmPassword}
// //                           onChange={(e) =>
// //                             updateField('confirmPassword', e.target.value)
// //                           }
// //                           placeholder="Enter your password again"
// //                           className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
// //                             errors.confirmPassword
// //                               ? 'border-red-400 focus:ring-red-100'
// //                               : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
// //                           }`}
// //                         />
// //                       </div>

// //                       {errors.confirmPassword && (
// //                         <p className="mt-1.5 text-xs text-red-600">
// //                           {errors.confirmPassword}
// //                         </p>
// //                       )}
// //                     </div>

// //                     <button
// //                       type="submit"
// //                       disabled={loading}
// //                       className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
// //                     >
// //                       {loading ? (
// //                         <>
// //                           <Loader2 className="h-5 w-5 animate-spin" />
// //                           Creating account...
// //                         </>
// //                       ) : (
// //                         <>
// //                           Create account
// //                           <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
// //                         </>
// //                       )}
// //                     </button>
// //                   </form>

// //                   <p className="mt-7 text-center text-sm text-slate-500">
// //                     Already have an account?{' '}
// //                     <Link
// //                       href="/"
// //                       className="font-semibold text-emerald-700 transition hover:text-emerald-600"
// //                     >
// //                       Sign in
// //                     </Link>
// //                   </p>

// //                   <p className="mt-6 text-center text-xs leading-5 text-slate-400">
// //                     By creating an account, you agree to our Terms of Service
// //                     and Privacy Policy.
// //                   </p>
// //                 </>
// //               )}
// //             </div>
// //           </motion.div>
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }



// 'use client';

// import { motion } from 'framer-motion';
// import {
//   ArrowRight,
//   BookOpen,
//   CheckCircle2,
//   Eye,
//   EyeOff,
//   Languages,
//   Loader2,
//   Lock,
//   Mail,
//   Sparkles,
//   TrendingUp,
//   User,
//   Volume2,
// } from 'lucide-react';
// import { FormEvent, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// import { createClient } from '@/lib/supabase/client';

// export default function RegisterPage() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [registeredEmail, setRegisteredEmail] =
//     useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState<{
//     name?: string;
//     email?: string;
//     password?: string;
//     confirmPassword?: string;
//   }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};

//     const name = formData.name.trim();
//     const email = formData.email.trim();

//     if (!name) {
//       newErrors.name = 'Full name is required';
//     } else if (name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }

//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password =
//         'Password must be at least 6 characters';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword =
//         'Please confirm your password';
//     } else if (
//       formData.password !== formData.confirmPassword
//     ) {
//       newErrors.confirmPassword =
//         'Passwords do not match';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const updateField = (
//     field: keyof typeof formData,
//     value: string
//   ) => {
//     setFormData((current) => ({
//       ...current,
//       [field]: value,
//     }));

//     if (errors[field]) {
//       setErrors((current) => ({
//         ...current,
//         [field]: undefined,
//       }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);

//     try {
//       const supabase = createClient();

//       const { data, error } = await supabase.auth.signUp({
//         email: formData.email.trim(),
//         password: formData.password,

//         options: {
//           data: {
//             full_name: formData.name.trim(),
//           },
//         },
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       /*
//        * If Supabase email confirmation is disabled,
//        * the user may receive a session immediately.
//        */
//       if (data.session) {
//         toast.success('Account created successfully.');

//         router.replace('/dashboard');
//         router.refresh();

//         return;
//       }

//       /*
//        * If email verification is enabled,
//        * show our confirmation screen.
//        */
//       setRegisteredEmail(formData.email.trim());

//       toast.success(
//         'Account created. Check your email to confirm it.'
//       );
//     } catch (error) {
//       console.error('Registration error:', error);

//       toast.error(
//         'Something went wrong. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#064E3B]">

//       {/* =========================================================
//           GREEN + GOLD GRID BACKGROUND
//       ========================================================== */}
//       <div
//         className="pointer-events-none absolute inset-0 z-0"
//         style={{
//           backgroundColor: '#064E3B',

//           backgroundImage: `
//             linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
//           `,

//           backgroundSize: '44px 44px',
//         }}
//       />

//       {/* Decorative glow */}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         <div className="absolute -left-24 top-16 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

//         <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
//       </div>

//       {/* =========================================================
//           CONTENT
//       ========================================================== */}
//       <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

//         {/* =======================================================
//             LEFT SIDE
//         ======================================================== */}
//         <section className="flex items-center px-6 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-24">

//           <div className="mx-auto w-full max-w-xl">

//             {/* Brand */}
//             <Link
//               href="/"
//               className="mb-12 flex w-fit items-center gap-4"
//             >
//               <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-xl backdrop-blur-xl">
//                 <img
//                   src="/logo.png"
//                   alt="HausaArabia Logo"
//                   className="h-14 w-14 rounded-xl object-cover sm:h-16 sm:w-16"
//                 />
//               </div>

//               <div>
//                 <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                   <span className="text-white">HAUSA</span>
//                   <span className="text-amber-400">
//                     ARABIA
//                   </span>
//                 </h1>

//                 <p className="mt-1 text-xs tracking-[0.2em] text-amber-100/70">
//                   ARABIC • HAUSA • ENGLISH
//                 </p>
//               </div>
//             </Link>

//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 backdrop-blur-xl"
//             >
//               <Sparkles className="h-4 w-4 text-amber-300" />

//               <span className="text-sm font-medium text-amber-100">
//                 Begin your Arabic journey
//               </span>
//             </motion.div>

//             {/* Heading */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 0.1 }}
//             >
//               <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
//                 Arabic made easier
//                 <span className="block text-amber-400">
//                   for Hausa speakers.
//                 </span>
//               </h2>

//               <p
//                 lang="ar"
//                 dir="rtl"
//                 className="mt-4 max-w-lg text-right text-2xl text-amber-100/80 sm:text-3xl"
//               >
//                 رحلتك في تعلم العربية تبدأ هنا
//               </p>

//               <p className="mt-6 max-w-lg text-base leading-7 text-amber-50/75 sm:text-lg">
//                 Learn at your own pace with structured Arabic
//                 lessons explained through Hausa and English.
//               </p>
//             </motion.div>

//             {/* Glass feature blocks */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 0.2 }}
//               className="mt-10 space-y-3"
//             >
//               {/* Feature 1 */}
//               <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
//                   <BookOpen className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-white">
//                     Learn step by step
//                   </p>

//                   <p className="mt-1 text-sm leading-5 text-amber-100/60">
//                     Progress through structured lessons from the
//                     foundations of Arabic upward.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 2 */}
//               <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
//                   <Languages className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-white">
//                     Understand what you learn
//                   </p>

//                   <p className="mt-1 text-sm leading-5 text-amber-100/60">
//                     Hausa and English explanations make Arabic
//                     easier to understand.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 3 */}
//               <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
//                   <Volume2 className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-white">
//                     Practise real Arabic
//                   </p>

//                   <p className="mt-1 text-sm leading-5 text-amber-100/60">
//                     Use exercises and audio to improve your
//                     listening and speaking skills.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 4 */}
//               <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
//                   <TrendingUp className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-white">
//                     See your progress
//                   </p>

//                   <p className="mt-1 text-sm leading-5 text-amber-100/60">
//                     Complete lessons, build consistency and track
//                     your learning over time.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* =======================================================
//             RIGHT SIDE — REGISTER FORM
//         ======================================================== */}
//         <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full max-w-lg"
//           >

//             <div
//               className="
//                 rounded-[28px]
//                 border
//                 border-white/20
//                 bg-white/10
//                 p-7
//                 shadow-2xl
//                 backdrop-blur-2xl
//                 sm:p-9
//               "
//             >

//               {/* =================================================
//                   SUCCESS STATE
//               ================================================== */}
//               {registeredEmail ? (
//                 <div className="py-8 text-center">

//                   <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 backdrop-blur-xl">
//                     <CheckCircle2 className="h-8 w-8 text-emerald-300" />
//                   </div>

//                   <h2 className="mt-6 text-3xl font-bold text-white">
//                     Check your email
//                   </h2>

//                   <p className="mx-auto mt-3 max-w-sm leading-7 text-amber-100/65">
//                     Your HausaArabia account has been created.
//                     Follow the confirmation link sent to:
//                   </p>

//                   <p className="mt-3 font-semibold text-amber-300">
//                     {registeredEmail}
//                   </p>

//                   <Link
//                     href="/"
//                     className="
//                       mt-8
//                       inline-flex
//                       items-center
//                       gap-2
//                       rounded-xl
//                       bg-emerald-600
//                       px-6
//                       py-3
//                       font-semibold
//                       text-white
//                       transition
//                       hover:bg-emerald-500
//                     "
//                   >
//                     Go to sign in

//                     <ArrowRight className="h-4 w-4" />
//                   </Link>

//                   <p className="mt-6 text-xs text-white/35">
//                     If you cannot find the email, check your spam
//                     or junk folder.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Form heading */}
//                   <div className="mb-7">

//                     <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-amber-300">
//                       Create account
//                     </p>

//                     <h2 className="text-3xl font-bold tracking-tight text-white">
//                       Join HausaArabia
//                     </h2>

//                     <p className="mt-2 text-sm leading-6 text-amber-100/65">
//                       Create your account and begin learning
//                       Arabic.
//                     </p>
//                   </div>

//                   {/* FORM */}
//                   <form
//                     onSubmit={handleSubmit}
//                     className="space-y-4"
//                   >

//                     {/* Full name */}
//                     <div>
//                       <label
//                         htmlFor="name"
//                         className="mb-2 block text-sm font-medium text-amber-50"
//                       >
//                         Full name
//                       </label>

//                       <div className="relative">

//                         <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

//                         <input
//                           id="name"
//                           type="text"
//                           autoComplete="name"
//                           value={formData.name}
//                           onChange={(e) =>
//                             updateField(
//                               'name',
//                               e.target.value
//                             )
//                           }
//                           placeholder="Musa Abdullahi"
//                           className={`
//                             w-full
//                             rounded-xl
//                             border
//                             bg-white/10
//                             py-3.5
//                             pl-11
//                             pr-4
//                             text-white
//                             placeholder:text-white/35
//                             outline-none
//                             backdrop-blur-xl
//                             transition-all
//                             focus:bg-white/15
//                             focus:ring-2
//                             ${
//                               errors.name
//                                 ? 'border-red-400 focus:ring-red-300/30'
//                                 : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
//                             }
//                           `}
//                         />
//                       </div>

//                       {errors.name && (
//                         <p className="mt-1.5 text-xs text-red-300">
//                           {errors.name}
//                         </p>
//                       )}
//                     </div>

//                     {/* Email */}
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="mb-2 block text-sm font-medium text-amber-50"
//                       >
//                         Email address
//                       </label>

//                       <div className="relative">

//                         <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

//                         <input
//                           id="email"
//                           type="email"
//                           autoComplete="email"
//                           value={formData.email}
//                           onChange={(e) =>
//                             updateField(
//                               'email',
//                               e.target.value
//                             )
//                           }
//                           placeholder="musa@example.com"
//                           className={`
//                             w-full
//                             rounded-xl
//                             border
//                             bg-white/10
//                             py-3.5
//                             pl-11
//                             pr-4
//                             text-white
//                             placeholder:text-white/35
//                             outline-none
//                             backdrop-blur-xl
//                             transition-all
//                             focus:bg-white/15
//                             focus:ring-2
//                             ${
//                               errors.email
//                                 ? 'border-red-400 focus:ring-red-300/30'
//                                 : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
//                             }
//                           `}
//                         />
//                       </div>

//                       {errors.email && (
//                         <p className="mt-1.5 text-xs text-red-300">
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>

//                     {/* Password */}
//                     <div>
//                       <label
//                         htmlFor="password"
//                         className="mb-2 block text-sm font-medium text-amber-50"
//                       >
//                         Password
//                       </label>

//                       <div className="relative">

//                         <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

//                         <input
//                           id="password"
//                           type={
//                             showPassword
//                               ? 'text'
//                               : 'password'
//                           }
//                           autoComplete="new-password"
//                           value={formData.password}
//                           onChange={(e) =>
//                             updateField(
//                               'password',
//                               e.target.value
//                             )
//                           }
//                           placeholder="At least 6 characters"
//                           className={`
//                             w-full
//                             rounded-xl
//                             border
//                             bg-white/10
//                             py-3.5
//                             pl-11
//                             pr-12
//                             text-white
//                             placeholder:text-white/35
//                             outline-none
//                             backdrop-blur-xl
//                             transition-all
//                             focus:bg-white/15
//                             focus:ring-2
//                             ${
//                               errors.password
//                                 ? 'border-red-400 focus:ring-red-300/30'
//                                 : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
//                             }
//                           `}
//                         />

//                         <button
//                           type="button"
//                           aria-label={
//                             showPassword
//                               ? 'Hide password'
//                               : 'Show password'
//                           }
//                           onClick={() =>
//                             setShowPassword(
//                               (current) => !current
//                             )
//                           }
//                           className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-200/50 transition hover:text-amber-200"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-5 w-5" />
//                           ) : (
//                             <Eye className="h-5 w-5" />
//                           )}
//                         </button>
//                       </div>

//                       {errors.password && (
//                         <p className="mt-1.5 text-xs text-red-300">
//                           {errors.password}
//                         </p>
//                       )}
//                     </div>

//                     {/* Confirm password */}
//                     <div>
//                       <label
//                         htmlFor="confirmPassword"
//                         className="mb-2 block text-sm font-medium text-amber-50"
//                       >
//                         Confirm password
//                       </label>

//                       <div className="relative">

//                         <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

//                         <input
//                           id="confirmPassword"
//                           type={
//                             showPassword
//                               ? 'text'
//                               : 'password'
//                           }
//                           autoComplete="new-password"
//                           value={formData.confirmPassword}
//                           onChange={(e) =>
//                             updateField(
//                               'confirmPassword',
//                               e.target.value
//                             )
//                           }
//                           placeholder="Enter your password again"
//                           className={`
//                             w-full
//                             rounded-xl
//                             border
//                             bg-white/10
//                             py-3.5
//                             pl-11
//                             pr-4
//                             text-white
//                             placeholder:text-white/35
//                             outline-none
//                             backdrop-blur-xl
//                             transition-all
//                             focus:bg-white/15
//                             focus:ring-2
//                             ${
//                               errors.confirmPassword
//                                 ? 'border-red-400 focus:ring-red-300/30'
//                                 : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
//                             }
//                           `}
//                         />
//                       </div>

//                       {errors.confirmPassword && (
//                         <p className="mt-1.5 text-xs text-red-300">
//                           {errors.confirmPassword}
//                         </p>
//                       )}
//                     </div>

//                     {/* Submit */}
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="
//                         group
//                         mt-2
//                         flex
//                         w-full
//                         items-center
//                         justify-center
//                         gap-2
//                         rounded-xl
//                         bg-emerald-600
//                         px-4
//                         py-3.5
//                         font-semibold
//                         text-white
//                         shadow-lg
//                         shadow-black/20
//                         transition-all
//                         hover:bg-emerald-500
//                         disabled:cursor-not-allowed
//                         disabled:opacity-60
//                       "
//                     >
//                       {loading ? (
//                         <>
//                           <Loader2 className="h-5 w-5 animate-spin" />

//                           Creating account...
//                         </>
//                       ) : (
//                         <>
//                           Create account

//                           <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                         </>
//                       )}
//                     </button>
//                   </form>

//                   {/* Sign in */}
//                   <div className="my-7 flex items-center gap-3">

//                     <div className="h-px flex-1 bg-white/15" />

//                     <span className="text-xs text-amber-100/50">
//                       Already registered?
//                     </span>

//                     <div className="h-px flex-1 bg-white/15" />
//                   </div>

//                   <Link
//                     href="/"
//                     className="
//                       flex
//                       w-full
//                       items-center
//                       justify-center
//                       rounded-xl
//                       border
//                       border-amber-400/40
//                       bg-amber-400/10
//                       py-3.5
//                       font-semibold
//                       text-amber-300
//                       backdrop-blur-xl
//                       transition
//                       hover:border-amber-300
//                       hover:bg-amber-400/15
//                     "
//                   >
//                     Sign in instead
//                   </Link>

//                   <p className="mt-7 text-center text-xs leading-5 text-white/35">
//                     By creating an account, you agree to our
//                     Terms of Service and Privacy Policy.
//                   </p>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </section>
//       </div>
//     </main>
//   );
// }
'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Languages,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  TrendingUp,
  User,
  Volume2,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [registeredEmail, setRegisteredEmail] =
    useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      newErrors.name = 'Full name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password =
        'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your password';
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,

        options: {
          emailRedirectTo: `${window.location.origin}/email-verified`,
          data: {
            full_name: formData.name.trim(),
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      /*
       * If Supabase email confirmation is disabled,
       * the user may receive a session immediately.
       */
      if (data.session) {
        toast.success('Account created successfully.');

        router.replace('/dashboard');
        router.refresh();

        return;
      }

      /*
       * If email verification is enabled,
       * show our confirmation screen.
       */
      setRegisteredEmail(formData.email.trim());

      toast.success(
        'Account created. Check your email to confirm it.'
      );
    } catch (error) {
      console.error('Registration error:', error);

      toast.error(
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#064E3B]">

      {/* =========================================================
          GREEN + GOLD GRID BACKGROUND
      ========================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundColor: '#064E3B',

          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
          `,

          backgroundSize: '44px 44px',
        }}
      />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* =======================================================
            LEFT SIDE
        ======================================================== */}
        <section className="flex items-center px-6 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-24">

          <div className="mx-auto w-full max-w-xl">

            {/* Brand */}
            <Link
              href="/"
              className="mb-12 flex w-fit items-center gap-4"
            >
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-xl backdrop-blur-xl">
                <img
                  src="/logo.png"
                  alt="HausaArabia Logo"
                  className="h-14 w-14 rounded-xl object-cover sm:h-16 sm:w-16"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  <span className="text-white">HAUSA</span>
                  <span className="text-amber-400">
                    ARABIA
                  </span>
                </h1>

                <p className="mt-1 text-xs tracking-[0.2em] text-amber-100/70">
                  ARABIC • HAUSA • ENGLISH
                </p>
              </div>
            </Link>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />

              <span className="text-sm font-medium text-amber-100">
                Begin your Arabic journey
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                Arabic made easier
                <span className="block text-amber-400">
                  for Hausa speakers.
                </span>
              </h2>

              <p
                lang="ar"
                dir="rtl"
                className="mt-4 max-w-lg text-right text-2xl text-amber-100/80 sm:text-3xl"
              >
                رحلتك في تعلم العربية تبدأ هنا
              </p>

              <p className="mt-6 max-w-lg text-base leading-7 text-amber-50/75 sm:text-lg">
                Learn at your own pace with structured Arabic
                lessons explained through Hausa and English.
              </p>
            </motion.div>

            {/* Glass feature blocks */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-10 space-y-3"
            >
              {/* Feature 1 */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Learn step by step
                  </p>

                  <p className="mt-1 text-sm leading-5 text-amber-100/60">
                    Progress through structured lessons from the
                    foundations of Arabic upward.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <Languages className="h-5 w-5 text-amber-400" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Understand what you learn
                  </p>

                  <p className="mt-1 text-sm leading-5 text-amber-100/60">
                    Hausa and English explanations make Arabic
                    easier to understand.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <Volume2 className="h-5 w-5 text-amber-400" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Practise real Arabic
                  </p>

                  <p className="mt-1 text-sm leading-5 text-amber-100/60">
                    Use exercises and audio to improve your
                    listening and speaking skills.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    See your progress
                  </p>

                  <p className="mt-1 text-sm leading-5 text-amber-100/60">
                    Complete lessons, build consistency and track
                    your learning over time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =======================================================
            RIGHT SIDE — REGISTER FORM
        ======================================================== */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg"
          >

            <div
              className="
                rounded-[28px]
                border
                border-white/20
                bg-white/10
                p-7
                shadow-2xl
                backdrop-blur-2xl
                sm:p-9
              "
            >

              {/* =================================================
                  SUCCESS STATE
              ================================================== */}
              {registeredEmail ? (
                <div className="py-8 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 backdrop-blur-xl">
                    <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-white">
                    Check your email
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm leading-7 text-amber-100/65">
                    Your HausaArabia account has been created.
                    Follow the confirmation link sent to:
                  </p>

                  <p className="mt-3 font-semibold text-amber-300">
                    {registeredEmail}
                  </p>

                  <Link
                    href="/"
                    className="
                      mt-8
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-emerald-600
                      px-6
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-emerald-500
                    "
                  >
                    Go to sign in

                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <p className="mt-6 text-xs text-white/35">
                    If you cannot find the email, check your spam
                    or junk folder.
                  </p>
                </div>
              ) : (
                <>
                  {/* Form heading */}
                  <div className="mb-7">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-amber-300">
                      Create account
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      Join HausaArabia
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-amber-100/65">
                      Create your account and begin learning
                      Arabic.
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >

                    {/* Full name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-amber-50"
                      >
                        Full name
                      </label>

                      <div className="relative">

                        <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) =>
                            updateField(
                              'name',
                              e.target.value
                            )
                          }
                          placeholder="Musa Abdullahi"
                          className={`
                            w-full
                            rounded-xl
                            border
                            bg-white/10
                            py-3.5
                            pl-11
                            pr-4
                            text-white
                            placeholder:text-white/35
                            outline-none
                            backdrop-blur-xl
                            transition-all
                            focus:bg-white/15
                            focus:ring-2
                            ${
                              errors.name
                                ? 'border-red-400 focus:ring-red-300/30'
                                : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
                            }
                          `}
                        />
                      </div>

                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-amber-50"
                      >
                        Email address
                      </label>

                      <div className="relative">

                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateField(
                              'email',
                              e.target.value
                            )
                          }
                          placeholder="musa@example.com"
                          className={`
                            w-full
                            rounded-xl
                            border
                            bg-white/10
                            py-3.5
                            pl-11
                            pr-4
                            text-white
                            placeholder:text-white/35
                            outline-none
                            backdrop-blur-xl
                            transition-all
                            focus:bg-white/15
                            focus:ring-2
                            ${
                              errors.email
                                ? 'border-red-400 focus:ring-red-300/30'
                                : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
                            }
                          `}
                        />
                      </div>

                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-amber-50"
                      >
                        Password
                      </label>

                      <div className="relative">

                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

                        <input
                          id="password"
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          autoComplete="new-password"
                          value={formData.password}
                          onChange={(e) =>
                            updateField(
                              'password',
                              e.target.value
                            )
                          }
                          placeholder="At least 6 characters"
                          className={`
                            w-full
                            rounded-xl
                            border
                            bg-white/10
                            py-3.5
                            pl-11
                            pr-12
                            text-white
                            placeholder:text-white/35
                            outline-none
                            backdrop-blur-xl
                            transition-all
                            focus:bg-white/15
                            focus:ring-2
                            ${
                              errors.password
                                ? 'border-red-400 focus:ring-red-300/30'
                                : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
                            }
                          `}
                        />

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                          onClick={() =>
                            setShowPassword(
                              (current) => !current
                            )
                          }
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-200/50 transition hover:text-amber-200"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {errors.password && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm password */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium text-amber-50"
                      >
                        Confirm password
                      </label>

                      <div className="relative">

                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

                        <input
                          id="confirmPassword"
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          autoComplete="new-password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            updateField(
                              'confirmPassword',
                              e.target.value
                            )
                          }
                          placeholder="Enter your password again"
                          className={`
                            w-full
                            rounded-xl
                            border
                            bg-white/10
                            py-3.5
                            pl-11
                            pr-4
                            text-white
                            placeholder:text-white/35
                            outline-none
                            backdrop-blur-xl
                            transition-all
                            focus:bg-white/15
                            focus:ring-2
                            ${
                              errors.confirmPassword
                                ? 'border-red-400 focus:ring-red-300/30'
                                : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
                            }
                          `}
                        />
                      </div>

                      {errors.confirmPassword && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        group
                        mt-2
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4
                        py-3.5
                        font-semibold
                        text-white
                        shadow-lg
                        shadow-black/20
                        transition-all
                        hover:bg-emerald-500
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />

                          Creating account...
                        </>
                      ) : (
                        <>
                          Create account

                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Sign in */}
                  <div className="my-7 flex items-center gap-3">

                    <div className="h-px flex-1 bg-white/15" />

                    <span className="text-xs text-amber-100/50">
                      Already registered?
                    </span>

                    <div className="h-px flex-1 bg-white/15" />
                  </div>

                  <Link
                    href="/"
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-amber-400/40
                      bg-amber-400/10
                      py-3.5
                      font-semibold
                      text-amber-300
                      backdrop-blur-xl
                      transition
                      hover:border-amber-300
                      hover:bg-amber-400/15
                    "
                  >
                    Sign in instead
                  </Link>

                  <p className="mt-7 text-center text-xs leading-5 text-white/35">
                    By creating an account, you agree to our
                    Terms of Service and Privacy Policy.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
