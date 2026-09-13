// // 'use client';

// // import { useState, useRef, useMemo, useEffect } from 'react';
// // import { motion, AnimatePresence, type Variants } from "framer-motion";
// // import {
// //   Sparkles, Info, Upload, Play, Pause, ChevronDown, Clock,
// //   CheckCircle2, RotateCcw, Volume2, BookOpen,
// // } from 'lucide-react';

// // // ─── Types ───────────────────────────────────────────────
// // type PrayerLine = {
// //   id: string;
// //   arabic: string;
// //   hausa: string;
// //   english: string;
// // };

// // type Prayer = {
// //   id: string;
// //   order: number;
// //   titleEnglish: string;
// //   titleHausa: string;
// //   titleArabic: string;
// //   directive: string;
// //   lines: PrayerLine[];
// // };

// // // ─── Content ─────────────────────────────────────────────
// // // Al-Fatiha Hausa lines verified against published Hausa Qur'an translations.
// // // Tashahhud / Salawat / closing du'a Hausa renderings are composed for this
// // // app and should be checked by an imam or Hausa-speaking scholar before
// // // being treated as authoritative — see the note banner on the page.
// // const JUMUAH_PRAYERS: Prayer[] = [
// //   {
// //     id: 'niyyah',
// //     order: 1,
// //     titleEnglish: 'Intention',
// //     titleHausa: 'Niyyah',
// //     titleArabic: 'النِّيَّة',
// //     directive:
// //       "Niyyah is fundamentally a matter of the heart, not a scripted recitation — this spoken formula is a regional custom some communities use to focus the heart before starting.",
// //     lines: [
// //       {
// //         id: 'niyyah-1',
// //         arabic: 'نَوَيْتُ صَلَاةَ الْجُمُعَةِ لِلَّهِ تَعَالَى',
// //         hausa: "Na yi niyyar sallar Jumu'ah don Allah Madaukakin Sarki.",
// //         english: "I intend to perform the Jumu'ah prayer for the sake of Allah.",
// //       },
// //     ],
// //   },
// //   {
// //     id: 'takbir',
// //     order: 2,
// //     titleEnglish: 'Opening Takbir',
// //     titleHausa: 'Takbiratul Ihram',
// //     titleArabic: 'تَكْبِيرَةُ الْإِحْرَام',
// //     directive: 'Said aloud as the prayer formally begins, hands raised to the ears.',
// //     lines: [
// //       {
// //         id: 'takbir-1',
// //         arabic: 'اللَّهُ أَكْبَر',
// //         hausa: 'Allah Shine Mafi Girma.',
// //         english: 'Allah is the Greatest.',
// //       },
// //     ],
// //   },
// //   {
// //     id: 'fatiha',
// //     order: 3,
// //     titleEnglish: 'The Opening',
// //     titleHausa: 'Suratul Fatiha',
// //     titleArabic: 'سُورَةُ الْفَاتِحَة',
// //     directive: 'Recited in every unit (rak\u2019ah); the Imam recites it aloud during Jumu\u2019ah.',
// //     lines: [
// //       { id: 'fatiha-1', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', hausa: 'Da sunan Allah, Mai rahama, Mai jin ƙai.', english: 'In the name of Allah, the Most Compassionate, the Most Merciful.' },
// //       { id: 'fatiha-2', arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', hausa: 'Godiya ta tabbata ga Allah, Ubangijin halittu.', english: 'All praise is due to Allah, Lord of all the worlds.' },
// //       { id: 'fatiha-3', arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', hausa: 'Mai rahama, Mai jin ƙai.', english: 'The Most Compassionate, the Most Merciful.' },
// //       { id: 'fatiha-4', arabic: 'مَالِكِ يَوْمِ الدِّينِ', hausa: 'Mai nuna Mulkin Ranar Sakamako.', english: 'Master of the Day of Judgment.' },
// //       { id: 'fatiha-5', arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', hausa: 'Kai muke bauta wa, kuma Kai muke neman taimakonKa.', english: 'You alone we worship, and You alone we ask for help.' },
// //       { id: 'fatiha-6', arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', hausa: 'Ka shiryar da mu ga hanya madaidaiciya.', english: 'Guide us to the straight path.' },
// //       { id: 'fatiha-7', arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', hausa: "Hanyar wa\u0257anda Ka yi wa ni'ima, ba wa\u0257anda aka yi wa fushi ba, kuma ba \u0253atattu ba.", english: 'The path of those You have blessed, not of those who earned Your anger, nor of those who went astray.' },
// //     ],
// //   },
// //   {
// //     id: 'tashahhud',
// //     order: 4,
// //     titleEnglish: 'The Testimony',
// //     titleHausa: 'Tashahhud (Tahiyyatu)',
// //     titleArabic: 'التَّشَهُّد',
// //     directive: 'Recited seated in the final part of the prayer, before the closing greeting.',
// //     lines: [
// //       { id: 'tashahhud-1', arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ', hausa: 'Dukkan gaisuwa, addu\u2019o\u2019i, da tsarkakan kalmomi, na Allah ne.', english: 'All greetings, prayers, and good things belong to Allah.' },
// //       { id: 'tashahhud-2', arabic: 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ', hausa: 'Aminci ya tabbata gare ka, ya Annabi, tare da rahamar Allah da albarkarSa.', english: 'Peace be upon you, O Prophet, along with the mercy of Allah and His blessings.' },
// //       { id: 'tashahhud-3', arabic: 'السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ', hausa: 'Aminci ya tabbata a gare mu da kuma bayin Allah na gari.', english: 'Peace be upon us and upon the righteous servants of Allah.' },
// //       { id: 'tashahhud-4', arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ', hausa: 'Na shaida babu abin bautawa da gaskiya sai Allah, kuma na shaida cewa Muhammadu bawansa ne kuma Manzonsa.', english: 'I bear witness there is no god but Allah, and I bear witness Muhammad is His servant and Messenger.' },
// //     ],
// //   },
// //   {
// //     id: 'salawat',
// //     order: 5,
// //     titleEnglish: 'Blessings on the Prophet',
// //     titleHausa: 'Salatin Ibrahimiyya',
// //     titleArabic: 'الصَّلَاةُ الْإِبْرَاهِيمِيَّة',
// //     directive: 'Recited immediately after the Tashahhud.',
// //     lines: [
// //       { id: 'salawat-1', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ', hausa: 'Ya Allah, ka yi tsira ga Annabi Muhammadu da iyalansa, kamar yadda ka yi wa Annabi Ibrahim da iyalansa. Lallai Kai Mai godiya ne, Mai daraja.', english: 'O Allah, send blessings upon Muhammad and his family, as You blessed Ibrahim and his family; indeed You are Praiseworthy, Glorious.' },
// //       { id: 'salawat-2', arabic: 'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ', hausa: 'Ya Allah, ka albarkaci Annabi Muhammadu da iyalansa, kamar yadda ka albarkaci Annabi Ibrahim da iyalansa. Lallai Kai Mai godiya ne, Mai daraja.', english: 'O Allah, bless Muhammad and his family, as You blessed Ibrahim and his family; indeed You are Praiseworthy, Glorious.' },
// //     ],
// //   },
// //   {
// //     id: 'closing',
// //     order: 6,
// //     titleEnglish: 'Closing Du\u2019a & Salam',
// //     titleHausa: "Addu'a da Kammala Sallah",
// //     titleArabic: 'دُعَاءٌ وَتَسْلِيم',
// //     directive: 'The du\u2019a is recited before closing; the salam is said twice, turning the head right then left, to end the prayer.',
// //     lines: [
// //       { id: 'closing-1', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', hausa: 'Ya Ubangijinmu, ka ba mu alheri a duniya da alheri a lahira, kuma ka tsare mu daga azabar wuta.', english: 'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.' },
// //       { id: 'closing-2', arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', hausa: 'Aminci da rahamar Allah su tabbata a gare ku.', english: 'Peace and the mercy of Allah be upon you.' },
// //     ],
// //   },
// // ];

