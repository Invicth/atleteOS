import { DailyTask, DetailedStep } from '../types';

const START_DATE = new Date('2025-12-01').getTime();

const getWeeksPassed = (date: Date) => {
  const diff = date.getTime() - START_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
};

// Check if it's a deload week (every 4th week)
const isDeloadWeek = (weekNum: number) => (weekNum + 1) % 4 === 0;

export const calculateRunningWOD = (date: Date, type: 'INTERVALS' | 'LONG_RUN'): Partial<DailyTask> => {
  const weekNum = getWeeksPassed(date);
  const isDeload = isDeloadWeek(weekNum);

  // --- COACH'S ADJUSTMENT: REALITY CHECK ---
  // User struggles at 10k @ 6:00/km.
  // Goal: 21k @ 5:00/km.
  // Strategy: 
  // Phase 1 (Weeks 0-8): Structural Integrity. Pace target: 5:40-6:00 (Tempo). Long runs: Slow (6:45+).
  // Phase 2 (Weeks 9-16): Lactate Threshold. Pace target: 5:15-5:30. Long runs: Moderate.
  // Phase 3 (Weeks 17+): Race Specificity. Pace target: 4:55-5:05.

  // --- TUESDAY: QUALITY WORK ---
  if (type === 'INTERVALS') {
    const warmupTime = 10;
    const cooldownTime = 10;

    // PHASE 1: AEROBIC POWER (Building the engine without burning it)
    if (weekNum < 8) {
      // Workout: Long Intervals at "Comfortably Hard" pace (not sprint)
      // Goal: Get comfortable running slightly faster than 6:00 without dying.
      const reps = isDeload ? 3 : 4 + Math.floor(weekNum / 2); // 4, 4, 5, 5...
      const intervalTime = 4; // 4 mins running
      const restTime = 2; // 2 mins walking/jogging
      
      const mainSetTime = reps * (intervalTime + restTime);
      const totalDuration = warmupTime + mainSetTime + cooldownTime;
      
      // Target pace is slower than before to match reality
      const targetPace = "5:40 - 5:50/km"; 

      return {
        title: isDeload ? 'Run: Recovery Jog' : `Run: Aerobic Intervals W${weekNum + 1}`,
        methodology: 'Aerobic Power',
        focusMetric: isDeload ? 'Form Focus' : `Pace: ${targetPace}`,
        duration: `${totalDuration} min`,
        details: [`Total: ${totalDuration} min`, 'Intensity: 7/10 RPE', 'Build confidence at speed'],
        extendedContent: [
          { header: "Warmup", items: [`${warmupTime} min Very Easy`, "Leg Swings & Drills"] },
          { header: "Main Set", items: isDeload 
              ? [`30 min Continuous Easy Run (Zone 2)`, "Focus on cadence (170+ spm)"] 
              : [`${reps} x 4 min @ ${targetPace}`, `2 min Recovery Jog between reps`, "Don't sprint. Stay controlled."] 
          },
          { header: "Cooldown", items: [`${cooldownTime} min Walk`] }
        ]
      };
    } 
    // PHASE 2: THRESHOLD (Getting used to discomfort)
    else if (weekNum < 16) {
      // Workout: Tempo Runs (Sustained effort)
      const tempoDuration = isDeload ? 15 : 20 + (weekNum - 8) * 2; // 20, 22, 24... up to 30-35 mins
      const totalDuration = warmupTime + tempoDuration + cooldownTime;
      const targetPace = "5:15 - 5:25/km";

      return {
        title: isDeload ? 'Run: Deload' : `Run: Tempo Run W${weekNum + 1}`,
        methodology: 'Lactate Threshold',
        focusMetric: `Sustain: ${targetPace}`,
        duration: `${totalDuration} min`,
        details: [`Continuous Effort`, 'Hard but sustainable'],
        extendedContent: [
           { header: "Warmup", items: [`${warmupTime} min Progressive`, "2 x 20s Strides"] },
           { header: "Main Set", items: [`${tempoDuration} min Continuous Run`, `Target Pace: ${targetPace}`, "Mental Focus: Don't quit when it burns."] },
           { header: "Cooldown", items: [`${cooldownTime} min easy`] }
        ]
      };
    }
    // PHASE 3: RACE SPECIFICITY (The Goal Pace)
    else {
      // Workout: 1km Repeats at Goal Pace (Yasso 800s style but 1k)
      const reps = isDeload ? 3 : 5 + Math.floor((weekNum - 16) / 2); // 5, 5, 6, 6... max 8
      const cappedReps = Math.min(8, reps);
      
      const mainSetTime = cappedReps * 7; // ~5 min run + 2 min rest
      const totalDuration = warmupTime + mainSetTime + cooldownTime;
      const targetPace = "4:55 - 5:05/km";

      return {
        title: isDeload ? 'Run: Tapering Speed' : 'Run: Race Pace Intervals',
        methodology: 'Race Specificity',
        focusMetric: `Goal Pace: ${targetPace}`,
        duration: `${totalDuration} min`,
        details: [`${cappedReps} x 1km Repeats`, 'Simulating Race Day'],
        extendedContent: [
           { header: "Warmup", items: [`${warmupTime} min Easy`, "4 x Strides (Race pace)"] },
           { header: "The Exam", items: [`${cappedReps} x 1000m Intervals`, `MUST HIT: ${targetPace}`, "Rest: 2 min standing/walking"] },
           { header: "Cooldown", items: [`${cooldownTime} min easy`] }
        ]
      };
    }
  }

  // --- SATURDAY: LONG RUN (Regression to Progression) ---
  if (type === 'LONG_RUN') {
    // Coach Logic: If 10k @ 6:00 was hard, we start lower to build confidence.
    // Start at 7km. Add 1km every 2 weeks or so.
    
    let baseDistance = 7;
    let distance = baseDistance + (weekNum * 0.6); // Slower progression curve
    
    // Cap at 19km (No need to run 21k in training for a first half if struggling)
    if (distance > 19) distance = 19; 
    
    if (isDeload) {
        distance = distance * 0.7; // Significant drop to recover legs
    }

    // Tapering for June (Weeks 24-26)
    if (weekNum >= 24) {
        distance = distance * 0.5; // Sharp taper
    }

    const roundedDist = Math.round(distance * 10) / 10;
    
    // Estimate Duration based on "Easy" pace.
    // Current Easy Pace for user is likely 6:45 - 7:00/km if 6:00 was hard.
    const estPace = 7.0; // minutes per km
    const estDuration = Math.round(roundedDist * estPace);

    return {
      title: isDeload ? 'Run: Deload Long Run' : 'Run: Time on Feet',
      methodology: 'Aerobic Base (Zone 2)',
      focusMetric: `${roundedDist} KM`,
      duration: `~${estDuration} min`,
      details: [`Distance: ${roundedDist} km`, 'Pace: IGNORE SPEED.', isDeload ? 'Active Recovery' : 'Just finish it.'],
      extendedContent: [
          { header: "Strategy", items: [
              `Objetivo: Completar ${roundedDist} km.`, 
              "RITMO: Muy suave (6:45 - 7:00/km).", 
              "Si te falta el aire, CAMINA. No es vergüenza, es estrategia."
          ]},
          { header: "Checklist", items: ["Zapatillas cómodas", "Podcast largo", "Hidratación obligatoria"] }
      ]
    };
  }

  return {};
};