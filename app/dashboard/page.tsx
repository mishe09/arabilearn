
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import {
  Flame, Star, CheckCircle2, BookOpen, Zap, Target, Crown, Clock,
  ArrowRight, Sparkles, ChevronRight, Trophy, Calendar, Mic,
  TrendingUp, Users, Award, Play, Lock, BarChart3, Timer,
  MessageCircle, Headphones, PenTool, Brain, Coins, Gift,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
type Skill = { label: string; key: string; icon: React.ElementType; color: string; bg: string; pct: number };
type Reward = { id: string; icon: string; label: string; sub: string; xp: number; earned: boolean };
type Community = { name: string; action: string; time: string; avatar: string };

// ─── Constants ───────────────────────────────────────────
const LESSONS = [
  { id: 'u1-l1-greetings',  title: 'Basic Greetings', unit: 'Unit 1', xp: 50,  mins: 5,  completed: true  },
  { id: 'u1-l2-numbers',    title: 'Numbers 1–20',    unit: 'Unit 1', xp: 60,  mins: 7,  completed: true  },
  { id: 'u1-l3-colors',     title: 'Colors',           unit: 'Unit 1', xp: 55,  mins: 6,  completed: false },
  { id: 'u1-l4-nouns',      title: 'Simple Nouns',     unit: 'Unit 1', xp: 65,  mins: 8,  completed: false },
];

const COMMUNITY: Community[] = [
  { name: 'Aisha M.',  action: 'completed Unit 2 — Fluency Track', time: '2m ago',  avatar: 'AM' },
  { name: 'Yusuf K.',  action: 'hit a 14-day streak 🔥',           time: '18m ago', avatar: 'YK' },
  { name: 'Fatima R.', action: 'earned Pronunciation Master badge', time: '1h ago',  avatar: 'FR' },
  { name: 'Ibrahim O.','action': 'completed 3 units this week',      time: '3h ago',  avatar: 'IO' },
];

const REWARDS: Reward[] = [
  { id:'r1', icon:'🏅', label:'Complete 2 Lessons',       sub:'Earn 50 XP bonus',    xp:50,  earned: true  },
  { id:'r2', icon:'🎯', label:'3-Day Pronunciation Streak',sub:'Earn 100 XP bonus',  xp:100, earned: false },
  { id:'r3', icon:'⚡', label:'Finish a Unit',             sub:'Earn 150 XP bonus',   xp:150, earned: false },
  { id:'r4', icon:'🔥', label:'7-Day Study Streak',        sub:'Earn 200 XP bonus',   xp:200, earned: false },
];

const SKILLS: Skill[] = [
  { label:'Vocabulary',    key:'vocab', icon:BookOpen,   color:'text-amber-400',  bg:'bg-amber-400',  pct: 72 },
  { label:'Grammar',       key:'gram',  icon:PenTool,    color:'text-indigo-400', bg:'bg-indigo-400', pct: 45 },
  { label:'Pronunciation', key:'pron',  icon:Mic,        color:'text-emerald-400',bg:'bg-emerald-400',pct: 61 },
  { label:'Listening',     key:'list',  icon:Headphones, color:'text-rose-400',   bg:'bg-rose-400',   pct: 38 },
];

// ─── Helpers ─────────────────────────────────────────────
function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

function getMotivation(hour: number) {
  if (hour < 12) return 'Start strong — morning practice boosts retention by 40%.';
  if (hour < 17) return 'Afternoon focus time. Short bursts work best now.';
  if (hour < 21) return 'Evening is perfect for vocabulary review.';
  return 'Night owl? Even 5 minutes counts toward your streak.';
}

// ─── Sub-components ──────────────────────────────────────
const fade = { hidden: { opacity: 20, y: 18 }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, type: 'spring', stiffness: 90 } }) };

function StatCard({ icon: Icon, label, value, suffix, color }: { icon: React.ElementType; label: string; value: string | number; suffix?: string; color: string }) {
  return (
    <motion.div variants={fade} className="rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12 p-5 flex flex-col gap-3 hover:bg-white/12 transition-all">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-[2rem] font-bold text-white leading-none">
        {value}{suffix && <span className="text-sm font-normal text-white/40 ml-1">{suffix}</span>}
      </p>
    </motion.div>
  );
}

