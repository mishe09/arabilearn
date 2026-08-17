import type { Unit, Lesson, VocabularyItem, Exercise } from '@/types';

export const seedUnits: Omit<Unit, 'lessons'>[] = [
  {
    id: 'unit-1',
    title: {
      ha: 'Matsayin Farko',
      ar: 'المستوى المبتدئ',
      en: 'Beginner Level'
    },
    description: {
      ha: 'Koyon lambobi, gaisuwa, da kalmomin asali',
      ar: 'تعلم الأرقام، التحيات، والكلمات الأساسية',
      en: 'Learn numbers, greetings, and basic words'
    },
    orderIndex: 1,
    isFree: true,
    xpRequired: 0
  },
  {
    id: 'unit-2',
    title: {
      ha: 'Huluna Ta Yau',
      ar: 'محادثة يومية',
      en: 'Daily Conversations'
    },
    description: {
      ha: 'Koyon yadda ake magana aiki',
      ar: 'تعلم التحدث في المواقف اليومية',
      en: 'Learn to speak in everyday situations'
    },
    orderIndex: 2,
    isFree: false,
    xpRequired: 300
  },
  {
    id: 'unit-3',
    title: {
      ha: 'Ayooyi na Tsakiya',
      ar: 'المستوى المتوسط',
      en: 'Intermediate Level'
    },
    description: {
      ha: 'Koyon Nahawu da jumloli',
      ar: 'تعلم القواعد والجمل',
      en: 'Learn grammar and sentences'
    },
    orderIndex: 3,
    isFree: false,
    xpRequired: 600
  }
];

export const seedLessons: Omit<Lesson, 'vocabulary' | 'exercises'>[] = [
  {
    id: 'lesson-1-1',
    unitId: 'unit-1',
    title: {
      ha: 'Lambobi 1-10',
      ar: 'الأرقام ١-١٠',
      en: 'Numbers 1-10'
    },
    orderIndex: 1,
    xpReward: 50,
    audioRequired: true
  },
  {
    id: 'lesson-1-2',
    unitId: 'unit-1',
    title: {
      ha: 'Lambobi 11-100',
      ar: 'الأرقام ١١-١٠٠',
      en: 'Numbers 11-100'
    },
    orderIndex: 2,
    xpReward: 50,
    audioRequired: true
  },
  {
    id: 'lesson-1-3',
    unitId: 'unit-1',
    title: {
      ha: 'Gaisuwa',
      ar: 'التحيات',
      en: 'Greetings'
    },
    orderIndex: 3,
    xpReward: 50,
    audioRequired: true
  },
  {
    id: 'lesson-1-4',
    unitId: 'unit-1',
    title: {
      ha: 'Kalmomin Abinci',
      ar: 'كلمات الطعام',
      en: 'Food Words'
    },
    orderIndex: 4,
    xpReward: 50,
    audioRequired: true
  },
  {
    id: 'lesson-1-5',
    unitId: 'unit-1',
    title: {
      ha: 'Kalmomin Gida',
      ar: 'كلمات المنزل',
      en: 'House Words'
    },
    orderIndex: 5,
    xpReward: 50,
    audioRequired: true
  }
];

