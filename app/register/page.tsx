// 'use client';

// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Mail, Lock, Loader2, Crown, User, Check, Zap } from 'lucide-react';
// import { useState, FormEvent } from 'react';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
  
//   const [errors, setErrors] = useState<{
//     name?: string;
//     email?: string;
//     password?: string;
//   }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!formData.name) newErrors.name = 'Full name is required';
//     else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     // Simulate registration
//     await new Promise((r) => setTimeout(r, 1500));
//     setLoading(false);
//     toast.success(`Welcome ${formData.name}! Your 7-day free trial has started. 🎉`);
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      
//       {/* SOLID GREEN BACKGROUND + GOLD GRID */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundColor: '#064E3B',
//           backgroundImage: `
//             linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
//           `,
//           backgroundSize: '44px 44px',
//         }}
//       />

//       {/* Decorative gold glow */}
//       <div className="absolute inset-0 z-0 opacity-20">
//         <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl" />
//         <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 blur-3xl" />
//         <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-amber-500 blur-3xl" />
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="relative z-10 w-full max-w-5xl">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="grid md:grid-cols-2 gap-6"
//         >
          
//           {/* LEFT SIDE - REGISTRATION FORM (Glassmorphism) */}
//           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
//             <div className="mb-6 flex items-center gap-2">
//               <Crown className="h-6 w-6 text-amber-400" />
//               <h2 className="text-2xl font-bold text-white">Start Your Journey</h2>
//             </div>
            
//             <p className="mb-6 text-amber-200/80 text-sm">
//               Create your account and get 7 days free. Cancel anytime.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Full Name</label>
//                 <div className="relative">
//                   <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Musa Abdullahi"
//                     className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
//                       errors.name
//                         ? 'border-red-400 focus:ring-red-300/50'
//                         : 'border-white/20 focus:ring-amber-400/50'
//                     }`}
//                   />
//                 </div>
//                 {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
//                 <div className="relative">
//                   <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     placeholder="musa@example.com"
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
//                 <label className="mb-1.5 block text-sm font-medium text-amber-100">Password</label>
//                 <div className="relative">
//                   <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     placeholder="At least 6 characters"
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

//               {/* Register Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg mt-6"
//               >
//                 {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Crown className="h-4 w-4" /> Start 7-Day Free Trial →</>}
//               </button>
//             </form>

//             {/* Login Link */}
//             <p className="mt-6 text-center text-sm text-white/50">
//               Already have an account?{' '}
//               <Link href="/" className="text-amber-300 hover:text-amber-200 transition font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </div>

//           {/* RIGHT SIDE - PRICING PLANS (Glassmorphism) */}
//           <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
//             <div className="mb-6 flex items-center gap-2">
//               <Zap className="h-6 w-6 text-amber-400" />
//               <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
//             </div>
            
//             <p className="mb-6 text-amber-200/80 text-sm">
//               7-day free trial on both plans. No commitment.
//             </p>

//             <div className="space-y-4">
//               {/* Monthly Plan */}
//               <div
//                 onClick={() => setSelectedPlan('monthly')}
//                 className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
//                   selectedPlan === 'monthly'
//                     ? 'border-amber-400 bg-amber-400/10'
//                     : 'border-white/20 hover:border-amber-400/50'
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="text-xl font-bold text-white">Monthly</h3>
//                     <p className="text-amber-200/70 text-sm mt-1">Flexible • Cancel anytime</p>
//                   </div>
//                   {selectedPlan === 'monthly' && (
//                     <div className="rounded-full bg-amber-400 p-1">
//                       <Check className="h-4 w-4 text-green-900" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-3xl font-bold text-white">₦5,000</span>
//                   <span className="text-amber-200/60">/month</span>
//                 </div>
//                 <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
//                   <li className="flex items-center gap-2">✓ Full curriculum access</li>
//                   <li className="flex items-center gap-2">✓ Progress tracking</li>
//                   <li className="flex items-center gap-2">✓ Exercises & quizzes</li>
//                 </ul>
//               </div>

//               {/* Yearly Plan (Popular) */}
//               <div
//                 onClick={() => setSelectedPlan('yearly')}
//                 className={`cursor-pointer rounded-xl border-2 p-5 transition-all relative ${
//                   selectedPlan === 'yearly'
//                     ? 'border-amber-400 bg-amber-400/10'
//                     : 'border-white/20 hover:border-amber-400/50'
//                 }`}
//               >
//                 {/* Popular Badge */}
//                 <div className="absolute -top-3 right-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-green-900">
//                   ⭐ BEST VALUE
//                 </div>
                
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="text-xl font-bold text-white">Yearly</h3>
//                     <p className="text-amber-200/70 text-sm mt-1">Save 17% • 2 months free</p>
//                   </div>
//                   {selectedPlan === 'yearly' && (
//                     <div className="rounded-full bg-amber-400 p-1">
//                       <Check className="h-4 w-4 text-green-900" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-3xl font-bold text-white">₦50,000</span>
//                   <span className="text-amber-200/60">/year</span>
//                   <div className="text-sm text-amber-300 mt-1">₦4,167/month • Save ₦10,000</div>
//                 </div>
//                 <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
//                   <li className="flex items-center gap-2">✓ Everything in Monthly</li>
//                   <li className="flex items-center gap-2">✓ Premium support</li>
//                   <li className="flex items-center gap-2">✓ Early access to new content</li>
//                 </ul>
//               </div>
//             </div>