// // // ─── Animation variants ──────────────────────────────────
// // const containerVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
// // };

// // const itemVariants: Variants = {
// //   hidden: { y: 20, opacity: 0 },
// //   visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
// // };

// // // ─── Helpers ─────────────────────────────────────────────
// // function formatTime(sec: number) {
// //   if (!isFinite(sec) || sec < 0) return '0:00';
// //   const m = Math.floor(sec / 60);
// //   const s = Math.floor(sec % 60);
// //   return `${m}:${s.toString().padStart(2, '0')}`;
// // }

// // // ─── Audio + word-sync hook ──────────────────────────────
// // function usePrayerAudio() {
// //   const audioRef = useRef<HTMLAudioElement | null>(null);
// //   const [audioUrl, setAudioUrl] = useState<string | null>(null);
// //   const [fileName, setFileName] = useState<string>('');
// //   const [playing, setPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [duration, setDuration] = useState(0);

// //   useEffect(() => {
// //     const audio = audioRef.current;
// //     if (!audio) return;
// //     const onTime = () => setCurrentTime(audio.currentTime);
// //     const onLoaded = () => setDuration(audio.duration || 0);
// //     const onEnd = () => { setPlaying(false); setCurrentTime(0); };
// //     audio.addEventListener('timeupdate', onTime);
// //     audio.addEventListener('loadedmetadata', onLoaded);
// //     audio.addEventListener('ended', onEnd);
// //     return () => {
// //       audio.removeEventListener('timeupdate', onTime);
// //       audio.removeEventListener('loadedmetadata', onLoaded);
// //       audio.removeEventListener('ended', onEnd);
// //     };
// //   }, [audioUrl]);

// //   const importFile = (file: File) => {
// //     const url = URL.createObjectURL(file);
// //     setAudioUrl(url);
// //     setFileName(file.name);
// //     setPlaying(false);
// //     setCurrentTime(0);
// //     setDuration(0);
// //   };

// //   const toggle = () => {
// //     const audio = audioRef.current;
// //     if (!audio) return;
// //     if (playing) { audio.pause(); setPlaying(false); }
// //     else { audio.play(); setPlaying(true); }
// //   };

// //   const seek = (fraction: number) => {
// //     const audio = audioRef.current;
// //     if (!audio || !duration) return;
// //     audio.currentTime = fraction * duration;
// //     setCurrentTime(audio.currentTime);
// //   };

// //   const reset = () => {
// //     setAudioUrl(null);
// //     setFileName('');
// //     setPlaying(false);
// //     setCurrentTime(0);
// //     setDuration(0);
// //   };

// //   return { audioRef, audioUrl, fileName, playing, currentTime, duration, importFile, toggle, seek, reset };
// // }

// // // ─── Prayer card ──────────────────────────────────────────
// // function PrayerCard({ prayer, i }: { prayer: Prayer; i: number }) {
// //   const [expanded, setExpanded] = useState(i === 0);
// //   const player = usePrayerAudio();
// //   const inputRef = useRef<HTMLInputElement | null>(null);

