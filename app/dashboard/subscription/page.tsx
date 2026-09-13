// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { useAuth } from '@/contexts/AuthContext';
// // // import { useProgress } from '@/contexts/ProgressContext';
// // // import {
// // //   Crown,
// // //   CheckCircle,
// // //   XCircle,
// // //   Zap,
// // //   Sparkles,
// // //   Star,
// // //   Shield,
// // //   Award,
// // //   Gift,
// // //   ChevronRight,
// // //   CreditCard,
// // //   Lock,
// // //   ArrowRight,
// // //   Loader2,
// // // } from 'lucide-react';
// // // import Link from 'next/link';
// // // import toast from 'react-hot-toast';

// // // const containerVariants = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: { staggerChildren: 0.1 },
// // //   },
// // // };

// // // const itemVariants = {
// // //   hidden: { y: 20, opacity: 0 },
// // //   visible: {
// // //     y: 0,
// // //     opacity: 1,
// // //     transition: { type: 'spring', stiffness: 100 },
// // //   },
// // // };

// // // // Payment Modal Component
// // // function PaymentModal({
// // //   plan,
// // //   onClose,
// // //   onSuccess,
// // // }: {
// // //   plan: { name: string; price: string; interval: string; priceId?: string };
// // //   onClose: () => void;
// // //   onSuccess: () => void;
// // // }) {
// // //   const [loading, setLoading] = useState(false);
// // //   const [cardNumber, setCardNumber] = useState('');
// // //   const [expiry, setExpiry] = useState('');
// // //   const [cvc, setCvc] = useState('');
// // //   const [name, setName] = useState('');

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);
    
// // //     // Simulate payment processing
// // //     await new Promise((resolve) => setTimeout(resolve, 2000));
    
// // //     setLoading(false);
// // //     toast.success(`Successfully subscribed to ${plan.name}! 🎉`);
// // //     onSuccess();
// // //     onClose();
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
// // //       <motion.div
// // //         initial={{ opacity: 0, scale: 0.9 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         exit={{ opacity: 0, scale: 0.9 }}
// // //         className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
// // //       >
// // //         <div className="p-6">
// // //           <div className="flex items-center justify-between mb-4">
// // //             <div className="flex items-center gap-2">
// // //               <CreditCard className="h-5 w-5 text-amber-400" />
// // //               <h2 className="text-xl font-bold text-white">Complete Payment</h2>
// // //             </div>
// // //             <button
// // //               onClick={onClose}
// // //               className="p-1 rounded-lg text-white/50 hover:text-white transition"
// // //             >
// // //               <XCircle className="h-6 w-6" />
// // //             </button>
// // //           </div>

// // //           <div className="mb-4 p-3 rounded-lg bg-amber-400/10 border border-amber-400/30">
// // //             <p className="text-sm text-amber-300">
// // //               {plan.name} • {plan.price}/{plan.interval}
// // //             </p>
// // //             <p className="text-xs text-amber-300/70 mt-1">7-day free trial • Cancel anytime</p>
// // //           </div>

// // //           <form onSubmit={handleSubmit} className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-amber-300 mb-1">Cardholder Name</label>
// // //               <input
// // //                 type="text"
// // //                 value={name}
// // //                 onChange={(e) => setName(e.target.value)}
// // //                 placeholder="Musa Abdullahi"
// // //                 required
// // //                 className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-amber-300 mb-1">Card Number</label>
// // //               <input
// // //                 type="text"
// // //                 value={cardNumber}
// // //                 onChange={(e) => setCardNumber(e.target.value)}
// // //                 placeholder="4242 4242 4242 4242"
// // //                 required
// // //                 className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50"
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-amber-300 mb-1">Expiry Date</label>
// // //                 <input
// // //                   type="text"
// // //                   value={expiry}
// // //                   onChange={(e) => setExpiry(e.target.value)}
// // //                   placeholder="MM/YY"
// // //                   required
// // //                   className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-amber-300 mb-1">CVC</label>
// // //                 <input
// // //                   type="text"
// // //                   value={cvc}
// // //                   onChange={(e) => setCvc(e.target.value)}
// // //                   placeholder="123"
// // //                   required
// // //                   className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
// // //             >
// // //               {loading ? (
// // //                 <Loader2 className="h-5 w-5 animate-spin mx-auto" />
// // //               ) : (
// // //                 `Pay ${plan.price} • Start Free Trial`
// // //               )}
// // //             </button>

// // //             <p className="text-xs text-white/40 text-center">
// // //               Your payment is secure. 7-day free trial, then {plan.price}/{plan.interval}.
// // //               Cancel anytime.
// // //             </p>
// // //           </form>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }

// // // export default function SubscriptionPage() {
// // //   const { user } = useAuth();
// // //   const { xp } = useProgress();
// // //   const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
// // //   const [showPaymentModal, setShowPaymentModal] = useState(false);
// // //   const [upgrading, setUpgrading] = useState(false);

// // //   // If user already has premium, show manage subscription view
// // //   if (user?.hasPremium) {
// // //     return (
// // //       <div className="max-w-4xl mx-auto">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className="text-center py-12"
// // //         >
// // //           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-400/20 flex items-center justify-center">
// // //             <Crown className="h-10 w-10 text-emerald-400" />
// // //           </div>
// // //           <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">You're a Premium Member! 🎉</h1>
// // //           <p className="text-amber-200/70 mb-8">
// // //             Thank you for supporting ArabiLearn. You have full access to all content.
// // //           </p>
          
// // //           <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
// // //             <h2 className="text-lg font-semibold text-white mb-4">Premium Benefits Active</h2>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
// // //               <div className="flex items-center gap-2 text-amber-300">
// // //                 <CheckCircle className="h-4 w-4 text-emerald-400" />
// // //                 <span>All 5 Units Unlocked</span>
// // //               </div>
// // //               <div className="flex items-center gap-2 text-amber-300">
// // //                 <CheckCircle className="h-4 w-4 text-emerald-400" />
// // //                 <span>Advanced Lessons</span>
// // //               </div>
// // //               <div className="flex items-center gap-2 text-amber-300">
// // //                 <CheckCircle className="h-4 w-4 text-emerald-400" />
// // //                 <span>Premium Support</span>
// // //               </div>
// // //               <div className="flex items-center gap-2 text-amber-300">
// // //                 <CheckCircle className="h-4 w-4 text-emerald-400" />
// // //                 <span>Early Access to New Content</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <Link
// // //             href="/dashboard"
// // //             className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition"
// // //           >
// // //             Continue Learning
// // //             <ArrowRight className="h-4 w-4" />
// // //           </Link>
// // //         </motion.div>
// // //       </div>
// // //     );
// // //   }

