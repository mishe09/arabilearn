
// // export type VocabularyItem = {
// //   hausa: string;
// //   arabic: string;
// //   english: string;
// //   pronunciation: string; // romanized pronunciation guide for Hausa
// //   audioSrc?: string; // optional uploaded audio file for the Hausa word/phrase
// // };

// // export type QuizQuestion = {
// //   id: string;
// //   question: string;
// //   options: string[];
// //   correctAnswer: number; // index into options[]
// //   explanation: string;
// // };

// // export type AudioExercise = {
// //   id: string;
// //   type: 'listen_identify' | 'repeat_after_me' | 'match_pairs';
// //   instruction: string;
// //   // For listen_identify: hear a word, pick the correct meaning
// //   targetWord?: string;      // the word spoken
// //   targetLanguage?: 'hausa' | 'arabic';
// //   audioSrc?: string;        // optional uploaded audio file for this exercise
// //   options?: string[];       // choices (in English or target lang)
// //   correctAnswer?: number;
// //   // For match_pairs: match hausa to arabic/english
// //   pairs?: { left: string; right: string }[];
// // };

// // export type Lesson = {
// //   id: string;
// //   unitId: string;
// //   unitTitle: string;
// //   title: string;
// //   description: string;
// //   xpReward: number;
// //   isPremium: boolean;
// //   vocabulary: VocabularyItem[];
// //   quiz: QuizQuestion[];
// //   audioExercises: AudioExercise[];
// // };

// // export type Unit = {
// //   id: string;
// //   title: string;
// //   description: string;
// //   lessonCount: number;
// //   isPremium: boolean;
// //   lessons: Lesson[];
// // };

// // // ─────────────────────────────────────────
// // // UNIT 1 — Beginner Foundation
// // // ─────────────────────────────────────────

// // const greetingsLesson: Lesson = {
// //   id: 'u1-l1-greetings',
// //   unitId: 'unit-1',
// //   unitTitle: 'Unit 1: Beginner Foundation',
// //   title: 'Basic Greetings (Gaisuwa / التحيات)',
// //   description: 'Learn how to greet people in Hausa and Arabic — the most essential phrases for any conversation.',
// //   xpReward: 50,
// //   isPremium: false,
// //   vocabulary: [
// //     { hausa: 'Sannu', arabic: 'مرحبا', english: 'Hello', pronunciation: 'SAN-noo', audioSrc: '/audio/lessons/hello.m4a' },
// //     { hausa: 'Lafiya lau?', arabic: 'كيف الحال؟', english: 'How are you?', pronunciation: 'la-FEE-yah low', audioSrc: '/audio/lessons/hows-it-going.m4a' },
// //     { hausa: 'Lafiya', arabic: 'بخير', english: 'Fine / Well', pronunciation: 'la-FEE-yah', audioSrc: '/audio/lessons/fine.m4a' },
// //     { hausa: 'Barka da safe', arabic: 'صباح الخير', english: 'Good morning', pronunciation: 'BAR-kah dah SAH-feh', audioSrc: '/audio/lessons/good-morning.m4a' },
// //     { hausa: 'Barka da rana', arabic: 'مساء الخير', english: 'Good afternoon', pronunciation: 'BAR-kah dah RAH-nah' },
// //     { hausa: 'Barka da yamma', arabic: 'مساء الخير', english: 'Good evening', pronunciation: 'BAR-kah dah YAH-mah', audioSrc: '/audio/lessons/good-evening.m4a' },
// //     { hausa: 'Barka da dare', arabic: 'ليلة سعيدة', english: 'Good night', pronunciation: 'BAR-kah dah DAH-reh', audioSrc: '/audio/lessons/good-night.m4a' },
// //     { hausa: 'Sai anjima', arabic: 'إلى اللقاء', english: 'See you later', pronunciation: 'sigh an-JEE-mah', audioSrc: '/audio/lessons/see-you-later.m4a' },
// //     { hausa: 'Sai gobe', arabic: 'إلى الغد', english: 'See you tomorrow', pronunciation: 'sigh GO-beh', audioSrc: '/audio/lessons/see-you-tomorrow.m4a' },
// //     { hausa: 'Na gode', arabic: 'شكراً', english: 'Thank you', pronunciation: 'nah GO-deh', audioSrc: '/audio/lessons/thank-you.m4a' },
// //     { hausa: 'Nagode sosai', arabic: 'شكراً جزيلاً', english: 'Thank you very much', pronunciation: 'nah-GO-deh SO-sigh', audioSrc: '/audio/lessons/thank-you-very-much.m4a' },
// //     { hausa: 'Ina sunanka?', arabic: 'ما اسمك؟', english: "What's your name? (m)", pronunciation: 'EE-nah soo-NAN-kah', audioSrc: '/audio/lessons/what-is-your-name-m.m4a' },
// //     { hausa: 'Ina sunanki?', arabic: 'ما اسمك؟', english: "What's your name? (f)", pronunciation: 'EE-nah soo-NAN-kee', audioSrc: '/audio/lessons/what-is-your-name-f.m4a' },
// //     { hausa: 'Sunana ...', arabic: 'اسمي ...', english: 'My name is ...', pronunciation: 'soo-NAH-nah', audioSrc: '/audio/lessons/my-name-is.m4a' },
// //     { hausa: 'Kana lafiya?', arabic: 'هل أنت بخير؟', english: 'Are you fine? (to a male)', pronunciation: 'KAH-nah la-FEE-yah', audioSrc: '/audio/lessons/are-you-fine-m.m4a' },
// //     { hausa: 'Kina lafiya?', arabic: 'هل أنت بخير؟', english: 'Are you fine? (to a female)', pronunciation: 'KEE-nah la-FEE-yah', audioSrc: '/audio/lessons/are-you-fine-f.m4a' },
// //   ],
// //   quiz: [
// //     {
// //       id: 'u1l1q1',
// //       question: 'What does "Sannu" mean in English?',
// //       options: ['Goodbye', 'Hello', 'Thank you', 'Good morning'],
// //       correctAnswer: 1,
// //       explanation: '"Sannu" is the standard Hausa greeting meaning "Hello". In Arabic, this is "مرحبا" (Marhaba).',
// //     },
// //     {
// //       id: 'u1l1q2',
// //       question: 'Which phrase means "Good morning" in Hausa?',
// //       options: ['Barka da dare', 'Sai gobe', 'Barka da safe', 'Lafiya lau'],
// //       correctAnswer: 2,
// //       explanation: '"Barka da safe" means "Good morning". "Safe" means morning in Hausa.',
// //     },
// //     {
// //       id: 'u1l1q3',
// //       question: 'How do you say "Thank you very much" in Hausa?',
// //       options: ['Na gode', 'Nagode sosai', 'Lafiya', 'Sannu'],
// //       correctAnswer: 1,
// //       explanation: '"Nagode sosai" means "Thank you very much". "Sosai" intensifies the thanks.',
// //     },
// //     {
// //       id: 'u1l1q4',
// //       question: 'What is the Arabic translation of "Barka da dare"?',
// //       options: ['صباح الخير', 'مرحبا', 'ليلة سعيدة', 'شكراً'],
// //       correctAnswer: 2,
// //       explanation: '"Barka da dare" means "Good night", which is "ليلة سعيدة" (Laylatan sa\'idah) in Arabic.',
// //     },
// //     {
// //       id: 'u1l1q5',
// //       question: 'What does "Sai anjima" mean?',
// //       options: ['See you tomorrow', 'How are you?', 'See you later', 'Good evening'],
// //       correctAnswer: 2,
// //       explanation: '"Sai anjima" means "See you later". For "See you tomorrow" use "Sai gobe".',
// //     },
// //     {
// //       id: 'u1l1q6',
// //       question: 'Which question would you ask a female about how she is?',
// //       options: ['Kana lafiya?', 'Ina sunanka?', 'Kina lafiya?', 'Lafiya lau?'],
// //       correctAnswer: 2,
// //       explanation: '"Kina lafiya?" is used for females. "Kana lafiya?" is used for males. Hausa distinguishes gender in address.',
// //     },
// //     {
// //       id: 'u1l1q7',
// //       question: '"اسمي ..." in Arabic corresponds to which Hausa phrase?',
// //       options: ['Ina sunanka?', 'Sunana ...', 'Lafiya', 'Na gode'],
// //       correctAnswer: 1,
// //       explanation: '"Sunana ..." means "My name is ..." in Hausa, matching the Arabic "اسمي ...".',
// //     },
// //   ],
// //   audioExercises: [
// //     {
// //       id: 'u1l1a1',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the word, then select the correct English meaning.',
// //       targetWord: 'Sannu',
// //       targetLanguage: 'hausa',
// //       audioSrc: '/audio/lessons/hello.m4a',
// //       options: ['Goodbye', 'Hello', 'Good night', 'Thank you'],
// //       correctAnswer: 1,
// //     },
// //     {
// //       id: 'u1l1a2',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the Arabic phrase and select what it means.',
// //       targetWord: 'صباح الخير',
// //       targetLanguage: 'arabic',
// //       options: ['Good night', 'See you later', 'Good morning', 'How are you?'],
// //       correctAnswer: 2,
// //     },
// //     {
// //       id: 'u1l1a3',
// //       type: 'repeat_after_me',
// //       instruction: 'Listen to the phrase, then repeat it aloud. Practice 3 times.',
// //       targetWord: 'Barka da safe',
// //       targetLanguage: 'hausa',
// //       audioSrc: '/audio/lessons/good-morning.m4a',
// //     },
// //     {
// //       id: 'u1l1a4',
// //       type: 'repeat_after_me',
// //       instruction: 'Listen to this Arabic phrase and repeat it.',
// //       targetWord: 'شكراً جزيلاً',
// //       targetLanguage: 'arabic',
// //     },
// //     {
// //       id: 'u1l1a5',
// //       type: 'match_pairs',
// //       instruction: 'Match each Hausa greeting to its Arabic equivalent.',
// //       pairs: [
// //         { left: 'Sannu', right: 'مرحبا' },
// //         { left: 'Na gode', right: 'شكراً' },
// //         { left: 'Sai gobe', right: 'إلى الغد' },
// //         { left: 'Barka da dare', right: 'ليلة سعيدة' },
// //       ],
// //     },
// //   ],
// // };

