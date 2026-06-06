// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { useProgress } from '@/contexts/ProgressContext';
// // import {
// //   ArrowLeft,
// //   Volume2,
// //   Lock,
// //   Crown,
// //   CheckCircle,
// //   XCircle,
// //   ChevronRight,
// //   ChevronLeft,
// //   Sparkles,
// //   Trophy,
// //   Loader2,
// // } from 'lucide-react';
// // import { ALL_LESSONS, type Lesson, type QuizQuestion } from '@/data/lessons';
// // import toast from 'react-hot-toast';

// // // Audio button component with speech synthesis
// // function AudioButton({ text, language }: { text: string; language: 'hausa' | 'arabic' }) {
// //   const [playing, setPlaying] = useState(false);

// //   const handlePlay = () => {
// //     if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
// //       toast.error('Audio not supported in this browser');
// //       return;
// //     }

// //     window.speechSynthesis.cancel();
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = language === 'hausa' ? 'ha' : 'ar-SA';
// //     utterance.rate = 0.8;
// //     utterance.onstart = () => setPlaying(true);
// //     utterance.onend = () => setPlaying(false);
// //     utterance.onerror = () => {
// //       setPlaying(false);
// //       toast.error('Audio playback failed');
// //     };
// //     window.speechSynthesis.speak(utterance);
// //   };

// //   return (
// //     <button
// //       onClick={handlePlay}
// //       disabled={playing}
// //       className={`p-2 rounded-lg transition-all ${
// //         playing
// //           ? 'bg-emerald-500/30 text-emerald-300'
// //           : 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30'
// //       }`}
// //     >
// //       <Volume2 className={`h-5 w-5 ${playing ? 'animate-pulse' : ''}`} />
// //     </button>
// //   );
// // }

// // // Quiz Modal Component
// // function QuizModal({
// //   quiz,
// //   onComplete,
// //   onClose,
// //   xpReward,
// // }: {
// //   quiz: QuizQuestion[];
// //   onComplete: () => void;
// //   onClose: () => void;
// //   xpReward: number;
// // }) {
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.length).fill(-1));
// //   const [showResults, setShowResults] = useState(false);
// //   const [submitted, setSubmitted] = useState(false);

// //   const currentQuestion = quiz[currentQuestionIndex];
// //   const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== -1;
// //   const isLastQuestion = currentQuestionIndex === quiz.length - 1;

// //   const handleSelectAnswer = (answerIndex: number) => {
// //     if (submitted) return;
// //     const newAnswers = [...selectedAnswers];
// //     newAnswers[currentQuestionIndex] = answerIndex;
// //     setSelectedAnswers(newAnswers);
// //   };

// //   const handleNext = () => {
// //     if (!hasSelectedAnswer) {
// //       toast.error('Please select an answer');
// //       return;
// //     }
// //     if (isLastQuestion) {
// //       setShowResults(true);
// //     } else {
// //       setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     }
// //   };

// //   const handlePrevious = () => {
// //     if (currentQuestionIndex > 0) {
// //       setCurrentQuestionIndex(currentQuestionIndex - 1);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     setSubmitted(true);
// //     const correctCount = selectedAnswers.filter(
// //       (answer, idx) => answer === quiz[idx].correctAnswer
// //     ).length;
// //     const percentage = (correctCount / quiz.length) * 100;

// //     if (percentage >= 70) {
// //       toast.success(`🎉 You passed! +${xpReward} XP earned`);
// //       onComplete();
// //     } else {
// //       toast.error(`You scored ${correctCount}/${quiz.length}. Need 70% to pass. Try again!`);
// //       setSubmitted(false);
// //       setShowResults(false);
// //       setCurrentQuestionIndex(0);
// //       setSelectedAnswers(new Array(quiz.length).fill(-1));
// //     }
// //   };

// //   const correctCount = selectedAnswers.filter(
// //     (answer, idx) => answer === quiz[idx].correctAnswer
// //   ).length;
// //   const percentage = (correctCount / quiz.length) * 100;
// //   const passed = percentage >= 70;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.9 }}
// //         className="relative w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
// //       >
// //         <div className="p-6">
// //           {/* Header */}
// //           <div className="flex items-center justify-between mb-6">
// //             <div className="flex items-center gap-2">
// //               <Trophy className="h-5 w-5 text-amber-400" />
// //               <span className="text-sm text-amber-300">
// //                 Question {currentQuestionIndex + 1} of {quiz.length}
// //               </span>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="p-1 rounded-lg text-white/50 hover:text-white transition"
// //             >
// //               <XCircle className="h-6 w-6" />
// //             </button>
// //           </div>

// //           {!showResults ? (
// //             <>
// //               {/* Question */}
// //               <h3 className="text-xl font-bold text-white mb-6">
// //                 {currentQuestion.question}
// //               </h3>

// //               {/* Options */}
// //               <div className="space-y-3 mb-8">
// //                 {currentQuestion.options.map((option, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={() => handleSelectAnswer(idx)}
// //                     className={`w-full text-left p-4 rounded-xl border transition-all ${
// //                       selectedAnswers[currentQuestionIndex] === idx
// //                         ? 'border-amber-400 bg-amber-400/20 text-amber-300'
// //                         : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
// //                     }`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>

// //               {/* Navigation */}
// //               <div className="flex justify-between">
// //                 <button
// //                   onClick={handlePrevious}
// //                   disabled={currentQuestionIndex === 0}
// //                   className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition"
// //                 >
// //                   <ChevronLeft className="h-4 w-4" />
// //                   Previous
// //                 </button>
// //                 <button
// //                   onClick={handleNext}
// //                   className="flex items-center gap-1 px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
// //                 >
// //                   {isLastQuestion ? 'Review Answers' : 'Next'}
// //                   <ChevronRight className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             </>
// //           ) : (
// //             <>
// //               {/* Results */}
// //               <div className="text-center mb-6">
// //                 <div className={`text-6xl mb-4 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
// //                   {passed ? '🎉' : '😅'}
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-white mb-2">
// //                   {passed ? 'Congratulations!' : 'Almost There!'}
// //                 </h3>
// //                 <p className="text-amber-200/70">
// //                   You scored {correctCount}/{quiz.length} ({Math.round(percentage)}%)
// //                 </p>
// //                 {!passed && (
// //                   <p className="text-sm text-amber-300/70 mt-2">
// //                     You need 70% to pass. Review the vocabulary and try again!
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Results breakdown */}
// //               <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
// //                 {quiz.map((q, idx) => (
// //                   <div
// //                     key={q.id}
// //                     className={`p-3 rounded-lg ${
// //                       selectedAnswers[idx] === q.correctAnswer
// //                         ? 'bg-emerald-500/20 border border-emerald-400/30'
// //                         : 'bg-red-500/20 border border-red-400/30'
// //                     }`}
// //                   >
// //                     <p className="text-sm text-white/90">{q.question}</p>
// //                     <p className="text-xs text-amber-300/70 mt-1">
// //                       Correct: {q.options[q.correctAnswer]}
// //                     </p>
// //                     <p className="text-xs text-white/50 mt-1">{q.explanation}</p>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Action buttons */}
// //               <div className="flex gap-3">
// //                 {!passed ? (
// //                   <button
// //                     onClick={() => {
// //                       setShowResults(false);
// //                       setCurrentQuestionIndex(0);
// //                       setSelectedAnswers(new Array(quiz.length).fill(-1));
// //                     }}
// //                     className="flex-1 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-500 transition"
// //                   >
// //                     Try Again
// //                   </button>
// //                 ) : (
// //                   <button
// //                     onClick={handleSubmit}
// //                     className="flex-1 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
// //                   >
// //                     Claim XP & Continue
// //                   </button>
// //                 )}
// //                 <button
// //                   onClick={onClose}
// //                   className="px-6 py-3 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default function LessonPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const { user } = useAuth();
// //   const { completedLessons, markLessonComplete } = useProgress();
  