export const seedVocabulary: Omit<VocabularyItem, 'id'>[] = [
  // Numbers 1-10
  { lessonId: 'lesson-1-1', hausa: ' daya', arabic: 'واحد', english: 'One' },
  { lessonId: 'lesson-1-1', hausa: ' biyu', arabic: 'اثنان', english: 'Two' },
  { lessonId: 'lesson-1-1', hausa: ' uku', arabic: 'ثلاثة', english: 'Three' },
  { lessonId: 'lesson-1-1', hausa: ' hudhu', arabic: 'أربعة', english: 'Four' },
  { lessonId: 'lesson-1-1', hausa: ' biyar', arabic: 'خمسة', english: 'Five' },
  { lessonId: 'lesson-1-1', hausa: ' shida', arabic: 'ستة', english: 'Six' },
  { lessonId: 'lesson-1-1', hausa: ' bakwai', arabic: 'سبعة', english: 'Seven' },
  { lessonId: 'lesson-1-1', hausa: ' takwas', arabic: 'ثمانية', english: 'Eight' },
  { lessonId: 'lesson-1-1', hausa: ' tara', arabic: 'تسعة', english: 'Nine' },
  { lessonId: 'lesson-1-1', hausa: ' goma', arabic: 'عشرة', english: 'Ten' },
  
  // Greetings
  { lessonId: 'lesson-1-3', hausa: 'Sannu', arabic: 'مرحبا', english: 'Hello' },
  { lessonId: 'lesson-1-3', hausa: 'Barka da safe', arabic: 'صباح الخير', english: 'Good morning' },
  { lessonId: 'lesson-1-3', hausa: 'Barka da rana', arabic: 'مساء الخير', english: 'Good afternoon' },
  { lessonId: 'lesson-1-3', hausa: 'Barka da yamma', arabic: 'مساء الخير', english: 'Good evening' },
  { lessonId: 'lesson-1-3', hausa: 'Ya aiki lafiya', arabic: 'كيف حالك؟', english: 'How are you?' },
  { lessonId: 'lesson-1-3', hausa: 'Lafiya lau', arabic: 'بخير', english: 'I am fine' },
  { lessonId: 'lesson-1-3', hausa: 'Ann上风', arabic: 'وداعا', english: 'Goodbye' },
  { lessonId: 'lesson-1-3', hausa: 'Na gode', arabic: 'شكرا', english: 'Thank you' },
  { lessonId: 'lesson-1-3', hausa: 'Ai fa', arabic: 'عفوا', english: "You're welcome" },
  { lessonId: 'lesson-1-3', hausa: 'Don Allah', arabic: 'من فضلك', english: 'Please' },
  
  // Food
  { lessonId: 'lesson-1-4', hausa: 'Ruwa', arabic: 'ماء', english: 'Water' },
  { lessonId: 'lesson-1-4', hausa: 'Abinci', arabic: 'طعام', english: 'Food' },
  { lessonId: 'lesson-1-4', hausa: 'Gidan wake', arabic: 'فطور', english: 'Breakfast' },
  { lessonId: 'lesson-1-4', hausa: 'Sharar', arabic: 'غداء', english: 'Lunch' },
  { lessonId: 'lesson-1-4', hausa: 'Rana', arabic: 'عشاء', english: 'Dinner' },
  { lessonId: 'lesson-1-4', hausa: 'Kaza', arabic: 'دجاج', english: 'Chicken' },
  { lessonId: 'lesson-1-4', hausa: 'Shanu', arabic: 'لحم بقري', english: 'Beef' },
  { lessonId: 'lesson-1-4', hausa: 'Kifi', arabic: 'سمك', english: 'Fish' },
  { lessonId: 'lesson-1-4', hausa: 'Fari', arabic: 'أرز', english: 'Rice' },
  { lessonId: 'lesson-1-4', hausa: 'Masara', arabic: 'ذرة', english: 'Corn' },
  
  // House
  { lessonId: 'lesson-1-5', hausa: 'Gida', arabic: 'بيت', english: 'House' },
  { lessonId: 'lesson-1-5', hausa: 'Kofa', arabic: 'باب', english: 'Door' },
  { lessonId: 'lesson-1-5', hausa: 'Tasha', arabic: 'شباك', english: 'Window' },
  { lessonId: 'lesson-1-5', hausa: 'Kujera', arabic: 'كرسي', english: 'Chair' },
  { lessonId: 'lesson-1-5', hausa: 'Tari', arabic: 'طاولة', english: 'Table' },
  { lessonId: 'lesson-1-5', hausa: 'S bed', arabic: 'سرير', english: 'Bed' },
  { lessonId: 'lesson-1-5', hausa: 'Tagu', arabic: 'سقف', english: 'Roof' },
  { lessonId: 'lesson-1-5', hausa: 'Kasa', arabic: 'أرضية', english: 'Floor' },
  { lessonId: 'lesson-1-5', hausa: 'Daki', arabic: 'غرفة', english: 'Room' },
  { lessonId: 'lesson-1-5', hausa: 'Kitchen', arabic: 'مطبخ', english: 'Kitchen' }
];