// // const numbersLesson: Lesson = {
// //   id: 'u1-l2-numbers',
// //   unitId: 'unit-1',
// //   unitTitle: 'Unit 1: Beginner Foundation',
// //   title: 'Numbers (Lambobi / الأرقام)',
// //   description: 'Count from 1 to 100 in both Hausa and Arabic. Numbers are the foundation of daily communication.',
// //   xpReward: 60,
// //   isPremium: false,
// //   vocabulary: [
// //     { hausa: 'Daya', arabic: 'واحد', english: 'One (1)', pronunciation: 'DAH-yah', audioSrc: '/audio/lessons/one-1.m4a' },
// //     { hausa: 'Biyu', arabic: 'اثنان', english: 'Two (2)', pronunciation: 'BEE-yoo', audioSrc: '/audio/lessons/2.m4a' },
// //     { hausa: 'Uku', arabic: 'ثلاثة', english: 'Three (3)', pronunciation: 'OO-koo', audioSrc: '/audio/lesson-one/lesson-one-arabic/three' },
// //     { hausa: 'Hudu', arabic: 'أربعة', english: 'Four (4)', pronunciation: 'HOO-doo', audioSrc: '/audio/lessons/4.m4a' },
// //     { hausa: 'Biyar', arabic: 'خمسة', english: 'Five (5)', pronunciation: 'BEE-yar', audioSrc: '/audio/lessons/5.m4a' },
// //     { hausa: 'Shida', arabic: 'ستة', english: 'Six (6)', pronunciation: 'SHEE-dah', audioSrc: '/audio/lessons/6.m4a' },
// //     { hausa: 'Bakwai', arabic: 'سبعة', english: 'Seven (7)', pronunciation: 'BAK-why', audioSrc: '/audio/lessons/7.m4a' },
// //     { hausa: 'Takwas', arabic: 'ثمانية', english: 'Eight (8)', pronunciation: 'TAK-was', audioSrc: '/audio/lessons/8.m4a' },
// //     { hausa: 'Tara', arabic: 'تسعة', english: 'Nine (9)', pronunciation: 'TAH-rah', audioSrc: '/audio/lessons/9.m4a' },
// //     { hausa: 'Goma', arabic: 'عشرة', english: 'Ten (10)', pronunciation: 'GO-mah', audioSrc: '/audio/lessons/10.m4a' },
// //     { hausa: 'Goma sha daya', arabic: 'أحد عشر', english: 'Eleven (11)', pronunciation: 'GO-mah shah DAH-yah' },
// //     { hausa: 'Goma sha biyu', arabic: 'اثنا عشر', english: 'Twelve (12)', pronunciation: 'GO-mah shah BEE-yoo', audioSrc: '/audio/lessons/12.m4a' },
// //     { hausa: 'Ashirin', arabic: 'عشرون', english: 'Twenty (20)', pronunciation: 'ah-SHEE-rin', audioSrc: '/audio/lessons/20.m4a' },
// //     { hausa: 'Talatin', arabic: 'ثلاثون', english: 'Thirty (30)', pronunciation: 'ta-LAH-tin', audioSrc: '/audio/lessons/30.m4a' },
// //     { hausa: 'Arba\'in', arabic: 'أربعون', english: 'Forty (40)', pronunciation: 'ar-BAH-in', audioSrc: '/audio/lessons/40.m4a' },
// //     { hausa: 'Hamsin', arabic: 'خمسون', english: 'Fifty (50)', pronunciation: 'HAM-sin', audioSrc: '/audio/lessons/50.m4a' },
// //     { hausa: 'Sittin', arabic: 'ستون', english: 'Sixty (60)', pronunciation: 'SIT-tin', audioSrc: '/audio/lessons/60.m4a' },
// //     { hausa: 'Sab\'in', arabic: 'سبعون', english: 'Seventy (70)', pronunciation: 'SAB-in', audioSrc: '/audio/lessons/70.m4a' },
// //     { hausa: 'Tamanin', arabic: 'ثمانون', english: 'Eighty (80)', pronunciation: 'tah-MAH-nin', audioSrc: '/audio/lessons/80.m4a' },
// //     { hausa: 'Tis\'in', arabic: 'تسعون', english: 'Ninety (90)', pronunciation: 'TIS-in', audioSrc: '/audio/lessons/90.m4a' },
// //     { hausa: 'Dari', arabic: 'مئة', english: 'One Hundred (100)', pronunciation: 'DAH-ree', audioSrc: '/audio/lessons/100.m4a' },
// //   ],
// //   quiz: [
// //     {
// //       id: 'u1l2q1',
// //       question: 'What is the Hausa word for the number 7?',
// //       options: ['Shida', 'Bakwai', 'Tara', 'Takwas'],
// //       correctAnswer: 1,
// //       explanation: '"Bakwai" is seven in Hausa. In Arabic, 7 is "سبعة" (Sab\'ah).',
// //     },
// //     {
// //       id: 'u1l2q2',
// //       question: 'Which Arabic word means "Ten"?',
// //       options: ['ثلاثة', 'عشرة', 'خمسة', 'واحد'],
// //       correctAnswer: 1,
// //       explanation: '"عشرة" (Ashara) means ten. The Hausa word for 10 is "Goma".',
// //     },
// //     {
// //       id: 'u1l2q3',
// //       question: 'How do you say 20 in Hausa?',
// //       options: ['Goma sha biyu', 'Talatin', 'Ashirin', 'Dari'],
// //       correctAnswer: 2,
// //       explanation: '"Ashirin" means twenty. "Goma sha biyu" means twelve (10 + 2).',
// //     },
// //     {
// //       id: 'u1l2q4',
// //       question: 'What does "Dari" mean?',
// //       options: ['Fifty', 'Seventy', 'One Hundred', 'Thirty'],
// //       correctAnswer: 2,
// //       explanation: '"Dari" is 100 in Hausa, equivalent to "مئة" (Mi\'ah) in Arabic.',
// //     },
// //     {
// //       id: 'u1l2q5',
// //       question: 'What is "Goma sha daya" in English?',
// //       options: ['Ten', 'Twelve', 'Eleven', 'Twenty-one'],
// //       correctAnswer: 2,
// //       explanation: '"Goma sha daya" literally means "Ten and one" = 11. Hausa teen numbers follow this pattern.',
// //     },
// //     {
// //       id: 'u1l2q6',
// //       question: 'Which number is "خمسون" in Arabic?',
// //       options: ['15', '50', '500', '5'],
// //       correctAnswer: 1,
// //       explanation: '"خمسون" (Khamsoon) means fifty. The Hausa equivalent is "Hamsin".',
// //     },
// //     {
// //       id: 'u1l2q7',
// //       question: 'What pattern do Hausa teen numbers (11-19) follow?',
// //       options: [
// //         'They use completely different roots',
// //         'Goma (10) + sha + the unit number',
// //         'They borrow from Arabic directly',
// //         'They prefix the unit with "Da"',
// //       ],
// //       correctAnswer: 1,
// //       explanation: 'Hausa teens use "Goma sha [unit]". So 13 = "Goma sha uku" (10 + 3).',
// //     },
// //   ],
// //   audioExercises: [
// //     {
// //       id: 'u1l2a1',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the number word and select its numeric value.',
// //       targetWord: 'Bakwai',
// //       targetLanguage: 'hausa',
// //       audioSrc: '/audio/lessons/7.m4a',
// //       options: ['6', '7', '8', '9'],
// //       correctAnswer: 1,
// //     },
// //     {
// //       id: 'u1l2a2',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the Arabic number and choose the correct English value.',
// //       targetWord: 'عشرة',
// //       targetLanguage: 'arabic',
// //       options: ['7', '10', '12', '100'],
// //       correctAnswer: 1,
// //     },
// //     {
// //       id: 'u1l2a3',
// //       type: 'repeat_after_me',
// //       instruction: 'Count along! Listen to each number and repeat it.',
// //       targetWord: 'Daya, Biyu, Uku, Hudu, Biyar',
// //       targetLanguage: 'hausa',
// //     },
// //     {
// //       id: 'u1l2a4',
// //       type: 'repeat_after_me',
// //       instruction: 'Listen to this Arabic number and repeat clearly.',
// //       targetWord: 'ثلاثة',
// //       targetLanguage: 'arabic',
// //     },
// //     {
// //       id: 'u1l2a5',
// //       type: 'match_pairs',
// //       instruction: 'Match each Hausa number to its Arabic equivalent.',
// //       pairs: [
// //         { left: 'Daya', right: 'واحد' },
// //         { left: 'Goma', right: 'عشرة' },
// //         { left: 'Ashirin', right: 'عشرون' },
// //         { left: 'Dari', right: 'مئة' },
// //       ],
// //     },
// //   ],
// // };