// //   const lessonId = params.lessonId as string;
// //   const lesson: Lesson | undefined = ALL_LESSONS[lessonId];
  
// //   const [showQuiz, setShowQuiz] = useState(false);
// //   const [lessonCompleted, setLessonCompleted] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (lesson) {
// //       setLessonCompleted(completedLessons.includes(lesson.id));
// //       setLoading(false);
// //     }
// //   }, [lesson, completedLessons]);

// //   // Check if lesson is premium and user doesn't have premium
// //   const isLocked = lesson?.isPremium && !user?.hasPremium;

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (!lesson) {
// //     return (
// //       <div className="text-center py-20">
// //         <h1 className="text-2xl font-bold text-white">Lesson Not Found</h1>
// //         <p className="text-amber-200/70 mt-2">The lesson you're looking for doesn't exist.</p>
// //         <Link
// //           href="/dashboard/lessons"
// //           className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition"
// //         >
// //           <ArrowLeft className="h-4 w-4" />
// //           Back to Lessons
// //         </Link>
// //       </div>
// //     );
// //   }

// //   if (isLocked) {
// //     return (
// //       <div className="text-center py-20 max-w-md mx-auto">
// //         <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
// //           <Lock className="h-10 w-10 text-amber-400" />
// //         </div>
// //         <h1 className="text-2xl font-bold text-white mb-2">Premium Lesson</h1>
// //         <p className="text-amber-200/70 mb-6">
// //           This lesson is part of our premium curriculum. Upgrade to unlock all units and lessons.
// //         </p>
// //         <Link
// //           href="/dashboard/subscription"
// //           className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
// //         >
// //           <Crown className="h-4 w-4" />
// //           Upgrade to Premium
// //         </Link>
// //         <div className="mt-4">
// //           <Link
// //             href="/dashboard/lessons"
// //             className="inline-flex items-center gap-1 text-sm text-amber-300/70 hover:text-amber-300 transition"
// //           >
// //             <ArrowLeft className="h-3 w-3" />
// //             Back to Lessons
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const handleComplete = () => {
// //     markLessonComplete(lesson.id, lesson.xpReward);
// //     setLessonCompleted(true);
// //     setShowQuiz(false);
// //     toast.success(`🎉 Lesson complete! +${lesson.xpReward} XP`);
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       {/* Header */}
// //       <div className="mb-6">
// //         <Link
// //           href="/dashboard/lessons"
// //           className="inline-flex items-center gap-1 text-sm text-amber-300/70 hover:text-amber-300 transition mb-4"
// //         >
// //           <ArrowLeft className="h-4 w-4" />
// //           Back to Lessons
// //         </Link>
// //         <div className="flex items-center gap-2 mb-2">
// //           <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-medium">
// //             {lesson.unitTitle}
// //           </span>
// //           {lessonCompleted && (
// //             <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-medium flex items-center gap-1">
// //               <CheckCircle className="h-3 w-3" />
// //               Completed
// //             </span>
// //           )}
// //         </div>
// //         <h1 className="text-2xl lg:text-3xl font-bold text-white">{lesson.title}</h1>
// //         <p className="text-amber-200/60 text-sm mt-1">
// //           {lesson.vocabulary.length} words • {lesson.quiz.length} quiz questions • {lesson.xpReward} XP
// //         </p>
// //       </div>

// //       {/* Vocabulary Section */}
// //       <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
// //         <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
// //           <Sparkles className="h-5 w-5 text-amber-400" />
// //           Vocabulary
// //         </h2>
// //         <div className="space-y-3">
// //           {lesson.vocabulary.map((word, idx) => (
// //             <motion.div
// //               key={idx}
// //               initial={{ opacity: 0, x: -10 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ delay: idx * 0.05 }}
// //               className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition"
// //             >
// //               <div className="flex-1 grid grid-cols-3 gap-2 items-center">
// //                 <div>
// //                   <p className="text-lg font-bold text-white">{word.hausa}</p>
// //                   <p className="text-xs text-amber-300/60">{word.pronunciation}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-lg text-white/80 text-right" dir="rtl">
// //                     {word.arabic}
// //                   </p>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-sm text-amber-200/70">{word.english}</p>
// //                 </div>
// //               </div>
// //               <div className="flex gap-2">
// //                 <AudioButton text={word.hausa} language="hausa" />
// //                 <AudioButton text={word.arabic} language="arabic" />
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Quiz Section / Complete Button */}
// //       {!lessonCompleted ? (
// //         <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 p-6 text-center">
// //           <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-3" />
// //           <h3 className="text-xl font-bold text-white mb-2">Ready to Test Your Knowledge?</h3>
// //           <p className="text-amber-200/70 mb-4">
// //             Complete the quiz to earn {lesson.xpReward} XP and mark this lesson as complete.
// //             You need 70% to pass.
// //           </p>
// //           <button
// //             onClick={() => setShowQuiz(true)}
// //             className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition shadow-lg"
// //           >
// //             Start Quiz
// //             <ChevronRight className="h-4 w-4" />
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="rounded-2xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 p-6 text-center">
// //           <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
// //           <h3 className="text-xl font-bold text-white mb-2">Lesson Complete!</h3>
// //           <p className="text-emerald-200/70">
// //             You've earned {lesson.xpReward} XP for completing this lesson.
// //           </p>
// //         </div>
// //       )}

// //       {/* Quiz Modal */}
// //       <AnimatePresence>
// //         {showQuiz && (
// //           <QuizModal
// //             quiz={lesson.quiz}
// //             onComplete={handleComplete}
// //             onClose={() => setShowQuiz(false)}
// //             xpReward={lesson.xpReward}
// //           />
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '@/contexts/AuthContext';
// import { useProgress } from '@/contexts/ProgressContext';
// import {
//   ArrowLeft,
//   Volume2,
//   Lock,
//   Crown,
//   CheckCircle,
//   XCircle,
//   ChevronRight,
//   ChevronLeft,
//   Sparkles,
//   Trophy,
//   Loader2,
//   Headphones,
//   Mic,
//   Shuffle,
//   Check,
//   X,
//   RefreshCw,
// } from 'lucide-react';
// import { ALL_LESSONS, type Lesson, type QuizQuestion, type AudioExercise } from '@/data/lessons';
// import toast from 'react-hot-toast';

// // ─────────────────────────────────────────
// // Audio Button
// // ─────────────────────────────────────────
// function AudioButton({
//   text,
//   language,
//   size = 'md',
// }: {
//   text: string;
//   language: 'hausa' | 'arabic';
//   size?: 'sm' | 'md' | 'lg';
// }) {
//   const [playing, setPlaying] = useState(false);

//   const handlePlay = () => {
//     if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
//       toast.error('Audio not supported in this browser');
//       return;
//     }
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = language === 'hausa' ? 'ha' : 'ar-SA';
//     utterance.rate = 0.75;
//     utterance.onstart = () => setPlaying(true);
//     utterance.onend = () => setPlaying(false);
//     utterance.onerror = () => {
//       setPlaying(false);
//       toast.error('Audio playback failed');
//     };
//     window.speechSynthesis.speak(utterance);
//   };

//   const sizeClasses = {
//     sm: 'p-1.5',
//     md: 'p-2',
//     lg: 'p-3',
//   };
//   const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

//   return (
//     <button
//       onClick={handlePlay}
//       disabled={playing}
//       className={`${sizeClasses[size]} rounded-lg transition-all ${
//         playing
//           ? 'bg-emerald-500/30 text-emerald-300'
//           : 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30'
//       }`}
//     >
//       <Volume2 className={`${iconSizes[size]} ${playing ? 'animate-pulse' : ''}`} />
//     </button>
//   );
// }

// // ─────────────────────────────────────────
// // Audio Exercises Panel
// // ─────────────────────────────────────────
// function AudioExercisesPanel({ exercises }: { exercises: AudioExercise[] }) {
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [answered, setAnswered] = useState(false);
//   const [matchSelected, setMatchSelected] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });
//   const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
//   const [wrongPair, setWrongPair] = useState(false);
//   const [repeatCount, setRepeatCount] = useState(0);

//   const exercise = exercises[currentIdx];

//   const resetExercise = () => {
//     setSelectedAnswer(null);
//     setAnswered(false);
//     setMatchSelected({ left: null, right: null });
//     setMatchedPairs([]);
//     setWrongPair(false);
//     setRepeatCount(0);
//   };

//   const goNext = () => {
//     if (currentIdx < exercises.length - 1) {
//       setCurrentIdx(currentIdx + 1);
//       resetExercise();
//     }
//   };

//   const goPrev = () => {
//     if (currentIdx > 0) {
//       setCurrentIdx(currentIdx - 1);
//       resetExercise();
//     }
//   };

//   const handleListenAnswer = (idx: number) => {
//     if (answered) return;
//     setSelectedAnswer(idx);
//     setAnswered(true);
//     if (idx === exercise.correctAnswer) {
//       toast.success('Correct! 🎉');
//     } else {
//       toast.error(`Incorrect. The right answer is: ${exercise.options![exercise.correctAnswer!]}`);
//     }
//   };

//   // Match pairs logic
//   const handleMatchLeft = (word: string) => {
//     if (matchedPairs.includes(word)) return;
//     setMatchSelected((s) => ({ ...s, left: word }));
//   };
//   const handleMatchRight = (word: string) => {
//     if (matchedPairs.some((p) => p === word)) return;
//     if (!matchSelected.left) return;

//     const expectedRight = exercise.pairs!.find((p) => p.left === matchSelected.left)?.right;
//     if (expectedRight === word) {
//       setMatchedPairs((prev) => [...prev, matchSelected.left!, word]);
//       setMatchSelected({ left: null, right: null });
//       if (matchedPairs.length + 2 >= exercise.pairs!.length * 2) {
//         toast.success('All pairs matched! 🎉');
//       }
//     } else {
//       setWrongPair(true);
//       setTimeout(() => {
//         setWrongPair(false);
//         setMatchSelected({ left: null, right: null });
//       }, 700);
//     }
//   };

//   const allPairsMatched =
//     exercise.type === 'match_pairs' &&
//     exercise.pairs &&
//     matchedPairs.length === exercise.pairs.length * 2;

//   const playAudio = (text: string, lang: 'hausa' | 'arabic') => {
//     if (!('speechSynthesis' in window)) return;
//     window.speechSynthesis.cancel();
//     const u = new SpeechSynthesisUtterance(text);
//     u.lang = lang === 'hausa' ? 'ha' : 'ar-SA';
//     u.rate = 0.75;
//     window.speechSynthesis.speak(u);
//   };

//   return (
//     <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//           <Headphones className="h-5 w-5 text-amber-400" />
//           Audio Exercises
//         </h2>
//         <span className="text-xs text-amber-300/60">
//           {currentIdx + 1} / {exercises.length}
//         </span>
//       </div>

//       {/* Progress dots */}
//       <div className="flex gap-1.5 mb-5">
//         {exercises.map((_, i) => (
//           <div
//             key={i}
//             className={`h-1.5 rounded-full transition-all ${
//               i === currentIdx ? 'w-6 bg-amber-400' : 'w-3 bg-white/20'
//             }`}
//           />
//         ))}
//       </div>

//       {/* Exercise card */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={exercise.id}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//           className="space-y-4"
//         >
//           {/* Type badge */}
//           <div className="flex items-center gap-2">
//             {exercise.type === 'listen_identify' && (
//               <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium flex items-center gap-1">
//                 <Volume2 className="h-3 w-3" /> Listen & Identify
//               </span>
//             )}
//             {exercise.type === 'repeat_after_me' && (
//               <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium flex items-center gap-1">
//                 <Mic className="h-3 w-3" /> Repeat After Me
//               </span>
//             )}
//             {exercise.type === 'match_pairs' && (
//               <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1">
//                 <Shuffle className="h-3 w-3" /> Match Pairs
//               </span>
//             )}
//           </div>

//           <p className="text-amber-200/80 text-sm">{exercise.instruction}</p>

//           {/* ── Listen & Identify ── */}
//           {exercise.type === 'listen_identify' && exercise.targetWord && (
//             <>
//               <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
//                 <button
//                   onClick={() => playAudio(exercise.targetWord!, exercise.targetLanguage!)}
//                   className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30 transition font-medium text-sm"
//                 >
//                   <Volume2 className="h-4 w-4" />
//                   Play Audio
//                 </button>
//                 <span className={`text-lg font-bold text-white/30 select-none`}>
//                   {exercise.targetLanguage === 'arabic' ? '???  ← Listen' : 'Listen →  ???'}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {exercise.options!.map((option, idx) => {
//                   let style = 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10';
//                   if (answered) {
//                     if (idx === exercise.correctAnswer) style = 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
//                     else if (idx === selectedAnswer) style = 'border-red-400 bg-red-500/20 text-red-300';
//                     else style = 'border-white/10 bg-white/5 text-white/40';
//                   } else if (selectedAnswer === idx) {
//                     style = 'border-amber-400 bg-amber-400/20 text-amber-300';
//                   }
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => handleListenAnswer(idx)}
//                       disabled={answered}
//                       className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${style}`}
//                     >
//                       {answered && idx === exercise.correctAnswer && (
//                         <Check className="inline h-3 w-3 mr-1" />
//                       )}
//                       {answered && idx === selectedAnswer && idx !== exercise.correctAnswer && (
//                         <X className="inline h-3 w-3 mr-1" />
//                       )}
//                       {option}
//                     </button>
//                   );
//                 })}
//               </div>

