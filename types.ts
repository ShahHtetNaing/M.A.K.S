
export type PathwayType = 'ARABIC' | 'QURAN';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  date: string;
}

export interface Course {
  id: string;
  pathway: PathwayType;
  level: 'Beginner' | 'Intermediate' | 'Professional';
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface LearningStep {
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'video' | 'speaking';
  topics: string;
  learningSteps: LearningStep[];
  exercises: string;
  content: string;
  aiFunction: string;
  mediaUrl?: string;
  quizzes: Quiz[];
  objectives?: string[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Surah {
  id: number;
  name: string;
  englishName: string;
  versesCount: number;
  revelationType?: string;
  verses?: Verse[];
}

export interface Verse {
  number: number;
  text: string;
  transliteration?: string;
  translation: string;
  tafsir: string;
  audioUrl: string;
  tajweedGuide?: string;
  words: LughatWord[];
}

export interface LughatWord {
  word: string;
  meaning: string;
  root: string;
  usage: string;
  globalCount: number;
  synonyms: string[];
  occurrences: string[];
  grammarAnalysis?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: 'text' | 'blog' | 'youtube' | 'image' | 'poll';
  mediaUrl?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  aiSummary?: string;
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
  };
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  mediaUrl?: string;
}
