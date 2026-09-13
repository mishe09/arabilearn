// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion, type Variants } from "framer-motion";
// // // import { useAuth } from '@/context/AuthContext';
// // // import { useProgress } from '@/context/ProgressContext';
// // // import { ALL_LESSONS, UNITS } from '@/data/lessons';
// // // import {
// // //   Trophy,
// // //   Flame,
// // //   Star,
// // //   Calendar,
// // //   TrendingUp,
// // //   Award,
// // //   Target,
// // //   Clock,
// // //   CheckCircle2,
// // //   Lock,
// // //   Crown,
// // //   ChevronRight,
// // //   Sparkles,
// // // } from 'lucide-react';
// // // import Link from 'next/link';

// // // const containerVariants: Variants = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: {
// // //       staggerChildren: 0.1,
// // //     },
// // //   },
// // // };

// // // const itemVariants: Variants = {
// // //   hidden: {
// // //     y: 20,
// // //     opacity: 0,
// // //   },
// // //   visible: {
// // //     y: 0,
// // //     opacity: 1,
// // //     transition: {
// // //       type: "spring" as const,
// // //       stiffness: 100,
// // //     },
// // //   },
// // // };

// // // export default function ProgressPage() {
// // //   const { user } = useAuth();
// // //   const { xp, streak, completedLessons } = useProgress();
// // //   const [streakHistory, setStreakHistory] = useState<boolean[]>([]);
// // //   const [dailyXpHistory, setDailyXpHistory] = useState<number[]>([]);

// // //   // Calculate statistics
// // //   const totalLessons = Object.keys(ALL_LESSONS).length;
// // //   const completedCount = completedLessons.length;
// // //   const completionPercentage = (completedCount / totalLessons) * 100;
  
// // //   // Current level calculation (100 XP per level)
// // //   const currentLevel = Math.floor((xp || 0) / 100) + 1;
// // //   const currentLevelXp = (xp || 0) % 100;
// // //   const xpToNextLevel = 100 - currentLevelXp;
  
// // //   // Premium lessons info
// // //   const premiumLessons = Object.values(ALL_LESSONS).filter(l => l.isPremium);
// // //   const completedPremium = premiumLessons.filter(l => completedLessons.includes(l.id)).length;
  
// // //   // Generate mock streak history (last 30 days)
// // //   useEffect(() => {
// // //     const mockStreakHistory = [];
// // //     const mockXpHistory = [];
// // //     const today = new Date();
    
// // //     for (let i = 29; i >= 0; i--) {
// // //       const date = new Date(today);
// // //       date.setDate(today.getDate() - i);
      
// // //       // Simulate activity (more active in last 5 days)
// // //       const isActive = i < (streak || 5) ? true : Math.random() > 0.7;
// // //       mockStreakHistory.push(isActive);
      
// // //       // Simulate XP earned per day
// // //       const xpEarned = isActive ? Math.floor(Math.random() * 50) + 10 : 0;
// // //       mockXpHistory.push(xpEarned);
// // //     }
    
// // //     setStreakHistory(mockStreakHistory);
// // //     setDailyXpHistory(mockXpHistory);
// // //   }, [streak]);

// // //   // XP milestones
// // //   const milestones = [
// // //     { xp: 100, title: 'Bronze Learner', achieved: (xp || 0) >= 100, icon: '🥉' },
// // //     { xp: 500, title: 'Silver Scholar', achieved: (xp || 0) >= 500, icon: '🥈' },
// // //     { xp: 1000, title: 'Gold Speaker', achieved: (xp || 0) >= 1000, icon: '🥇' },
// // //     { xp: 2000, title: 'Platinum Pro', achieved: (xp || 0) >= 2000, icon: '💎' },
// // //     { xp: 5000, title: 'Legendary Linguist', achieved: (xp || 0) >= 5000, icon: '👑' },
// // //   ];

// // //   const nextMilestone = milestones.find(m => !m.achieved);
// // //   const xpToNextMilestone = nextMilestone ? nextMilestone.xp - (xp || 0) : 0;

// // //   return (
// // //     <motion.div
// // //       variants={containerVariants}
// // //       initial="hidden"
// // //       animate="visible"
// // //       className="space-y-8"
// // //     >
// // //       {/* Header */}
// // //       <motion.div variants={itemVariants}>
// // //         <h1 className="text-2xl lg:text-3xl font-bold text-white">Your Progress</h1>
// // //         <p className="text-amber-200/70 mt-1">
// // //           Track your learning journey and celebrate your achievements
// // //         </p>
// // //       </motion.div>

// // //       {/* Stats Overview */}
// // //       <motion.div
// // //         variants={itemVariants}
// // //         className="grid grid-cols-2 lg:grid-cols-4 gap-4"
// // //       >
// // //         {[
// // //           { label: 'Total XP', value: xp || 0, icon: Star, color: 'text-amber-400', suffix: '' },
// // //           { label: 'Day Streak', value: streak || 0, icon: Flame, color: 'text-orange-400', suffix: ' days' },
// // //           { label: 'Level', value: currentLevel, icon: Trophy, color: 'text-emerald-400', suffix: '' },
// // //           { label: 'Completed', value: `${completedCount}/${totalLessons}`, icon: CheckCircle2, color: 'text-emerald-400', suffix: ' lessons' },
// // //         ].map((stat) => {
// // //           const Icon = stat.icon;
// // //           return (
// // //             <div
// // //               key={stat.label}
// // //               className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5"
// // //             >
// // //               <div className="flex items-center gap-2 mb-2">
// // //                 <Icon className={`h-5 w-5 ${stat.color}`} />
// // //                 <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wide">
// // //                   {stat.label}
// // //                 </span>
// // //               </div>
// // //               <p className="text-2xl lg:text-3xl font-bold text-white">
// // //                 {stat.value}
// // //                 {stat.suffix && <span className="text-sm ml-1 text-amber-300">{stat.suffix}</span>}
// // //               </p>
// // //             </div>
// // //           );
// // //         })}
// // //       </motion.div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         {/* Left Column - Progress Details */}
// // //         <div className="lg:col-span-2 space-y-6">
// // //           {/* XP Progress Bar */}
// // //           <motion.div variants={itemVariants}>
// // //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <div className="flex items-center gap-2">
// // //                   <Trophy className="h-5 w-5 text-amber-400" />
// // //                   <h2 className="text-lg font-semibold text-white">Level {currentLevel}</h2>
// // //                 </div>
// // //                 <span className="text-sm text-amber-300">{currentLevelXp}/100 XP</span>
// // //               </div>
// // //               <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-3">
// // //                 <motion.div
// // //                   className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
// // //                   initial={{ width: 0 }}
// // //                   animate={{ width: `${currentLevelXp}%` }}
// // //                   transition={{ duration: 1 }}
// // //                 />
// // //               </div>
// // //               <p className="text-sm text-amber-200/60">
// // //                 {xpToNextLevel} XP until Level {currentLevel + 1}
// // //               </p>
// // //             </div>
// // //           </motion.div>

// // //           {/* XP Milestones */}
// // //           <motion.div variants={itemVariants}>
// // //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// // //               <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// // //                 <Award className="h-5 w-5 text-amber-400" />
// // //                 XP Milestones
// // //               </h2>
// // //               <div className="space-y-3">
// // //                 {milestones.map((milestone) => (
// // //                   <div
// // //                     key={milestone.xp}
// // //                     className={`flex items-center gap-3 p-3 rounded-xl transition ${
// // //                       milestone.achieved
// // //                         ? 'bg-emerald-500/20 border border-emerald-400/30'
// // //                         : 'bg-white/5 border border-white/10 opacity-60'
// // //                     }`}
// // //                   >
// // //                     <div className="text-2xl">{milestone.icon}</div>
// // //                     <div className="flex-1">
// // //                       <p className={`font-medium ${milestone.achieved ? 'text-white' : 'text-white/60'}`}>
// // //                         {milestone.title}
// // //                       </p>
// // //                       <p className="text-xs text-amber-300/50">{milestone.xp} XP required</p>
// // //                     </div>
// // //                     {milestone.achieved ? (
// // //                       <CheckCircle2 className="h-5 w-5 text-emerald-400" />
// // //                     ) : (
// // //                       <Lock className="h-5 w-5 text-white/30" />
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //               {nextMilestone && !nextMilestone.achieved && (
// // //                 <p className="text-sm text-amber-300/60 mt-4 text-center">
// // //                   {xpToNextMilestone} XP until {nextMilestone.title}
// // //                 </p>
// // //               )}
// // //             </div>
// // //           </motion.div>

// // //           {/* Unit Progress */}
// // //           <motion.div variants={itemVariants}>
// // //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// // //               <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// // //                 <Target className="h-5 w-5 text-amber-400" />
// // //                 Unit Progress
// // //               </h2>
// // //               <div className="space-y-4">
// // //                 {UNITS.filter(unit => unit.lessons.length > 0).map((unit) => {
// // //                   const unitLessons = unit.lessons;
// // //                   const completedInUnit = unitLessons.filter(l => completedLessons.includes(l.id)).length;
// // //                   const unitProgress = (completedInUnit / unitLessons.length) * 100;
                  
// // //                   return (
// // //                     <div key={unit.id}>
// // //                       <div className="flex items-center justify-between mb-2">
// // //                         <div className="flex items-center gap-2">
// // //                           <span className="text-sm font-medium text-white">{unit.title}</span>
// // //                           {unit.isPremium && !user?.hasPremium && (
// // //                             <Crown className="h-3 w-3 text-amber-400" />
// // //                           )}
// // //                         </div>
// // //                         <span className="text-xs text-amber-300/70">
// // //                           {completedInUnit}/{unitLessons.length} lessons
// // //                         </span>
// // //                       </div>
// // //                       <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
// // //                         <motion.div
// // //                           className={`h-full rounded-full ${
// // //                             unit.isPremium && !user?.hasPremium
// // //                               ? 'bg-amber-500/50'
// // //                               : 'bg-gradient-to-r from-emerald-400 to-amber-400'
// // //                           }`}
// // //                           initial={{ width: 0 }}
// // //                           animate={{ width: `${unitProgress}%` }}
// // //                           transition={{ duration: 0.8 }}
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         </div>

