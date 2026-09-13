// 'use client';

// import { useCallback, useEffect, useMemo, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   ArrowRight,
//   Award,
//   BarChart3,
//   BookOpen,
//   CheckCircle2,
//   Clock3,
//   Flame,
//   Loader2,
//   Play,
//   RefreshCw,
//   Star,
//   Target,
//   Trophy,
// } from 'lucide-react';

// import { createClient } from '@/lib/supabase/client';

// type DashboardLesson = {
//   id: string;
//   title: string;
//   lesson_type: string | null;
//   estimated_minutes: number | null;
//   xp_reward: number | null;
//   lesson_order?: number;
//   unit_id: string;
//   unit_title: string;
//   unit_order?: number;
//   level_id: string;
//   level_title: string;
//   level_order?: number;
//   progress_percentage?: number;
//   status?: string;
// };

// type ResumeLesson = DashboardLesson & {
//   time_spent_seconds: number;
//   last_content_block_id: string | null;
//   last_content_block_order: number | null;
//   last_activity_at: string | null;
// };

// type DashboardData = {
//   full_name: string | null;
//   timezone: string | null;
//   total_xp: number;
//   current_streak: number;
//   longest_streak: number;
//   daily_goal_minutes: number;
//   time_studied_today_seconds: number;
//   total_time_studied_seconds: number;
//   today_goal: {
//     goal_minutes: number;
//     minutes_completed: number;
//     seconds_completed?: number;
//     goal_met: boolean;
//   };
//   total_units_count: number;
//   completed_units_count: number;
//   total_lessons_count: number;
//   completed_lessons_count: number;
//   overall_progress_percentage: number;
//   current_level: {
//     id: string;
//     title: string;
//     level_order: number;
//   } | null;
//   current_unit: {
//     id: string;
//     title: string;
//     unit_order: number;
//     completed_lessons_count: number;
//     total_lessons_count: number;
//     progress_percentage: number;
//   } | null;
//   resume_lesson: ResumeLesson | null;
//   next_recommended_lessons: DashboardLesson[];
//   recent_completed_lessons: Array<{
//     id: string;
//     title: string;
//     unit_title: string;
//     xp_earned: number;
//     completed_at: string | null;
//   }>;
//   rewards: Array<{
//     id: string;
//     title: string;
//     description: string | null;
//     reward_type: string;
//     icon_url: string | null;
//     earned_at: string;
//   }>;
//   skills_breakdown: Array<{
//     id: string;
//     skill: string;
//     xp_earned: number;
//     completed_lessons: number;
//     progress_percentage: number;
//   }>;
//   recent_activity: Array<{
//     id: string;
//     event_type: string;
//     source_type: string;
//     reference_id: string | null;
//     title: string;
//     description: string;
//     xp_amount: number;
//     metadata: Record<string, unknown>;
//     created_at: string;
//   }>;
// };

// function clampPercent(value: number | null | undefined) {
//   return Math.max(0, Math.min(100, Number(value ?? 0)));
// }

// function formatDuration(seconds: number | null | undefined) {
//   const safeSeconds = Math.max(0, Number(seconds ?? 0));
//   const hours = Math.floor(safeSeconds / 3600);
//   const minutes = Math.floor((safeSeconds % 3600) / 60);

//   if (hours > 0) return `${hours}h ${minutes}m`;
//   return `${minutes}m`;
// }

// function StatCard({
//   icon: Icon,
//   label,
//   value,
//   note,
// }: {
//   icon: React.ElementType;
//   label: string;
//   value: string | number;
//   note?: string;
// }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//       <div className="flex items-center gap-2 text-white/45">
//         <Icon className="h-4 w-4 text-amber-400" />
//         <span className="text-[11px] font-semibold uppercase tracking-widest">{label}</span>
//       </div>
//       <p className="mt-3 text-3xl font-bold text-white">{value}</p>
//       {note && <p className="mt-1 text-xs text-white/35">{note}</p>}
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [dashboard, setDashboard] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadDashboard = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const supabase = createClient();
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) throw userError;

//       if (!user) {
//         router.replace('/');
//         return;
//       }

//       const { data, error: dashboardError } = await supabase.rpc('get_user_dashboard');