function SkillBar({ skill, i }: { skill: Skill; i: number }) {
  const Icon = skill.icon;
  return (
    <motion.div variants={fade} custom={i} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${skill.color}`} />
          <span className="text-sm font-medium text-white/80">{skill.label}</span>
        </div>
        <span className={`text-sm font-bold ${skill.color}`}>{skill.pct}%</span>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${skill.bg} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.pct}%` }}
          transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function RewardCard({ r, i }: { r: Reward; i: number }) {
  return (
    <motion.div
      variants={fade}
      custom={i}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
        r.earned
          ? 'bg-amber-400/10 border-amber-400/30'
          : 'bg-white/5 border-white/10 opacity-70'
      }`}
    >
      <span className="text-2xl">{r.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{r.label}</p>
        <p className="text-xs text-white/50 mt-0.5">{r.sub}</p>
      </div>
      <div className={`text-right shrink-0`}>
        {r.earned ? (
          <span className="flex items-center gap-1 text-amber-400 text-sm font-bold">
            <CheckCircle2 className="h-4 w-4" /> Done
          </span>
        ) : (
          <span className="flex items-center gap-1 te xt-white/40 text-sm font-semibold">
            <Star className="h-3.5 w-3.5" />+{r.xp} XP
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function DashboardPage() {
  console.log("Dashboard rendering");
  const { user } = useAuth();
  const { xp, streak, completedLessons, loading } = useProgress();

  console.log({
    user,
    xp,
    streak,
    loading,
    completedLessons,
  });

  const [now, setNow] = useState(new Date());
  const [dailyXp] = useState(32);
  const dailyGoal = 50;

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const hour = now.getHours();
  const greeting = getGreeting(hour);
  const motivation = getMotivation(hour);

  // Time display — user's local timezone
  const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const tzLabel = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ');

  const totalXP = xp || 250;
  const currentLevel = Math.floor(totalXP / 100) + 1;
  const nextLevelXp = currentLevel * 100;
  const xpProgress = (totalXP % 100) / 100;
  const dailyProgress = Math.min((dailyXp / dailyGoal) * 100, 100);

  // Dynamic next lesson
  const nextLesson = useMemo(() => LESSONS.find(l => !l.completed), []);
  const completedCount = LESSONS.filter(l => l.completed).length;
  const totalLessons = LESSONS.length;

  // Studied time (mock — replace with real tracking)
  const studiedHrs = 2;
  const studiedMins = 40;
  const practicedMins = 20;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="space-y-6 pb-12"
    >
      {/* ── Welcome Header ── */}
      <motion.div variants={fade} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-amber-400/70 uppercase tracking-widest mb-1">
            {timeLabel} · {tzLabel}
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            {greeting}, {user?.displayName?.split(' ')[0] || 'Learner'} 👋
          </h1>
          <p className="text-white/50 mt-1 text-sm max-w-md">{motivation}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 shrink-0">
          <Calendar className="h-3.5 w-3.5" />
          {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div variants={{ visible: { transition: { staggerChildren: 0.07 } } }} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Flame}      label="Day Streak"  value={streak || 5}  suffix="days"  color="text-orange-400" />
        <StatCard icon={Star}       label="Total XP"    value={totalXP}                      color="text-amber-400" />
        <StatCard icon={CheckCircle2} label="Completed" value={`${completedCount}/${totalLessons}`} color="text-emerald-400" />
        <StatCard icon={Trophy}     label="Level"       value={currentLevel}                 color="text-amber-400" />
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT — 2 cols */}
        <div className="lg:col-span-2 space-y-5">

          {/* Continue Learning — dynamic next lesson */}
          {nextLesson && (
            <motion.div variants={fade}>
              <Link href={`/dashboard/lessons/${nextLesson.id}`} className="block group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-6 transition-all group-hover:shadow-2xl group-hover:shadow-emerald-500/25">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.15),transparent_60%)]" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-amber-400/20 rounded-full text-[11px] font-semibold text-amber-300 uppercase tracking-widest backdrop-blur-sm">
                        Up Next · {nextLesson.unit}
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{nextLesson.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-emerald-200/70 mb-5">
                      <span className="flex items-center gap-1"><Timer className="h-3.5 w-3.5" />{nextLesson.mins} min</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />+{nextLesson.xp} XP</span>
                    </div>

                    {/* Lesson completion bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-emerald-200/60 mb-1.5">
                        <span>Unit progress</span>
                        <span>{completedCount}/{totalLessons} lessons</span>
                      </div>
                      <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${(completedCount / totalLessons) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold text-white group-hover:bg-white/30 transition-all">
                        <Play className="w-4 h-4 fill-white" />
                        Continue Learning
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-xs text-emerald-200/50">{nextLesson.mins} min remaining</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Incomplete Lessons — Quick Resume */}
          <motion.div variants={fade}>
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Lessons To Complete</h2>
            <div className="space-y-2">
              {LESSONS.filter(l => !l.completed).map((lesson, i) => (
                <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">{lesson.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{lesson.unit} · {lesson.mins} min · +{lesson.xp} XP</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/25 group-hover:text-amber-400 transition-colors shrink-0" />
                </Link>
              ))}
              {LESSONS.filter(l => !l.completed).length === 0 && (
                <p className="text-sm text-white/40 py-2">All lessons complete! 🎉</p>
              )}
            </div>
          </motion.div>

          {/* Past Lessons — Practice / Quiz */}
          <motion.div variants={fade}>
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Practice Past Lessons</h2>
            <div className="rounded-2xl bg-white/6 border border-white/10 divide-y divide-white/8 overflow-hidden">
              {LESSONS.filter(l => l.completed).map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-4 px-4 py-3.5 group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{lesson.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{lesson.unit} · Completed</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href={`/dashboard/lessons/${lesson.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white/8 text-xs font-semibold text-white/70 hover:bg-white/15 hover:text-white transition-all">
                      Review
                    </Link>
                    <Link href={`/dashboard/lessons/${lesson.id}?quiz=1`}
                      className="px-3 py-1.5 rounded-lg bg-amber-400/15 text-xs font-semibold text-amber-300 hover:bg-amber-400/25 transition-all">
                      Quiz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill Breakdown */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-white/6 border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="h-5 w-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Skill Breakdown</h2>
              </div>
              <div className="space-y-4">
                {SKILLS.map((s, i) => <SkillBar key={s.key} skill={s} i={i} />)}
              </div>
            </div>
          </motion.div>

          {/* Community Feed */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-white/6 border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white">Community</h2>
              </div>
              <div className="space-y-3">
                {COMMUNITY.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-black shrink-0">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80">
                        <span className="font-semibold text-white">{c.name}</span>{' '}
                        {c.action}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5">{c.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">

          {/* Daily Goal ring */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-white/6 border border-white/10 p-5 text-center">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Today's Goal</span>
              </div>
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="#F59E0B" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - dailyProgress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">{dailyXp}</p>
                  <p className="text-[10px] text-white/40">/ {dailyGoal} XP</p>
                </div>
              </div>
              <p className="text-xs text-white/50">
                {dailyProgress >= 100 ? '🎉 Goal achieved!' : `${dailyGoal - dailyXp} XP to reach your goal`}
              </p>
            </div>
          </motion.div>

          {/* Time Studied */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-white/6 border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">Time Studied</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: `${studiedHrs}h ${studiedMins}m`, label: 'Learned', color: 'text-amber-400' },
                  { val: `${practicedMins}m`,              label: 'Practiced', color: 'text-emerald-400' },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Level Progress */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-white/6 border border-white/10 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Level {currentLevel}</span>
                </div>
                <span className="text-xs text-white/40">{totalXP}/{nextLevelXp} XP</span>
              </div>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[11px] text-white/35 mt-2 text-center">
                {nextLevelXp - totalXP} XP until Level {currentLevel + 1}
              </p>
            </div>
          </motion.div>

          {/* Motivation — leaderboard position */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-700/20 border border-indigo-400/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-indigo-300" />
                <span className="text-sm font-bold text-white">You're on a roll!</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">Top 28%</p>
              <p className="text-xs text-indigo-200/60 mb-4">You're ahead of 72% of learners this week</p>
              <div className="h-px bg-white/10 mb-4" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <BookOpen className="h-3 w-3 text-amber-400" />
                </div>
                <p className="text-xs text-white/50">
                  <span className="text-amber-300 font-semibold">3 more lessons</span> to hit Conversational milestone
                </p>
              </div>
            </div>
          </motion.div>

          {/* Rewards */}
          <motion.div variants={fade}>
            <div className="rounded-2xl bg-white/6 border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold text-white">Rewards</span>
              </div>
              <div className="space-y-2.5">
                {REWARDS.map((r, i) => <RewardCard key={r.id} r={r} i={i} />)}
              </div>
            </div>
          </motion.div>

          {/* Premium */}
          {!user?.hasPremium && (
            <motion.div variants={fade}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-white" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">Premium</span>
                  </div>
                  <p className="text-base font-bold text-white mb-1">Unlock All Content</p>
                  <p className="text-orange-100 text-xs mb-4 leading-relaxed">
                    All units, advanced quizzes, pronunciation AI, and offline mode.
                  </p>
                  <Link
                    href="/dashboard/subscription"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-bold rounded-lg text-sm hover:bg-orange-50 transition-all shadow-lg"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

