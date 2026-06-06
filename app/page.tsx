// // // 


// // 'use client';

// // import { motion } from 'framer-motion';
// // import { Eye, EyeOff, Mail, Lock, Loader2, Crown, Star, BookOpen, TrendingUp } from 'lucide-react';
// // import { useState, FormEvent } from 'react';
// // import Link from 'next/link';
// // import toast from 'react-hot-toast';

// // export default function LoginPage() {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

// //   const validate = () => {
// //     const newErrors: typeof errors = {};
// //     if (!email) newErrors.email = 'Email is required';
// //     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
// //     if (!password) newErrors.password = 'Password is required';
// //     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault();
// //     if (!validate()) return;
// //     setLoading(true);
// //     await new Promise((r) => setTimeout(r, 1500));
// //     setLoading(false);
// //     toast.success('Welcome back! 🌟');
// //   };

// //   return (
// //     <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      
// //       {/* ROYAL GOLD GRID BACKGROUND - ENTIRE PAGE */}
// //       <div
// //         className="pointer-events-none absolute inset-0 z-0"
// //         style={{
// //           backgroundImage: `
// //             linear-gradient(rgba(212,175,55,0.13) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(212,175,55,0.13) 1px, transparent 1px)
// //           `,
// //           backgroundSize: '44px 44px',
// //         }}
// //       />
      
// //       {/* Subtle dark overlay for depth */}
// //       <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-emerald-950/50 via-emerald-900/50 to-green-950/50" />

// //       {/* LEFT SIDE - MARKETING (Green + Gold) */}
// //       <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-16">
// //         {/* Decorative gold blur */}
// //         <div className="absolute inset-0 opacity-30">
// //           <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl" />
// //           <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 blur-3xl" />
// //         </div>

// //         <div className="relative z-20 max-w-lg text-center md:text-left">
// //           {/* Gold Crown Icon */}
// //           <div className="mb-8 flex justify-center md:justify-start">
// //             <div className="rounded-full bg-amber-500/20 p-3 backdrop-blur-sm">
// //               <Crown className="h-12 w-12 text-amber-400" />
// //             </div>
// //           </div>

// //           {/* Main Headline - 3 Languages */}
// //           <motion.h1
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="mb-4 text-4xl font-bold text-amber-300 md:text-5xl lg:text-6xl"
// //           >
// //             Koyi Larabci
// //             <span className="block text-2xl text-amber-200/80 md:text-3xl">
// //               تعلم العربية
// //             </span>
// //           </motion.h1>

// //           <motion.p
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.1 }}
// //             className="mb-8 text-lg text-amber-100/90 md:text-xl"
// //           >
// //             Learn Arabic from Hausa • من الهوسا إلى العربية
// //           </motion.p>

// //           {/* Features */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             className="mb-8 space-y-4"
// //           >
// //             <div className="flex items-center gap-3 text-amber-100">
// //               <BookOpen className="h-5 w-5 text-amber-400" />
// //               <span>📚 500+ curriculum tasks & exercises</span>
// //             </div>
// //             <div className="flex items-center gap-3 text-amber-100">
// //               <Star className="h-5 w-5 text-amber-400" />
// //               <span>⭐ Track your progress daily</span>
// //             </div>
// //             <div className="flex items-center gap-3 text-amber-100">
// //               <TrendingUp className="h-5 w-5 text-amber-400" />
// //               <span>📈 From beginner to fluent speaker</span>
// //             </div>
// //           </motion.div>

// //           {/* Subscription Badge */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.5, delay: 0.3 }}
// //             className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 backdrop-blur-sm"
// //           >
// //             <Crown className="h-4 w-4 text-amber-400" />
// //             <span className="text-sm font-medium text-amber-300">
// //               Subscribe from ₦5,000/month • First 7 days free
// //             </span>
// //           </motion.div>

// //           {/* Trust message */}
// //           <p className="mt-8 text-sm text-amber-200/60">
// //             Join 5,000+ Hausa speakers learning Arabic
// //           </p>
// //         </div>
// //       </div>

// //       {/* RIGHT SIDE - GLASSMORPHISM LOGIN FORM */}
// //       <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:px-12">
// //         <motion.div
// //           initial={{ opacity: 0, x: 30 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="w-full max-w-md"
// //         >
// //           {/* Glassmorphism Card */}
// //           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
// //             <h2 className="mb-2 text-3xl font-bold text-white">Welcome back</h2>
// //             <p className="mb-8 text-amber-200/80">Sign in to continue your Arabic journey</p>

// //             <form onSubmit={handleSubmit} className="space-y-5">
// //               {/* Email */}
// //               <div>
// //                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
// //                 <div className="relative">
// //                   <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// //                   <input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="you@example.com"
// //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
// //                       errors.email
// //                         ? 'border-red-400 focus:ring-red-300/50'
// //                         : 'border-white/20 focus:ring-amber-400/50'
// //                     }`}
// //                   />
// //                 </div>
// //                 {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
// //               </div>