//       if (dashboardError) {
//         console.error('get_user_dashboard error:', {
//           code: dashboardError.code,
//           message: dashboardError.message,
//           details: dashboardError.details,
//           hint: dashboardError.hint,
//         });
//         throw dashboardError;
//       }

//       setDashboard(data as DashboardData);
//     } catch (caughtError) {
//       console.error('Dashboard loading error:', caughtError);
//       setError(
//         caughtError instanceof Error
//           ? caughtError.message
//           : 'Could not load your dashboard.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [router]);

//   useEffect(() => {
//     void loadDashboard();
//   }, [loadDashboard]);

//   const activeLesson = dashboard?.resume_lesson ?? dashboard?.next_recommended_lessons?.[0] ?? null;
//   const isContinuing = Boolean(dashboard?.resume_lesson);

//   const upcomingLessons = useMemo(() => {
//     if (!dashboard) return [];
//     return dashboard.next_recommended_lessons
//       .filter((lesson) => lesson.id !== activeLesson?.id)
//       .slice(0, 4);
//   }, [activeLesson?.id, dashboard]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[65vh] items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-9 w-9 animate-spin text-amber-400" />
//           <p className="text-sm text-white/45">Loading your learning dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !dashboard) {
//     return (
//       <div className="flex min-h-[65vh] items-center justify-center">
//         <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
//           <h1 className="text-xl font-bold text-white">Dashboard could not be loaded</h1>
//           <p className="mt-2 text-sm text-white/50">{error ?? 'No dashboard data returned.'}</p>
//           <button
//             type="button"
//             onClick={() => void loadDashboard()}
//             className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const firstName = dashboard.full_name?.trim().split(/\s+/)[0] || 'Learner';
//   const courseProgress = clampPercent(dashboard.overall_progress_percentage);
//   const unitProgress = clampPercent(dashboard.current_unit?.progress_percentage);
//   const activeProgress = clampPercent(activeLesson?.progress_percentage);
//   const todaySeconds = Number(dashboard.time_studied_today_seconds ?? 0);
//   const goalSeconds = Math.max(1, Number(dashboard.daily_goal_minutes ?? 30) * 60);
//   const dailyGoalProgress = clampPercent((todaySeconds / goalSeconds) * 100);

//   return (
//     <div className="space-y-6 pb-12">
//       <div>
//         <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/70">
//           HausaArabia learner dashboard
//         </p>
//         <h1 className="mt-1 text-3xl font-bold text-white">Welcome back, {firstName}</h1>
//         <p className="mt-2 text-sm text-white/45">
//           Everything below comes from your real learning history.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
//         <StatCard
//           icon={Flame}
//           label="Day Streak"
//           value={dashboard.current_streak ?? 0}
//           note={`Longest: ${dashboard.longest_streak ?? 0} days`}
//         />
//         <StatCard icon={Star} label="Total XP" value={dashboard.total_xp ?? 0} />
//         <StatCard
//           icon={CheckCircle2}
//           label="Units Completed"
//           value={`${dashboard.completed_units_count ?? 0}/${dashboard.total_units_count ?? 0}`}
//           note="Published units only"
//         />
//         <StatCard
//           icon={Trophy}
//           label="Course Progress"
//           value={`${Math.round(courseProgress)}%`}
//           note={`${dashboard.completed_lessons_count ?? 0}/${dashboard.total_lessons_count ?? 0} lessons`}
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <div className="space-y-6 xl:col-span-2">
//           {activeLesson ? (
//             <Link href={`/dashboard/lessons/${activeLesson.id}`} className="group block">
//               <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 p-7 shadow-xl transition hover:shadow-emerald-500/20">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-300">
//                     {isContinuing ? 'Continue Learning' : 'Start Learning'}
//                   </span>
//                   <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">
//                     {activeLesson.unit_title}
//                   </span>
//                 </div>

//                 <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
//                   {activeLesson.title}
//                 </h2>

