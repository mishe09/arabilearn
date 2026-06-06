// // lessons.ts — HausaArabia full lesson data
// // Covers Unit 1: Greetings, Numbers, Colors, Simple Nouns
// // Each lesson has: vocabulary (hausa/arabic/english/pronunciation),
// // quiz questions, and audio exercises (listen-and-identify, repeat-after-me)

// export type VocabularyItem = {
//   hausa: string;
//   arabic: string;
//   english: string;
//   pronunciation: string; // romanized pronunciation guide for Hausa
// };

// export type QuizQuestion = {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number; // index into options[]
//   explanation: string;
// };

// export type AudioExercise = {
//   id: string;
//   type: 'listen_identify' | 'repeat_after_me' | 'match_pairs';
//   instruction: string;
//   // For listen_identify: hear a word, pick the correct meaning
//   targetWord?: string;      // the word spoken
//   targetLanguage?: 'hausa' | 'arabic';
//   options?: string[];       // choices (in English or target lang)
//   correctAnswer?: number;
//   // For match_pairs: match hausa to arabic/english
//   pairs?: { left: string; right: string }[];
// };

// export type Lesson = {
//   id: string;
//   unitId: string;
//   unitTitle: string;
//   title: string;
//   description: string;
//   xpReward: number;
//   isPremium: boolean;
//   vocabulary: VocabularyItem[];
//   quiz: QuizQuestion[];
//   audioExercises: AudioExercise[];
// };

// export type Unit = {
//   id: string;
//   title: string;
//   description: string;
//   lessonCount: number;
//   isPremium: boolean;
//   lessons: Lesson[];
// };

// // ─────────────────────────────────────────
// // UNIT 1 — Beginner Foundation
// // ─────────────────────────────────────────

// const greetingsLesson: Lesson = {
//   id: 'u1-l1-greetings',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Basic Greetings (Gaisuwa / التحيات)',
//   description: 'Learn how to greet people in Hausa and Arabic — the most essential phrases for any conversation.',
//   xpReward: 50,
//   isPremium: false,
//   vocabulary: [
//     { hausa: 'Sannu', arabic: 'مرحبا', english: 'Hello', pronunciation: 'SAN-noo' },
//     { hausa: 'Lafiya lau?', arabic: 'كيف الحال؟', english: 'How are you?', pronunciation: 'la-FEE-yah low' },
//     { hausa: 'Lafiya', arabic: 'بخير', english: 'Fine / Well', pronunciation: 'la-FEE-yah' },
//     { hausa: 'Barka da safe', arabic: 'صباح الخير', english: 'Good morning', pronunciation: 'BAR-kah dah SAH-feh' },
//     { hausa: 'Barka da rana', arabic: 'مساء الخير', english: 'Good afternoon', pronunciation: 'BAR-kah dah RAH-nah' },
//     { hausa: 'Barka da yamma', arabic: 'مساء الخير', english: 'Good evening', pronunciation: 'BAR-kah dah YAH-mah' },
//     { hausa: 'Barka da dare', arabic: 'ليلة سعيدة', english: 'Good night', pronunciation: 'BAR-kah dah DAH-reh' },
//     { hausa: 'Sai anjima', arabic: 'إلى اللقاء', english: 'See you later', pronunciation: 'sigh an-JEE-mah' },
//     { hausa: 'Sai gobe', arabic: 'إلى الغد', english: 'See you tomorrow', pronunciation: 'sigh GO-beh' },
//     { hausa: 'Na gode', arabic: 'شكراً', english: 'Thank you', pronunciation: 'nah GO-deh' },
//     { hausa: 'Nagode sosai', arabic: 'شكراً جزيلاً', english: 'Thank you very much', pronunciation: 'nah-GO-deh SO-sigh' },
//     { hausa: 'Ina sunanka?', arabic: 'ما اسمك؟', english: "What's your name? (m)", pronunciation: 'EE-nah soo-NAN-kah' },
//     { hausa: 'Ina sunanki?', arabic: 'ما اسمك؟', english: "What's your name? (f)", pronunciation: 'EE-nah soo-NAN-kee' },
//     { hausa: 'Sunana ...', arabic: 'اسمي ...', english: 'My name is ...', pronunciation: 'soo-NAH-nah' },
//     { hausa: 'Kana lafiya?', arabic: 'هل أنت بخير؟', english: 'Are you fine? (to a male)', pronunciation: 'KAH-nah la-FEE-yah' },
//     { hausa: 'Kina lafiya?', arabic: 'هل أنت بخير؟', english: 'Are you fine? (to a female)', pronunciation: 'KEE-nah la-FEE-yah' },
//   ],
//   quiz: [
//     {
//       id: 'u1l1q1',
//       question: 'What does "Sannu" mean in English?',
//       options: ['Goodbye', 'Hello', 'Thank you', 'Good morning'],
//       correctAnswer: 1,
//       explanation: '"Sannu" is the standard Hausa greeting meaning "Hello". In Arabic, this is "مرحبا" (Marhaba).',
//     },
//     {
//       id: 'u1l1q2',
//       question: 'Which phrase means "Good morning" in Hausa?',
//       options: ['Barka da dare', 'Sai gobe', 'Barka da safe', 'Lafiya lau'],
//       correctAnswer: 2,
//       explanation: '"Barka da safe" means "Good morning". "Safe" means morning in Hausa.',
//     },
//     {
//       id: 'u1l1q3',
//       question: 'How do you say "Thank you very much" in Hausa?',
//       options: ['Na gode', 'Nagode sosai', 'Lafiya', 'Sannu'],
//       correctAnswer: 1,
//       explanation: '"Nagode sosai" means "Thank you very much". "Sosai" intensifies the thanks.',
//     },
//     {
//       id: 'u1l1q4',
//       question: 'What is the Arabic translation of "Barka da dare"?',
//       options: ['صباح الخير', 'مرحبا', 'ليلة سعيدة', 'شكراً'],
//       correctAnswer: 2,
//       explanation: '"Barka da dare" means "Good night", which is "ليلة سعيدة" (Laylatan sa\'idah) in Arabic.',
//     },
//     {
//       id: 'u1l1q5',
//       question: 'What does "Sai anjima" mean?',
//       options: ['See you tomorrow', 'How are you?', 'See you later', 'Good evening'],
//       correctAnswer: 2,
//       explanation: '"Sai anjima" means "See you later". For "See you tomorrow" use "Sai gobe".',
//     },
//     {
//       id: 'u1l1q6',
//       question: 'Which question would you ask a female about how she is?',
//       options: ['Kana lafiya?', 'Ina sunanka?', 'Kina lafiya?', 'Lafiya lau?'],
//       correctAnswer: 2,
//       explanation: '"Kina lafiya?" is used for females. "Kana lafiya?" is used for males. Hausa distinguishes gender in address.',
//     },
//     {
//       id: 'u1l1q7',
//       question: '"اسمي ..." in Arabic corresponds to which Hausa phrase?',
//       options: ['Ina sunanka?', 'Sunana ...', 'Lafiya', 'Na gode'],
//       correctAnswer: 1,
//       explanation: '"Sunana ..." means "My name is ..." in Hausa, matching the Arabic "اسمي ...".',
//     },
//   ],
//   audioExercises: [
//     {
//       id: 'u1l1a1',
//       type: 'listen_identify',
//       instruction: 'Listen to the word, then select the correct English meaning.',
//       targetWord: 'Sannu',
//       targetLanguage: 'hausa',
//       options: ['Goodbye', 'Hello', 'Good night', 'Thank you'],
//       correctAnswer: 1,
//     },
//     {
//       id: 'u1l1a2',
//       type: 'listen_identify',
//       instruction: 'Listen to the Arabic phrase and select what it means.',
//       targetWord: 'صباح الخير',
//       targetLanguage: 'arabic',
//       options: ['Good night', 'See you later', 'Good morning', 'How are you?'],
//       correctAnswer: 2,
//     },
//     {
//       id: 'u1l1a3',
//       type: 'repeat_after_me',
//       instruction: 'Listen to the phrase, then repeat it aloud. Practice 3 times.',
//       targetWord: 'Barka da safe',
//       targetLanguage: 'hausa',
//     },
//     {
//       id: 'u1l1a4',
//       type: 'repeat_after_me',
//       instruction: 'Listen to this Arabic phrase and repeat it.',
//       targetWord: 'شكراً جزيلاً',
//       targetLanguage: 'arabic',
//     },
//     {
//       id: 'u1l1a5',
//       type: 'match_pairs',
//       instruction: 'Match each Hausa greeting to its Arabic equivalent.',
//       pairs: [
//         { left: 'Sannu', right: 'مرحبا' },
//         { left: 'Na gode', right: 'شكراً' },
//         { left: 'Sai gobe', right: 'إلى الغد' },
//         { left: 'Barka da dare', right: 'ليلة سعيدة' },
//       ],
//     },
//   ],
// };

