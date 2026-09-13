-- =====================================================================
-- 0001_extensions_and_enums.sql
-- HausaArabia Backend — Extensions & Enum Types
-- =====================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------

create type preferred_learning_language as enum ('HAUSA', 'ENGLISH');

create type lesson_type as enum (
  'ALPHABET',
  'VOCABULARY',
  'GRAMMAR',
  'CONVERSATION',
  'PRONUNCIATION',
  'LISTENING',
  'READING',
  'CULTURE',
  'ISLAMIC'
);

create type content_block_type as enum (
  'TEXT',
  'AUDIO',
  'VIDEO',
  'IMAGE',
  'EXAMPLE',
  'NOTE',
  'DIALOGUE'
);

create type quiz_question_type as enum (
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'FILL_BLANK',
  'MATCHING',
  'LISTENING'
);

create type progress_status as enum (
  'NOT_STARTED',
  'IN_PROGRESS',
  'COMPLETED'
);

create type xp_source_type as enum (
  'LESSON_COMPLETION',
  'QUIZ_COMPLETION',
  'STREAK_BONUS',
  'DAILY_GOAL',
  'REWARD'
);

create type reward_type as enum (
  'BADGE',
  'TROPHY',
  'STREAK',
  'XP',
  'COMPLETION'
);

create type app_role as enum (
  'STUDENT',
  'CONTENT_ADMIN',
  'SUPER_ADMIN'
);