//                 <div className="mt-3 flex flex-wrap gap-4 text-sm text-emerald-100/65">
//                   <span className="inline-flex items-center gap-1.5">
//                     <Clock3 className="h-4 w-4" />
//                     {activeLesson.estimated_minutes ?? 0} min
//                   </span>
//                   <span className="inline-flex items-center gap-1.5">
//                     <Star className="h-4 w-4" />
//                     +{activeLesson.xp_reward ?? 0} XP
//                   </span>
//                 </div>

//                 <div className="mt-6 max-w-xl">
//                   <div className="mb-2 flex items-center justify-between text-xs text-emerald-100/60">
//                     <span>{isContinuing ? 'Your lesson progress' : 'Not started'}</span>
//                     <span className="font-bold text-amber-300">{Math.round(activeProgress)}%</span>
//                   </div>
//                   <div className="h-2 overflow-hidden rounded-full bg-white/15">
//                     <div
//                       className="h-full rounded-full bg-amber-400"
//                       style={{ width: `${activeProgress}%` }}
//                     />
//                   </div>
//                 </div>

//                 <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-800">
//                   <Play className="h-4 w-4 fill-current" />
//                   {isContinuing ? 'Continue Learning' : 'Start Learning'}
//                   <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
//                 </span>
//               </div>
//             </Link>
//           ) : (
//             <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
//               <BookOpen className="h-8 w-8 text-white/30" />
//               <h2 className="mt-4 text-xl font-bold text-white">Course completed</h2>
//               <p className="mt-2 text-sm text-white/45">There are no unfinished published lessons.</p>
//             </div>
//           )}

//           <section>
//             <div className="mb-3 flex items-center justify-between">
//               <h2 className="font-bold text-white">Upcoming Lessons</h2>
//               <Link href="/dashboard/lessons" className="text-xs font-semibold text-amber-400">
//                 View course
//               </Link>
//             </div>

//             {upcomingLessons.length > 0 ? (
//               <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//                 {upcomingLessons.map((lesson) => (
//                   <Link
//                     key={lesson.id}
//                     href={`/dashboard/lessons/${lesson.id}`}
//                     className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0 hover:bg-white/5"
//                   >
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10">
//                       <BookOpen className="h-4 w-4 text-amber-400" />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <p className="font-semibold text-white">{lesson.title}</p>
//                       <p className="mt-1 text-xs text-white/40">
//                         {lesson.unit_title} · {lesson.estimated_minutes ?? 0} min
//                       </p>
//                     </div>
//                     <ArrowRight className="h-4 w-4 text-white/25" />
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/40">
//                 No upcoming lessons right now.
//               </div>
//             )}
//           </section>

//           <section>
//             <h2 className="mb-3 font-bold text-white">Completed Lessons</h2>
//             {dashboard.recent_completed_lessons.length > 0 ? (
//               <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//                 {dashboard.recent_completed_lessons.map((lesson) => (
//                   <Link
//                     key={lesson.id}
//                     href={`/dashboard/lessons/${lesson.id}`}
//                     className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0 hover:bg-white/5"
//                   >
//                     <CheckCircle2 className="h-5 w-5 text-emerald-400" />
//                     <div className="min-w-0 flex-1">
//                       <p className="font-semibold text-white">{lesson.title}</p>
//                       <p className="mt-1 text-xs text-white/40">{lesson.unit_title}</p>
//                     </div>
//                     <span className="text-xs font-semibold text-emerald-400">+{lesson.xp_earned ?? 0} XP</span>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/40">
//                 Complete your first lesson and it will appear here.
//               </div>
//             )}
//           </section>

//           <section>
//             <h2 className="mb-3 font-bold text-white">Recent Activity</h2>
//             {dashboard.recent_activity.length > 0 ? (
//               <div className="space-y-2">
//                 {dashboard.recent_activity.map((activity) => (
//                   <div key={activity.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
//                     <div className="flex items-start justify-between gap-4">
//                       <div>
//                         <p className="text-sm font-medium text-white/85">{activity.title}</p>
//                         <p className="mt-1 text-xs text-white/35">
//                           {new Date(activity.created_at).toLocaleString()}
//                         </p>
//                       </div>
//                       {activity.xp_amount > 0 && (
//                         <span className="shrink-0 text-xs font-bold text-amber-400">+{activity.xp_amount} XP</span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/40">
//                 Your lesson, quiz, prayer and radio activity will appear here.
//               </div>
//             )}
//           </section>
//         </div>

