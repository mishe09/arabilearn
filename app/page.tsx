// // // 'use client';

// // // import { motion, type Variants } from "framer-motion";
// // // import { Eye, EyeOff, Mail, Lock, Loader2, Crown, Star, BookOpen, TrendingUp } from 'lucide-react';
// // // import { useState, FormEvent } from 'react';
// // // import Link from 'next/link';
// // // import { useRouter } from 'next/navigation';  // 👈 ADD THIS IMPORT
// // // import toast from 'react-hot-toast';

// // // export default function LoginPage() {
// // //   const router = useRouter();  // 👈 ADD THIS HOOK

// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

// // //   const validate = () => {
// // //     const newErrors: typeof errors = {};
// // //     if (!email) newErrors.email = 'Email is required';
// // //     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
// // //     if (!password) newErrors.password = 'Password is required';
// // //     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault();
// // //     if (!validate()) return;
// // //     setLoading(true);

// // //     // Simulate login
// // //     await new Promise((r) => setTimeout(r, 1500));

// // //     setLoading(false);
// // //     toast.success('Welcome back! 🌟');

// // //     // 👇 REDIRECT TO DASHBOARD
// // //     router.push('/dashboard');
// // //   };

// // //   return (
// // //     <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">

// // //       {/* ROYAL GOLD GRID BACKGROUND - ENTIRE PAGE */}
// // //       <div
// // //         className="pointer-events-none absolute inset-0 z-0"
// // //         style={{
// // //           backgroundColor: '#064E3B',
// // //           backgroundImage: `
// // //             linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
// // //             linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
// // //           `,
// // //           backgroundSize: '44px 44px',
// // //         }}
// // //       />

// // //       {/* LEFT SIDE - MARKETING (Green + Gold) */}
// // //       <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-16">
// // //         <div className="relative z-20 max-w-lg text-center md:text-left">
// // //           {/* Gold Crown Icon */}
// // //           <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
// // //             {/* Logo */}
// // //             <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //               <img
// // //                 src="/logo.png"
// // //                 alt="HausArabia Logo"
// // //                 className="h-14 w-14 object-cover sm:h-16 sm:w-16 md:h-20 md:w-20"
// // //               />
// // //             </div>

// // //             {/* Brand */}
// // //             <div className="flex flex-col">
// // //               {/* Title */}
// // //               <h1 className="text-2xl font-bold leading-none sm:text-3xl md:text-4xl lg:text-5xl">
// // //                 <span style={{ color: "#037556" }}>HAUSA</span>
// // //                 <span className="text-amber-300">ARABIA</span>
// // //               </h1>

// // //               {/* Tagline */}
// // //               <p className="mt-1 text-center text-[9px] tracking-[0.22em] text-amber-100/90 sm:mt-2 sm:text-[10px] md:text-xs">
// // //                 Arabic • Hausa • English
// // //               </p>
// // //             </div>
// // //           </div>

// // //           {/* Main Headline - 3 Languages */}
// // //           <motion.h1
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6 }}
// // //             className="mb-4 text-4xl font-bold text-amber-300 md:text-5xl lg:text-6xl"
// // //           >
// // //             Koyi Larabci
// // //             <span className="block text-2xl text-amber-200/80 md:text-3xl" lang="ar">
// // //               تعلم العربية
// // //             </span>
// // //           </motion.h1>

// // //           <motion.p
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6, delay: 0.1 }}
// // //             className="mb-8 text-lg text-amber-100/90 md:text-xl"
// // //           >
// // //             Learn Arabic from Hausa • من الهوسا إلى العربية
// // //           </motion.p>

// // //           {/* Features */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6, delay: 0.2 }}
// // //             className="mb-8 space-y-4"
// // //           >
// // //             <div className="flex items-center gap-3 text-amber-100">
// // //               <BookOpen className="h-5 w-5 text-amber-400" />
// // //               <span>📚 500+ curriculum tasks & exercises</span>
// // //             </div>
// // //             <div className="flex items-center gap-3 text-amber-100">
// // //               <Star className="h-5 w-5 text-amber-400" />
// // //               <span>⭐ Track your progress daily</span>
// // //             </div>
// // //             <div className="flex items-center gap-3 text-amber-100">
// // //               <TrendingUp className="h-5 w-5 text-amber-400" />
// // //               <span>📈 From beginner to fluent speaker</span>
// // //             </div>
// // //           </motion.div>