// // //   const plans = {
// // //     monthly: {
// // //       name: 'Monthly',
// // //       price: '₦5,000',
// // //       interval: 'month',
// // //       popular: false,
// // //       features: [
// // //         'Full curriculum access',
// // //         'Progress tracking',
// // //         'Exercises & quizzes',
// // //         'Audio pronunciation',
// // //         'Community support',
// // //       ],
// // //       notIncluded: ['Premium support', 'Early access to new content'],
// // //     },
// // //     yearly: {
// // //       name: 'Yearly',
// // //       price: '₦50,000',
// // //       interval: 'year',
// // //       popular: true,
// // //       features: [
// // //         'Full curriculum access',
// // //         'Progress tracking',
// // //         'Exercises & quizzes',
// // //         'Audio pronunciation',
// // //         'Community support',
// // //         'Premium support',
// // //         'Early access to new content',
// // //       ],
// // //       notIncluded: [],
// // //       savings: 'Save 17% • 2 months free',
// // //     },
// // //   };

// // //   const currentPlan = plans[selectedPlan];
// // //   const monthlyEquivalent = selectedPlan === 'yearly' ? '₦4,167' : null;

// // //   const handleUpgrade = () => {
// // //     setUpgrading(true);
// // //     // Simulate upgrade check
// // //     setTimeout(() => {
// // //       setUpgrading(false);
// // //       setShowPaymentModal(true);
// // //     }, 500);
// // //   };

// // //   const handlePaymentSuccess = () => {
// // //     // In production, this would update the user's subscription in the database
// // //     if (user) {
// // //       user.hasPremium = true;
// // //       localStorage.setItem('mock_user', JSON.stringify(user));
// // //     }
// // //     toast.success('Welcome to Premium! 🎉');
// // //     // Refresh the page to update the UI
// // //     window.location.reload();
// // //   };

// // //   return (
// // //     <motion.div
// // //       variants={containerVariants}
// // //       initial="hidden"
// // //       animate="visible"
// // //       className="max-w-6xl mx-auto space-y-8"
// // //     >
// // //       {/* Header */}
// // //       <motion.div variants={itemVariants} className="text-center">
// // //         <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 mb-4">
// // //           <Crown className="h-4 w-4 text-amber-400" />
// // //           <span className="text-sm text-amber-300">Upgrade to Premium</span>
// // //         </div>
// // //         <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
// // //           Unlock Your Full Potential
// // //         </h1>
// // //         <p className="text-amber-200/70 max-w-2xl mx-auto">
// // //           Get access to all units, advanced lessons, and premium features to master Arabic faster
// // //         </p>
// // //       </motion.div>

// // //       {/* Stats Bar - Show user progress */}
// // //       <motion.div variants={itemVariants}>
// // //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4">
// // //           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
// // //             <div className="flex items-center gap-4">
// // //               <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center">
// // //                 <Star className="h-6 w-6 text-amber-400" />
// // //               </div>
// // //               <div>
// // //                 <p className="text-sm text-amber-300">Your Progress</p>
// // //                 <p className="text-xl font-bold text-white">{xp || 0} XP • Level {Math.floor((xp || 0) / 100) + 1}</p>
// // //               </div>
// // //             </div>
// // //             <div className="h-8 w-px bg-white/20 hidden sm:block" />
// // //             <div className="flex items-center gap-4">
// // //               <div className="text-center">
// // //                 <p className="text-sm text-amber-300">Free Lessons</p>
// // //                 <p className="text-xl font-bold text-white">4</p>
// // //               </div>
// // //               <div className="text-center">
// // //                 <p className="text-sm text-amber-300">Premium Locked</p>
// // //                 <p className="text-xl font-bold text-white">10+</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </motion.div>

// // //       {/* Pricing Cards */}
// // //       <motion.div
// // //         variants={itemVariants}
// // //         className="grid grid-cols-1 md:grid-cols-2 gap-6"
// // //       >
// // //         {/* Monthly Plan */}
// // //         <div
// // //           className={`rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
// // //             selectedPlan === 'monthly'
// // //               ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/20'
// // //               : 'bg-white/10 border-white/20 hover:bg-white/15'
// // //           }`}
// // //           onClick={() => setSelectedPlan('monthly')}
// // //         >
// // //           <div className="p-6">
// // //             <div className="flex items-center justify-between mb-4">
// // //               <h3 className="text-xl font-bold text-white">Monthly</h3>
// // //               {selectedPlan === 'monthly' && (
// // //                 <CheckCircle className="h-6 w-6 text-amber-400" />
// // //               )}
// // //             </div>
// // //             <div className="mb-4">
// // //               <span className="text-3xl font-bold text-white">{plans.monthly.price}</span>
// // //               <span className="text-amber-300/70">/{plans.monthly.interval}</span>
// // //             </div>
// // //             <ul className="space-y-2 mb-6">
// // //               {plans.monthly.features.map((feature, idx) => (
// // //                 <li key={idx} className="flex items-center gap-2 text-sm text-amber-200/80">
// // //                   <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
// // //                   {feature}
// // //                 </li>
// // //               ))}
// // //               {plans.monthly.notIncluded.map((feature, idx) => (
// // //                 <li key={idx} className="flex items-center gap-2 text-sm text-white/40">
// // //                   <XCircle className="h-4 w-4 text-white/30 flex-shrink-0" />
// // //                   {feature}
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         </div>

// // //         {/* Yearly Plan (Popular) */}
// // //         <div
// // //           className={`relative rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
// // //             selectedPlan === 'yearly'
// // //               ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400 shadow-lg shadow-amber-400/20'
// // //               : 'bg-white/10 border-white/20 hover:bg-white/15'
// // //           }`}
// // //           onClick={() => setSelectedPlan('yearly')}
// // //         >
// // //           {/* Popular Badge */}
// // //           <div className="absolute -top-3 left-1/2 -translate-x-1/2">
// // //             <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">
// // //               ⭐ BEST VALUE
// // //             </span>
// // //           </div>

// // //           <div className="p-6 pt-8">
// // //             <div className="flex items-center justify-between mb-4">
// // //               <h3 className="text-xl font-bold text-white">Yearly</h3>
// // //               {selectedPlan === 'yearly' && (
// // //                 <CheckCircle className="h-6 w-6 text-amber-400" />
// // //               )}
// // //             </div>
// // //             <div className="mb-2">
// // //               <span className="text-3xl font-bold text-white">{plans.yearly.price}</span>
// // //               <span className="text-amber-300/70">/{plans.yearly.interval}</span>
// // //             </div>
// // //             <p className="text-sm text-emerald-400 mb-4">{plans.yearly.savings}</p>
// // //             <p className="text-xs text-amber-300/50 mb-4">
// // //               {monthlyEquivalent}/month • Save ₦10,000
// // //             </p>
// // //             <ul className="space-y-2 mb-6">
// // //               {plans.yearly.features.map((feature, idx) => (
// // //                 <li key={idx} className="flex items-center gap-2 text-sm text-amber-200/80">
// // //                   <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
// // //                   {feature}
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         </div>
// // //       </motion.div>