// const numbersLesson: Lesson = {
//   id: 'u1-l2-numbers',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Numbers (Lambobi / الأرقام)',
//   description: 'Count from 1 to 100 in both Hausa and Arabic. Numbers are the foundation of daily communication.',
//   xpReward: 60,
//   isPremium: false,
//   vocabulary: [
//     { hausa: 'Daya', arabic: 'واحد', english: 'One (1)', pronunciation: 'DAH-yah' },
//     { hausa: 'Biyu', arabic: 'اثنان', english: 'Two (2)', pronunciation: 'BEE-yoo' },
//     { hausa: 'Uku', arabic: 'ثلاثة', english: 'Three (3)', pronunciation: 'OO-koo' },
//     { hausa: 'Hudu', arabic: 'أربعة', english: 'Four (4)', pronunciation: 'HOO-doo' },
//     { hausa: 'Biyar', arabic: 'خمسة', english: 'Five (5)', pronunciation: 'BEE-yar' },
//     { hausa: 'Shida', arabic: 'ستة', english: 'Six (6)', pronunciation: 'SHEE-dah' },
//     { hausa: 'Bakwai', arabic: 'سبعة', english: 'Seven (7)', pronunciation: 'BAK-why' },
//     { hausa: 'Takwas', arabic: 'ثمانية', english: 'Eight (8)', pronunciation: 'TAK-was' },
//     { hausa: 'Tara', arabic: 'تسعة', english: 'Nine (9)', pronunciation: 'TAH-rah' },
//     { hausa: 'Goma', arabic: 'عشرة', english: 'Ten (10)', pronunciation: 'GO-mah' },
//     { hausa: 'Goma sha daya', arabic: 'أحد عشر', english: 'Eleven (11)', pronunciation: 'GO-mah shah DAH-yah' },
//     { hausa: 'Goma sha biyu', arabic: 'اثنا عشر', english: 'Twelve (12)', pronunciation: 'GO-mah shah BEE-yoo' },
//     { hausa: 'Ashirin', arabic: 'عشرون', english: 'Twenty (20)', pronunciation: 'ah-SHEE-rin' },
//     { hausa: 'Talatin', arabic: 'ثلاثون', english: 'Thirty (30)', pronunciation: 'ta-LAH-tin' },
//     { hausa: 'Arba\'in', arabic: 'أربعون', english: 'Forty (40)', pronunciation: 'ar-BAH-in' },
//     { hausa: 'Hamsin', arabic: 'خمسون', english: 'Fifty (50)', pronunciation: 'HAM-sin' },
//     { hausa: 'Sittin', arabic: 'ستون', english: 'Sixty (60)', pronunciation: 'SIT-tin' },
//     { hausa: 'Sab\'in', arabic: 'سبعون', english: 'Seventy (70)', pronunciation: 'SAB-in' },
//     { hausa: 'Tamanin', arabic: 'ثمانون', english: 'Eighty (80)', pronunciation: 'tah-MAH-nin' },
//     { hausa: 'Tis\'in', arabic: 'تسعون', english: 'Ninety (90)', pronunciation: 'TIS-in' },
//     { hausa: 'Dari', arabic: 'مئة', english: 'One Hundred (100)', pronunciation: 'DAH-ree' },
//   ],
//   quiz: [
//     {
//       id: 'u1l2q1',
//       question: 'What is the Hausa word for the number 7?',
//       options: ['Shida', 'Bakwai', 'Tara', 'Takwas'],
//       correctAnswer: 1,
//       explanation: '"Bakwai" is seven in Hausa. In Arabic, 7 is "سبعة" (Sab\'ah).',
//     },
//     {
//       id: 'u1l2q2',
//       question: 'Which Arabic word means "Ten"?',
//       options: ['ثلاثة', 'عشرة', 'خمسة', 'واحد'],
//       correctAnswer: 1,
//       explanation: '"عشرة" (Ashara) means ten. The Hausa word for 10 is "Goma".',
//     },
//     {
//       id: 'u1l2q3',
//       question: 'How do you say 20 in Hausa?',
//       options: ['Goma sha biyu', 'Talatin', 'Ashirin', 'Dari'],
//       correctAnswer: 2,
//       explanation: '"Ashirin" means twenty. "Goma sha biyu" means twelve (10 + 2).',
//     },
//     {
//       id: 'u1l2q4',
//       question: 'What does "Dari" mean?',
//       options: ['Fifty', 'Seventy', 'One Hundred', 'Thirty'],
//       correctAnswer: 2,
//       explanation: '"Dari" is 100 in Hausa, equivalent to "مئة" (Mi\'ah) in Arabic.',
//     },
//     {
//       id: 'u1l2q5',
//       question: 'What is "Goma sha daya" in English?',
//       options: ['Ten', 'Twelve', 'Eleven', 'Twenty-one'],
//       correctAnswer: 2,
//       explanation: '"Goma sha daya" literally means "Ten and one" = 11. Hausa teen numbers follow this pattern.',
//     },
//     {
//       id: 'u1l2q6',
//       question: 'Which number is "خمسون" in Arabic?',
//       options: ['15', '50', '500', '5'],
//       correctAnswer: 1,
//       explanation: '"خمسون" (Khamsoon) means fifty. The Hausa equivalent is "Hamsin".',
//     },
//     {
//       id: 'u1l2q7',
//       question: 'What pattern do Hausa teen numbers (11-19) follow?',
//       options: [
//         'They use completely different roots',
//         'Goma (10) + sha + the unit number',
//         'They borrow from Arabic directly',
//         'They prefix the unit with "Da"',
//       ],
//       correctAnswer: 1,
//       explanation: 'Hausa teens use "Goma sha [unit]". So 13 = "Goma sha uku" (10 + 3).',
//     },
//   ],
//   audioExercises: [
//     {
//       id: 'u1l2a1',
//       type: 'listen_identify',
//       instruction: 'Listen to the number word and select its numeric value.',
//       targetWord: 'Bakwai',
//       targetLanguage: 'hausa',
//       options: ['6', '7', '8', '9'],
//       correctAnswer: 1,
//     },
//     {
//       id: 'u1l2a2',
//       type: 'listen_identify',
//       instruction: 'Listen to the Arabic number and choose the correct English value.',
//       targetWord: 'عشرة',
//       targetLanguage: 'arabic',
//       options: ['7', '10', '12', '100'],
//       correctAnswer: 1,
//     },
//     {
//       id: 'u1l2a3',
//       type: 'repeat_after_me',
//       instruction: 'Count along! Listen to each number and repeat it.',
//       targetWord: 'Daya, Biyu, Uku, Hudu, Biyar',
//       targetLanguage: 'hausa',
//     },
//     {
//       id: 'u1l2a4',
//       type: 'repeat_after_me',
//       instruction: 'Listen to this Arabic number and repeat clearly.',
//       targetWord: 'ثلاثة',
//       targetLanguage: 'arabic',
//     },
//     {
//       id: 'u1l2a5',
//       type: 'match_pairs',
//       instruction: 'Match each Hausa number to its Arabic equivalent.',
//       pairs: [
//         { left: 'Daya', right: 'واحد' },
//         { left: 'Goma', right: 'عشرة' },
//         { left: 'Ashirin', right: 'عشرون' },
//         { left: 'Dari', right: 'مئة' },
//       ],
//     },
//   ],
// };