// // const colorsLesson: Lesson = {
// //   id: 'u1-l3-colors',
// //   unitId: 'unit-1',
// //   unitTitle: 'Unit 1: Beginner Foundation',
// //   title: 'Colors (Launuka / الألوان)',
// //   description: 'Learn the names of colors in Hausa and Arabic to describe the world around you.',
// //   xpReward: 55,
// //   isPremium: false,
// //   vocabulary: [
// //     { hausa: 'Ja', arabic: 'أحمر', english: 'Red', pronunciation: 'JAH', audioSrc: '/audio/lessons/red.m4a' },
// //     { hausa: 'Kore', arabic: 'أخضر', english: 'Green', pronunciation: 'KO-reh', audioSrc: '/audio/lessons/green.m4a' },
// //     { hausa: 'Shuɗi', arabic: 'أزرق', english: 'Blue', pronunciation: 'SHOO-dee', audioSrc: '/audio/lessons/blue.m4a' },
// //     { hausa: 'Fari', arabic: 'أبيض', english: 'White', pronunciation: 'FAH-ree', audioSrc: '/audio/lessons/white.m4a' },
// //     { hausa: 'Baƙi', arabic: 'أسود', english: 'Black', pronunciation: 'BAH-kee', audioSrc: '/audio/lessons/black.m4a' },
// //     { hausa: 'Ruwan hoda', arabic: 'وردي', english: 'Pink', pronunciation: 'ROO-wan HO-dah', audioSrc: '/audio/lessons/pink.m4a' },
// //     { hausa: 'Ruwan lemo', arabic: 'برتقالي', english: 'Orange', pronunciation: 'ROO-wan LEH-mo', audioSrc: '/audio/lessons/orange.m4a' },
// //     { hausa: 'Ruwan rawaya', arabic: 'أصفر', english: 'Yellow', pronunciation: 'ROO-wan rah-WAH-yah', audioSrc: '/audio/lessons/yellow.m4a' },
// //     { hausa: 'Ruwan toka', arabic: 'رمادي', english: 'Gray', pronunciation: 'ROO-wan TOH-kah', audioSrc: '/audio/lessons/gray.m4a' },
// //     { hausa: 'Ruwan shuɗi', arabic: 'أزرق سماوي', english: 'Light blue', pronunciation: 'ROO-wan SHOO-dee', audioSrc: '/audio/lessons/light-blue.m4a' },
// //     { hausa: 'Ruwan inuwa', arabic: 'بني', english: 'Brown', pronunciation: 'ROO-wan ee-NOO-wah', audioSrc: '/audio/lessons/brown.m4a' },
// //     { hausa: 'Shunayya', arabic: 'بنفسجي', english: 'Purple', pronunciation: 'shoo-NAY-yah', audioSrc: '/audio/lessons/purple.m4a' },
// //   ],
// //   quiz: [
// //     {
// //       id: 'u1l3q1',
// //       question: 'What color does "Ja" represent?',
// //       options: ['Blue', 'Green', 'Red', 'Black'],
// //       correctAnswer: 2,
// //       explanation: '"Ja" means Red in Hausa. The Arabic equivalent is "أحمر" (Ahmar).',
// //     },
// //     {
// //       id: 'u1l3q2',
// //       question: 'What does "أسود" mean in English?',
// //       options: ['White', 'Gray', 'Brown', 'Black'],
// //       correctAnswer: 3,
// //       explanation: '"أسود" (Aswad) means Black. In Hausa this is "Baƙi".',
// //     },
// //     {
// //       id: 'u1l3q3',
// //       question: 'Many Hausa color names begin with "Ruwan". What does "Ruwan" mean?',
// //       options: ['Dark', 'Light', 'Color of / shade of', 'Very'],
// //       correctAnswer: 2,
// //       explanation: '"Ruwan" means "water of" or "shade of" in Hausa, used to describe color shades (e.g. Ruwan hoda = shade of pink).',
// //     },
// //     {
// //       id: 'u1l3q4',
// //       question: 'Which Hausa word means Purple?',
// //       options: ['Shunayya', 'Kore', 'Shuɗi', 'Ruwan toka'],
// //       correctAnswer: 0,
// //       explanation: '"Shunayya" means Purple in Hausa. In Arabic it is "بنفسجي" (Banafsaji).',
// //     },
// //     {
// //       id: 'u1l3q5',
// //       question: 'What is the Arabic word for Green?',
// //       options: ['أزرق', 'أخضر', 'أصفر', 'أحمر'],
// //       correctAnswer: 1,
// //       explanation: '"أخضر" (Akhdar) means Green. Hausa: "Kore".',
// //     },
// //     {
// //       id: 'u1l3q6',
// //       question: 'How do you say "White" in Hausa?',
// //       options: ['Baƙi', 'Ruwan hoda', 'Fari', 'Ja'],
// //       correctAnswer: 2,
// //       explanation: '"Fari" means White in Hausa. In Arabic, White is "أبيض" (Abyad).',
// //     },
// //     {
// //       id: 'u1l3q7',
// //       question: '"وردي" in Arabic is which color?',
// //       options: ['Orange', 'Yellow', 'Pink', 'Brown'],
// //       correctAnswer: 2,
// //       explanation: '"وردي" (Wardi) means Pink. Hausa: "Ruwan hoda".',
// //     },
// //   ],
// //   audioExercises: [
// //     {
// //       id: 'u1l3a1',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the color name and pick the correct English color.',
// //       targetWord: 'Kore',
// //       targetLanguage: 'hausa',
// //       audioSrc: '/audio/lessons/green.m4a',
// //       options: ['Blue', 'Green', 'Gray', 'Purple'],
// //       correctAnswer: 1,
// //     },
// //     {
// //       id: 'u1l3a2',
// //       type: 'listen_identify',
// //       instruction: 'Listen to this Arabic color and identify it.',
// //       targetWord: 'أحمر',
// //       targetLanguage: 'arabic',
// //       options: ['Black', 'White', 'Red', 'Yellow'],
// //       correctAnswer: 2,
// //     },
// //     {
// //       id: 'u1l3a3',
// //       type: 'repeat_after_me',
// //       instruction: 'Repeat this color name in Hausa, focusing on the "ɗ" sound.',
// //       targetWord: 'Shuɗi',
// //       targetLanguage: 'hausa',
// //       audioSrc: '/audio/lessons/blue.m4a',
// //     },
// //     {
// //       id: 'u1l3a4',
// //       type: 'repeat_after_me',
// //       instruction: 'Listen to this Arabic color and repeat it carefully.',
// //       targetWord: 'بنفسجي',
// //       targetLanguage: 'arabic',
// //     },
// //     {
// //       id: 'u1l3a5',
// //       type: 'match_pairs',
// //       instruction: 'Match each Hausa color to its Arabic equivalent.',
// //       pairs: [
// //         { left: 'Ja', right: 'أحمر' },
// //         { left: 'Fari', right: 'أبيض' },
// //         { left: 'Baƙi', right: 'أسود' },
// //         { left: 'Kore', right: 'أخضر' },
// //       ],
// //     },
// //   ],
// // };

// // const nounsLesson: Lesson = {
// //   id: 'u1-l4-nouns',
// //   unitId: 'unit-1',
// //   unitTitle: 'Unit 1: Beginner Foundation',
// //   title: 'Simple Nouns (Sunaye / الأسماء البسيطة)',
// //   description: 'Learn everyday object names in Hausa and Arabic — from household items to clothing and tools.',
// //   xpReward: 65,
// //   isPremium: false,
// //   vocabulary: [
// //     { hausa: 'Gida', arabic: 'منزل', english: 'House', pronunciation: 'GEE-dah', audioSrc: '/audio/lessons/house.m4a' },
// //     { hausa: 'Mota', arabic: 'سيارة', english: 'Car', pronunciation: 'MO-tah', audioSrc: '/audio/lessons/car.m4a' },
// //     { hausa: 'Ruwa', arabic: 'ماء', english: 'Water', pronunciation: 'ROO-wah', audioSrc: '/audio/lessons/water.m4a' },
// //     { hausa: 'Abinci', arabic: 'طعام', english: 'Food', pronunciation: 'ah-BIN-chee', audioSrc: '/audio/lessons/food.m4a' },
// //     { hausa: 'Littafi', arabic: 'كتاب', english: 'Book', pronunciation: 'lit-TAH-fee', audioSrc: '/audio/lessons/book.m4a' },
// //     { hausa: 'Alkalami', arabic: 'قلم', english: 'Pen', pronunciation: 'al-KAH-lah-mee' },
// //     { hausa: 'Kujera', arabic: 'كرسي', english: 'Chair', pronunciation: 'koo-JEH-rah', audioSrc: '/audio/lessons/chair.m4a' },
// //     { hausa: 'Tebur', arabic: 'طاولة', english: 'Table', pronunciation: 'TEH-bur', audioSrc: '/audio/lessons/table.m4a' },
// //     { hausa: 'Kofa', arabic: 'باب', english: 'Door', pronunciation: 'KO-fah', audioSrc: '/audio/lessons/door.m4a' },
// //     { hausa: 'Taga', arabic: 'نافذة', english: 'Window', pronunciation: 'TAH-gah', audioSrc: '/audio/lessons/window.m4a' },
// //     { hausa: 'Riga', arabic: 'قميص', english: 'Shirt', pronunciation: 'REE-gah', audioSrc: '/audio/lessons/shirt.m4a' },
// //     { hausa: 'Wando', arabic: 'بنطال', english: 'Trousers', pronunciation: 'WAN-doh', audioSrc: '/audio/lessons/trousers.m4a' },
// //     { hausa: 'Takalmi', arabic: 'حذاء', english: 'Shoe', pronunciation: 'tah-KAL-mee', audioSrc: '/audio/lessons/shoe.m4a' },
// //     { hausa: 'Hula', arabic: 'قبعة', english: 'Hat', pronunciation: 'HOO-lah', audioSrc: '/audio/lessons/hat.m4a' },
// //     { hausa: 'Gado', arabic: 'سرير', english: 'Bed', pronunciation: 'GAH-doh', audioSrc: '/audio/lessons/bed.m4a' },
// //     { hausa: 'Waya', arabic: 'هاتف', english: 'Phone', pronunciation: 'WAH-yah', audioSrc: '/audio/lessons/phone.m4a' },
// //     { hausa: 'Fansa', arabic: 'مروحة', english: 'Fan', pronunciation: 'FAN-sah', audioSrc: '/audio/lessons/fan.m4a' },
// //     { hausa: 'Madubi', arabic: 'مرآة', english: 'Mirror', pronunciation: 'mah-DOO-bee', audioSrc: '/audio/lessons/mirror.m4a' },
// //     { hausa: 'Wuka', arabic: 'سكين', english: 'Knife', pronunciation: 'WOO-kah', audioSrc: '/audio/lessons/knife.m4a' },
// //     { hausa: 'Cokali', arabic: 'ملعقة', english: 'Spoon', pronunciation: 'cho-KAH-lee', audioSrc: '/audio/lessons/spoon.m4a' },
// //   ],
// //   quiz: [
// //     {
// //       id: 'u1l4q1',
// //       question: 'What is the Hausa word for "Book"?',
// //       options: ['Alkalami', 'Littafi', 'Tebur', 'Kujera'],
// //       correctAnswer: 1,
// //       explanation: '"Littafi" means Book in Hausa. The Arabic equivalent is "كتاب" (Kitab).',
// //     },
// //     {
// //       id: 'u1l4q2',
// //       question: 'What does "سيارة" mean in English?',
// //       options: ['House', 'Phone', 'Car', 'Water'],
// //       correctAnswer: 2,
// //       explanation: '"سيارة" (Sayyarah) means Car. Hausa: "Mota".',
// //     },
// //     {
// //       id: 'u1l4q3',
// //       question: 'Which Hausa word means "Door"?',
// //       options: ['Taga', 'Kofa', 'Gida', 'Gado'],
// //       correctAnswer: 1,
// //       explanation: '"Kofa" means Door. "Taga" means Window, "Gida" means House, "Gado" means Bed.',
// //     },
// //     {
// //       id: 'u1l4q4',
// //       question: 'What is "قلم" in English?',
// //       options: ['Chair', 'Table', 'Book', 'Pen'],
// //       correctAnswer: 3,
// //       explanation: '"قلم" (Qalam) means Pen. Hausa: "Alkalami". This word is also borrowed into Hausa from Arabic!',
// //     },
// //     {
// //       id: 'u1l4q5',
// //       question: 'How do you say "Shoe" in Hausa?',
// //       options: ['Hula', 'Riga', 'Wando', 'Takalmi'],
// //       correctAnswer: 3,
// //       explanation: '"Takalmi" means Shoe. "Hula" = Hat, "Riga" = Shirt, "Wando" = Trousers.',
// //     },
// //     {
// //       id: 'u1l4q6',
// //       question: 'What does "Waya" mean?',
// //       options: ['Water', 'Fan', 'Phone', 'Mirror'],
// //       correctAnswer: 2,
// //       explanation: '"Waya" means Phone (literally "wire" — from the era of telegraphs). Arabic: "هاتف" (Hatif).',
// //     },
// //     {
// //       id: 'u1l4q7',
// //       question: 'Which pair is INCORRECT?',
// //       options: [
// //         'Ruwa → ماء (Water)',
// //         'Abinci → طعام (Food)',
// //         'Cokali → سكين (Spoon)',
// //         'Gado → سرير (Bed)',
// //       ],
// //       correctAnswer: 2,
// //       explanation: '"Cokali" means Spoon (ملعقة), not Knife. Knife is "Wuka" (سكين).',
// //     },
// //     {
// //       id: 'u1l4q8',
// //       question: 'What is the Arabic word for "Window"?',
// //       options: ['باب', 'نافذة', 'طاولة', 'كرسي'],
// //       correctAnswer: 1,
// //       explanation: '"نافذة" (Nafidhah) means Window. Hausa: "Taga". باب = Door, طاولة = Table, كرسي = Chair.',
// //     },
// //   ],
// //   audioExercises: [
// //     {
// //       id: 'u1l4a1',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the Hausa word and choose what it refers to.',
// //       targetWord: 'Littafi',
// //       targetLanguage: 'hausa',
// //       audioSrc: '/audio/lessons/book.m4a',
// //       options: ['Pen', 'Table', 'Book', 'Chair'],
// //       correctAnswer: 2,
// //     },
// //     {
// //       id: 'u1l4a2',
// //       type: 'listen_identify',
// //       instruction: 'Listen to the Arabic word and pick the correct English meaning.',
// //       targetWord: 'طعام',
// //       targetLanguage: 'arabic',
// //       options: ['Water', 'Food', 'House', 'Bed'],
// //       correctAnswer: 1,
// //     },
// //     {
// //       id: 'u1l4a3',
// //       type: 'repeat_after_me',
// //       instruction: 'Repeat this household item in Hausa.',
// //       targetWord: 'Alkalami',
// //       targetLanguage: 'hausa',
// //     },
// //     {
// //       id: 'u1l4a4',
// //       type: 'repeat_after_me',
// //       instruction: 'Listen and repeat this Arabic noun.',
// //       targetWord: 'سيارة',
// //       targetLanguage: 'arabic',
// //     },
// //     {
// //       id: 'u1l4a5',
// //       type: 'match_pairs',
// //       instruction: 'Match each Hausa noun to its Arabic translation.',
// //       pairs: [
// //         { left: 'Gida', right: 'منزل' },
// //         { left: 'Ruwa', right: 'ماء' },
// //         { left: 'Waya', right: 'هاتف' },
// //         { left: 'Cokali', right: 'ملعقة' },
// //       ],
// //     },
// //   ],
// // };