//               {answered && (
//                 <button
//                   onClick={resetExercise}
//                   className="flex items-center gap-1 text-xs text-amber-400/70 hover:text-amber-400 transition"
//                 >
//                   <RefreshCw className="h-3 w-3" /> Try again
//                 </button>
//               )}
//             </>
//           )}

//           {/* ── Repeat After Me ── */}
//           {exercise.type === 'repeat_after_me' && exercise.targetWord && (
//             <div className="space-y-4">
//               <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
//                 <p
//                   className="text-2xl font-bold text-white mb-1"
//                   dir={exercise.targetLanguage === 'arabic' ? 'rtl' : 'ltr'}
//                 >
//                   {exercise.targetWord}
//                 </p>
//                 <p className="text-xs text-amber-300/50 mb-4">
//                   {exercise.targetLanguage === 'arabic' ? 'Arabic' : 'Hausa'}
//                 </p>
//                 <button
//                   onClick={() => {
//                     playAudio(exercise.targetWord!, exercise.targetLanguage!);
//                     setRepeatCount((c) => c + 1);
//                   }}
//                   className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30 transition font-medium"
//                 >
//                   <Volume2 className="h-4 w-4" />
//                   {repeatCount === 0 ? 'Play & Repeat' : `Play Again (×${repeatCount})`}
//                 </button>
//               </div>