// //   // Flat word index across every line — used to estimate word timing
// //   // by spreading total words evenly across the recording's duration.
// //   // Replace with real per-word timestamps later for exact sync.
// //   const allWords = useMemo(
// //     () =>
// //       prayer.lines.flatMap((line, li) =>
// //         line.arabic.split(' ').map((text, wi) => ({ li, wi, text }))
// //       ),
// //     [prayer]
// //   );
// //   const totalWords = allWords.length;
// //   const progress = player.duration > 0 ? player.currentTime / player.duration : 0;
// //   const activeGlobalIdx = player.playing
// //     ? Math.min(totalWords - 1, Math.floor(progress * totalWords))
// //     : -1;
// //   const active = activeGlobalIdx >= 0 ? allWords[activeGlobalIdx] : { li: -1, wi: -1 };

// //   return (
// //     <motion.div variants={itemVariants} className="rounded-2xl bg-white/6 border border-white/10 overflow-hidden">
// //       {/* Header row */}
// //       <button
// //         onClick={() => setExpanded((e) => !e)}
// //         className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
// //       >
// //         <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center shrink-0">
// //           <span className="text-sm font-bold text-amber-400">{prayer.order}</span>
// //         </div>
// //         <div className="flex-1 min-w-0">
// //           <div className="flex items-center gap-2 flex-wrap">
// //             <h3 className="text-base font-bold text-white">{prayer.titleHausa}</h3>
// //             <span className="text-xs text-white/40">· {prayer.titleEnglish}</span>
// //           </div>
// //           <p className="text-sm text-amber-200/50 mt-0.5" dir="rtl" lang="ar">{prayer.titleArabic}</p>
// //         </div>
// //         {player.audioUrl && (
// //           <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold shrink-0">
// //             <CheckCircle2 className="h-3.5 w-3.5" /> Audio
// //           </span>
// //         )}
// //         <ChevronDown className={`h-4 w-4 text-white/40 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
// //       </button>

// //       <AnimatePresence initial={false}>
// //         {expanded && (
// //           <motion.div
// //             initial={{ height: 0, opacity: 0 }}
// //             animate={{ height: 'auto', opacity: 1 }}
// //             exit={{ height: 0, opacity: 0 }}
// //             transition={{ duration: 0.25, ease: 'easeInOut' }}
// //             className="overflow-hidden"
// //           >
// //             <div className="px-5 pb-5 space-y-5 border-t border-white/8 pt-5">

// //               {/* Directive */}
// //               <div className="flex items-start gap-2 text-xs text-white/50 bg-white/5 rounded-lg p-3">
// //                 <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
// //                 <p>{prayer.directive}</p>
// //               </div>

// //               {/* Audio import / player */}
// //               <div className="rounded-xl bg-white/5 border border-white/10 p-4">
// //                 {!player.audioUrl ? (
// //                   <button
// //                     onClick={() => inputRef.current?.click()}
// //                     className="w-full flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-dashed border-white/15 text-white/50 hover:border-amber-400/40 hover:text-amber-300 transition-colors text-sm font-medium"
// //                   >
// //                     <Upload className="h-4 w-4" />
// //                     Import recording for this prayer
// //                   </button>
// //                 ) : (
// //                   <div className="space-y-3">
// //                     <div className="flex items-center gap-3">
// //                       <button
// //                         onClick={player.toggle}
// //                         className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0 hover:bg-amber-300 transition-colors"
// //                       >
// //                         {player.playing
// //                           ? <Pause className="h-4 w-4 text-black fill-black" />
// //                           : <Play className="h-4 w-4 text-black fill-black ml-0.5" />}
// //                       </button>
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-xs text-white/50 truncate mb-1.5">{player.fileName}</p>
// //                         <div
// //                           className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
// //                           onClick={(e) => {
// //                             const rect = e.currentTarget.getBoundingClientRect();
// //                             player.seek((e.clientX - rect.left) / rect.width);
// //                           }}
// //                         >
// //                           <div
// //                             className="h-full bg-amber-400 rounded-full"
// //                             style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
// //                           />
// //                         </div>
// //                       </div>
// //                       <span className="text-[11px] text-white/40 shrink-0 flex items-center gap-1 tabular-nums">
// //                         <Clock className="h-3 w-3" />
// //                         {formatTime(player.currentTime)} / {formatTime(player.duration)}
// //                       </span>
// //                     </div>
// //                     <button
// //                       onClick={() => { player.reset(); inputRef.current && (inputRef.current.value = ''); }}
// //                       className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/60 transition-colors"
// //                     >
// //                       <RotateCcw className="h-3 w-3" /> Replace recording
// //                     </button>
// //                   </div>
// //                 )}
// //                 <input
// //                   ref={inputRef}
// //                   type="file"
// //                   accept="audio/*"
// //                   className="hidden"
// //                   onChange={(e) => { const f = e.target.files?.[0]; if (f) player.importFile(f); }}
// //                 />
// //                 <audio ref={player.audioRef} src={player.audioUrl ?? undefined} className="hidden" />
// //               </div>

// //               {/* Tasbih-style progress beads — one per line */}
// //               {player.audioUrl && (
// //                 <div className="flex items-center gap-1.5 justify-center">
// //                   {prayer.lines.map((line, li) => (
// //                     <span
// //                       key={line.id}
// //                       className={`h-2 w-2 rounded-full transition-all ${
// //                         li < active.li ? 'bg-amber-400' :
// //                         li === active.li && player.playing ? 'bg-amber-400 scale-125 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]' :
// //                         'bg-white/15'
// //                       }`}
// //                     />
// //                   ))}
// //                 </div>
// //               )}

