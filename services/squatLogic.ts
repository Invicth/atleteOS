import { DailyTask, TaskType } from '../types';

// START: Dec 1, 2025 -> 105kg
// END: Dec 31, 2026 -> 150kg

const START_DATE = new Date('2025-12-01').getTime();
const PHASE_2_START = new Date('2026-04-01').getTime();
const PHASE_3_START = new Date('2026-07-01').getTime();
const END_DATE = new Date('2026-12-31').getTime();

// Helper to get week number relative to project start
const getWeekNumber = (current: Date) => {
  const diff = current.getTime() - START_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
};

export const calculateSquatWOD = (date: Date): Partial<DailyTask> => {
  const time = date.getTime();
  
  // --- PHASE 1: HYPERTROPHY (Linear Progression) ---
  // Dec - Mar (approx 17 weeks). Start 70kg working set -> 90kg
  if (time < PHASE_2_START) {
    const weeksPassed = getWeekNumber(date);
    // Base 70kg, add 1.25kg per week approx
    const weight = 70 + (weeksPassed * 1.25);
    const roundedWeight = Math.round(weight / 2.5) * 2.5; // Round to nearest 2.5kg plate

    return {
      title: 'LEG DAY: Linear Hypertrophy',
      dynamicLoad: `${roundedWeight} KG`,
      dynamicSetInfo: '4 Sets x 8 Reps (RIR 2)',
      details: [`Working Weight: ${roundedWeight}kg`, 'Focus: Bar Speed', 'Accessory: RDL 3x10']
    };
  }

  // --- PHASE 2: STRENGTH BASE (5x5) ---
  // Apr - Jun (approx 13 weeks). Start 95kg -> 115kg
  if (time < PHASE_3_START) {
    const weeksInPhase = Math.floor((time - PHASE_2_START) / (1000 * 60 * 60 * 24 * 7));
    const weight = 95 + (weeksInPhase * 1.5);
    const roundedWeight = Math.round(weight / 2.5) * 2.5;

    return {
      title: 'LEG DAY: 5x5 Strength Base',
      dynamicLoad: `${roundedWeight} KG`,
      dynamicSetInfo: '5 Sets x 5 Reps',
      details: [`Working Weight: ${roundedWeight}kg`, 'Rest: 3-5 mins', 'Accessory: Box Jumps']
    };
  }

  // --- PHASE 3: PEAKING (Wendler 5/3/1 Modified) ---
  // Jul - Dec. Wave loading.
  const weeksInPhase = Math.floor((time - PHASE_3_START) / (1000 * 60 * 60 * 24 * 7));
  const cycle = Math.floor(weeksInPhase / 4); // 4 week cycles
  const weekInCycle = weeksInPhase % 4; // 0, 1, 2, 3

  // Estimated 1RM climbs every cycle
  const base1RM = 125 + (cycle * 5); 
  
  let percentage = 0;
  let reps = '';
  
  switch(weekInCycle) {
    case 0: // Week 1: 5s
      percentage = 0.75;
      reps = '3 Sets x 5 Reps (Last set AMRAP)';
      break;
    case 1: // Week 2: 3s
      percentage = 0.85;
      reps = '3 Sets x 3 Reps (Last set AMRAP)';
      break;
    case 2: // Week 3: 5/3/1
      percentage = 0.95;
      reps = '5/3/1+ (Heavy Single)';
      break;
    case 3: // Deload
      percentage = 0.50;
      reps = '3 Sets x 10 Reps (Speed work)';
      break;
  }

  const dailyWeight = Math.round((base1RM * percentage) / 2.5) * 2.5;

  return {
    title: weekInCycle === 3 ? 'LEG DAY: Deload' : `LEG DAY: Wendler Cycle ${cycle + 1}`,
    dynamicLoad: `${dailyWeight} KG`,
    dynamicSetInfo: reps,
    details: [`Cycle Base 1RM: ${base1RM}kg`, `Intensity: ${Math.round(percentage * 100)}%`, reps]
  };
};

// Generate Data for Chart.js
export const generateSquatChartData = () => {
  const labels = [];
  const capacityLine = []; // Theoretical 1RM
  const workingLine = []; // Actual load on bar

  // 1. Find the FIRST Friday on or after Start Date
  let current = new Date(START_DATE);
  while (current.getDay() !== 5) {
      current.setDate(current.getDate() + 1);
  }

  // 2. Loop week by week from that Friday
  while (current.getTime() <= END_DATE) {
    labels.push(current.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));
    
    // Calculate projected capacity (Linear 105 -> 150)
    const totalTime = END_DATE - START_DATE;
    // Fix: Ensure we don't calculate based on pre-start dates if first friday is slightly later
    const elapsed = Math.max(0, current.getTime() - START_DATE); 
    const progress = elapsed / totalTime;
    capacityLine.push(105 + (45 * progress));

    // Calculate working weight
    const wod = calculateSquatWOD(current);
    // Extract number from string "82.5 KG"
    const weight = parseFloat(wod.dynamicLoad?.split(' ')[0] || '0');
    workingLine.push(weight);
    
    // Add 7 days
    current = new Date(current.getTime() + (7 * 24 * 60 * 60 * 1000));
  }

  return { labels, capacityLine, workingLine };
};
