// data/prayers/jumuah.ts
//
// Jumu'ah-specific material only. The standard Salah recitations
// (Fatiha, Tashahhud, etc.) live in salah.ts and are reused via
// getSalahStepBySlug — they are NOT duplicated or reframed here as if
// unique to Jumu'ah, since they aren't.

import type { Prayer, PrayerStep } from '@/types/prayers';

const steps: PrayerStep[] = [
  {
    id: 'jumuah-01',
    slug: 'what-is-jumuah',
    order: 1,
    titleHausa: "Menene Sallar Jumu'a?",
    titleArabic: 'ما هي صلاة الجمعة',
    titleEnglish: "What is Jumu'ah?",
    instructionHausa:
      "Sallar Jumu'a sallah ce ta musamman da ake yi maimakon Azahar a ranar Jumma\u2019a, tare da huduba biyu kafin rak\u2019a biyu na sallah.",
    instructionEnglish:
      "Jumu'ah is a congregational prayer performed in place of the Dhuhr prayer on Fridays, consisting of two sermons (khutbahs) followed by two rak'ahs of prayer.",
    verified: false,
    lines: [
      {
        id: 'jumuah-01-l1',
        arabic:
          'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِنْ يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَى ذِكْرِ اللَّهِ',
        hausa:
          "Ya ku wadanda suka yi imani, idan aka yi kiran sallah a ranar Jumma\u2019a, ku yi gaggawa zuwa ambaton Allah",
        arabicAudio: '/audio/prayers/arabic/jumuah-01-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/jumuah-01-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'jumuah-02',
    slug: 'khutbah-etiquette',
    order: 2,
    titleHausa: 'Ladubban Sauraron Huduba',
    titleArabic: 'آداب الاستماع للخطبة',
    titleEnglish: 'Etiquette of Listening to the Khutbah',
    instructionHausa:
      "Ana bukatar shiru da natsuwa yayin da malami ke gabatar da huduba, ba tare da magana ba.",
    instructionEnglish:
      'Congregants are asked to sit quietly and attentively while the sermon is delivered, without speaking.',
    verified: false,
    lines: [
      {
        id: 'jumuah-02-l1',
        arabic: 'إِذَا قُلْتَ لِصَاحِبِكَ أَنْصِتْ وَالْإِمَامُ يَخْطُبُ فَقَدْ لَغَوْتَ',
        hausa:
          "Idan ka ce wa abokinka \u2018yi shiru\u2019 alhali Limami yana huduba, to lallai ka yi magana banza",
        arabicAudio: '/audio/prayers/arabic/jumuah-02-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'jumuah-03',
    slug: 'jumuah-prayer',
    order: 3,
    titleHausa: "Yin Sallar Jumu'a",
    titleArabic: 'أداء صلاة الجمعة',
    titleEnglish: "Performing the Jumu'ah Prayer",
    instructionHausa:
      "Bayan huduba biyu, ana yin rak\u2019a biyu tare da Limami. Ana amfani da sanannun karatuttukan sallah — duba darasin Sallah don Fatiha, Ruku', Sujada da Tashahhud.",
    instructionEnglish:
      "After the two sermons, two rak'ahs are prayed with the imam, using the same core recitations taught in the Salah module (Fatiha, Ruku', Sujud, Tashahhud) — they are not different for Jumu'ah.",
    verified: false,
    lines: [
      {
        id: 'jumuah-03-l1',
        arabic: 'اللَّهُ أَكْبَرُ',
        hausa: 'Allah Shi ne Mafi Girma',
        english: 'Allah is the Greatest',
        arabicAudio: '/audio/prayers/arabic/jumuah-03-l1.mp3',
        verified: false,
      },
    ],
  },
];

export const jumuah: Prayer = {
  id: 'jumuah',
  slug: 'jumuah',
  nameHausa: "Sallar Jumu'a",
  nameArabic: 'صلاة الجمعة',
  nameEnglish: "Friday Prayer",
  descriptionHausa:
    "Koyi ma\u2019anar Jumu\u2019a, ladubban huduba, da yadda ake haɗa ta da ainihin sallah.",
  descriptionEnglish:
    "Learn the meaning of Jumu'ah, sermon etiquette, and how it connects to the core prayer.",
  verified: false,
  steps,
};

export function getJumuahStepBySlug(slug: string): PrayerStep | undefined {
  return jumuah.steps.find((step) => step.slug === slug);
}