// // //         {/* Right Column - Streak & Activity */}
// // //         <div className="space-y-6">
// // //           {/* Streak Calendar */}
// // //           <motion.div variants={itemVariants}>
// // //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <div className="flex items-center gap-2">
// // //                   <Calendar className="h-5 w-5 text-amber-400" />
// // //                   <h2 className="text-lg font-semibold text-white">Streak</h2>
// // //                 </div>
// // //                 <div className="flex items-center gap-1">
// // //                   <Flame className="h-4 w-4 text-orange-400" />
// // //                   <span className="text-xl font-bold text-white">{streak || 0}</span>
// // //                   <span className="text-xs text-amber-300">days</span>
// // //                 </div>
// // //               </div>
// // //               <div className="grid grid-cols-7 gap-1 mb-3">
// // //                 {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
// // //                   <div key={idx} className="text-center text-xs text-amber-300/50 py-1">
// // //                     {day}
// // //                   </div>
// // //                 ))}
// // //                 {streakHistory.slice(-28).map((active, idx) => (
// // //                   <div
// // //                     key={idx}
// // //                     className={`aspect-square rounded-md transition-all ${
// // //                       active
// // //                         ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
// // //                         : 'bg-white/10'
// // //                     }`}
// // //                     title={active ? 'Active day' : 'No activity'}
// // //                   />
// // //                 ))}
// // //               </div>
// // //               <p className="text-xs text-amber-300/50 text-center">
// // //                 Last 28 days • Keep your streak alive!
// // //               </p>
// // //             </div>
// // //           </motion.div>

// // //           {/* Weekly XP Chart */}
// // //           <motion.div variants={itemVariants}>
// // //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// // //               <div className="flex items-center gap-2 mb-4">
// // //                 <TrendingUp className="h-5 w-5 text-amber-400" />
// // //                 <h2 className="text-lg font-semibold text-white">Weekly XP</h2>
// // //               </div>
// // //               <div className="flex items-end justify-around h-32 gap-2">
// // //                 {dailyXpHistory.slice(-7).map((xpEarned, idx) => {
// // //                   const height = Math.min((xpEarned / 100) * 100, 100);
// // //                   return (
// // //                     <div key={idx} className="flex-1 flex flex-col items-center gap-1">
// // //                       <motion.div
// // //                         className="w-full bg-gradient-to-t from-amber-400 to-orange-500 rounded-t-lg"
// // //                         initial={{ height: 0 }}
// // //                         animate={{ height: `${height}%` }}
// // //                         transition={{ duration: 0.5, delay: idx * 0.1 }}
// // //                         style={{ height: `${height}%`, minHeight: xpEarned > 0 ? 4 : 0 }}
// // //                       />
// // //                       <span className="text-[10px] text-amber-300/50">
// // //                         {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
// // //                       </span>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //               <p className="text-xs text-amber-300/50 text-center mt-4">
// // //                 XP earned this week
// // //               </p>
// // //             </div>
// // //           </motion.div>

// // //           {/* Premium Progress */}
// // //           {!user?.hasPremium && (
// // //             <motion.div variants={itemVariants}>
// // //               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6">
// // //                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
// // //                 <div className="relative z-10">
// // //                   <div className="flex items-center gap-2 mb-3">
// // //                     <Crown className="h-5 w-5 text-white" />
// // //                     <span className="text-sm font-semibold text-white/90">Premium Content</span>
// // //                   </div>
// // //                   <p className="text-white font-bold mb-1">
// // //                     {completedPremium}/{premiumLessons.length} Premium Lessons Completed
// // //                   </p>
// // //                   <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-3">
// // //                     <div
// // //                       className="h-full bg-white rounded-full"
// // //                       style={{ width: `${(completedPremium / premiumLessons.length) * 100}%` }}
// // //                     />
// // //                   </div>
// // //                   <p className="text-orange-100 text-sm mb-4">
// // //                     Upgrade to unlock {premiumLessons.length - completedPremium} more lessons
// // //                   </p>
// // //                   <Link
// // //                     href="/dashboard/subscription"
// // //                     className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition"
// // //                   >
// // //                     <Sparkles className="h-4 w-4" />
// // //                     Upgrade to Premium
// // //                     <ChevronRight className="h-4 w-4" />
// // //                   </Link>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           )}

// // //           {/* Next Achievement */}
// // //           <motion.div variants={itemVariants}>
// // //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
// // //               <Clock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
// // //               <h3 className="text-white font-semibold mb-1">Next Achievement</h3>
// // //               <p className="text-sm text-amber-300/70">
// // //                 {nextMilestone ? nextMilestone.title : 'Max Level Reached!'}
// // //               </p>
// // //               <p className="text-xs text-amber-300/50 mt-2">
// // //                 {nextMilestone && !nextMilestone.achieved
// // //                   ? `${xpToNextMilestone} XP remaining`
// // //                   : 'Congratulations! You are a master!'}
// // //               </p>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       </div>

// // //       {/* Completion Badge */}
// // //       <motion.div variants={itemVariants} className="text-center">
// // //         <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 border border-amber-400/30">
// // //           <Sparkles className="h-4 w-4 text-amber-400" />
// // //           <span className="text-sm text-amber-300">
// // //             {completionPercentage.toFixed(0)}% Complete • Keep going! You're doing great
// // //           </span>
// // //           <Sparkles className="h-4 w-4 text-amber-400" />
// // //         </div>
// // //       </motion.div>
// // //     </motion.div>
// // //   );
// // // }


// // "use client";

// // import { useCallback, useEffect, useMemo, useState } from "react";
// // import { motion, type Variants } from "framer-motion";
// // import {
// //   Award,
// //   Calendar,
// //   CheckCircle2,
// //   Clock,
// //   Flame,
// //   Loader2,
// //   Sparkles,
// //   Star,
// //   Target,
// //   Trophy,
// //   TrendingUp,
// //   XCircle,
// // } from "lucide-react";

// // import { createClient } from "@/lib/supabase/client";

// // type JsonRecord = Record<string, unknown>;

// // type UnitRow = {
// //   id: string;
// //   title: string;
// //   unit_order: number;
// //   lessons: {
// //     id: string;
// //     title: string;
// //     lesson_order: number;
// //     is_published: boolean;
// //   }[];
// // };

// // type UnitProgress = {
// //   id: string;
// //   title: string;
// //   lessonCount: number;
// //   completedCount: number;
// //   percentage: number;
// // };

// // type RewardView = {
// //   id: string;
// //   label: string;
// //   description: string;
// //   icon: string;
// //   earned: boolean;
// // };

// // type SkillView = {
// //   label: string;
// //   percentage: number;
// // };

// // type ActivityView = {
// //   id: string;
// //   title: string;
// //   description: string;
// //   timestamp: string | null;
// // };

// // type ProgressData = {
// //   totalXp: number;
// //   currentStreak: number;
// //   longestStreak: number;
// //   totalLessons: number;
// //   completedLessons: number;
// //   overallProgress: number;
// //   dailyGoalMinutes: number;
// //   timeStudiedTodaySeconds: number;
// //   totalTimeStudiedSeconds: number;
// //   currentLevelTitle: string;
// //   currentUnitTitle: string;
// //   units: UnitProgress[];
// //   rewards: RewardView[];
// //   skills: SkillView[];
// //   recentActivity: ActivityView[];
// // };

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
// //   hidden: {
// //     y: 20,
// //     opacity: 0,
// //   },
// //   visible: {
// //     y: 0,
// //     opacity: 1,
// //     transition: {
// //       type: "spring" as const,
// //       stiffness: 100,
// //     },
// //   },
// // };

// // function isRecord(value: unknown): value is JsonRecord {
// //   return typeof value === "object" && value !== null && !Array.isArray(value);
// // }

// // function toRecord(value: unknown): JsonRecord {
// //   return isRecord(value) ? value : {};
// // }

// // function toArray(value: unknown): unknown[] {
// //   return Array.isArray(value) ? value : [];
// // }

// // function numberValue(record: JsonRecord, ...keys: string[]) {
// //   for (const key of keys) {
// //     const value = record[key];

// //     if (typeof value === "number" && Number.isFinite(value)) {
// //       return value;
// //     }

// //     if (typeof value === "string" && value.trim() !== "") {
// //       const parsed = Number(value);
// //       if (Number.isFinite(parsed)) return parsed;
// //     }
// //   }

// //   return 0;
// // }

// // function textValue(record: JsonRecord, ...keys: string[]) {
// //   for (const key of keys) {
// //     const value = record[key];
// //     if (typeof value === "string" && value.trim()) {
// //       return value.trim();
// //     }
// //   }

// //   return "";
// // }

// // function booleanValue(record: JsonRecord, ...keys: string[]) {
// //   for (const key of keys) {
// //     const value = record[key];

// //     if (typeof value === "boolean") {
// //       return value;
// //     }

// //     if (typeof value === "string") {
// //       if (value === "true") return true;
// //       if (value === "false") return false;
// //     }
// //   }

// //   return false;
// // }

// // function clamp(value: number, minimum = 0, maximum = 100) {
// //   return Math.min(maximum, Math.max(minimum, value));
// // }

// // function formatDuration(seconds: number) {
// //   const safeSeconds = Math.max(0, Math.floor(seconds));

// //   if (safeSeconds < 60) {
// //     return `${safeSeconds}s`;
// //   }

// //   const minutes = Math.floor(safeSeconds / 60);

// //   if (minutes < 60) {
// //     return `${minutes}m`;
// //   }

// //   const hours = Math.floor(minutes / 60);
// //   const remainderMinutes = minutes % 60;

// //   return remainderMinutes > 0
// //     ? `${hours}h ${remainderMinutes}m`
// //     : `${hours}h`;
// // }

// // function formatActivityTime(timestamp: string | null) {
// //   if (!timestamp) return "";

// //   const date = new Date(timestamp);

// //   if (Number.isNaN(date.getTime())) return "";

// //   return date.toLocaleString([], {
// //     month: "short",
// //     day: "numeric",
// //     hour: "2-digit",
// //     minute: "2-digit",
// //   });
// // }

// // function normalizeDashboard(data: unknown) {
// //   if (Array.isArray(data)) {
// //     return toRecord(data[0]);
// //   }

// //   return toRecord(data);
// // }

// // function normalizeRewards(raw: unknown): RewardView[] {
// //   return toArray(raw)
// //     .map((item, index) => {
// //       const row = toRecord(item);