// const colorsLesson: Lesson = {
//   id: 'u1-l3-colors',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Colors (Launuka / الألوان)',
//   description: 'Learn the names of colors in Hausa and Arabic to describe the world around you.',
//   xpReward: 55,
//   isPremium: false,
//   vocabulary: [
//     { hausa: 'Ja', arabic: 'أحمر', english: 'Red', pronunciation: 'JAH' },
//     { hausa: 'Kore', arabic: 'أخضر', english: 'Green', pronunciation: 'KO-reh' },
//     { hausa: 'Shuɗi', arabic: 'أزرق', english: 'Blue', pronunciation: 'SHOO-dee' },
//     { hausa: 'Fari', arabic: 'أبيض', english: 'White', pronunciation: 'FAH-ree' },
//     { hausa: 'Baƙi', arabic: 'أسود', english: 'Black', pronunciation: 'BAH-kee' },
//     { hausa: 'Ruwan hoda', arabic: 'وردي', english: 'Pink', pronunciation: 'ROO-wan HO-dah' },
//     { hausa: 'Ruwan lemo', arabic: 'برتقالي', english: 'Orange', pronunciation: 'ROO-wan LEH-mo' },
//     { hausa: 'Ruwan rawaya', arabic: 'أصفر', english: 'Yellow', pronunciation: 'ROO-wan rah-WAH-yah' },
//     { hausa: 'Ruwan toka', arabic: 'رمادي', english: 'Gray', pronunciation: 'ROO-wan TOH-kah' },
//     { hausa: 'Ruwan shuɗi', arabic: 'أزرق سماوي', english: 'Light blue', pronunciation: 'ROO-wan SHOO-dee' },
//     { hausa: 'Ruwan inuwa', arabic: 'بني', english: 'Brown', pronunciation: 'ROO-wan ee-NOO-wah' },
//     { hausa: 'Shunayya', arabic: 'بنفسجي', english: 'Purple', pronunciation: 'shoo-NAY-yah' },
//   ],
//   quiz: [
//     {
//       id: 'u1l3q1',
//       question: 'What color does "Ja" represent?',
//       options: ['Blue', 'Green', 'Red', 'Black'],
//       correctAnswer: 2,
//       explanation: '"Ja" means Red in Hausa. The Arabic equivalent is "أحمر" (Ahmar).',
//     },
//     {
//       id: 'u1l3q2',
//       question: 'What does "أسود" mean in English?',
//       options: ['White', 'Gray', 'Brown', 'Black'],
//       correctAnswer: 3,
//       explanation: '"أسود" (Aswad) means Black. In Hausa this is "Baƙi".',
//     },
//     {
//       id: 'u1l3q3',
//       question: 'Many Hausa color names begin with "Ruwan". What does "Ruwan" mean?',
//       options: ['Dark', 'Light', 'Color of / shade of', 'Very'],
//       correctAnswer: 2,
//       explanation: '"Ruwan" means "water of" or "shade of" in Hausa, used to describe color shades (e.g. Ruwan hoda = shade of pink).',
//     },
//     {
//       id: 'u1l3q4',
//       question: 'Which Hausa word means Purple?',
//       options: ['Shunayya', 'Kore', 'Shuɗi', 'Ruwan toka'],
//       correctAnswer: 0,
//       explanation: '"Shunayya" means Purple in Hausa. In Arabic it is "بنفسجي" (Banafsaji).',
//     },
//     {
//       id: 'u1l3q5',
//       question: 'What is the Arabic word for Green?',
//       options: ['أزرق', 'أخضر', 'أصفر', 'أحمر'],
//       correctAnswer: 1,
//       explanation: '"أخضر" (Akhdar) means Green. Hausa: "Kore".',
//     },
//     {
//       id: 'u1l3q6',
//       question: 'How do you say "White" in Hausa?',
//       options: ['Baƙi', 'Ruwan hoda', 'Fari', 'Ja'],
//       correctAnswer: 2,
//       explanation: '"Fari" means White in Hausa. In Arabic, White is "أبيض" (Abyad).',
//     },
//     {
//       id: 'u1l3q7',
//       question: '"وردي" in Arabic is which color?',
//       options: ['Orange', 'Yellow', 'Pink', 'Brown'],
//       correctAnswer: 2,
//       explanation: '"وردي" (Wardi) means Pink. Hausa: "Ruwan hoda".',
//     },
//   ],
//   audioExercises: [
//     {
//       id: 'u1l3a1',
//       type: 'listen_identify',
//       instruction: 'Listen to the color name and pick the correct English color.',
//       targetWord: 'Kore',
//       targetLanguage: 'hausa',
//       options: ['Blue', 'Green', 'Gray', 'Purple'],
//       correctAnswer: 1,
//     },
//     {
//       id: 'u1l3a2',
//       type: 'listen_identify',
//       instruction: 'Listen to this Arabic color and identify it.',
//       targetWord: 'أحمر',
//       targetLanguage: 'arabic',
//       options: ['Black', 'White', 'Red', 'Yellow'],
//       correctAnswer: 2,
//     },
//     {
//       id: 'u1l3a3',
//       type: 'repeat_after_me',
//       instruction: 'Repeat this color name in Hausa, focusing on the "ɗ" sound.',
//       targetWord: 'Shuɗi',
//       targetLanguage: 'hausa',
//     },
//     {
//       id: 'u1l3a4',
//       type: 'repeat_after_me',
//       instruction: 'Listen to this Arabic color and repeat it carefully.',
//       targetWord: 'بنفسجي',
//       targetLanguage: 'arabic',
//     },
//     {
//       id: 'u1l3a5',
//       type: 'match_pairs',
//       instruction: 'Match each Hausa color to its Arabic equivalent.',
//       pairs: [
//         { left: 'Ja', right: 'أحمر' },
//         { left: 'Fari', right: 'أبيض' },
//         { left: 'Baƙi', right: 'أسود' },
//         { left: 'Kore', right: 'أخضر' },
//       ],
//     },
//   ],
// };