// // //       {/* Features Comparison Table */}
// // //       <motion.div variants={itemVariants}>
// // //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
// // //           <div className="p-6 border-b border-white/10">
// // //             <h2 className="text-lg font-semibold text-white flex items-center gap-2">
// // //               <Shield className="h-5 w-5 text-amber-400" />
// // //               Feature Comparison
// // //             </h2>
// // //           </div>
// // //           <div className="divide-y divide-white/10">
// // //             {[
// // //               { feature: 'Foundation Basics (Unit 1)', free: true, premium: true },
// // //               { feature: 'Daily Life (Unit 2)', free: false, premium: true },
// // //               { feature: 'Travel & Places (Unit 3)', free: false, premium: true },
// // //               { feature: 'Advanced Conversations (Unit 4)', free: false, premium: true },
// // //               { feature: 'Cultural Mastery (Unit 5)', free: false, premium: true },
// // //               { feature: 'Progress Tracking', free: true, premium: true },
// // //               { feature: 'Interactive Quizzes', free: true, premium: true },
// // //               { feature: 'Audio Pronunciation', free: true, premium: true },
// // //               { feature: 'Premium Support', free: false, premium: true },
// // //               { feature: 'Early Access to New Content', free: false, premium: true },
// // //             ].map((item, idx) => (
// // //               <div key={idx} className="flex items-center justify-between p-4">
// // //                 <span className="text-sm text-white">{item.feature}</span>
// // //                 <div className="flex gap-6">
// // //                   <div className="w-20 text-center">
// // //                     {item.free ? (
// // //                       <CheckCircle className="h-5 w-5 text-emerald-400 inline" />
// // //                     ) : (
// // //                       <XCircle className="h-5 w-5 text-white/30 inline" />
// // //                     )}
// // //                   </div>
// // //                   <div className="w-20 text-center">
// // //                     <CheckCircle className="h-5 w-5 text-emerald-400 inline" />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //           <div className="p-4 bg-white/5">
// // //             <div className="flex justify-between text-sm">
// // //               <span className="text-amber-300">Free Plan</span>
// // //               <span className="text-amber-300">Premium Plan</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </motion.div>

// // //       {/* FAQ Section */}
// // //       <motion.div variants={itemVariants}>
// // //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// // //           <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// // //             <Gift className="h-5 w-5 text-amber-400" />
// // //             Frequently Asked Questions
// // //           </h2>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <div>
// // //               <p className="font-medium text-white mb-1">What is the free trial?</p>
// // //               <p className="text-sm text-amber-300/70">
// // //                 Get 7 days of full Premium access, completely free. Cancel anytime before the trial ends.
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <p className="font-medium text-white mb-1">Can I cancel anytime?</p>
// // //               <p className="text-sm text-amber-300/70">
// // //                 Yes! You can cancel your subscription at any time. No questions asked.
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <p className="font-medium text-white mb-1">What payment methods?</p>
// // //               <p className="text-sm text-amber-300/70">
// // //                 We accept all major credit cards, debit cards, and mobile money.
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <p className="font-medium text-white mb-1">Is there a refund policy?</p>
// // //               <p className="text-sm text-amber-300/70">
// // //                 If you're not satisfied within 30 days, we'll refund your full payment.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </motion.div>

// // //       {/* CTA Button */}
// // //       <motion.div variants={itemVariants} className="text-center pb-8">
// // //         <button
// // //           onClick={handleUpgrade}
// // //           disabled={upgrading}
// // //           className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl transition-all text-lg disabled:opacity-60 disabled:cursor-not-allowed"
// // //         >
// // //           {upgrading ? (
// // //             <Loader2 className="h-5 w-5 animate-spin" />
// // //           ) : (
// // //             <>
// // //               <Sparkles className="h-5 w-5" />
// // //               Get Started with 7-Day Free Trial
// // //               <ChevronRight className="h-5 w-5" />
// // //             </>
// // //           )}
// // //         </button>
// // //         <p className="text-xs text-white/40 mt-4 flex items-center justify-center gap-1">
// // //           <Lock className="h-3 w-3" />
// // //           Secure payment • Cancel anytime • No commitment
// // //         </p>
// // //       </motion.div>

// // //       {/* Payment Modal */}
// // //       <AnimatePresence>
// // //         {showPaymentModal && (
// // //           <PaymentModal
// // //             plan={{ name: currentPlan.name, price: currentPlan.price, interval: currentPlan.interval }}
// // //             onClose={() => setShowPaymentModal(false)}
// // //             onSuccess={handlePaymentSuccess}
// // //           />
// // //         )}
// // //       </AnimatePresence>
// // //     </motion.div>
// // //   );
// // // }

// // 'use client';

// // import { useState } from 'react';
// // import { motion, AnimatePresence, type Variants, } from 'framer-motion';
// // import { useAuth } from '@/context/AuthContext';
// // import { useProgress } from '@/context/ProgressContext';
// // import {
// //   Crown, CheckCircle, XCircle, Zap, Sparkles, Star, Shield,
// //   Award, Gift, ChevronRight, CreditCard, Lock, ArrowRight, Loader2, Quote,
// // } from 'lucide-react';
// // import Link from 'next/link';
// // import toast from 'react-hot-toast';

// // const containerVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.1,
// //     },
// //   },
// // };

// // const itemVariants: Variants = {
// //   hidden: { y: 20, opacity: 0 },
// //   visible: {
// //     y: 0,
// //     opacity: 1,
// //     transition: {
// //       type: "spring" as const,
// //       stiffness: 100,
// //     },
// //   },
// // };

// // // ─── Testimonials data ────────────────────────────────────
// // const TESTIMONIALS = [
// //   {
// //     name: 'Aisha Bello',
// //     location: 'Kano, Nigeria',
// //     avatar: 'AB',
// //     rating: 5,
// //     days: 42,
// //     quote:
// //       'After just 6 weeks with Premium, I held my first full conversation in Arabic with my husband\'s family. I was nervous but I actually did it. The pronunciation exercises made all the difference.',
// //   },
// //   {
// //     name: 'Yusuf Garba',
// //     location: 'Abuja, Nigeria',
// //     avatar: 'YG',
// //     rating: 5,
// //     days: 90,
// //     quote:
// //       'I tried Duolingo, I tried YouTube videos — nothing stuck. HausaArabia connects Arabic to Hausa in a way that just clicks. Three months in, I\'m reading the Quran with actual understanding.',
// //   },
// //   {
// //     name: 'Fatima Al-Hassan',
// //     location: 'Sokoto, Nigeria',
// //     avatar: 'FA',
// //     rating: 5,
// //     days: 21,
// //     quote:
// //       'I was skeptical about paying but the 7-day trial sold me instantly. The structured path means I always know exactly what to do next. 21 days and I\'m already on Unit 3.',
// //   },
// //   {
// //     name: 'Musa Dankoli',
// //     location: 'Kaduna, Nigeria',
// //     avatar: 'MD',
// //     rating: 5,
// //     days: 60,
// //     quote:
// //       'My Arabic teacher actually noticed my improvement and asked what I changed. The audio exercises train your ear in a way that reading alone never could.',
// //   },
// // ];