//               {repeatCount > 0 && (
//                 <div className="flex items-center gap-2 text-sm text-emerald-300/80">
//                   <CheckCircle className="h-4 w-4 text-emerald-400" />
//                   Great! Try to match the pronunciation. Repeat {Math.max(0, 3 - repeatCount)} more time(s) for best results.
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── Match Pairs ── */}
//           {exercise.type === 'match_pairs' && exercise.pairs && (
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-3">
//                 {/* Left column - Hausa */}
//                 <div className="space-y-2">
//                   <p className="text-xs text-amber-300/50 text-center mb-2">Hausa</p>
//                   {exercise.pairs.map((pair) => {
//                     const isMatched = matchedPairs.includes(pair.left);
//                     const isSelected = matchSelected.left === pair.left;
//                     const isWrong = wrongPair && isSelected;
//                     return (
//                       <button
//                         key={pair.left}
//                         onClick={() => handleMatchLeft(pair.left)}
//                         disabled={isMatched}
//                         className={`w-full p-3 rounded-xl border text-sm font-medium transition-all ${
//                           isMatched
//                             ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300/60 cursor-default'
//                             : isWrong
//                             ? 'border-red-400 bg-red-500/20 text-red-300'
//                             : isSelected
//                             ? 'border-amber-400 bg-amber-400/20 text-amber-300'
//                             : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
//                         }`}
//                       >
//                         {isMatched && <Check className="inline h-3 w-3 mr-1 text-emerald-400" />}
//                         {pair.left}
//                         <AudioButton text={pair.left} language="hausa" size="sm" />
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Right column - Arabic */}
//                 <div className="space-y-2">
//                   <p className="text-xs text-amber-300/50 text-center mb-2">Arabic</p>
//                   {/* Shuffle display order */}
//                   {[...exercise.pairs].reverse().map((pair) => {
//                     const isMatched = matchedPairs.includes(pair.right);
//                     return (
//                       <button
//                         key={pair.right}
//                         onClick={() => handleMatchRight(pair.right)}
//                         disabled={isMatched || !matchSelected.left}
//                         className={`w-full p-3 rounded-xl border text-sm font-medium transition-all text-right ${
//                           isMatched
//                             ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300/60 cursor-default'
//                             : !matchSelected.left
//                             ? 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'
//                             : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-amber-400/40'
//                         }`}
//                         dir="rtl"
//                       >
//                         {isMatched && <Check className="inline h-3 w-3 mr-1 text-emerald-400" />}
//                         {pair.right}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {matchSelected.left && !allPairsMatched && (
//                 <p className="text-xs text-amber-300/60 text-center">
//                   Now select the matching Arabic word →
//                 </p>
//               )}

//               {allPairsMatched && (
//                 <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
//                   <Trophy className="h-4 w-4 text-emerald-400" />
//                   <span className="text-sm text-emerald-300 font-medium">All pairs matched!</span>
//                 </div>
//               )}
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation */}
//       <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
//         <button
//           onClick={goPrev}
//           disabled={currentIdx === 0}
//           className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition text-sm"
//         >
//           <ChevronLeft className="h-4 w-4" /> Prev
//         </button>
//         <button
//           onClick={goNext}
//           disabled={currentIdx === exercises.length - 1}
//           className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition text-sm"
//         >
//           Next <ChevronRight className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // Quiz Modal
// // ─────────────────────────────────────────
// function QuizModal({
//   quiz,
//   onComplete,
//   onClose,
//   xpReward,
// }: {
//   quiz: QuizQuestion[];
//   onComplete: () => void;
//   onClose: () => void;
//   xpReward: number;
// }) {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.length).fill(-1));
//   const [showResults, setShowResults] = useState(false);

//   const currentQuestion = quiz[currentQuestionIndex];
//   const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== -1;
//   const isLastQuestion = currentQuestionIndex === quiz.length - 1;