// // //           {/* Subscription Badge */}
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             transition={{ duration: 0.5, delay: 0.3 }}
// // //             className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 backdrop-blur-sm"
// // //           >
// // //             <Crown className="h-4 w-4 text-amber-400" />
// // //             <span className="text-sm font-medium text-amber-300">
// // //               Subscribe from ₦5,000/month • First 7 days free
// // //             </span>
// // //           </motion.div>

// // //           {/* Trust message */}
// // //           <p className="mt-8 text-sm text-amber-200/60">
// // //             Join 5,000+ Hausa speakers learning Arabic
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* RIGHT SIDE - GLASSMORPHISM LOGIN FORM */}
// // //       <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:px-12">
// // //         <motion.div
// // //           initial={{ opacity: 0, x: 30 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ duration: 0.6 }}
// // //           className="w-full max-w-md"
// // //         >
// // //           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
// // //             <h2 className="mb-2 text-3xl font-bold text-white">Welcome back</h2>
// // //             <p className="mb-8 text-amber-200/80">Sign in to continue your Arabic journey</p>

// // //             <form onSubmit={handleSubmit} className="space-y-5">
// // //               {/* Email */}
// // //               <div>
// // //                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
// // //                 <div className="relative">
// // //                   <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// // //                   <input
// // //                     type="email"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                     placeholder="you@example.com"
// // //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${errors.email
// // //                       ? 'border-red-400 focus:ring-red-300/50'
// // //                       : 'border-white/20 focus:ring-amber-400/50'
// // //                       }`}
// // //                   />
// // //                 </div>
// // //                 {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
// // //               </div>

// // //               {/* Password */}
// // //               <div>
// // //                 <div className="mb-1.5 flex items-center justify-between">
// // //                   <label className="text-sm font-medium text-amber-100">Password</label>
// // //                   <Link href="/forgot-password" className="text-xs text-amber-300 hover:text-amber-200 transition">
// // //                     Forgot?
// // //                   </Link>
// // //                 </div>
// // //                 <div className="relative">
// // //                   <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// // //                   <input
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     value={password}
// // //                     onChange={(e) => setPassword(e.target.value)}
// // //                     placeholder="Your password"
// // //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-12 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${errors.password
// // //                       ? 'border-red-400 focus:ring-red-300/50'
// // //                       : 'border-white/20 focus:ring-amber-400/50'
// // //                       }`}
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

// // //               {/* Login Button with Routing */}
// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
// // //               >
// // //                 {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Login →'}
// // //               </button>
// // //             </form>

// // //             {/* Divider */}
// // //             <div className="my-6 flex items-center gap-3">
// // //               <div className="h-px flex-1 bg-white/20" />
// // //               <span className="text-sm text-amber-200/60">New here?</span>
// // //               <div className="h-px flex-1 bg-white/20" />
// // //             </div>

// // //             {/* Signup Link */}
// // //             <Link href="/register" className="block">
// // //               <div className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-amber-400/50 bg-white/10 py-3 font-semibold text-amber-300 transition-all hover:bg-amber-400/20 hover:border-amber-400">
// // //                 <Crown className="h-4 w-4" />
// // //                 Start 7-day free trial
// // //               </div>
// // //             </Link>

// // //             <p className="mt-6 text-center text-xs text-white/40">
// // //               By continuing, you agree to our Terms and Privacy Policy
// // //             </p>
// // //           </div>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { motion } from 'framer-motion';
// // import {
// //   ArrowRight,
// //   BookOpen,
// //   Eye,
// //   EyeOff,
// //   Headphones,
// //   Languages,
// //   Loader2,
// //   Lock,
// //   Mail,
// //   ShieldCheck,
// // } from 'lucide-react';
// // import { FormEvent, useState } from 'react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import toast from 'react-hot-toast';