// const nounsLesson: Lesson = {
//   id: 'u1-l4-nouns',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Simple Nouns (Sunaye / الأسماء البسيطة)',
//   description: 'Learn everyday object names in Hausa and Arabic — from household items to clothing and tools.',
//   xpReward: 65,
//   isPremium: false,
//   vocabulary: [
//     { hausa: 'Gida', arabic: 'منزل', english: 'House', pronunciation: 'GEE-dah' },
//     { hausa: 'Mota', arabic: 'سيارة', english: 'Car', pronunciation: 'MO-tah' },
//     { hausa: 'Ruwa', arabic: 'ماء', english: 'Water', pronunciation: 'ROO-wah' },
//     { hausa: 'Abinci', arabic: 'طعام', english: 'Food', pronunciation: 'ah-BIN-chee' },
//     { hausa: 'Littafi', arabic: 'كتاب', english: 'Book', pronunciation: 'lit-TAH-fee' },
//     { hausa: 'Alkalami', arabic: 'قلم', english: 'Pen', pronunciation: 'al-KAH-lah-mee' },
//     { hausa: 'Kujera', arabic: 'كرسي', english: 'Chair', pronunciation: 'koo-JEH-rah' },
//     { hausa: 'Tebur', arabic: 'طاولة', english: 'Table', pronunciation: 'TEH-bur' },
//     { hausa: 'Kofa', arabic: 'باب', english: 'Door', pronunciation: 'KO-fah' },
//     { hausa: 'Taga', arabic: 'نافذة', english: 'Window', pronunciation: 'TAH-gah' },
//     { hausa: 'Riga', arabic: 'قميص', english: 'Shirt', pronunciation: 'REE-gah' },
//     { hausa: 'Wando', arabic: 'بنطال', english: 'Trousers', pronunciation: 'WAN-doh' },
//     { hausa: 'Takalmi', arabic: 'حذاء', english: 'Shoe', pronunciation: 'tah-KAL-mee' },
//     { hausa: 'Hula', arabic: 'قبعة', english: 'Hat', pronunciation: 'HOO-lah' },
//     { hausa: 'Gado', arabic: 'سرير', english: 'Bed', pronunciation: 'GAH-doh' },
//     { hausa: 'Waya', arabic: 'هاتف', english: 'Phone', pronunciation: 'WAH-yah' },
//     { hausa: 'Fansa', arabic: 'مروحة', english: 'Fan', pronunciation: 'FAN-sah' },
//     { hausa: 'Madubi', arabic: 'مرآة', english: 'Mirror', pronunciation: 'mah-DOO-bee' },
//     { hausa: 'Wuka', arabic: 'سكين', english: 'Knife', pronunciation: 'WOO-kah' },
//     { hausa: 'Cokali', arabic: 'ملعقة', english: 'Spoon', pronunciation: 'cho-KAH-lee' },
//   ],
//   quiz: [
//     {
//       id: 'u1l4q1',
//       question: 'What is the Hausa word for "Book"?',
//       options: ['Alkalami', 'Littafi', 'Tebur', 'Kujera'],
//       correctAnswer: 1,
//       explanation: '"Littafi" means Book in Hausa. The Arabic equivalent is "كتاب" (Kitab).',
//     },
//     {
//       id: 'u1l4q2',
//       question: 'What does "سيارة" mean in English?',
//       options: ['House', 'Phone', 'Car', 'Water'],
//       correctAnswer: 2,
//       explanation: '"سيارة" (Sayyarah) means Car. Hausa: "Mota".',
//     },
//     {
//       id: 'u1l4q3',
//       question: 'Which Hausa word means "Door"?',
//       options: ['Taga', 'Kofa', 'Gida', 'Gado'],
//       correctAnswer: 1,
//       explanation: '"Kofa" means Door. "Taga" means Window, "Gida" means House, "Gado" means Bed.',
//     },
//     {
//       id: 'u1l4q4',
//       question: 'What is "قلم" in English?',
//       options: ['Chair', 'Table', 'Book', 'Pen'],
//       correctAnswer: 3,
//       explanation: '"قلم" (Qalam) means Pen. Hausa: "Alkalami". This word is also borrowed into Hausa from Arabic!',
//     },
//     {
//       id: 'u1l4q5',
//       question: 'How do you say "Shoe" in Hausa?',
//       options: ['Hula', 'Riga', 'Wando', 'Takalmi'],
//       correctAnswer: 3,
//       explanation: '"Takalmi" means Shoe. "Hula" = Hat, "Riga" = Shirt, "Wando" = Trousers.',
//     },
//     {
//       id: 'u1l4q6',
//       question: 'What does "Waya" mean?',
//       options: ['Water', 'Fan', 'Phone', 'Mirror'],
//       correctAnswer: 2,
//       explanation: '"Waya" means Phone (literally "wire" — from the era of telegraphs). Arabic: "هاتف" (Hatif).',
//     },
//     {
//       id: 'u1l4q7',
//       question: 'Which pair is INCORRECT?',
//       options: [
//         'Ruwa → ماء (Water)',
//         'Abinci → طعام (Food)',
//         'Cokali → سكين (Spoon)',
//         'Gado → سرير (Bed)',
//       ],
//       correctAnswer: 2,
//       explanation: '"Cokali" means Spoon (ملعقة), not Knife. Knife is "Wuka" (سكين).',
//     },
//     {
//       id: 'u1l4q8',
//       question: 'What is the Arabic word for "Window"?',
//       options: ['باب', 'نافذة', 'طاولة', 'كرسي'],
//       correctAnswer: 1,
//       explanation: '"نافذة" (Nafidhah) means Window. Hausa: "Taga". باب = Door, طاولة = Table, كرسي = Chair.',
//     },
//   ],
//   audioExercises: [
//     {
//       id: 'u1l4a1',
//       type: 'listen_identify',
//       instruction: 'Listen to the Hausa word and choose what it refers to.',
//       targetWord: 'Littafi',
//       targetLanguage: 'hausa',
//       options: ['Pen', 'Table', 'Book', 'Chair'],
//       correctAnswer: 2,
//     },
//     {
//       id: 'u1l4a2',
//       type: 'listen_identify',
//       instruction: 'Listen to the Arabic word and pick the correct English meaning.',
//       targetWord: 'طعام',
//       targetLanguage: 'arabic',
//       options: ['Water', 'Food', 'House', 'Bed'],
//       correctAnswer: 1,
//     },
//     {
//       id: 'u1l4a3',
//       type: 'repeat_after_me',
//       instruction: 'Repeat this household item in Hausa.',
//       targetWord: 'Alkalami',
//       targetLanguage: 'hausa',
//     },
//     {
//       id: 'u1l4a4',
//       type: 'repeat_after_me',
//       instruction: 'Listen and repeat this Arabic noun.',
//       targetWord: 'سيارة',
//       targetLanguage: 'arabic',
//     },
//     {
//       id: 'u1l4a5',
//       type: 'match_pairs',
//       instruction: 'Match each Hausa noun to its Arabic translation.',
//       pairs: [
//         { left: 'Gida', right: 'منزل' },
//         { left: 'Ruwa', right: 'ماء' },
//         { left: 'Waya', right: 'هاتف' },
//         { left: 'Cokali', right: 'ملعقة' },
//       ],
//     },
//   ],
// };

// // ─────────────────────────────────────────
// // UNITS EXPORT
// // ─────────────────────────────────────────

// export const UNITS: Unit[] = [
//   {
//     id: 'unit-1',
//     title: 'Unit 1: Beginner Foundation (Matakin Farko)',
//     description: 'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
//     lessonCount: 4,
//     isPremium: false,
//     lessons: [greetingsLesson, numbersLesson, colorsLesson, nounsLesson],
//   },
//   // Unit 2+ can be added here as premium content
// ];

// export const ALL_LESSONS: Record<string, Lesson> = {
//   [greetingsLesson.id]: greetingsLesson,
//   [numbersLesson.id]: numbersLesson,
//   [colorsLesson.id]: colorsLesson,
//   [nounsLesson.id]: nounsLesson,
// };





// lessons.ts — HausaArabia full lesson data
// Covers Unit 1: Greetings, Numbers, Colors, Simple Nouns
// Each lesson has: vocabulary (hausa/arabic/english/pronunciation),
// quiz questions, and audio exercises (listen-and-identify, repeat-after-me)

export type VocabularyItem = {
  hausa: string;
  arabic: string;
  english: string;
  pronunciation: string; // romanized pronunciation guide for Hausa
  audioSrc?: string; // optional uploaded audio file for the Hausa word/phrase
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index into options[]
  explanation: string;
};

