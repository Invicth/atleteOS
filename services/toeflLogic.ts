import { DailyTask, DetailedStep } from '../types';

const START_DATE = new Date('2025-12-01').getTime();

const getWeeksPassed = (date: Date) => {
  const diff = date.getTime() - START_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
};

export const calculateToeflTask = (date: Date, dayType: 'INPUT' | 'SPEAKING' | 'WRITING' | 'INTEGRATED'): Partial<DailyTask> => {
  const weekNum = getWeeksPassed(date);
  
  // Lampariello Cycle: 
  // Weeks 1-4: Input & Translation (Bidirectional)
  // Weeks 5-8: Output focus (Shadowing & Journaling)
  // ... alternating or progressive.
  
  // Let's implement specific progressive logic per Day Type

  // --- MONDAY: INPUT & VOCAB (Bidirectional Translation) ---
  if (dayType === 'INPUT') {
    const isL2toL1 = weekNum % 2 === 0; // Even weeks: English to Native. Odd weeks: Native back to English.
    
    return {
      title: 'Polyglot: Bidirectional Translation',
      methodology: 'Luca Lampariello Method',
      focusMetric: isL2toL1 ? 'Decoding (L2->L1)' : 'Encoding (L1->L2)',
      details: ['Deep Analysis', isL2toL1 ? 'Understanding Nuance' : 'Reconstructing Memory'],
      extendedContent: [
        { 
            header: isL2toL1 ? "Phase 1: Decoding" : "Phase 2: Reconstruction", 
            items: isL2toL1 
                ? ["1. Selecciona un texto corto (100 palabras) en Inglés.", "2. Tradúcelo a tu idioma nativo mentalmente.", "3. Escríbelo. Asegúrate de entender el 100%."]
                : ["1. Toma la traducción que hiciste la semana pasada.", "2. SIN mirar el original, tradúcelo de vuelta al Inglés.", "3. Compara con el original y marca errores."]
        },
        { header: "Micro-Habit", items: ["Review Anki Deck (10 min)"] }
      ]
    };
  }

  // --- TUESDAY: SPEAKING (Shadowing) ---
  if (dayType === 'SPEAKING') {
    // Progression: Listening -> Paused Repetition -> Simultaneous Shadowing
    const stage = weekNum % 3; // 0, 1, 2
    const methods = ['Active Listening', 'Paused Repetition', 'Simultaneous Shadowing'];
    const method = methods[stage];

    return {
      title: `Speaking: ${method}`,
      methodology: 'Shadowing Technique',
      focusMetric: 'Prosody & Flow',
      details: ['Mimicry', 'Intonation Focus', 'Recorded Feedback'],
      extendedContent: [
        { header: "Material", items: ["TED Talk (Julian Treasure)", "Transcript abierto"] },
        { header: "Execution", items: [
            stage === 0 ? "Escucha activa. Lee mientras escuchas. Subraya énfasis." :
            stage === 1 ? "Escucha una frase. PAUSA. Repite imitando la música." :
            "Habla AL MISMO TIEMPO que el orador. No te detengas."
        ]},
        { header: "Feedback", items: ["Grábate 1 minuto. Compárate con el original."] }
      ]
    };
  }

  // --- THURSDAY: WRITING (Journaling) ---
  if (dayType === 'WRITING') {
    // Time constraint increases pressure over time
    // Start 30 min -> down to 15 min
    const timeLimit = Math.max(15, 30 - weekNum);
    
    return {
      title: 'Writing: Metacognitive Journal',
      methodology: 'Output Hypothesis',
      focusMetric: `${timeLimit} MIN SPRINT`,
      details: ['No Dictionary', 'Flow State', 'Self-Correction'],
      extendedContent: [
        { header: "Task 1: The Journal", items: [`Escribe sobre tu día o un tema abstracto.`, `Tiempo límite: ${timeLimit} minutos.`, "NO pares de escribir."] },
        { header: "Task 2: The Audit", items: ["Lee lo que escribiste.", "Identifica 3 errores gramaticales tú mismo.", "Busca sinónimos para palabras repetidas."] }
      ]
    };
  }

  // --- SATURDAY: INTEGRATED (Simulacrum) ---
  if (dayType === 'INTEGRATED') {
    return {
      title: 'TOEFL: Integrated Simulacrum',
      methodology: 'Test Specificity',
      focusMetric: 'New Format 2026',
      details: ['Full Section Test', 'No Breaks', 'Score Tracking'],
      extendedContent: [
        { header: "Setup", items: ["Entorno silencioso.", "Solo hojas en blanco y lápiz."] },
        { header: "Execution", items: ["Realizar 1 Speaking Integrado", "Realizar 1 Writing Integrado (Academic Discussion)"] },
        { header: "Review", items: ["¿Usaste las plantillas?", "¿Te trabaste más de 5 segundos?"] }
      ]
    };
  }

  return {};
};