// // import { createClient } from '@/lib/supabase/client';

// // export default function LoginPage() {
// //   const router = useRouter();

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const [errors, setErrors] = useState<{
// //     email?: string;
// //     password?: string;
// //   }>({});

// //   const validate = () => {
// //     const newErrors: typeof errors = {};

// //     if (!email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       newErrors.email = 'Enter a valid email address';
// //     }

// //     if (!password) {
// //       newErrors.password = 'Password is required';
// //     } else if (password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     setErrors(newErrors);

// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault();

// //     if (!validate()) return;

// //     setLoading(true);

// //     try {
// //       const supabase = createClient();

// //       const { error } = await supabase.auth.signInWithPassword({
// //         email: email.trim(),
// //         password,
// //       });

// //       if (error) {
// //         if (error.message.toLowerCase().includes('invalid login credentials')) {
// //           toast.error('Incorrect email or password.');
// //         } else if (error.message.toLowerCase().includes('email not confirmed')) {
// //           toast.error('Please confirm your email before signing in.');
// //         } else {
// //           toast.error(error.message);
// //         }

// //         return;
// //       }

// //       toast.success('Welcome back.');

// //       router.replace('/dashboard');
// //       router.refresh();
// //     } catch (error) {
// //       console.error('Login error:', error);
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
// //             radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.10), transparent 30%),
// //             radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.12), transparent 30%),
// //             linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
// //           `,
// //           backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
// //         }}
// //       />

// //       <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

// //         {/* LEFT — BRAND / STORY */}
// //         <section className="relative flex items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
// //           <div className="mx-auto w-full max-w-xl">

// //             {/* Logo */}
// //             <motion.div
// //               initial={{ opacity: 0, y: -12 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               className="mb-14 flex items-center gap-4"
// //             >
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
// //             </motion.div>

// //             {/* Badge */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 15 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.1 }}
// //               className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2"
// //             >
// //               <Languages className="h-4 w-4 text-amber-300" />

// //               <span className="text-sm text-amber-100">
// //                 Arabic learning designed for Hausa speakers
// //               </span>
// //             </motion.div>

// //             {/* Heading */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 18 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.55, delay: 0.15 }}
// //             >
// //               <h1 className="max-w-lg text-4xl font-semibold leading-[1.12] text-white sm:text-5xl xl:text-6xl">
// //                 Learn Arabic with
// //                 <span className="block text-amber-400">
// //                   clarity and purpose.
// //                 </span>
// //               </h1>

// //               <p
// //                 lang="ar"
// //                 dir="rtl"
// //                 className="mt-4 max-w-lg text-right text-2xl text-emerald-100/80"
// //               >
// //                 تعلم العربية خطوة بخطوة
// //               </p>

// //               <p className="mt-6 max-w-lg text-base leading-7 text-emerald-50/65 sm:text-lg">
// //                 Build your Arabic through structured lessons, practical
// //                 exercises and progress you can actually follow.
// //               </p>
// //             </motion.div>

// //             {/* Feature cards */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 18 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.55, delay: 0.25 }}
// //               className="mt-10 grid gap-3 sm:grid-cols-3"
// //             >
// //               <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
// //                 <BookOpen className="mb-3 h-5 w-5 text-amber-400" />
// //                 <p className="text-sm font-medium text-white">
// //                   Structured lessons
// //                 </p>
// //                 <p className="mt-1 text-xs leading-5 text-emerald-100/50">
// //                   Learn in a clear sequence.
// //                 </p>
// //               </div>

// //               <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
// //                 <Headphones className="mb-3 h-5 w-5 text-amber-400" />
// //                 <p className="text-sm font-medium text-white">
// //                   Listen & practise
// //                 </p>
// //                 <p className="mt-1 text-xs leading-5 text-emerald-100/50">
// //                   Strengthen real language skills.
// //                 </p>
// //               </div>

// //               <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
// //                 <ShieldCheck className="mb-3 h-5 w-5 text-amber-400" />
// //                 <p className="text-sm font-medium text-white">
// //                   Track progress
// //                 </p>
// //                 <p className="mt-1 text-xs leading-5 text-emerald-100/50">
// //                   Continue where you stopped.
// //                 </p>
// //               </div>
// //             </motion.div>

// //             <p className="mt-10 text-sm text-emerald-100/40">
// //               Koyi Larabci · Learn Arabic · تعلم العربية
// //             </p>
// //           </div>
// //         </section>

// //         {/* RIGHT — LOGIN */}
// //         <section className="flex items-center justify-center px-4 py-8 sm:px-8 lg:bg-[#f6f7f2] lg:px-12">
// //           <motion.div
// //             initial={{ opacity: 0, x: 24 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.55 }}
// //             className="w-full max-w-md"
// //           >
// //             <div className="rounded-[28px] border border-white/50 bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.16)] sm:p-9">

// //               <div className="mb-8">
// //                 <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
// //                   Welcome back
// //                 </p>

// //                 <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
// //                   Sign in to HausaArabia
// //                 </h2>

// //                 <p className="mt-2 text-sm leading-6 text-slate-500">
// //                   Continue your Arabic learning journey.
// //                 </p>
// //               </div>

// //               <form onSubmit={handleSubmit} className="space-y-5">

// //                 {/* Email */}
// //                 <div>
// //                   <label
// //                     htmlFor="email"
// //                     className="mb-2 block text-sm font-medium text-slate-700"
// //                   >
// //                     Email address
// //                   </label>

// //                   <div className="relative">
// //                     <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

// //                     <input
// //                       id="email"
// //                       type="email"
// //                       autoComplete="email"
// //                       value={email}
// //                       onChange={(e) => {
// //                         setEmail(e.target.value);

// //                         if (errors.email) {
// //                           setErrors((current) => ({
// //                             ...current,
// //                             email: undefined,
// //                           }));
// //                         }
// //                       }}
// //                       placeholder="you@example.com"
// //                       className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
// //                         errors.email
// //                           ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
// //                           : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
// //                       }`}
// //                     />
// //                   </div>

// //                   {errors.email && (
// //                     <p className="mt-1.5 text-xs text-red-600">
// //                       {errors.email}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Password */}
// //                 <div>
// //                   <div className="mb-2 flex items-center justify-between">
// //                     <label
// //                       htmlFor="password"
// //                       className="text-sm font-medium text-slate-700"
// //                     >
// //                       Password
// //                     </label>

// //                     <Link
// //                       href="/forgot-password"
// //                       className="text-xs font-semibold text-emerald-700 transition hover:text-emerald-600"
// //                     >
// //                       Forgot password?
// //                     </Link>
// //                   </div>

// //                   <div className="relative">
// //                     <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

// //                     <input
// //                       id="password"
// //                       type={showPassword ? 'text' : 'password'}
// //                       autoComplete="current-password"
// //                       value={password}
// //                       onChange={(e) => {
// //                         setPassword(e.target.value);

// //                         if (errors.password) {
// //                           setErrors((current) => ({
// //                             ...current,
// //                             password: undefined,
// //                           }));
// //                         }
// //                       }}
// //                       placeholder="Enter your password"
// //                       className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
// //                         errors.password
// //                           ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
// //                           : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-100'
// //                       }`}
// //                     />

// //                     <button
// //                       type="button"
// //                       aria-label={
// //                         showPassword ? 'Hide password' : 'Show password'
// //                       }
// //                       onClick={() => setShowPassword((current) => !current)}
// //                       className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
// //                     >
// //                       {showPassword ? (
// //                         <EyeOff className="h-5 w-5" />
// //                       ) : (
// //                         <Eye className="h-5 w-5" />
// //                       )}
// //                     </button>
// //                   </div>

// //                   {errors.password && (
// //                     <p className="mt-1.5 text-xs text-red-600">
// //                       {errors.password}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <Loader2 className="h-5 w-5 animate-spin" />
// //                       Signing in...
// //                     </>
// //                   ) : (
// //                     <>
// //                       Sign in
// //                       <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
// //                     </>
// //                   )}
// //                 </button>
// //               </form>

// //               <div className="my-7 flex items-center gap-3">
// //                 <div className="h-px flex-1 bg-slate-200" />
// //                 <span className="text-xs text-slate-400">
// //                   New to HausaArabia?
// //                 </span>
// //                 <div className="h-px flex-1 bg-slate-200" />
// //               </div>

// //               <Link
// //                 href="/register"
// //                 className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
// //               >
// //                 Create an account
// //               </Link>

// //               <p className="mt-7 text-center text-xs leading-5 text-slate-400">
// //                 By continuing, you agree to our Terms of Service and Privacy
// //                 Policy.
// //               </p>
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
//   Eye,
//   EyeOff,
//   Headphones,
//   Languages,
//   Loader2,
//   Lock,
//   Mail,
//   ShieldCheck,
//   Sparkles,
// } from 'lucide-react';
// import { FormEvent, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// import { createClient } from '@/lib/supabase/client';

// export default function LoginPage() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [errors, setErrors] = useState<{
//     email?: string;
//     password?: string;
//   }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);

//     try {
//       const supabase = createClient();

//       const { error } = await supabase.auth.signInWithPassword({
//         email: email.trim(),
//         password,
//       });

//       if (error) {
//         if (
//           error.message
//             .toLowerCase()
//             .includes('invalid login credentials')
//         ) {
//           toast.error('Incorrect email or password.');
//         } else if (
//           error.message.toLowerCase().includes('email not confirmed')
//         ) {
//           toast.error('Please confirm your email before signing in.');
//         } else {
//           toast.error(error.message);
//         }

//         return;
//       }

//       toast.success('Welcome back!');

//       router.replace('/dashboard');
//       router.refresh();
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Something went wrong. Please try again.');
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

//       {/* Soft decorative glows */}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
//         <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
//       </div>

//       {/* =========================================================
//           PAGE CONTENT
//       ========================================================== */}
//       <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

//         {/* =======================================================
//             LEFT SIDE — BRAND + INFORMATION
//         ======================================================== */}
//         <section className="flex items-center px-6 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-24">

//           <div className="mx-auto w-full max-w-xl">

//             {/* Brand */}
//             <motion.div
//               initial={{ opacity: 0, y: -15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mb-12 flex items-center gap-4"
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
//                   <span className="text-amber-400">ARABIA</span>
//                 </h1>

//                 <p className="mt-1 text-xs tracking-[0.2em] text-amber-100/70">
//                   ARABIC • HAUSA • ENGLISH
//                 </p>
//               </div>
//             </motion.div>

//             {/* Small badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 backdrop-blur-xl"
//             >
//               <Sparkles className="h-4 w-4 text-amber-300" />

//               <span className="text-sm font-medium text-amber-100">
//                 Arabic learning built for Hausa speakers
//               </span>
//             </motion.div>

//             {/* Main heading */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 0.15 }}
//             >
//               <h2 className="max-w-xl text-4xl font-bold leading-[1.12] text-white sm:text-5xl xl:text-6xl">
//                 Learn Arabic with
//                 <span className="block text-amber-400">
//                   clarity and confidence.
//                 </span>
//               </h2>

//               <p
//                 lang="ar"
//                 dir="rtl"
//                 className="mt-4 max-w-lg text-right text-2xl text-amber-100/80 sm:text-3xl"
//               >
//                 تعلم العربية خطوة بخطوة
//               </p>

//               <p className="mt-6 max-w-lg text-base leading-7 text-amber-50/75 sm:text-lg">
//                 Learn Arabic through Hausa and English with structured lessons,
//                 practical exercises and progress you can follow.
//               </p>
//             </motion.div>

//             {/* Glass information cards */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, delay: 0.25 }}
//               className="mt-10 grid gap-3 sm:grid-cols-3"
//             >
//               <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
//                 <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
//                   <BookOpen className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <p className="text-sm font-semibold text-white">
//                   Structured lessons
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-amber-100/60">
//                   Follow a clear learning path from beginner upward.
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
//                 <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
//                   <Headphones className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <p className="text-sm font-semibold text-white">
//                   Listen & practise
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-amber-100/60">
//                   Build useful listening and speaking skills.
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
//                 <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
//                   <ShieldCheck className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <p className="text-sm font-semibold text-white">
//                   Track progress
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-amber-100/60">
//                   Return anytime and continue where you stopped.
//                 </p>
//               </div>
//             </motion.div>

//             <p className="mt-10 text-sm text-amber-100/40">
//               Koyi Larabci · Learn Arabic · تعلم العربية
//             </p>
//           </div>
//         </section>

//         {/* =======================================================
//             RIGHT SIDE — GLASS LOGIN FORM
//         ======================================================== */}
//         <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full max-w-md"
//           >
//             <div
//               className="
//                 rounded-[28px]
//                 border border-white/20
//                 bg-white/10
//                 p-7
//                 shadow-2xl
//                 backdrop-blur-2xl
//                 sm:p-9
//               "
//             >

//               {/* Form heading */}
//               <div className="mb-8">
//                 <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-amber-300">
//                   Welcome back
//                 </p>

//                 <h2 className="text-3xl font-bold tracking-tight text-white">
//                   Sign in to HausaArabia
//                 </h2>

//                 <p className="mt-2 text-sm leading-6 text-amber-100/65">
//                   Continue your Arabic learning journey.
//                 </p>
//               </div>

//               {/* LOGIN FORM */}
//               <form onSubmit={handleSubmit} className="space-y-5">

//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="mb-2 block text-sm font-medium text-amber-50"
//                   >
//                     Email address
//                   </label>

//                   <div className="relative">
//                     <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

//                     <input
//                       id="email"
//                       type="email"
//                       autoComplete="email"
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value);