//   const handleSelectAnswer = (idx: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestionIndex] = idx;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNext = () => {
//     if (!hasSelectedAnswer) { toast.error('Please select an answer'); return; }
//     if (isLastQuestion) setShowResults(true);
//     else setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   const handleSubmit = () => {
//     const correctCount = selectedAnswers.filter((a, i) => a === quiz[i].correctAnswer).length;
//     const pct = (correctCount / quiz.length) * 100;
//     if (pct >= 70) {
//       toast.success(`🎉 You passed! +${xpReward} XP earned`);
//       onComplete();
//     } else {
//       toast.error(`${correctCount}/${quiz.length} correct. Need 70% to pass. Try again!`);
//       setShowResults(false);
//       setCurrentQuestionIndex(0);
//       setSelectedAnswers(new Array(quiz.length).fill(-1));
//     }
//   };

//   const correctCount = selectedAnswers.filter((a, i) => a === quiz[i].correctAnswer).length;
//   const percentage = (correctCount / quiz.length) * 100;
//   const passed = percentage >= 70;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="relative w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
//       >
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <Trophy className="h-5 w-5 text-amber-400" />
//               <span className="text-sm text-amber-300">
//                 Question {currentQuestionIndex + 1} of {quiz.length}
//               </span>
//             </div>
//             <button onClick={onClose} className="p-1 rounded-lg text-white/50 hover:text-white transition">
//               <XCircle className="h-6 w-6" />
//             </button>
//           </div>

//           {!showResults ? (
//             <>
//               <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.question}</h3>
//               <div className="space-y-3 mb-8">
//                 {currentQuestion.options.map((option, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => handleSelectAnswer(idx)}
//                     className={`w-full text-left p-4 rounded-xl border transition-all ${
//                       selectedAnswers[currentQuestionIndex] === idx
//                         ? 'border-amber-400 bg-amber-400/20 text-amber-300'
//                         : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
//                     }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
//                   disabled={currentQuestionIndex === 0}
//                   className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition"
//                 >
//                   <ChevronLeft className="h-4 w-4" /> Previous
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="flex items-center gap-1 px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
//                 >
//                   {isLastQuestion ? 'Review Answers' : 'Next'} <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="text-center mb-6">
//                 <div className="text-6xl mb-4">{passed ? '🎉' : '😅'}</div>
//                 <h3 className="text-2xl font-bold text-white mb-2">
//                   {passed ? 'Congratulations!' : 'Almost There!'}
//                 </h3>
//                 <p className="text-amber-200/70">
//                   You scored {correctCount}/{quiz.length} ({Math.round(percentage)}%)
//                 </p>
//                 {!passed && (
//                   <p className="text-sm text-amber-300/70 mt-2">
//                     You need 70% to pass. Review the vocabulary and try again!
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
//                 {quiz.map((q, idx) => (
//                   <div
//                     key={q.id}
//                     className={`p-3 rounded-lg ${
//                       selectedAnswers[idx] === q.correctAnswer
//                         ? 'bg-emerald-500/20 border border-emerald-400/30'
//                         : 'bg-red-500/20 border border-red-400/30'
//                     }`}
//                   >
//                     <p className="text-sm text-white/90">{q.question}</p>
//                     <p className="text-xs text-amber-300/70 mt-1">Correct: {q.options[q.correctAnswer]}</p>
//                     <p className="text-xs text-white/50 mt-1">{q.explanation}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 {!passed ? (
//                   <button
//                     onClick={() => {
//                       setShowResults(false);
//                       setCurrentQuestionIndex(0);
//                       setSelectedAnswers(new Array(quiz.length).fill(-1));
//                     }}
//                     className="flex-1 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-500 transition"
//                   >
//                     Try Again
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleSubmit}
//                     className="flex-1 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
//                   >
//                     Claim XP & Continue
//                   </button>
//                 )}
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // Main Lesson Page
// // ─────────────────────────────────────────
// export default function LessonPage() {
//   const params = useParams();
//   const { user } = useAuth();
//   const { completedLessons, markLessonComplete } = useProgress();

//   const lessonId = params.lessonId as string;
//   const lesson: Lesson | undefined = ALL_LESSONS[lessonId];

//   const [showQuiz, setShowQuiz] = useState(false);
//   const [lessonCompleted, setLessonCompleted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (lesson) {
//       setLessonCompleted(completedLessons.includes(lesson.id));
//       setLoading(false);
//     }
//   }, [lesson, completedLessons]);

//   const isLocked = lesson?.isPremium && !user?.hasPremium;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
//       </div>
//     );
//   }

//   if (!lesson) {
//     return (
//       <div className="text-center py-20">
//         <h1 className="text-2xl font-bold text-white">Lesson Not Found</h1>
//         <p className="text-amber-200/70 mt-2">The lesson you're looking for doesn't exist.</p>
//         <Link
//           href="/dashboard/lessons"
//           className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition"
//         >
//           <ArrowLeft className="h-4 w-4" /> Back to Lessons
//         </Link>
//       </div>
//     );
//   }