// //               {/* Password */}
// //               <div>
// //                 <div className="mb-1.5 flex items-center justify-between">
// //                   <label className="text-sm font-medium text-amber-100">Password</label>
// //                   <Link href="/forgot-password" className="text-xs text-amber-300 hover:text-amber-200 transition">
// //                     Forgot?
// //                   </Link>
// //                 </div>
// //                 <div className="relative">
// //                   <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     placeholder="Your password"
// //                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-12 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
// //                       errors.password
// //                         ? 'border-red-400 focus:ring-red-300/50'
// //                         : 'border-white/20 focus:ring-amber-400/50'
// //                     }`}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300/60 hover:text-amber-200 transition"
// //                   >
// //                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// //                   </button>
// //                 </div>
// //                 {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
// //               </div>

// //               {/* Login Button - Emerald Green */}
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
// //               >
// //                 {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Login →'}
// //               </button>
// //             </form>

// //             {/* Divider */}
// //             <div className="my-6 flex items-center gap-3">
// //               <div className="h-px flex-1 bg-white/20" />
// //               <span className="text-sm text-amber-200/60">New here?</span>
// //               <div className="h-px flex-1 bg-white/20" />
// //             </div>

// //             {/* Signup + Subscription CTA */}
// //             <Link href="/register">
// //               <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-amber-400/50 bg-white/10 py-3 font-semibold text-amber-300 transition-all hover:bg-amber-400/20 hover:border-amber-400">
// //                 <Crown className="h-4 w-4" />
// //                 Start 7-day free trial
// //               </button>
// //             </Link>

// //             <p className="mt-6 text-center text-xs text-white/40">
// //               By continuing, you agree to our Terms and Privacy Policy
// //             </p>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Mail, Lock, Loader2, Crown, Star, BookOpen, TrendingUp } from 'lucide-react';
// import { useState, FormEvent } from 'react';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 1500));
//     setLoading(false);
//     toast.success('Welcome back! 🌟');
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      
//       {/* SOLID GREEN BACKGROUND + GOLD GRID */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundColor: '#064E3B', // Solid emerald-900 green
//           backgroundImage: `
//             linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
//           `,
//           backgroundSize: '44px 44px',
//         }}
//       />

//       {/* LEFT SIDE - MARKETING (Text is gold on green/grid background) */}
//       <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-16">
//         {/* Decorative gold glow */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl" />
//           <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 blur-3xl" />
//         </div>

//         <div className="relative z-20 max-w-lg text-center md:text-left">
//           {/* Gold Crown Icon */}
//           <div className="mb-8 flex justify-center md:justify-start">
//             <div className="rounded-full bg-amber-500/20 p-3">
//               <Crown className="h-12 w-12 text-amber-400" />
//             </div>
//           </div>

//           {/* Main Headline - 3 Languages */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-4 text-4xl font-bold text-amber-300 md:text-5xl lg:text-6xl"
//           >
//             Koyi Larabci
//             <span className="block text-2xl text-amber-200/80 md:text-3xl">
//               تعلم العربية
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="mb-8 text-lg text-amber-100/90 md:text-xl"
//           >
//             Learn Arabic from Hausa • من الهوسا إلى العربية
//           </motion.p>

//           {/* Features */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mb-8 space-y-4"
//           >
//             <div className="flex items-center gap-3 text-amber-100">
//               <BookOpen className="h-5 w-5 text-amber-400" />
//               <span>📚 500+ curriculum tasks & exercises</span>
//             </div>
//             <div className="flex items-center gap-3 text-amber-100">
//               <Star className="h-5 w-5 text-amber-400" />
//               <span>⭐ Track your progress daily</span>
//             </div>
//             <div className="flex items-center gap-3 text-amber-100">
//               <TrendingUp className="h-5 w-5 text-amber-400" />
//               <span>📈 From beginner to fluent speaker</span>
//             </div>
//           </motion.div>

//           {/* Subscription Badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2"
//           >
//             <Crown className="h-4 w-4 text-amber-400" />
//             <span className="text-sm font-medium text-amber-300">
//               Subscribe from ₦5,000/month • First 7 days free
//             </span>
//           </motion.div>

