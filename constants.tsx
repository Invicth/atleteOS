import { Phase, TaskType, ScheduleDay, Goal, DailyTask, DetailedStep } from './types';

// Helper to create standard tasks (Backward compatibility)
const createPhysical = (title: string, details: string[], duration = '60 min', type = TaskType.CALISTHENICS, extendedContent?: DetailedStep[]): DailyTask => ({
  type, title, details, duration, extendedContent
});

const createIntellectual = (title: string, details: string[], duration = '45 min', extendedContent?: DetailedStep[]): DailyTask => ({
  type: TaskType.ENGLISH, title, details, duration, extendedContent
});

const REST_PHYSICAL = createPhysical('Descanso Activo', ['Estiramientos', 'Movilidad'], '30 min', TaskType.REST);
const REST_INTELLECTUAL = createIntellectual('Descanso Mental', ['Consumo pasivo de contenido en Inglés (Netflix/YouTube)'], 'Optional');

// --- SCHEDULE DEFINITIONS ---

// Phase 1: Base & Vocabulary (Dec 2025 - Mar 2026) - UPDATED V2.0 DATA
const PHASE_1_SCHEDULE: ScheduleDay[] = [
  // 0: Sunday (Domingo) - Push & Skill
  {
    physical: createPhysical(
      'PUSH & Skill (Planche)', 
      ['Full Planche Leans', 'Pseudo-Planche Pushups', 'Dips', 'Military Press'], 
      '90 min', 
      TaskType.CALISTHENICS,
      [
        { header: "1. Full Planche Lean", items: ["4 series x 15s", "Protracción máxima escapular", "Inclinación progresiva"], note: "Usa bandas si es necesario para mantener la forma." },
        { header: "2. Flexiones en Pseudo-Planche", items: ["4 series x 8 reps", "Manos a la altura de la cadera", "Bloqueo completo arriba"] },
        { header: "3. Fondos en Paralelas (Profundos)", items: ["4 series x 10 reps", "Bajar hasta romper 90 grados", "Controlar el tempo"] },
        { header: "4. Press Militar (Mancuernas)", items: ["3 series x 10 reps", "Rango completo de movimiento"], note: "Cuidar las muñecas." }
      ]
    ),
    intellectual: createIntellectual(
      'Simulacro Listening/Reading', 
      ['Practice Test Parcial', 'Review Mistakes'], 
      '60 min',
      [
        { header: "Simulacro Parcial", items: ["Realizar 1 sección completa de Reading (36 min)", "Realizar 1 sección completa de Listening"] },
        { header: "Review", items: ["Analizar cada respuesta incorrecta", "Anotar vocabulario desconocido"] }
      ]
    )
  },
  // 1: Monday (Lunes) - Skill & Recovery
  {
    physical: createPhysical(
      'Skill & Recovery', 
      ['Handstand Holds', 'Hollow Body', 'Mobility'], 
      '45 min', 
      TaskType.CALISTHENICS,
      [
        { header: "Movilidad (Warmup)", items: ["10 min: Muñecas y Hombros", "Usa bandas elásticas"] },
        { header: "Handstand Wall Holds", items: ["5 series x 30-60s", "Descanso 2 min entre series"], note: "Enfoque en línea recta, no banana." },
        { header: "Core Stability", items: ["Hollow Body Hold: 4 x 45s", "Superman Hold: 4 x 45s"] },
        { header: "Cooldown", items: ["Estiramientos estáticos suaves"], note: "No llegar al fallo muscular. Prioridad: Salud articular." }
      ]
    ),
    intellectual: createIntellectual(
      'Listening BBC + Vocab', 
      ['6 Minute English BBC', 'Anki Deck'], 
      '45 min',
      [
        { header: "Active Listening", items: ["Escuchar '6 Minute English' sin subtítulos", "Escuchar segunda vez con transcripción"] },
        { header: "Vocabulary Extraction", items: ["Extraer 5 palabras nuevas", "Crear flashcards en Anki con oraciones de ejemplo"] }
      ]
    )
  },
  // 2: Tuesday (Martes) - Running Intervals
  {
    physical: createPhysical(
      'Run: FARTLEK 30', 
      ['Warmup', '15 cycles (1 Fast / 1 Slow)', 'Cooldown'], 
      '50 min', 
      TaskType.RUNNING,
      [
        { header: "Warmup", items: ["10 min trote suave", "Movilidad dinámica de cadera y tobillos"] },
        { header: "Main Set: FARTLEK", items: ["30 MIN TOTAL", "15 ciclos de:", "-> 1 min Rápido @4:30/km (Zona 4)", "-> 1 min Suave (Recuperación)"] },
        { header: "Cooldown", items: ["10 min caminata para bajar pulsaciones"], note: "El minuto rápido debe ser incómodo. No pares, trota suave en el descanso." }
      ]
    ),
    intellectual: createIntellectual(
      'Active Listening', 
      ['Podcast transcription exercise'], 
      '30 min'
    )
  },
  // 3: Wednesday (Miércoles) - Active Recovery
  {
    physical: createPhysical('Active Recovery', ['Foam Rolling', 'Yoga for Runners'], '30 min', TaskType.REST),
    intellectual: createIntellectual(
        'Reading: Artículos', 
        ['Leer 2 artículos de The Guardian/NYT', 'Resumen escrito'], 
        '45 min',
        [
            { header: "Reading Practice", items: ["Leer 1 artículo de Opinión (The Guardian)", "Leer 1 artículo de Ciencia (NYT/NatGeo)"]},
            { header: "Synthesis", items: ["Escribir un resumen de 5 líneas para cada uno", "Identificar la tesis del autor"]}
        ]
    )
  },
  // 4: Thursday (Jueves) - Core & Grip
  {
    physical: createPhysical(
      'Core & Grip (Cali)', 
      ['Toes-to-bar', 'Farmer Walks', 'L-Sit', 'Forearms'], 
      '40 min', 
      TaskType.GYM,
      [
        { header: "1. Hanging Leg Raises", items: ["4 series x 8-12 reps", "Pies tocan la barra", "Controlando la bajada (negativa)"] },
        { header: "2. Farmer Walks", items: ["4 series x 40 metros", "Usa las mancuernas más pesadas posibles"], note: "Mantener postura erguida." },
        { header: "3. L-Sit Progression", items: ["4 series x Fallo técnico (aprox 10-20s)", "En suelo o paralelas"] },
        { header: "4. Antebrazos", items: ["Wrist Rollers o Cubo de Arroz", "3 series x 1 min"], note: "El agarre es fundamental para el Front Lever." }
      ]
    ),
    intellectual: createIntellectual(
      'Grammar: Conjunctions', 
      ['Coordinating Conjunctions Video', 'Sentence Building'], 
      '45 min',
      [
        { header: "Concept Study", items: ["Ver video sobre 'Coordinating Conjunctions' (FANBOYS)", "Tomar notas sobre puntuación"] },
        { header: "Application", items: ["Escribir 5 oraciones complejas usando 'However'", "Escribir 5 oraciones usando 'Therefore'", "Escribir 5 oraciones usando 'Furthermore'"] }
      ]
    )
  },
  // 5: Friday (Viernes) - LEG DAY
  {
    physical: createPhysical(
      'LEG DAY: Fuerza/Hipertrofia', 
      ['Back Squat', 'RDL', 'Leg Press', 'Calves'], 
      '75 min', 
      TaskType.GYM,
      [
        { header: "1. Back Squat", items: ["4 series x 6-8 reps (RIR 2)", "Meta: Subir cargas progresivas cada semana"], note: "Descansos largos (3-4 min)." },
        { header: "2. Peso Muerto Rumano", items: ["3 series x 8-10 reps", "Controlar 3 segundos la bajada"] },
        { header: "3. Prensa de Piernas", items: ["3 series x 12 reps", "Enfoque en cuádriceps"] },
        { header: "4. Elevación Talones", items: ["4 series x 15 reps", "Pausa en la contracción máxima"] }
      ]
    ),
    intellectual: createIntellectual('Repaso Ligero', ['Review weekly vocabulary'], '20 min')
  },
  // 6: Saturday (Sábado) - Pull & Run
  {
    physical: createPhysical(
      'PULL + RUN', 
      ['Front Lever', 'Weighted Pullups', 'Rows', 'Run Zone 2'], 
      '120 min', 
      TaskType.HYBRID,
      [
        { header: "1. Front Lever Holds", items: ["5 series x 5-10s", "Usa tu progresión actual (Adv Tuck/Straddle)"] },
        { header: "2. Dominadas Lastradas", items: ["4 series x 5 reps", "Explosivas al subir"] },
        { header: "3. Remos en Anillas", items: ["3 series x 10 reps", "Cuerpo horizontal (Front Lever Rows)"] },
        { header: "4. Curl Martillo", items: ["3 series x 12 reps"] },
        { header: "--- RUNNING (Post-Weights) ---", items: ["45-60 min Trote Suave", "Zona 2 (Ritmo Conversacional)"], note: "Entrenamiento de resistencia a la fatiga." }
      ]
    ),
    intellectual: createIntellectual(
      'Writing: Copy', 
      ['Copywork de ensayos modelo', 'Analizar estructura'], 
      '40 min',
      [
        { header: "Copywork", items: ["Copiar a mano un ensayo TOEFL de puntaje perfecto (30/30)"] },
        { header: "Analysis", items: ["Subrayar las oraciones temáticas (Topic Sentences)", "Circular los conectores usados"] }
      ]
    )
  }
];

