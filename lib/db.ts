import { seedUnits, seedLessons, seedVocabulary, seedExercises, achievements } from '@/data/seed-data';

const DB_NAME = 'hausa_arabia.db';
const DB_VERSION = 2;

interface DBSchema {
  users: {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    isAdmin: boolean;
    isPremium: boolean;
    createdAt: string;
    lastLogin?: string;
  };
  userProgress: {
    id: string;
    userId: string;
    lessonId: string;
    completed: boolean;
    score: number;
    attempts: number;
    completedAt?: string;
  };
  units: {
    id: string;
    titleHa: string;
    titleAr: string;
    titleEn: string;
    descHa: string;
    descAr: string;
    descEn: string;
    orderIndex: number;
    isFree: boolean;
    xpRequired: number;
  };
  lessons: {
    id: string;
    unitId: string;
    titleHa: string;
    titleAr: string;
    titleEn: string;
    orderIndex: number;
    xpReward: number;
    audioRequired: boolean;
  };
  vocabulary: {
    id: string;
    lessonId: string;
    hausa: string;
    arabic: string;
    english: string;
  };
  exercises: {
    id: string;
    lessonId: string;
    type: string;
    questionHa: string;
    questionAr: string;
    questionEn: string;
    options: string;
    correctAnswer: number;
    points: number;
  };
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: string;
    xpReward: number;
    requirement: number;
  };
  userAchievements: {
    id: string;
    userId: string;
    achievementId: string;
    earnedAt: string;
  };
  subscriptions: {
    id: string;
    userId: string;
    paymentId?: string;
    amount: number;
    currency: string;
    status: string;
    purchasedAt: string;
  };
  sessions: {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
  };
  translations: {
    id: string;
    userId: string;
    sourceLanguage: string;
    sourceText: string;
    targetLanguage: string;
    translation: string;
    context?: string;
    createdAt: string;
  };
}

type StoreName = keyof DBSchema;