// //               {/* Lines */}
// //               <div className="space-y-4">
// //                 {prayer.lines.map((line, li) => {
// //                   const words = line.arabic.split(' ');
// //                   return (
// //                     <div key={line.id} className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
// //                       <p dir="rtl" lang="ar" className="text-xl sm:text-2xl leading-loose font-medium text-right">
// //                         {words.map((w, wi) => {
// //                           const isActive = player.playing && active.li === li && active.wi === wi;
// //                           const isPast = active.li > li || (active.li === li && active.wi > wi);
// //                           return (
// //                             <span
// //                               key={wi}
// //                               className={`inline-block mx-0.5 rounded px-1 transition-all duration-150 ${
// //                                 isActive
// //                                   ? 'bg-amber-400/25 text-amber-200 scale-105'
// //                                   : isPast
// //                                   ? 'text-amber-100/70'
// //                                   : 'text-white/85'
// //                               }`}
// //                             >
// //                               {w}
// //                             </span>
// //                           );
// //                         })}
// //                       </p>
// //                       <p className="text-sm text-emerald-300/80 mt-3">{line.hausa}</p>
// //                       <p className="text-xs text-white/40 mt-1">{line.english}</p>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </motion.div>
// //   );
// // }

// // // ─── Main page ────────────────────────────────────────────
// // export default function PrayersPage() {
// //   return (
// //     <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-12">

// //       {/* Header */}
// //       <motion.div variants={itemVariants} className="flex items-center gap-3">
// //         <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
// //           <Sparkles className="h-5 w-5 text-amber-400" />
// //         </div>
// //         <div>
// //           <h1 className="text-2xl lg:text-3xl font-bold text-white">Jumu'ah Prayers</h1>
// //           <p className="text-amber-200/70 mt-1 text-sm">
// //             Sallolin Jumu'ah — Arabic, Hausa, and English, in prayer order
// //           </p>
// //         </div>
// //       </motion.div>

// //       {/* Accuracy note */}
// //       <motion.div variants={itemVariants} className="flex items-start gap-3 rounded-2xl bg-white/6 border border-white/10 p-4">
// //         <BookOpen className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
// //         <p className="text-xs text-white/50 leading-relaxed">
// //           The Suratul Fatiha Hausa translation follows published Hausa Qur'an translations.
// //           Other Hausa renderings here were composed for this app and have not yet been
// //           reviewed by an imam or Hausa-speaking scholar — please confirm wording locally
// //           before treating this as authoritative.
// //         </p>
// //       </motion.div>

// //       {/* Prayer list */}
// //       <div className="space-y-3">
// //         {JUMUAH_PRAYERS.map((prayer, i) => (
// //           <PrayerCard key={prayer.id} prayer={prayer} i={i} />
// //         ))}
// //       </div>

// //       {/* Footer tip */}
// //       <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs text-white/35 justify-center">
// //         <Volume2 className="h-3.5 w-3.5" />
// //         Word highlighting is estimated evenly across each recording's length — timing gets more
// //         precise once exact word timestamps are added.
// //       </motion.div>
// //     </motion.div>
// //   );
// // }



// 'use client';

// // app/dashboard/prayers/page.tsx

// import { useEffect, useState } from 'react';
// import { BookOpen, Users, Sparkles, LucideIcon } from 'lucide-react';
// import { motion } from 'framer-motion';
// import PrayerHeader from '@/components/prayers/PrayerHeader';
// import PrayerCard from '@/components/prayers/PrayerCard';
// import { prayerModuleSummaries } from '@/data/prayers';
// import type { PrayerModuleSummary } from '@/types/prayers';

// const ICONS: Record<PrayerModuleSummary['icon'], LucideIcon> = {
//   salah: BookOpen,
//   jumuah: Users,
//   duas: Sparkles,
// };

// function readCompletedCount(prayerSlug: string): number {
//   if (typeof window === 'undefined') return 0;
//   try {
//     const raw = window.localStorage.getItem(`lingua-bridge:prayer-progress:${prayerSlug}`);
//     if (!raw) return 0;
//     const ids: string[] = JSON.parse(raw);
//     return Array.isArray(ids) ? ids.length : 0;
//   } catch {
//     return 0;
//   }
// }

// export default function PrayersLandingPage() {
//   const [progress, setProgress] = useState<Record<string, number>>({});

//   useEffect(() => {
//     setProgress({
//       salah: readCompletedCount('salah'),
//       jumuah: readCompletedCount('jumuah'),
//     });
//   }, []);

//   return (
//     <div>
//       <PrayerHeader
//         title="Prayer Learning"
//         subtitleHausa="Koyon Sallah"
//         description="Study Arabic prayer recitations with clear Hausa meaning, guided audio, and step-by-step lessons."
//       />

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3, delay: 0.1 }}
//         className="grid grid-cols-1 gap-4 sm:grid-cols-2"
//       >
//         {prayerModuleSummaries.map((module, index) => (
//           <PrayerCard
//             key={module.id}
//             module={module}
//             icon={ICONS[module.icon]}
//             completedSteps={progress[module.slug] ?? 0}
//             index={index}
//           />
//         ))}
//       </motion.div>