// //       const earned =
// //         booleanValue(row, "earned", "is_earned", "unlocked") ||
// //         Boolean(
// //           textValue(
// //             row,
// //             "earned_at",
// //             "unlocked_at",
// //             "awarded_at",
// //             "created_at",
// //           ),
// //         );

// //       return {
// //         id:
// //           textValue(row, "id", "reward_id", "code", "slug") ||
// //           `reward-${index}`,
// //         label:
// //           textValue(row, "title", "name", "label", "reward_name") ||
// //           "Achievement",
// //         description: textValue(
// //           row,
// //           "description",
// //           "subtitle",
// //           "reward_description",
// //         ),
// //         icon: textValue(row, "icon", "emoji") || "🏅",
// //         earned,
// //       };
// //     })
// //     .slice(0, 8);
// // }

// // function normalizeSkills(raw: unknown): SkillView[] {
// //   return toArray(raw)
// //     .map((item) => {
// //       const row = toRecord(item);

// //       return {
// //         label:
// //           textValue(
// //             row,
// //             "label",
// //             "name",
// //             "title",
// //             "category",
// //             "skill_name",
// //           ) || "Skill",
// //         percentage: clamp(
// //           numberValue(
// //             row,
// //             "percentage",
// //             "score",
// //             "progress_percentage",
// //             "value",
// //           ),
// //         ),
// //       };
// //     })
// //     .slice(0, 6);
// // }

// // function normalizeActivity(raw: unknown): ActivityView[] {
// //   return toArray(raw)
// //     .map((item, index) => {
// //       const row = toRecord(item);
// //       const eventType = textValue(row, "event_type", "type");

// //       return {
// //         id:
// //           textValue(row, "id", "event_id") ||
// //           `${eventType || "activity"}-${index}`,
// //         title:
// //           textValue(row, "title", "label", "action", "event_name") ||
// //           (eventType
// //             ? eventType.replaceAll("_", " ").replace(/\b\w/g, (c) =>
// //                 c.toUpperCase(),
// //               )
// //             : "Learning activity"),
// //         description: textValue(
// //           row,
// //           "description",
// //           "message",
// //           "subtitle",
// //           "detail",
// //         ),
// //         timestamp:
// //           textValue(
// //             row,
// //             "created_at",
// //             "occurred_at",
// //             "event_at",
// //             "completed_at",
// //           ) || null,
// //       };
// //     })
// //     .slice(0, 8);
// // }

// // function StatCard({
// //   icon: Icon,
// //   label,
// //   value,
// //   suffix,
// //   color,
// // }: {
// //   icon: React.ElementType;
// //   label: string;
// //   value: string | number;
// //   suffix?: string;
// //   color: string;
// // }) {
// //   return (
// //     <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
// //       <div className="flex items-center gap-2 mb-2">
// //         <Icon className={`h-5 w-5 ${color}`} />
// //         <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wide">
// //           {label}
// //         </span>
// //       </div>

// //       <p className="text-2xl lg:text-3xl font-bold text-white">
// //         {value}
// //         {suffix && (
// //           <span className="text-sm ml-1 text-amber-300">{suffix}</span>
// //         )}
// //       </p>
// //     </div>
// //   );
// // }

// // export default function ProgressPage() {
// //   const [progress, setProgress] = useState<ProgressData | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [pageError, setPageError] = useState<string | null>(null);

// //   const loadProgress = useCallback(async () => {
// //     setLoading(true);
// //     setPageError(null);

// //     try {
// //       const supabase = createClient();

// //       const {
// //         data: { user },
// //         error: userError,
// //       } = await supabase.auth.getUser();

// //       if (userError || !user) {
// //         throw new Error("You must be signed in to view progress.");
// //       }

// //       const { data: dashboardResponse, error: dashboardError } =
// //         await supabase.rpc("get_user_dashboard");

// //       if (dashboardError) {
// //         throw dashboardError;
// //       }

// //       const dashboard = normalizeDashboard(dashboardResponse);

// //       const { data: unitRows, error: unitsError } = await supabase
// //         .from("units")
// //         .select(
// //           `
// //           id,
// //           title,
// //           unit_order,
// //           lessons (
// //             id,
// //             title,
// //             lesson_order,
// //             is_published
// //           )
// //         `,
// //         )
// //         .eq("is_published", true)
// //         .order("unit_order", { ascending: true });

// //       if (unitsError) {
// //         throw unitsError;
// //       }

// //       const normalizedUnits: UnitRow[] = (unitRows ?? []).map((unit) => {
// //         const lessons = Array.isArray(unit.lessons)
// //           ? unit.lessons
// //               .filter((lesson) => lesson.is_published)
// //               .sort((a, b) => a.lesson_order - b.lesson_order)
// //           : [];

// //         return {
// //           id: unit.id,
// //           title: unit.title,
// //           unit_order: unit.unit_order,
// //           lessons,
// //         };
// //       });

// //       const publishedLessonIds = normalizedUnits.flatMap((unit) =>
// //         unit.lessons.map((lesson) => lesson.id),
// //       );

// //       let completedLessonIds = new Set<string>();

// //       if (publishedLessonIds.length > 0) {
// //         const { data: completedRows, error: completedError } = await supabase
// //           .from("user_lesson_progress")
// //           .select("lesson_id")
// //           .eq("user_id", user.id)
// //           .eq("status", "COMPLETED")
// //           .in("lesson_id", publishedLessonIds);

// //         if (completedError) {
// //           throw completedError;
// //         }

// //         completedLessonIds = new Set(
// //           (completedRows ?? []).map((row) => row.lesson_id),
// //         );
// //       }

// //       const units: UnitProgress[] = normalizedUnits.map((unit) => {
// //         const lessonCount = unit.lessons.length;
// //         const completedCount = unit.lessons.filter((lesson) =>
// //           completedLessonIds.has(lesson.id),
// //         ).length;

// //         return {
// //           id: unit.id,
// //           title: unit.title,
// //           lessonCount,
// //           completedCount,
// //           percentage:
// //             lessonCount > 0
// //               ? Math.round((completedCount / lessonCount) * 100)
// //               : 0,
// //         };
// //       });

// //       const currentLevel = toRecord(dashboard.current_level);
// //       const currentUnit = toRecord(dashboard.current_unit);

// //       const dailyGoalMinutes = Math.max(
// //         1,
// //         numberValue(dashboard, "daily_goal_minutes") || 30,
// //       );

// //       setProgress({
// //         totalXp: numberValue(dashboard, "total_xp"),
// //         currentStreak: numberValue(dashboard, "current_streak"),
// //         longestStreak: numberValue(dashboard, "longest_streak"),
// //         totalLessons:
// //           numberValue(dashboard, "total_lessons") ||
// //           publishedLessonIds.length,
// //         completedLessons:
// //           numberValue(dashboard, "completed_lessons") ||
// //           completedLessonIds.size,
// //         overallProgress: clamp(
// //           numberValue(dashboard, "overall_progress_percentage"),
// //         ),
// //         dailyGoalMinutes,
// //         timeStudiedTodaySeconds: numberValue(
// //           dashboard,
// //           "time_studied_today_seconds",
// //         ),
// //         totalTimeStudiedSeconds: numberValue(
// //           dashboard,
// //           "total_time_studied_seconds",
// //         ),
// //         currentLevelTitle:
// //           textValue(currentLevel, "title", "name") ||
// //           textValue(dashboard, "current_level_title") ||
// //           "Current Level",
// //         currentUnitTitle:
// //           textValue(currentUnit, "title", "name") ||
// //           textValue(dashboard, "current_unit_title"),
// //         units,
// //         rewards: normalizeRewards(dashboard.rewards),
// //         skills: normalizeSkills(dashboard.skills_breakdown),
// //         recentActivity: normalizeActivity(dashboard.recent_activity),
// //       });
// //     } catch (error) {
// //       console.error("Could not load progress page:", error);
// //       setPageError(
// //         error instanceof Error
// //           ? error.message
// //           : "Could not load your progress.",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     void loadProgress();
// //   }, [loadProgress]);

// //   const milestones = useMemo(() => {
// //     const xp = progress?.totalXp ?? 0;

// //     return [
// //       {
// //         xp: 100,
// //         title: "Bronze Learner",
// //         achieved: xp >= 100,
// //         icon: "🥉",
// //       },
// //       {
// //         xp: 500,
// //         title: "Silver Scholar",
// //         achieved: xp >= 500,
// //         icon: "🥈",
// //       },
// //       {
// //         xp: 1000,
// //         title: "Gold Speaker",
// //         achieved: xp >= 1000,
// //         icon: "🥇",
// //       },
// //       {
// //         xp: 2000,
// //         title: "Platinum Pro",
// //         achieved: xp >= 2000,
// //         icon: "💎",
// //       },
// //       {
// //         xp: 5000,
// //         title: "Legendary Linguist",
// //         achieved: xp >= 5000,
// //         icon: "👑",
// //       },
// //     ];
// //   }, [progress?.totalXp]);

// //   if (loading) {
// //     return (
// //       <div className="flex min-h-[60vh] items-center justify-center">
// //         <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
// //       </div>
// //     );
// //   }

// //   if (pageError || !progress) {
// //     return (
// //       <div className="py-20 text-center">
// //         <XCircle className="mx-auto h-10 w-10 text-red-300" />
// //         <h1 className="mt-4 text-2xl font-bold text-white">
// //           Progress could not be loaded
// //         </h1>
// //         <p className="mt-2 text-sm text-amber-200/70">
// //           {pageError ?? "Please try again."}
// //         </p>
// //         <button
// //           type="button"
// //           onClick={() => void loadProgress()}
// //           className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
// //         >
// //           Try Again
// //         </button>
// //       </div>
// //     );
// //   }

// //   const completionPercentage =
// //     progress.totalLessons > 0
// //       ? Math.round(
// //           (progress.completedLessons / progress.totalLessons) * 100,
// //         )
// //       : progress.overallProgress;

// //   const todayGoalSeconds = progress.dailyGoalMinutes * 60;
// //   const todayGoalPercentage =
// //     todayGoalSeconds > 0
// //       ? clamp(
// //           (progress.timeStudiedTodaySeconds / todayGoalSeconds) * 100,
// //         )
// //       : 0;

