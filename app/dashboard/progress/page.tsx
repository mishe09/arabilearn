'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { ALL_LESSONS, UNITS } from '@/data/lessons';
import {
  Trophy,
  Flame,
  Star,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Clock,
  CheckCircle2,
  Lock,
  Crown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function ProgressPage() {
  const { user } = useAuth();
  const { xp, streak, completedLessons } = useProgress();
  const [streakHistory, setStreakHistory] = useState<boolean[]>([]);
  const [dailyXpHistory, setDailyXpHistory] = useState<number[]>([]);

  // Calculate statistics
  const totalLessons = Object.keys(ALL_LESSONS).length;
  const completedCount = completedLessons.length;
  const completionPercentage = (completedCount / totalLessons) * 100;
  
  // Current level calculation (100 XP per level)
  const currentLevel = Math.floor((xp || 0) / 100) + 1;
  const currentLevelXp = (xp || 0) % 100;
  const xpToNextLevel = 100 - currentLevelXp;
  
  // Premium lessons info
  const premiumLessons = Object.values(ALL_LESSONS).filter(l => l.isPremium);
  const completedPremium = premiumLessons.filter(l => completedLessons.includes(l.id)).length;
  
  // Generate mock streak history (last 30 days)
  useEffect(() => {
    const mockStreakHistory = [];
    const mockXpHistory = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Simulate activity (more active in last 5 days)
      const isActive = i < (streak || 5) ? true : Math.random() > 0.7;
      mockStreakHistory.push(isActive);
      
      // Simulate XP earned per day
      const xpEarned = isActive ? Math.floor(Math.random() * 50) + 10 : 0;
      mockXpHistory.push(xpEarned);
    }
    
    setStreakHistory(mockStreakHistory);
    setDailyXpHistory(mockXpHistory);
  }, [streak]);

  // XP milestones
  const milestones = [
    { xp: 100, title: 'Bronze Learner', achieved: (xp || 0) >= 100, icon: '🥉' },
    { xp: 500, title: 'Silver Scholar', achieved: (xp || 0) >= 500, icon: '🥈' },
    { xp: 1000, title: 'Gold Speaker', achieved: (xp || 0) >= 1000, icon: '🥇' },
    { xp: 2000, title: 'Platinum Pro', achieved: (xp || 0) >= 2000, icon: '💎' },
    { xp: 5000, title: 'Legendary Linguist', achieved: (xp || 0) >= 5000, icon: '👑' },
  ];

  const nextMilestone = milestones.find(m => !m.achieved);
  const xpToNextMilestone = nextMilestone ? nextMilestone.xp - (xp || 0) : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Your Progress</h1>
        <p className="text-amber-200/70 mt-1">
          Track your learning journey and celebrate your achievements
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total XP', value: xp || 0, icon: Star, color: 'text-amber-400', suffix: '' },
          { label: 'Day Streak', value: streak || 0, icon: Flame, color: 'text-orange-400', suffix: ' days' },
          { label: 'Level', value: currentLevel, icon: Trophy, color: 'text-emerald-400', suffix: '' },
          { label: 'Completed', value: `${completedCount}/${totalLessons}`, icon: CheckCircle2, color: 'text-emerald-400', suffix: ' lessons' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-white">
                {stat.value}
                {stat.suffix && <span className="text-sm ml-1 text-amber-300">{stat.suffix}</span>}
              </p>
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Progress Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* XP Progress Bar */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <h2 className="text-lg font-semibold text-white">Level {currentLevel}</h2>
                </div>
                <span className="text-sm text-amber-300">{currentLevelXp}/100 XP</span>
              </div>
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentLevelXp}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-sm text-amber-200/60">
                {xpToNextLevel} XP until Level {currentLevel + 1}
              </p>
            </div>
          </motion.div>

          {/* XP Milestones */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                XP Milestones
              </h2>
              <div className="space-y-3">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.xp}
                    className={`flex items-center gap-3 p-3 rounded-xl transition ${
                      milestone.achieved
                        ? 'bg-emerald-500/20 border border-emerald-400/30'
                        : 'bg-white/5 border border-white/10 opacity-60'
                    }`}
                  >
                    <div className="text-2xl">{milestone.icon}</div>
                    <div className="flex-1">
                      <p className={`font-medium ${milestone.achieved ? 'text-white' : 'text-white/60'}`}>
                        {milestone.title}
                      </p>
                      <p className="text-xs text-amber-300/50">{milestone.xp} XP required</p>
                    </div>
                    {milestone.achieved ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Lock className="h-5 w-5 text-white/30" />
                    )}
                  </div>
                ))}
              </div>
              {nextMilestone && !nextMilestone.achieved && (
                <p className="text-sm text-amber-300/60 mt-4 text-center">
                  {xpToNextMilestone} XP until {nextMilestone.title}
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
              <div className="space-y-4">
                {UNITS.filter(unit => unit.lessons.length > 0).map((unit) => {
                  const unitLessons = unit.lessons;
                  const completedInUnit = unitLessons.filter(l => completedLessons.includes(l.id)).length;
                  const unitProgress = (completedInUnit / unitLessons.length) * 100;
                  
                  return (
                    <div key={unit.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{unit.title}</span>
                          {unit.isPremium && !user?.hasPremium && (
                            <Crown className="h-3 w-3 text-amber-400" />
                          )}
                        </div>
                        <span className="text-xs text-amber-300/70">
                          {completedInUnit}/{unitLessons.length} lessons
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            unit.isPremium && !user?.hasPremium
                              ? 'bg-amber-500/50'
                              : 'bg-gradient-to-r from-emerald-400 to-amber-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${unitProgress}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Streak & Activity */}
        <div className="space-y-6">
          {/* Streak Calendar */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <h2 className="text-lg font-semibold text-white">Streak</h2>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-xl font-bold text-white">{streak || 0}</span>
                  <span className="text-xs text-amber-300">days</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-xs text-amber-300/50 py-1">
                    {day}
                  </div>
                ))}
                {streakHistory.slice(-28).map((active, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-md transition-all ${
                      active
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                        : 'bg-white/10'
                    }`}
                    title={active ? 'Active day' : 'No activity'}
                  />
                ))}
              </div>
              <p className="text-xs text-amber-300/50 text-center">
                Last 28 days • Keep your streak alive!
              </p>
            </div>
          </motion.div>

          {/* Weekly XP Chart */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Weekly XP</h2>
              </div>
              <div className="flex items-end justify-around h-32 gap-2">
                {dailyXpHistory.slice(-7).map((xpEarned, idx) => {
                  const height = Math.min((xpEarned / 100) * 100, 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        className="w-full bg-gradient-to-t from-amber-400 to-orange-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{ height: `${height}%`, minHeight: xpEarned > 0 ? 4 : 0 }}
                      />
                      <span className="text-[10px] text-amber-300/50">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-amber-300/50 text-center mt-4">
                XP earned this week
              </p>
            </div>
          </motion.div>

          {/* Premium Progress */}
          {!user?.hasPremium && (
            <motion.div variants={itemVariants}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="h-5 w-5 text-white" />
                    <span className="text-sm font-semibold text-white/90">Premium Content</span>
                  </div>
                  <p className="text-white font-bold mb-1">
                    {completedPremium}/{premiumLessons.length} Premium Lessons Completed
                  </p>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(completedPremium / premiumLessons.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-orange-100 text-sm mb-4">
                    Upgrade to unlock {premiumLessons.length - completedPremium} more lessons
                  </p>
                  <Link
                    href="/dashboard/subscription"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition"
                  >
                    <Sparkles className="h-4 w-4" />
                    Upgrade to Premium
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Achievement */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
              <Clock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Next Achievement</h3>
              <p className="text-sm text-amber-300/70">
                {nextMilestone ? nextMilestone.title : 'Max Level Reached!'}
              </p>
              <p className="text-xs text-amber-300/50 mt-2">
                {nextMilestone && !nextMilestone.achieved
                  ? `${xpToNextMilestone} XP remaining`
                  : 'Congratulations! You are a master!'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Completion Badge */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 border border-amber-400/30">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm text-amber-300">
            {completionPercentage.toFixed(0)}% Complete • Keep going! You're doing great
          </span>
          <Sparkles className="h-4 w-4 text-amber-400" />
        </div>
      </motion.div>
    </motion.div>
  );
}