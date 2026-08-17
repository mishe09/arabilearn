'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ProgressContextType = {
  xp: number;
  streak: number;
  loading: boolean;
  addXp: (amount: number, lessonId: string) => void;
  completedLessons: string[];
  markLessonComplete: (lessonId: string, xpEarned: number) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEYS = {
  XP: 'arabic_xp',
  STREAK: 'arabic_streak',
  LAST_ACTIVE: 'arabic_last_active',
  COMPLETED_LESSONS: 'arabic_completed_lessons',
};

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const savedXp = localStorage.getItem(STORAGE_KEYS.XP);
    const savedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
    const savedLastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
    const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);

    if (savedXp) setXp(parseInt(savedXp, 10));
    else setXp(250); // Mock starting XP
    
    if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));
    else setCompletedLessons(['u1-l1', 'u1-l2']); // Mock completed lessons

    // Calculate streak
    const today = new Date().toDateString();
    if (savedLastActive === today) {
      if (savedStreak) setStreak(parseInt(savedStreak, 10));
      else setStreak(5);
    } else {
      setStreak(5); // Mock streak
    }
    
    setLoading(false);
  }, []);

  const addXp = (amount: number, lessonId: string) => {
    const newXp = xp + amount;
    setXp(newXp);
    localStorage.setItem(STORAGE_KEYS.XP, newXp.toString());
  };

  const markLessonComplete = (lessonId: string, xpEarned: number) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(newCompleted));
      
      // Add XP
      const newXp = xp + xpEarned;
      setXp(newXp);
      localStorage.setItem(STORAGE_KEYS.XP, newXp.toString());
      
      // Update streak
      const today = new Date().toDateString();
      const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
      let newStreak = streak;
      if (lastActive !== today) {
        newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem(STORAGE_KEYS.STREAK, newStreak.toString());
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, today);
      }
    }
  };

  return (
    <ProgressContext.Provider value={{ xp, streak, loading, addXp, completedLessons, markLessonComplete }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}