export type AudioExercise = {
  id: string;
  type: 'listen_identify' | 'repeat_after_me' | 'match_pairs';
  instruction: string;
  // For listen_identify: hear a word, pick the correct meaning
  targetWord?: string;      // the word spoken
  targetLanguage?: 'hausa' | 'arabic';
  audioSrc?: string;        // optional uploaded audio file for this exercise
  options?: string[];       // choices (in English or target lang)
  correctAnswer?: number;
  // For match_pairs: match hausa to arabic/english
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
  description: 'Learn how to greet people in Hausa and Arabic — the most essential phrases for any conversation.',
  xpReward: 50,
  isPremium: false,
  vocabulary: [
    { hausa: 'Sannu', arabic: 'مرحبا', english: 'Hello', pronunciation: 'SAN-noo', audioSrc: '/audio/lessons/hello.m4a' },
    { hausa: 'Lafiya lau?', arabic: 'كيف الحال؟', english: 'How are you?', pronunciation: 'la-FEE-yah low', audioSrc: '/audio/lessons/hows-it-going.m4a' },
    { hausa: 'Lafiya', arabic: 'بخير', english: 'Fine / Well', pronunciation: 'la-FEE-yah', audioSrc: '/audio/lessons/fine.m4a' },
    { hausa: 'Barka da safe', arabic: 'صباح الخير', english: 'Good morning', pronunciation: 'BAR-kah dah SAH-feh', audioSrc: '/audio/lessons/good-morning.m4a' },
    { hausa: 'Barka da rana', arabic: 'مساء الخير', english: 'Good afternoon', pronunciation: 'BAR-kah dah RAH-nah' },
    { hausa: 'Barka da yamma', arabic: 'مساء الخير', english: 'Good evening', pronunciation: 'BAR-kah dah YAH-mah', audioSrc: '/audio/lessons/good-evening.m4a' },
    { hausa: 'Barka da dare', arabic: 'ليلة سعيدة', english: 'Good night', pronunciation: 'BAR-kah dah DAH-reh', audioSrc: '/audio/lessons/good-night.m4a' },
    { hausa: 'Sai anjima', arabic: 'إلى اللقاء', english: 'See you later', pronunciation: 'sigh an-JEE-mah', audioSrc: '/audio/lessons/see-you-later.m4a' },
    { hausa: 'Sai gobe', arabic: 'إلى الغد', english: 'See you tomorrow', pronunciation: 'sigh GO-beh', audioSrc: '/audio/lessons/see-you-tomorrow.m4a' },
    { hausa: 'Na gode', arabic: 'شكراً', english: 'Thank you', pronunciation: 'nah GO-deh', audioSrc: '/audio/lessons/thank-you.m4a' },
    { hausa: 'Nagode sosai', arabic: 'شكراً جزيلاً', english: 'Thank you very much', pronunciation: 'nah-GO-deh SO-sigh', audioSrc: '/audio/lessons/thank-you-very-much.m4a' },
    { hausa: 'Ina sunanka?', arabic: 'ما اسمك؟', english: "What's your name? (m)", pronunciation: 'EE-nah soo-NAN-kah', audioSrc: '/audio/lessons/what-is-your-name-m.m4a' },
    { hausa: 'Ina sunanki?', arabic: 'ما اسمك؟', english: "What's your name? (f)", pronunciation: 'EE-nah soo-NAN-kee', audioSrc: '/audio/lessons/what-is-your-name-f.m4a' },
    { hausa: 'Sunana ...', arabic: 'اسمي ...', english: 'My name is ...', pronunciation: 'soo-NAH-nah', audioSrc: '/audio/lessons/my-name-is.m4a' },
    { hausa: 'Kana lafiya?', arabic: 'هل أنت بخير؟', english: 'Are you fine? (to a male)', pronunciation: 'KAH-nah la-FEE-yah', audioSrc: '/audio/lessons/are-you-fine-m.m4a' },
    { hausa: 'Kina lafiya?', arabic: 'هل أنت بخير؟', english: 'Are you fine? (to a female)', pronunciation: 'KEE-nah la-FEE-yah', audioSrc: '/audio/lessons/are-you-fine-f.m4a' },
  ],
  quiz: [
    {
      id: 'u1l1q1',
      question: 'What does "Sannu" mean in English?',
      options: ['Goodbye', 'Hello', 'Thank you', 'Good morning'],
      correctAnswer: 1,
      explanation: '"Sannu" is the standard Hausa greeting meaning "Hello". In Arabic, this is "مرحبا" (Marhaba).',
    },
    {
      id: 'u1l1q2',
      question: 'Which phrase means "Good morning" in Hausa?',
      options: ['Barka da dare', 'Sai gobe', 'Barka da safe', 'Lafiya lau'],
      correctAnswer: 2,
      explanation: '"Barka da safe" means "Good morning". "Safe" means morning in Hausa.',
    },
    {
      id: 'u1l1q3',
      question: 'How do you say "Thank you very much" in Hausa?',
      options: ['Na gode', 'Nagode sosai', 'Lafiya', 'Sannu'],
      correctAnswer: 1,
      explanation: '"Nagode sosai" means "Thank you very much". "Sosai" intensifies the thanks.',
    },
    {
      id: 'u1l1q4',
      question: 'What is the Arabic translation of "Barka da dare"?',
      options: ['صباح الخير', 'مرحبا', 'ليلة سعيدة', 'شكراً'],
      correctAnswer: 2,
      explanation: '"Barka da dare" means "Good night", which is "ليلة سعيدة" (Laylatan sa\'idah) in Arabic.',
    },
    {
      id: 'u1l1q5',
      question: 'What does "Sai anjima" mean?',
      options: ['See you tomorrow', 'How are you?', 'See you later', 'Good evening'],
      correctAnswer: 2,
      explanation: '"Sai anjima" means "See you later". For "See you tomorrow" use "Sai gobe".',
    },
    {
      id: 'u1l1q6',
      question: 'Which question would you ask a female about how she is?',
      options: ['Kana lafiya?', 'Ina sunanka?', 'Kina lafiya?', 'Lafiya lau?'],
      correctAnswer: 2,
      explanation: '"Kina lafiya?" is used for females. "Kana lafiya?" is used for males. Hausa distinguishes gender in address.',
    },
    {
      id: 'u1l1q7',
      question: '"اسمي ..." in Arabic corresponds to which Hausa phrase?',
      options: ['Ina sunanka?', 'Sunana ...', 'Lafiya', 'Na gode'],
      correctAnswer: 1,
      explanation: '"Sunana ..." means "My name is ..." in Hausa, matching the Arabic "اسمي ...".',
    },
  ],
  audioExercises: [
    {
      id: 'u1l1a1',
      type: 'listen_identify',
      instruction: 'Listen to the word, then select the correct English meaning.',
      targetWord: 'Sannu',
      targetLanguage: 'hausa',
      audioSrc: '/audio/lessons/hello.m4a',
      options: ['Goodbye', 'Hello', 'Good night', 'Thank you'],
      correctAnswer: 1,
    },
    {
      id: 'u1l1a2',
      type: 'listen_identify',
      instruction: 'Listen to the Arabic phrase and select what it means.',
      targetWord: 'صباح الخير',
      targetLanguage: 'arabic',
      options: ['Good night', 'See you later', 'Good morning', 'How are you?'],
      correctAnswer: 2,
    },
    {
      id: 'u1l1a3',
      type: 'repeat_after_me',
      instruction: 'Listen to the phrase, then repeat it aloud. Practice 3 times.',
      targetWord: 'Barka da safe',
      targetLanguage: 'hausa',
      audioSrc: '/audio/lessons/good-morning.m4a',
    },
    {
      id: 'u1l1a4',
      type: 'repeat_after_me',
      instruction: 'Listen to this Arabic phrase and repeat it.',
      targetWord: 'شكراً جزيلاً',
      targetLanguage: 'arabic',
    },
    {
      id: 'u1l1a5',
      type: 'match_pairs',
      instruction: 'Match each Hausa greeting to its Arabic equivalent.',
      pairs: [
        { left: 'Sannu', right: 'مرحبا' },
        { left: 'Na gode', right: 'شكراً' },
        { left: 'Sai gobe', right: 'إلى الغد' },
        { left: 'Barka da dare', right: 'ليلة سعيدة' },
      ],
    },
  ],
};