// Phase 2 and 3 remain simplified for this version update, 
// assuming user is focused on Phase 1 logic for the update request.
const PHASE_2_SCHEDULE: ScheduleDay[] = [
  // 0: Sunday
  {
    physical: createPhysical('PUSH Power', ['Straddle Negatives', 'Planche Leans Max Effort'], '75 min', TaskType.CALISTHENICS),
    intellectual: createIntellectual('Simulacro EXAMEN COMPLETO', ['Full TOEFL Test Simulation'], '3 Hours')
  },
  // 1: Monday
  {
    physical: REST_PHYSICAL,
    intellectual: createIntellectual('Listening: TED Talks', ['Note taking practice', 'Summary speaking'], '45 min')
  },
  // 2: Tuesday
  {
    physical: createPhysical('Run: Series Velocidad', ['Warmup', '6x1km @ 5:00/km pace', 'Cool down'], '60 min', TaskType.RUNNING),
    intellectual: createIntellectual('Speaking Q1 & Q2', ['Record responses', 'Self-correction'], '40 min')
  },
  // 3: Wednesday
  {
    physical: createPhysical('Mobility Flow', ['Hip openers for Squat', 'Shoulder mobility'], '30 min', TaskType.REST),
    intellectual: createIntellectual('Reading Académico', ['TOEFL Reading Section Practice', 'Time management drills'], '50 min')
  },
  // 4: Thursday
  {
    physical: REST_PHYSICAL,
    intellectual: createIntellectual('Writing Templates', ['Independent Task Templates', 'Integrated Task Practice'], '45 min')
  },
  // 5: Friday
  {
    physical: createPhysical('LEG DAY: Strength', ['Squat 5x5 (80-85%)', 'Hip Thrust 3x8'], '70 min', TaskType.GYM),
    intellectual: REST_INTELLECTUAL
  },
  // 6: Saturday
  {
    physical: createPhysical('PULL + Long Run', ['Straddle Attempts', 'Run: 14-18km Endurance'], '150 min', TaskType.HYBRID),
    intellectual: createIntellectual('Speaking Integrado', ['Listen/Read/Speak drills'], '45 min')
  }
];