// // // ─────────────────────────────────────────
// // // UNITS EXPORT
// // // ─────────────────────────────────────────

// // export const UNITS: Unit[] = [
// //   {
// //     id: 'unit-1',
// //     title: 'Unit 1: Beginner Foundation (Matakin Farko)',
// //     description: 'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
// //     lessonCount: 4,
// //     isPremium: false,
// //     lessons: [greetingsLesson, numbersLesson, colorsLesson, nounsLesson],
// //   },
// //   // Unit 2+ can be added here as premium content
// // ];

// // export const ALL_LESSONS: Record<string, Lesson> = {
// //   [greetingsLesson.id]: greetingsLesson,
// //   [numbersLesson.id]: numbersLesson,
// //   [colorsLesson.id]: colorsLesson,
// //   [nounsLesson.id]: nounsLesson,
// // };


// // lessons.ts — HausaArabia full lesson data
// // hausaAudioSrc + arabicAudioSrc on every vocabulary item and exercise
// // Exercises are Arabic-first: Hausa is the bridge, Arabic is the target

// export type VocabularyItem = {
//   hausa: string;
//   arabic: string;
//   english: string;
//   pronunciation: string;        // romanized pronunciation of the Hausa word
//   arabicPronunciation?: string; // romanized pronunciation of the Arabic word
//   hausaAudioSrc?: string;       // path to recorded Hausa audio file
//   arabicAudioSrc?: string;      // path to recorded Arabic audio file
// };

// export type QuizQuestion = {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   explanation: string;
// };

// export type AudioExercise = {
//   id: string;
//   type: 'listen_identify' | 'repeat_after_me' | 'match_pairs';
//   instruction: string;
//   targetWord?: string;
//   targetLanguage?: 'hausa' | 'arabic';
//   hausaAudioSrc?: string;
//   arabicAudioSrc?: string;
//   options?: string[];
//   correctAnswer?: number;
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

// const greetingsLesson: Lesson = {
//   id: 'u1-l1-greetings',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Basic Greetings (Gaisuwa / التحيات)',
//   description: 'Learn how to greet people in Arabic — the most essential phrases for any conversation.',
//   xpReward: 50,
//   isPremium: false,
//   vocabulary: [
//     { hausa:'Sannu',         arabic:'مرحبا',        english:'Hello',                     pronunciation:'SAN-noo',             arabicPronunciation:'Mar-ha-ban',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/hi.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/hi.oga ' },
//     { hausa:'Lafiya lau?',   arabic:'كيف الحال؟',   english:'How are you?(Male)',              pronunciation:'la-FEE-yah low',      arabicPronunciation:'Kay-fal haal',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/how are you.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/how are you.oga ' },
//     { hausa:'Lafiya lau?',   arabic:'كيف الحال؟',   english:'How are you?(Female)',              pronunciation:'la-FEE-yah low',      arabicPronunciation:'Kay-fal haal',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/how are youf.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/how are you.oga ' },
//     { hausa:'Lafiya',        arabic:'بخير',          english:'Fine / Well',               pronunciation:'la-FEE-yah',          arabicPronunciation:'Bi-khayr',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/fine.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/fine.oga' },
//     { hausa:'Barka da safe', arabic:'صباح الخير',   english:'Good morning',              pronunciation:'BAR-kah dah SAH-feh', arabicPronunciation:'Sa-baa-hul khayr',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/hi.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/goodmorningarabic.oga' },
//     { hausa:'Barka da rana', arabic:'مساء الخير',   english:'Good afternoon',            pronunciation:'BAR-kah dah RAH-nah', arabicPronunciation:'Ma-saa-ul khayr',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/gam.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ge.oga' },
//     { hausa:'Barka da yamma',arabic:'مساء الخير',   english:'Good evening',              pronunciation:'BAR-kah dah YAH-mah', arabicPronunciation:'Ma-saa-ul khayr',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ge.oga', arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ge.oga' },
//     { hausa:'Barka da dare', arabic:'ليلة سعيدة',   english:'Good night',                pronunciation:'BAR-kah dah DAH-reh', arabicPronunciation:'Lay-la-tan sa-ee-dah',hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/gn.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/gn.oga' },
//     { hausa:'Sai anjima',    arabic:'إلى اللقاء',   english:'See you later',             pronunciation:'sigh an-JEE-mah',     arabicPronunciation:'I-lal li-qaa',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/syl.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/syl.oga' },
//     { hausa:'Sai gobe',      arabic:'إلى الغد',     english:'See you tomorrow',          pronunciation:'sigh GO-beh',         arabicPronunciation:'I-lal ghad',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/syt.oga',       arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/syt.oga' },
//     { hausa:'Na gode',       arabic:'شكراً',         english:'Thank you',                 pronunciation:'nah GO-deh',          arabicPronunciation:'Shuk-ran',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ty.oga',        arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ty.oga' },
//     { hausa:'Nagode sosai',  arabic:'شكراً جزيلاً', english:'Thank you very much',       pronunciation:'nah-GO-deh SO-sigh',  arabicPronunciation:'Shuk-ran ja-zee-lan',hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/tysm.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/tyvm.oga' },
//     { hausa:'Ina sunanka?',  arabic:'ما اسمك؟',     english:"What's your name? (m)",     pronunciation:'EE-nah soo-NAN-kah',  arabicPronunciation:'Mas-muk',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/wiyn.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/wiyn.oga' },
//     { hausa:'Ina sunanki?',  arabic:'ما اسمك؟',     english:"What's your name? (f)",     pronunciation:'EE-nah soo-NAN-kee',  arabicPronunciation:'Mas-muk',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/wiynf.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/wiyn.oga' },
//     { hausa:'Sunana ...',    arabic:'اسمي ...',      english:'My name is ...',            pronunciation:'soo-NAH-nah',         arabicPronunciation:'Is-mee',             hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/mni.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/mni.oga' },
//     { hausa:'Kana lafiya?',  arabic:'هل أنت بخير؟', english:'Are you fine? (to a male)', pronunciation:'KAH-nah la-FEE-yah', arabicPronunciation:'Hal an-ta bi-khayr', hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ayf(m).oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ayf(m).oga' },
//     { hausa:'Kina lafiya?',  arabic:'هل أنت بخير؟', english:'Are you fine? (to a female)',pronunciation:'KEE-nah la-FEE-yah',arabicPronunciation:'Hal an-ti bi-khayr', hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/ayf(f).oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/ayf(f).oga' },
//   ],
//   quiz: [
//     { id:'u1l1q1', question:'What is the Arabic for "Hello"?', options:['شكراً','مرحبا','ليلة سعيدة','إلى اللقاء'], correctAnswer:1, explanation:'"مرحبا" (Mar-ha-ban) = Hello. Hausa: "Sannu".' },
//     { id:'u1l1q2', question:'Which Arabic phrase means "Good morning"?', options:['ليلة سعيدة','إلى الغد','صباح الخير','كيف الحال؟'], correctAnswer:2, explanation:'"صباح الخير" (Sa-baa-hul khayr) = Good morning. Hausa: "Barka da safe".' },
//     { id:'u1l1q3', question:'How do you say "Thank you very much" in Arabic?', options:['شكراً','شكراً جزيلاً','بخير','مرحبا'], correctAnswer:1, explanation:'"شكراً جزيلاً" (Shuk-ran ja-zee-lan) = Thank you very much.' },
//     { id:'u1l1q4', question:'What is the Arabic for "Good night"?', options:['صباح الخير','مرحبا','ليلة سعيدة','شكراً'], correctAnswer:2, explanation:'"ليلة سعيدة" (Lay-la-tan sa-ee-dah) = Good night. Hausa: "Barka da dare".' },
//     { id:'u1l1q5', question:'What does "إلى اللقاء" mean?', options:['See you tomorrow','How are you?','See you later','Good evening'], correctAnswer:2, explanation:'"إلى اللقاء" (I-lal li-qaa) = See you later. Hausa: "Sai anjima".' },
//     { id:'u1l1q6', question:'Which Arabic phrase asks "Are you fine?"', options:['هل أنت بخير؟','ما اسمك؟','كيف الحال؟','صباح الخير'], correctAnswer:0, explanation:'"هل أنت بخير؟" = Are you fine? Hausa: "Kana/Kina lafiya?".' },
//     { id:'u1l1q7', question:'"اسمي ..." means what?', options:['What is your name?','My name is ...','Fine / Well','Thank you'], correctAnswer:1, explanation:'"اسمي ..." (Is-mee) = My name is ... Hausa: "Sunana ...".' },
//   ],
//   audioExercises: [
//     { id:'u1l1a1', type:'listen_identify', instruction:'Listen to the Arabic greeting. Select the Arabic word you just heard.', targetWord:'مرحبا', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/marhaba.m4a', hausaAudioSrc:'/audio/hausa/sannu.m4a', options:['شكراً','مرحبا','ليلة سعيدة','إلى اللقاء'], correctAnswer:1 },
//     { id:'u1l1a2', type:'listen_identify', instruction:'Listen to the Arabic phrase. Which Arabic phrase did you hear?', targetWord:'صباح الخير', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/sabah-al-khair.m4a', hausaAudioSrc:'/audio/hausa/barka-da-safe.m4a', options:['ليلة سعيدة','إلى اللقاء','صباح الخير','كيف الحال؟'], correctAnswer:2 },
//     { id:'u1l1a3', type:'repeat_after_me', instruction:'Listen to the Arabic greeting and repeat it clearly. The Hausa reference helps you understand the meaning.', targetWord:'صباح الخير', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/sabah-al-khair.m4a', hausaAudioSrc:'/audio/hausa/barka-da-safe.m4a' },
//     { id:'u1l1a4', type:'repeat_after_me', instruction:'Listen to this Arabic phrase and repeat it until it feels natural.', targetWord:'شكراً جزيلاً', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/shukran-jazilan.m4a', hausaAudioSrc:'/audio/hausa/nagode-sosai.m4a' },
//     { id:'u1l1a5', type:'match_pairs', instruction:'Match each Hausa greeting to its Arabic equivalent. Arabic is your target — Hausa is your guide.', pairs:[{left:'Sannu',right:'مرحبا'},{left:'Na gode',right:'شكراً'},{left:'Sai gobe',right:'إلى الغد'},{left:'Barka da dare',right:'ليلة سعيدة'}] },
//   ],
// };