const numbersLesson: Lesson = {
  id: 'u1-l2-numbers',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Numbers (Lambobi / الأرقام)',
  description: 'Count from 1 to 100 in both Hausa and Arabic. Numbers are the foundation of daily communication.',
  xpReward: 60,
  isPremium: false,
  vocabulary: [
    { hausa: 'Daya', arabic: 'واحد', english: 'One (1)', pronunciation: 'DAH-yah', audioSrc: '/audio/lessons/one-1.m4a' },
    { hausa: 'Biyu', arabic: 'اثنان', english: 'Two (2)', pronunciation: 'BEE-yoo', audioSrc: '/audio/lessons/2.m4a' },
    { hausa: 'Uku', arabic: 'ثلاثة', english: 'Three (3)', pronunciation: 'OO-koo', audioSrc: '/audio/lessons/3.m4a' },
    { hausa: 'Hudu', arabic: 'أربعة', english: 'Four (4)', pronunciation: 'HOO-doo', audioSrc: '/audio/lessons/4.m4a' },
    { hausa: 'Biyar', arabic: 'خمسة', english: 'Five (5)', pronunciation: 'BEE-yar', audioSrc: '/audio/lessons/5.m4a' },
    { hausa: 'Shida', arabic: 'ستة', english: 'Six (6)', pronunciation: 'SHEE-dah', audioSrc: '/audio/lessons/6.m4a' },
    { hausa: 'Bakwai', arabic: 'سبعة', english: 'Seven (7)', pronunciation: 'BAK-why', audioSrc: '/audio/lessons/7.m4a' },
    { hausa: 'Takwas', arabic: 'ثمانية', english: 'Eight (8)', pronunciation: 'TAK-was', audioSrc: '/audio/lessons/8.m4a' },
    { hausa: 'Tara', arabic: 'تسعة', english: 'Nine (9)', pronunciation: 'TAH-rah', audioSrc: '/audio/lessons/9.m4a' },
    { hausa: 'Goma', arabic: 'عشرة', english: 'Ten (10)', pronunciation: 'GO-mah', audioSrc: '/audio/lessons/10.m4a' },
    { hausa: 'Goma sha daya', arabic: 'أحد عشر', english: 'Eleven (11)', pronunciation: 'GO-mah shah DAH-yah' },
    { hausa: 'Goma sha biyu', arabic: 'اثنا عشر', english: 'Twelve (12)', pronunciation: 'GO-mah shah BEE-yoo', audioSrc: '/audio/lessons/12.m4a' },
    { hausa: 'Ashirin', arabic: 'عشرون', english: 'Twenty (20)', pronunciation: 'ah-SHEE-rin', audioSrc: '/audio/lessons/20.m4a' },
    { hausa: 'Talatin', arabic: 'ثلاثون', english: 'Thirty (30)', pronunciation: 'ta-LAH-tin', audioSrc: '/audio/lessons/30.m4a' },
    { hausa: 'Arba\'in', arabic: 'أربعون', english: 'Forty (40)', pronunciation: 'ar-BAH-in', audioSrc: '/audio/lessons/40.m4a' },
    { hausa: 'Hamsin', arabic: 'خمسون', english: 'Fifty (50)', pronunciation: 'HAM-sin', audioSrc: '/audio/lessons/50.m4a' },
    { hausa: 'Sittin', arabic: 'ستون', english: 'Sixty (60)', pronunciation: 'SIT-tin', audioSrc: '/audio/lessons/60.m4a' },
    { hausa: 'Sab\'in', arabic: 'سبعون', english: 'Seventy (70)', pronunciation: 'SAB-in', audioSrc: '/audio/lessons/70.m4a' },
    { hausa: 'Tamanin', arabic: 'ثمانون', english: 'Eighty (80)', pronunciation: 'tah-MAH-nin', audioSrc: '/audio/lessons/80.m4a' },
    { hausa: 'Tis\'in', arabic: 'تسعون', english: 'Ninety (90)', pronunciation: 'TIS-in', audioSrc: '/audio/lessons/90.m4a' },
    { hausa: 'Dari', arabic: 'مئة', english: 'One Hundred (100)', pronunciation: 'DAH-ree', audioSrc: '/audio/lessons/100.m4a' },
  ],
  quiz: [
    {
      id: 'u1l2q1',
      question: 'What is the Hausa word for the number 7?',
      options: ['Shida', 'Bakwai', 'Tara', 'Takwas'],
      correctAnswer: 1,
      explanation: '"Bakwai" is seven in Hausa. In Arabic, 7 is "سبعة" (Sab\'ah).',
    },
    {
      id: 'u1l2q2',
      question: 'Which Arabic word means "Ten"?',
      options: ['ثلاثة', 'عشرة', 'خمسة', 'واحد'],
      correctAnswer: 1,
      explanation: '"عشرة" (Ashara) means ten. The Hausa word for 10 is "Goma".',
    },
    {
      id: 'u1l2q3',
      question: 'How do you say 20 in Hausa?',
      options: ['Goma sha biyu', 'Talatin', 'Ashirin', 'Dari'],
      correctAnswer: 2,
      explanation: '"Ashirin" means twenty. "Goma sha biyu" means twelve (10 + 2).',
    },
    {
      id: 'u1l2q4',
      question: 'What does "Dari" mean?',
      options: ['Fifty', 'Seventy', 'One Hundred', 'Thirty'],
      correctAnswer: 2,
      explanation: '"Dari" is 100 in Hausa, equivalent to "مئة" (Mi\'ah) in Arabic.',
    },
    {
      id: 'u1l2q5',
      question: 'What is "Goma sha daya" in English?',
      options: ['Ten', 'Twelve', 'Eleven', 'Twenty-one'],
      correctAnswer: 2,
      explanation: '"Goma sha daya" literally means "Ten and one" = 11. Hausa teen numbers follow this pattern.',
    },
    {
      id: 'u1l2q6',
      question: 'Which number is "خمسون" in Arabic?',
      options: ['15', '50', '500', '5'],
      correctAnswer: 1,
      explanation: '"خمسون" (Khamsoon) means fifty. The Hausa equivalent is "Hamsin".',
    },
    {
      id: 'u1l2q7',
      question: 'What pattern do Hausa teen numbers (11-19) follow?',
      options: [
        'They use completely different roots',
        'Goma (10) + sha + the unit number',
        'They borrow from Arabic directly',
        'They prefix the unit with "Da"',
      ],
      correctAnswer: 1,
      explanation: 'Hausa teens use "Goma sha [unit]". So 13 = "Goma sha uku" (10 + 3).',
    },
  ],
  audioExercises: [
    {
      id: 'u1l2a1',
      type: 'listen_identify',
      instruction: 'Listen to the number word and select its numeric value.',
      targetWord: 'Bakwai',
      targetLanguage: 'hausa',
      audioSrc: '/audio/lessons/7.m4a',
      options: ['6', '7', '8', '9'],
      correctAnswer: 1,
    },
    {
      id: 'u1l2a2',
      type: 'listen_identify',
      instruction: 'Listen to the Arabic number and choose the correct English value.',
      targetWord: 'عشرة',
      targetLanguage: 'arabic',
      options: ['7', '10', '12', '100'],
      correctAnswer: 1,
    },
    {
      id: 'u1l2a3',
      type: 'repeat_after_me',
      instruction: 'Count along! Listen to each number and repeat it.',
      targetWord: 'Daya, Biyu, Uku, Hudu, Biyar',
      targetLanguage: 'hausa',
    },
    {
      id: 'u1l2a4',
      type: 'repeat_after_me',
      instruction: 'Listen to this Arabic number and repeat clearly.',
      targetWord: 'ثلاثة',
      targetLanguage: 'arabic',
    },
    {
      id: 'u1l2a5',
      type: 'match_pairs',
      instruction: 'Match each Hausa number to its Arabic equivalent.',
      pairs: [
        { left: 'Daya', right: 'واحد' },
        { left: 'Goma', right: 'عشرة' },
        { left: 'Ashirin', right: 'عشرون' },
        { left: 'Dari', right: 'مئة' },
      ],
    },
  ],
};