//                         if (errors.email) {
//                           setErrors((current) => ({
//                             ...current,
//                             email: undefined,
//                           }));
//                         }
//                       }}
//                       placeholder="you@example.com"
//                       className={`
//                         w-full
//                         rounded-xl
//                         border
//                         bg-white/10
//                         py-3.5
//                         pl-11
//                         pr-4
//                         text-white
//                         placeholder:text-white/35
//                         outline-none
//                         backdrop-blur-xl
//                         transition-all
//                         focus:bg-white/15
//                         focus:ring-2
//                         ${
//                           errors.email
//                             ? 'border-red-400 focus:ring-red-300/30'
//                             : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
//                         }
//                       `}
//                     />
//                   </div>

//                   {errors.email && (
//                     <p className="mt-1.5 text-xs text-red-300">
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <div className="mb-2 flex items-center justify-between">

//                     <label
//                       htmlFor="password"
//                       className="text-sm font-medium text-amber-50"
//                     >
//                       Password
//                     </label>

//                     <Link
//                       href="/forgot-password"
//                       className="text-xs font-semibold text-amber-300 transition hover:text-amber-200"
//                     >
//                       Forgot password?
//                     </Link>
//                   </div>

//                   <div className="relative">
//                     <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

//                     <input
//                       id="password"
//                       type={showPassword ? 'text' : 'password'}
//                       autoComplete="current-password"
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value);