//         <aside className="space-y-5">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//             <div className="flex items-center gap-2">
//               <Target className="h-5 w-5 text-amber-400" />
//               <h2 className="font-bold text-white">Today's Goal</h2>
//             </div>
//             <p className="mt-4 text-3xl font-bold text-white">
//               {formatDuration(todaySeconds)}
//               <span className="ml-1 text-sm font-normal text-white/35">/ 30m</span>
//             </p>
//             <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
//               <div className="h-full rounded-full bg-amber-400" style={{ width: `${dailyGoalProgress}%` }} />
//             </div>
//             <p className="mt-3 text-xs text-white/40">
//               {dashboard.today_goal?.goal_met
//                 ? 'Goal reached. +10 XP awarded for today.'
//                 : `${Math.max(0, 30 - Math.floor(todaySeconds / 60))} minutes remaining`}
//             </p>
//           </div>

//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//             <div className="flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-emerald-400" />
//               <h2 className="font-bold text-white">Current Course</h2>
//             </div>

//             {dashboard.current_unit ? (
//               <>
//                 <p className="mt-4 text-xs uppercase tracking-widest text-white/35">
//                   Unit {dashboard.current_unit.unit_order}
//                 </p>
//                 <h3 className="mt-1 text-lg font-bold text-white">{dashboard.current_unit.title}</h3>

//                 <div className="mt-4">
//                   <div className="mb-2 flex justify-between text-xs text-white/45">
//                     <span>Current unit</span>
//                     <span>{Math.round(unitProgress)}%</span>
//                   </div>
//                   <div className="h-2 overflow-hidden rounded-full bg-white/10">
//                     <div className="h-full rounded-full bg-emerald-400" style={{ width: `${unitProgress}%` }} />
//                   </div>
//                   <p className="mt-2 text-xs text-white/35">
//                     {dashboard.current_unit.completed_lessons_count}/{dashboard.current_unit.total_lessons_count} lessons completed
//                   </p>
//                 </div>

//                 <div className="mt-5 border-t border-white/10 pt-4">
//                   <div className="flex justify-between text-xs text-white/45">
//                     <span>Whole course</span>
//                     <span>{Math.round(courseProgress)}%</span>
//                   </div>
//                   <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
//                     <div className="h-full rounded-full bg-amber-400" style={{ width: `${courseProgress}%` }} />
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <p className="mt-4 text-sm text-white/40">No active unit.</p>
//             )}
//           </div>

//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//             <div className="flex items-center gap-2">
//               <Clock3 className="h-5 w-5 text-sky-400" />
//               <h2 className="font-bold text-white">Study Time</h2>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <div className="rounded-xl bg-white/5 p-3">
//                 <p className="text-xl font-bold text-white">{formatDuration(todaySeconds)}</p>
//                 <p className="mt-1 text-xs text-white/35">Today</p>
//               </div>
//               <div className="rounded-xl bg-white/5 p-3">
//                 <p className="text-xl font-bold text-white">{formatDuration(dashboard.total_time_studied_seconds)}</p>
//                 <p className="mt-1 text-xs text-white/35">All time</p>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//             <div className="flex items-center gap-2">
//               <Award className="h-5 w-5 text-amber-400" />
//               <h2 className="font-bold text-white">Rewards Earned</h2>
//             </div>
//             {dashboard.rewards.length > 0 ? (
//               <div className="mt-4 space-y-3">
//                 {dashboard.rewards.slice(0, 5).map((reward) => (
//                   <div key={reward.id} className="rounded-xl bg-white/5 p-3">
//                     <p className="text-sm font-semibold text-white">{reward.title}</p>
//                     {reward.description && <p className="mt-1 text-xs text-white/40">{reward.description}</p>}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="mt-4 text-sm text-white/40">No rewards earned yet.</p>
//             )}
//           </div>