// // // ─── Payment Modal ────────────────────────────────────────
// // function PaymentModal({
// //   plan,
// //   onClose,
// //   onSuccess,
// // }: {
// //   plan: { name: string; price: string; interval: string };
// //   onClose: () => void;
// //   onSuccess: () => void;
// // }) {
// //   const [loading, setLoading] = useState(false);
// //   const [cardNumber, setCardNumber] = useState('');
// //   const [expiry, setExpiry] = useState('');
// //   const [cvc, setCvc] = useState('');
// //   const [name, setName] = useState('');

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     await new Promise((r) => setTimeout(r, 2000));
// //     setLoading(false);
// //     toast.success(`Successfully subscribed to ${plan.name}! 🎉`);
// //     onSuccess();
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.9 }}
// //         className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
// //       >
// //         <div className="p-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-2">
// //               <CreditCard className="h-5 w-5 text-amber-400" />
// //               <h2 className="text-xl font-bold text-white">Complete Payment</h2>
// //             </div>
// //             <button onClick={onClose} className="p-1 rounded-lg text-white/50 hover:text-white transition">
// //               <XCircle className="h-6 w-6" />
// //             </button>
// //           </div>

// //           <div className="mb-4 p-3 rounded-lg bg-amber-400/10 border border-amber-400/30">
// //             <p className="text-sm text-amber-300">{plan.name} • {plan.price}/{plan.interval}</p>
// //             <p className="text-xs text-amber-300/70 mt-1">7-day free trial • Cancel anytime</p>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-amber-300 mb-1">Cardholder Name</label>
// //               <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Musa Abdullahi" required
// //                 className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50" />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-amber-300 mb-1">Card Number</label>
// //               <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" required
// //                 className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50" />
// //             </div>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-amber-300 mb-1">Expiry Date</label>
// //                 <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" required
// //                   className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50" />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-amber-300 mb-1">CVC</label>
// //                 <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" required
// //                   className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50" />
// //               </div>
// //             </div>
// //             <button type="submit" disabled={loading}
// //               className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
// //               {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : `Pay ${plan.price} • Start Free Trial`}
// //             </button>
// //             <p className="text-xs text-white/40 text-center">
// //               Your payment is secure. 7-day free trial, then {plan.price}/{plan.interval}. Cancel anytime.
// //             </p>
// //           </form>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // // ─── Main Page ────────────────────────────────────────────
// // export default function SubscriptionPage() {
// //   const { user } = useAuth();
// //   const { xp } = useProgress();
// //   const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
// //   const [showPaymentModal, setShowPaymentModal] = useState(false);
// //   const [upgrading, setUpgrading] = useState(false);

// //   if (user?.hasPremium) {
// //     return (
// //       <div className="max-w-4xl mx-auto">
// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
// //           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-400/20 flex items-center justify-center">
// //             <Crown className="h-10 w-10 text-emerald-400" />
// //           </div>
// //           <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">You're a Premium Member! 🎉</h1>
// //           <p className="text-amber-200/70 mb-8">Thank you for supporting HausaArabia. You have full access to all content.</p>
// //           <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
// //             <h2 className="text-lg font-semibold text-white mb-4">Premium Benefits Active</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
// //               {['All 5 Units Unlocked','Advanced Lessons','Premium Support','Early Access to New Content'].map(b => (
// //                 <div key={b} className="flex items-center gap-2 text-amber-300">
// //                   <CheckCircle className="h-4 w-4 text-emerald-400" /><span>{b}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //           <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition">
// //             Continue Learning <ArrowRight className="h-4 w-4" />
// //           </Link>
// //         </motion.div>
// //       </div>
// //     );
// //   }

// //   const plans = {
// //     monthly: {
// //       name: 'Monthly', price: '₦5,000', interval: 'month', popular: false,
// //       features: ['Full curriculum access','Progress tracking','Exercises & quizzes','Audio pronunciation','Community support'],
// //       notIncluded: ['Premium support','Early access to new content'],
// //     },
// //     yearly: {
// //       name: 'Yearly', price: '₦50,000', interval: 'year', popular: true,
// //       features: ['Full curriculum access','Progress tracking','Exercises & quizzes','Audio pronunciation','Community support','Premium support','Early access to new content'],
// //       notIncluded: [],
// //       savings: 'Save 17% • 2 months free',
// //     },
// //   };

// //   const currentPlan = plans[selectedPlan];
// //   const monthlyEquivalent = selectedPlan === 'yearly' ? '₦4,167' : null;

// //   const handleUpgrade = () => {
// //     setUpgrading(true);
// //     setTimeout(() => { setUpgrading(false); setShowPaymentModal(true); }, 500);
// //   };

// //   const handlePaymentSuccess = () => {
// //     if (user) { user.hasPremium = true; localStorage.setItem('mock_user', JSON.stringify(user)); }
// //     toast.success('Welcome to Premium! 🎉');
// //     window.location.reload();
// //   };

// //   return (
// //     <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-10">

// //       {/* ── Hero Header ── */}
// //       <motion.div variants={itemVariants} className="text-center pt-4">
// //         <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 mb-5">
// //           <Crown className="h-4 w-4 text-amber-400" />
// //           <span className="text-sm text-amber-300 font-medium">Premium Membership</span>
// //         </div>

// //         <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
// //           Become Conversational in Arabic<br />
// //           <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
// //             Faster Than You Think
// //           </span>
// //         </h1>

// //         <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed mb-3">
// //           Most learners give up because they lack structure. Premium gives you a clear path from zero
// //           to confident conversation — built specifically for Hausa speakers, in a language you already understand.
// //         </p>

// //         {/* Social proof strip */}
// //         <div className="flex items-center justify-center gap-6 flex-wrap mt-5">
// //           <div className="flex items-center gap-2 text-sm text-white/50">
// //             <div className="flex -space-x-2">
// //               {['AM','YG','FA','MD','IB'].map(a => (
// //                 <div key={a} className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white/10 flex items-center justify-center text-[9px] font-bold text-black">{a}</div>
// //               ))}
// //             </div>
// //             <span>2,400+ learners enrolled</span>
// //           </div>
// //           <div className="flex items-center gap-1 text-amber-400 text-sm">
// //             {'★★★★★'} <span className="text-white/50 ml-1">4.9 rating</span>
// //           </div>
// //           <div className="text-sm text-white/50">🇳🇬 Made for Nigerians</div>
// //         </div>
// //       </motion.div>

