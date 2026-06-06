'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Shield, CheckCircle, Sparkles } from 'lucide-react';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    // Simulate password reset request
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Reset link sent! Check your email. 📧');
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
      <div className="relative z-10 w-full max-w-md">
        
        {/* HEADER SECTION - INSPIRING MESSAGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 backdrop-blur-sm mb-4">
            <Shield className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-300 tracking-wide">Don't Worry</span>
          </div>
          
          {/* Main Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Forgot Password?
            <span className="block text-amber-400 text-xl md:text-2xl mt-2">نسيت كلمة السر؟</span>
          </h1>
          
          {/* Inspiring Sub-message */}
          <p className="text-amber-100/80 text-sm md:text-base max-w-md mx-auto">
            No worries! Enter your email and we'll send you a reset link.
            <span className="block text-amber-300 text-xs mt-2">We'll help you get back to learning Arabic</span>
          </p>
        </motion.div>

        {/* GLASSMORPHISM FORM BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
            
            {!submitted ? (
              <>
                <div className="mb-6 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-amber-400" />
                  <h2 className="text-xl font-bold text-white">Reset Password</h2>
                </div>
                
                <p className="mb-6 text-amber-200/70 text-sm">
                  We'll send a password reset link to your email address
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-amber-100">Email Address</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300/60" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="musa@example.com"
                        className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/20 focus:ring-2 ${
                          error
                            ? 'border-red-400 focus:ring-red-300/50'
                            : 'border-white/20 focus:ring-amber-400/50'
                        }`}
                      />
                    </div>
                    {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send Reset Link →</>}
                  </button>
                </form>

                {/* Back to Login Link */}
                <div className="mt-6 text-center">
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 transition font-medium"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </>
            ) : (
              /* SUCCESS STATE AFTER SUBMISSION */
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-emerald-500/20 p-3">
                    <CheckCircle className="h-12 w-12 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check Your Email!</h3>
                <p className="text-amber-200/80 text-sm mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="text-amber-300 font-medium text-sm mb-6 break-all">{email}</p>
                <p className="text-white/50 text-xs mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full rounded-lg border border-amber-400/50 bg-white/10 py-2.5 text-sm font-medium text-amber-300 transition-all hover:bg-amber-400/20"
                  >
                    Try another email
                  </button>
                  <Link 
                    href="/" 
                    className="inline-flex items-center justify-center gap-2 text-sm text-white/50 hover:text-amber-300 transition w-full"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </div>
            )}

            {/* Trust Badge */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-white/30 flex items-center justify-center gap-2">
                <Sparkles className="h-3 w-3" />
                Your account is safe with us
                <Sparkles className="h-3 w-3" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}