//                         if (errors.password) {
//                           setErrors((current) => ({
//                             ...current,
//                             password: undefined,
//                           }));
//                         }
//                       }}
//                       placeholder="Enter your password"
//                       className={`
//                         w-full
//                         rounded-xl
//                         border
//                         bg-white/10
//                         py-3.5
//                         pl-11
//                         pr-12
//                         text-white
//                         placeholder:text-white/35
//                         outline-none
//                         backdrop-blur-xl
//                         transition-all
//                         focus:bg-white/15
//                         focus:ring-2
//                         ${
//                           errors.password
//                             ? 'border-red-400 focus:ring-red-300/30'
//                             : 'border-white/20 focus:border-amber-400/70 focus:ring-amber-400/20'
//                         }
//                       `}
//                     />

//                     <button
//                       type="button"
//                       aria-label={
//                         showPassword ? 'Hide password' : 'Show password'
//                       }
//                       onClick={() =>
//                         setShowPassword((current) => !current)
//                       }
//                       className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-200/50 transition hover:text-amber-200"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5" />
//                       ) : (
//                         <Eye className="h-5 w-5" />
//                       )}
//                     </button>
//                   </div>

//                   {errors.password && (
//                     <p className="mt-1.5 text-xs text-red-300">
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 {/* Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="
//                     group
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-xl
//                     bg-emerald-600
//                     px-4
//                     py-3.5
//                     font-semibold
//                     text-white
//                     shadow-lg
//                     shadow-black/20
//                     transition-all
//                     hover:bg-emerald-500
//                     disabled:cursor-not-allowed
//                     disabled:opacity-60
//                   "
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign in

//                       <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                     </>
//                   )}
//                 </button>
//               </form>

//               {/* Divider */}
//               <div className="my-7 flex items-center gap-3">
//                 <div className="h-px flex-1 bg-white/15" />