//             {/* Trust Badge */}
//             <div className="mt-6 text-center">
//               <p className="text-xs text-white/40 flex items-center justify-center gap-2">
//                 <Crown className="h-3 w-3" />
//                 Join 5,000+ happy learners
//                 <Crown className="h-3 w-3" />
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Terms & Privacy */}
//         <p className="mt-8 text-center text-xs text-white/30">
//           By creating an account, you agree to our Terms of Service and Privacy Policy.
//           Your 7-day free trial starts immediately. No charge until trial ends.
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, Crown, User, Check, Zap, Sparkles, Rocket } from 'lucide-react';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success(`Welcome ${formData.name}! Your 7-day free trial has started. 🎉`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      
      {/* SOLID GREEN BACKGROUND + GOLD GRID */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#064E3B',
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Decorative gold glow */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-yellow-500 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-amber-500 blur-3xl" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-5xl">
        
        {/* HEADER SECTION - INSPIRING MESSAGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 backdrop-blur-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-300 tracking-wide">Begin Your Journey</span>
          </div>
          
          {/* Main Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Start Speaking Arabic
            <span className="block text-amber-400 text-3xl md:text-4xl mt-2">تحدث العربية بطلاقة</span>
          </h1>
          
          {/* Inspiring Sub-message */}
          <p className="text-amber-100/80 text-base md:text-lg max-w-2xl mx-auto">
            Join thousands of Hausa speakers mastering Arabic. 
            <span className="block text-amber-300 text-sm mt-2">7-day free trial • Cancel anytime • No risk</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          
          {/* LEFT SIDE - REGISTRATION FORM (Glassmorphism) */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
            <div className="mb-6 flex items-center gap-2">
              <Rocket className="h-6 w-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Create Account</h2>
            </div>
            
            <p className="mb-5 text-amber-200/70 text-sm">
              Fill in your details to begin your Arabic learning journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-amber-100">Full Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Musa Abdullahi"
                    className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-300/50'
                        : 'border-white/20 focus:ring-amber-400/50'
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-amber-100">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="musa@example.com"
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
                <label className="mb-1.5 block text-sm font-medium text-amber-100">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 6 characters"
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

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg mt-6"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Crown className="h-4 w-4" /> Start 7-Day Free Trial →</>}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-white/50">
              Already have an account?{' '}
              <Link href="/" className="text-amber-300 hover:text-amber-200 transition font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE - PRICING PLANS (Glassmorphism) */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
            <div className="mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Choose Your Plan</h2>
            </div>
            
            <p className="mb-5 text-amber-200/70 text-sm">
              Both plans include 7-day free trial
            </p>

            <div className="space-y-4">
              {/* Monthly Plan */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                  selectedPlan === 'monthly'
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-white/20 hover:border-amber-400/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Monthly</h3>
                    <p className="text-amber-200/70 text-sm mt-1">Flexible • Cancel anytime</p>
                  </div>
                  {selectedPlan === 'monthly' && (
                    <div className="rounded-full bg-amber-400 p-1">
                      <Check className="h-4 w-4 text-green-900" />
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-white">₦5,000</span>
                  <span className="text-amber-200/60">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
                  <li className="flex items-center gap-2">✓ Full curriculum access</li>
                  <li className="flex items-center gap-2">✓ Progress tracking</li>
                  <li className="flex items-center gap-2">✓ Exercises & quizzes</li>
                </ul>
              </div>

              {/* Yearly Plan (Popular) */}
              <div
                onClick={() => setSelectedPlan('yearly')}
                className={`cursor-pointer rounded-xl border-2 p-5 transition-all relative ${
                  selectedPlan === 'yearly'
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-white/20 hover:border-amber-400/50'
                }`}
              >
                {/* Popular Badge */}
                <div className="absolute -top-3 right-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-green-900">
                  ⭐ BEST VALUE
                </div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Yearly</h3>
                    <p className="text-amber-200/70 text-sm mt-1">Save 17% • 2 months free</p>
                  </div>
                  {selectedPlan === 'yearly' && (
                    <div className="rounded-full bg-amber-400 p-1">
                      <Check className="h-4 w-5 text-green-900" />
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-white">₦50,000</span>
                  <span className="text-amber-200/60">/year</span>
                  <div className="text-sm text-amber-300 mt-1">₦4,167/month • Save ₦10,000</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
                  <li className="flex items-center gap-2">✓ Everything in Monthly</li>
                  <li className="flex items-center gap-2">✓ Premium support</li>
                  <li className="flex items-center gap-2">✓ Early access to new content</li>
                </ul>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <p className="text-xs text-white/40 flex items-center justify-center gap-2">
                <Crown className="h-3 w-3" />
                Join 5,000+ happy learners
                <Crown className="h-3 w-3" />
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terms & Privacy */}
        <p className="mt-8 text-center text-xs text-white/30">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
          Your 7-day free trial starts immediately. No charge until trial ends.
        </p>
      </div>
    </div>
  );
}