const PHASE_3_SCHEDULE: ScheduleDay[] = [
  // 0: Sunday
  {
    physical: createPhysical('PUSH: Planche Quest', ['Full Planche Attempts', 'Zanetti Press', 'Handstand Pushups'], '90 min', TaskType.CALISTHENICS),
    intellectual: REST_INTELLECTUAL
  },
  // 1: Monday
  {
    physical: REST_PHYSICAL,
    intellectual: REST_INTELLECTUAL
  },
  // 2: Tuesday
  {
    physical: createPhysical('Run: Maintenance', ['5km Easy Pace', 'Strides'], '30 min', TaskType.RUNNING),
    intellectual: createIntellectual('English Maint.', ['Consume English Media'], '20 min')
  },
  // 3: Wednesday
  {
    physical: REST_PHYSICAL,
    intellectual: REST_INTELLECTUAL
  },
  // 4: Thursday
  {
    physical: createPhysical('Accessory Work', ['Rotator Cuff', 'Core', 'Calves'], '45 min', TaskType.GYM),
    intellectual: REST_INTELLECTUAL
  },
  // 5: Friday
  {
    physical: createPhysical('LEG DAY: 5/3/1 Wendler', ['Main Lift: Squat (Cycle)', 'Accessories: Leg Press, Extension'], '60 min', TaskType.GYM),
    intellectual: REST_INTELLECTUAL
  },
  // 6: Saturday
  {
    physical: createPhysical('PULL: Front Lever', ['Full Front Lever Holds', 'One Arm Pullup progressions'], '90 min', TaskType.CALISTHENICS),
    intellectual: REST_INTELLECTUAL
  }
];

