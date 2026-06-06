'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import {
  BookOpen,
  Crown,
  Lock,
  CheckCircle2,
  Star,
  Zap,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { UNITS, ALL_LESSONS } from '@/data/lessons';

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

export default function LessonsPage() {
  const { user } = useAuth();
  const { completedLessons } = useProgress();

  const getLessonStatus = (lessonId: string, isPremium: boolean) => {
    const isCompleted = completedLessons.includes(lessonId);
    const isLocked = isPremium && !user?.hasPremium;

    if (isCompleted) return 'completed';
    if (isLocked) return 'locked';
    return 'available';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Your Curriculum</h1>
        <p className="text-amber-200/70 mt-1">
          Master Arabic through structured lessons, vocabulary, and quizzes
        </p>
      </motion.div>

      {/* Units */}
      <div className="space-y-6">
        {UNITS.map((unit, unitIndex) => (
          <motion.div key={unit.id} variants={itemVariants}>
            {/* Unit Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                <span className="text-lg font-bold text-amber-400">{unitIndex + 1}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{unit.title}</h2>
                <p className="text-xs text-amber-200/50">
                  {unit.lessonCount} lessons • {unit.isPremium ? 'Premium' : 'Free'}
                </p>
              </div>
              {unit.isPremium && !user?.hasPremium && (
                <div className="ml-auto flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1">
                  <Crown className="h-3 w-3 text-amber-400" />
                  <span className="text-xs font-medium text-amber-300">Premium</span>
                </div>
              )}
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.lessons.map((lesson) => {
                const status = getLessonStatus(lesson.id, lesson.isPremium);
                
                return (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/lessons/${lesson.id}`}
                    className={`block rounded-2xl backdrop-blur-sm border transition-all hover:shadow-lg ${
                      status === 'completed'
                        ? 'bg-emerald-500/10 border-emerald-400/30'
                        : status === 'locked'
                        ? 'bg-white/5 border-white/10 cursor-not-allowed opacity-60'
                        : 'bg-white/10 border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : status === 'locked' ? (
                            <Lock className="h-5 w-5 text-amber-400/50" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-amber-400" />
                          )}
                          <span className="text-sm font-medium text-amber-300/80">
                            {lesson.xpReward} XP
                          </span>
                        </div>
                        {status === 'completed' && (
                          <span className="text-xs text-emerald-400">Completed</span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">{lesson.title}</h3>
                      <p className="text-sm text-amber-200/60 mb-4">
                        {lesson.vocabulary.length} words • {lesson.quiz.length} quiz questions
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-1">
                          {lesson.vocabulary.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-[10px] text-amber-300"
                            >
                              {lesson.vocabulary[i].hausa[0]}
                            </div>
                          ))}
                          {lesson.vocabulary.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] text-white/50">
                              +{lesson.vocabulary.length - 3}
                            </div>
                          )}
                        </div>
                        {status !== 'locked' && (
                          <div className="flex items-center gap-1 text-sm text-amber-400">
                            {status === 'completed' ? 'Review' : 'Start'}
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Upgrade Banner (if user doesn't have premium) */}
      {!user?.hasPremium && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Unlock Premium Units</h3>
                <p className="text-orange-100 text-sm">
                  Get access to Units 2-5 with advanced lessons and quizzes
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/subscription"
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade Now
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}