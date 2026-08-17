// 'use client';

// import { useState, useRef, useMemo, useEffect } from 'react';
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import {
//   Sparkles, Info, Upload, Play, Pause, ChevronDown, Clock,
//   CheckCircle2, RotateCcw, Volume2, BookOpen,
// } from 'lucide-react';

// // ─── Types ───────────────────────────────────────────────
// type PrayerLine = {
//   id: string;
//   arabic: string;
//   hausa: string;
//   english: string;
// };

// type Prayer = {
//   id: string;
//   order: number;
//   titleEnglish: string;
//   titleHausa: string;
//   titleArabic: string;
//   directive: string;
//   lines: PrayerLine[];
// };

// // ─── Content ─────────────────────────────────────────────
// // Al-Fatiha Hausa lines verified against published Hausa Qur'an translations.
// // Tashahhud / Salawat / closing du'a Hausa renderings are composed for this
// // app and should be checked by an imam or Hausa-speaking scholar before
// // being treated as authoritative — see the note banner on the page.
// const JUMUAH_PRAYERS: Prayer[] = [
//   {
//     id: 'niyyah',
//     order: 1,
//     titleEnglish: 'Intention',
//     titleHausa: 'Niyyah',
//     titleArabic: 'النِّيَّة',
//     directive:
//       "Niyyah is fundamentally a matter of the heart, not a scripted recitation — this spoken formula is a regional custom some communities use to focus the heart before starting.",
//     lines: [
//       {
//         id: 'niyyah-1',
//         arabic: 'نَوَيْتُ صَلَاةَ الْجُمُعَةِ لِلَّهِ تَعَالَى',
//         hausa: "Na yi niyyar sallar Jumu'ah don Allah Madaukakin Sarki.",
//         english: "I intend to perform the Jumu'ah prayer for the sake of Allah.",
//       },
//     ],
//   },
//   {
//     id: 'takbir',
//     order: 2,
//     titleEnglish: 'Opening Takbir',
//     titleHausa: 'Takbiratul Ihram',
//     titleArabic: 'تَكْبِيرَةُ الْإِحْرَام',
//     directive: 'Said aloud as the prayer formally begins, hands raised to the ears.',
//     lines: [
//       {
//         id: 'takbir-1',
//         arabic: 'اللَّهُ أَكْبَر',
//         hausa: 'Allah Shine Mafi Girma.',
//         english: 'Allah is the Greatest.',
//       },
//     ],
//   },
//   {
//     id: 'fatiha',
//     order: 3,
//     titleEnglish: 'The Opening',
//     titleHausa: 'Suratul Fatiha',
//     titleArabic: 'سُورَةُ الْفَاتِحَة',
//     directive: 'Recited in every unit (rak\u2019ah); the Imam recites it aloud during Jumu\u2019ah.',
//     lines: [
//       { id: 'fatiha-1', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', hausa: 'Da sunan Allah, Mai rahama, Mai jin ƙai.', english: 'In the name of Allah, the Most Compassionate, the Most Merciful.' },
//       { id: 'fatiha-2', arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', hausa: 'Godiya ta tabbata ga Allah, Ubangijin halittu.', english: 'All praise is due to Allah, Lord of all the worlds.' },
//       { id: 'fatiha-3', arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', hausa: 'Mai rahama, Mai jin ƙai.', english: 'The Most Compassionate, the Most Merciful.' },
//       { id: 'fatiha-4', arabic: 'مَالِكِ يَوْمِ الدِّينِ', hausa: 'Mai nuna Mulkin Ranar Sakamako.', english: 'Master of the Day of Judgment.' },
//       { id: 'fatiha-5', arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', hausa: 'Kai muke bauta wa, kuma Kai muke neman taimakonKa.', english: 'You alone we worship, and You alone we ask for help.' },
//       { id: 'fatiha-6', arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', hausa: 'Ka shiryar da mu ga hanya madaidaiciya.', english: 'Guide us to the straight path.' },
//       { id: 'fatiha-7', arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', hausa: "Hanyar wa\u0257anda Ka yi wa ni'ima, ba wa\u0257anda aka yi wa fushi ba, kuma ba \u0253atattu ba.", english: 'The path of those You have blessed, not of those who earned Your anger, nor of those who went astray.' },
//     ],
//   },
//   {
//     id: 'tashahhud',
//     order: 4,
//     titleEnglish: 'The Testimony',
//     titleHausa: 'Tashahhud (Tahiyyatu)',
//     titleArabic: 'التَّشَهُّد',
//     directive: 'Recited seated in the final part of the prayer, before the closing greeting.',
//     lines: [
//       { id: 'tashahhud-1', arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ', hausa: 'Dukkan gaisuwa, addu\u2019o\u2019i, da tsarkakan kalmomi, na Allah ne.', english: 'All greetings, prayers, and good things belong to Allah.' },
//       { id: 'tashahhud-2', arabic: 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ', hausa: 'Aminci ya tabbata gare ka, ya Annabi, tare da rahamar Allah da albarkarSa.', english: 'Peace be upon you, O Prophet, along with the mercy of Allah and His blessings.' },
//       { id: 'tashahhud-3', arabic: 'السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ', hausa: 'Aminci ya tabbata a gare mu da kuma bayin Allah na gari.', english: 'Peace be upon us and upon the righteous servants of Allah.' },
//       { id: 'tashahhud-4', arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ', hausa: 'Na shaida babu abin bautawa da gaskiya sai Allah, kuma na shaida cewa Muhammadu bawansa ne kuma Manzonsa.', english: 'I bear witness there is no god but Allah, and I bear witness Muhammad is His servant and Messenger.' },
//     ],
//   },
//   {
//     id: 'salawat',
//     order: 5,
//     titleEnglish: 'Blessings on the Prophet',
//     titleHausa: 'Salatin Ibrahimiyya',
//     titleArabic: 'الصَّلَاةُ الْإِبْرَاهِيمِيَّة',
//     directive: 'Recited immediately after the Tashahhud.',
//     lines: [
//       { id: 'salawat-1', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ', hausa: 'Ya Allah, ka yi tsira ga Annabi Muhammadu da iyalansa, kamar yadda ka yi wa Annabi Ibrahim da iyalansa. Lallai Kai Mai godiya ne, Mai daraja.', english: 'O Allah, send blessings upon Muhammad and his family, as You blessed Ibrahim and his family; indeed You are Praiseworthy, Glorious.' },
//       { id: 'salawat-2', arabic: 'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ', hausa: 'Ya Allah, ka albarkaci Annabi Muhammadu da iyalansa, kamar yadda ka albarkaci Annabi Ibrahim da iyalansa. Lallai Kai Mai godiya ne, Mai daraja.', english: 'O Allah, bless Muhammad and his family, as You blessed Ibrahim and his family; indeed You are Praiseworthy, Glorious.' },
//     ],
//   },
//   {
//     id: 'closing',
//     order: 6,
//     titleEnglish: 'Closing Du\u2019a & Salam',
//     titleHausa: "Addu'a da Kammala Sallah",
//     titleArabic: 'دُعَاءٌ وَتَسْلِيم',
//     directive: 'The du\u2019a is recited before closing; the salam is said twice, turning the head right then left, to end the prayer.',
//     lines: [
//       { id: 'closing-1', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', hausa: 'Ya Ubangijinmu, ka ba mu alheri a duniya da alheri a lahira, kuma ka tsare mu daga azabar wuta.', english: 'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.' },
//       { id: 'closing-2', arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', hausa: 'Aminci da rahamar Allah su tabbata a gare ku.', english: 'Peace and the mercy of Allah be upon you.' },
//     ],
//   },
// ];

// // ─── Animation variants ──────────────────────────────────
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
// };

// const itemVariants: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
// };

// // ─── Helpers ─────────────────────────────────────────────
// function formatTime(sec: number) {
//   if (!isFinite(sec) || sec < 0) return '0:00';
//   const m = Math.floor(sec / 60);
//   const s = Math.floor(sec % 60);
//   return `${m}:${s.toString().padStart(2, '0')}`;
// }

// // ─── Audio + word-sync hook ──────────────────────────────
// function usePrayerAudio() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string>('');
//   const [playing, setPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     const onTime = () => setCurrentTime(audio.currentTime);
//     const onLoaded = () => setDuration(audio.duration || 0);
//     const onEnd = () => { setPlaying(false); setCurrentTime(0); };
//     audio.addEventListener('timeupdate', onTime);
//     audio.addEventListener('loadedmetadata', onLoaded);
//     audio.addEventListener('ended', onEnd);
//     return () => {
//       audio.removeEventListener('timeupdate', onTime);
//       audio.removeEventListener('loadedmetadata', onLoaded);
//       audio.removeEventListener('ended', onEnd);
//     };
//   }, [audioUrl]);

//   const importFile = (file: File) => {
//     const url = URL.createObjectURL(file);
//     setAudioUrl(url);
//     setFileName(file.name);
//     setPlaying(false);
//     setCurrentTime(0);
//     setDuration(0);
//   };

//   const toggle = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     if (playing) { audio.pause(); setPlaying(false); }
//     else { audio.play(); setPlaying(true); }
//   };

//   const seek = (fraction: number) => {
//     const audio = audioRef.current;
//     if (!audio || !duration) return;
//     audio.currentTime = fraction * duration;
//     setCurrentTime(audio.currentTime);
//   };

//   const reset = () => {
//     setAudioUrl(null);
//     setFileName('');
//     setPlaying(false);
//     setCurrentTime(0);
//     setDuration(0);
//   };

//   return { audioRef, audioUrl, fileName, playing, currentTime, duration, importFile, toggle, seek, reset };
// }

// // ─── Prayer card ──────────────────────────────────────────
// function PrayerCard({ prayer, i }: { prayer: Prayer; i: number }) {
//   const [expanded, setExpanded] = useState(i === 0);
//   const player = usePrayerAudio();
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   // Flat word index across every line — used to estimate word timing
//   // by spreading total words evenly across the recording's duration.
//   // Replace with real per-word timestamps later for exact sync.
//   const allWords = useMemo(
//     () =>
//       prayer.lines.flatMap((line, li) =>
//         line.arabic.split(' ').map((text, wi) => ({ li, wi, text }))
//       ),
//     [prayer]
//   );
//   const totalWords = allWords.length;
//   const progress = player.duration > 0 ? player.currentTime / player.duration : 0;
//   const activeGlobalIdx = player.playing
//     ? Math.min(totalWords - 1, Math.floor(progress * totalWords))
//     : -1;
//   const active = activeGlobalIdx >= 0 ? allWords[activeGlobalIdx] : { li: -1, wi: -1 };

//   return (
//     <motion.div variants={itemVariants} className="rounded-2xl bg-white/6 border border-white/10 overflow-hidden">
//       {/* Header row */}
//       <button
//         onClick={() => setExpanded((e) => !e)}
//         className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
//       >
//         <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center shrink-0">
//           <span className="text-sm font-bold text-amber-400">{prayer.order}</span>
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap">
//             <h3 className="text-base font-bold text-white">{prayer.titleHausa}</h3>
//             <span className="text-xs text-white/40">· {prayer.titleEnglish}</span>
//           </div>
//           <p className="text-sm text-amber-200/50 mt-0.5" dir="rtl" lang="ar">{prayer.titleArabic}</p>
//         </div>
//         {player.audioUrl && (
//           <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold shrink-0">
//             <CheckCircle2 className="h-3.5 w-3.5" /> Audio
//           </span>
//         )}
//         <ChevronDown className={`h-4 w-4 text-white/40 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
//       </button>

//       <AnimatePresence initial={false}>
//         {expanded && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeInOut' }}
//             className="overflow-hidden"
//           >
//             <div className="px-5 pb-5 space-y-5 border-t border-white/8 pt-5">

//               {/* Directive */}
//               <div className="flex items-start gap-2 text-xs text-white/50 bg-white/5 rounded-lg p-3">
//                 <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
//                 <p>{prayer.directive}</p>
//               </div>

//               {/* Audio import / player */}
//               <div className="rounded-xl bg-white/5 border border-white/10 p-4">
//                 {!player.audioUrl ? (
//                   <button
//                     onClick={() => inputRef.current?.click()}
//                     className="w-full flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-dashed border-white/15 text-white/50 hover:border-amber-400/40 hover:text-amber-300 transition-colors text-sm font-medium"
//                   >
//                     <Upload className="h-4 w-4" />
//                     Import recording for this prayer
//                   </button>
//                 ) : (
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={player.toggle}
//                         className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0 hover:bg-amber-300 transition-colors"
//                       >
//                         {player.playing
//                           ? <Pause className="h-4 w-4 text-black fill-black" />
//                           : <Play className="h-4 w-4 text-black fill-black ml-0.5" />}
//                       </button>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-xs text-white/50 truncate mb-1.5">{player.fileName}</p>
//                         <div
//                           className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
//                           onClick={(e) => {
//                             const rect = e.currentTarget.getBoundingClientRect();
//                             player.seek((e.clientX - rect.left) / rect.width);
//                           }}
//                         >
//                           <div
//                             className="h-full bg-amber-400 rounded-full"
//                             style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
//                           />
//                         </div>
//                       </div>
//                       <span className="text-[11px] text-white/40 shrink-0 flex items-center gap-1 tabular-nums">
//                         <Clock className="h-3 w-3" />
//                         {formatTime(player.currentTime)} / {formatTime(player.duration)}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => { player.reset(); inputRef.current && (inputRef.current.value = ''); }}
//                       className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/60 transition-colors"
//                     >
//                       <RotateCcw className="h-3 w-3" /> Replace recording
//                     </button>
//                   </div>
//                 )}
//                 <input
//                   ref={inputRef}
//                   type="file"
//                   accept="audio/*"
//                   className="hidden"
//                   onChange={(e) => { const f = e.target.files?.[0]; if (f) player.importFile(f); }}
//                 />
//                 <audio ref={player.audioRef} src={player.audioUrl ?? undefined} className="hidden" />
//               </div>

//               {/* Tasbih-style progress beads — one per line */}
//               {player.audioUrl && (
//                 <div className="flex items-center gap-1.5 justify-center">
//                   {prayer.lines.map((line, li) => (
//                     <span
//                       key={line.id}
//                       className={`h-2 w-2 rounded-full transition-all ${
//                         li < active.li ? 'bg-amber-400' :
//                         li === active.li && player.playing ? 'bg-amber-400 scale-125 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]' :
//                         'bg-white/15'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* Lines */}
//               <div className="space-y-4">
//                 {prayer.lines.map((line, li) => {
//                   const words = line.arabic.split(' ');
//                   return (
//                     <div key={line.id} className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
//                       <p dir="rtl" lang="ar" className="text-xl sm:text-2xl leading-loose font-medium text-right">
//                         {words.map((w, wi) => {
//                           const isActive = player.playing && active.li === li && active.wi === wi;
//                           const isPast = active.li > li || (active.li === li && active.wi > wi);
//                           return (
//                             <span
//                               key={wi}
//                               className={`inline-block mx-0.5 rounded px-1 transition-all duration-150 ${
//                                 isActive
//                                   ? 'bg-amber-400/25 text-amber-200 scale-105'
//                                   : isPast
//                                   ? 'text-amber-100/70'
//                                   : 'text-white/85'
//                               }`}
//                             >
//                               {w}
//                             </span>
//                           );
//                         })}
//                       </p>
//                       <p className="text-sm text-emerald-300/80 mt-3">{line.hausa}</p>
//                       <p className="text-xs text-white/40 mt-1">{line.english}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // ─── Main page ────────────────────────────────────────────
// export default function PrayersPage() {
//   return (
//     <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-12">

//       {/* Header */}
//       <motion.div variants={itemVariants} className="flex items-center gap-3">
//         <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
//           <Sparkles className="h-5 w-5 text-amber-400" />
//         </div>
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-white">Jumu'ah Prayers</h1>
//           <p className="text-amber-200/70 mt-1 text-sm">
//             Sallolin Jumu'ah — Arabic, Hausa, and English, in prayer order
//           </p>
//         </div>
//       </motion.div>

//       {/* Accuracy note */}
//       <motion.div variants={itemVariants} className="flex items-start gap-3 rounded-2xl bg-white/6 border border-white/10 p-4">
//         <BookOpen className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
//         <p className="text-xs text-white/50 leading-relaxed">
//           The Suratul Fatiha Hausa translation follows published Hausa Qur'an translations.
//           Other Hausa renderings here were composed for this app and have not yet been
//           reviewed by an imam or Hausa-speaking scholar — please confirm wording locally
//           before treating this as authoritative.
//         </p>
//       </motion.div>

//       {/* Prayer list */}
//       <div className="space-y-3">
//         {JUMUAH_PRAYERS.map((prayer, i) => (
//           <PrayerCard key={prayer.id} prayer={prayer} i={i} />
//         ))}
//       </div>

//       {/* Footer tip */}
//       <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs text-white/35 justify-center">
//         <Volume2 className="h-3.5 w-3.5" />
//         Word highlighting is estimated evenly across each recording's length — timing gets more
//         precise once exact word timestamps are added.
//       </motion.div>
//     </motion.div>
//   );
// }



'use client';

// app/dashboard/prayers/page.tsx

import { useEffect, useState } from 'react';
import { BookOpen, Users, Sparkles, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import PrayerHeader from '@/components/prayers/PrayerHeader';
import PrayerCard from '@/components/prayers/PrayerCard';
import { prayerModuleSummaries } from '@/data/prayers';
import type { PrayerModuleSummary } from '@/types/prayers';

const ICONS: Record<PrayerModuleSummary['icon'], LucideIcon> = {
  salah: BookOpen,
  jumuah: Users,
  duas: Sparkles,
};

function readCompletedCount(prayerSlug: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(`lingua-bridge:prayer-progress:${prayerSlug}`);
    if (!raw) return 0;
    const ids: string[] = JSON.parse(raw);
    return Array.isArray(ids) ? ids.length : 0;
  } catch {
    return 0;
  }
}

export default function PrayersLandingPage() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setProgress({
      salah: readCompletedCount('salah'),
      jumuah: readCompletedCount('jumuah'),
    });
  }, []);

  return (
    <div>
      <PrayerHeader
        title="Prayer Learning"
        subtitleHausa="Koyon Sallah"
        description="Study Arabic prayer recitations with clear Hausa meaning, guided audio, and step-by-step lessons."
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {prayerModuleSummaries.map((module, index) => (
          <PrayerCard
            key={module.id}
            module={module}
            icon={ICONS[module.icon]}
            completedSteps={progress[module.slug] ?? 0}
            index={index}
          />
        ))}
      </motion.div>

      <p className="mt-8 text-xs leading-relaxed text-amber-200/40">
        Recitations in this module are drawn from widely followed Islamic teaching and are
        being reviewed by qualified scholars. Look for the verification badge on each lesson
        for its current review status.
      </p>
    </div>
  );
}