export const seedExercises: Omit<Exercise, 'id'>[] = [
  // Lesson 1-1 Exercises
  {
    lessonId: 'lesson-1-1',
    type: 'multiple-choice',
    question: { ha: 'Wane lamba ce "1"?', ar: 'ما هو الرقم ١؟', en: 'What number is "1"?' },
    options: ['biyu', ' daya', ' uku', ' goma'],
    correctAnswer: 1,
    points: 10
  },
  {
    lessonId: 'lesson-1-1',
    type: 'multiple-choice',
    question: { ha: 'Wane lamba ce "5"?', ar: 'ما هو الرقم ٥؟', en: 'What number is "5"?' },
    options: ['biyar', 'hudhu', ' bakwai', 'shida'],
    correctAnswer: 0,
    points: 10
  },
  {
    lessonId: 'lesson-1-1',
    type: 'match',
    question: { ha: 'Daidaita lambobi', ar: 'طابق الأرقام', en: 'Match the numbers' },
    options: ['1', '2', '3', '4', '5'],
    correctAnswer: 0,
    points: 10
  },
  
  // Lesson 1-3 Exercises
  {
    lessonId: 'lesson-1-3',
    type: 'multiple-choice',
    question: { ha: 'Wane kalma ce tana nufin "Good morning"?', ar: 'ما الكلمة التي تعني "صباح الخير"؟', en: 'Which word means "Good morning"?' },
    options: ['Ann上风', 'Barka da safe', 'Sannu', 'Ya aiki lafiya'],
    correctAnswer: 1,
    points: 10
  },
  {
    lessonId: 'lesson-1-3',
    type: 'fill',
    question: { ha: '_____ lafiya (I am fine)', ar: '_____ بخير', en: '_____ fine' },
    options: ['Lafiya', 'Sannu', 'Gode', 'Don Allah'],
    correctAnswer: 0,
    points: 10
  },
  {
    lessonId: 'lesson-1-3',
    type: 'multiple-choice',
    question: { ha: 'Yaya ake fada "Thank you" a Hausa?', ar: 'كيف تقول "شكرا" بالأ瀚سا؟', en: 'How do you say "Thank you" in Hausa?' },
    options: ['Sannu', 'Barka da safe', 'Na gode', 'Ann上风'],
    correctAnswer: 2,
    points: 10
  },
  
  // Lesson 1-4 Exercises
  {
    lessonId: 'lesson-1-4',
    type: 'multiple-choice',
    question: { ha: 'Wane kalma ce tana nufin "Water"?', ar: 'ما الكلمة التي تعني "ماء"؟', en: 'Which word means "Water"?' },
    options: ['Abinci', 'Kaza', 'Ruwa', 'Kifi'],
    correctAnswer: 2,
    points: 10
  },
  {
    lessonId: 'lesson-1-4',
    type: 'multiple-choice',
    question: { ha: '"Rice" a harshen Hausa?', ar: '"أرز" بالأ瀚سا؟', en: '"Rice" in Hausa?' },
    options: ['Shanu', 'Kaza', 'Fari', 'Masara'],
    correctAnswer: 2,
    points: 10
  },
  
  // Lesson 1-5 Exercises
  {
    lessonId: 'lesson-1-5',
    type: 'multiple-choice',
    question: { ha: 'Wane kalma ce tana nufin "House"?', ar: 'ما الكلمة التي تعني "بيت"؟', en: 'Which word means "House"?' },
    options: ['Daki', 'Gida', 'Kofa', 'Kujera'],
    correctAnswer: 1,
    points: 10
  },
  {
    lessonId: 'lesson-1-5',
    type: 'fill',
    question: { ha: 'Na zana a kan _____ (Floor)', ar: 'أنا أقف على _____', en: 'I am standing on the _____ ' },
    options: ['Kasa', 'Tagu', 'Tasha', 'Kofa'],
    correctAnswer: 0,
    points: 10
  }
];

export const achievements = [
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', xpReward: 50, requirement: 1 },
  { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', xpReward: 100, requirement: 7 },
  { id: 'streak-30', name: 'Month Master', description: 'Maintain a 30-day streak', icon: '💎', xpReward: 500, requirement: 30 },
  { id: 'first-unit', name: 'Unit Champion', description: 'Complete your first unit', icon: '🏆', xpReward: 200, requirement: 1 },
  { id: 'perfect-quiz', name: 'Perfectionist', description: 'Score 100% on a quiz', icon: '⭐', xpReward: 100, requirement: 1 },
  { id: 'vocabulary-50', name: 'Word Collector', description: 'Learn 50 vocabulary words', icon: '📚', xpReward: 150, requirement: 50 },
  { id: 'xp-1000', name: 'XP Hunter', description: 'Earn 1000 XP', icon: '⚡', xpReward: 100, requirement: 1000 }
];