//   if (isLocked) {
//     return (
//       <div className="text-center py-20 max-w-md mx-auto">
//         <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
//           <Lock className="h-10 w-10 text-amber-400" />
//         </div>
//         <h1 className="text-2xl font-bold text-white mb-2">Premium Lesson</h1>
//         <p className="text-amber-200/70 mb-6">
//           This lesson is part of our premium curriculum. Upgrade to unlock all units and lessons.
//         </p>
//         <Link
//           href="/dashboard/subscription"
//           className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
//         >
//           <Crown className="h-4 w-4" /> Upgrade to Premium
//         </Link>
//         <div className="mt-4">
//           <Link
//             href="/dashboard/lessons"
//             className="inline-flex items-center gap-1 text-sm text-amber-300/70 hover:text-amber-300 transition"
//           >
//             <ArrowLeft className="h-3 w-3" /> Back to Lessons
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleComplete = () => {
//     markLessonComplete(lesson.id, lesson.xpReward);
//     setLessonCompleted(true);
//     setShowQuiz(false);
//     toast.success(`🎉 Lesson complete! +${lesson.xpReward} XP`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="mb-6">
//         <Link
//           href="/dashboard/lessons"
//           className="inline-flex items-center gap-1 text-sm text-amber-300/70 hover:text-amber-300 transition mb-4"
//         >
//           <ArrowLeft className="h-4 w-4" /> Back to Lessons
//         </Link>
//         <div className="flex items-center gap-2 mb-2">
//           <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-medium">
//             {lesson.unitTitle}
//           </span>
//           {lessonCompleted && (
//             <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-medium flex items-center gap-1">
//               <CheckCircle className="h-3 w-3" /> Completed
//             </span>
//           )}
//         </div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-white">{lesson.title}</h1>
//         <p className="text-amber-200/60 text-sm mt-1">
//           {lesson.vocabulary.length} words • {lesson.audioExercises.length} audio exercises • {lesson.quiz.length} quiz questions • {lesson.xpReward} XP
//         </p>
//       </div>

//       {/* Vocabulary Section */}
//       <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
//         <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//           <Sparkles className="h-5 w-5 text-amber-400" />
//           Vocabulary
//         </h2>
//         <div className="space-y-3">
//           {lesson.vocabulary.map((word, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.04 }}
//               className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition"
//             >
//               <div className="flex-1 grid grid-cols-3 gap-2 items-center">
//                 <div>
//                   <p className="text-base font-bold text-white">{word.hausa}</p>
//                   <p className="text-xs text-amber-300/50 mt-0.5">{word.pronunciation}</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-base text-white/80" dir="rtl">{word.arabic}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-amber-200/70">{word.english}</p>
//                 </div>
//               </div>
//               <div className="flex gap-1.5 shrink-0">
//                 <AudioButton text={word.hausa} language="hausa" />
//                 <AudioButton text={word.arabic} language="arabic" />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Audio Exercises Section */}
//       {lesson.audioExercises && lesson.audioExercises.length > 0 && (
//         <AudioExercisesPanel exercises={lesson.audioExercises} />
//       )}

//       {/* Quiz CTA */}
//       {!lessonCompleted ? (
//         <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 p-6 text-center">
//           <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-3" />
//           <h3 className="text-xl font-bold text-white mb-2">Ready to Test Your Knowledge?</h3>
//           <p className="text-amber-200/70 mb-4">
//             Complete the quiz to earn {lesson.xpReward} XP and mark this lesson as complete. You need 70% to pass.
//           </p>
//           <button
//             onClick={() => setShowQuiz(true)}
//             className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition shadow-lg"
//           >
//             Start Quiz <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       ) : (
//         <div className="rounded-2xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 p-6 text-center">
//           <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
//           <h3 className="text-xl font-bold text-white mb-2">Lesson Complete!</h3>
//           <p className="text-emerald-200/70">
//             You've earned {lesson.xpReward} XP for completing this lesson.
//           </p>
//           <button
//             onClick={() => setShowQuiz(true)}
//             className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white/70 rounded-xl hover:bg-white/15 transition text-sm"
//           >
//             Review Quiz
//           </button>
//         </div>
//       )}

//       {/* Quiz Modal */}
//       <AnimatePresence>
//         {showQuiz && (
//           <QuizModal
//             quiz={lesson.quiz}
//             onComplete={handleComplete}
//             onClose={() => setShowQuiz(false)}
//             xpReward={lesson.xpReward}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }





'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import {
  ArrowLeft,
  Volume2,
  Lock,
  Crown,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Trophy,
  Loader2,
  Headphones,
  Mic,
  Shuffle,
  Check,
  X,
  RefreshCw,
} from 'lucide-react';
import { ALL_LESSONS, type Lesson, type QuizQuestion, type AudioExercise, type VocabularyItem } from '@/data/lessons';
import toast from 'react-hot-toast';

// ─────────────────────────────────────────
// Audio helpers
// ─────────────────────────────────────────
function speakWithBrowser(text: string, language: 'hausa' | 'arabic', onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    toast.error('Audio not supported in this browser');
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'hausa' ? 'ha' : 'ar-SA';
  utterance.rate = 0.75;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => {
    toast.error('Audio playback failed');
    onEnd?.();
  };
  window.speechSynthesis.speak(utterance);
}

// ─────────────────────────────────────────
// Audio Button
// ─────────────────────────────────────────
function AudioButton({
  text,
  language,
  audioSrc,
  size = 'md',
}: {
  text: string;
  language: 'hausa' | 'arabic';
  audioSrc?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handlePlay = async () => {
    if (playing) return;

    if (typeof window === 'undefined') return;

    window.speechSynthesis?.cancel();
    audioRef.current?.pause();

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      setPlaying(true);

      audio.onended = () => setPlaying(false);
      audio.onerror = () => {
        setPlaying(false);
        toast.error('Recorded audio failed. Using browser audio instead.');
        speakWithBrowser(text, language);
      };

      try {
        await audio.play();
      } catch {
        setPlaying(false);
        toast.error('Recorded audio failed. Using browser audio instead.');
        speakWithBrowser(text, language);
      }
      return;
    }

    setPlaying(true);
    speakWithBrowser(text, language, () => setPlaying(false));
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };
  const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

  return (
    <button
      onClick={handlePlay}
      disabled={playing}
      className={`${sizeClasses[size]} rounded-lg transition-all ${
        playing
          ? 'bg-emerald-500/30 text-emerald-300'
          : 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30'
      }`}
      title={audioSrc ? 'Play recorded audio' : 'Play browser audio'}
    >
      <Volume2 className={`${iconSizes[size]} ${playing ? 'animate-pulse' : ''}`} />
    </button>
  );
}