//       <p className="mt-8 text-xs leading-relaxed text-amber-200/40">
//         Recitations in this module are drawn from widely followed Islamic teaching and are
//         being reviewed by qualified scholars. Look for the verification badge on each lesson
//         for its current review status.
//       </p>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Filter,
  RotateCcw,
  Search,
  Sparkles,
  Sunrise,
} from "lucide-react";

interface QulPart {
  surahName: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

interface AzkarItem {
  id: number;
  parts?: QulPart[];
  arabic?: string;
  transliteration?: string;
  translation?: string;
  source: string;
}

const azkar: AzkarItem[] = [
  {
    id: 1,
    source: 'Bukhari 5017, Abu Dawud 5056, At-Tirmidhi 3402',
    parts: [
      {
        surahName: 'سُورَةُ الْإِخْلَاصِ',
        arabic:
          'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ *',
        transliteration:
          "Bismillaahir-raḥmaanir-raḥeem. Qul huwa-llaahu aḥad * allaahuṣ-ṣamad * lam yalid wa lam yoolad * wa lam yakul-lahuۥ kufuwan aḥad",
        translation:
          '"He is Allâh, (the) One. Allâh the Self-Sufficient Master, Whom all creatures need, (He neither eats nor drinks). He begets not, nor was He begotten. And there is none co-equal or comparable unto Him."',
      },
      {
        surahName: 'سُورَةُ الْفَلَقِ',
        arabic:
          'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِن شَرِّ مَا خَلَقَ * وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ *',
        transliteration:
          "Bismillaahir-raḥmaanir-raḥeem. Qul a'oodhu birabbil-falaq * min sharri maa khalaq * wa min sharri ghaasiqin idhaa waqab * wa min sharrin-naffaathaati fil-'uqad * wa min sharri ḥaasidin idhaa ḥasad",
        translation:
          '"I seek refuge with (Allâh) the Lord of the daybreak, from the evil of what He has created; and from the evil of the darkening (night) as it comes with its darkness; and from the evil of those who practice witchcrafts when they blow in the knots, and from the evil of the envier when he envies."',
      },
      {
        surahName: 'سُورَةُ النَّاسِ',
        arabic:
          'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَٰهِ النَّاسِ * مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ *',
        transliteration:
          "Bismillaahir-raḥmaanir-raḥeem. Qul a'oodh-u birabbin-naas * malikin-naas * ilaahin-naas * min sharril-waswaasil-khannaas * alladhee yuwaswisu fee ṣudoorin-naas * minal-jinnati wan-naas",
        translation:
          '"I seek refuge with (Allâh) the Lord of mankind, The King of mankind, The Ilâh (God) of mankind, from the evil of the whisperer (devil who whispers evil in the hearts of men) who withdraws (from his whispering in one\'s heart after one remembers Allâh), who whispers in the breasts of mankind, of jinn and men."',
      },
    ],
  },
  {
    id: 2,
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: "Astaghfirullaaha wa 'atoobu 'ilayhi",
    translation: 'I seek Allaah\u2019s forgiveness and I turn to Him in repentance.',
    source: 'Al-Bukhari 11:101, Muslim 2702',
  },
  {
    id: 3,
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration:
      'Allahumma innee as-aluka \u02bbilman nafi\u02bban, warizqan tayyiban, wa\u02bbamalan mutaqabbalan.',
    translation:
      'O Allah, I ask You for knowledge which is beneficial and sustenance which is good, and deeds which are acceptable.',
    source: 'Ibn Majah 925',
  },
  {
    id: 4,
    arabic:
      'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
    transliteration:
      'Allahumma \u02bbalimal-ghaybi washshahadah, fatiras-samawati wal-ard, rabba kulli shayin wamaleekah, ashhadu an la ilaha illa ant, a\u02bboothu bika min sharri nafsee wamin sharrish-shaytani washirkih, waan aqtarifa \u02bbala nafsee soo-an aw ajurrahu ila muslim.',
    translation:
      'O Allah, Knower of the unseen and the seen, Creator of the heavens and the Earth, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I take refuge in You from the evil of my soul and from the evil and shirk of the devil, and from committing wrong against my soul or bringing such upon another Muslim.',
    source: 'At-Tirmidhi 3:142',
  },
  {
    id: 5,
    arabic:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration:
      'Bismil-lahil-lathee la yadurru ma\u02bbas-mihi shay-on fil-ardi wala fis-sama-i wahuwas-sameeAAul-\u02bbaleem.',
    translation:
      'In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Seeing, The All-Knowing.',
    source: 'Abu Dawud 4:323',
  },
  {
    id: 6,
    arabic:
      '\u0631َضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    transliteration:
      'Radiytu billahi rabb\u0101n wa bil-isl\u0101mi d\u012bn\u0101n wa bi-Mu\u1e25ammadin \u1e63allall\u0101hu \u02bfalayhi wa sallam nab\u012by\u0101.',
    translation:
      'I am pleased with Allah as a Lord, and Islam as a religion and Muhammad peace be upon to him as a Prophet.',
    source: 'Abu Dawud 4:318',
  },
  {
    id: 7,
    arabic:
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    transliteration:
      'Subhanal-lahi wabihamdih, \u02bbadada khalqihi warida nafsih, wazinata \u02bbarshih, wamidada kalimatih.',
    translation:
      'How perfect Allah is and I praise Him by the number of His creation and His pleasure, and by the weight of His throne, and the ink of His words.',
    source: 'Muslim 4:2090',
  },
  {
    id: 8,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subhanal-lahi wabihamdih.',
    translation: 'How perfect Allah is and I praise Him.',
    source: 'Muslim 4:2071',
  },
  {
    id: 9,
    arabic:
      'يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    transliteration:
      'Ya hayyu ya qayyoom, birahmatika astagheeth, aslih lee sha/nee kullah, wala takilnee ila nafsee tarfata \u02bbayn.',
    translation:
      'O Ever Living, O Self-Subsisting and Supporter of all, by Your mercy I seek assistance, rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye.',
    source: 'Sahih-ut-Targhib wat-Tarhib 1:273',
  },
  {
    id: 10,
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ، فَتْحَهُ، وَنَصْرَهُ، وَنُورَهُ، وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ',
    transliteration:
      'Asbahna wa-asbahal-mulku lillahi rabbil-\u02bbalameen, allahumma innee as-aluka khayra hathal-yawm, fat-hahu, wanasrahu, wanoorahu, wabarakatahu, wahudahu, wa-a\u02bboothu bika min sharri ma feehi, washarri ma ba\u02bbdah.',
    translation:
      'We have reached the morning and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this day, its triumphs and its victories, its light and its blessings and its guidance, and I take refuge in You from the evil of this day and the evil that follows it.',
    source: 'Abu Dawud 4:322',
  },
  {
    id: 11,
    arabic:
      'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ',
    transliteration:
      'Allahumma \u02bbafinee fee badanee, allahumma \u02bbafinee fee sam\u02bbee, allahumma \u02bbafinee fee basaree, la ilaha illa ant. Allahumma innee a\u02bboothu bika minal-kufr, walfaqr, wa-a\u02bboothu bika min \u02bbathabil-qabr, la ilaha illa ant.',
    translation:
      'O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health. None has the right to be worshipped except You. O Allah, I take refuge with You from disbelief and poverty, and I take refuge with You from the punishment of the grave. None has the right to be worshipped except You.',
    source: 'Abu Dawud 4:324',
  },
  {
    id: 12,
    arabic:
      'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration:
      'Hasbiyal-lahu la ilaha illa huwa, \u02bbalayhi tawakkalt, wahuwa rabbul-\u02bbarshil-\u02bbatheem.',
    translation:
      'Allah is Sufficient for me, none has the right to be worshipped except Him, upon Him I rely and He is Lord of the exalted throne.',
    source: 'Abu Dawud 4:321',
  },
  {
    id: 13,
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    transliteration:
      'Allahumma innee as-alukal-\u02bbafwa wal\u02bbafiyah, fid-dunya wal-akhirah, allahumma innee as-alukal-\u02bbafwa wal\u02bbafiyah fee deenee, wadunyaya wa-ahlee, wamalee, allahummas-tur \u02bbawratee, wa-amin raw\u02bbatee, allahummah-fathnee min bayni yaday, wamin khalfee, wa\u02bban yameenee, wa\u02bban shimalee, wamin fawqee, wa-a\u02bboothu bi\u02bbathamatika an oghtala min tahtee.',
    translation:
      'O Allah, I ask You for pardon and well-being in this life and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth. O Allah, veil my weaknesses and set at ease my dismay. O Allah, preserve me from the front and from behind and on my right and on my left and from above, and I take refuge with You lest I be swallowed up by the earth.',
    source: 'Ibn Majah 2:332',
  },
  {
    id: 14,
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration:
      'Asbahna wa-asbahal-mulku lillah walhamdu lillah la ilaha illal-lah, wahdahu la shareeka lah, lahul-mulku walahul-hamd, wahuwa \u02bbala kulli shayin qadeer, rabbi as-aluka khayra ma fee hatha-alyawmi, wakhayra ma ba\u02bbdaho, wa-a\u02bboothu bika min sharri hatha-alyawmi, washarri ma ba\u02bbdaho, rabbi a\u02bboothu bika minal-kasal, wasoo-il kibar, rabbi a\u02bboothu bika min \u02bbathabin fin-nar, wa\u02bbathabin fil-qabr.',
    translation:
      'We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it and I take refuge in You from the evil of this day and the evil of what follows it. My Lord, I take refuge in You from laziness and senility. My Lord, I take refuge in You from torment in the Fire and punishment in the grave.',
    source: 'Muslim 4:2088',
  },
  {
    id: 15,
    arabic:
      'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration:
      'Allahumma anta rabbee la ilaha illa ant, khalaqtanee wa-ana \u02bbabduk, wa-ana \u02bbala \u02bbahdika wawa\u02bbdika mas-tata\u02bbt, a\u02bboothu bika min sharri ma sana\u02bbt, aboo-o laka bini\u02bbmatika \u02bbalay, wa-aboo-o bithanbee, faghfir lee fa-innahu la yaghfiruth-thunooba illa ant.',
    translation:
      'O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I have committed. I acknowledge Your favour upon me and I acknowledge my sin, so forgive me, for verily none can forgive sin except You.',
    source: 'Al-Bukhari 7:150',
  },
  {
    id: 16,
    arabic:
      'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    transliteration:
      'Allahumma innee asbahtu oshhiduk, wa-oshhidu hamalata \u02bbarshik, wamala-ikatak, wajamee\u02bba khalqik, annaka antal-lahu la ilaha illa ant, wahdaka la shareeka lak, wa-anna Muhammadan \u02bbabduka warasooluk.',
    translation:
      'O Allah, verily I have reached the morning and call on You, the bearers of Your throne, Your angels, and all of Your creation to witness that You are Allah, none has the right to be worshipped except You, alone, without partner and that Muhammad is Your Servant and Messenger.',
    source: 'Abu Dawud 4:317',
  },
  {
    id: 17,
    arabic:
      'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
    transliteration:
      'Allahumma ma asbaha bee min ni\u02bbamatin, aw bi-ahadin min khalqik, faminka wahdaka la shareeka lak, falakal-hamdu walakash-shukr.',
    translation:
      'O Allah, what blessing I or any of Your creation have risen upon, is from You alone, without partner, so for You is all praise and unto You all thanks.',
    source: 'Abu Dawud 4:318',
  },
  {
    id: 18,
    arabic:
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      'La ilaha illal-lah, wahdahu la shareeka lah, lahul-mulku walahul-hamd, wahuwa \u02bbala kulli shay-in qadeer.',
    translation:
      'None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent.',
    source: 'Al-Bukhari 4:95, Muslim 4:2071',
  },
  {
    id: 19,
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ',
    transliteration: "Allaahumma salli wa sallim 'alaa Nabiyyinaa Muhammadin.",
    translation: 'O Allaah, send prayers and peace upon our Prophet Muhammad.',
    source: 'Sahih al-Targhib wa al-Tarhib 1:273',
  },
  {
    id: 20,
    arabic:
      'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration:
      "All\u0101humma \u1e63alli al\u0101 Mu\u1e25ammadin wa\u2019al\u0101 \u2019\u0101li Mu\u1e25ammadin, kam\u0101 \u1e63allayta al\u0101 'Ibr\u0101h\u012bma wa\u2019al\u0101 \u2019\u0101li 'Ibr\u0101h\u012bma, 'innaka \u1e25am\u012bdum-maj\u012bd. All\u0101humma b\u0101rik al\u0101 Mu\u1e25ammadin wa\u2019al\u0101 \u2019\u0101li Mu\u1e25ammadin, kam\u0101 b\u0101rakta al\u0101 'Ibr\u0101h\u012bma wa\u2019al\u0101 '\u0101li 'Ibr\u0101h\u012bma, 'innaka \u1e25am\u012bdum-maj\u012bd.",
    translation:
      'O Allah, bestow Your favor on Muhammad and on the family of Muhammad as You have bestowed Your favor on Ibrahim and on the family of Ibrahim, You are Praiseworthy, Most Glorious. O Allah, bless Muhammad and the family of Muhammad as You have blessed Ibrahim and the family of Ibrahim, You are Praiseworthy, Most Glorious.',
    source: 'Sahih al-Bukhari 4798',
  },
  {
    id: 21,
    arabic:
      'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration:
      'Allahumma bika asbahna wabika amsayna, wabika nahya, wabika namootu wa-ilaykan-nushoor.',
    translation:
      'O Allah, by your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
    source: 'At-Tirmidhi 5:466',
  },
];

const STORAGE_KEY = "lingua-bridge:morning-azkar:recited";
type FilterMode = "all" | "remaining" | "recited";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.045 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 105, damping: 18 },
  },
};

