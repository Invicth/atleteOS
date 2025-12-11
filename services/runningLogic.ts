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

  // --- TUESDAY: QUALITY WORK (INTERVALS) ---
  if (type === 'INTERVALS') {
    const warmupTime = 10;
    const cooldownTime = 10;

    // PHASE 1: SPEED ENDURANCE (Short Intervals)
    // Adjustment V6.2: User can hold 4:40/km but decays after 1km.
    // Strategy: Use 3 min intervals (approx 600m-650m) to leverage speed w/o hitting the wall.
    if (weekNum < 8) {
      const reps = isDeload ? 4 : 5 + Math.floor(weekNum / 2); // 5, 5, 6, 6...
      const runTime = 3; // minutes (Reduced from 4 to prevent decay)
      const restTime = 2; // minutes
      
      const mainSetTime = reps * (runTime + restTime);
      const totalDuration = warmupTime + mainSetTime + cooldownTime;
      
      // Target Pace: 4:45 - 4:55/km (Sub-max of 4:40 capacity)
      const targetPaceMin = 4.83; 
      const estDistancePerRep = (runTime / targetPaceMin) * 1000; // ~620m
      const roundedDist = Math.round(estDistancePerRep / 10) * 10; 

      return {
        title: isDeload ? 'Run: Recovery Jog' : `Run: Speed Endurance W${weekNum + 1}`,
        methodology: 'V02 Max (Short Reps)',
        focusMetric: isDeload ? 'Form Focus' : `Pace: 4:45 - 4:55/km`,
        duration: `${totalDuration} min`,
        details: [
            `Warmup: ${warmupTime} min`, 
            `Main: ${reps} x 3 min (Fast)`, 
            `Rest: 2 min (Walk)`,
            `Cooldown: ${cooldownTime} min`
        ],
        extendedContent: [
          { header: "Warmup", items: [`${warmupTime} min Trote progresivo`, "Movilidad dinámica obligatoria"] },
          { header: "The Workout (Speed Preservation)", items: [
              `Realizar ${reps} repeticiones de 3 minutos.`,
              `RITMO: 4:45 - 4:55/km. (Cerca de tu límite de 4:40, pero controlado).`,
              `DISTANCIA ESTIMADA: ~${roundedDist} metros por serie.`,
              `RECUPERAR: ${restTime} min caminando. Deja que baje el pulso.`,
              "Nota: Cortamos a los 3 min para evitar que tu técnica decaiga."
          ] },
          { header: "Cooldown", items: [`${cooldownTime} min Caminata`] },
          { 
              header: "⌚ Clock Setup (Garmin/Apple)", 
              items: [
                  "Mode: Intervals (Time)",
                  `Work: 3:00`,
                  `Rest: 2:00`,
                  `Repeat: ${reps} times`
              ]
          }
        ]
      };
    } 
    // PHASE 2: LACTATE THRESHOLD (Tempo)
    // Bridge the gap. Use 5:20-5:30/km to build stamina.
    else if (weekNum < 16) {
      const tempoDuration = isDeload ? 15 : 20 + (weekNum - 8) * 3; // 20, 23, 26... up to 40 min
      const totalDuration = warmupTime + tempoDuration + cooldownTime;
      const targetPace = "5:20 - 5:30/km"; // "Comfortably Hard"
      
      const paceDecimal = 5.41; 
      const estTotalDist = (tempoDuration / paceDecimal).toFixed(1); 

      return {
        title: isDeload ? 'Run: Deload' : `Run: Threshold Tempo W${weekNum + 1}`,
        methodology: 'Lactate Clearance',
        focusMetric: `Hold: ${targetPace}`,
        duration: `${totalDuration} min`,
        details: [`Sustain ${tempoDuration} min`, `Approx: ${estTotalDist} km`, 'No stopping'],
        extendedContent: [
           { header: "Warmup", items: [`${warmupTime} min`, "3 x 20s Sprints progresivos"] },
           { header: "Main Set (Threshold)", items: [
               `${tempoDuration} minutos a ritmo sostenido.`, 
               `RITMO: ${targetPace}.`, 
               "Sensación: 'Podría hablar con frases cortas, pero prefiero no hacerlo'.",
               "Este es el entreno que te dará la resistencia que te falta."
           ] },
           { header: "Cooldown", items: [`${cooldownTime} min suave`] },
           { 
              header: "⌚ Clock Setup", 
              items: [
                  "Mode: Run",
                  "Lap button after warmup",
                  `Monitor Avg Pace`
              ]
          }
        ]
      };
    }
    // PHASE 3: RACE SPECIFICITY (1km Repeats)
    // Target: 5:00/km. DO NOT go faster even if you can.
    else {
      const reps = isDeload ? 3 : 5 + Math.floor((weekNum - 16) / 2);
      const cappedReps = Math.min(8, reps); // Max 8x1000
      const mainSetTime = cappedReps * 7; 
      const totalDuration = warmupTime + mainSetTime + cooldownTime;
      const targetPace = "5:00 - 5:10/km"; // Goal Race Pace

      return {
        title: isDeload ? 'Run: Tapering' : 'Run: Goal Pace Intervals',
        methodology: 'Race Specificity',
        focusMetric: `Strict: ${targetPace}`,
        duration: `${totalDuration} min`,
        details: [`${cappedReps} x 1000m`, 'Rest: 90s', 'Lock in Goal Pace'],
        extendedContent: [
           { header: "Warmup", items: [`${warmupTime} min Easy`, "4 x Strides"] },
           { header: "The Exam (1K Reps)", items: [
               `${cappedReps} series de 1000 metros.`,
               `RITMO: ${targetPace}. NO vayas a 4:40.`,
               "Objetivo: Enseñar al cuerpo la eficiencia a ritmo de carrera.",
               "Descanso: 90 segundos (bajamos el descanso respecto a Fase 1)."
           ] },
           { header: "Cooldown", items: [`${cooldownTime} min easy`] },
           { 
              header: "⌚ Clock Setup", 
              items: [
                  "Mode: Intervals (Distance)",
                  `Work: 1.00 km`,
                  `Rest: 1:30 min`,
                  `Repeat: ${cappedReps} times`
              ]
          }
        ]
      };
    }
  }

  // --- SATURDAY: LONG RUN (Distance Based) ---
  if (type === 'LONG_RUN') {
    let baseDistance = 8; // Start slightly higher since intensity is low
    let distance = baseDistance + (weekNum * 0.8);
    if (distance > 20) distance = 20; 
    if (isDeload) distance = distance * 0.7;
    // Tapering last 2 weeks
    if (weekNum >= 24) distance = 10 + (26 - weekNum); // Drops 12, 11...

    const roundedDist = Math.round(distance * 10) / 10;
    const estPace = 7.0; // 7:00/km (Easy)
    const estDuration = Math.round(roundedDist * estPace);

    return {
      title: isDeload ? 'Run: Deload Long Run' : 'Run: Aerobic Base',
      methodology: 'Zone 2 (Endurance)',
      focusMetric: `${roundedDist} KM`,
      duration: `~${estDuration} min`,
      details: [`Total: ${roundedDist} km`, 'Pace: 6:45 - 7:15/km', 'Focus: Volume'],
      extendedContent: [
          { header: "Strategy", items: [
              `OBJETIVO: Completar ${roundedDist} km sin caminar.`, 
              "RITMO: Lento (6:45 - 7:15/km).", 
              "Si te sientes bien, NO aceleres. Guarda esa energía para el Martes."
          ]},
          { header: "Nutrition", items: [
              "Hidratación cada 20 min.",
              "Si pasas de 12km, prueba llevar un gel."
          ] },
          { 
              header: "⌚ Clock Setup", 
              items: [
                  "Mode: Run",
                  "Alert: Distance 1km",
                  "Screen: Total Time / Total Dist"
              ]
          }
      ]
    };
  }

  return {};
};