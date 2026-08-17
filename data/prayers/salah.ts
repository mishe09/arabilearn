// data/prayers/salah.ts
//
// Content-only file. Pages import from here rather than hard-coding
// Arabic/Hausa text. Everything is marked `verified: false` until a
// qualified reviewer signs off — see PrayerVerificationBadge.

import type { Prayer, PrayerStep } from '@/types/prayers';

const steps: PrayerStep[] = [
  {
    id: 'salah-01',
    slug: 'intention',
    order: 1,
    titleHausa: 'Niyya (Manufa)',
    titleArabic: 'النية',
    titleEnglish: 'Intention',
    instructionHausa:
      'Kafin fara sallah, ka yi niyya a zuciyarka cewa za ka yi sallar da kake son yi, don Allah kadai.',
    instructionEnglish:
      'Before starting the prayer, form the intention in your heart for the specific prayer you are about to perform, sincerely for the sake of Allah.',
    verified: false,
    lines: [
      {
        id: 'salah-01-l1',
        arabic: 'نَوَيْتُ أَنْ أُصَلِّيَ',
        hausa: 'Na yi niyyar yin sallah',
        english: 'I intend to pray',
        arabicAudio: '/audio/prayers/arabic/salah-01-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-01-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-02',
    slug: 'takbiratul-ihram',
    order: 2,
    titleHausa: 'Takbiratul Ihram',
    titleArabic: 'تكبيرة الإحرام',
    titleEnglish: 'The Opening Takbir',
    instructionHausa:
      'Ka daga hannayenka har zuwa kunnuwa ko kafadu, sannan ka ce "Allahu Akbar" don shiga sallah.',
    instructionEnglish:
      'Raise your hands to your ears or shoulders and say the opening Takbir to formally enter the prayer.',
    verified: false,
    lines: [
      {
        id: 'salah-02-l1',
        arabic: 'اللَّهُ أَكْبَرُ',
        hausa: 'Allah Shi ne Mafi Girma',
        english: 'Allah is the Greatest',
        arabicAudio: '/audio/prayers/arabic/salah-02-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-03',
    slug: 'opening-recitation',
    order: 3,
    titleHausa: 'Buɗewar Addu\u2019a (Du\u2019aul Istiftah)',
    titleArabic: 'دعاء الاستفتاح',
    titleEnglish: 'Opening Supplication',
    instructionHausa:
      'Bayan Takbiratul Ihram, ana karanta wani gajeren addu\u2019a na buɗewa kafin Fatiha.',
    instructionEnglish:
      'After the opening Takbir, a short opening supplication is recited quietly before Al-Fatiha.',
    verified: false,
    lines: [
      {
        id: 'salah-03-l1',
        arabic:
          'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
        hausa:
          'Tsarki ya tabbata gare Ka ya Allah, kuma da yabonKa, kuma albarka ta tabbata ga sunanKa, kuma girmanKa ya daukaka, kuma babu abin bautawa da gaskiya sai Kai.',
        arabicAudio: '/audio/prayers/arabic/salah-03-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-03-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-04',
    slug: 'suratul-fatiha',
    order: 4,
    titleHausa: 'Suratul Fatiha',
    titleArabic: 'سورة الفاتحة',
    titleEnglish: 'The Opening Chapter',
    instructionHausa:
      'Ana karanta Suratul Fatiha a kowane raka\u2019a. Ita ce ginshiƙin sallah.',
    instructionEnglish:
      'Al-Fatiha is recited in every rak\u2019ah and is considered a pillar of the prayer.',
    verified: false,
    lines: [
      {
        id: 'salah-04-l1',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        hausa: 'Da sunan Allah, Mai Rahama, Mai Jin Ƙai',
        arabicAudio: '/audio/prayers/arabic/salah-04-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-04-l1.mp3',
        verified: false,
      },
      {
        id: 'salah-04-l2',
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        hausa: 'Godiya ta tabbata ga Allah, Ubangijin talikai',
        arabicAudio: '/audio/prayers/arabic/salah-04-l2.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-04-l2.mp3',
        verified: false,
      },
      {
        id: 'salah-04-l3',
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        hausa: 'Mai Rahama, Mai Jin Ƙai',
        arabicAudio: '/audio/prayers/arabic/salah-04-l3.mp3',
        verified: false,
      },
      {
        id: 'salah-04-l4',
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        hausa: 'Mai mallakar Ranar Sakamako',
        arabicAudio: '/audio/prayers/arabic/salah-04-l4.mp3',
        verified: false,
      },
      {
        id: 'salah-04-l5',
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        hausa: 'Kai kaɗai muke bauta wa, kuma Kai kaɗai muke neman taimako',
        arabicAudio: '/audio/prayers/arabic/salah-04-l5.mp3',
        verified: false,
      },
      {
        id: 'salah-04-l6',
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        hausa: 'Ka shiryar da mu ga hanya madaidaiciya',
        arabicAudio: '/audio/prayers/arabic/salah-04-l6.mp3',
        verified: false,
      },
      {
        id: 'salah-04-l7',
        arabic:
          'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        hausa:
          'Hanyar waɗanda Ka yi wa ni\u2019ima, ba ta waɗanda aka yi wa fushi ba, kuma ba ta ɓatattu ba',
        arabicAudio: '/audio/prayers/arabic/salah-04-l7.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-05',
    slug: 'additional-surah',
    order: 5,
    titleHausa: 'Wata Sura (Ƙarin Karatu)',
    titleArabic: 'سورة إضافية',
    titleEnglish: 'Additional Surah',
    instructionHausa:
      'A raka\u2019a ta farko da ta biyu, ana ƙara karanta wata gajeriyar sura bayan Fatiha, kamar Suratul Ikhlas.',
    instructionEnglish:
      'In the first two rak\u2019ahs, a short additional surah is typically recited after Al-Fatiha, such as Al-Ikhlas.',
    verified: false,
    lines: [
      {
        id: 'salah-05-l1',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        hausa: 'Ka ce: Shi Allah Guda Ɗaya ne',
        arabicAudio: '/audio/prayers/arabic/salah-05-l1.mp3',
        verified: false,
      },
      {
        id: 'salah-05-l2',
        arabic: 'اللَّهُ الصَّمَدُ',
        hausa: 'Allah, wanda ake koma zuwa gare Shi ga kowace bukata',
        arabicAudio: '/audio/prayers/arabic/salah-05-l2.mp3',
        verified: false,
      },
      {
        id: 'salah-05-l3',
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        hausa: 'Bai haifa ba, kuma ba a haife Shi ba',
        arabicAudio: '/audio/prayers/arabic/salah-05-l3.mp3',
        verified: false,
      },
      {
        id: 'salah-05-l4',
        arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        hausa: 'Kuma babu wani da ya yi daidai da Shi',
        arabicAudio: '/audio/prayers/arabic/salah-05-l4.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-06',
    slug: 'ruku',
    order: 6,
    titleHausa: "Ruku'",
    titleArabic: 'الركوع',
    titleEnglish: 'Bowing',
    instructionHausa:
      'Ka ce "Allahu Akbar" sannan ka durƙusa, hannayenka a kan gwiwoyi, bayanka a miƙe.',
    instructionEnglish:
      'Say the Takbir and bow, placing your hands on your knees with your back straight.',
    verified: false,
    lines: [
      {
        id: 'salah-06-l1',
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        hausa: 'Tsarki ya tabbata ga Ubangijina Mai Girma',
        arabicAudio: '/audio/prayers/arabic/salah-06-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-06-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-07',
    slug: 'rising-from-ruku',
    order: 7,
    titleHausa: "Tashi daga Ruku'",
    titleArabic: 'الرفع من الركوع',
    titleEnglish: "Rising from Ruku'",
    instructionHausa:
      'Ka tashi tsaye daga ruku\u2019, ka miƙe gaba ɗaya kafin ka ci gaba zuwa sujada.',
    instructionEnglish:
      'Rise fully upright from bowing before continuing to prostration.',
    verified: false,
    lines: [
      {
        id: 'salah-07-l1',
        arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
        hausa: 'Allah Ya ji wanda Ya gode Masa',
        arabicAudio: '/audio/prayers/arabic/salah-07-l1.mp3',
        verified: false,
      },
      {
        id: 'salah-07-l2',
        arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ',
        hausa: 'Ya Ubangijinmu, gare Ka godiya ta tabbata',
        arabicAudio: '/audio/prayers/arabic/salah-07-l2.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-08',
    slug: 'sujud',
    order: 8,
    titleHausa: 'Sujada ta Farko',
    titleArabic: 'السجود',
    titleEnglish: 'Prostration',
    instructionHausa:
      'Ka ce "Allahu Akbar" sannan ka fadi ƙasa cikin sujada, goshi da hanci a ƙasa.',
    instructionEnglish:
      'Say the Takbir and go down into prostration, placing your forehead and nose on the ground.',
    verified: false,
    lines: [
      {
        id: 'salah-08-l1',
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        hausa: 'Tsarki ya tabbata ga Ubangijina Mafi Ɗaukaka',
        arabicAudio: '/audio/prayers/arabic/salah-08-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-08-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-09',
    slug: 'sitting-between-prostrations',
    order: 9,
    titleHausa: 'Zama Tsakanin Sujada Biyu',
    titleArabic: 'الجلسة بين السجدتين',
    titleEnglish: 'Sitting Between the Two Prostrations',
    instructionHausa:
      'Ka tashi daga sujada ka zauna cikin natsuwa kafin ka koma sujada ta biyu.',
    instructionEnglish:
      'Sit up calmly from the first prostration before returning to the second.',
    verified: false,
    lines: [
      {
        id: 'salah-09-l1',
        arabic: 'رَبِّ اغْفِرْ لِي',
        hausa: 'Ya Ubangijina, Ka gafarta mini',
        arabicAudio: '/audio/prayers/arabic/salah-09-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-09-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-10',
    slug: 'second-sujud',
    order: 10,
    titleHausa: 'Sujada ta Biyu',
    titleArabic: 'السجدة الثانية',
    titleEnglish: 'The Second Prostration',
    instructionHausa: 'Ka koma sujada karo na biyu, kamar ta farko.',
    instructionEnglish: 'Return to prostration a second time, as in the first.',
    verified: false,
    lines: [
      {
        id: 'salah-10-l1',
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        hausa: 'Tsarki ya tabbata ga Ubangijina Mafi Ɗaukaka',
        arabicAudio: '/audio/prayers/arabic/salah-10-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-10-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-11',
    slug: 'tashahhud',
    order: 11,
    titleHausa: 'Tashahhud',
    titleArabic: 'التشهد',
    titleEnglish: 'The Testimony',
    instructionHausa:
      'Ana zama a ƙarshen raka\u2019a ta biyu da ta ƙarshe don karanta Tashahhud.',
    instructionEnglish:
      'Recited while seated at the end of the second rak\u2019ah and the final rak\u2019ah.',
    verified: false,
    lines: [
      {
        id: 'salah-11-l1',
        arabic:
          'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
        hausa:
          'Gaisuwa duk na Allah ne, da sallar addu\u2019a, da tsarkakakkun kalmomi. Aminci ya tabbata gare ka, ya Annabi, da rahamar Allah da albarkarSa',
        arabicAudio: '/audio/prayers/arabic/salah-11-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-11-l1.mp3',
        verified: false,
      },
      {
        id: 'salah-11-l2',
        arabic:
          'السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ',
        hausa: 'Aminci ya tabbata a gare mu da kuma bayin Allah salihai',
        arabicAudio: '/audio/prayers/arabic/salah-11-l2.mp3',
        verified: false,
      },
      {
        id: 'salah-11-l3',
        arabic:
          'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        hausa:
          'Na shaida babu abin bautawa da gaskiya sai Allah, kuma na shaida Muhammadu bawanSa ne kuma manzonSa',
        arabicAudio: '/audio/prayers/arabic/salah-11-l3.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-12',
    slug: 'salatul-ibrahimiyyah',
    order: 12,
    titleHausa: 'Salatul Ibrahimiyyah',
    titleArabic: 'الصلاة الإبراهيمية',
    titleEnglish: 'Blessings Upon the Prophet',
    instructionHausa:
      'A zaman ƙarshe, ana ci gaba da Tashahhud da wannan addu\u2019ar yabo ga Annabi.',
    instructionEnglish:
      'In the final sitting, the Tashahhud continues with this supplication praising the Prophet.',
    verified: false,
    lines: [
      {
        id: 'salah-12-l1',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
        hausa:
          'Ya Allah, Ka yi rahama ga Muhammadu da alayensa, kamar yadda Ka yi wa Ibrahim da alayensa, lallai Kai Mai Yabo ne, Mai Girma',
        arabicAudio: '/audio/prayers/arabic/salah-12-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-12-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-13',
    slug: 'closing-dua',
    order: 13,
    titleHausa: 'Addu\u2019ar Rufewa',
    titleArabic: 'الدعاء الختامي',
    titleEnglish: 'Closing Supplication',
    instructionHausa:
      'Kafin salam, akan iya ƙara wata addu\u2019ar neman tsari daga fitina da azaba.',
    instructionEnglish:
      'Before the final salutation, an additional supplication for protection may be added.',
    verified: false,
    lines: [
      {
        id: 'salah-13-l1',
        arabic:
          'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ',
        hausa:
          'Ya Allah, ina neman tsari a wurinKa daga azabar Jahannama da azabar kabari',
        arabicAudio: '/audio/prayers/arabic/salah-13-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-13-l1.mp3',
        verified: false,
      },
    ],
  },
  {
    id: 'salah-14',
    slug: 'salam',
    order: 14,
    titleHausa: 'Salam',
    titleArabic: 'التسليم',
    titleEnglish: 'The Closing Salutation',
    instructionHausa:
      'Ka juya fuska dama ka ce Salam, sannan hagu, don kammala sallah.',
    instructionEnglish:
      'Turn your face to the right and say the salutation, then to the left, to complete the prayer.',
    verified: false,
    lines: [
      {
        id: 'salah-14-l1',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        hausa: 'Aminci ya tabbata a gare ku, da rahamar Allah',
        arabicAudio: '/audio/prayers/arabic/salah-14-l1.mp3',
        hausaAudio: '/audio/prayers/hausa/salah-14-l1.mp3',
        verified: false,
      },
    ],
  },
];

export const salah: Prayer = {
  id: 'salah',
  slug: 'salah',
  nameHausa: 'Sallah',
  nameArabic: 'الصلاة',
  nameEnglish: 'The Prayer',
  descriptionHausa:
    'Koyon yadda ake gudanar da sallah mataki-mataki, tare da Larabci da fassarar Hausa.',
  descriptionEnglish:
    'Learn how to perform the prayer step by step, with Arabic recitation and Hausa meaning.',
  verified: false,
  steps,
};

export function getSalahStepBySlug(slug: string): PrayerStep | undefined {
  return salah.steps.find((step) => step.slug === slug);
}