function readStoredProgress(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    const next: Record<number, boolean> = {};
    for (const [key, value] of Object.entries(parsed)) {
      const id = Number(key);
      if (Number.isFinite(id) && value === true) next[id] = true;
    }
    return next;
  } catch {
    return {};
  }
}

function searchableText(item: AzkarItem): string {
  if (item.parts) {
    return item.parts
      .map((part) => [part.surahName, part.arabic, part.transliteration, part.translation].join(" "))
      .join(" ")
      .toLowerCase();
  }
  return [item.arabic ?? "", item.transliteration ?? "", item.translation ?? "", item.source]
    .join(" ")
    .toLowerCase();
}

function AzkarBody({
  item,
  showTransliteration,
  showMeaning,
}: {
  item: AzkarItem;
  showTransliteration: boolean;
  showMeaning: boolean;
}) {
  const arabicClass =
    "text-right text-[1.75rem] leading-[3rem] text-white sm:text-[2.05rem] sm:leading-[3.4rem]";
  const arabicStyle = {
    fontFamily: '\"Noto Naskh Arabic\", \"Amiri\", \"Scheherazade New\", serif',
  };

  if (item.parts) {
    return (
      <div className="space-y-7">
        {item.parts.map((part) => (
          <section
            key={part.surahName}
            className="rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5"
          >
            <p dir="rtl" lang="ar" className="mb-3 text-right text-sm font-semibold text-amber-300/80">
              {part.surahName}
            </p>
            <p dir="rtl" lang="ar" className={arabicClass} style={arabicStyle}>
              {part.arabic}
            </p>
            {showTransliteration && (
              <div className="mt-5 border-l-2 border-amber-400/35 pl-4">
                <p className="text-sm italic leading-7 text-amber-100/70">{part.transliteration}</p>
              </div>
            )}
            {showMeaning && (
              <div className="mt-4 rounded-xl bg-white/[0.045] p-4">
                <p className="text-sm leading-7 text-white/70">{part.translation}</p>
              </div>
            )}
          </section>
        ))}
      </div>
    );
  }

  return (
    <>
      <p dir="rtl" lang="ar" className={arabicClass} style={arabicStyle}>
        {item.arabic}
      </p>
      {showTransliteration && (
        <div className="mt-5 border-l-2 border-amber-400/35 pl-4">
          <p className="text-sm italic leading-7 text-amber-100/70">{item.transliteration}</p>
        </div>
      )}
      {showMeaning && (
        <div className="mt-4 rounded-xl bg-white/[0.045] p-4">
          <p className="text-sm leading-7 text-white/70">{item.translation}</p>
        </div>
      )}
    </>
  );
}