//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//             <div className="flex items-center gap-2">
//               <BarChart3 className="h-5 w-5 text-indigo-400" />
//               <h2 className="font-bold text-white">Skill Breakdown</h2>
//             </div>
//             <div className="mt-4 space-y-4">
//               {dashboard.skills_breakdown.map((skill) => {
//                 const pct = clampPercent(skill.progress_percentage);
//                 return (
//                   <div key={skill.id}>
//                     <div className="mb-1.5 flex justify-between text-xs">
//                       <span className="text-white/65">{skill.skill}</span>
//                       <span className="font-semibold text-white/50">{Math.round(pct)}%</span>
//                     </div>
//                     <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
//                       <div className="h-full rounded-full bg-indigo-400" style={{ width: `${pct}%` }} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <p className="mt-4 text-xs leading-5 text-white/30">
//               These scores will be driven by tagged quiz questions. Until that assessment layer is added, new learners remain at 0%.
//             </p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Heart,
  Loader2,
  Play,
  RefreshCw,
  Star,
  Target,
  Trophy,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

type DashboardLesson = {
  id: string;
  title: string;
  lesson_type: string | null;
  estimated_minutes: number | null;
  xp_reward: number | null;
  lesson_order?: number;
  unit_id: string;
  unit_title: string;
  unit_order?: number;
  level_id: string;
  level_title: string;
  level_order?: number;
  progress_percentage?: number;
  status?: string;
};

type ResumeLesson = DashboardLesson & {
  time_spent_seconds: number;
  last_content_block_id: string | null;
  last_content_block_order: number | null;
  last_activity_at: string | null;
};

type DashboardData = {
  full_name: string | null;
  timezone: string | null;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  daily_goal_minutes: number;
  time_studied_today_seconds: number;
  total_time_studied_seconds: number;
  today_goal: {
    goal_minutes: number;
    minutes_completed: number;
    seconds_completed?: number;
    goal_met: boolean;
  };
  total_units_count: number;
  completed_units_count: number;
  total_lessons_count: number;
  completed_lessons_count: number;
  overall_progress_percentage: number;
  current_level: {
    id: string;
    title: string;
    level_order: number;
  } | null;
  current_unit: {
    id: string;
    title: string;
    unit_order: number;
    completed_lessons_count: number;
    total_lessons_count: number;
    progress_percentage: number;
  } | null;
  resume_lesson: ResumeLesson | null;
  next_recommended_lessons: DashboardLesson[];
  recent_completed_lessons: Array<{
    id: string;
    title: string;
    unit_title: string;
    xp_earned: number;
    completed_at: string | null;
  }>;
  rewards: Array<{
    id: string;
    title: string;
    description: string | null;
    reward_type: string;
    icon_url: string | null;
    earned_at: string;
  }>;
  skills_breakdown: Array<{
    id: string;
    skill: string;
    xp_earned: number;
    completed_lessons: number;
    progress_percentage: number;
  }>;
  recent_activity: Array<{
    id: string;
    event_type: string;
    source_type: string;
    reference_id: string | null;
    title: string;
    description: string;
    xp_amount: number;
    metadata: Record<string, unknown>;
    created_at: string;
  }>;
};

function clampPercent(value: number | null | undefined) {
  return Math.max(0, Math.min(100, Number(value ?? 0)));
}

