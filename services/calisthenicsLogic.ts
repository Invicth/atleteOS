import { DailyTask, DetailedStep } from '../types';

const START_DATE = new Date('2025-12-01').getTime();

const getWeeksPassed = (date: Date) => {
  const diff = date.getTime() - START_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
};

export const calculateCaliWOD = (date: Date, skill: 'FRONT_LEVER' | 'PLANCHE'): Partial<DailyTask> => {
  const weekNum = getWeeksPassed(date);
  
  // Cycle structure: 8 weeks per progression level
  // Within 8 weeks: Increase TUT (Time Under Tension)
  
  const progressionLevel = Math.floor(weekNum / 8); 
  const weekInCycle = weekNum % 8;
  const isDeload = weekInCycle === 7; // Last week of cycle is deload

  // Logic: Base Hold Time + (Week * 1s or 2s)
  let holdTime = 6 + (weekInCycle * 2); // 6s, 8s, 10s... up to 20s
  let sets = 4;

  if (isDeload) {
      holdTime = Math.floor(holdTime / 2);
      sets = 3;
  }

  if (skill === 'FRONT_LEVER') {
    const progressions = ['Tuck Lever', 'Advanced Tuck', 'Single Leg', 'Straddle Halves', 'Full Lever'];
    const currentProg = progressions[Math.min(progressionLevel, progressions.length - 1)];

    return {
      title: isDeload ? 'Cali: Deload / Mobility' : `Pull: ${currentProg} Cycle`,
      methodology: 'Connective Tissue',
      focusMetric: `TUT: ${sets}x${holdTime}s`,
      details: [`Progression: ${currentProg}`, `Volume: ${sets} Sets`, isDeload ? 'Focus: Recovery' : 'Focus: Scapular Retraction'],
      extendedContent: [
          { header: "Main Static", items: [`${currentProg} Hold`, `${sets} series de ${holdTime} segundos`, "Descanso: 3 min completos"] },
          { header: "Dynamic Accessory", items: ["Dominadas Lastradas 3x5", "Front Lever Raises 3x8"] },
          { header: "Connective Health", items: ["3x1min Dead Hangs (Active Shoulders)"] }
      ]
    };
  }

  if (skill === 'PLANCHE') {
    const progressions = ['Planche Lean', 'Pseudo Pushup Hold', 'Tuck Planche', 'Adv Tuck Planche'];
    const currentProg = progressions[Math.min(progressionLevel, progressions.length - 1)];

    return {
      title: isDeload ? 'Cali: Joint Prep' : `Push: ${currentProg} Focus`,
      methodology: 'Straight Arm Strength',
      focusMetric: `Hold: ${holdTime}s`,
      details: [`Move: ${currentProg}`, 'Protract Hard', isDeload ? 'Light Load' : 'High Intensity'],
      extendedContent: [
          { header: "Warmup Specific", items: ["Wrist Routine (GMB)", "Scapular Pushups x 15"] },
          { header: "Main Static", items: [`${currentProg}`, `${sets} series de ${holdTime} segundos`, "Bloqueo de codos 100%"] },
          { header: "Dynamic", items: ["HSPU Progression 3x8", "Dips 3x12"] }
      ]
    };
  }

  return {};
};