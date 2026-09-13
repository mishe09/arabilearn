// =====================================================================
// database.types.ts
// Hand-written types matching the schema as of migration 0017. Once the
// project is linked, regenerate the authoritative version with:
//   supabase gen types typescript --project-id <project-ref> > database.types.ts
//   supabase gen types typescript --local > database.types.ts
// Run this after every migration and commit the result — don't hand-edit
// this file going forward except as a stopgap before the CLI is available.
// =====================================================================

export type PreferredLearningLanguage = 'HAUSA' | 'ENGLISH';

export type LessonType =
  | 'ALPHABET'
  | 'VOCABULARY'
  | 'GRAMMAR'
  | 'CONVERSATION'
  | 'PRONUNCIATION'
  | 'LISTENING'
  | 'READING'
  | 'CULTURE'
  | 'ISLAMIC';

export type ContentBlockType =
  | 'TEXT'
  | 'AUDIO'
  | 'VIDEO'
  | 'IMAGE'
  | 'EXAMPLE'
  | 'NOTE'
  | 'DIALOGUE';

export type QuizQuestionType =
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'MATCHING'
  | 'LISTENING';

export type ProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type XpSourceType =
  | 'LESSON_COMPLETION'
  | 'QUIZ_COMPLETION'
  | 'STREAK_BONUS'
  | 'DAILY_GOAL'
  | 'REWARD';

export type RewardType = 'BADGE' | 'TROPHY' | 'STREAK' | 'XP' | 'COMPLETION';

export type AppRole = 'STUDENT' | 'CONTENT_ADMIN' | 'SUPER_ADMIN';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  preferred_learning_language: PreferredLearningLanguage;
  current_level_id: string | null;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  streak_freezes_available: number;
  last_studied_at: string | null;
  daily_goal_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface Level {
  id: string;
  title: string;
  description: string | null;
  level_order: number;
  required_xp: number;
  is_published: boolean;
  created_at: string;
}

export interface Unit {
  id: string;
  level_id: string;
  title: string;
  description: string | null;
  unit_order: number;
  estimated_minutes: number;
  xp_reward: number;
  is_published: boolean;
  created_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  passing_score: number;
  xp_reward: number;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  description: string | null;
  lesson_order: number;
  lesson_type: LessonType;
  skill_category_id: string | null;
  estimated_minutes: number;
  xp_reward: number;
  is_published: boolean;
  created_at: string;
}

export interface LessonContentBlock {
  id: string;
  lesson_id: string;
  block_order: number;
  block_type: ContentBlockType;
  arabic_text: string | null;
  transliteration: string | null;
  hausa_explanation: string | null;
  english_explanation: string | null;
  audio_url: string | null;
  image_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: ProgressStatus;
  progress_percentage: number;
  started_at: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  xp_earned: number;
}

export interface DashboardPayload {
  full_name: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  streak_freezes_available: number;
  daily_goal_minutes: number;
  time_studied_today_seconds: number;
  today_goal: { goal_minutes: number; minutes_completed: number; goal_met: boolean };
  completed_units_count: number;
  completed_lessons_count: number;
  current_level: { id: string; title: string; level_order: number } | null;
  current_unit: { id: string; title: string; unit_order: number } | null;
  next_recommended_lessons: Array<{
    id: string;
    title: string;
    lesson_type: LessonType;
    xp_reward: number;
    unit_title: string;
  }>;
  rewards: Array<{
    id: string;
    title: string;
    reward_type: RewardType;
    icon_url: string | null;
    earned_at: string;
  }>;
  skills_breakdown: Array<{
    skill: string;
    xp_earned: number;
    completed_lessons: number;
    progress_percentage: number;
  }>;
  recent_activity: Array<{
    source_type: XpSourceType;
    xp_amount: number;
    description: string | null;
    created_at: string;
  }>;
  overall_progress_percentage: number;
}

export interface CompleteLessonResult {
  already_completed: boolean;
  xp_awarded: number;
}

export interface CompleteQuizResult {
  attempt_id: string;
  score: number;
  passed: boolean;
  xp_awarded: number;
}

// -----------------------------------------------------------------------
// Answer-free quiz payload returned by get_quiz_for_lesson(). Never
// contains is_correct or correct_answer — grading happens server-side.
// -----------------------------------------------------------------------
export interface QuizOptionPublic {
  id: string;
  option_text: string;
  option_order: number;
}

export interface QuizQuestionPublic {
  id: string;
  question_text: string;
  question_type: QuizQuestionType;
  arabic_text: string | null;
  hausa_prompt: string | null;
  english_prompt: string | null;
  points: number;
  question_order: number;
  options: QuizOptionPublic[];
}

export interface QuizForLesson {
  quiz_id: string | null;
  title?: string;
  passing_score?: number;
  xp_reward?: number;
  questions: QuizQuestionPublic[];
}

// -----------------------------------------------------------------------
// RPC function signatures (Database['public']['Functions'] shape, as
// `supabase gen types typescript` would emit them). Regenerate with:
//   supabase gen types typescript --project-id <project-ref> > database.types.ts
//   supabase gen types typescript --local > database.types.ts
// -----------------------------------------------------------------------
export interface Database {
  public: {
    Functions: {
      get_user_dashboard: {
        Args: Record<PropertyKey, never>;
        Returns: DashboardPayload;
      };
      complete_lesson: {
        Args: { p_lesson_id: string; p_time_spent_seconds?: number };
        Returns: CompleteLessonResult[];
      };
      complete_quiz: {
        Args: { p_quiz_id: string; p_answers: Array<{ question_id: string; option_id?: string; answer_text?: string }> };
        Returns: CompleteQuizResult[];
      };
      get_quiz_for_lesson: {
        Args: { p_lesson_id: string };
        Returns: QuizForLesson;
      };
      log_study_time: {
        Args: { p_minutes: number; p_study_date?: string };
        Returns: void;
      };
      has_permission: {
        Args: { permission_code: string; uid?: string };
        Returns: boolean;
      };
      has_role: {
        Args: { role_name: AppRole; uid?: string };
        Returns: boolean;
      };
    };
  };
}