// //       {/* ── User Progress Bar ── */}
// //       <motion.div variants={itemVariants}>
// //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4">
// //           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
// //             <div className="flex items-center gap-4">
// //               <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center">
// //                 <Star className="h-6 w-6 text-amber-400" />
// //               </div>
// //               <div>
// //                 <p className="text-sm text-amber-300">Your Progress</p>
// //                 <p className="text-xl font-bold text-white">{xp || 0} XP • Level {Math.floor((xp || 0) / 100) + 1}</p>
// //               </div>
// //             </div>
// //             <div className="hidden sm:block h-8 w-px bg-white/20" />
// //             <div className="flex items-center gap-6 text-center">
// //               <div><p className="text-sm text-amber-300">Free Lessons</p><p className="text-xl font-bold text-white">4</p></div>
// //               <div><p className="text-sm text-amber-300">Premium Locked</p><p className="text-xl font-bold text-white">10+</p></div>
// //             </div>
// //             <div className="hidden sm:block h-8 w-px bg-white/20" />
// //             <div className="text-center">
// //               <p className="text-xs text-amber-300/70 mb-1">You're this close to conversational</p>
// //               <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
// //                 <div className="h-full w-[22%] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
// //               </div>
// //               <p className="text-xs text-white/40 mt-1">Unit 1 of 5 complete</p>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* ── Pricing Cards ── */}
// //       <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Monthly */}
// //         <div onClick={() => setSelectedPlan('monthly')}
// //           className={`rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${selectedPlan === 'monthly' ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/20' : 'bg-white/10 border-white/20 hover:bg-white/15'}`}>
// //           <div className="p-6">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-xl font-bold text-white">Monthly</h3>
// //               {selectedPlan === 'monthly' && <CheckCircle className="h-6 w-6 text-amber-400" />}
// //             </div>
// //             <div className="mb-4">
// //               <span className="text-3xl font-bold text-white">{plans.monthly.price}</span>
// //               <span className="text-amber-300/70">/{plans.monthly.interval}</span>
// //             </div>
// //             <ul className="space-y-2 mb-6">
// //               {plans.monthly.features.map((f, i) => (
// //                 <li key={i} className="flex items-center gap-2 text-sm text-amber-200/80">
// //                   <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />{f}
// //                 </li>
// //               ))}
// //               {plans.monthly.notIncluded.map((f, i) => (
// //                 <li key={i} className="flex items-center gap-2 text-sm text-white/35">
// //                   <XCircle className="h-4 w-4 text-white/25 flex-shrink-0" />{f}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>

// //         {/* Yearly */}
// //         <div onClick={() => setSelectedPlan('yearly')}
// //           className={`relative rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${selectedPlan === 'yearly' ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400 shadow-lg shadow-amber-400/20' : 'bg-white/10 border-white/20 hover:bg-white/15'}`}>
// //           <div className="absolute -top-3 left-1/2 -translate-x-1/2">
// //             <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">⭐ BEST VALUE</span>
// //           </div>
// //           <div className="p-6 pt-8">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-xl font-bold text-white">Yearly</h3>
// //               {selectedPlan === 'yearly' && <CheckCircle className="h-6 w-6 text-amber-400" />}
// //             </div>
// //             <div className="mb-2">
// //               <span className="text-3xl font-bold text-white">{plans.yearly.price}</span>
// //               <span className="text-amber-300/70">/{plans.yearly.interval}</span>
// //             </div>
// //             <p className="text-sm text-emerald-400 mb-1">{plans.yearly.savings}</p>
// //             <p className="text-xs text-amber-300/50 mb-4">{monthlyEquivalent}/month • Save ₦10,000</p>
// //             <ul className="space-y-2 mb-6">
// //               {plans.yearly.features.map((f, i) => (
// //                 <li key={i} className="flex items-center gap-2 text-sm text-amber-200/80">
// //                   <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />{f}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* ── Testimonials ── */}
// //       <motion.div variants={itemVariants}>
// //         <div className="text-center mb-6">
// //           <h2 className="text-xl font-bold text-white">Real learners. Real results.</h2>
// //           <p className="text-white/50 text-sm mt-1">From complete beginners to confident Arabic speakers.</p>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {TESTIMONIALS.map((t, i) => (
// //             <motion.div key={i} variants={itemVariants}
// //               className="rounded-2xl bg-white/6 border border-white/10 p-5 flex flex-col gap-4 hover:border-amber-400/20 transition-colors">
// //               {/* Stars */}
// //               <div className="flex gap-0.5">
// //                 {Array.from({ length: t.rating }).map((_, s) => (
// //                   <span key={s} className="text-amber-400 text-sm">★</span>
// //                 ))}
// //               </div>
// //               {/* Quote */}
// //               <p className="text-sm text-white/75 leading-relaxed italic flex-1">
// //                 "{t.quote}"
// //               </p>
// //               {/* Footer */}
// //               <div className="flex items-center gap-3 pt-1 border-t border-white/8">
// //                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[11px] font-bold text-black shrink-0">
// //                   {t.avatar}
// //                 </div>
// //                 <div className="flex-1 min-w-0">
// //                   <p className="text-sm font-semibold text-white">{t.name}</p>
// //                   <p className="text-xs text-white/40">{t.location}</p>
// //                 </div>
// //                 <div className="text-right shrink-0">
// //                   <p className="text-xs font-semibold text-emerald-400">{t.days} days in</p>
// //                   <p className="text-[10px] text-white/30">Premium member</p>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </motion.div>

// //       {/* ── Feature Comparison ── */}
// //       <motion.div variants={itemVariants}>
// //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
// //           <div className="p-6 border-b border-white/10">
// //             <h2 className="text-lg font-semibold text-white flex items-center gap-2">
// //               <Shield className="h-5 w-5 text-amber-400" />
// //               What's included
// //             </h2>
// //           </div>
// //           <div className="divide-y divide-white/8">
// //             {[
// //               { feature: 'Foundation Basics (Unit 1)',        free: true,  premium: true },
// //               { feature: 'Daily Life (Unit 2)',               free: false, premium: true },
// //               { feature: 'Travel & Places (Unit 3)',          free: false, premium: true },
// //               { feature: 'Advanced Conversations (Unit 4)',   free: false, premium: true },
// //               { feature: 'Cultural Mastery (Unit 5)',         free: false, premium: true },
// //               { feature: 'Progress Tracking',                 free: true,  premium: true },
// //               { feature: 'Interactive Quizzes',               free: true,  premium: true },
// //               { feature: 'Audio Pronunciation',               free: true,  premium: true },
// //               { feature: 'Premium Support',                   free: false, premium: true },
// //               { feature: 'Early Access to New Content',       free: false, premium: true },
// //             ].map((item, idx) => (
// //               <div key={idx} className="flex items-center justify-between px-6 py-3.5">
// //                 <span className="text-sm text-white/80">{item.feature}</span>
// //                 <div className="flex gap-10">
// //                   <div className="w-10 text-center">
// //                     {item.free
// //                       ? <CheckCircle className="h-4 w-4 text-emerald-400 inline" />
// //                       : <XCircle className="h-4 w-4 text-white/20 inline" />}
// //                   </div>
// //                   <div className="w-10 text-center">
// //                     <CheckCircle className="h-4 w-4 text-emerald-400 inline" />
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="px-6 py-3 bg-white/5 flex justify-between">
// //             <span className="text-xs text-white/40 font-medium">FREE</span>
// //             <span className="text-xs text-amber-400 font-semibold">PREMIUM</span>
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* ── FAQ ── */}
// //       <motion.div variants={itemVariants}>
// //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //           <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
// //             <Gift className="h-5 w-5 text-amber-400" />
// //             Common Questions
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //             {[
// //               { q: 'What is the free trial?', a: 'Get 7 days of full Premium access, completely free. Cancel before the trial ends and you won\'t be charged.' },
// //               { q: 'Can I cancel anytime?', a: 'Yes, cancel from your account settings at any time. No questions asked, no hidden fees.' },
// //               { q: 'What payment methods?', a: 'We accept all major credit and debit cards, plus mobile money options for Nigerian users.' },
// //               { q: 'Is there a refund policy?', a: 'Not satisfied within 30 days? We\'ll refund your full payment — no questions asked.' },
// //             ].map((item, i) => (
// //               <div key={i}>
// //                 <p className="font-semibold text-white text-sm mb-1">{item.q}</p>
// //                 <p className="text-sm text-white/50 leading-relaxed">{item.a}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* ── CTA ── */}
// //       <motion.div variants={itemVariants} className="text-center pb-8">
// //         <p className="text-white/40 text-xs mb-4">
// //           Join 2,400+ Hausa speakers already on the path to Arabic fluency
// //         </p>
// //         <button onClick={handleUpgrade} disabled={upgrading}
// //           className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all text-lg disabled:opacity-60 disabled:cursor-not-allowed">
// //           {upgrading
// //             ? <Loader2 className="h-5 w-5 animate-spin" />
// //             : <><Sparkles className="h-5 w-5" />Start Your 7-Day Free Trial<ChevronRight className="h-5 w-5" /></>}
// //         </button>
// //         <p className="text-xs text-white/30 mt-4 flex items-center justify-center gap-1">
// //           <Lock className="h-3 w-3" />
// //           Secure payment · Cancel anytime · No commitment
// //         </p>
// //       </motion.div>

