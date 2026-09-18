// lessons.ts — HausaArabia full lesson data
// hausaAudioSrc + arabicAudioSrc on every vocabulary item and exercise
// Exercises are Arabic-first: Hausa is the bridge, Arabic is the target

export type VocabularyItem = {
  hausa: string;
  arabic: string;
  english: string;
  pronunciation: string;        // romanized pronunciation of the Hausa word
  arabicPronunciation?: string; // romanized pronunciation of the Arabic word
  hausaAudioSrc?: string;       // path to recorded Hausa audio file
  arabicAudioSrc?: string;      // path to recorded Arabic audio file
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type AudioExercise = {
  id: string;
  type: 'listen_identify' | 'repeat_after_me' | 'match_pairs';
  instruction: string;
  targetWord?: string;
  targetLanguage?: 'hausa' | 'arabic';
  hausaAudioSrc?: string;
  arabicAudioSrc?: string;
  options?: string[];
  correctAnswer?: number;
  pairs?: { left: string; right: string }[];
};

export type Lesson = {
  id: string;
  unitId: string;
  unitTitle: string;
  title: string;
  description: string;
  xpReward: number;
  isPremium: boolean;
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
  audioExercises: AudioExercise[];
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  isPremium: boolean;
  lessons: Lesson[];
};

// ─────────────────────────────────────────
// UNIT 1 — Beginner Foundation
// ─────────────────────────────────────────

const greetingsLesson: Lesson = {
  id: 'u1-l1-greetings',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Basic Greetings (Gaisuwa / التحيات)',
  description: 'Learn how to greet people in Arabic — the most essential phrases for any conversation.',
  xpReward: 50,
  isPremium: false,
  vocabulary: [
    { hausa:'Sannu',         arabic:'مرحبا',        english:'Hello',                     pronunciation:'SAN-noo',             arabicPronunciation:'Mar-ha-ban',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/hi.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/hi.oga ' },
    { hausa:'Lafiya lau?',   arabic:'كيف الحال؟',   english:'How are you?(Male)',              pronunciation:'la-FEE-yah low',      arabicPronunciation:'Kay-fal haal',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/how are you.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/how are you.oga ' },
    { hausa:'Lafiya lau?',   arabic:'كيف الحال؟',   english:'How are you?(Female)',              pronunciation:'la-FEE-yah low',      arabicPronunciation:'Kay-fal haal',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/how are youf.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/how are you.oga ' },
    { hausa:'Lafiya',        arabic:'بخير',          english:'Fine / Well',               pronunciation:'la-FEE-yah',          arabicPronunciation:'Bi-khayr',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/fine.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/fine.oga' },
    { hausa:'Barka da safe', arabic:'صباح الخير',   english:'Good morning',              pronunciation:'BAR-kah dah SAH-feh', arabicPronunciation:'Sa-baa-hul khayr',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/hi.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/goodmorningarabic.oga' },
    { hausa:'Barka da rana', arabic:'مساء الخير',   english:'Good afternoon',            pronunciation:'BAR-kah dah RAH-nah', arabicPronunciation:'Ma-saa-ul khayr',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/gam.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ge.oga' },
    { hausa:'Barka da yamma',arabic:'مساء الخير',   english:'Good evening',              pronunciation:'BAR-kah dah YAH-mah', arabicPronunciation:'Ma-saa-ul khayr',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ge.oga', arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ge.oga' },
    { hausa:'Barka da dare', arabic:'ليلة سعيدة',   english:'Good night',                pronunciation:'BAR-kah dah DAH-reh', arabicPronunciation:'Lay-la-tan sa-ee-dah',hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/gn.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/gn.oga' },
    { hausa:'Sai anjima',    arabic:'إلى اللقاء',   english:'See you later',             pronunciation:'sigh an-JEE-mah',     arabicPronunciation:'I-lal li-qaa',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/syl.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/syl.oga' },
    { hausa:'Sai gobe',      arabic:'إلى الغد',     english:'See you tomorrow',          pronunciation:'sigh GO-beh',         arabicPronunciation:'I-lal ghad',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/syt.oga',       arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/syt.oga' },
    { hausa:'Na gode',       arabic:'شكراً',         english:'Thank you',                 pronunciation:'nah GO-deh',          arabicPronunciation:'Shuk-ran',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ty.oga',        arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ty.oga' },
    { hausa:'Nagode sosai',  arabic:'شكراً جزيلاً', english:'Thank you very much',       pronunciation:'nah-GO-deh SO-sigh',  arabicPronunciation:'Shuk-ran ja-zee-lan',hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/tysm.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/tyvm.oga' },
    { hausa:'Ina sunanka?',  arabic:'ما اسمك؟',     english:"What's your name? (m)",     pronunciation:'EE-nah soo-NAN-kah',  arabicPronunciation:'Mas-muk',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/wiyn.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/wiyn.oga' },
    { hausa:'Ina sunanki?',  arabic:'ما اسمك؟',     english:"What's your name? (f)",     pronunciation:'EE-nah soo-NAN-kee',  arabicPronunciation:'Mas-muk',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/wiynf.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/wiyn.oga' },
    { hausa:'Sunana ...',    arabic:'اسمي ...',      english:'My name is ...',            pronunciation:'soo-NAH-nah',         arabicPronunciation:'Is-mee',             hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/mni.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/mni.oga' },
    { hausa:'Kana lafiya?',  arabic:'هل أنت بخير؟', english:'Are you fine? (to a male)', pronunciation:'KAH-nah la-FEE-yah', arabicPronunciation:'Hal an-ta bi-khayr', hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ayf(m).oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ayf(m).oga' },
    { hausa:'Kina lafiya?',  arabic:'هل أنت بخير؟', english:'Are you fine? (to a female)',pronunciation:'KEE-nah la-FEE-yah',arabicPronunciation:'Hal an-ti bi-khayr', hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ayf(f).oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ayf(f).oga' },
  ],
  quiz: [],
  audioExercises: [
    { id:'u1l1a1', type:'listen_identify', instruction:'Listen to the Arabic greeting. Select the Arabic word you just heard.', targetWord:'مرحبا', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/marhaba.m4a', hausaAudioSrc:'/audio/hausa/sannu.m4a', options:['شكراً','مرحبا','ليلة سعيدة','إلى اللقاء'], correctAnswer:1 },
    { id:'u1l1a2', type:'listen_identify', instruction:'Listen to the Arabic phrase. Which Arabic phrase did you hear?', targetWord:'صباح الخير', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/sabah-al-khair.m4a', hausaAudioSrc:'/audio/hausa/barka-da-safe.m4a', options:['ليلة سعيدة','إلى اللقاء','صباح الخير','كيف الحال؟'], correctAnswer:2 },
    { id:'u1l1a3', type:'repeat_after_me', instruction:'Listen to the Arabic greeting and repeat it clearly. The Hausa reference helps you understand the meaning.', targetWord:'صباح الخير', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/sabah-al-khair.m4a', hausaAudioSrc:'/audio/hausa/barka-da-safe.m4a' },
    { id:'u1l1a4', type:'repeat_after_me', instruction:'Listen to this Arabic phrase and repeat it until it feels natural.', targetWord:'شكراً جزيلاً', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/shukran-jazilan.m4a', hausaAudioSrc:'/audio/hausa/nagode-sosai.m4a' },
    { id:'u1l1a5', type:'match_pairs', instruction:'Match each Hausa greeting to its Arabic equivalent. Arabic is your target — Hausa is your guide.', pairs:[{left:'Sannu',right:'مرحبا'},{left:'Na gode',right:'شكراً'},{left:'Sai gobe',right:'إلى الغد'},{left:'Barka da dare',right:'ليلة سعيدة'}] },
  ],
};

const numbersLesson: Lesson = {
  id: 'u1-l2-numbers',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Numbers (Lambobi / الأرقام)',
  description: 'Count from 1 to 100 in Arabic, using Hausa as your familiar bridge.',
  xpReward: 60,
  isPremium: false,
  vocabulary: [
    { hausa:'Daya',          arabic:'واحد',   english:'One (1)',          pronunciation:'DAH-yah',             arabicPronunciation:'Waa-hid',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/1.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/1.oga' },
    { hausa:'Biyu',          arabic:'اثنان',  english:'Two (2)',          pronunciation:'BEE-yoo',             arabicPronunciation:'Ith-naan',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/2.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/2.oga' },
    { hausa:'Uku',           arabic:'ثلاثة',  english:'Three (3)',        pronunciation:'OO-koo',              arabicPronunciation:'Tha-laa-tha',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/3.oga',            arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/2.oga' },
    { hausa:'Hudu',          arabic:'أربعة',  english:'Four (4)',         pronunciation:'HOO-doo',             arabicPronunciation:'Ar-ba-a',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/4.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/4.oga' },
    { hausa:'Biyar',         arabic:'خمسة',   english:'Five (5)',         pronunciation:'BEE-yar',             arabicPronunciation:'Kham-sa',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/5.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/5.oga' },
    { hausa:'Shida',         arabic:'ستة',    english:'Six (6)',          pronunciation:'SHEE-dah',            arabicPronunciation:'Sit-ta',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/6.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/6.oga' },
    { hausa:'Bakwai',        arabic:'سبعة',   english:'Seven (7)',        pronunciation:'BAK-why',             arabicPronunciation:'Sab-a',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/3.ogaa',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/7.oga' },
    { hausa:'Takwas',        arabic:'ثمانية', english:'Eight (8)',        pronunciation:'TAK-was',             arabicPronunciation:'Tha-maa-ni-ya',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/8.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/8.oga' },
    { hausa:'Tara',          arabic:'تسعة',   english:'Nine (9)',         pronunciation:'TAH-rah',             arabicPronunciation:'Tis-a',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/9.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/9.oga' },
    { hausa:'Goma',          arabic:'عشرة',   english:'Ten (10)',         pronunciation:'GO-mah',              arabicPronunciation:'Ash-a-ra',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/10.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/10.oga' },
    { hausa:'Goma sha daya', arabic:'أحد عشر',english:'Eleven (11)',      pronunciation:'GO-mah shah DAH-yah', arabicPronunciation:'Ah-had ash-ar',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/11.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/11.oga' },
    { hausa:'Goma sha biyu', arabic:'اثنا عشر',english:'Twelve (12)',     pronunciation:'GO-mah shah BEE-yoo', arabicPronunciation:'Ith-na ash-ar',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/12.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/122.oga' },
    { hausa:'Ashirin',       arabic:'عشرون',  english:'Twenty (20)',      pronunciation:'ah-SHEE-rin',         arabicPronunciation:'Ish-roon',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/20.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/20.oga' },
    { hausa:'Talatin',       arabic:'ثلاثون', english:'Thirty (30)',      pronunciation:'ta-LAH-tin',          arabicPronunciation:'Tha-laa-thoon',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/30.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/30.oga' },
    { hausa:"Arba'in",       arabic:'أربعون', english:'Forty (40)',       pronunciation:'ar-BAH-in',           arabicPronunciation:'Ar-ba-oon',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/40.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/40.oga' },
    { hausa:'Hamsin',        arabic:'خمسون',  english:'Fifty (50)',       pronunciation:'HAM-sin',             arabicPronunciation:'Kham-soon',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/50.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/50.oga' },
    { hausa:'Sittin',        arabic:'ستون',   english:'Sixty (60)',       pronunciation:'SIT-tin',             arabicPronunciation:'Sit-toon',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/60.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/60.oga' },
    { hausa:"Sab'in",        arabic:'سبعون',  english:'Seventy (70)',     pronunciation:'SAB-in',              arabicPronunciation:'Sab-oon',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/70.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/70.oga' },
    { hausa:'Tamanin',       arabic:'ثمانون', english:'Eighty (80)',      pronunciation:'tah-MAH-nin',         arabicPronunciation:'Tha-maa-noon',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/80.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/80.oga' },
    { hausa:"Tis'in",        arabic:'تسعون',  english:'Ninety (90)',      pronunciation:'TIS-in',              arabicPronunciation:'Tis-oon',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/90.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/90.oga' },
    { hausa:'Dari',          arabic:'مئة',    english:'One Hundred (100)',pronunciation:'DAH-ree',             arabicPronunciation:'Mi-ah',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/100.oga',            arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/100.oga' },
  ],
  quiz: [],
  audioExercises: [
    { id:'u1l2a1', type:'listen_identify', instruction:'Listen to the Arabic number. Select the Arabic word you just heard.', targetWord:'سبعة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/saba.m4a', hausaAudioSrc:'/audio/hausa/bakwai.m4a', options:['ستة','سبعة','ثمانية','تسعة'], correctAnswer:1 },
    { id:'u1l2a2', type:'listen_identify', instruction:'Listen to this Arabic number. Which one did you hear?', targetWord:'عشرة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/ashara.m4a', hausaAudioSrc:'/audio/hausa/goma.m4a', options:['سبعة','عشرة','اثنا عشر','مئة'], correctAnswer:1 },
    { id:'u1l2a3', type:'repeat_after_me', instruction:'Listen to Arabic 1–5 and repeat each one. Hausa is shown for reference.', targetWord:'واحد، اثنان، ثلاثة، أربعة، خمسة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/one-to-five.m4a', hausaAudioSrc:'/audio/hausa/one-to-five.m4a' },
    { id:'u1l2a4', type:'repeat_after_me', instruction:'Listen to the Arabic for "Three" and repeat it clearly.', targetWord:'ثلاثة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/thalatha.m4a', hausaAudioSrc:'/audio/hausa/uku.m4a' },
    { id:'u1l2a5', type:'match_pairs', instruction:'You know these numbers in Hausa. Match each to its Arabic equivalent — your target.', pairs:[{left:'Daya',right:'واحد'},{left:'Goma',right:'عشرة'},{left:'Ashirin',right:'عشرون'},{left:'Dari',right:'مئة'}] },
  ],
};

const colorsLesson: Lesson = {
  id: 'u1-l3-colors',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Colors (Launuka / الألوان)',
  description: 'Learn color names in Arabic, using Hausa as your familiar reference.',
  xpReward: 55,
  isPremium: false,
  vocabulary: [
    { hausa:'Ja',           arabic:'أحمر',       english:'Red',        pronunciation:'JAH',                 arabicPronunciation:'Ah-mar',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/red.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/red.oga' },
    { hausa:'Kore',         arabic:'أخضر',       english:'Green',      pronunciation:'KO-reh',              arabicPronunciation:'Akh-dar',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/green.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/green.oga' },
    { hausa:'Shuɗi',        arabic:'أزرق',       english:'Blue',       pronunciation:'SHOO-dee',            arabicPronunciation:'Az-raq',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/blue.oga',        arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/blue.oga' },
    { hausa:'Fari',         arabic:'أبيض',       english:'White',      pronunciation:'FAH-ree',             arabicPronunciation:'Ab-yad',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/white.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/white.oga' },
    { hausa:'Baƙi',         arabic:'أسود',       english:'Black',      pronunciation:'BAH-kee',             arabicPronunciation:'As-wad',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/black.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/black.oga' },
    { hausa:'Ruwan hoda',   arabic:'وردي',       english:'Pink',       pronunciation:'ROO-wan HO-dah',      arabicPronunciation:'War-dee',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/pink.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/pink.oga' },
    { hausa:'Ruwan lemo',   arabic:'برتقالي',    english:'Orange',     pronunciation:'ROO-wan LEH-mo',      arabicPronunciation:'Bur-tu-qaa-lee',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/orange.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/orange.oga' },
    { hausa:'Ruwan rawaya', arabic:'أصفر',       english:'Yellow',     pronunciation:'ROO-wan rah-WAH-yah', arabicPronunciation:'As-far',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/yellow.oga', arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/yellow.oga' },
    { hausa:'Ruwan toka',   arabic:'رمادي',      english:'Gray',       pronunciation:'ROO-wan TOH-kah',     arabicPronunciation:'Ra-maa-dee',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/gray.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/gray.oga' },
    { hausa:'Ruwan shuɗi',  arabic:'أزرق سماوي', english:'Light blue', pronunciation:'ROO-wan SHOO-dee',    arabicPronunciation:'Az-raq sa-maa-wee', hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/lightblue.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/lightblue.oga' },
    { hausa:'Ruwan inuwa',  arabic:'بني',        english:'Brown',      pronunciation:'ROO-wan ee-NOO-wah',  arabicPronunciation:'Bun-nee',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/brown.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/brown.oga' },
    { hausa:'Shunayya',     arabic:'بنفسجي',     english:'Purple',     pronunciation:'shoo-NAY-yah',        arabicPronunciation:'Ba-naf-sa-jee',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/purple.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/purple.oga' },
  ],
  quiz: [],
  audioExercises: [
    { id:'u1l3a1', type:'listen_identify', instruction:'Listen to the Arabic color. Select the Arabic word you heard.', targetWord:'أخضر', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/akhdar.m4a', hausaAudioSrc:'/audio/hausa/kore.m4a', options:['أزرق','أخضر','رمادي','بنفسجي'], correctAnswer:1 },
    { id:'u1l3a2', type:'listen_identify', instruction:'Listen to this Arabic color. Which one did you hear?', targetWord:'أحمر', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/ahmar.m4a', hausaAudioSrc:'/audio/hausa/ja.m4a', options:['أسود','أبيض','أحمر','أصفر'], correctAnswer:2 },
    { id:'u1l3a3', type:'repeat_after_me', instruction:'Listen to the Arabic for Blue and repeat. Focus on the deep "q" sound at the end: أزرق.', targetWord:'أزرق', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/azraq.m4a', hausaAudioSrc:'/audio/hausa/shudi.m4a' },
    { id:'u1l3a4', type:'repeat_after_me', instruction:'Listen to this 4-syllable Arabic color and repeat: Ba-naf-sa-jee.', targetWord:'بنفسجي', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/banafsaji.m4a', hausaAudioSrc:'/audio/hausa/shunayya.m4a' },
    { id:'u1l3a5', type:'match_pairs', instruction:'Use your Hausa knowledge to match each color to its Arabic. Focus on memorizing the Arabic side.', pairs:[{left:'Ja',right:'أحمر'},{left:'Fari',right:'أبيض'},{left:'Baƙi',right:'أسود'},{left:'Kore',right:'أخضر'}] },
  ],
};

const nounsLesson: Lesson = {
  id: 'u1-l4-nouns',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Simple Nouns (Sunaye / الأسماء البسيطة)',
  description: 'Learn everyday object names in Arabic — from household items to clothing and tools.',
  xpReward: 65,
  isPremium: false,
  vocabulary: [
    { hausa:'Gida',     arabic:'منزل',  english:'House',    pronunciation:'GEE-dah',        arabicPronunciation:'Man-zil',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/house.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/house.oga' },
    { hausa:'Mota',     arabic:'سيارة', english:'Car',      pronunciation:'MO-tah',         arabicPronunciation:'Say-yaa-ra',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/car.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/car.oga' },
    { hausa:'Ruwa',     arabic:'ماء',   english:'Water',    pronunciation:'ROO-wah',        arabicPronunciation:'Maa',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/water.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/water.oga' },
    { hausa:'Abinci',   arabic:'طعام',  english:'Food',     pronunciation:'ah-BIN-chee',    arabicPronunciation:'Ta-aam',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/food.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/food.oga' },
    { hausa:'Littafi',  arabic:'كتاب',  english:'Book',     pronunciation:'lit-TAH-fee',    arabicPronunciation:'Ki-taab',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/book.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/book.oga' },
    { hausa:'Alkalami', arabic:'قلم',   english:'Pen',      pronunciation:'al-KAH-lah-mee', arabicPronunciation:'Qa-lam',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/pen.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/pen.oga' },
    { hausa:'Kujera',   arabic:'كرسي',  english:'Chair',    pronunciation:'koo-JEH-rah',    arabicPronunciation:'Kur-see',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/chair.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/chair.oga' },
    { hausa:'Tebur',    arabic:'طاولة', english:'Table',    pronunciation:'TEH-bur',        arabicPronunciation:'Taa-wi-la',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/table.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/table.oga' },
    { hausa:'Kofa',     arabic:'باب',   english:'Door',     pronunciation:'KO-fah',         arabicPronunciation:'Baab',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/door.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/door.oga' },
    { hausa:'Taga',     arabic:'نافذة', english:'Window',   pronunciation:'TAH-gah',        arabicPronunciation:'Naa-fi-dha',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/window.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/window.oga' },
    { hausa:'Riga',     arabic:'قميص',  english:'Shirt',    pronunciation:'REE-gah',        arabicPronunciation:'Qa-mees',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/shirt.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/shirt.oga' },
    { hausa:'Wando',    arabic:'بنطال', english:'Trousers', pronunciation:'WAN-doh',        arabicPronunciation:'Ban-taal',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/trousers.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/trousers.oga' },
    { hausa:'Takalmi',  arabic:'حذاء',  english:'Shoe',     pronunciation:'tah-KAL-mee',    arabicPronunciation:'Hi-dhaa',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/shoe.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/shoe.oga' },
    { hausa:'Hula',     arabic:'قبعة',  english:'Hat',      pronunciation:'HOO-lah',        arabicPronunciation:'Qub-ba-a',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/hat.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/hat.oga' },
    { hausa:'Gado',     arabic:'سرير',  english:'Bed',      pronunciation:'GAH-doh',        arabicPronunciation:'Sa-reer',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/bed.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/bed.oga' },
    { hausa:'Waya',     arabic:'هاتف',  english:'Phone',    pronunciation:'WAH-yah',        arabicPronunciation:'Haa-tif',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/phone.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/phone.oga' },
    { hausa:'Fansa',    arabic:'مروحة', english:'Fan',      pronunciation:'FAN-sah',        arabicPronunciation:'Mar-wah-ha',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/fan.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/fan.oga' },
    { hausa:'Madubi',   arabic:'مرآة',  english:'Mirror',   pronunciation:'mah-DOO-bee',    arabicPronunciation:'Mir-aat',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/mirror.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/mirror.oga' },
    { hausa:'Wuka',     arabic:'سكين',  english:'Knife',    pronunciation:'WOO-kah',        arabicPronunciation:'Sik-keen',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/knife.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/knife.oga' },
    { hausa:'Cokali',   arabic:'ملعقة', english:'Spoon',    pronunciation:'cho-KAH-lee',    arabicPronunciation:'Mil-a-qa',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/spoon.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/spoon.oga' },
  ],
  quiz: [],
  audioExercises: [
    { id:'u1l4a1', type:'listen_identify', instruction:'Listen to the Arabic word. Select the Arabic word you heard.', targetWord:'كتاب', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/kitab.m4a', hausaAudioSrc:'/audio/hausa/littafi.m4a', options:['قلم','طاولة','كتاب','كرسي'], correctAnswer:2 },
    { id:'u1l4a2', type:'listen_identify', instruction:'Listen to this Arabic noun. Which one did you hear?', targetWord:'طعام', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/taam.m4a', hausaAudioSrc:'/audio/hausa/abinci.m4a', options:['ماء','طعام','منزل','سرير'], correctAnswer:1 },
    { id:'u1l4a3', type:'repeat_after_me', instruction:'Listen to "قلم" (Pen) and repeat. It sounds like "Alkalami" — because Hausa borrowed it from Arabic!', targetWord:'قلم', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/qalam.m4a', hausaAudioSrc:'/audio/hausa/alkalami.m4a' },
    { id:'u1l4a4', type:'repeat_after_me', instruction:'Listen to this Arabic noun and repeat it clearly.', targetWord:'سيارة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/sayyara.m4a', hausaAudioSrc:'/audio/hausa/mota.m4a' },
    { id:'u1l4a5', type:'match_pairs', instruction:'Match each Hausa noun to its Arabic equivalent. The Arabic is what you are learning — make it stick.', pairs:[{left:'Gida',right:'منزل'},{left:'Ruwa',right:'ماء'},{left:'Waya',right:'هاتف'},{left:'Cokali',right:'ملعقة'}] },
  ],
};

// ─────────────────────────────────────────
// UNIT 2 — Family, Days, Verbs & Conversations
// ─────────────────────────────────────────

const familyLesson: Lesson = {
  id: 'u2-l1-family',
  unitId: 'unit-2',
  unitTitle: 'Unit 2: Family, Days, Verbs & Conversations',
  title: "Family Members (Iyalan Dangi / أفراد الأسرة)",
  description: 'Learn how to talk about your family in Arabic, using Hausa as your familiar bridge.',
  xpReward: 70,
  isPremium: false,
  vocabulary: [
    { hausa:'Iyali',           arabic:'أسرة',      english:'Family',                       pronunciation:'ee-YAH-lee',         arabicPronunciation:'Us-ra', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/family.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/family.oga'  },
    { hausa:'Uwa / Mama',      arabic:'أم',        english:'Mother',                       pronunciation:'OO-wah',             arabicPronunciation:'Umm', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/mother.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/mother.oga' },
    { hausa:'Uba / Baba',      arabic:'أب',        english:'Father',                       pronunciation:'OO-bah',             arabicPronunciation:'Ab', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/father.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/father.oga' },
    { hausa:'Ɗa',              arabic:'ابن',       english:'Son',                          pronunciation:'DAH',                arabicPronunciation:'Ibn', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/son.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/son.oga'},
    { hausa:"'Ya",             arabic:'ابنة',      english:'Daughter',                     pronunciation:'YAH',                arabicPronunciation:'Ib-na', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/daugther.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/daugther.oga'},
    { hausa:"Ɗan'uwa",         arabic:'أخ',        english:'Brother',                      pronunciation:'dan-OO-wah',         arabicPronunciation:'Akh', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/brother.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/brother.oga'},
    { hausa:"'Yar'uwa",        arabic:'أخت',       english:'Sister',                       pronunciation:'yar-OO-wah',         arabicPronunciation:'Ukht', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/sister.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/sister.oga'},
    { hausa:'Kaka',            arabic:'جدة',       english:'Grandmother',                  pronunciation:'KAH-kah',            arabicPronunciation:'Jad-da', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/grandmother.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/grandmother.oga'},
    { hausa:'Kaka (na namiji)',arabic:'جد',        english:'Grandfather',                  pronunciation:'KAH-kah nah NAH-mee-jee', arabicPronunciation:'Jadd', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/grandfather.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/grandfather.oga'},
    { hausa:'Jikaci',          arabic:'حفيد',      english:'Grandchild',                   pronunciation:'jee-KAH-chee',       arabicPronunciation:'Ha-feed', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/grandchild.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/grandson.oga'},
    { hausa:'Kawu',            arabic:'عم / خال',  english:'Uncle (paternal/maternal)',    pronunciation:'KAH-woo',            arabicPronunciation:'Amm / Khaal', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/uncle.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/uncle.oga'},
    { hausa:'Inna / Goggo',    arabic:'عمة / خالة',english:'Aunt (paternal/maternal)',     pronunciation:'EEN-nah / GOG-go',   arabicPronunciation:'Am-ma / Khaa-la', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/aunt.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/sister.oga'},
    { hausa:"Ɗan uwa",         arabic:'ابن عم',    english:'Cousin (male)',                pronunciation:'dan OO-wah',         arabicPronunciation:'Ib-nu am', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/cousin m.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/cousin m.oga'},
    { hausa:"'Yar uwa",        arabic:'بنت عم',    english:'Cousin (female)',              pronunciation:'yar OO-wah',         arabicPronunciation:'Bin-tu am', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/cousin f.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/cousin f.oga'},
    { hausa:'Miji',            arabic:'زوج',       english:'Husband',                      pronunciation:'MEE-jee',            arabicPronunciation:'Zawj', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/husband.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/husband.oga'},
    { hausa:'Mata',            arabic:'زوجة',      english:'Wife',                         pronunciation:'MAH-tah',            arabicPronunciation:'Zaw-ja', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/wife.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/wife.oga'},
    { hausa:'Sabiyi',          arabic:'زوج الأم',  english:'Stepfather',                   pronunciation:'sah-BEE-yee',        arabicPronunciation:'Zawj al-umm', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/father.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/father.oga'},
    { hausa:'Sabiyi mace',     arabic:'زوجة الأب', english:'Stepmother',                   pronunciation:'sah-BEE-yee MAH-cheh', arabicPronunciation:'Zaw-jat al-ab', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/stepmother.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/stepmother.oga'},
    { hausa:'Maraya',          arabic:'يتيم',      english:'Orphan',                       pronunciation:'mah-RAH-yah',        arabicPronunciation:'Ya-teem', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/orphan.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/orphan.oga'},
    { hausa:'Makwabci',        arabic:'جار',       english:'Neighbor',                     pronunciation:'mak-WAB-chee',       arabicPronunciation:'Jaar', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/niegbour.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
  ],
  quiz: [],
  audioExercises: [
    { id:'u2l1a1', type:'listen_identify', instruction:'Listen to the Arabic word for a family member. Select what you heard.', targetWord:'أم', targetLanguage:'arabic', options:['أب','أم','أخ','جد'], correctAnswer:1 },
    { id:'u2l1a2', type:'listen_identify', instruction:'Listen to this Arabic word. Which relative does it describe?', targetWord:'أخت', targetLanguage:'arabic', options:['أخ','أخت','ابن','ابنة'], correctAnswer:1 },
    { id:'u2l1a3', type:'repeat_after_me', instruction:'Listen to the Arabic word for Grandmother and repeat it clearly.', targetWord:'جدة', targetLanguage:'arabic' },
    { id:'u2l1a4', type:'repeat_after_me', instruction:'Listen to this Arabic word for Family and repeat it.', targetWord:'أسرة', targetLanguage:'arabic' },
    { id:'u2l1a5', type:'match_pairs', instruction:'Match each Hausa family term to its Arabic equivalent.', pairs:[{left:'Uwa',right:'أم'},{left:'Uba',right:'أب'},{left:"Ɗa",right:'ابن'},{left:"'Ya",right:'ابنة'},{left:'Kaka',right:'جدة'}] },
  ],
};

const daysLesson: Lesson = {
  id: 'u2-l2-days',
  unitId: 'unit-2',
  unitTitle: 'Unit 2: Family, Days, Verbs & Conversations',
  title: 'Days of the Week (Kwanakin Mako / أيام الأسبوع)',
  description: 'Learn the days of the week, and words for time, in Arabic using Hausa as your guide.',
  xpReward: 75,
  isPremium: false,
  vocabulary: [
    { hausa:'Lahadi',            arabic:'الأحد',    english:'Sunday',                pronunciation:'lah-HAH-dee',         arabicPronunciation:'Al-ahad', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/sunday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/sunday.oga' },
    { hausa:'Litinin',           arabic:'الاثنين',  english:'Monday',                pronunciation:'lee-TEE-nin',         arabicPronunciation:'Al-ith-nayn', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/monday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/monday.oga' },
    { hausa:'Talata',            arabic:'الثلاثاء', english:'Tuesday',               pronunciation:'tah-LAH-tah',         arabicPronunciation:'Ath-thu-laa-thaa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/tuesday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/tuesday.oga' },
    { hausa:'Laraba',            arabic:'الأربعاء', english:'Wednesday',             pronunciation:'lah-RAH-bah',         arabicPronunciation:'Al-ar-bi-aa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/wed.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/wed.oga' },
    { hausa:'Alhamis',           arabic:'الخميس',   english:'Thursday',              pronunciation:'al-HAH-mees',         arabicPronunciation:'Al-kha-mees', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/thursday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/thursday.oga' },
    { hausa:"Jumma'a",           arabic:'الجمعة',   english:'Friday',                pronunciation:'JOOM-mah',            arabicPronunciation:'Al-ju-mu-ah', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/friday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/friday.oga' },
    { hausa:'Asabar',            arabic:'السبت',    english:'Saturday',              pronunciation:'ah-SAH-bar',          arabicPronunciation:'As-sabt', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/saturday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/saturday.oga' },
    { hausa:'Mako',              arabic:'أسبوع',    english:'Week',                  pronunciation:'MAH-koh',             arabicPronunciation:'Us-boo', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/week.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/week.oga' },
    { hausa:'Wata',              arabic:'شهر',      english:'Month',                 pronunciation:'WAH-tah',             arabicPronunciation:'Shahr', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/month.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/month.oga' },
    { hausa:'Shekara',           arabic:'سنة',      english:'Year',                  pronunciation:'sheh-KAH-rah',        arabicPronunciation:'Sa-na', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/year.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/year.oga' },
    { hausa:'Yau',               arabic:'اليوم',    english:'Today',                 pronunciation:'YOW',                 arabicPronunciation:'Al-yawm', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/today.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/today.oga' },
    { hausa:'Gobe',              arabic:'غداً',      english:'Tomorrow',              pronunciation:'GO-beh',              arabicPronunciation:'Gha-dan', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/tomorrow.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/tomorrow.oga' },
    { hausa:'Jiya',              arabic:'أمس',      english:'Yesterday',             pronunciation:'JEE-yah',             arabicPronunciation:'Ams', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/yesterday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/yesterday.oga' },
    { hausa:'Bayan-gobe',        arabic:'بعد غد',   english:'Day after tomorrow',    pronunciation:'BAH-yan GO-beh',      arabicPronunciation:'Ba-da ghad', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/day after tomorrow.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/day after tomorrow.oga' },
    { hausa:'Kullum / Kowane rana', arabic:'كل يوم', english:'Every day',            pronunciation:'KOOL-loom / KO-wah-neh RAH-nah', arabicPronunciation:'Kul-la yawm', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/everyday.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/everyday.oga' },
    { hausa:'Kwana daya',        arabic:'بعد يوم',  english:'Day after / Next day',  pronunciation:'KWAH-nah DAH-yah',    arabicPronunciation:'Ba-da yawm', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/tomorrow.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/tomorrow.oga' },
  ],
  quiz: [],
  audioExercises: [
    { id:'u2l2a1', type:'listen_identify', instruction:'Listen to the Arabic day. Select the Arabic word you heard.', targetWord:'الجمعة', targetLanguage:'arabic', options:['الخميس','الجمعة','السبت','الأحد'], correctAnswer:1 },
    { id:'u2l2a2', type:'listen_identify', instruction:'Listen to this Arabic time word. Which one did you hear?', targetWord:'غداً', targetLanguage:'arabic', options:['أمس','اليوم','غداً','بعد غد'], correctAnswer:2 },
    { id:'u2l2a3', type:'repeat_after_me', instruction:'Listen to the days of the week in Arabic (Sunday to Saturday) and repeat each one.', targetWord:'الأحد، الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت', targetLanguage:'arabic' },
    { id:'u2l2a4', type:'repeat_after_me', instruction:'Listen to the Arabic for "Week" and repeat it clearly.', targetWord:'أسبوع', targetLanguage:'arabic' },
    { id:'u2l2a5', type:'match_pairs', instruction:'Match each Hausa day to its Arabic equivalent.', pairs:[{left:'Lahadi',right:'الأحد'},{left:"Jumma'a",right:'الجمعة'},{left:'Asabar',right:'السبت'},{left:'Talata',right:'الثلاثاء'}] },
  ],
};

const verbsLesson: Lesson = {
  id: 'u2-l3-verbs',
  unitId: 'unit-2',
  unitTitle: 'Unit 2: Family, Days, Verbs & Conversations',
  title: 'Basic Verbs (Kalmomin Aiki / الأفعال الأساسية)',
  description: 'Learn everyday action words in Arabic, using Hausa as your familiar bridge.',
  xpReward: 80,
  isPremium: false,
  vocabulary: [
    { hausa:'Ci (ina ci)',                arabic:'يأكل',        english:'Eat',            pronunciation:'CHEE',              arabicPronunciation:'Ya-kul', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/eat.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/eat.oga'},
    { hausa:'Sha (ina sha)',              arabic:'يشرب',        english:'Drink',          pronunciation:'SHAH',              arabicPronunciation:'Yash-rab', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/drink.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/drink.oga'},
    { hausa:'Tafi (ina tafiya)',          arabic:'يذهب',        english:'Go',             pronunciation:'TAH-fee',           arabicPronunciation:'Yadh-hab', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/go.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/go.oga'},
    { hausa:'Zo (ina zuwa)',              arabic:'يأتي',        english:'Come',           pronunciation:'ZOH',               arabicPronunciation:'Ya-tee' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/come.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/come.oga'},
    { hausa:'Gani (ina gani)',            arabic:'يرى',         english:'See',            pronunciation:'GAH-nee',           arabicPronunciation:'Ya-raa' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/see.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/see.oga'},
    { hausa:'Ji (ina ji)',                arabic:'يسمع / يشعر', english:'Hear / Feel',    pronunciation:'JEE',               arabicPronunciation:'Yas-ma / Yash-ur' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/hear.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/hear.oga'},
    { hausa:'Yi (ina yi)',                arabic:'يفعل',        english:'Do / Make',      pronunciation:'YEE',               arabicPronunciation:'Yaf-al' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/work.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/do.oga'},
    { hausa:'Magana (ina magana)',        arabic:'يتكلم',       english:'Speak / Talk',   pronunciation:'mah-GAH-nah',       arabicPronunciation:'Ya-ta-kal-lam' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/speak.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/speak.oga'},
    { hausa:'Karanta (ina karatu)',       arabic:'يقرأ',        english:'Read',           pronunciation:'kah-RAN-tah',       arabicPronunciation:'Yaq-ra' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/read.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/read.oga'},
    { hausa:'Rubuta (ina rubutu)',        arabic:'يكتب',        english:'Write',          pronunciation:'roo-BOO-tah',       arabicPronunciation:'Yak-tub' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/write.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/write.oga'},
    { hausa:'Saiya (ina sayayya)',        arabic:'يشتري',       english:'Buy',            pronunciation:'SIGH-yah',          arabicPronunciation:'Yash-ta-ree' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/buy.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/buy.oga'},
    { hausa:'Ci (ina ci gaba)',           arabic:'يمشي',        english:'Walk',           pronunciation:'CHEE gah-BAH',      arabicPronunciation:'Yam-shee' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/walk.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/walk.oga'},
    { hausa:'Kwana (ina kwana)',          arabic:'ينام',        english:'Sleep',          pronunciation:'KWAH-nah',          arabicPronunciation:'Ya-naam' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/sleep.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/sleep.oga'},
    { hausa:'Tashi (ina tashi)',          arabic:'يقوم / يستيقظ', english:'Get up / Wake up', pronunciation:'TAH-shee',      arabicPronunciation:'Ya-qoom / Yas-tay-qiz' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/wake up.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/wake up.oga'},
    { hausa:'Wanka (ina wanka)',          arabic:'يستحم',       english:'Bathe',          pronunciation:'WAN-kah',           arabicPronunciation:'Yas-ta-him' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/bathe.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/bathe.oga'},
    { hausa:'Koya (ina koyo)',            arabic:'يتعلم',       english:'Learn',          pronunciation:'KO-yah',            arabicPronunciation:'Ya-ta-al-lam' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/learn.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/learn.oga'},
    { hausa:'Koyar (ina koyarwa)',        arabic:'يعلّم',       english:'Teach',          pronunciation:'KO-yar',            arabicPronunciation:'Yu-al-lim' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/teach.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/teach.oga'},
    { hausa:'Aiki (ina aiki)',            arabic:'يعمل',        english:'Work',           pronunciation:'AH-ee-kee',         arabicPronunciation:'Ya-mal' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/work.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/work.oga'},
    { hausa:'Hira (ina hira)',            arabic:'يتحدث / يتحادث', english:'Chat',        pronunciation:'HEE-rah',           arabicPronunciation:'Ya-ta-ha-dath' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/chat.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/chat.oga'},
    { hausa:'Daidaita (ina daidaitawa)',  arabic:'يصلح',        english:'Fix / Arrange',  pronunciation:'dye-DYE-tah',       arabicPronunciation:'Yus-lih' , hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/fix.oga', arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/fix.oga'},
  ],
  quiz: [],
  audioExercises: [
    { id:'u2l3a1', type:'listen_identify', instruction:'Listen to the Arabic verb. Select the Arabic word you heard.', targetWord:'يشرب', targetLanguage:'arabic', options:['يأكل','يشرب','يذهب','يأتي'], correctAnswer:1 },
    { id:'u2l3a2', type:'listen_identify', instruction:'Listen to this Arabic verb. Which one did you hear?', targetWord:'يكتب', targetLanguage:'arabic', options:['يقرأ','يكتب','يتكلم','يشتري'], correctAnswer:1 },
    { id:'u2l3a3', type:'repeat_after_me', instruction:'Listen to the Arabic for "Learn" and repeat it clearly.', targetWord:'يتعلم', targetLanguage:'arabic' },
    { id:'u2l3a4', type:'repeat_after_me', instruction:'Listen to the Arabic for "Sleep" and repeat it.', targetWord:'ينام', targetLanguage:'arabic' },
    { id:'u2l3a5', type:'match_pairs', instruction:'Match each Hausa verb to its Arabic equivalent.', pairs:[{left:'Ci',right:'يأكل'},{left:'Sha',right:'يشرب'},{left:'Tafi',right:'يذهب'},{left:'Karanta',right:'يقرأ'},{left:'Kwana',right:'ينام'}] },
  ],
};

const conversationsLesson: Lesson = {
  id: 'u2-l4-conversations',
  unitId: 'unit-2',
  unitTitle: 'Unit 2: Family, Days, Verbs & Conversations',
  title: 'Simple Conversation (Tattaunawa / محادثة بسيطة)',
  description: 'Practice real Hausa-to-Arabic conversations: meeting someone, being at home, and shopping at the market.',
  xpReward: 70,
  isPremium: false,
  vocabulary: [
    // Conversation 1: Meeting Someone (Haduwa da wani / لقاء شخص)
    { hausa:'Sannu, yaya kake?',              arabic:'مرحباً، كيف حالك؟',       english:'Hello, how are you?',                 pronunciation:'Sannu, yaya kake?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/hello hay.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Lafiya, nagode. Kai fa?',        arabic:'بخير، شكراً. وأنت؟',      english:'Fine, thank you. And you?',           pronunciation:'Lafiya, nagode. Kai fa?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/thank you ay.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/thank you that is good.oga'},
    { hausa:'Lafiya. Ina sunanka?',           arabic:'بخير. ما اسمك؟',          english:'Fine. What is your name?',            pronunciation:'Lafiya. Ina sunanka?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/fine wiyn.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/wiyn.oga'},
    { hausa:'Sunana Ali. Kai fa?',            arabic:'اسمي علي. وأنت؟',         english:'My name is Ali. And you?',            pronunciation:'Sunana Ali. Kai fa?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/my name is Ali.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/my name is ali.oga'},
    { hausa:'Sunana Aisha. Daga ina kake?',   arabic:'اسمي عائشة. من أين أنت؟', english:'My name is Aisha. Where are you from?', pronunciation:'Sunana Aisha. Daga ina kake?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/my name is Aisha.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/my name is aisha.oga'},
    { hausa:'Daga Kano. Kai fa?',             arabic:'من كانو. وأنت؟',          english:'From Kano. And you?',                 pronunciation:'Daga Kano. Kai fa?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/from kano.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/from kano.oga'},
    { hausa:'Daga Abuja.',                    arabic:'من أبوجا.',               english:'From Abuja.',                         pronunciation:'Daga Abuja.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/from abuja.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/from kano.oga'},
    { hausa:'Nagode da haduwa.',              arabic:'سعدت بلقائك.',            english:'Nice to meet you.',                   pronunciation:'Nagode da haduwa.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/ntmy.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/ntmy.oga'},
    { hausa:'Ni ma. Sai anjima.',             arabic:'وأنا أيضاً. إلى اللقاء.', english:'Me too. See you later.',              pronunciation:'Ni ma. Sai anjima.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/mtsyl.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/mtsyl.oga'},
    // Conversation 2: At Home (A Gida / في المنزل)
    { hausa:'Sannu, ina uwa?',                arabic:'مرحباً، أين أمي؟',        english:'Hello, where is mom?',                pronunciation:'Sannu, ina uwa?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/hello wiym.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/hello wiym.oga'},
    { hausa:'Ina nan. Me kake so?',           arabic:'أنا هنا. ماذا تريد؟',     english:"I'm here. What do you want?",         pronunciation:'Ina nan. Me kake so?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/im here.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/im here.oga'},
    { hausa:'Ina jin yunwa. Me muke ci?',     arabic:'أنا جائع. ماذا سنأكل؟',   english:"I'm hungry. What are we eating?",     pronunciation:'Ina jin yunwa. Me muke ci?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/im hungry.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/im hungry.oga'},
    { hausa:'Muna cin shinkafa da miya.',     arabic:'سنأكل أرزاً مع حساء.',    english:"We're eating rice with soup.",        pronunciation:'Muna cin shinkafa da miya.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/rice and soup.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/rice and soup.oga'},
    { hausa:'Nagode. Yayi kyau.',             arabic:'شكراً. هذا جيد.',         english:"Thanks. That's good.",                pronunciation:'Nagode. Yayi kyau.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/thats good.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/thats good.oga'},
    { hausa:'Taho mu ci.',                    arabic:'تعال نأكل.',              english:"Come, let's eat.",                    pronunciation:'Taho mu ci.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/lets eat.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/lets eat.oga'},
    // Conversation 3: In the Market (A Kasuwa / في السوق)
    { hausa:'Sannu, me kake so?',             arabic:'مرحباً، ماذا تريد؟',      english:'Hello, what do you want?',            pronunciation:'Sannu, me kake so?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/what do you want.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/what do you want.oga'},
    { hausa:'Ina son tufafi. Nawa ne wannan?',arabic:'أريد ملابس. كم ثمن هذا؟',  english:'I want clothes. How much is this?',   pronunciation:'Ina son tufafi. Nawa ne wannan?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/how much.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/how much.oga'},
    { hausa:'Naira dari da hamsin.',          arabic:'150 نيرة.',               english:'150 Naira.',                          pronunciation:'Naira dari da hamsin.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/150.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/150.oga'},
    { hausa:'Ya yi tsada. Ashirin?',          arabic:'غالي. 20؟',               english:"That's expensive. 20?",               pronunciation:'Ya yi tsada. Ashirin?', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/expensive.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/expensive.oga'},
    { hausa:"A'a, talatin.",                  arabic:'لا، 30.',                 english:'No, 30.',                             pronunciation:"A'a, talatin.", hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/no 30.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/no 30.oga'},
    { hausa:'Nagode. Zan dawo.',              arabic:'شكراً. سأعود لاحقاً.',    english:"Thanks. I'll come back.",             pronunciation:'Nagode. Zan dawo.', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/come back.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/thats good.oga'},
  ],
  quiz: [],
  audioExercises: [
    { id:'u2l4a1', type:'listen_identify', instruction:'Listen to the Arabic greeting from Conversation 1. Select the Arabic phrase you heard.', targetWord:'مرحباً، كيف حالك؟', targetLanguage:'arabic', options:['مرحباً، كيف حالك؟','شكراً. سأعود لاحقاً.','أنا هنا. ماذا تريد؟','من أين أنت؟'], correctAnswer:0 },
    { id:'u2l4a2', type:'listen_identify', instruction:'Listen to this line from Conversation 2 (At Home). Which one did you hear?', targetWord:'أنا جائع. ماذا سنأكل؟', targetLanguage:'arabic', options:['أنا هنا. ماذا تريد؟','أنا جائع. ماذا سنأكل؟','تعال نأكل.','هذا جيد.'], correctAnswer:1 },
    { id:'u2l4a3', type:'repeat_after_me', instruction:'Listen to the Market bargaining phrase and repeat it: "غالي. 20؟" (That\'s expensive. 20?).', targetWord:'غالي. 20؟', targetLanguage:'arabic' },
    { id:'u2l4a4', type:'repeat_after_me', instruction:'Listen to "سعدت بلقائك" (Nice to meet you) and repeat it.', targetWord:'سعدت بلقائك', targetLanguage:'arabic' },
    { id:'u2l4a5', type:'match_pairs', instruction:'Match each Hausa conversation line to its Arabic translation.', pairs:[{left:'Sannu, yaya kake?',right:'مرحباً، كيف حالك؟'},{left:'Nagode da haduwa.',right:'سعدت بلقائك.'},{left:'Ina jin yunwa.',right:'أنا جائع.'},{left:'Ya yi tsada.',right:'غالي.'}] },
  ],
};

const grammarLesson: Lesson = {
  id: 'u2-l5-grammar',
  unitId: 'unit-2',
  unitTitle: 'Unit 2: Family, Days, Verbs & Conversations',
  title: 'Basic Grammar (Nahawu / قواعد أساسية)',
  description: 'Learn personal pronouns, present tense, negation, and question words in Arabic.',
  xpReward: 90,
  isPremium: false,
  vocabulary: [
    // 5.1 Personal Pronouns
    { hausa:'Ni',   arabic:'أنا',    english:'I',            pronunciation:'NEE',  arabicPronunciation:'A-na', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/i.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Kai',  arabic:'أنت (م)',english:'You (m)',      pronunciation:'KYE',  arabicPronunciation:'An-ta', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/you m.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Ke',   arabic:'أنت (ف)',english:'You (f)',      pronunciation:'KEH',  arabicPronunciation:'An-ti', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/you f.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Shi',  arabic:'هو',     english:'He',           pronunciation:'SHEE', arabicPronunciation:'Hu-wa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/he.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Ita',  arabic:'هي',     english:'She',          pronunciation:'EE-tah',arabicPronunciation:'Hi-ya', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/she.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Mu',   arabic:'نحن',    english:'We',           pronunciation:'MOO',  arabicPronunciation:'Nah-nu', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/we.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Ku',   arabic:'أنتم',   english:'You (pl)',     pronunciation:'KOO',  arabicPronunciation:'An-tum', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/you pl.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Su',   arabic:'هم',     english:'They',         pronunciation:'SOO',  arabicPronunciation:'Hum', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/they.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    // 5.4 Question Words
    { hausa:'Me?',        arabic:'ماذا؟', english:'What?',              pronunciation:'MEH',           arabicPronunciation:'Maa-dhaa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/what.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Wa? / Wanene?', arabic:'من؟', english:'Who?',              pronunciation:'WAH / wah-NEH-neh', arabicPronunciation:'Man', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/who.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Ina?',       arabic:'أين؟',  english:'Where?',             pronunciation:'EE-nah',        arabicPronunciation:'Ay-na', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/where.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Yaya?',      arabic:'كيف؟',  english:'How?',               pronunciation:'YAH-yah',       arabicPronunciation:'Kay-fa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/how.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Nawa?',      arabic:'كم؟',   english:'How much / How many?', pronunciation:'NAH-wah',     arabicPronunciation:'Kam', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/how many.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Don me?',    arabic:'لماذا؟',english:'Why?',               pronunciation:'DON meh',       arabicPronunciation:'Li-maa-dhaa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/what.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Yaushe?',    arabic:'متى؟',  english:'When?',              pronunciation:'YOW-sheh',      arabicPronunciation:'Ma-taa', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/who.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
    { hausa:'Wane?',      arabic:'أي؟',   english:'Which?',             pronunciation:'WAH-neh',       arabicPronunciation:'Ay-yu', hausaAudioSrc:'/audio/lesson-two/lesson-two-hausa/where.oga',     arabicAudioSrc:'/audio/lesson-two/lesson-two-arabic/niegbour.oga'},
  ],
  quiz: [],
  audioExercises: [
    { id:'u2l5a1', type:'listen_identify', instruction:'Listen to the Arabic pronoun. Select the Arabic word you heard.', targetWord:'نحن', targetLanguage:'arabic', options:['أنا','أنت','نحن','هم'], correctAnswer:2 },
    { id:'u2l5a2', type:'listen_identify', instruction:'Listen to this Arabic question word. Which one did you hear?', targetWord:'متى؟', targetLanguage:'arabic', options:['أين؟','متى؟','كيف؟','من؟'], correctAnswer:1 },
    { id:'u2l5a3', type:'repeat_after_me', instruction:'Listen to the Arabic pronouns and repeat each one: أنا، أنت، هو، هي، نحن، هم.', targetWord:'أنا، أنت، هو، هي، نحن، هم', targetLanguage:'arabic' },
    { id:'u2l5a4', type:'repeat_after_me', instruction:'Listen to the full sentence "أنا أذهب إلى المنزل" (I am going home) and repeat it.', targetWord:'أنا أذهب إلى المنزل', targetLanguage:'arabic' },
    { id:'u2l5a5', type:'match_pairs', instruction:'Match each Hausa pronoun to its Arabic equivalent.', pairs:[{left:'Ni',right:'أنا'},{left:'Shi',right:'هو'},{left:'Ita',right:'هي'},{left:'Mu',right:'نحن'},{left:'Su',right:'هم'}] },
  ],
};


// ─────────────────────────────────────────
// HAUSA → ARABIC LESSON QUIZZES
// Every active quiz question is written in Hausa.
// Every answer choice is Arabic, so the quiz tests Arabic directly.
// Each unique Hausa/Arabic vocabulary pair taught in the lesson is tested.
// ─────────────────────────────────────────

function buildHausaToArabicQuiz(
  prefix: string,
  vocabulary: VocabularyItem[],
): QuizQuestion[] {
  // Remove exact duplicate Hausa/Arabic pairs so learners are not asked
  // the same question twice.
  const uniqueItems = vocabulary.filter((item, index, items) => {
    const key = `${item.hausa.trim()}|||${item.arabic.trim()}`;

    return (
      items.findIndex(
        (candidate) =>
          `${candidate.hausa.trim()}|||${candidate.arabic.trim()}` === key,
      ) === index
    );
  });

  const uniqueArabic = Array.from(
    new Set(
      uniqueItems
        .map((item) => item.arabic.trim())
        .filter(Boolean),
    ),
  );

  return uniqueItems.map((item, index) => {
    const correctArabic = item.arabic.trim();

    const distractors = uniqueArabic
      .filter((choice) => choice !== correctArabic)
      .slice(index % Math.max(1, uniqueArabic.length - 1))
      .concat(
        uniqueArabic
          .filter((choice) => choice !== correctArabic)
          .slice(0, index % Math.max(1, uniqueArabic.length - 1)),
      )
      .slice(0, 3);

    // All current lessons contain enough unique Arabic vocabulary for
    // four-option questions. This fallback keeps the function safe if
    // a very small lesson is added later.
    const fallbackChoices = ["—", "•••", "…"];
    while (distractors.length < 3) {
      distractors.push(fallbackChoices[distractors.length]);
    }

    // Rotate the correct answer position so it is not always in the
    // same place.
    const correctAnswer = index % 4;
    const options = [...distractors];
    options.splice(correctAnswer, 0, correctArabic);

    return {
      id: `${prefix}q${index + 1}`,
      question: `Yaya ake cewa "${item.hausa}" da Larabci?`,
      options,
      correctAnswer,
      explanation:
        `"${correctArabic}" ita ce fassarar Larabci ta "${item.hausa}" a wannan darasin.`,
    };
  });
}

greetingsLesson.quiz = buildHausaToArabicQuiz(
  "u1l1",
  greetingsLesson.vocabulary,
);

numbersLesson.quiz = buildHausaToArabicQuiz(
  "u1l2",
  numbersLesson.vocabulary,
);

colorsLesson.quiz = buildHausaToArabicQuiz(
  "u1l3",
  colorsLesson.vocabulary,
);

nounsLesson.quiz = buildHausaToArabicQuiz(
  "u1l4",
  nounsLesson.vocabulary,
);

familyLesson.quiz = buildHausaToArabicQuiz(
  "u2l1",
  familyLesson.vocabulary,
);

daysLesson.quiz = buildHausaToArabicQuiz(
  "u2l2",
  daysLesson.vocabulary,
);

verbsLesson.quiz = buildHausaToArabicQuiz(
  "u2l3",
  verbsLesson.vocabulary,
);

conversationsLesson.quiz = buildHausaToArabicQuiz(
  "u2l4",
  conversationsLesson.vocabulary,
);

grammarLesson.quiz = buildHausaToArabicQuiz(
  "u2l5",
  grammarLesson.vocabulary,
);

// ─────────────────────────────────────────
// UNITS EXPORT
// ─────────────────────────────────────────

export const UNITS: Unit[] = [
  {
    id: 'unit-1',
    title: 'Unit 1: Beginner Foundation (Matakin Farko)',
    description: 'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
    lessonCount: 4,
    isPremium: false,
    lessons: [greetingsLesson, numbersLesson, colorsLesson, nounsLesson],
  },
  {
    id: 'unit-2',
    title: "Unit 2: Family, Days, Verbs & Conversations (Iyali, Kwanaki, Aikatau & Tattaunawa)",
    description: 'Build real conversational skills: talk about family, days and time, everyday actions, and practice full dialogues and grammar.',
    lessonCount: 5,
    isPremium: true,
    lessons: [familyLesson, daysLesson, verbsLesson, conversationsLesson, grammarLesson],
  },
];

export const ALL_LESSONS: Record<string, Lesson> = {
  [greetingsLesson.id]: greetingsLesson,
  [numbersLesson.id]:   numbersLesson,
  [colorsLesson.id]:    colorsLesson,
  [nounsLesson.id]:     nounsLesson,
  [familyLesson.id]:        familyLesson,
  [daysLesson.id]:          daysLesson,
  [verbsLesson.id]:         verbsLesson,
  [conversationsLesson.id]: conversationsLesson,
  [grammarLesson.id]:       grammarLesson,
};