// ─────────────────────────────────────────
// Audio Exercises Panel
// ─────────────────────────────────────────
function AudioExercisesPanel({ exercises, vocabulary }: { exercises: AudioExercise[]; vocabulary: VocabularyItem[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [matchSelected, setMatchSelected] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);

  const exercise = exercises[currentIdx];

  const getAudioSrcForText = (text: string) => {
    return vocabulary.find((item) => item.hausa === text)?.audioSrc;
  };

  const resetExercise = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    setMatchSelected({ left: null, right: null });
    setMatchedPairs([]);
    setWrongPair(false);
    setRepeatCount(0);
  };

  const goNext = () => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx(currentIdx + 1);
      resetExercise();
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      resetExercise();
    }
  };

  const handleListenAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === exercise.correctAnswer) {
      toast.success('Correct! 🎉');
    } else {
      toast.error(`Incorrect. The right answer is: ${exercise.options![exercise.correctAnswer!]}`);
    }
  };

  // Match pairs logic
  const handleMatchLeft = (word: string) => {
    if (matchedPairs.includes(word)) return;
    setMatchSelected((s) => ({ ...s, left: word }));
  };
  const handleMatchRight = (word: string) => {
    if (matchedPairs.some((p) => p === word)) return;
    if (!matchSelected.left) return;

    const expectedRight = exercise.pairs!.find((p) => p.left === matchSelected.left)?.right;
    if (expectedRight === word) {
      setMatchedPairs((prev) => [...prev, matchSelected.left!, word]);
      setMatchSelected({ left: null, right: null });
      if (matchedPairs.length + 2 >= exercise.pairs!.length * 2) {
        toast.success('All pairs matched! 🎉');
      }
    } else {
      setWrongPair(true);
      setTimeout(() => {
        setWrongPair(false);
        setMatchSelected({ left: null, right: null });
      }, 700);
    }
  };

  const allPairsMatched =
    exercise.type === 'match_pairs' &&
    exercise.pairs &&
    matchedPairs.length === exercise.pairs.length * 2;

  const playAudio = async (text: string, lang: 'hausa' | 'arabic', audioSrc?: string) => {
    if (typeof window === 'undefined') return;

    window.speechSynthesis?.cancel();

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      try {
        await audio.play();
      } catch {
        toast.error('Recorded audio failed. Using browser audio instead.');
        speakWithBrowser(text, lang);
      }
      return;
    }

    speakWithBrowser(text, lang);
  };

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Headphones className="h-5 w-5 text-amber-400" />
          Audio Exercises
        </h2>
        <span className="text-xs text-amber-300/60">
          {currentIdx + 1} / {exercises.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-5">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIdx ? 'w-6 bg-amber-400' : 'w-3 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Exercise card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={exercise.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {/* Type badge */}
          <div className="flex items-center gap-2">
            {exercise.type === 'listen_identify' && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium flex items-center gap-1">
                <Volume2 className="h-3 w-3" /> Listen & Identify
              </span>
            )}
            {exercise.type === 'repeat_after_me' && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium flex items-center gap-1">
                <Mic className="h-3 w-3" /> Repeat After Me
              </span>
            )}
            {exercise.type === 'match_pairs' && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1">
                <Shuffle className="h-3 w-3" /> Match Pairs
              </span>
            )}
          </div>

          <p className="text-amber-200/80 text-sm">{exercise.instruction}</p>

          {/* ── Listen & Identify ── */}
          {exercise.type === 'listen_identify' && exercise.targetWord && (
            <>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => playAudio(exercise.targetWord!, exercise.targetLanguage!, exercise.audioSrc)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30 transition font-medium text-sm"
                >
                  <Volume2 className="h-4 w-4" />
                  Play Audio
                </button>
                <span className={`text-lg font-bold text-white/30 select-none`}>
                  {exercise.targetLanguage === 'arabic' ? '???  ← Listen' : 'Listen →  ???'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {exercise.options!.map((option, idx) => {
                  let style = 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10';
                  if (answered) {
                    if (idx === exercise.correctAnswer) style = 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
                    else if (idx === selectedAnswer) style = 'border-red-400 bg-red-500/20 text-red-300';
                    else style = 'border-white/10 bg-white/5 text-white/40';
                  } else if (selectedAnswer === idx) {
                    style = 'border-amber-400 bg-amber-400/20 text-amber-300';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleListenAnswer(idx)}
                      disabled={answered}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${style}`}
                    >
                      {answered && idx === exercise.correctAnswer && (
                        <Check className="inline h-3 w-3 mr-1" />
                      )}
                      {answered && idx === selectedAnswer && idx !== exercise.correctAnswer && (
                        <X className="inline h-3 w-3 mr-1" />
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <button
                  onClick={resetExercise}
                  className="flex items-center gap-1 text-xs text-amber-400/70 hover:text-amber-400 transition"
                >
                  <RefreshCw className="h-3 w-3" /> Try again
                </button>
              )}
            </>
          )}

          {/* ── Repeat After Me ── */}
          {exercise.type === 'repeat_after_me' && exercise.targetWord && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p
                  className="text-2xl font-bold text-white mb-1"
                  dir={exercise.targetLanguage === 'arabic' ? 'rtl' : 'ltr'}
                >
                  {exercise.targetWord}
                </p>
                <p className="text-xs text-amber-300/50 mb-4">
                  {exercise.targetLanguage === 'arabic' ? 'Arabic' : 'Hausa'}
                </p>
                <button
                  onClick={() => {
                    playAudio(exercise.targetWord!, exercise.targetLanguage!, exercise.audioSrc);
                    setRepeatCount((c) => c + 1);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30 transition font-medium"
                >
                  <Volume2 className="h-4 w-4" />
                  {repeatCount === 0 ? 'Play & Repeat' : `Play Again (×${repeatCount})`}
                </button>
              </div>

              {repeatCount > 0 && (
                <div className="flex items-center gap-2 text-sm text-emerald-300/80">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Great! Try to match the pronunciation. Repeat {Math.max(0, 3 - repeatCount)} more time(s) for best results.
                </div>
              )}
            </div>
          )}

          {/* ── Match Pairs ── */}
          {exercise.type === 'match_pairs' && exercise.pairs && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Left column - Hausa */}
                <div className="space-y-2">
                  <p className="text-xs text-amber-300/50 text-center mb-2">Hausa</p>
                  {exercise.pairs.map((pair) => {
                    const isMatched = matchedPairs.includes(pair.left);
                    const isSelected = matchSelected.left === pair.left;
                    const isWrong = wrongPair && isSelected;
                    return (
                      <button
                        key={pair.left}
                        onClick={() => handleMatchLeft(pair.left)}
                        disabled={isMatched}
                        className={`w-full p-3 rounded-xl border text-sm font-medium transition-all ${
                          isMatched
                            ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300/60 cursor-default'
                            : isWrong
                            ? 'border-red-400 bg-red-500/20 text-red-300'
                            : isSelected
                            ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                            : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {isMatched && <Check className="inline h-3 w-3 mr-1 text-emerald-400" />}
                        {pair.left}
                        <AudioButton text={pair.left} language="hausa" audioSrc={getAudioSrcForText(pair.left)} size="sm" />
                      </button>
                    );
                  })}
                </div>

                {/* Right column - Arabic */}
                <div className="space-y-2">
                  <p className="text-xs text-amber-300/50 text-center mb-2">Arabic</p>
                  {/* Shuffle display order */}
                  {[...exercise.pairs].reverse().map((pair) => {
                    const isMatched = matchedPairs.includes(pair.right);
                    return (
                      <button
                        key={pair.right}
                        onClick={() => handleMatchRight(pair.right)}
                        disabled={isMatched || !matchSelected.left}
                        className={`w-full p-3 rounded-xl border text-sm font-medium transition-all text-right ${
                          isMatched
                            ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300/60 cursor-default'
                            : !matchSelected.left
                            ? 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'
                            : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-amber-400/40'
                        }`}
                        dir="rtl"
                      >
                        {isMatched && <Check className="inline h-3 w-3 mr-1 text-emerald-400" />}
                        {pair.right}
                      </button>
                    );
                  })}
                </div>
              </div>

              {matchSelected.left && !allPairsMatched && (
                <p className="text-xs text-amber-300/60 text-center">
                  Now select the matching Arabic word →
                </p>
              )}

              {allPairsMatched && (
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                  <Trophy className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-medium">All pairs matched!</span>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition text-sm"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <button
          onClick={goNext}
          disabled={currentIdx === exercises.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition text-sm"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Quiz Modal
// ─────────────────────────────────────────
function QuizModal({
  quiz,
  onComplete,
  onClose,
  xpReward,
}: {
  quiz: QuizQuestion[];
  onComplete: () => void;
  onClose: () => void;
  xpReward: number;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz[currentQuestionIndex];
  const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== -1;
  const isLastQuestion = currentQuestionIndex === quiz.length - 1;

  const handleSelectAnswer = (idx: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = idx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!hasSelectedAnswer) { toast.error('Please select an answer'); return; }
    if (isLastQuestion) setShowResults(true);
    else setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    const correctCount = selectedAnswers.filter((a, i) => a === quiz[i].correctAnswer).length;
    const pct = (correctCount / quiz.length) * 100;
    if (pct >= 70) {
      toast.success(`🎉 You passed! +${xpReward} XP earned`);
      onComplete();
    } else {
      toast.error(`${correctCount}/${quiz.length} correct. Need 70% to pass. Try again!`);
      setShowResults(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswers(new Array(quiz.length).fill(-1));
    }
  };

  const correctCount = selectedAnswers.filter((a, i) => a === quiz[i].correctAnswer).length;
  const percentage = (correctCount / quiz.length) * 100;
  const passed = percentage >= 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span className="text-sm text-amber-300">
                Question {currentQuestionIndex + 1} of {quiz.length}
              </span>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-white/50 hover:text-white transition">
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          {!showResults ? (
            <>
              <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.question}</h3>
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedAnswers[currentQuestionIndex] === idx
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
                >
                  {isLastQuestion ? 'Review Answers' : 'Next'} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{passed ? '🎉' : '😅'}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {passed ? 'Congratulations!' : 'Almost There!'}
                </h3>
                <p className="text-amber-200/70">
                  You scored {correctCount}/{quiz.length} ({Math.round(percentage)}%)
                </p>
                {!passed && (
                  <p className="text-sm text-amber-300/70 mt-2">
                    You need 70% to pass. Review the vocabulary and try again!
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {quiz.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg ${
                      selectedAnswers[idx] === q.correctAnswer
                        ? 'bg-emerald-500/20 border border-emerald-400/30'
                        : 'bg-red-500/20 border border-red-400/30'
                    }`}
                  >
                    <p className="text-sm text-white/90">{q.question}</p>
                    <p className="text-xs text-amber-300/70 mt-1">Correct: {q.options[q.correctAnswer]}</p>
                    <p className="text-xs text-white/50 mt-1">{q.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {!passed ? (
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setCurrentQuestionIndex(0);
                      setSelectedAnswers(new Array(quiz.length).fill(-1));
                    }}
                    className="flex-1 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-500 transition"
                  >
                    Try Again
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
                  >
                    Claim XP & Continue
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Lesson Page
// ─────────────────────────────────────────
export default function LessonPage() {
  const params = useParams();
  const { user } = useAuth();
  const { completedLessons, markLessonComplete } = useProgress();

  const lessonId = params.lessonId as string;
  const lesson: Lesson | undefined = ALL_LESSONS[lessonId];

  const [showQuiz, setShowQuiz] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lesson) {
      setLessonCompleted(completedLessons.includes(lesson.id));
      setLoading(false);
    }
  }, [lesson, completedLessons]);

  const isLocked = lesson?.isPremium && !user?.hasPremium;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white">Lesson Not Found</h1>
        <p className="text-amber-200/70 mt-2">The lesson you're looking for doesn't exist.</p>
        <Link
          href="/dashboard/lessons"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Lessons
        </Link>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Lock className="h-10 w-10 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Premium Lesson</h1>
        <p className="text-amber-200/70 mb-6">
          This lesson is part of our premium curriculum. Upgrade to unlock all units and lessons.
        </p>
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
        >
          <Crown className="h-4 w-4" /> Upgrade to Premium
        </Link>
        <div className="mt-4">
          <Link
            href="/dashboard/lessons"
            className="inline-flex items-center gap-1 text-sm text-amber-300/70 hover:text-amber-300 transition"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    markLessonComplete(lesson.id, lesson.xpReward);
    setLessonCompleted(true);
    setShowQuiz(false);
    toast.success(`🎉 Lesson complete! +${lesson.xpReward} XP`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/lessons"
          className="inline-flex items-center gap-1 text-sm text-amber-300/70 hover:text-amber-300 transition mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Lessons
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-medium">
            {lesson.unitTitle}
          </span>
          {lessonCompleted && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-medium flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">{lesson.title}</h1>
        <p className="text-amber-200/60 text-sm mt-1">
          {lesson.vocabulary.length} words • {lesson.audioExercises.length} audio exercises • {lesson.quiz.length} quiz questions • {lesson.xpReward} XP
        </p>
      </div>

      {/* Vocabulary Section */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
          Vocabulary
        </h2>
        <div className="space-y-3">
          {lesson.vocabulary.map((word, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition"
            >
              <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                <div>
                  <p className="text-base font-bold text-white">{word.hausa}</p>
                  <p className="text-xs text-amber-300/50 mt-0.5">{word.pronunciation}</p>
                </div>
                <div className="text-center">
                  <p className="text-base text-white/80" dir="rtl">{word.arabic}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-amber-200/70">{word.english}</p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <AudioButton text={word.hausa} language="hausa" audioSrc={word.audioSrc} />
                <AudioButton text={word.arabic} language="arabic" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audio Exercises Section */}
      {lesson.audioExercises && lesson.audioExercises.length > 0 && (
        <AudioExercisesPanel exercises={lesson.audioExercises} vocabulary={lesson.vocabulary} />
      )}

      {/* Quiz CTA */}
      {!lessonCompleted ? (
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 p-6 text-center">
          <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Ready to Test Your Knowledge?</h3>
          <p className="text-amber-200/70 mb-4">
            Complete the quiz to earn {lesson.xpReward} XP and mark this lesson as complete. You need 70% to pass.
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition shadow-lg"
          >
            Start Quiz <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 p-6 text-center">
          <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Lesson Complete!</h3>
          <p className="text-emerald-200/70">
            You've earned {lesson.xpReward} XP for completing this lesson.
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white/70 rounded-xl hover:bg-white/15 transition text-sm"
          >
            Review Quiz
          </button>
        </div>
      )}

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <QuizModal
            quiz={lesson.quiz}
            onComplete={handleComplete}
            onClose={() => setShowQuiz(false)}
            xpReward={lesson.xpReward}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