// const numbersLesson: Lesson = {
//   id: 'u1-l2-numbers',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Numbers (Lambobi / الأرقام)',
//   description: 'Count from 1 to 100 in Arabic, using Hausa as your familiar bridge.',
//   xpReward: 60,
//   isPremium: false,
//   vocabulary: [
//     { hausa:'Daya',          arabic:'واحد',   english:'One (1)',          pronunciation:'DAH-yah',             arabicPronunciation:'Waa-hid',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/1.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/1.oga' },
//     { hausa:'Biyu',          arabic:'اثنان',  english:'Two (2)',          pronunciation:'BEE-yoo',             arabicPronunciation:'Ith-naan',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/2.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/2.oga' },
//     { hausa:'Uku',           arabic:'ثلاثة',  english:'Three (3)',        pronunciation:'OO-koo',              arabicPronunciation:'Tha-laa-tha',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/3.oga',            arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/2.oga' },
//     { hausa:'Hudu',          arabic:'أربعة',  english:'Four (4)',         pronunciation:'HOO-doo',             arabicPronunciation:'Ar-ba-a',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/4.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/4.oga' },
//     { hausa:'Biyar',         arabic:'خمسة',   english:'Five (5)',         pronunciation:'BEE-yar',             arabicPronunciation:'Kham-sa',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/5.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/5.oga' },
//     { hausa:'Shida',         arabic:'ستة',    english:'Six (6)',          pronunciation:'SHEE-dah',            arabicPronunciation:'Sit-ta',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/6.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/6.oga' },
//     { hausa:'Bakwai',        arabic:'سبعة',   english:'Seven (7)',        pronunciation:'BAK-why',             arabicPronunciation:'Sab-a',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/3.ogaa',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/7.oga' },
//     { hausa:'Takwas',        arabic:'ثمانية', english:'Eight (8)',        pronunciation:'TAK-was',             arabicPronunciation:'Tha-maa-ni-ya',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/8.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/8.oga' },
//     { hausa:'Tara',          arabic:'تسعة',   english:'Nine (9)',         pronunciation:'TAH-rah',             arabicPronunciation:'Tis-a',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/9.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/9.oga' },
//     { hausa:'Goma',          arabic:'عشرة',   english:'Ten (10)',         pronunciation:'GO-mah',              arabicPronunciation:'Ash-a-ra',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/10.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/10.oga' },
//     { hausa:'Goma sha daya', arabic:'أحد عشر',english:'Eleven (11)',      pronunciation:'GO-mah shah DAH-yah', arabicPronunciation:'Ah-had ash-ar',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/11.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/11.oga' },
//     { hausa:'Goma sha biyu', arabic:'اثنا عشر',english:'Twelve (12)',     pronunciation:'GO-mah shah BEE-yoo', arabicPronunciation:'Ith-na ash-ar',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/12.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/122.oga' },
//     { hausa:'Ashirin',       arabic:'عشرون',  english:'Twenty (20)',      pronunciation:'ah-SHEE-rin',         arabicPronunciation:'Ish-roon',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/20.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/20.oga' },
//     { hausa:'Talatin',       arabic:'ثلاثون', english:'Thirty (30)',      pronunciation:'ta-LAH-tin',          arabicPronunciation:'Tha-laa-thoon',  hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/30.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/30.oga' },
//     { hausa:"Arba'in",       arabic:'أربعون', english:'Forty (40)',       pronunciation:'ar-BAH-in',           arabicPronunciation:'Ar-ba-oon',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/40.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/40.oga' },
//     { hausa:'Hamsin',        arabic:'خمسون',  english:'Fifty (50)',       pronunciation:'HAM-sin',             arabicPronunciation:'Kham-soon',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/50.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/50.oga' },
//     { hausa:'Sittin',        arabic:'ستون',   english:'Sixty (60)',       pronunciation:'SIT-tin',             arabicPronunciation:'Sit-toon',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/60.oga',          arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/60.oga' },
//     { hausa:"Sab'in",        arabic:'سبعون',  english:'Seventy (70)',     pronunciation:'SAB-in',              arabicPronunciation:'Sab-oon',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/70.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/70.oga' },
//     { hausa:'Tamanin',       arabic:'ثمانون', english:'Eighty (80)',      pronunciation:'tah-MAH-nin',         arabicPronunciation:'Tha-maa-noon',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/80.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/80.oga' },
//     { hausa:"Tis'in",        arabic:'تسعون',  english:'Ninety (90)',      pronunciation:'TIS-in',              arabicPronunciation:'Tis-oon',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/90.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/90.oga' },
//     { hausa:'Dari',          arabic:'مئة',    english:'One Hundred (100)',pronunciation:'DAH-ree',             arabicPronunciation:'Mi-ah',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/100.oga',            arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/100.oga' },
//   ],
//   quiz: [
//     { id:'u1l2q1', question:'What is the Arabic word for 7?', options:['ستة','سبعة','تسعة','ثمانية'], correctAnswer:1, explanation:'"سبعة" (Sab-a) = 7. Hausa: "Bakwai".' },
//     { id:'u1l2q2', question:'Which Arabic word means "Ten"?', options:['ثلاثة','عشرة','خمسة','واحد'], correctAnswer:1, explanation:'"عشرة" (Ash-a-ra) = 10. Hausa: "Goma".' },
//     { id:'u1l2q3', question:'How do you say 20 in Arabic?', options:['اثنا عشر','ثلاثون','عشرون','مئة'], correctAnswer:2, explanation:'"عشرون" (Ish-roon) = 20. Hausa: "Ashirin".' },
//     { id:'u1l2q4', question:'What does "مئة" mean?', options:['Fifty','Seventy','One Hundred','Thirty'], correctAnswer:2, explanation:'"مئة" (Mi-ah) = 100. Hausa: "Dari".' },
//     { id:'u1l2q5', question:'What is "أحد عشر" in English?', options:['Ten','Twelve','Eleven','Twenty-one'], correctAnswer:2, explanation:'"أحد عشر" (Ah-had ash-ar) = 11. Hausa: "Goma sha daya".' },
//     { id:'u1l2q6', question:'Which Arabic number means 50?', options:['خمسة','خمسون','مئة','أربعون'], correctAnswer:1, explanation:'"خمسون" (Kham-soon) = 50. Hausa: "Hamsin".' },
//     { id:'u1l2q7', question:'What pattern do Arabic teen numbers follow? (e.g. 11)', options:['أحد + عشر','عشرة + واحد','واحد + عشرة','عشرون + واحد'], correctAnswer:0, explanation:'"أحد عشر" = أحد (one) + عشر (ten). Same logic as Hausa "Goma sha daya".' },
//   ],
//   audioExercises: [
//     { id:'u1l2a1', type:'listen_identify', instruction:'Listen to the Arabic number. Select the Arabic word you just heard.', targetWord:'سبعة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/saba.m4a', hausaAudioSrc:'/audio/hausa/bakwai.m4a', options:['ستة','سبعة','ثمانية','تسعة'], correctAnswer:1 },
//     { id:'u1l2a2', type:'listen_identify', instruction:'Listen to this Arabic number. Which one did you hear?', targetWord:'عشرة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/ashara.m4a', hausaAudioSrc:'/audio/hausa/goma.m4a', options:['سبعة','عشرة','اثنا عشر','مئة'], correctAnswer:1 },
//     { id:'u1l2a3', type:'repeat_after_me', instruction:'Listen to Arabic 1–5 and repeat each one. Hausa is shown for reference.', targetWord:'واحد، اثنان، ثلاثة، أربعة، خمسة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/one-to-five.m4a', hausaAudioSrc:'/audio/hausa/one-to-five.m4a' },
//     { id:'u1l2a4', type:'repeat_after_me', instruction:'Listen to the Arabic for "Three" and repeat it clearly.', targetWord:'ثلاثة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/thalatha.m4a', hausaAudioSrc:'/audio/hausa/uku.m4a' },
//     { id:'u1l2a5', type:'match_pairs', instruction:'You know these numbers in Hausa. Match each to its Arabic equivalent — your target.', pairs:[{left:'Daya',right:'واحد'},{left:'Goma',right:'عشرة'},{left:'Ashirin',right:'عشرون'},{left:'Dari',right:'مئة'}] },
//   ],
// };