// //   const nextMilestone = milestones.find((milestone) => !milestone.achieved);
// //   const xpToNextMilestone = nextMilestone
// //     ? Math.max(0, nextMilestone.xp - progress.totalXp)
// //     : 0;

// //   return (
// //     <motion.div
// //       variants={containerVariants}
// //       initial="hidden"
// //       animate="visible"
// //       className="space-y-8"
// //     >
// //       {/* Header */}
// //       <motion.div variants={itemVariants}>
// //         <h1 className="text-2xl lg:text-3xl font-bold text-white">
// //           Your Progress
// //         </h1>
// //         <p className="text-amber-200/70 mt-1">
// //           Track your real learning activity and achievements
// //         </p>
// //       </motion.div>

// //       {/* Stats Overview */}
// //       <motion.div
// //         variants={itemVariants}
// //         className="grid grid-cols-2 lg:grid-cols-4 gap-4"
// //       >
// //         <StatCard
// //           label="Total XP"
// //           value={progress.totalXp}
// //           icon={Star}
// //           color="text-amber-400"
// //         />
// //         <StatCard
// //           label="Day Streak"
// //           value={progress.currentStreak}
// //           suffix=" days"
// //           icon={Flame}
// //           color="text-orange-400"
// //         />
// //         <StatCard
// //           label="Course"
// //           value={`${completionPercentage}%`}
// //           icon={Trophy}
// //           color="text-emerald-400"
// //         />
// //         <StatCard
// //           label="Completed"
// //           value={`${progress.completedLessons}/${progress.totalLessons}`}
// //           suffix=" lessons"
// //           icon={CheckCircle2}
// //           color="text-emerald-400"
// //         />
// //       </motion.div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Left Column */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Course Progress */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <div className="flex items-center justify-between gap-4 mb-4">
// //                 <div>
// //                   <div className="flex items-center gap-2">
// //                     <Trophy className="h-5 w-5 text-amber-400" />
// //                     <h2 className="text-lg font-semibold text-white">
// //                       {progress.currentLevelTitle}
// //                     </h2>
// //                   </div>

// //                   {progress.currentUnitTitle && (
// //                     <p className="mt-1 text-sm text-amber-200/55">
// //                       {progress.currentUnitTitle}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <span className="text-sm font-semibold text-amber-300">
// //                   {completionPercentage}% complete
// //                 </span>
// //               </div>

// //               <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-3">
// //                 <motion.div
// //                   className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
// //                   initial={{ width: 0 }}
// //                   animate={{ width: `${completionPercentage}%` }}
// //                   transition={{ duration: 1 }}
// //                 />
// //               </div>

// //               <p className="text-sm text-amber-200/60">
// //                 {progress.completedLessons} of {progress.totalLessons} published
// //                 lessons completed
// //               </p>
// //             </div>
// //           </motion.div>

// //           {/* XP Milestones */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// //                 <Award className="h-5 w-5 text-amber-400" />
// //                 XP Milestones
// //               </h2>

// //               <div className="space-y-3">
// //                 {milestones.map((milestone) => (
// //                   <div
// //                     key={milestone.xp}
// //                     className={`flex items-center gap-3 p-3 rounded-xl transition ${
// //                       milestone.achieved
// //                         ? "bg-emerald-500/20 border border-emerald-400/30"
// //                         : "bg-white/5 border border-white/10 opacity-60"
// //                     }`}
// //                   >
// //                     <div className="text-2xl">{milestone.icon}</div>

// //                     <div className="flex-1">
// //                       <p
// //                         className={`font-medium ${
// //                           milestone.achieved
// //                             ? "text-white"
// //                             : "text-white/60"
// //                         }`}
// //                       >
// //                         {milestone.title}
// //                       </p>
// //                       <p className="text-xs text-amber-300/50">
// //                         {milestone.xp} XP required
// //                       </p>
// //                     </div>

// //                     {milestone.achieved && (
// //                       <CheckCircle2 className="h-5 w-5 text-emerald-400" />
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>

// //               {nextMilestone && (
// //                 <p className="text-sm text-amber-300/60 mt-4 text-center">
// //                   {xpToNextMilestone} XP until {nextMilestone.title}
// //                 </p>
// //               )}
// //             </div>
// //           </motion.div>

// //           {/* Unit Progress */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// //                 <Target className="h-5 w-5 text-amber-400" />
// //                 Unit Progress
// //               </h2>

// //               {progress.units.length > 0 ? (
// //                 <div className="space-y-5">
// //                   {progress.units.map((unit) => (
// //                     <div key={unit.id}>
// //                       <div className="flex items-center justify-between gap-4 mb-2">
// //                         <span className="text-sm font-medium text-white">
// //                           {unit.title}
// //                         </span>
// //                         <span className="text-xs text-amber-300/70 shrink-0">
// //                           {unit.completedCount}/{unit.lessonCount} lessons
// //                         </span>
// //                       </div>

// //                       <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
// //                         <motion.div
// //                           className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
// //                           initial={{ width: 0 }}
// //                           animate={{ width: `${unit.percentage}%` }}
// //                           transition={{ duration: 0.8 }}
// //                         />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <p className="text-sm text-amber-200/60">
// //                   No published units are available yet.
// //                 </p>
// //               )}
// //             </div>
// //           </motion.div>

// //           {/* Skill Progress */}
// //           {progress.skills.length > 0 && (
// //             <motion.div variants={itemVariants}>
// //               <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //                 <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// //                   <TrendingUp className="h-5 w-5 text-amber-400" />
// //                   Skill Progress
// //                 </h2>

// //                 <div className="space-y-4">
// //                   {progress.skills.map((skill) => (
// //                     <div key={skill.label}>
// //                       <div className="flex items-center justify-between mb-2">
// //                         <span className="text-sm text-white/80">
// //                           {skill.label}
// //                         </span>
// //                         <span className="text-sm font-semibold text-amber-300">
// //                           {Math.round(skill.percentage)}%
// //                         </span>
// //                       </div>

// //                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
// //                         <motion.div
// //                           className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
// //                           initial={{ width: 0 }}
// //                           animate={{ width: `${skill.percentage}%` }}
// //                           transition={{ duration: 0.8 }}
// //                         />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </div>

// //         {/* Right Column */}
// //         <div className="space-y-6">
// //           {/* Streak */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <div className="flex items-center gap-2 mb-5">
// //                 <Calendar className="h-5 w-5 text-amber-400" />
// //                 <h2 className="text-lg font-semibold text-white">
// //                   Study Streak
// //                 </h2>
// //               </div>

// //               <div className="grid grid-cols-2 gap-3">
// //                 <div className="rounded-xl bg-orange-500/10 border border-orange-400/20 p-4 text-center">
// //                   <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
// //                   <p className="text-2xl font-bold text-white">
// //                     {progress.currentStreak}
// //                   </p>
// //                   <p className="text-xs text-amber-200/55 mt-1">
// //                     Current streak
// //                   </p>
// //                 </div>

// //                 <div className="rounded-xl bg-amber-500/10 border border-amber-400/20 p-4 text-center">
// //                   <Trophy className="h-6 w-6 text-amber-400 mx-auto mb-2" />
// //                   <p className="text-2xl font-bold text-white">
// //                     {progress.longestStreak}
// //                   </p>
// //                   <p className="text-xs text-amber-200/55 mt-1">
// //                     Longest streak
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Daily Goal */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <div className="flex items-center gap-2">
// //                   <Target className="h-5 w-5 text-amber-400" />
// //                   <h2 className="text-lg font-semibold text-white">
// //                     Today&apos;s Goal
// //                   </h2>
// //                 </div>
// //                 <span className="text-sm font-bold text-white">
// //                   {Math.round(todayGoalPercentage)}%
// //                 </span>
// //               </div>

// //               <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
// //                 <motion.div
// //                   className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
// //                   initial={{ width: 0 }}
// //                   animate={{ width: `${todayGoalPercentage}%` }}
// //                   transition={{ duration: 0.8 }}
// //                 />
// //               </div>

// //               <p className="text-xs text-amber-300/60 mt-3">
// //                 {formatDuration(progress.timeStudiedTodaySeconds)} of{" "}
// //                 {progress.dailyGoalMinutes}m studied today
// //               </p>
// //             </div>
// //           </motion.div>

// //           {/* Study Time */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <div className="flex items-center gap-2 mb-4">
// //                 <Clock className="h-5 w-5 text-amber-400" />
// //                 <h2 className="text-lg font-semibold text-white">
// //                   Study Time
// //                 </h2>
// //               </div>

// //               <div className="space-y-3">
// //                 <div className="flex justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
// //                   <span className="text-sm text-white/60">Today</span>
// //                   <span className="text-sm font-semibold text-white">
// //                     {formatDuration(progress.timeStudiedTodaySeconds)}
// //                   </span>
// //                 </div>

// //                 <div className="flex justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
// //                   <span className="text-sm text-white/60">All time</span>
// //                   <span className="text-sm font-semibold text-white">
// //                     {formatDuration(progress.totalTimeStudiedSeconds)}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Backend Rewards */}
// //           <motion.div variants={itemVariants}>
// //             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //               <div className="flex items-center gap-2 mb-4">
// //                 <Award className="h-5 w-5 text-amber-400" />
// //                 <h2 className="text-lg font-semibold text-white">
// //                   Achievements
// //                 </h2>
// //               </div>

// //               {progress.rewards.length > 0 ? (
// //                 <div className="space-y-3">
// //                   {progress.rewards.map((reward) => (
// //                     <div
// //                       key={reward.id}
// //                       className={`rounded-xl border p-3 ${
// //                         reward.earned
// //                           ? "border-emerald-400/25 bg-emerald-500/10"
// //                           : "border-white/10 bg-white/5 opacity-60"
// //                       }`}
// //                     >
// //                       <div className="flex items-start gap-3">
// //                         <span className="text-xl">{reward.icon}</span>
// //                         <div className="min-w-0 flex-1">
// //                           <p className="text-sm font-semibold text-white">
// //                             {reward.label}
// //                           </p>
// //                           {reward.description && (
// //                             <p className="mt-1 text-xs text-white/45">
// //                               {reward.description}
// //                             </p>
// //                           )}
// //                         </div>
// //                         {reward.earned && (
// //                           <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <p className="text-sm text-amber-200/55">
// //                   No achievements earned yet. Complete learning activities to
// //                   unlock them.
// //                 </p>
// //               )}
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Recent Activity */}
// //       <motion.div variants={itemVariants}>
// //         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
// //           <div className="flex items-center gap-2 mb-4">
// //             <TrendingUp className="h-5 w-5 text-amber-400" />
// //             <h2 className="text-lg font-semibold text-white">
// //               Recent Activity
// //             </h2>
// //           </div>