function formatDuration(seconds: number | null | undefined) {
  const safeSeconds = Math.max(0, Number(seconds ?? 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-2 text-white/45">
        <Icon className="h-4 w-4 text-amber-400" />
        <span className="text-[11px] font-semibold uppercase tracking-widest">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {note && <p className="mt-1 text-xs text-white/35">{note}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        router.replace('/');
        return;
      }

      const { data, error: dashboardError } = await supabase.rpc('get_user_dashboard');

      if (dashboardError) {
        console.error('get_user_dashboard error:', {
          code: dashboardError.code,
          message: dashboardError.message,
          details: dashboardError.details,
          hint: dashboardError.hint,
        });
        throw dashboardError;
      }

      setDashboard(data as DashboardData);
    } catch (caughtError) {
      console.error('Dashboard loading error:', caughtError);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Could not load your dashboard.',
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const activeLesson = dashboard?.resume_lesson ?? dashboard?.next_recommended_lessons?.[0] ?? null;
  const isContinuing = Boolean(dashboard?.resume_lesson);

  const upcomingLessons = useMemo(() => {
    if (!dashboard) return [];
    return dashboard.next_recommended_lessons
      .filter((lesson) => lesson.id !== activeLesson?.id)
      .slice(0, 4);
  }, [activeLesson?.id, dashboard]);

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-amber-400" />
          <p className="text-sm text-white/45">Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-xl font-bold text-white">Dashboard could not be loaded</h1>
          <p className="mt-2 text-sm text-white/50">{error ?? 'No dashboard data returned.'}</p>
          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const firstName = dashboard.full_name?.trim().split(/\s+/)[0] || 'Learner';
  const courseProgress = clampPercent(dashboard.overall_progress_percentage);
  const unitProgress = clampPercent(dashboard.current_unit?.progress_percentage);
  const activeProgress = clampPercent(activeLesson?.progress_percentage);
  const todaySeconds = Number(dashboard.time_studied_today_seconds ?? 0);
  const goalSeconds = Math.max(1, Number(dashboard.daily_goal_minutes ?? 30) * 60);
  const dailyGoalProgress = clampPercent((todaySeconds / goalSeconds) * 100);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/70">
          HausaArabia learner dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold text-white">Welcome back, {firstName}</h1>
        <p className="mt-2 text-sm text-white/45">
          Everything below comes from your real learning history.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Flame}
          label="Day Streak"
          value={dashboard.current_streak ?? 0}
          note={`Longest: ${dashboard.longest_streak ?? 0} days`}
        />
        <StatCard icon={Star} label="Total XP" value={dashboard.total_xp ?? 0} />
        <StatCard
          icon={CheckCircle2}
          label="Units Completed"
          value={`${dashboard.completed_units_count ?? 0}/${dashboard.total_units_count ?? 0}`}
          note="Published units only"
        />
        <StatCard
          icon={Trophy}
          label="Course Progress"
          value={`${Math.round(courseProgress)}%`}
          note={`${dashboard.completed_lessons_count ?? 0}/${dashboard.total_lessons_count ?? 0} lessons`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {activeLesson ? (
            <Link href={`/dashboard/lessons/${activeLesson.id}`} className="group block">
              <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 p-7 shadow-xl transition hover:shadow-emerald-500/20">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-300">
                    {isContinuing ? 'Continue Learning' : 'Start Learning'}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">
                    {activeLesson.unit_title}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                  {activeLesson.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-emerald-100/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />
                    {activeLesson.estimated_minutes ?? 0} min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4" />
                    +{activeLesson.xp_reward ?? 0} XP
                  </span>
                </div>

                <div className="mt-6 max-w-xl">
                  <div className="mb-2 flex items-center justify-between text-xs text-emerald-100/60">
                    <span>{isContinuing ? 'Your lesson progress' : 'Not started'}</span>
                    <span className="font-bold text-amber-300">{Math.round(activeProgress)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${activeProgress}%` }}
                    />
                  </div>
                </div>

                <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-800">
                  <Play className="h-4 w-4 fill-current" />
                  {isContinuing ? 'Continue Learning' : 'Start Learning'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <BookOpen className="h-8 w-8 text-white/30" />
              <h2 className="mt-4 text-xl font-bold text-white">Course completed</h2>
              <p className="mt-2 text-sm text-white/45">There are no unfinished published lessons.</p>
            </div>
          )}

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-white">Upcoming Lessons</h2>
              <Link href="/dashboard/lessons" className="text-xs font-semibold text-amber-400">
                View course
              </Link>
            </div>

            {upcomingLessons.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {upcomingLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/lessons/${lesson.id}`}
                    className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0 hover:bg-white/5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10">
                      <BookOpen className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{lesson.title}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {lesson.unit_title} · {lesson.estimated_minutes ?? 0} min
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/25" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/40">
                No upcoming lessons right now.
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 font-bold text-white">Completed Lessons</h2>
            {dashboard.recent_completed_lessons.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {dashboard.recent_completed_lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/lessons/${lesson.id}`}
                    className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0 hover:bg-white/5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{lesson.title}</p>
                      <p className="mt-1 text-xs text-white/40">{lesson.unit_title}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">+{lesson.xp_earned ?? 0} XP</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/40">
                Complete your first lesson and it will appear here.
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 font-bold text-white">Recent Activity</h2>
            {dashboard.recent_activity.length > 0 ? (
              <div className="space-y-2">
                {dashboard.recent_activity.map((activity) => (
                  <div key={activity.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white/85">{activity.title}</p>
                        <p className="mt-1 text-xs text-white/35">
                          {new Date(activity.created_at).toLocaleString()}
                        </p>
                      </div>
                      {activity.xp_amount > 0 && (
                        <span className="shrink-0 text-xs font-bold text-amber-400">+{activity.xp_amount} XP</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/40">
                Your lesson, quiz, prayer and radio activity will appear here.
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-400" />
              <h2 className="font-bold text-white">Today's Goal</h2>
            </div>
            <p className="mt-4 text-3xl font-bold text-white">
              {formatDuration(todaySeconds)}
              <span className="ml-1 text-sm font-normal text-white/35">/ 30m</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${dailyGoalProgress}%` }} />
            </div>
            <p className="mt-3 text-xs text-white/40">
              {dashboard.today_goal?.goal_met
                ? 'Goal reached. +10 XP awarded for today.'
                : `${Math.max(0, 30 - Math.floor(todaySeconds / 60))} minutes remaining`}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <h2 className="font-bold text-white">Current Course</h2>
            </div>

            {dashboard.current_unit ? (
              <>
                <p className="mt-4 text-xs uppercase tracking-widest text-white/35">
                  Unit {dashboard.current_unit.unit_order}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{dashboard.current_unit.title}</h3>

                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-white/45">
                    <span>Current unit</span>
                    <span>{Math.round(unitProgress)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${unitProgress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-white/35">
                    {dashboard.current_unit.completed_lessons_count}/{dashboard.current_unit.total_lessons_count} lessons completed
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xs text-white/45">
                    <span>Whole course</span>
                    <span>{Math.round(courseProgress)}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${courseProgress}%` }} />
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-white/40">No active unit.</p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-sky-400" />
              <h2 className="font-bold text-white">Study Time</h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xl font-bold text-white">{formatDuration(todaySeconds)}</p>
                <p className="mt-1 text-xs text-white/35">Today</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xl font-bold text-white">{formatDuration(dashboard.total_time_studied_seconds)}</p>
                <p className="mt-1 text-xs text-white/35">All time</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-rose-300/15 bg-gradient-to-br from-rose-500/10 via-amber-400/5 to-emerald-500/10 p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-rose-400/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-400/10">
                  <Heart className="h-5 w-5 text-rose-300" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-200/60">
                    Support the mission
                  </p>
                  <h2 className="font-bold text-white">Support HausaArabia</h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/50">
                Help us keep Arabic learning accessible to more Hausa-speaking learners
                and continue improving the lessons and learning tools.
              </p>

              <Link
                href="/dashboard/donate"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-300/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Heart className="h-4 w-4 text-rose-300" />
                Make a Donation
                <ArrowRight className="h-4 w-4 text-white/45" />
              </Link>

              <p className="mt-3 text-center text-[10px] leading-4 text-white/25">
                Donations are voluntary and separate from Premium membership.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              <h2 className="font-bold text-white">Rewards Earned</h2>
            </div>
            {dashboard.rewards.length > 0 ? (
              <div className="mt-4 space-y-3">
                {dashboard.rewards.slice(0, 5).map((reward) => (
                  <div key={reward.id} className="rounded-xl bg-white/5 p-3">
                    <p className="text-sm font-semibold text-white">{reward.title}</p>
                    {reward.description && <p className="mt-1 text-xs text-white/40">{reward.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/40">No rewards earned yet.</p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              <h2 className="font-bold text-white">Skill Breakdown</h2>
            </div>
            <div className="mt-4 space-y-4">
              {dashboard.skills_breakdown.map((skill) => {
                const pct = clampPercent(skill.progress_percentage);
                return (
                  <div key={skill.id}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="text-white/65">{skill.skill}</span>
                      <span className="font-semibold text-white/50">{Math.round(pct)}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-indigo-400" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-white/30">
              These scores will be driven by tagged quiz questions. Until that assessment layer is added, new learners remain at 0%.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
