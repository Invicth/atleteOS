import { LucideIcon } from 'lucide-react';

export enum TaskType {
  CALISTHENICS = 'Calisthenics',
  RUNNING = 'Running',
  GYM = 'Powerlifting',
  ENGLISH = 'TOEFL Prep',
  REST = 'Rest',
  HYBRID = 'Hybrid'
}

export interface DetailedStep {
  header: string;
  items: string[];
  note?: string;
}

export interface DailyTask {
  type: TaskType;
  title: string;
  details: string[]; // Summary for the card
  duration?: string;
  extendedContent?: DetailedStep[]; // Deep details for the modal
}

export interface ScheduleDay {
  physical: DailyTask;
  intellectual: DailyTask;
}

export interface Phase {
  id: number;
  name: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  schedule: ScheduleDay[]; // Index 0 = Sunday, 1 = Monday...
  focus: string;
}

export interface Goal {
  id: string;
  title: string;
  target: string; // Text description (e.g. "150kg")
  deadline: string; // Text description or specific date
  currentStatus: string; // Text description (updated dynamically)
  progress: number; // 0-100 (updated dynamically)
  category: 'Physical' | 'Intellectual';
  iconName: 'Activity' | 'Dumbbell' | 'Wind' | 'BookOpen' | 'Trophy';
  
  // New fields for Math Interpolation
  startValue?: number;
  targetValue?: number;
  startDateStr?: string; // YYYY-MM-DD
  deadlineDateStr?: string; // YYYY-MM-DD
  unit?: string;
}