//           {/* Trust message */}
//           <p className="mt-8 text-sm text-amber-200/60">
//             Join 5,000+ Hausa speakers learning Arabic
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE - GLASSMORPHISM LOGIN BOX ONLY */}
//       <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:px-12">
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-md"
//         >
//           {/* GLASSMORPHISM CARD - ONLY THIS BOX HAS THE EFFECT */}
//           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
//             <h2 className="mb-2 text-3xl font-bold text-white">Welcome back</h2>
//             <p className="mb-8 text-amber-200/80">Sign in to continue your Arabic journey</p>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Email */}
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
//                 <div className="relative">
//                   <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
//                       errors.email
//                         ? 'border-red-400 focus:ring-red-300/50'
//                         : 'border-white/20 focus:ring-amber-400/50'
//                     }`}
//                   />
//                 </div>
//                 {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label className="text-sm font-medium text-amber-100">Password</label>
//                   <Link href="/forgot-password" className="text-xs text-amber-300 hover:text-amber-200 transition">
//                     Forgot?
//                   </Link>
//                 </div>
//                 <div className="relative">
//                   <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Your password"
//                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-12 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
//                       errors.password
//                         ? 'border-red-400 focus:ring-red-300/50'
//                         : 'border-white/20 focus:ring-amber-400/50'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300/60 hover:text-amber-200 transition"
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
//               >
//                 {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Login →'}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="my-6 flex items-center gap-3">
//               <div className="h-px flex-1 bg-white/20" />
//               <span className="text-sm text-amber-200/60">New here?</span>
//               <div className="h-px flex-1 bg-white/20" />
//             </div>

//             {/* Signup + Subscription CTA */}
//            <Link href="/register" className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-amber-400/50 bg-white/10 py-3 font-semibold text-amber-300 transition-all hover:bg-amber-400/20 hover:border-amber-400">
//   <Crown className="h-4 w-4" />
//   Start 7-day free trial
// </Link>

//             <p className="mt-6 text-center text-xs text-white/40">
//               By continuing, you agree to our Terms and Privacy Policy
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, Crown, Star, BookOpen, TrendingUp } from 'lucide-react';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // 👈 ADD THIS IMPORT
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();  // 👈 ADD THIS HOOK
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    // Simulate login
    await new Promise((r) => setTimeout(r, 1500));
    
    setLoading(false);
    toast.success('Welcome back! 🌟');
    
    // 👇 REDIRECT TO DASHBOARD
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* ROYAL GOLD GRID BACKGROUND - ENTIRE PAGE */}
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

      {/* LEFT SIDE - MARKETING (Green + Gold) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-16">
        <div className="relative z-20 max-w-lg text-center md:text-left">
          {/* Gold Crown Icon */}
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="rounded-full bg-amber-500/20 p-3">
              <Crown className="h-12 w-12 text-amber-400" />
            </div>
          </div>

          {/* Main Headline - 3 Languages */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-4xl font-bold text-amber-300 md:text-5xl lg:text-6xl"
          >
            Koyi Larabci
            <span className="block text-2xl text-amber-200/80 md:text-3xl" lang="ar">
              تعلم العربية
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 text-lg text-amber-100/90 md:text-xl"
          >
            Learn Arabic from Hausa • من الهوسا إلى العربية
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <div className="flex items-center gap-3 text-amber-100">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <span>📚 500+ curriculum tasks & exercises</span>
            </div>
            <div className="flex items-center gap-3 text-amber-100">
              <Star className="h-5 w-5 text-amber-400" />
              <span>⭐ Track your progress daily</span>
            </div>
            <div className="flex items-center gap-3 text-amber-100">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              <span>📈 From beginner to fluent speaker</span>
            </div>
          </motion.div>

          {/* Subscription Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 backdrop-blur-sm"
          >
            <Crown className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              Subscribe from ₦5,000/month • First 7 days free
            </span>
          </motion.div>

          {/* Trust message */}
          <p className="mt-8 text-sm text-amber-200/60">
            Join 5,000+ Hausa speakers learning Arabic
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - GLASSMORPHISM LOGIN FORM */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
            <h2 className="mb-2 text-3xl font-bold text-white">Welcome back</h2>
            <p className="mb-8 text-amber-200/80">Sign in to continue your Arabic journey</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-300/50'
                        : 'border-white/20 focus:ring-amber-400/50'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-amber-100">Password</label>
                  <Link href="/forgot-password" className="text-xs text-amber-300 hover:text-amber-200 transition">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-12 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
                      errors.password
                        ? 'border-red-400 focus:ring-red-300/50'
                        : 'border-white/20 focus:ring-amber-400/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-300/60 hover:text-amber-200 transition"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
              </div>

              {/* Login Button with Routing */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Login →'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-sm text-amber-200/60">New here?</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            {/* Signup Link */}
            <Link href="/register" className="block">
              <div className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-amber-400/50 bg-white/10 py-3 font-semibold text-amber-300 transition-all hover:bg-amber-400/20 hover:border-amber-400">
                <Crown className="h-4 w-4" />
                Start 7-day free trial
              </div>
            </Link>

            <p className="mt-6 text-center text-xs text-white/40">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}