// //           {progress.recentActivity.length > 0 ? (
// //             <div className="grid gap-3 md:grid-cols-2">
// //               {progress.recentActivity.map((activity) => (
// //                 <div
// //                   key={activity.id}
// //                   className="rounded-xl border border-white/10 bg-white/5 p-4"
// //                 >
// //                   <div className="flex items-start gap-3">
// //                     <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
// //                     <div className="min-w-0">
// //                       <p className="text-sm font-semibold text-white">
// //                         {activity.title}
// //                       </p>
// //                       {activity.description && (
// //                         <p className="mt-1 text-xs leading-5 text-white/50">
// //                           {activity.description}
// //                         </p>
// //                       )}
// //                       {activity.timestamp && (
// //                         <p className="mt-2 text-[11px] text-amber-300/45">
// //                           {formatActivityTime(activity.timestamp)}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-sm text-amber-200/55">
// //               Your completed lessons, goals and achievements will appear here.
// //             </p>
// //           )}
// //         </div>
// //       </motion.div>

// //       {/* Completion Badge */}
// //       <motion.div variants={itemVariants} className="text-center">
// //         <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 border border-amber-400/30">
// //           <Sparkles className="h-4 w-4 text-amber-400" />
// //           <span className="text-sm text-amber-300">
// //             {completionPercentage}% Complete • Keep going!
// //           </span>
// //           <Sparkles className="h-4 w-4 text-amber-400" />
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }


// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { motion, type Variants } from "framer-motion";
// import {
//   Award,
//   Calendar,
//   CheckCircle2,
//   Clock,
//   Flame,
//   Loader2,
//   Sparkles,
//   Star,
//   Target,
//   Trophy,
//   TrendingUp,
//   XCircle,
// } from "lucide-react";

// import { createClient } from "@/lib/supabase/client";

// type JsonRecord = Record<string, unknown>;

// type UnitRow = {
//   id: string;
//   title: string;
//   unit_order: number;
//   lessons: {
//     id: string;
//     title: string;
//     lesson_order: number;
//     is_published: boolean;
//   }[];
// };

// type UnitProgress = {
//   id: string;
//   title: string;
//   lessonCount: number;
//   completedCount: number;
//   percentage: number;
// };

// type RewardView = {
//   id: string;
//   label: string;
//   description: string;
//   icon: string;
//   earned: boolean;
// };

// type SkillView = {
//   label: string;
//   percentage: number;
// };

// type ActivityView = {
//   id: string;
//   title: string;
//   description: string;
//   timestamp: string | null;
// };