// const colorsLesson: Lesson = {
//   id: 'u1-l3-colors',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Colors (Launuka / الألوان)',
//   description: 'Learn color names in Arabic, using Hausa as your familiar reference.',
//   xpReward: 55,
//   isPremium: false,
//   vocabulary: [
//     { hausa:'Ja',           arabic:'أحمر',       english:'Red',        pronunciation:'JAH',                 arabicPronunciation:'Ah-mar',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/red.oga',           arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/red.oga' },
//     { hausa:'Kore',         arabic:'أخضر',       english:'Green',      pronunciation:'KO-reh',              arabicPronunciation:'Akh-dar',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/green.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/green.oga' },
//     { hausa:'Shuɗi',        arabic:'أزرق',       english:'Blue',       pronunciation:'SHOO-dee',            arabicPronunciation:'Az-raq',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/blue.oga',        arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/blue.oga' },
//     { hausa:'Fari',         arabic:'أبيض',       english:'White',      pronunciation:'FAH-ree',             arabicPronunciation:'Ab-yad',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/white.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/white.oga' },
//     { hausa:'Baƙi',         arabic:'أسود',       english:'Black',      pronunciation:'BAH-kee',             arabicPronunciation:'As-wad',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/black.oga',         arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/black.oga' },
//     { hausa:'Ruwan hoda',   arabic:'وردي',       english:'Pink',       pronunciation:'ROO-wan HO-dah',      arabicPronunciation:'War-dee',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/pink.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/pink.oga' },
//     { hausa:'Ruwan lemo',   arabic:'برتقالي',    english:'Orange',     pronunciation:'ROO-wan LEH-mo',      arabicPronunciation:'Bur-tu-qaa-lee',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/orange.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/orange.oga' },
//     { hausa:'Ruwan rawaya', arabic:'أصفر',       english:'Yellow',     pronunciation:'ROO-wan rah-WAH-yah', arabicPronunciation:'As-far',            hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/yellow.oga', arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/yellow.oga' },
//     { hausa:'Ruwan toka',   arabic:'رمادي',      english:'Gray',       pronunciation:'ROO-wan TOH-kah',     arabicPronunciation:'Ra-maa-dee',        hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/gray.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/gray.oga' },
//     { hausa:'Ruwan shuɗi',  arabic:'أزرق سماوي', english:'Light blue', pronunciation:'ROO-wan SHOO-dee',    arabicPronunciation:'Az-raq sa-maa-wee', hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/lightblue.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/lightblue.oga' },
//     { hausa:'Ruwan inuwa',  arabic:'بني',        english:'Brown',      pronunciation:'ROO-wan ee-NOO-wah',  arabicPronunciation:'Bun-nee',           hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/brown.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/brown.oga' },
//     { hausa:'Shunayya',     arabic:'بنفسجي',     english:'Purple',     pronunciation:'shoo-NAY-yah',        arabicPronunciation:'Ba-naf-sa-jee',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/purple.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/purple.oga' },
//   ],
//   quiz: [
//     { id:'u1l3q1', question:'What is the Arabic word for Red?', options:['أزرق','أخضر','أحمر','أسود'], correctAnswer:2, explanation:'"أحمر" (Ah-mar) = Red. Hausa: "Ja".' },
//     { id:'u1l3q2', question:'What does "أسود" mean?', options:['White','Gray','Brown','Black'], correctAnswer:3, explanation:'"أسود" (As-wad) = Black. Hausa: "Baƙi".' },
//     { id:'u1l3q3', question:'"أزرق سماوي" in Arabic means what?', options:['Dark blue','Light blue','Navy','Purple'], correctAnswer:1, explanation:'"أزرق سماوي" = Light/sky blue. "سماوي" means sky. Hausa: "Ruwan shuɗi".' },
//     { id:'u1l3q4', question:'What is the Arabic for Purple?', options:['رمادي','وردي','بني','بنفسجي'], correctAnswer:3, explanation:'"بنفسجي" (Ba-naf-sa-jee) = Purple. Hausa: "Shunayya".' },
//     { id:'u1l3q5', question:'What is the Arabic for Green?', options:['أزرق','أخضر','أصفر','أحمر'], correctAnswer:1, explanation:'"أخضر" (Akh-dar) = Green. Hausa: "Kore".' },
//     { id:'u1l3q6', question:'What is "أبيض" in English?', options:['Black','Pink','White','Gray'], correctAnswer:2, explanation:'"أبيض" (Ab-yad) = White. Hausa: "Fari".' },
//     { id:'u1l3q7', question:'What is "وردي" in English?', options:['Orange','Yellow','Pink','Brown'], correctAnswer:2, explanation:'"وردي" (War-dee) = Pink. Hausa: "Ruwan hoda".' },
//   ],
//   audioExercises: [
//     { id:'u1l3a1', type:'listen_identify', instruction:'Listen to the Arabic color. Select the Arabic word you heard.', targetWord:'أخضر', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/akhdar.m4a', hausaAudioSrc:'/audio/hausa/kore.m4a', options:['أزرق','أخضر','رمادي','بنفسجي'], correctAnswer:1 },
//     { id:'u1l3a2', type:'listen_identify', instruction:'Listen to this Arabic color. Which one did you hear?', targetWord:'أحمر', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/ahmar.m4a', hausaAudioSrc:'/audio/hausa/ja.m4a', options:['أسود','أبيض','أحمر','أصفر'], correctAnswer:2 },
//     { id:'u1l3a3', type:'repeat_after_me', instruction:'Listen to the Arabic for Blue and repeat. Focus on the deep "q" sound at the end: أزرق.', targetWord:'أزرق', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/azraq.m4a', hausaAudioSrc:'/audio/hausa/shudi.m4a' },
//     { id:'u1l3a4', type:'repeat_after_me', instruction:'Listen to this 4-syllable Arabic color and repeat: Ba-naf-sa-jee.', targetWord:'بنفسجي', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/banafsaji.m4a', hausaAudioSrc:'/audio/hausa/shunayya.m4a' },
//     { id:'u1l3a5', type:'match_pairs', instruction:'Use your Hausa knowledge to match each color to its Arabic. Focus on memorizing the Arabic side.', pairs:[{left:'Ja',right:'أحمر'},{left:'Fari',right:'أبيض'},{left:'Baƙi',right:'أسود'},{left:'Kore',right:'أخضر'}] },
//   ],
// };

// const nounsLesson: Lesson = {
//   id: 'u1-l4-nouns',
//   unitId: 'unit-1',
//   unitTitle: 'Unit 1: Beginner Foundation',
//   title: 'Simple Nouns (Sunaye / الأسماء البسيطة)',
//   description: 'Learn everyday object names in Arabic — from household items to clothing and tools.',
//   xpReward: 65,
//   isPremium: false,
//   vocabulary: [
//     { hausa:'Gida',     arabic:'منزل',  english:'House',    pronunciation:'GEE-dah',        arabicPronunciation:'Man-zil',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/house.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/house.oga' },
//     { hausa:'Mota',     arabic:'سيارة', english:'Car',      pronunciation:'MO-tah',         arabicPronunciation:'Say-yaa-ra',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/car.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/car.oga' },
//     { hausa:'Ruwa',     arabic:'ماء',   english:'Water',    pronunciation:'ROO-wah',        arabicPronunciation:'Maa',          hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/water.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/water.oga' },
//     { hausa:'Abinci',   arabic:'طعام',  english:'Food',     pronunciation:'ah-BIN-chee',    arabicPronunciation:'Ta-aam',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/food.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/food.oga' },
//     { hausa:'Littafi',  arabic:'كتاب',  english:'Book',     pronunciation:'lit-TAH-fee',    arabicPronunciation:'Ki-taab',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/book.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/book.oga' },
//     { hausa:'Alkalami', arabic:'قلم',   english:'Pen',      pronunciation:'al-KAH-lah-mee', arabicPronunciation:'Qa-lam',       hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/pen.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/pen.oga' },
//     { hausa:'Kujera',   arabic:'كرسي',  english:'Chair',    pronunciation:'koo-JEH-rah',    arabicPronunciation:'Kur-see',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/chair.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/chair.oga' },
//     { hausa:'Tebur',    arabic:'طاولة', english:'Table',    pronunciation:'TEH-bur',        arabicPronunciation:'Taa-wi-la',    hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/table.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/table.oga' },
//     { hausa:'Kofa',     arabic:'باب',   english:'Door',     pronunciation:'KO-fah',         arabicPronunciation:'Baab',         hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/door.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/door.oga' },
//     { hausa:'Taga',     arabic:'نافذة', english:'Window',   pronunciation:'TAH-gah',        arabicPronunciation:'Naa-fi-dha',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/window.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/window.oga' },
//     { hausa:'Riga',     arabic:'قميص',  english:'Shirt',    pronunciation:'REE-gah',        arabicPronunciation:'Qa-mees',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/shirt.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/shirt.oga' },
//     { hausa:'Wando',    arabic:'بنطال', english:'Trousers', pronunciation:'WAN-doh',        arabicPronunciation:'Ban-taal',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/trousers.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/trousers.oga' },
//     { hausa:'Takalmi',  arabic:'حذاء',  english:'Shoe',     pronunciation:'tah-KAL-mee',    arabicPronunciation:'Hi-dhaa',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/shoe.oga',  arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/shoe.oga' },
//     { hausa:'Hula',     arabic:'قبعة',  english:'Hat',      pronunciation:'HOO-lah',        arabicPronunciation:'Qub-ba-a',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/hat.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/hat.oga' },
//     { hausa:'Gado',     arabic:'سرير',  english:'Bed',      pronunciation:'GAH-doh',        arabicPronunciation:'Sa-reer',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/bed.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/bed.oga' },
//     { hausa:'Waya',     arabic:'هاتف',  english:'Phone',    pronunciation:'WAH-yah',        arabicPronunciation:'Haa-tif',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/phone.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/phone.oga' },
//     { hausa:'Fansa',    arabic:'مروحة', english:'Fan',      pronunciation:'FAN-sah',        arabicPronunciation:'Mar-wah-ha',   hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/fan.oga',    arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/fan.oga' },
//     { hausa:'Madubi',   arabic:'مرآة',  english:'Mirror',   pronunciation:'mah-DOO-bee',    arabicPronunciation:'Mir-aat',      hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/mirror.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/mirror.oga' },
//     { hausa:'Wuka',     arabic:'سكين',  english:'Knife',    pronunciation:'WOO-kah',        arabicPronunciation:'Sik-keen',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/knife.oga',     arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/knife.oga' },
//     { hausa:'Cokali',   arabic:'ملعقة', english:'Spoon',    pronunciation:'cho-KAH-lee',    arabicPronunciation:'Mil-a-qa',     hausaAudioSrc:'/audio/lesson-one/lesson-one-hausa/spoon.oga',   arabicAudioSrc:'/audio/lesson-one/lesson-one-arabic/spoon.oga' },
//   ],
//   quiz: [
//     { id:'u1l4q1', question:'What is the Arabic word for "Book"?', options:['قلم','كتاب','طاولة','كرسي'], correctAnswer:1, explanation:'"كتاب" (Ki-taab) = Book. Note: Hausa borrowed "قلم" as "Alkalami"!' },
//     { id:'u1l4q2', question:'What does "سيارة" mean?', options:['House','Phone','Car','Water'], correctAnswer:2, explanation:'"سيارة" (Say-yaa-ra) = Car. Hausa: "Mota".' },
//     { id:'u1l4q3', question:'Which Arabic word means "Door"?', options:['نافذة','باب','منزل','سرير'], correctAnswer:1, explanation:'"باب" (Baab) = Door. Hausa: "Kofa". "نافذة" = Window.' },
//     { id:'u1l4q4', question:'What is "قلم" in English?', options:['Chair','Table','Book','Pen'], correctAnswer:3, explanation:'"قلم" (Qa-lam) = Pen. Hausa borrowed this as "Alkalami"!' },
//     { id:'u1l4q5', question:'What is the Arabic for "Shoe"?', options:['قبعة','قميص','بنطال','حذاء'], correctAnswer:3, explanation:'"حذاء" (Hi-dhaa) = Shoe. Hausa: "Takalmi".' },
//     { id:'u1l4q6', question:'What does "هاتف" mean?', options:['Water','Fan','Phone','Mirror'], correctAnswer:2, explanation:'"هاتف" (Haa-tif) = Phone. Hausa: "Waya".' },
//     { id:'u1l4q7', question:'Which Arabic word means Spoon?', options:['سكين','ملعقة','مروحة','مرآة'], correctAnswer:1, explanation:'"ملعقة" (Mil-a-qa) = Spoon. "سكين" = Knife.' },
//     { id:'u1l4q8', question:'What is the Arabic for "Window"?', options:['باب','نافذة','طاولة','كرسي'], correctAnswer:1, explanation:'"نافذة" (Naa-fi-dha) = Window. Hausa: "Taga".' },
//   ],
//   audioExercises: [
//     { id:'u1l4a1', type:'listen_identify', instruction:'Listen to the Arabic word. Select the Arabic word you heard.', targetWord:'كتاب', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/kitab.m4a', hausaAudioSrc:'/audio/hausa/littafi.m4a', options:['قلم','طاولة','كتاب','كرسي'], correctAnswer:2 },
//     { id:'u1l4a2', type:'listen_identify', instruction:'Listen to this Arabic noun. Which one did you hear?', targetWord:'طعام', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/taam.m4a', hausaAudioSrc:'/audio/hausa/abinci.m4a', options:['ماء','طعام','منزل','سرير'], correctAnswer:1 },
//     { id:'u1l4a3', type:'repeat_after_me', instruction:'Listen to "قلم" (Pen) and repeat. It sounds like "Alkalami" — because Hausa borrowed it from Arabic!', targetWord:'قلم', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/qalam.m4a', hausaAudioSrc:'/audio/hausa/alkalami.m4a' },
//     { id:'u1l4a4', type:'repeat_after_me', instruction:'Listen to this Arabic noun and repeat it clearly.', targetWord:'سيارة', targetLanguage:'arabic', arabicAudioSrc:'/audio/arabic/sayyara.m4a', hausaAudioSrc:'/audio/hausa/mota.m4a' },
//     { id:'u1l4a5', type:'match_pairs', instruction:'Match each Hausa noun to its Arabic equivalent. The Arabic is what you are learning — make it stick.', pairs:[{left:'Gida',right:'منزل'},{left:'Ruwa',right:'ماء'},{left:'Waya',right:'هاتف'},{left:'Cokali',right:'ملعقة'}] },
//   ],
// };