const colorsLesson: Lesson = {
  id: 'u1-l3-colors',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Colors (Launuka / الألوان)',
  description: 'Learn the names of colors in Hausa and Arabic to describe the world around you.',
  xpReward: 55,
  isPremium: false,
  vocabulary: [
    { hausa: 'Ja', arabic: 'أحمر', english: 'Red', pronunciation: 'JAH', audioSrc: '/audio/lessons/red.m4a' },
    { hausa: 'Kore', arabic: 'أخضر', english: 'Green', pronunciation: 'KO-reh', audioSrc: '/audio/lessons/green.m4a' },
    { hausa: 'Shuɗi', arabic: 'أزرق', english: 'Blue', pronunciation: 'SHOO-dee', audioSrc: '/audio/lessons/blue.m4a' },
    { hausa: 'Fari', arabic: 'أبيض', english: 'White', pronunciation: 'FAH-ree', audioSrc: '/audio/lessons/white.m4a' },
    { hausa: 'Baƙi', arabic: 'أسود', english: 'Black', pronunciation: 'BAH-kee', audioSrc: '/audio/lessons/black.m4a' },
    { hausa: 'Ruwan hoda', arabic: 'وردي', english: 'Pink', pronunciation: 'ROO-wan HO-dah', audioSrc: '/audio/lessons/pink.m4a' },
    { hausa: 'Ruwan lemo', arabic: 'برتقالي', english: 'Orange', pronunciation: 'ROO-wan LEH-mo', audioSrc: '/audio/lessons/orange.m4a' },
    { hausa: 'Ruwan rawaya', arabic: 'أصفر', english: 'Yellow', pronunciation: 'ROO-wan rah-WAH-yah', audioSrc: '/audio/lessons/yellow.m4a' },
    { hausa: 'Ruwan toka', arabic: 'رمادي', english: 'Gray', pronunciation: 'ROO-wan TOH-kah', audioSrc: '/audio/lessons/gray.m4a' },
    { hausa: 'Ruwan shuɗi', arabic: 'أزرق سماوي', english: 'Light blue', pronunciation: 'ROO-wan SHOO-dee', audioSrc: '/audio/lessons/light-blue.m4a' },
    { hausa: 'Ruwan inuwa', arabic: 'بني', english: 'Brown', pronunciation: 'ROO-wan ee-NOO-wah', audioSrc: '/audio/lessons/brown.m4a' },
    { hausa: 'Shunayya', arabic: 'بنفسجي', english: 'Purple', pronunciation: 'shoo-NAY-yah', audioSrc: '/audio/lessons/purple.m4a' },
  ],
  quiz: [
    {
      id: 'u1l3q1',
      question: 'What color does "Ja" represent?',
      options: ['Blue', 'Green', 'Red', 'Black'],
      correctAnswer: 2,
      explanation: '"Ja" means Red in Hausa. The Arabic equivalent is "أحمر" (Ahmar).',
    },
    {
      id: 'u1l3q2',
      question: 'What does "أسود" mean in English?',
      options: ['White', 'Gray', 'Brown', 'Black'],
      correctAnswer: 3,
      explanation: '"أسود" (Aswad) means Black. In Hausa this is "Baƙi".',
    },
    {
      id: 'u1l3q3',
      question: 'Many Hausa color names begin with "Ruwan". What does "Ruwan" mean?',
      options: ['Dark', 'Light', 'Color of / shade of', 'Very'],
      correctAnswer: 2,
      explanation: '"Ruwan" means "water of" or "shade of" in Hausa, used to describe color shades (e.g. Ruwan hoda = shade of pink).',
    },
    {
      id: 'u1l3q4',
      question: 'Which Hausa word means Purple?',
      options: ['Shunayya', 'Kore', 'Shuɗi', 'Ruwan toka'],
      correctAnswer: 0,
      explanation: '"Shunayya" means Purple in Hausa. In Arabic it is "بنفسجي" (Banafsaji).',
    },
    {
      id: 'u1l3q5',
      question: 'What is the Arabic word for Green?',
      options: ['أزرق', 'أخضر', 'أصفر', 'أحمر'],
      correctAnswer: 1,
      explanation: '"أخضر" (Akhdar) means Green. Hausa: "Kore".',
    },
    {
      id: 'u1l3q6',
      question: 'How do you say "White" in Hausa?',
      options: ['Baƙi', 'Ruwan hoda', 'Fari', 'Ja'],
      correctAnswer: 2,
      explanation: '"Fari" means White in Hausa. In Arabic, White is "أبيض" (Abyad).',
    },
    {
      id: 'u1l3q7',
      question: '"وردي" in Arabic is which color?',
      options: ['Orange', 'Yellow', 'Pink', 'Brown'],
      correctAnswer: 2,
      explanation: '"وردي" (Wardi) means Pink. Hausa: "Ruwan hoda".',
    },
  ],
  audioExercises: [
    {
      id: 'u1l3a1',
      type: 'listen_identify',
      instruction: 'Listen to the color name and pick the correct English color.',
      targetWord: 'Kore',
      targetLanguage: 'hausa',
      audioSrc: '/audio/lessons/green.m4a',
      options: ['Blue', 'Green', 'Gray', 'Purple'],
      correctAnswer: 1,
    },
    {
      id: 'u1l3a2',
      type: 'listen_identify',
      instruction: 'Listen to this Arabic color and identify it.',
      targetWord: 'أحمر',
      targetLanguage: 'arabic',
      options: ['Black', 'White', 'Red', 'Yellow'],
      correctAnswer: 2,
    },
    {
      id: 'u1l3a3',
      type: 'repeat_after_me',
      instruction: 'Repeat this color name in Hausa, focusing on the "ɗ" sound.',
      targetWord: 'Shuɗi',
      targetLanguage: 'hausa',
      audioSrc: '/audio/lessons/blue.m4a',
    },
    {
      id: 'u1l3a4',
      type: 'repeat_after_me',
      instruction: 'Listen to this Arabic color and repeat it carefully.',
      targetWord: 'بنفسجي',
      targetLanguage: 'arabic',
    },
    {
      id: 'u1l3a5',
      type: 'match_pairs',
      instruction: 'Match each Hausa color to its Arabic equivalent.',
      pairs: [
        { left: 'Ja', right: 'أحمر' },
        { left: 'Fari', right: 'أبيض' },
        { left: 'Baƙi', right: 'أسود' },
        { left: 'Kore', right: 'أخضر' },
      ],
    },
  ],
};