export const PHASES: Phase[] = [
  {
    id: 1,
    name: 'Fase 1: Base Building',
    description: 'Construcción de base aeróbica, hipertrofia y vocabulario.',
    startDate: '2025-12-01',
    endDate: '2026-03-31',
    schedule: PHASE_1_SCHEDULE,
    focus: 'Volumen & Vocabulario'
  },
  {
    id: 2,
    name: 'Fase 2: Peak Performance',
    description: 'Velocidad específica, fuerza y preparación intensiva TOEFL.',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    schedule: PHASE_2_SCHEDULE,
    focus: 'Intensidad & Speaking'
  },
  {
    id: 3,
    name: 'Fase 3: Max Strength',
    description: 'Fuerza máxima (1RM) y habilidades estáticas avanzadas.',
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    schedule: PHASE_3_SCHEDULE,
    focus: 'Fuerza Bruta & Skill'
  }
];

export const GOALS: Goal[] = [
  {
    id: '1',
    title: 'Front Lever',
    target: 'Maintain Perfect Form',
    deadline: 'Continuous',
    currentStatus: 'Logrado',
    progress: 100,
    category: 'Physical',
    iconName: 'Activity',
    // Logic: Constant maintenance
    startDateStr: '2025-12-01',
    deadlineDateStr: '2026-12-31',
  },
  {
    id: '2',
    title: 'Full Planche',
    target: '10 Seconds Hold',
    deadline: 'Dec 2026',
    currentStatus: 'Straddle progress',
    progress: 20, // Initial estimate
    category: 'Physical',
    iconName: 'Dumbbell',
    // Logic: Time based progress
    startDateStr: '2025-12-01',
    deadlineDateStr: '2026-12-31',
  },
  {
    id: '3',
    title: 'Back Squat',
    target: '150kg 1RM',
    deadline: 'Dec 2026',
    currentStatus: '105kg',
    progress: 0,
    category: 'Physical',
    iconName: 'Dumbbell',
    // Logic: 105 -> 150 kg
    startValue: 105,
    targetValue: 150,
    unit: 'kg',
    startDateStr: '2025-12-01',
    deadlineDateStr: '2026-12-31',
  },
  {
    id: '4',
    title: 'Media Maratón',
    target: 'Ritmo 5:00/km',
    deadline: 'Jun 2026',
    currentStatus: 'Base building',
    progress: 10,
    category: 'Physical',
    iconName: 'Wind',
    // Logic: Time based
    startDateStr: '2025-12-01',
    deadlineDateStr: '2026-06-30',
  },
  {
    id: '5',
    title: 'TOEFL iBT',
    target: 'Score 90/120',
    deadline: 'Jun 2026',
    currentStatus: 'Studying',
    progress: 20,
    category: 'Intellectual',
    iconName: 'BookOpen',
    // Logic: 60 -> 90 score
    startValue: 60,
    targetValue: 90,
    unit: 'pts',
    startDateStr: '2025-12-01',
    deadlineDateStr: '2026-06-30',
  }
];