// type ProgressData = {
//   totalXp: number;
//   currentStreak: number;
//   longestStreak: number;
//   totalLessons: number;
//   completedLessons: number;
//   overallProgress: number;
//   dailyGoalMinutes: number;
//   timeStudiedTodaySeconds: number;
//   totalTimeStudiedSeconds: number;
//   currentLevelTitle: string;
//   currentUnitTitle: string;
//   units: UnitProgress[];
//   rewards: RewardView[];
//   skills: SkillView[];
//   recentActivity: ActivityView[];
// };

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: {
//     y: 20,
//     opacity: 0,
//   },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring" as const,
//       stiffness: 100,
//     },
//   },
// };

// function isRecord(value: unknown): value is JsonRecord {
//   return typeof value === "object" && value !== null && !Array.isArray(value);
// }

// function toRecord(value: unknown): JsonRecord {
//   return isRecord(value) ? value : {};
// }

// function toArray(value: unknown): unknown[] {
//   return Array.isArray(value) ? value : [];
// }

// function numberValue(record: JsonRecord, ...keys: string[]) {
//   for (const key of keys) {
//     const value = record[key];

//     if (typeof value === "number" && Number.isFinite(value)) {
//       return value;
//     }

//     if (typeof value === "string" && value.trim() !== "") {
//       const parsed = Number(value);
//       if (Number.isFinite(parsed)) return parsed;
//     }
//   }

//   return 0;
// }

// function textValue(record: JsonRecord, ...keys: string[]) {
//   for (const key of keys) {
//     const value = record[key];
//     if (typeof value === "string" && value.trim()) {
//       return value.trim();
//     }
//   }

//   return "";
// }

// function booleanValue(record: JsonRecord, ...keys: string[]) {
//   for (const key of keys) {
//     const value = record[key];

//     if (typeof value === "boolean") {
//       return value;
//     }

//     if (typeof value === "string") {
//       if (value === "true") return true;
//       if (value === "false") return false;
//     }
//   }

//   return false;
// }

// function clamp(value: number, minimum = 0, maximum = 100) {
//   return Math.min(maximum, Math.max(minimum, value));
// }

// function formatDuration(seconds: number) {
//   const safeSeconds = Math.max(0, Math.floor(seconds));

//   if (safeSeconds < 60) {
//     return `${safeSeconds}s`;
//   }

//   const minutes = Math.floor(safeSeconds / 60);

//   if (minutes < 60) {
//     return `${minutes}m`;
//   }

//   const hours = Math.floor(minutes / 60);
//   const remainderMinutes = minutes % 60;

//   return remainderMinutes > 0
//     ? `${hours}h ${remainderMinutes}m`
//     : `${hours}h`;
// }

// function formatActivityTime(timestamp: string | null) {
//   if (!timestamp) return "";

//   const date = new Date(timestamp);

//   if (Number.isNaN(date.getTime())) return "";

//   return date.toLocaleString([], {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function normalizeDashboard(data: unknown) {
//   if (Array.isArray(data)) {
//     return toRecord(data[0]);
//   }

//   return toRecord(data);
// }

// function normalizeRewards(raw: unknown): RewardView[] {
//   return toArray(raw)
//     .map((item, index) => {
//       const row = toRecord(item);

//       const earned =
//         booleanValue(row, "earned", "is_earned", "unlocked") ||
//         Boolean(
//           textValue(
//             row,
//             "earned_at",
//             "unlocked_at",
//             "awarded_at",
//             "created_at",
//           ),
//         );

//       return {
//         id:
//           textValue(row, "id", "reward_id", "code", "slug") ||
//           `reward-${index}`,
//         label:
//           textValue(row, "title", "name", "label", "reward_name") ||
//           "Achievement",
//         description: textValue(
//           row,
//           "description",
//           "subtitle",
//           "reward_description",
//         ),
//         icon: textValue(row, "icon", "emoji") || "🏅",
//         earned,
//       };
//     })
//     .slice(0, 8);
// }

// function normalizeSkills(raw: unknown): SkillView[] {
//   return toArray(raw)
//     .map((item, index) => {
//       const row = toRecord(item);

//       const nestedCategory = toRecord(
//         row.skill_category ?? row.category ?? row.skill
//       );

//       const label =
//         textValue(
//           row,
//           "label",
//           "name",
//           "title",
//           "skill_name",
//           "skill_category_name",
//           "category_name"
//         ) ||
//         textValue(nestedCategory, "name", "title", "label") ||
//         `Skill ${index + 1}`;

//       return {
//         label,
//         percentage: clamp(
//           numberValue(
//             row,
//             "percentage",
//             "score",
//             "progress_percentage",
//             "value"
//           )
//         ),
//       };
//     })
//     .slice(0, 6);
// }

// function normalizeActivity(raw: unknown): ActivityView[] {
//   return toArray(raw)
//     .map((item, index) => {
//       const row = toRecord(item);
//       const eventType = textValue(row, "event_type", "type");

//       return {
//         id:
//           textValue(row, "id", "event_id") ||
//           `${eventType || "activity"}-${index}`,
//         title:
//           textValue(row, "title", "label", "action", "event_name") ||
//           (eventType
//             ? eventType.replaceAll("_", " ").replace(/\b\w/g, (c) =>
//                 c.toUpperCase(),
//               )
//             : "Learning activity"),
//         description: textValue(
//           row,
//           "description",
//           "message",
//           "subtitle",
//           "detail",
//         ),
//         timestamp:
//           textValue(
//             row,
//             "created_at",
//             "occurred_at",
//             "event_at",
//             "completed_at",
//           ) || null,
//       };
//     })
//     .slice(0, 8);
// }

// function StatCard({
//   icon: Icon,
//   label,
//   value,
//   suffix,
//   color,
// }: {
//   icon: React.ElementType;
//   label: string;
//   value: string | number;
//   suffix?: string;
//   color: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
//       <div className="flex items-center gap-2 mb-2">
//         <Icon className={`h-5 w-5 ${color}`} />
//         <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wide">
//           {label}
//         </span>
//       </div>

//       <p className="text-2xl lg:text-3xl font-bold text-white">
//         {value}
//         {suffix && (
//           <span className="text-sm ml-1 text-amber-300">{suffix}</span>
//         )}
//       </p>
//     </div>
//   );
// }

// export default function ProgressPage() {
//   const [progress, setProgress] = useState<ProgressData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState<string | null>(null);

//   const loadProgress = useCallback(async () => {
//     setLoading(true);
//     setPageError(null);

//     try {
//       const supabase = createClient();

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         throw new Error("You must be signed in to view progress.");
//       }

//       const { data: dashboardResponse, error: dashboardError } =
//         await supabase.rpc("get_user_dashboard");

//       if (dashboardError) {
//         throw dashboardError;
//       }

//       const dashboard = normalizeDashboard(dashboardResponse);

//       const { data: unitRows, error: unitsError } = await supabase
//         .from("units")
//         .select(
//           `
//           id,
//           title,
//           unit_order,
//           lessons (
//             id,
//             title,
//             lesson_order,
//             is_published
//           )
//         `,
//         )
//         .eq("is_published", true)
//         .order("unit_order", { ascending: true });

//       if (unitsError) {
//         throw unitsError;
//       }

//       const normalizedUnits: UnitRow[] = (unitRows ?? []).map((unit) => {
//         const lessons = Array.isArray(unit.lessons)
//           ? unit.lessons
//               .filter((lesson) => lesson.is_published)
//               .sort((a, b) => a.lesson_order - b.lesson_order)
//           : [];

//         return {
//           id: unit.id,
//           title: unit.title,
//           unit_order: unit.unit_order,
//           lessons,
//         };
//       });

//       const publishedLessonIds = normalizedUnits.flatMap((unit) =>
//         unit.lessons.map((lesson) => lesson.id),
//       );

//       let completedLessonIds = new Set<string>();

//       if (publishedLessonIds.length > 0) {
//         const { data: completedRows, error: completedError } = await supabase
//           .from("user_lesson_progress")
//           .select("lesson_id")
//           .eq("user_id", user.id)
//           .eq("status", "COMPLETED")
//           .in("lesson_id", publishedLessonIds);

//         if (completedError) {
//           throw completedError;
//         }

//         completedLessonIds = new Set(
//           (completedRows ?? []).map((row) => row.lesson_id),
//         );
//       }

//       const units: UnitProgress[] = normalizedUnits.map((unit) => {
//         const lessonCount = unit.lessons.length;
//         const completedCount = unit.lessons.filter((lesson) =>
//           completedLessonIds.has(lesson.id),
//         ).length;

//         return {
//           id: unit.id,
//           title: unit.title,
//           lessonCount,
//           completedCount,
//           percentage:
//             lessonCount > 0
//               ? Math.round((completedCount / lessonCount) * 100)
//               : 0,
//         };
//       });

//       const currentLevel = toRecord(dashboard.current_level);
//       const currentUnit = toRecord(dashboard.current_unit);

//       const dailyGoalMinutes = Math.max(
//         1,
//         numberValue(dashboard, "daily_goal_minutes") || 30,
//       );

//       setProgress({
//         totalXp: numberValue(dashboard, "total_xp"),
//         currentStreak: numberValue(dashboard, "current_streak"),
//         longestStreak: numberValue(dashboard, "longest_streak"),
//         totalLessons:
//           numberValue(dashboard, "total_lessons") ||
//           publishedLessonIds.length,
//         completedLessons:
//           numberValue(dashboard, "completed_lessons") ||
//           completedLessonIds.size,
//         overallProgress: clamp(
//           numberValue(dashboard, "overall_progress_percentage"),
//         ),
//         dailyGoalMinutes,
//         timeStudiedTodaySeconds: numberValue(
//           dashboard,
//           "time_studied_today_seconds",
//         ),
//         totalTimeStudiedSeconds: numberValue(
//           dashboard,
//           "total_time_studied_seconds",
//         ),
//         currentLevelTitle:
//           textValue(currentLevel, "title", "name") ||
//           textValue(dashboard, "current_level_title") ||
//           "Current Level",
//         currentUnitTitle:
//           textValue(currentUnit, "title", "name") ||
//           textValue(dashboard, "current_unit_title"),
//         units,
//         rewards: normalizeRewards(dashboard.rewards),
//         skills: normalizeSkills(dashboard.skills_breakdown),
//         recentActivity: normalizeActivity(dashboard.recent_activity),
//       });
//     } catch (error) {
//       console.error("Could not load progress page:", error);
//       setPageError(
//         error instanceof Error
//           ? error.message
//           : "Could not load your progress.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void loadProgress();
//   }, [loadProgress]);

//   const milestones = useMemo(() => {
//     const xp = progress?.totalXp ?? 0;

//     return [
//       {
//         xp: 100,
//         title: "Bronze Learner",
//         achieved: xp >= 100,
//         icon: "🥉",
//       },
//       {
//         xp: 500,
//         title: "Silver Scholar",
//         achieved: xp >= 500,
//         icon: "🥈",
//       },
//       {
//         xp: 1000,
//         title: "Gold Speaker",
//         achieved: xp >= 1000,
//         icon: "🥇",
//       },
//       {
//         xp: 2000,
//         title: "Platinum Pro",
//         achieved: xp >= 2000,
//         icon: "💎",
//       },
//       {
//         xp: 5000,
//         title: "Legendary Linguist",
//         achieved: xp >= 5000,
//         icon: "👑",
//       },
//     ];
//   }, [progress?.totalXp]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
//       </div>
//     );
//   }

//   if (pageError || !progress) {
//     return (
//       <div className="py-20 text-center">
//         <XCircle className="mx-auto h-10 w-10 text-red-300" />
//         <h1 className="mt-4 text-2xl font-bold text-white">
//           Progress could not be loaded
//         </h1>
//         <p className="mt-2 text-sm text-amber-200/70">
//           {pageError ?? "Please try again."}
//         </p>
//         <button
//           type="button"
//           onClick={() => void loadProgress()}
//           className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   const completionPercentage =
//     progress.totalLessons > 0
//       ? Math.round(
//           (progress.completedLessons / progress.totalLessons) * 100,
//         )
//       : progress.overallProgress;

//   const todayGoalSeconds = progress.dailyGoalMinutes * 60;
//   const todayGoalPercentage =
//     todayGoalSeconds > 0
//       ? clamp(
//           (progress.timeStudiedTodaySeconds / todayGoalSeconds) * 100,
//         )
//       : 0;

//   const nextMilestone = milestones.find((milestone) => !milestone.achieved);
//   const xpToNextMilestone = nextMilestone
//     ? Math.max(0, nextMilestone.xp - progress.totalXp)
//     : 0;

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-8"
//     >
//       {/* Header */}
//       <motion.div variants={itemVariants}>
//         <h1 className="text-2xl lg:text-3xl font-bold text-white">
//           Your Progress
//         </h1>
//         <p className="text-amber-200/70 mt-1">
//           Track your real learning activity and achievements
//         </p>
//       </motion.div>

//       {/* Stats Overview */}
//       <motion.div
//         variants={itemVariants}
//         className="grid grid-cols-2 lg:grid-cols-4 gap-4"
//       >
//         <StatCard
//           label="Total XP"
//           value={progress.totalXp}
//           icon={Star}
//           color="text-amber-400"
//         />
//         <StatCard
//           label="Day Streak"
//           value={progress.currentStreak}
//           suffix=" days"
//           icon={Flame}
//           color="text-orange-400"
//         />
//         <StatCard
//           label="Course"
//           value={`${completionPercentage}%`}
//           icon={Trophy}
//           color="text-emerald-400"
//         />
//         <StatCard
//           label="Completed"
//           value={`${progress.completedLessons}/${progress.totalLessons}`}
//           suffix=" lessons"
//           icon={CheckCircle2}
//           color="text-emerald-400"
//         />
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Course Progress */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <div className="flex items-center justify-between gap-4 mb-4">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Trophy className="h-5 w-5 text-amber-400" />
//                     <h2 className="text-lg font-semibold text-white">
//                       {progress.currentLevelTitle}
//                     </h2>
//                   </div>

//                   {progress.currentUnitTitle && (
//                     <p className="mt-1 text-sm text-amber-200/55">
//                       {progress.currentUnitTitle}
//                     </p>
//                   )}
//                 </div>

//                 <span className="text-sm font-semibold text-amber-300">
//                   {completionPercentage}% complete
//                 </span>
//               </div>

//               <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-3">
//                 <motion.div
//                   className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${completionPercentage}%` }}
//                   transition={{ duration: 1 }}
//                 />
//               </div>

//               <p className="text-sm text-amber-200/60">
//                 {progress.completedLessons} of {progress.totalLessons} published
//                 lessons completed
//               </p>
//             </div>
//           </motion.div>

//           {/* XP Milestones */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                 <Award className="h-5 w-5 text-amber-400" />
//                 XP Milestones
//               </h2>

//               <div className="space-y-3">
//                 {milestones.map((milestone) => (
//                   <div
//                     key={milestone.xp}
//                     className={`flex items-center gap-3 p-3 rounded-xl transition ${
//                       milestone.achieved
//                         ? "bg-emerald-500/20 border border-emerald-400/30"
//                         : "bg-white/5 border border-white/10 opacity-60"
//                     }`}
//                   >
//                     <div className="text-2xl">{milestone.icon}</div>

//                     <div className="flex-1">
//                       <p
//                         className={`font-medium ${
//                           milestone.achieved
//                             ? "text-white"
//                             : "text-white/60"
//                         }`}
//                       >
//                         {milestone.title}
//                       </p>
//                       <p className="text-xs text-amber-300/50">
//                         {milestone.xp} XP required
//                       </p>
//                     </div>

//                     {milestone.achieved && (
//                       <CheckCircle2 className="h-5 w-5 text-emerald-400" />
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {nextMilestone && (
//                 <p className="text-sm text-amber-300/60 mt-4 text-center">
//                   {xpToNextMilestone} XP until {nextMilestone.title}
//                 </p>
//               )}
//             </div>
//           </motion.div>

//           {/* Unit Progress */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                 <Target className="h-5 w-5 text-amber-400" />
//                 Unit Progress
//               </h2>

//               {progress.units.length > 0 ? (
//                 <div className="space-y-5">
//                   {progress.units.map((unit) => (
//                     <div key={unit.id}>
//                       <div className="flex items-center justify-between gap-4 mb-2">
//                         <span className="text-sm font-medium text-white">
//                           {unit.title}
//                         </span>
//                         <span className="text-xs text-amber-300/70 shrink-0">
//                           {unit.completedCount}/{unit.lessonCount} lessons
//                         </span>
//                       </div>

//                       <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
//                           initial={{ width: 0 }}
//                           animate={{ width: `${unit.percentage}%` }}
//                           transition={{ duration: 0.8 }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-amber-200/60">
//                   No published units are available yet.
//                 </p>
//               )}
//             </div>
//           </motion.div>

//           {/* Skill Progress */}
//           {progress.skills.length > 0 && (
//             <motion.div variants={itemVariants}>
//               <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//                 <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5 text-amber-400" />
//                   Skill Progress
//                 </h2>

//                 <div className="space-y-4">
//                   {progress.skills.map((skill, index) => (
//                     <div key={`${skill.label}-${index}`}>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm text-white/80">
//                           {skill.label}
//                         </span>
//                         <span className="text-sm font-semibold text-amber-300">
//                           {Math.round(skill.percentage)}%
//                         </span>
//                       </div>

//                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
//                           initial={{ width: 0 }}
//                           animate={{ width: `${skill.percentage}%` }}
//                           transition={{ duration: 0.8 }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Streak */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <div className="flex items-center gap-2 mb-5">
//                 <Calendar className="h-5 w-5 text-amber-400" />
//                 <h2 className="text-lg font-semibold text-white">
//                   Study Streak
//                 </h2>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="rounded-xl bg-orange-500/10 border border-orange-400/20 p-4 text-center">
//                   <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-white">
//                     {progress.currentStreak}
//                   </p>
//                   <p className="text-xs text-amber-200/55 mt-1">
//                     Current streak
//                   </p>
//                 </div>

//                 <div className="rounded-xl bg-amber-500/10 border border-amber-400/20 p-4 text-center">
//                   <Trophy className="h-6 w-6 text-amber-400 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-white">
//                     {progress.longestStreak}
//                   </p>
//                   <p className="text-xs text-amber-200/55 mt-1">
//                     Longest streak
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Daily Goal */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <Target className="h-5 w-5 text-amber-400" />
//                   <h2 className="text-lg font-semibold text-white">
//                     Today&apos;s Goal
//                   </h2>
//                 </div>
//                 <span className="text-sm font-bold text-white">
//                   {Math.round(todayGoalPercentage)}%
//                 </span>
//               </div>

//               <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${todayGoalPercentage}%` }}
//                   transition={{ duration: 0.8 }}
//                 />
//               </div>

//               <p className="text-xs text-amber-300/60 mt-3">
//                 {formatDuration(progress.timeStudiedTodaySeconds)} of{" "}
//                 {progress.dailyGoalMinutes}m studied today
//               </p>
//             </div>
//           </motion.div>

//           {/* Study Time */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <Clock className="h-5 w-5 text-amber-400" />
//                 <h2 className="text-lg font-semibold text-white">
//                   Study Time
//                 </h2>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
//                   <span className="text-sm text-white/60">Today</span>
//                   <span className="text-sm font-semibold text-white">
//                     {formatDuration(progress.timeStudiedTodaySeconds)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
//                   <span className="text-sm text-white/60">All time</span>
//                   <span className="text-sm font-semibold text-white">
//                     {formatDuration(progress.totalTimeStudiedSeconds)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Backend Rewards */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <Award className="h-5 w-5 text-amber-400" />
//                 <h2 className="text-lg font-semibold text-white">
//                   Achievements
//                 </h2>
//               </div>

//               {progress.rewards.length > 0 ? (
//                 <div className="space-y-3">
//                   {progress.rewards.map((reward) => (
//                     <div
//                       key={reward.id}
//                       className={`rounded-xl border p-3 ${
//                         reward.earned
//                           ? "border-emerald-400/25 bg-emerald-500/10"
//                           : "border-white/10 bg-white/5 opacity-60"
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <span className="text-xl">{reward.icon}</span>
//                         <div className="min-w-0 flex-1">
//                           <p className="text-sm font-semibold text-white">
//                             {reward.label}
//                           </p>
//                           {reward.description && (
//                             <p className="mt-1 text-xs text-white/45">
//                               {reward.description}
//                             </p>
//                           )}
//                         </div>
//                         {reward.earned && (
//                           <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-amber-200/55">
//                   No achievements earned yet. Complete learning activities to
//                   unlock them.
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <motion.div variants={itemVariants}>
//         <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <TrendingUp className="h-5 w-5 text-amber-400" />
//             <h2 className="text-lg font-semibold text-white">
//               Recent Activity
//             </h2>
//           </div>

//           {progress.recentActivity.length > 0 ? (
//             <div className="grid gap-3 md:grid-cols-2">
//               {progress.recentActivity.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="rounded-xl border border-white/10 bg-white/5 p-4"
//                 >
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
//                     <div className="min-w-0">
//                       <p className="text-sm font-semibold text-white">
//                         {activity.title}
//                       </p>
//                       {activity.description && (
//                         <p className="mt-1 text-xs leading-5 text-white/50">
//                           {activity.description}
//                         </p>
//                       )}
//                       {activity.timestamp && (
//                         <p className="mt-2 text-[11px] text-amber-300/45">
//                           {formatActivityTime(activity.timestamp)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-amber-200/55">
//               Your completed lessons, goals and achievements will appear here.
//             </p>
//           )}
//         </div>
//       </motion.div>

//       {/* Completion Badge */}
//       <motion.div variants={itemVariants} className="text-center">
//         <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 border border-amber-400/30">
//           <Sparkles className="h-4 w-4 text-amber-400" />
//           <span className="text-sm text-amber-300">
//             {completionPercentage}% Complete • Keep going!
//           </span>
//           <Sparkles className="h-4 w-4 text-amber-400" />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }



"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Loader2,
  Sparkles,
  Star,
  Target,
  Trophy,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type JsonRecord = Record<string, unknown>;

type UnitRow = {
  id: string;
  title: string;
  unit_order: number;
  lessons: {
    id: string;
    title: string;
    lesson_order: number;
    is_published: boolean;
  }[];
};

type UnitProgress = {
  id: string;
  title: string;
  lessonCount: number;
  completedCount: number;
  percentage: number;
};

type RewardView = {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
};

type SkillView = {
  label: string;
  percentage: number;
};

type ActivityView = {
  id: string;
  title: string;
  description: string;
  timestamp: string | null;
};

type ProgressData = {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  totalLessons: number;
  completedLessons: number;
  overallProgress: number;
  dailyGoalMinutes: number;
  timeStudiedTodaySeconds: number;
  totalTimeStudiedSeconds: number;
  currentLevelTitle: string;
  currentUnitTitle: string;
  units: UnitProgress[];
  rewards: RewardView[];
  skills: SkillView[];
  recentActivity: ActivityView[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toRecord(value: unknown): JsonRecord {
  return isRecord(value) ? value : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function numberValue(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return 0;
}

function textValue(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function booleanValue(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "string") {
      if (value === "true") return true;
      if (value === "false") return false;
    }
  }

  return false;
}

function clamp(value: number, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, value));
}

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));

  if (safeSeconds < 60) {
    return `${safeSeconds}s`;
  }

  const minutes = Math.floor(safeSeconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  return remainderMinutes > 0
    ? `${hours}h ${remainderMinutes}m`
    : `${hours}h`;
}

function formatActivityTime(timestamp: string | null) {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeDashboard(data: unknown) {
  if (Array.isArray(data)) {
    return toRecord(data[0]);
  }

  return toRecord(data);
}

function normalizeRewardsFromDatabase(
  rawRewards: unknown,
  rawEarnedRewards: unknown,
): RewardView[] {
  const earnedRows = toArray(rawEarnedRewards).map((item) => toRecord(item));

  const earnedByRewardId = new Map<string, string | null>();

  for (const row of earnedRows) {
    const rewardId = textValue(row, "reward_id");
    if (!rewardId) continue;

    earnedByRewardId.set(
      rewardId,
      textValue(row, "earned_at") || null,
    );
  }

  return toArray(rawRewards).map((item, index) => {
    const row = toRecord(item);
    const id =
      textValue(row, "id", "reward_id", "code", "slug") ||
      `reward-${index}`;

    return {
      id,
      label:
        textValue(row, "title", "name", "label", "reward_name") ||
        "Achievement",
      description: textValue(
        row,
        "description",
        "subtitle",
        "reward_description",
      ),
      // In 0022 we intentionally store the badge emoji in icon_url.
      icon: textValue(row, "icon_url", "icon", "emoji") || "🏅",
      earned: earnedByRewardId.has(id),
    };
  });
}
function normalizeSkills(raw: unknown): SkillView[] {
  return toArray(raw)
    .map((item, index) => {
      const row = toRecord(item);

      const nestedCategory = toRecord(
        row.skill_category ?? row.category ?? row.skill
      );

      const label =
        textValue(
          row,
          "label",
          "name",
          "title",
          "skill_name",
          "skill_category_name",
          "category_name"
        ) ||
        textValue(nestedCategory, "name", "title", "label") ||
        `Skill ${index + 1}`;

      return {
        label,
        percentage: clamp(
          numberValue(
            row,
            "percentage",
            "score",
            "progress_percentage",
            "value"
          )
        ),
      };
    })
    .slice(0, 6);
}

function normalizeActivity(raw: unknown): ActivityView[] {
  return toArray(raw)
    .map((item, index) => {
      const row = toRecord(item);
      const eventType = textValue(row, "event_type", "type");

      return {
        id:
          textValue(row, "id", "event_id") ||
          `${eventType || "activity"}-${index}`,
        title:
          textValue(row, "title", "label", "action", "event_name") ||
          (eventType
            ? eventType.replaceAll("_", " ").replace(/\b\w/g, (c) =>
                c.toUpperCase(),
              )
            : "Learning activity"),
        description: textValue(
          row,
          "description",
          "message",
          "subtitle",
          "detail",
        ),
        timestamp:
          textValue(
            row,
            "created_at",
            "occurred_at",
            "event_at",
            "completed_at",
          ) || null,
      };
    })
    .slice(0, 8);
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="text-2xl lg:text-3xl font-bold text-white">
        {value}
        {suffix && (
          <span className="text-sm ml-1 text-amber-300">{suffix}</span>
        )}
      </p>
    </div>
  );
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    setLoading(true);
    setPageError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be signed in to view progress.");
      }

      const { data: dashboardResponse, error: dashboardError } =
        await supabase.rpc("get_user_dashboard");

      if (dashboardError) {
        throw dashboardError;
      }

      const dashboard = normalizeDashboard(dashboardResponse);

      const { data: rewardRows, error: rewardsError } = await supabase
        .from("rewards")
        .select(
          "id, title, description, reward_type, icon_url, required_condition, xp_bonus, created_at",
        )
        .order("created_at", { ascending: true });

      if (rewardsError) {
        throw rewardsError;
      }

      const { data: earnedRewardRows, error: earnedRewardsError } =
        await supabase
          .from("user_rewards")
          .select("reward_id, earned_at")
          .eq("user_id", user.id);

      if (earnedRewardsError) {
        throw earnedRewardsError;
      }

      const { data: unitRows, error: unitsError } = await supabase
        .from("units")
        .select(
          `
          id,
          title,
          unit_order,
          lessons (
            id,
            title,
            lesson_order,
            is_published
          )
        `,
        )
        .eq("is_published", true)
        .order("unit_order", { ascending: true });

      if (unitsError) {
        throw unitsError;
      }

      const normalizedUnits: UnitRow[] = (unitRows ?? []).map((unit) => {
        const lessons = Array.isArray(unit.lessons)
          ? unit.lessons
              .filter((lesson) => lesson.is_published)
              .sort((a, b) => a.lesson_order - b.lesson_order)
          : [];

        return {
          id: unit.id,
          title: unit.title,
          unit_order: unit.unit_order,
          lessons,
        };
      });

      const publishedLessonIds = normalizedUnits.flatMap((unit) =>
        unit.lessons.map((lesson) => lesson.id),
      );

      let completedLessonIds = new Set<string>();

      if (publishedLessonIds.length > 0) {
        const { data: completedRows, error: completedError } = await supabase
          .from("user_lesson_progress")
          .select("lesson_id")
          .eq("user_id", user.id)
          .eq("status", "COMPLETED")
          .in("lesson_id", publishedLessonIds);

        if (completedError) {
          throw completedError;
        }

        completedLessonIds = new Set(
          (completedRows ?? []).map((row) => row.lesson_id),
        );
      }

      const units: UnitProgress[] = normalizedUnits.map((unit) => {
        const lessonCount = unit.lessons.length;
        const completedCount = unit.lessons.filter((lesson) =>
          completedLessonIds.has(lesson.id),
        ).length;

        return {
          id: unit.id,
          title: unit.title,
          lessonCount,
          completedCount,
          percentage:
            lessonCount > 0
              ? Math.round((completedCount / lessonCount) * 100)
              : 0,
        };
      });

      const currentLevel = toRecord(dashboard.current_level);
      const currentUnit = toRecord(dashboard.current_unit);

      const dailyGoalMinutes = Math.max(
        1,
        numberValue(dashboard, "daily_goal_minutes") || 30,
      );

      setProgress({
        totalXp: numberValue(dashboard, "total_xp"),
        currentStreak: numberValue(dashboard, "current_streak"),
        longestStreak: numberValue(dashboard, "longest_streak"),
        totalLessons:
          numberValue(dashboard, "total_lessons") ||
          publishedLessonIds.length,
        completedLessons:
          numberValue(dashboard, "completed_lessons") ||
          completedLessonIds.size,
        overallProgress: clamp(
          numberValue(dashboard, "overall_progress_percentage"),
        ),
        dailyGoalMinutes,
        timeStudiedTodaySeconds: numberValue(
          dashboard,
          "time_studied_today_seconds",
        ),
        totalTimeStudiedSeconds: numberValue(
          dashboard,
          "total_time_studied_seconds",
        ),
        currentLevelTitle:
          textValue(currentLevel, "title", "name") ||
          textValue(dashboard, "current_level_title") ||
          "Current Level",
        currentUnitTitle:
          textValue(currentUnit, "title", "name") ||
          textValue(dashboard, "current_unit_title"),
        units,
        rewards: normalizeRewardsFromDatabase(
          rewardRows,
          earnedRewardRows,
        ),
        skills: normalizeSkills(dashboard.skills_breakdown),
        recentActivity: normalizeActivity(dashboard.recent_activity),
      });
    } catch (error) {
      console.error("Could not load progress page:", error);
      setPageError(
        error instanceof Error
          ? error.message
          : "Could not load your progress.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);



  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (pageError || !progress) {
    return (
      <div className="py-20 text-center">
        <XCircle className="mx-auto h-10 w-10 text-red-300" />
        <h1 className="mt-4 text-2xl font-bold text-white">
          Progress could not be loaded
        </h1>
        <p className="mt-2 text-sm text-amber-200/70">
          {pageError ?? "Please try again."}
        </p>
        <button
          type="button"
          onClick={() => void loadProgress()}
          className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  const completionPercentage =
    progress.totalLessons > 0
      ? Math.round(
          (progress.completedLessons / progress.totalLessons) * 100,
        )
      : progress.overallProgress;

  const todayGoalSeconds = progress.dailyGoalMinutes * 60;
  const todayGoalPercentage =
    todayGoalSeconds > 0
      ? clamp(
          (progress.timeStudiedTodaySeconds / todayGoalSeconds) * 100,
        )
      : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Your Progress
        </h1>
        <p className="text-amber-200/70 mt-1">
          Track your real learning activity and achievements
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Total XP"
          value={progress.totalXp}
          icon={Star}
          color="text-amber-400"
        />
        <StatCard
          label="Day Streak"
          value={progress.currentStreak}
          suffix=" days"
          icon={Flame}
          color="text-orange-400"
        />
        <StatCard
          label="Course"
          value={`${completionPercentage}%`}
          icon={Trophy}
          color="text-emerald-400"
        />
        <StatCard
          label="Completed"
          value={`${progress.completedLessons}/${progress.totalLessons}`}
          suffix=" lessons"
          icon={CheckCircle2}
          color="text-emerald-400"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-400" />
                    <h2 className="text-lg font-semibold text-white">
                      {progress.currentLevelTitle}
                    </h2>
                  </div>

                  {progress.currentUnitTitle && (
                    <p className="mt-1 text-sm text-amber-200/55">
                      {progress.currentUnitTitle}
                    </p>
                  )}
                </div>

                <span className="text-sm font-semibold text-amber-300">
                  {completionPercentage}% complete
                </span>
              </div>

              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <p className="text-sm text-amber-200/60">
                {progress.completedLessons} of {progress.totalLessons} published
                lessons completed
              </p>
            </div>
          </motion.div>

          {/* Milestone Badges — definitions and earned state come from Supabase */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                Milestone Badges
              </h2>

              <p className="text-sm text-amber-200/55 mb-4">
                Badges are awarded automatically when you reach their backend-defined milestones.
              </p>

              {progress.rewards.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {progress.rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border transition ${
                        reward.earned
                          ? "bg-emerald-500/20 border-emerald-400/30"
                          : "bg-white/5 border-white/10 opacity-60"
                      }`}
                    >
                      <div className="text-2xl shrink-0">{reward.icon}</div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`font-medium ${
                              reward.earned ? "text-white" : "text-white/65"
                            }`}
                          >
                            {reward.label}
                          </p>

                          {reward.earned ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                          ) : (
                            <span className="text-[10px] uppercase tracking-wide text-white/35">
                              Locked
                            </span>
                          )}
                        </div>

                        {reward.description && (
                          <p className="text-xs text-amber-200/50 mt-1 leading-5">
                            {reward.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-amber-200/55">
                  No badge definitions are available yet.
                </p>
              )}
            </div>
          </motion.div>

          {/* Unit Progress */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-400" />
                Unit Progress
              </h2>

              {progress.units.length > 0 ? (
                <div className="space-y-5">
                  {progress.units.map((unit) => (
                    <div key={unit.id}>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-sm font-medium text-white">
                          {unit.title}
                        </span>
                        <span className="text-xs text-amber-300/70 shrink-0">
                          {unit.completedCount}/{unit.lessonCount} lessons
                        </span>
                      </div>

                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${unit.percentage}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-amber-200/60">
                  No published units are available yet.
                </p>
              )}
            </div>
          </motion.div>

          {/* Skill Progress */}
          {progress.skills.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                  Skill Progress
                </h2>

                <div className="space-y-4">
                  {progress.skills.map((skill, index) => (
                    <div key={`${skill.label}-${index}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/80">
                          {skill.label}
                        </span>
                        <span className="text-sm font-semibold text-amber-300">
                          {Math.round(skill.percentage)}%
                        </span>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Streak */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">
                  Study Streak
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-orange-500/10 border border-orange-400/20 p-4 text-center">
                  <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {progress.currentStreak}
                  </p>
                  <p className="text-xs text-amber-200/55 mt-1">
                    Current streak
                  </p>
                </div>

                <div className="rounded-xl bg-amber-500/10 border border-amber-400/20 p-4 text-center">
                  <Trophy className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {progress.longestStreak}
                  </p>
                  <p className="text-xs text-amber-200/55 mt-1">
                    Longest streak
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Daily Goal */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-400" />
                  <h2 className="text-lg font-semibold text-white">
                    Today&apos;s Goal
                  </h2>
                </div>
                <span className="text-sm font-bold text-white">
                  {Math.round(todayGoalPercentage)}%
                </span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${todayGoalPercentage}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <p className="text-xs text-amber-300/60 mt-3">
                {formatDuration(progress.timeStudiedTodaySeconds)} of{" "}
                {progress.dailyGoalMinutes}m studied today
              </p>
            </div>
          </motion.div>

          {/* Study Time */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">
                  Study Time
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/60">Today</span>
                  <span className="text-sm font-semibold text-white">
                    {formatDuration(progress.timeStudiedTodaySeconds)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/60">All time</span>
                  <span className="text-sm font-semibold text-white">
                    {formatDuration(progress.totalTimeStudiedSeconds)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Earned Badges */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">
                  Earned Badges
                </h2>
              </div>

              {progress.rewards.filter((reward) => reward.earned).length > 0 ? (
                <div className="space-y-3">
                  {progress.rewards
                    .filter((reward) => reward.earned)
                    .map((reward) => (
                      <div
                        key={reward.id}
                        className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{reward.icon}</span>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white">
                              {reward.label}
                            </p>

                            {reward.description && (
                              <p className="mt-1 text-xs text-white/45">
                                {reward.description}
                              </p>
                            )}
                          </div>

                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-amber-200/55">
                  You have not earned a badge yet. Complete learning milestones
                  and your badges will appear here automatically.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">
              Recent Activity
            </h2>
          </div>

          {progress.recentActivity.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {progress.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="mt-1 text-xs leading-5 text-white/50">
                          {activity.description}
                        </p>
                      )}
                      {activity.timestamp && (
                        <p className="mt-2 text-[11px] text-amber-300/45">
                          {formatActivityTime(activity.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-amber-200/55">
              Your completed lessons, goals and achievements will appear here.
            </p>
          )}
        </div>
      </motion.div>

      {/* Completion Badge */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 border border-amber-400/30">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm text-amber-300">
            {completionPercentage}% Complete • Keep going!
          </span>
          <Sparkles className="h-4 w-4 text-amber-400" />
        </div>
      </motion.div>
    </motion.div>
  );
}