class Database {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  async init(): Promise<void> {
    if (this.initPromise) return this.initPromise;
    
    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('userProgress')) {
          const store = db.createObjectStore('userProgress', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('lessonId', 'lessonId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('units')) {
          db.createObjectStore('units', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('lessons')) {
          const store = db.createObjectStore('lessons', { keyPath: 'id' });
          store.createIndex('unitId', 'unitId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('vocabulary')) {
          const store = db.createObjectStore('vocabulary', { keyPath: 'id' });
          store.createIndex('lessonId', 'lessonId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('exercises')) {
          const store = db.createObjectStore('exercises', { keyPath: 'id' });
          store.createIndex('lessonId', 'lessonId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('achievements')) {
          db.createObjectStore('achievements', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('userAchievements')) {
          const store = db.createObjectStore('userAchievements', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('subscriptions')) {
          const store = db.createObjectStore('subscriptions', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('sessions')) {
          const store = db.createObjectStore('sessions', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('token', 'token', { unique: true });
        }

        if (!db.objectStoreNames.contains('translations')) {
          const store = db.createObjectStore('translations', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }
      };
    });

    return this.initPromise;
  }

  private getStore(storeName: StoreName, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  async put<T extends StoreName>(storeName: T, data: DBSchema[T]): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async get<T extends StoreName>(storeName: T, key: string): Promise<DBSchema[T] | undefined> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readonly');
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T extends StoreName>(storeName: T): Promise<DBSchema[T][]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readonly');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getByIndex<T extends StoreName>(
    storeName: T, 
    indexName: string, 
    value: IDBValidKey
  ): Promise<DBSchema[T][]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readonly');
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: StoreName, key: string): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(storeName: StoreName): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async count(storeName: StoreName): Promise<number> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readonly');
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async seedData(): Promise<void> {
    await this.init();

    const existingUnits = await this.count('units');
    if (existingUnits > 0) return;

    for (const unit of seedUnits) {
      await this.put('units', {
        id: unit.id,
        titleHa: unit.title.ha,
        titleAr: unit.title.ar,
        titleEn: unit.title.en,
        descHa: unit.description.ha,
        descAr: unit.description.ar,
        descEn: unit.description.en,
        orderIndex: unit.orderIndex,
        isFree: unit.isFree,
        xpRequired: unit.xpRequired
      });
    }

    for (const lesson of seedLessons) {
      await this.put('lessons', {
        id: lesson.id,
        unitId: lesson.unitId,
        titleHa: lesson.title.ha,
        titleAr: lesson.title.ar,
        titleEn: lesson.title.en,
        orderIndex: lesson.orderIndex,
        xpReward: lesson.xpReward,
        audioRequired: lesson.audioRequired
      });
    }

    for (const vocab of seedVocabulary) {
      await this.put('vocabulary', {
        id: `${vocab.lessonId}-${vocab.hausa.trim().toLowerCase().replace(/\s+/g, '-')}`,
        lessonId: vocab.lessonId,
        hausa: vocab.hausa.trim(),
        arabic: vocab.arabic,
        english: vocab.english
      });
    }

    let exerciseIndex = 0;
    for (const exercise of seedExercises) {
      await this.put('exercises', {
        id: `${exercise.lessonId}-ex-${exerciseIndex++}`,
        lessonId: exercise.lessonId,
        type: exercise.type,
        questionHa: exercise.question.ha,
        questionAr: exercise.question.ar,
        questionEn: exercise.question.en,
        options: JSON.stringify(exercise.options),
        correctAnswer: exercise.correctAnswer,
        points: exercise.points
      });
    }

    for (const achievement of achievements) {
      await this.put('achievements', achievement);
    }
  }
}

export const db = new Database();

export async function initializeDatabase(): Promise<void> {
  await db.seedData();
}

export async function getUserByEmail(email: string): Promise<DBSchema['users'] | undefined> {
  const users = await db.getAll('users');
  return users.find(u => u.email === email);
}

export async function getUserById(id: string): Promise<DBSchema['users'] | undefined> {
  return db.get('users', id);
}

export async function createUser(user: Omit<DBSchema['users'], 'createdAt' | 'lastLogin'>): Promise<void> {
  const newUser = {
    ...user,
    createdAt: new Date().toISOString()
  };
  await db.put('users', newUser);
}

export async function updateUser(id: string, updates: Partial<DBSchema['users']>): Promise<void> {
  const user = await db.get('users', id);
  if (user) {
    await db.put('users', { ...user, ...updates });
  }
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const session = {
    id: generateToken(),
    userId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  };
  await db.put('sessions', session);
  return token;
}

export async function validateSession(token: string): Promise<DBSchema['sessions'] | undefined> {
  const sessions = await db.getByIndex('sessions', 'token', token);
  const session = sessions[0];
  if (!session) return undefined;
  if (new Date(session.expiresAt) < new Date()) {
    await db.delete('sessions', session.id);
    return undefined;
  }
  return session;
}

export async function deleteSession(token: string): Promise<void> {
  const sessions = await db.getByIndex('sessions', 'token', token);
  if (sessions.length > 0) {
    await db.delete('sessions', sessions[0].id);
  }
}

export async function getUnits(): Promise<DBSchema['units'][]> {
  const units = await db.getAll('units');
  return units.sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getLessonsByUnit(unitId: string): Promise<DBSchema['lessons'][]> {
  const lessons = await db.getByIndex('lessons', 'unitId', unitId);
  return lessons.sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getLessonById(id: string): Promise<DBSchema['lessons'] | undefined> {
  return db.get('lessons', id);
}

export async function getVocabularyByLesson(lessonId: string): Promise<DBSchema['vocabulary'][]> {
  return db.getByIndex('vocabulary', 'lessonId', lessonId);
}

export async function getExercisesByLesson(lessonId: string): Promise<DBSchema['exercises'][]> {
  return db.getByIndex('exercises', 'lessonId', lessonId);
}

export async function getUserProgress(userId: string): Promise<DBSchema['userProgress'][]> {
  return db.getByIndex('userProgress', 'userId', userId);
}

export async function updateLessonProgress(
  userId: string, 
  lessonId: string, 
  score: number, 
  completed: boolean
): Promise<void> {
  const progressId = `${userId}-${lessonId}`;
  const existing = await db.get('userProgress', progressId);
  
  const progress = {
    id: progressId,
    userId,
    lessonId,
    score: existing ? Math.max(existing.score, score) : score,
    attempts: existing ? existing.attempts + 1 : 1,
    completed: existing?.completed || completed,
    completedAt: completed ? new Date().toISOString() : existing?.completedAt
  };

  await db.put('userProgress', progress);
}

export async function getUserAchievements(userId: string): Promise<DBSchema['userAchievements'][]> {
  return db.getByIndex('userAchievements', 'userId', userId);
}

export async function awardAchievement(userId: string, achievementId: string): Promise<void> {
  const existing = await db.getByIndex('userAchievements', 'userId', userId);
  if (existing.some(a => a.achievementId === achievementId)) return;

  await db.put('userAchievements', {
    id: generateToken(),
    userId,
    achievementId,
    earnedAt: new Date().toISOString()
  });
}

export async function createSubscription(subscription: Omit<DBSchema['subscriptions'], 'purchasedAt'>): Promise<void> {
  await db.put('subscriptions', {
    ...subscription,
    purchasedAt: new Date().toISOString()
  });
}

export async function getUserSubscription(userId: string): Promise<DBSchema['subscriptions'] | undefined> {
  const subs = await db.getByIndex('subscriptions', 'userId', userId);
  return subs.find(s => s.status === 'completed');
}

export async function saveTranslation(
  item: Omit<DBSchema['translations'], 'id' | 'createdAt'>
): Promise<DBSchema['translations']> {
  const record: DBSchema['translations'] = {
    ...item,
    id: generateToken(),
    createdAt: new Date().toISOString()
  };
  await db.put('translations', record);
  return record;
}

export async function getTranslationHistory(userId: string): Promise<DBSchema['translations'][]> {
  const items = await db.getByIndex('translations', 'userId', userId);
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function deleteTranslation(id: string): Promise<void> {
  await db.delete('translations', id);
}

export async function clearTranslationHistory(userId: string): Promise<void> {
  const items = await db.getByIndex('translations', 'userId', userId);
  for (const item of items) {
    await db.delete('translations', item.id);
  }
}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}