// //       {/* Payment Modal */}
// //       <AnimatePresence>
// //         {showPaymentModal && (
// //           <PaymentModal
// //             plan={{ name: currentPlan.name, price: currentPlan.price, interval: currentPlan.interval }}
// //             onClose={() => setShowPaymentModal(false)}
// //             onSuccess={handlePaymentSuccess}
// //           />
// //         )}
// //       </AnimatePresence>
// //     </motion.div>
// //   );
// // }




// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { motion, type Variants } from "framer-motion";
// import {
//   ArrowRight,
//   CheckCircle,
//   Crown,
//   Loader2,
//   Lock,
//   Shield,
//   Sparkles,
//   Star,
//   XCircle,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { createClient } from "@/lib/supabase/client";

// type PlanKey = "monthly" | "yearly";

// type SubscriptionView = {
//   planKey: PlanKey;
//   status:
//     | "pending"
//     | "active"
//     | "non_renewing"
//     | "past_due"
//     | "cancelled"
//     | "failed";
//   startedAt: string | null;
// };

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { y: 18, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring" as const,
//       stiffness: 100,
//     },
//   },
// };

// const PLANS = {
//   monthly: {
//     name: "Monthly",
//     price: "₦3,000",
//     interval: "month",
//     features: [
//       "Full curriculum access",
//       "Progress tracking",
//       "Exercises & quizzes",
//       "Audio pronunciation",
//       "Premium lesson access",
//     ],
//   },
//   yearly: {
//     name: "Yearly",
//     price: "₦30,000",
//     interval: "year",
//     savings: "Save ₦6,000 compared with monthly billing",
//     features: [
//       "Full curriculum access",
//       "Progress tracking",
//       "Exercises & quizzes",
//       "Audio pronunciation",
//       "Premium lesson access",
//       "Early access to new learning content",
//     ],
//   },
// } satisfies Record<
//   PlanKey,
//   {
//     name: string;
//     price: string;
//     interval: string;
//     savings?: string;
//     features: string[];
//   }
// >;

// export default function SubscriptionPage() {
//   const supabase = useMemo(() => createClient(), []);

//   const [selectedPlan, setSelectedPlan] =
//     useState<PlanKey>("yearly");
//   const [loading, setLoading] = useState(true);
//   const [checkoutLoading, setCheckoutLoading] =
//     useState<PlanKey | null>(null);
//   const [totalXp, setTotalXp] = useState(0);
//   const [subscription, setSubscription] =
//     useState<SubscriptionView | null>(null);

//   const loadSubscription = useCallback(async () => {
//     setLoading(true);

//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         throw new Error("Please sign in to manage your subscription.");
//       }

//       const [
//         subscriptionResult,
//         dashboardResult,
//       ] = await Promise.all([
//         supabase
//           .from("user_subscriptions")
//           .select("plan_key, status, started_at")
//           .eq("user_id", user.id)
//           .maybeSingle(),
//         supabase.rpc("get_user_dashboard"),
//       ]);

//       if (subscriptionResult.error) {
//         throw subscriptionResult.error;
//       }

//       if (dashboardResult.error) {
//         throw dashboardResult.error;
//       }

//       if (subscriptionResult.data) {
//         setSubscription({
//           planKey: subscriptionResult.data.plan_key as PlanKey,
//           status: subscriptionResult.data
//             .status as SubscriptionView["status"],
//           startedAt: subscriptionResult.data.started_at,
//         });
//       } else {
//         setSubscription(null);
//       }

//       const dashboard = Array.isArray(dashboardResult.data)
//         ? dashboardResult.data[0]
//         : dashboardResult.data;

//       const xp =
//         dashboard &&
//         typeof dashboard === "object" &&
//         "total_xp" in dashboard
//           ? Number(
//               (dashboard as Record<string, unknown>).total_xp ?? 0,
//             )
//           : 0;

//       setTotalXp(Number.isFinite(xp) ? xp : 0);
//     } catch (error) {
//       console.error("Could not load subscription page:", error);
//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "Could not load your subscription.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [supabase]);

//   useEffect(() => {
//     void loadSubscription();
//   }, [loadSubscription]);

//   const startCheckout = async (plan: PlanKey) => {
//     if (checkoutLoading) return;

//     setCheckoutLoading(plan);

//     try {
//       const response = await fetch("/api/paystack/initialize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ plan }),
//       });

//       const body = (await response.json().catch(() => null)) as
//         | { authorizationUrl?: string; message?: string }
//         | null;

//       if (!response.ok || !body?.authorizationUrl) {
//         throw new Error(
//           body?.message || "Could not start Paystack checkout.",
//         );
//       }

//       window.location.assign(body.authorizationUrl);
//     } catch (error) {
//       console.error("Checkout initialization failed:", error);
//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "Could not start checkout.",
//       );
//       setCheckoutLoading(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[55vh] items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
//       </div>
//     );
//   }

//   if (subscription?.status === "active") {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mx-auto max-w-4xl py-10"
//       >
//         <div className="rounded-3xl border border-emerald-400/20 bg-white/10 p-8 text-center backdrop-blur-sm">
//           <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15">
//             <Crown className="h-10 w-10 text-amber-400" />
//           </div>

//           <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
//             Premium active
//           </p>

//           <h1 className="text-3xl font-bold text-white">
//             You&apos;re a Premium Member
//           </h1>

//           <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-amber-100/60">
//             Your {PLANS[subscription.planKey].name.toLowerCase()} Paystack
//             subscription is active. Premium learning content can now use
//             this backend subscription state for access control.
//           </p>

//           <Link
//             href="/dashboard"
//             className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
//           >
//             Continue Learning
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="mx-auto max-w-6xl space-y-8 pb-10"
//     >
//       <motion.div
//         variants={itemVariants}
//         className="pt-3 text-center"
//       >
//         <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2">
//           <Crown className="h-4 w-4 text-amber-400" />
//           <span className="text-sm font-medium text-amber-300">
//             Premium Membership
//           </span>
//         </div>

//         <h1 className="text-3xl font-bold text-white lg:text-4xl">
//           Unlock the Full HausaArabia Curriculum
//         </h1>

//         <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-amber-100/60">
//           Choose a monthly or yearly plan. Checkout is handled securely by
//           Paystack; HausaArabia never collects your card details.
//         </p>
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/15">
//               <Star className="h-6 w-6 text-amber-400" />
//             </div>

//             <div>
//               <p className="text-sm text-amber-300">
//                 Your learning progress
//               </p>
//               <p className="text-xl font-bold text-white">
//                 {totalXp.toLocaleString()} XP
//               </p>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {subscription &&
//         subscription.status !== "active" &&
//         subscription.status !== "cancelled" && (
//           <motion.div
//             variants={itemVariants}
//             className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-4 text-sm text-amber-100/70"
//           >
//             Your latest subscription status is{" "}
//             <span className="font-semibold text-amber-300">
//               {subscription.status.replaceAll("_", " ")}
//             </span>
//             . You can start a new test checkout below if needed.
//           </motion.div>
//         )}

//       <motion.div
//         variants={itemVariants}
//         className="grid grid-cols-1 gap-5 md:grid-cols-2"
//       >
//         {(Object.keys(PLANS) as PlanKey[]).map((key) => {
//           const plan = PLANS[key];
//           const selected = selectedPlan === key;
//           const isCheckout = checkoutLoading === key;

//           return (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setSelectedPlan(key)}
//               className={`relative rounded-2xl border p-6 text-left backdrop-blur-sm transition ${
//                 selected
//                   ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10"
//                   : "border-white/15 bg-white/[0.07] hover:bg-white/10"
//               }`}
//             >
//               {key === "yearly" && (
//                 <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-xs font-bold text-white">
//                   BEST VALUE
//                 </span>
//               )}

//               <div className="flex items-center justify-between gap-3">
//                 <h2 className="text-xl font-bold text-white">
//                   {plan.name}
//                 </h2>

//                 {selected && (
//                   <CheckCircle className="h-6 w-6 text-amber-400" />
//                 )}
//               </div>

//               <div className="mt-4">
//                 <span className="text-3xl font-bold text-white">
//                   {plan.price}
//                 </span>
//                 <span className="text-sm text-amber-200/55">
//                   /{plan.interval}
//                 </span>
//               </div>

//               {plan.savings && (
//                 <p className="mt-2 text-sm font-medium text-emerald-400">
//                   {plan.savings}
//                 </p>
//               )}

//               <ul className="mt-5 space-y-2.5">
//                 {plan.features.map((feature) => (
//                   <li
//                     key={feature}
//                     className="flex items-start gap-2 text-sm text-amber-100/70"
//                   >
//                     <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>

//               <div
//                 className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
//                   selected
//                     ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
//                     : "bg-white/10 text-white/70"
//                 }`}
//                 onClick={(event) => {
//                   event.stopPropagation();
//                   setSelectedPlan(key);
//                   void startCheckout(key);
//                 }}
//               >
//                 {isCheckout ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Opening Paystack…
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="h-4 w-4" />
//                     Subscribe {plan.name}
//                   </>
//                 )}
//               </div>
//             </button>
//           );
//         })}
//       </motion.div>

//       <motion.div
//         variants={itemVariants}
//         className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm"
//       >
//         <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
//           <Shield className="h-5 w-5 text-amber-400" />
//           Free vs Premium
//         </h2>

//         <div className="mt-5 divide-y divide-white/10">
//           {[
//             {
//               feature: "Foundation learning content",
//               free: true,
//               premium: true,
//             },
//             {
//               feature: "Progress tracking",
//               free: true,
//               premium: true,
//             },
//             {
//               feature: "Core quizzes",
//               free: true,
//               premium: true,
//             },
//             {
//               feature: "Premium-designated lessons",
//               free: false,
//               premium: true,
//             },
//             {
//               feature: "Advanced learning content",
//               free: false,
//               premium: true,
//             },
//           ].map((item) => (
//             <div
//               key={item.feature}
//               className="flex items-center justify-between gap-4 py-3.5"
//             >
//               <span className="text-sm text-white/75">
//                 {item.feature}
//               </span>

//               <div className="flex items-center gap-8 sm:gap-12">
//                 <div className="w-14 text-center">
//                   {item.free ? (
//                     <CheckCircle className="inline h-4 w-4 text-emerald-400" />
//                   ) : (
//                     <XCircle className="inline h-4 w-4 text-white/25" />
//                   )}
//                 </div>

//                 <div className="w-16 text-center">
//                   <CheckCircle className="inline h-4 w-4 text-emerald-400" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-2 flex justify-end gap-8 text-[11px] font-semibold uppercase tracking-wide sm:gap-12">
//           <span className="w-14 text-center text-white/40">
//             Free
//           </span>
//           <span className="w-16 text-center text-amber-400">
//             Premium
//           </span>
//         </div>
//       </motion.div>

//       <motion.div
//         variants={itemVariants}
//         className="text-center"
//       >
//         <button
//           type="button"
//           disabled={Boolean(checkoutLoading)}
//           onClick={() => void startCheckout(selectedPlan)}
//           className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-9 py-4 text-lg font-bold text-white transition hover:shadow-xl hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {checkoutLoading ? (
//             <Loader2 className="h-5 w-5 animate-spin" />
//           ) : (
//             <Lock className="h-5 w-5" />
//           )}
//           Continue to Paystack
//         </button>

//         <p className="mt-3 text-xs text-white/35">
//           Secure Paystack checkout. During development we will use Paystack
//           Test Mode, so no real money is charged.
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// }



"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Crown,
  Loader2,
  Lock,
  Shield,
  Sparkles,
  Star,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

type PlanKey = "monthly" | "yearly";

type SubscriptionView = {
  planKey: PlanKey;
  status:
    | "pending"
    | "active"
    | "non_renewing"
    | "past_due"
    | "cancelled"
    | "failed";
  startedAt: string | null;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const PLANS = {
  monthly: {
    name: "Monthly",
    price: "₦3,000",
    interval: "month",
    features: [
      "Full curriculum access",
      "Progress tracking",
      "Exercises & quizzes",
      "Audio pronunciation",
      "Premium lesson access",
    ],
  },
  yearly: {
    name: "Yearly",
    price: "₦30,000",
    interval: "year",
    savings: "Save ₦6,000 compared with monthly billing",
    features: [
      "Full curriculum access",
      "Progress tracking",
      "Exercises & quizzes",
      "Audio pronunciation",
      "Premium lesson access",
      "Early access to new learning content",
    ],
  },
} satisfies Record<
  PlanKey,
  {
    name: string;
    price: string;
    interval: string;
    savings?: string;
    features: string[];
  }
>;

export default function SubscriptionPage() {
  const supabase = useMemo(() => createClient(), []);

  const [selectedPlan, setSelectedPlan] =
    useState<PlanKey>("yearly");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] =
    useState<PlanKey | null>(null);
  const [totalXp, setTotalXp] = useState(0);
  const [subscription, setSubscription] =
    useState<SubscriptionView | null>(null);

  const loadSubscription = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Please sign in to manage your subscription.");
      }

      const [
        subscriptionResult,
        dashboardResult,
      ] = await Promise.all([
        supabase
          .from("user_subscriptions")
          .select("plan_key, status, started_at")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase.rpc("get_user_dashboard"),
      ]);

      if (subscriptionResult.error) {
        throw subscriptionResult.error;
      }

      if (dashboardResult.error) {
        throw dashboardResult.error;
      }

      if (subscriptionResult.data) {
        setSubscription({
          planKey: subscriptionResult.data.plan_key as PlanKey,
          status: subscriptionResult.data
            .status as SubscriptionView["status"],
          startedAt: subscriptionResult.data.started_at,
        });
      } else {
        setSubscription(null);
      }

      const dashboard = Array.isArray(dashboardResult.data)
        ? dashboardResult.data[0]
        : dashboardResult.data;

      const xp =
        dashboard &&
        typeof dashboard === "object" &&
        "total_xp" in dashboard
          ? Number(
              (dashboard as Record<string, unknown>).total_xp ?? 0,
            )
          : 0;

      setTotalXp(Number.isFinite(xp) ? xp : 0);
    } catch (error) {
      console.error("Could not load subscription page:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not load your subscription.",
      );
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    void loadSubscription();
  }, [loadSubscription]);

  const startCheckout = async (plan: PlanKey) => {
    if (checkoutLoading) return;

    setCheckoutLoading(plan);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const body = (await response.json().catch(() => null)) as
        | { authorizationUrl?: string; message?: string }
        | null;

      if (!response.ok || !body?.authorizationUrl) {
        throw new Error(
          body?.message || "Could not start Paystack checkout.",
        );
      }

      window.location.assign(body.authorizationUrl);
    } catch (error) {
      console.error("Checkout initialization failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not start checkout.",
      );
      setCheckoutLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (subscription?.status === "active") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl py-10"
      >
        <div className="rounded-3xl border border-emerald-400/20 bg-white/10 p-8 text-center backdrop-blur-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15">
            <Crown className="h-10 w-10 text-amber-400" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Premium active
          </p>

          <h1 className="text-3xl font-bold text-white">
            You&apos;re a Premium Member
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-amber-100/60">
            Your {PLANS[subscription.planKey].name.toLowerCase()} Paystack
            subscription is active. Premium learning content can now use
            this backend subscription state for access control.
          </p>

          <Link
            href="/dashboard"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            Continue Learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl space-y-8 pb-10"
    >
      <motion.div
        variants={itemVariants}
        className="pt-3 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2">
          <Crown className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-300">
            Premium Membership
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white lg:text-4xl">
          Unlock the Full HausaArabia Curriculum
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-amber-100/60">
          Choose a monthly or yearly plan. Checkout is handled securely by
          Paystack; HausaArabia never collects your card details.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/15">
              <Star className="h-6 w-6 text-amber-400" />
            </div>

            <div>
              <p className="text-sm text-amber-300">
                Your learning progress
              </p>
              <p className="text-xl font-bold text-white">
                {totalXp.toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {subscription &&
        subscription.status !== "cancelled" && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-4 text-sm text-amber-100/70"
          >
            Your latest subscription status is{" "}
            <span className="font-semibold text-amber-300">
              {subscription.status.replaceAll("_", " ")}
            </span>
            . You can start a new test checkout below if needed.
          </motion.div>
        )}

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {(Object.keys(PLANS) as PlanKey[]).map((key) => {
          const plan = PLANS[key];
          const selected = selectedPlan === key;
          const isCheckout = checkoutLoading === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPlan(key)}
              className={`relative rounded-2xl border p-6 text-left backdrop-blur-sm transition ${
                selected
                  ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10"
                  : "border-white/15 bg-white/[0.07] hover:bg-white/10"
              }`}
            >
              {key === "yearly" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-xs font-bold text-white">
                  BEST VALUE
                </span>
              )}

              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-white">
                  {plan.name}
                </h2>

                {selected && (
                  <CheckCircle className="h-6 w-6 text-amber-400" />
                )}
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-amber-200/55">
                  /{plan.interval}
                </span>
              </div>

              {plan.savings && (
                <p className="mt-2 text-sm font-medium text-emerald-400">
                  {plan.savings}
                </p>
              )}

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-amber-100/70"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                  selected
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                    : "bg-white/10 text-white/70"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPlan(key);
                  void startCheckout(key);
                }}
              >
                {isCheckout ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening Paystack…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Subscribe {plan.name}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Shield className="h-5 w-5 text-amber-400" />
          Free vs Premium
        </h2>

        <div className="mt-5 divide-y divide-white/10">
          {[
            {
              feature: "Foundation learning content",
              free: true,
              premium: true,
            },
            {
              feature: "Progress tracking",
              free: true,
              premium: true,
            },
            {
              feature: "Core quizzes",
              free: true,
              premium: true,
            },
            {
              feature: "Premium-designated lessons",
              free: false,
              premium: true,
            },
            {
              feature: "Advanced learning content",
              free: false,
              premium: true,
            },
          ].map((item) => (
            <div
              key={item.feature}
              className="flex items-center justify-between gap-4 py-3.5"
            >
              <span className="text-sm text-white/75">
                {item.feature}
              </span>

              <div className="flex items-center gap-8 sm:gap-12">
                <div className="w-14 text-center">
                  {item.free ? (
                    <CheckCircle className="inline h-4 w-4 text-emerald-400" />
                  ) : (
                    <XCircle className="inline h-4 w-4 text-white/25" />
                  )}
                </div>

                <div className="w-16 text-center">
                  <CheckCircle className="inline h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-end gap-8 text-[11px] font-semibold uppercase tracking-wide sm:gap-12">
          <span className="w-14 text-center text-white/40">
            Free
          </span>
          <span className="w-16 text-center text-amber-400">
            Premium
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        <button
          type="button"
          disabled={Boolean(checkoutLoading)}
          onClick={() => void startCheckout(selectedPlan)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-9 py-4 text-lg font-bold text-white transition hover:shadow-xl hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {checkoutLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Lock className="h-5 w-5" />
          )}
          Continue to Paystack
        </button>

        <p className="mt-3 text-xs text-white/35">
          Secure Paystack checkout. During development we will use Paystack
          Test Mode, so no real money is charged.
        </p>
      </motion.div>
    </motion.div>
  );
}