export default function PrayersPage() {
  const [recited, setRecited] = useState<Record<number, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);

  useEffect(() => {
    setRecited(readStoredProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recited));
  }, [recited, hydrated]);

  const recitedCount = useMemo(
    () => azkar.filter((item) => recited[item.id]).length,
    [recited],
  );

  const progressPercent = azkar.length ? (recitedCount / azkar.length) * 100 : 0;

  const visibleAzkar = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return azkar.filter((item) => {
      const isRecited = Boolean(recited[item.id]);
      if (filter === "remaining" && isRecited) return false;
      if (filter === "recited" && !isRecited) return false;
      if (!normalizedQuery) return true;
      return searchableText(item).includes(normalizedQuery);
    });
  }, [filter, query, recited]);

  function toggleRecited(id: number) {
    setRecited((current) => ({ ...current, [id]: !current[id] }));
  }

  function resetProgress() {
    if (!window.confirm("Reset your Morning Azkar recitation checks on this device?")) return;
    setRecited({});
  }

  function markAllVisible() {
    setRecited((current) => {
      const next = { ...current };
      for (const item of visibleAzkar) next[item.id] = true;
      return next;
    });
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-12"
    >
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-6 shadow-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
              <Sunrise className="h-3.5 w-3.5" /> Morning Remembrance
            </div>
            <div className="hidden items-center gap-2 text-xs text-white/45 sm:flex">
              <BookOpen className="h-3.5 w-3.5" /> {azkar.length} recitations
            </div>
          </div>

          <p
            dir="rtl"
            lang="ar"
            className="text-right text-4xl leading-tight text-white sm:text-5xl"
            style={{ fontFamily: '\"Noto Naskh Arabic\", \"Amiri\", serif' }}
          >
            أَذْكَارُ الصَّبَاحِ
          </p>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Morning Azkar</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-amber-100/60">
            Read the morning remembrance at your own pace. Mark each recitation as you complete it and continue where you left off on this device.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-white/55">Reading progress</span>
                <span className="font-semibold text-amber-300">{recitedCount} / {azkar.length}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{progressPercent.toFixed(0)}%</p>
              <p className="text-[11px] text-white/40">complete</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search meaning, transliteration, Arabic, or source..."
                className="w-full rounded-xl border border-white/10 bg-black/10 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {([['all','All'],['remaining','Remaining'],['recited','Recited']] as const).map(([value,label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${filter === value ? 'bg-amber-400 text-emerald-950' : 'bg-white/[0.06] text-white/55 hover:bg-white/10 hover:text-white'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setShowTransliteration((v) => !v)} className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white">
                {showTransliteration ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                Transliteration
              </button>
              <button type="button" onClick={() => setShowMeaning((v) => !v)} className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white">
                {showMeaning ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                Meaning
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleAzkar.length > 0 && (
                <button type="button" onClick={markAllVisible} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20">
                  <Check className="h-3.5 w-3.5" /> Mark visible recited
                </button>
              )}
              {recitedCount > 0 && (
                <button type="button" onClick={resetProgress} className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-white/45 transition hover:bg-red-500/10 hover:text-red-300">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset checks
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div variants={itemVariants} className="flex items-start gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <p className="text-xs leading-6 text-amber-100/55">
          These recitation checks are a personal reading aid only. They are stored on this device and do not award XP or affect your learning streak.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-white/55">
          <Filter className="h-4 w-4 text-amber-400" />
          <span>Showing {visibleAzkar.length} of {azkar.length}</span>
        </div>
        {recitedCount === azkar.length && azkar.length > 0 && (
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" /> Morning Azkar completed
          </div>
        )}
      </motion.div>

      <div className="space-y-4">
        {visibleAzkar.map((item) => {
          const isRecited = Boolean(recited[item.id]);
          return (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className={`overflow-hidden rounded-2xl border transition ${isRecited ? 'border-emerald-400/20 bg-emerald-500/[0.055]' : 'border-white/10 bg-white/[0.055]'}`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${isRecited ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : 'border-amber-400/25 bg-amber-400/10 text-amber-300'}`}>
                    {item.id}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white/60">Morning Remembrance {item.id}</p>
                    <p className="mt-0.5 truncate text-[11px] text-amber-300/45">{item.source}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleRecited(item.id)}
                  aria-pressed={isRecited}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${isRecited ? 'bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/20' : 'bg-white/[0.06] text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                  {isRecited ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  <span className="hidden sm:inline">{isRecited ? 'Recited' : 'Mark recited'}</span>
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <AzkarBody item={item} showTransliteration={showTransliteration} showMeaning={showMeaning} />
              </div>
            </motion.article>
          );
        })}
      </div>

      {visibleAzkar.length === 0 && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-dashed border-white/15 bg-white/[0.035] px-6 py-12 text-center">
          <Search className="mx-auto h-7 w-7 text-white/25" />
          <p className="mt-3 text-sm font-medium text-white/65">No recitations match this view.</p>
          <p className="mt-1 text-xs text-white/35">Try another search or change the filter.</p>
        </motion.div>
      )}

      <motion.footer variants={itemVariants} className="border-t border-white/10 pt-6 text-center">
        <p className="text-xs leading-6 text-white/35">
          Recitation wording, transliteration, English meaning, and source references are preserved from the Morning Azkar material supplied for this module.
        </p>
      </motion.footer>
    </motion.div>
  );
}
