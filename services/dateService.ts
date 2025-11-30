import { PHASES, GOALS } from '../constants';
import { Phase, ScheduleDay, Goal } from '../types';

export const getPhaseByDate = (date: Date): Phase | null => {
  const dateStr = date.toISOString().split('T')[0];
  
  return PHASES.find(phase => 
    dateStr >= phase.startDate && dateStr <= phase.endDate
  ) || null;
};

export const getDailySchedule = (date: Date, phase: Phase | null): ScheduleDay | null => {
  if (!phase) return null;
  
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday...
  
  // In our constants, array index matches getDay() return value exactly
  return phase.schedule[dayOfWeek] || null;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const getRelativeTime = (deadline: string): string => {
    // Simple implementation for demo
    return deadline; 
};

// --- SIMULATION LOGIC ---

export const getDynamicGoals = (currentDate: Date): Goal[] => {
  const currentTimestamp = currentDate.getTime();

  return GOALS.map(goal => {
    // If no calculation data, return static goal
    if (!goal.startDateStr || !goal.deadlineDateStr) return goal;

    const start = new Date(goal.startDateStr).getTime();
    const end = new Date(goal.deadlineDateStr).getTime();

    // 1. Calculate Time Percentage (0 to 1)
    let percentage = (currentTimestamp - start) / (end - start);
    percentage = Math.max(0, Math.min(1, percentage)); // Clamp between 0 and 1

    // 2. Interpolate Values if applicable
    let dynamicStatus = goal.currentStatus;
    let dynamicProgress = goal.progress;

    if (goal.startValue !== undefined && goal.targetValue !== undefined) {
      // Linear Interpolation: Current = Start + (TotalDiff * %)
      const valDiff = goal.targetValue - goal.startValue;
      const currentVal = Math.round(goal.startValue + (valDiff * percentage));
      
      dynamicStatus = `${currentVal}${goal.unit || ''}`;
      
      // Visual progress bar (also 0-100)
      dynamicProgress = Math.round(percentage * 100);
    } else {
      // For Time-based goals (like Planche or Running), just show time passed %
      dynamicProgress = Math.round(percentage * 100);
      // Status remains text, or we could say "X months left"
    }
    
    // Override status for goals that are "Continuous" or already done
    if (goal.id === '1') { // Front Lever
        dynamicProgress = 100;
        dynamicStatus = "Logrado";
    }

    return {
      ...goal,
      currentStatus: dynamicStatus,
      progress: dynamicProgress
    };
  });
};