// export const UNITS: Unit[] = [
//   {
//     id: 'unit-1',
//     title: 'Unit 1: Beginner Foundation (Matakin Farko)',
//     description: 'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
//     lessonCount: 4,
//     isPremium: false,
//     lessons: [greetingsLesson, numbersLesson, colorsLesson, nounsLesson],
//   },
// ];

// export const ALL_LESSONS: Record<string, Lesson> = {
//   [greetingsLesson.id]: greetingsLesson,
//   [numbersLesson.id]:   numbersLesson,
//   [colorsLesson.id]:    colorsLesson,
//   [nounsLesson.id]:     nounsLesson,
// };







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
  quiz: [
    { id:'u1l1q1', question:'What is the Arabic for "Hello"?', options:['شكراً','مرحبا','ليلة سعيدة','إلى اللقاء'], correctAnswer:1, explanation:'"مرحبا" (Mar-ha-ban) = Hello. Hausa: "Sannu".' },
    { id:'u1l1q2', question:'Which Arabic phrase means "Good morning"?', options:['ليلة سعيدة','إلى الغد','صباح الخير','كيف الحال؟'], correctAnswer:2, explanation:'"صباح الخير" (Sa-baa-hul khayr) = Good morning. Hausa: "Barka da safe".' },
    { id:'u1l1q3', question:'How do you say "Thank you very much" in Arabic?', options:['شكراً','شكراً جزيلاً','بخير','مرحبا'], correctAnswer:1, explanation:'"شكراً جزيلاً" (Shuk-ran ja-zee-lan) = Thank you very much.' },
    { id:'u1l1q4', question:'What is the Arabic for "Good night"?', options:['صباح الخير','مرحبا','ليلة سعيدة','شكراً'], correctAnswer:2, explanation:'"ليلة سعيدة" (Lay-la-tan sa-ee-dah) = Good night. Hausa: "Barka da dare".' },
    { id:'u1l1q5', question:'What does "إلى اللقاء" mean?', options:['See you tomorrow','How are you?','See you later','Good evening'], correctAnswer:2, explanation:'"إلى اللقاء" (I-lal li-qaa) = See you later. Hausa: "Sai anjima".' },
    { id:'u1l1q6', question:'Which Arabic phrase asks "Are you fine?"', options:['هل أنت بخير؟','ما اسمك؟','كيف الحال؟','صباح الخير'], correctAnswer:0, explanation:'"هل أنت بخير؟" = Are you fine? Hausa: "Kana/Kina lafiya?".' },
    { id:'u1l1q7', question:'"اسمي ..." means what?', options:['What is your name?','My name is ...','Fine / Well','Thank you'], correctAnswer:1, explanation:'"اسمي ..." (Is-mee) = My name is ... Hausa: "Sunana ...".' },
  ],
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
  quiz: [
    { id:'u1l2q1', question:'What is the Arabic word for 7?', options:['ستة','سبعة','تسعة','ثمانية'], correctAnswer:1, explanation:'"سبعة" (Sab-a) = 7. Hausa: "Bakwai".' },
    { id:'u1l2q2', question:'Which Arabic word means "Ten"?', options:['ثلاثة','عشرة','خمسة','واحد'], correctAnswer:1, explanation:'"عشرة" (Ash-a-ra) = 10. Hausa: "Goma".' },
    { id:'u1l2q3', question:'How do you say 20 in Arabic?', options:['اثنا عشر','ثلاثون','عشرون','مئة'], correctAnswer:2, explanation:'"عشرون" (Ish-roon) = 20. Hausa: "Ashirin".' },
    { id:'u1l2q4', question:'What does "مئة" mean?', options:['Fifty','Seventy','One Hundred','Thirty'], correctAnswer:2, explanation:'"مئة" (Mi-ah) = 100. Hausa: "Dari".' },
    { id:'u1l2q5', question:'What is "أحد عشر" in English?', options:['Ten','Twelve','Eleven','Twenty-one'], correctAnswer:2, explanation:'"أحد عشر" (Ah-had ash-ar) = 11. Hausa: "Goma sha daya".' },
    { id:'u1l2q6', question:'Which Arabic number means 50?', options:['خمسة','خمسون','مئة','أربعون'], correctAnswer:1, explanation:'"خمسون" (Kham-soon) = 50. Hausa: "Hamsin".' },
    { id:'u1l2q7', question:'What pattern do Arabic teen numbers follow? (e.g. 11)', options:['أحد + عشر','عشرة + واحد','واحد + عشرة','عشرون + واحد'], correctAnswer:0, explanation:'"أحد عشر" = أحد (one) + عشر (ten). Same logic as Hausa "Goma sha daya".' },
  ],
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
  quiz: [
    { id:'u1l3q1', question:'What is the Arabic word for Red?', options:['أزرق','أخضر','أحمر','أسود'], correctAnswer:2, explanation:'"أحمر" (Ah-mar) = Red. Hausa: "Ja".' },
    { id:'u1l3q2', question:'What does "أسود" mean?', options:['White','Gray','Brown','Black'], correctAnswer:3, explanation:'"أسود" (As-wad) = Black. Hausa: "Baƙi".' },
    { id:'u1l3q3', question:'"أزرق سماوي" in Arabic means what?', options:['Dark blue','Light blue','Navy','Purple'], correctAnswer:1, explanation:'"أزرق سماوي" = Light/sky blue. "سماوي" means sky. Hausa: "Ruwan shuɗi".' },
    { id:'u1l3q4', question:'What is the Arabic for Purple?', options:['رمادي','وردي','بني','بنفسجي'], correctAnswer:3, explanation:'"بنفسجي" (Ba-naf-sa-jee) = Purple. Hausa: "Shunayya".' },
    { id:'u1l3q5', question:'What is the Arabic for Green?', options:['أزرق','أخضر','أصفر','أحمر'], correctAnswer:1, explanation:'"أخضر" (Akh-dar) = Green. Hausa: "Kore".' },
    { id:'u1l3q6', question:'What is "أبيض" in English?', options:['Black','Pink','White','Gray'], correctAnswer:2, explanation:'"أبيض" (Ab-yad) = White. Hausa: "Fari".' },
    { id:'u1l3q7', question:'What is "وردي" in English?', options:['Orange','Yellow','Pink','Brown'], correctAnswer:2, explanation:'"وردي" (War-dee) = Pink. Hausa: "Ruwan hoda".' },
  ],
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
  quiz: [
    { id:'u1l4q1', question:'What is the Arabic word for "Book"?', options:['قلم','كتاب','طاولة','كرسي'], correctAnswer:1, explanation:'"كتاب" (Ki-taab) = Book. Note: Hausa borrowed "قلم" as "Alkalami"!' },
    { id:'u1l4q2', question:'What does "سيارة" mean?', options:['House','Phone','Car','Water'], correctAnswer:2, explanation:'"سيارة" (Say-yaa-ra) = Car. Hausa: "Mota".' },
    { id:'u1l4q3', question:'Which Arabic word means "Door"?', options:['نافذة','باب','منزل','سرير'], correctAnswer:1, explanation:'"باب" (Baab) = Door. Hausa: "Kofa". "نافذة" = Window.' },
    { id:'u1l4q4', question:'What is "قلم" in English?', options:['Chair','Table','Book','Pen'], correctAnswer:3, explanation:'"قلم" (Qa-lam) = Pen. Hausa borrowed this as "Alkalami"!' },
    { id:'u1l4q5', question:'What is the Arabic for "Shoe"?', options:['قبعة','قميص','بنطال','حذاء'], correctAnswer:3, explanation:'"حذاء" (Hi-dhaa) = Shoe. Hausa: "Takalmi".' },
    { id:'u1l4q6', question:'What does "هاتف" mean?', options:['Water','Fan','Phone','Mirror'], correctAnswer:2, explanation:'"هاتف" (Haa-tif) = Phone. Hausa: "Waya".' },
    { id:'u1l4q7', question:'Which Arabic word means Spoon?', options:['سكين','ملعقة','مروحة','مرآة'], correctAnswer:1, explanation:'"ملعقة" (Mil-a-qa) = Spoon. "سكين" = Knife.' },
    { id:'u1l4q8', question:'What is the Arabic for "Window"?', options:['باب','نافذة','طاولة','كرسي'], correctAnswer:1, explanation:'"نافذة" (Naa-fi-dha) = Window. Hausa: "Taga".' },
  ],
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
  quiz: [
    { id:'u2l1q1', question:'What is the Arabic word for "Uwa" (Mother)?', options:['أب','أم','أخ','جد'], correctAnswer:1, explanation:'"أم" (Umm) = Mother. Hausa: "Uwa / Mama".' },
    { id:'u2l1q2', question:'What is the Arabic for "Kawu" (Uncle)?', options:['عم / خال','أخت','ابنة','جدة'], correctAnswer:0, explanation:'"عم / خال" (Amm / Khaal) = Uncle (paternal/maternal). Hausa: "Kawu".' },
    { id:'u2l1q3', question:'Which Hausa word means "Son"?', options:["Ɗa","'Ya","Ɗan'uwa",'Miji'], correctAnswer:0, explanation:'"Ɗa" = Son = "ابن" (Ibn) in Arabic.' },
    { id:'u2l1q4', question:'What does "\'Yar\'uwa" mean?', options:['Brother','Sister','Cousin','Aunt'], correctAnswer:1, explanation:'"\'Yar\'uwa" = Sister = "أخت" (Ukht).' },
    { id:'u2l1q5', question:'"جد" in Arabic refers to which relative?', options:['Kaka','Kaka (na namiji)','Jikaci','Kawu'], correctAnswer:1, explanation:'"جد" (Jadd) = Grandfather. Hausa: "Kaka (na namiji)". "جدة" (Jad-da) is Grandmother.' },
    { id:'u2l1q6', question:'What is the Arabic for "Iyali" (Family)?', options:['أسرة','بيت','أخ','أم'], correctAnswer:0, explanation:'"أسرة" (Us-ra) = Family. Hausa: "Iyali".' },
    { id:'u2l1q7', question:'Which Hausa term means "Wife"?', options:['Miji','Mata','Sabiyi','Maraya'], correctAnswer:1, explanation:'"Mata" = Wife = "زوجة" (Zaw-ja). "Miji" = Husband = "زوج" (Zawj).' },
  ],
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
  quiz: [
    { id:'u2l2q1', question:"The day after Jumma'a is which Hausa day?", options:['Asabar','Litinin','Lahadi','Talata'], correctAnswer:0, explanation:'"Asabar" (Saturday) comes right after "Jumma\'a" (Friday).' },
    { id:'u2l2q2', question:'The day before Talata (Tuesday) is?', options:['Litinin','Laraba','Alhamis','Lahadi'], correctAnswer:0, explanation:'"Litinin" (Monday) comes right before "Talata" (Tuesday).' },
    { id:'u2l2q3', question:'The first day of the week in Hausa is?', options:['Litinin','Lahadi','Asabar','Jumma\'a'], correctAnswer:1, explanation:'"Lahadi" (Sunday) is the first day of the week, corresponding to Arabic "الأحد" (Al-ahad).' },
    { id:'u2l2q4', question:'Which Hausa word means "Thursday"?', options:['Laraba','Alhamis','Jumma\'a','Asabar'], correctAnswer:1, explanation:'"Alhamis" = Thursday = "الخميس" (Al-kha-mees).' },
    { id:'u2l2q5', question:'"Tomorrow" in Hausa is?', options:['Jiya','Yau','Gobe','Bayan-gobe'], correctAnswer:2, explanation:'"Gobe" = Tomorrow = "غداً" (Gha-dan). "Bayan-gobe" is Day after tomorrow.' },
    { id:'u2l2q6', question:'What is the Arabic for "Mako" (Week)?', options:['شهر','سنة','أسبوع','يوم'], correctAnswer:2, explanation:'"أسبوع" (Us-boo) = Week. Hausa: "Mako".' },
    { id:'u2l2q7', question:'Which Hausa word means "Yesterday"?', options:['Jiya','Gobe','Yau','Kullum'], correctAnswer:0, explanation:'"Jiya" = Yesterday = "أمس" (Ams).' },
  ],
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
  quiz: [
    { id:'u2l3q1', question:'Ina ___ (ci / tafiya) — "I am eating" — which verb fits?', options:['ci','tafiya','sha','gani'], correctAnswer:0, explanation:'"Ina ci" = I am eating. "يأكل" (Ya-kul) = Eat.' },
    { id:'u2l3q2', question:'Ina ___ (magana / sha) — "I am drinking" — which verb fits?', options:['magana','sha','ji','yi'], correctAnswer:1, explanation:'"Ina sha" = I am drinking. "يشرب" (Yash-rab) = Drink.' },
    { id:'u2l3q3', question:'Ina ___ (zuwa / karatu) — "I am reading" — which verb fits?', options:['zuwa','karatu','tashi','wanka'], correctAnswer:1, explanation:'"Ina karatu" = I am reading. "يقرأ" (Yaq-ra) = Read.' },
    { id:'u2l3q4', question:'Ina ___ (aiki / koyo) — "I am learning" — which verb fits?', options:['aiki','koyo','koyar','hira'], correctAnswer:1, explanation:'"Ina koyo" = I am learning. "يتعلم" (Ya-ta-al-lam) = Learn.' },
    { id:'u2l3q5', question:'Ina ___ (rubuta / gani) — "I am writing" — which verb fits?', options:['rubuta','gani','ji','saiya'], correctAnswer:0, explanation:'"Ina rubutu" = I am writing. "يكتب" (Yak-tub) = Write.' },
    { id:'u2l3q6', question:'What is the Arabic for "Karanta" (Read)?', options:['يكتب','يقرأ','يسمع','يشتري'], correctAnswer:1, explanation:'"يقرأ" (Yaq-ra) = Read. Hausa: "Karanta".' },
    { id:'u2l3q7', question:'What does "Wanka" mean?', options:['Sleep','Bathe','Wake up','Work'], correctAnswer:1, explanation:'"Wanka" = Bathe = "يستحم" (Yas-ta-him).' },
  ],
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
  quiz: [
    { id:'u2l4q1', question:'Translate "Ina zuwa gida" to Arabic.', options:['أنا أذهب إلى المنزل','أنا آكل الطعام','أنا أشرب الماء','أنا أتعلم'], correctAnswer:0, explanation:'"Ina zuwa gida" = "I am going home" = "أنا أذهب إلى المنزل".' },
    { id:'u2l4q2', question:'Translate "Muna cin abinci" to Arabic.', options:['نحن نأكل الطعام','نحن نذهب','نحن نتعلم','نحن نشرب'], correctAnswer:0, explanation:'"Muna cin abinci" = "We are eating food" = "نحن نأكل الطعام".' },
    { id:'u2l4q3', question:'Translate "Suna tafiya kasuwa" to Arabic.', options:['هم يذهبون إلى السوق','هم يأكلون','هم ينامون','هم يقرأون'], correctAnswer:0, explanation:'"Suna tafiya kasuwa" = "They are going to the market" = "هم يذهبون إلى السوق".' },
    { id:'u2l4q4', question:'Translate "Kana karatu?" to Arabic.', options:['هل تقرأ؟','هل تأكل؟','هل تذهب؟','هل تشرب؟'], correctAnswer:0, explanation:'"Kana karatu?" = "Are you reading?" = "هل تقرأ؟".' },
    { id:'u2l4q5', question:'Translate "Ba na sha ruwa" to Arabic.', options:['لا أشرب الماء','أنا أشرب الماء','لا آكل الطعام','أنا لا أذهب'], correctAnswer:0, explanation:'"Ba na sha ruwa" = "I am not drinking water" = "لا أشرب الماء".' },
    { id:'u2l4q6', question:'What does "Yaya kake?" mean?', options:["What's your name?",'How are you?','Where are you from?','Goodbye'], correctAnswer:1, explanation:'"Yaya kake?" = "How are you?", equivalent to "كيف حالك؟".' },
    { id:'u2l4q7', question:'What does "Ina jin yunwa" mean?', options:['I am thirsty','I am tired','I am hungry','I am full'], correctAnswer:2, explanation:'"Ina jin yunwa" = "I am hungry" = "أنا جائع".' },
    { id:'u2l4q8', question:'What does "Ya yi tsada" mean?', options:["It's cheap","It's expensive","It's beautiful","It's small"], correctAnswer:1, explanation:'"Ya yi tsada" = "It\'s expensive" = "غالي", used when bargaining at the market.' },
    { id:'u2l4q9', question:'What does "Sai gobe" mean?', options:['See you tomorrow','See you later','Good night','Goodbye'], correctAnswer:0, explanation:'"Sai gobe" = "See you tomorrow" = "إلى الغد".' },
    { id:'u2l4q10', question:'What does "Nagode sosai" mean?', options:["You're welcome",'Thank you','Thank you very much','Please'], correctAnswer:2, explanation:'"Nagode sosai" = "Thank you very much" = "شكراً جزيلاً".' },
  ],
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
  quiz: [
    { id:'u2l5q1', question:'What is the Arabic for "Ni" (I)?', options:['أنا','أنت','هو','نحن'], correctAnswer:0, explanation:'"أنا" (A-na) = I. Hausa: "Ni".' },
    { id:'u2l5q2', question:'Which Hausa pronoun means "They"?', options:['Mu','Ku','Su','Shi'], correctAnswer:2, explanation:'"Su" = They = "هم" (Hum).' },
    { id:'u2l5q3', question:'How do you say "I am not eating" in Hausa?', options:['Ba na ci','Ina ci','Kana ci','Muna ci'], correctAnswer:0, explanation:'Hausa negation adds "Ba" before the pronoun: "Ba na ci" = "I am not eating" = "لا آكل".' },
    { id:'u2l5q4', question:'What does "Ina?" mean as a question word?', options:['What?','Where?','When?','Who?'], correctAnswer:1, explanation:'"Ina?" = "Where?" = "أين؟" (Ay-na).' },
    { id:'u2l5q5', question:'"لماذا؟" corresponds to which Hausa question word?', options:['Me?','Don me?','Nawa?','Yaushe?'], correctAnswer:1, explanation:'"لماذا؟" (Li-maa-dhaa) = "Why?" = Hausa "Don me?".' },
    { id:'u2l5q6', question:'What is the correct present-tense form for "She is eating" in Hausa?', options:['Yana ci','Tana ci','Kina ci','Muna ci'], correctAnswer:1, explanation:'"Tana ci" = "She is eating" = "هي تأكل". "Yana ci" is used for "He is eating".' },
    { id:'u2l5q7', question:'Which sentence structure does Hausa follow, like Arabic?', options:['SOV','VSO','SVO','OVS'], correctAnswer:2, explanation:'Both Hausa and Arabic typically follow Subject + Verb + Object (SVO) word order.' },
  ],
  audioExercises: [
    { id:'u2l5a1', type:'listen_identify', instruction:'Listen to the Arabic pronoun. Select the Arabic word you heard.', targetWord:'نحن', targetLanguage:'arabic', options:['أنا','أنت','نحن','هم'], correctAnswer:2 },
    { id:'u2l5a2', type:'listen_identify', instruction:'Listen to this Arabic question word. Which one did you hear?', targetWord:'متى؟', targetLanguage:'arabic', options:['أين؟','متى؟','كيف؟','من؟'], correctAnswer:1 },
    { id:'u2l5a3', type:'repeat_after_me', instruction:'Listen to the Arabic pronouns and repeat each one: أنا، أنت، هو، هي، نحن، هم.', targetWord:'أنا، أنت، هو، هي، نحن، هم', targetLanguage:'arabic' },
    { id:'u2l5a4', type:'repeat_after_me', instruction:'Listen to the full sentence "أنا أذهب إلى المنزل" (I am going home) and repeat it.', targetWord:'أنا أذهب إلى المنزل', targetLanguage:'arabic' },
    { id:'u2l5a5', type:'match_pairs', instruction:'Match each Hausa pronoun to its Arabic equivalent.', pairs:[{left:'Ni',right:'أنا'},{left:'Shi',right:'هو'},{left:'Ita',right:'هي'},{left:'Mu',right:'نحن'},{left:'Su',right:'هم'}] },
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