const nounsLesson: Lesson = {
  id: 'u1-l4-nouns',
  unitId: 'unit-1',
  unitTitle: 'Unit 1: Beginner Foundation',
  title: 'Simple Nouns (Sunaye / الأسماء البسيطة)',
  description: 'Learn everyday object names in Hausa and Arabic — from household items to clothing and tools.',
  xpReward: 65,
  isPremium: false,
  vocabulary: [
    { hausa: 'Gida', arabic: 'منزل', english: 'House', pronunciation: 'GEE-dah', audioSrc: '/audio/lessons/house.m4a' },
    { hausa: 'Mota', arabic: 'سيارة', english: 'Car', pronunciation: 'MO-tah', audioSrc: '/audio/lessons/car.m4a' },
    { hausa: 'Ruwa', arabic: 'ماء', english: 'Water', pronunciation: 'ROO-wah', audioSrc: '/audio/lessons/water.m4a' },
    { hausa: 'Abinci', arabic: 'طعام', english: 'Food', pronunciation: 'ah-BIN-chee', audioSrc: '/audio/lessons/food.m4a' },
    { hausa: 'Littafi', arabic: 'كتاب', english: 'Book', pronunciation: 'lit-TAH-fee', audioSrc: '/audio/lessons/book.m4a' },
    { hausa: 'Alkalami', arabic: 'قلم', english: 'Pen', pronunciation: 'al-KAH-lah-mee' },
    { hausa: 'Kujera', arabic: 'كرسي', english: 'Chair', pronunciation: 'koo-JEH-rah', audioSrc: '/audio/lessons/chair.m4a' },
    { hausa: 'Tebur', arabic: 'طاولة', english: 'Table', pronunciation: 'TEH-bur', audioSrc: '/audio/lessons/table.m4a' },
    { hausa: 'Kofa', arabic: 'باب', english: 'Door', pronunciation: 'KO-fah', audioSrc: '/audio/lessons/door.m4a' },
    { hausa: 'Taga', arabic: 'نافذة', english: 'Window', pronunciation: 'TAH-gah', audioSrc: '/audio/lessons/window.m4a' },
    { hausa: 'Riga', arabic: 'قميص', english: 'Shirt', pronunciation: 'REE-gah', audioSrc: '/audio/lessons/shirt.m4a' },
    { hausa: 'Wando', arabic: 'بنطال', english: 'Trousers', pronunciation: 'WAN-doh', audioSrc: '/audio/lessons/trousers.m4a' },
    { hausa: 'Takalmi', arabic: 'حذاء', english: 'Shoe', pronunciation: 'tah-KAL-mee', audioSrc: '/audio/lessons/shoe.m4a' },
    { hausa: 'Hula', arabic: 'قبعة', english: 'Hat', pronunciation: 'HOO-lah', audioSrc: '/audio/lessons/hat.m4a' },
    { hausa: 'Gado', arabic: 'سرير', english: 'Bed', pronunciation: 'GAH-doh', audioSrc: '/audio/lessons/bed.m4a' },
    { hausa: 'Waya', arabic: 'هاتف', english: 'Phone', pronunciation: 'WAH-yah', audioSrc: '/audio/lessons/phone.m4a' },
    { hausa: 'Fansa', arabic: 'مروحة', english: 'Fan', pronunciation: 'FAN-sah', audioSrc: '/audio/lessons/fan.m4a' },
    { hausa: 'Madubi', arabic: 'مرآة', english: 'Mirror', pronunciation: 'mah-DOO-bee', audioSrc: '/audio/lessons/mirror.m4a' },
    { hausa: 'Wuka', arabic: 'سكين', english: 'Knife', pronunciation: 'WOO-kah', audioSrc: '/audio/lessons/knife.m4a' },
    { hausa: 'Cokali', arabic: 'ملعقة', english: 'Spoon', pronunciation: 'cho-KAH-lee', audioSrc: '/audio/lessons/spoon.m4a' },
  ],
  quiz: [
    {
      id: 'u1l4q1',
      question: 'What is the Hausa word for "Book"?',
      options: ['Alkalami', 'Littafi', 'Tebur', 'Kujera'],
      correctAnswer: 1,
      explanation: '"Littafi" means Book in Hausa. The Arabic equivalent is "كتاب" (Kitab).',
    },
    {
      id: 'u1l4q2',
      question: 'What does "سيارة" mean in English?',
      options: ['House', 'Phone', 'Car', 'Water'],
      correctAnswer: 2,
      explanation: '"سيارة" (Sayyarah) means Car. Hausa: "Mota".',
    },
    {
      id: 'u1l4q3',
      question: 'Which Hausa word means "Door"?',
      options: ['Taga', 'Kofa', 'Gida', 'Gado'],
      correctAnswer: 1,
      explanation: '"Kofa" means Door. "Taga" means Window, "Gida" means House, "Gado" means Bed.',
    },
    {
      id: 'u1l4q4',
      question: 'What is "قلم" in English?',
      options: ['Chair', 'Table', 'Book', 'Pen'],
      correctAnswer: 3,
      explanation: '"قلم" (Qalam) means Pen. Hausa: "Alkalami". This word is also borrowed into Hausa from Arabic!',
    },
    {
      id: 'u1l4q5',
      question: 'How do you say "Shoe" in Hausa?',
      options: ['Hula', 'Riga', 'Wando', 'Takalmi'],
      correctAnswer: 3,
      explanation: '"Takalmi" means Shoe. "Hula" = Hat, "Riga" = Shirt, "Wando" = Trousers.',
    },
    {
      id: 'u1l4q6',
      question: 'What does "Waya" mean?',
      options: ['Water', 'Fan', 'Phone', 'Mirror'],
      correctAnswer: 2,
      explanation: '"Waya" means Phone (literally "wire" — from the era of telegraphs). Arabic: "هاتف" (Hatif).',
    },
    {
      id: 'u1l4q7',
      question: 'Which pair is INCORRECT?',
      options: [
        'Ruwa → ماء (Water)',
        'Abinci → طعام (Food)',
        'Cokali → سكين (Spoon)',
        'Gado → سرير (Bed)',
      ],
      correctAnswer: 2,
      explanation: '"Cokali" means Spoon (ملعقة), not Knife. Knife is "Wuka" (سكين).',
    },
    {
      id: 'u1l4q8',
      question: 'What is the Arabic word for "Window"?',
      options: ['باب', 'نافذة', 'طاولة', 'كرسي'],
      correctAnswer: 1,
      explanation: '"نافذة" (Nafidhah) means Window. Hausa: "Taga". باب = Door, طاولة = Table, كرسي = Chair.',
    },
  ],
  audioExercises: [
    {
      id: 'u1l4a1',
      type: 'listen_identify',
      instruction: 'Listen to the Hausa word and choose what it refers to.',
      targetWord: 'Littafi',
      targetLanguage: 'hausa',
      audioSrc: '/audio/lessons/book.m4a',
      options: ['Pen', 'Table', 'Book', 'Chair'],
      correctAnswer: 2,
    },
    {
      id: 'u1l4a2',
      type: 'listen_identify',
      instruction: 'Listen to the Arabic word and pick the correct English meaning.',
      targetWord: 'طعام',
      targetLanguage: 'arabic',
      options: ['Water', 'Food', 'House', 'Bed'],
      correctAnswer: 1,
    },
    {
      id: 'u1l4a3',
      type: 'repeat_after_me',
      instruction: 'Repeat this household item in Hausa.',
      targetWord: 'Alkalami',
      targetLanguage: 'hausa',
    },
    {
      id: 'u1l4a4',
      type: 'repeat_after_me',
      instruction: 'Listen and repeat this Arabic noun.',
      targetWord: 'سيارة',
      targetLanguage: 'arabic',
    },
    {
      id: 'u1l4a5',
      type: 'match_pairs',
      instruction: 'Match each Hausa noun to its Arabic translation.',
      pairs: [
        { left: 'Gida', right: 'منزل' },
        { left: 'Ruwa', right: 'ماء' },
        { left: 'Waya', right: 'هاتف' },
        { left: 'Cokali', right: 'ملعقة' },
      ],
    },
  ],
};

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
  // Unit 2+ can be added here as premium content
];

export const ALL_LESSONS: Record<string, Lesson> = {
  [greetingsLesson.id]: greetingsLesson,
  [numbersLesson.id]: numbersLesson,
  [colorsLesson.id]: colorsLesson,
  [nounsLesson.id]: nounsLesson,
};