//                 <span className="text-xs text-amber-100/50">
//                   New to HausaArabia?
//                 </span>

//                 <div className="h-px flex-1 bg-white/15" />
//               </div>

//               {/* Register */}
//               <Link
//                 href="/register"
//                 className="
//                   flex
//                   w-full
//                   items-center
//                   justify-center
//                   rounded-xl
//                   border
//                   border-amber-400/40
//                   bg-amber-400/10
//                   py-3.5
//                   font-semibold
//                   text-amber-300
//                   backdrop-blur-xl
//                   transition
//                   hover:border-amber-300
//                   hover:bg-amber-400/15
//                 "
//               >
//                 Create an account
//               </Link>

//               <p className="mt-7 text-center text-xs leading-5 text-white/35">
//                 By continuing, you agree to our Terms of Service and Privacy
//                 Policy.
//               </p>
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
  Eye,
  EyeOff,
  Languages,
  Loader2,
  Lock,
  Mail,
  Sparkles,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        const message = error.message.toLowerCase();

        if (message.includes('invalid login credentials')) {
          toast.error('Incorrect email or password.');
        } else if (message.includes('email not confirmed')) {
          toast.error('Please confirm your email before signing in.');
        } else {
          toast.error(error.message);
        }

        return;
      }

      toast.success('Welcome back!');
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#064E3B]">
      {/* Green base + subtle traditional grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: '#064E3B',
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.09) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Very light decorative glow on the form side only */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[4%] top-[10%] h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[6%] right-[12%] h-44 w-44 rounded-full bg-emerald-300/[0.07] blur-3xl" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.12fr_0.88fr]">
        {/* =========================================================
            LEFT — VIDEO / STORY
        ========================================================== */}
        <section className="relative min-h-[540px] overflow-hidden lg:min-h-screen">
          {/* Keep the hero video bright and unobstructed */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/landing-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          {/* Minimal text-readability scrim only; no decorative shapes over the video */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/58 via-emerald-950/16 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-emerald-950/55 to-transparent" />

          <div className="relative z-10 flex min-h-[540px] flex-col justify-between px-6 py-8 sm:px-10 lg:min-h-screen lg:px-12 xl:px-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <div className="overflow-hidden rounded-2xl bg-white/10 p-1.5 shadow-xl ring-1 ring-white/15 backdrop-blur-xl">
                <img
                  src="/logo.png"
                  alt="HausaArabia"
                  className="h-12 w-12 rounded-xl object-cover sm:h-14 sm:w-14"
                />
              </div>

              <div>
                <div className="text-xl font-bold tracking-tight sm:text-2xl">
                  <span className="text-white">HAUSA</span>
                  <span className="text-amber-400">ARABIA</span>
                </div>
                <p className="mt-0.5 text-[10px] font-medium tracking-[0.2em] text-white/55 sm:text-[11px]">
                  ARABIC · HAUSA · ENGLISH
                </p>
              </div>
            </motion.div>

            {/* Story copy */}
            <div className="max-w-2xl pb-5 lg:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-300/12 px-3 py-1.5 text-xs font-semibold text-amber-200 ring-1 ring-amber-300/20 backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Arabic learning built for Hausa speakers
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.13 }}
                className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl xl:text-6xl"
              >
                Learn Arabic in a way
                <span className="block text-amber-300">
                  that already feels familiar.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.2 }}
                className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7"
              >
                Learn through Hausa and English with structured lessons,
                listening practice and progress that grows with you.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                lang="ar"
                dir="rtl"
                className="mt-3 max-w-xl text-right text-xl font-medium text-amber-100/85 sm:text-2xl"
              >
                تعلم العربية خطوة بخطوة
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Start learning
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#sign-in"
                  className="inline-flex items-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
                >
                  I already have an account
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT — LOGIN / GLASS CARD
        ========================================================== */}
        <section
          id="sign-in"
          className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:min-h-screen lg:px-10 xl:px-14"
        >
          {/* restrained warm glow behind the glass card */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[8%] top-[16%] h-48 w-48 rounded-full bg-amber-300/12 blur-3xl" />
            <div className="absolute bottom-[10%] left-[8%] h-36 w-36 rounded-full bg-emerald-300/[0.07] blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 w-full max-w-md"
          >
            {/* Two subtle brand circles around the glass card */}
            <div className="pointer-events-none absolute -left-3 -top-3 h-7 w-7 rounded-full bg-amber-300/60 shadow-lg shadow-amber-500/10" />
            <div className="pointer-events-none absolute -bottom-3 right-8 h-8 w-8 rounded-full border border-emerald-200/25 bg-emerald-300/20 backdrop-blur-md" />

            <div
              className="
                relative overflow-hidden rounded-[30px]
                border border-amber-100/20
                bg-[linear-gradient(145deg,rgba(255,248,214,0.18),rgba(255,255,255,0.10),rgba(250,204,21,0.08))]
                p-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)]
                backdrop-blur-2xl sm:p-9
              "
            >
              {/* subtle card texture */}
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-300/12 blur-2xl" />
                <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-emerald-300/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="mb-8">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                    <Languages className="h-4 w-4" />
                    Welcome back
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Sign in to HausaArabia
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-amber-100/65">
                    Continue your Arabic learning journey from where you stopped.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);

                          if (errors.email) {
                            setErrors((current) => ({
                              ...current,
                              email: undefined,
                            }));
                          }
                        }}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border bg-[#073f33]/45 py-3.5 pl-11 pr-4 text-white placeholder:text-white/35 outline-none transition-all focus:bg-[#073f33]/60 focus:ring-2 ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-300/30'
                            : 'border-amber-100/15 focus:border-amber-300/50 focus:ring-amber-300/15'
                        }`}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-300">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-amber-50"
                      >
                        Password
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-amber-300 transition hover:text-amber-200"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-200/50" />

                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);

                          if (errors.password) {
                            setErrors((current) => ({
                              ...current,
                              password: undefined,
                            }));
                          }
                        }}
                        placeholder="Enter your password"
                        className={`w-full rounded-xl border bg-[#073f33]/45 py-3.5 pl-11 pr-12 text-white placeholder:text-white/35 outline-none transition-all focus:bg-[#073f33]/60 focus:ring-2 ${
                          errors.password
                            ? 'border-red-400 focus:ring-red-300/30'
                            : 'border-amber-100/15 focus:border-amber-300/50 focus:ring-amber-300/15'
                        }`}
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        onClick={() =>
                          setShowPassword((current) => !current)
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3.5 font-bold text-emerald-950 shadow-lg shadow-amber-950/10 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="my-7 flex items-center gap-3">
                  <div className="h-px flex-1 bg-amber-100/15" />
                  <span className="text-xs text-amber-100/50">
                    New to HausaArabia?
                  </span>
                  <div className="h-px flex-1 bg-amber-100/15" />
                </div>

                <Link
                  href="/register"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-300/10 py-3.5 font-semibold text-emerald-100 transition hover:border-emerald-200/35 hover:bg-emerald-300/15"
                >
                  Create an account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="mt-7 text-center text-xs leading-5 text-white/35">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-amber-100/40">
              Koyi Larabci · Learn Arabic · تعلم العربية
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
