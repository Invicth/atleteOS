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

// Phase 1: Base & Vocabulary (Dec 2025 - Mar 2026) - UPDATED V4.0 DATA (TOEFL 2026)
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
  // 1: Monday (Lunes) - Skill & Spelling (TOEFL 2026)
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
      'Reading 2026 Focus', 
      ['Complete the Words', 'Active Spelling', 'BBC 6 Min'], 
      '45 min',
      [
        { header: "1. 'Complete the Words' Drill (15 min)", items: ["Toma un párrafo académico.", "Borra la mitad de las letras de cada 2da palabra.", "Intenta completarlo sin mirar."], note: "Entrena el cerebro para la nueva tarea de Reading." },
        { header: "2. Vocabulario Activo (15 min)", items: ["Escribe palabras de Anki a mano.", "Verifica ortografía letra por letra."], note: "La ortografía cuenta puntos en el nuevo formato." },
        { header: "3. BBC 6 Min English", items: ["Escuchar el audio.", "Transcribir frases clave."] }
      ]
    )
  },
  // 2: Tuesday (Martes) - Run & Mimicry (TOEFL 2026)
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
      'Speaking: Shadowing', 
      ['Shadowing Drill', 'Interview Sim'], 
      '30 min',
      [
        { header: "1. SHADOWING (20 min)", items: ["Usa un video TED.", "Escucha una frase -> PAUSA -> REPITE.", "Imita exactamente la entonación y velocidad."], note: "Crucial para la tarea 'Listen and Repeat'." },
        { header: "2. Interview Sim (10 min)", items: ["YouTube 'TOEFL Interview questions'.", "Responde en voz alta.", "Grábate y escúchate."] }
      ]
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
  // 4: Thursday (Jueves) - Core & Email Sprints (TOEFL 2026)
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
      'Writing: Email Sprint', 
      ['Sentence Game', '7-Min Email Task'], 
      '30 min',
      [
        { header: "1. 'Build a Sentence' Game (10 min)", items: ["Usa apps para reordenar oraciones.", "Enfoque en sintaxis perfecta."] },
        { header: "2. EMAIL SPRINT (20 min)", items: ["Pon cronómetro: 7 MINUTOS.", "Escribe un email formal (queja o solicitud).", "Estructura: Saludo -> Razón -> Detalles -> Cierre."], note: "Meta: CERO errores ortográficos. Revisa dos veces." }
      ]
    )
  },
  // 5: Friday (Viernes) - LEG DAY (DYNAMIC PLACEHOLDER)
  {
    physical: createPhysical(
      'LEG DAY: Calculated', 
      ['Wait for Dynamic Calculation...'], 
      '75 min', 
      TaskType.GYM,
      [
        { header: "Dynamic Load", items: ["Este entrenamiento se calcula dinámicamente según la fecha."], note: "Revisa la tarjeta principal." }
      ]
    ),
    intellectual: createIntellectual('Repaso Ligero', ['Review weekly vocabulary'], '20 min')
  },
  // 6: Saturday (Sábado) - Pull & Integrated (TOEFL 2026)
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
      'Simulacro Integrated', 
      ['New Format Practice', 'Error Analysis'], 
      '60 min',
      [
        { header: "Simulacro", items: ["Buscar 'New TOEFL 2025 practice tests' online.", "Realizar sección integrada (Reading + Listening + Writing)."] },
        { header: "Analysis", items: ["Revisar errores gramaticales.", "Verificar uso de conectores nuevos."] }
      ]
    )
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
    schedule: PHASE_1_SCHEDULE, // Reusing schedule for demo structure, handled by logic
    focus: 'Intensidad & Speaking'
  },
  {
    id: 3,
    name: 'Fase 3: Max Strength',
    description: 'Fuerza máxima (1RM) y habilidades estáticas avanzadas.',
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    schedule: PHASE_1_SCHEDULE, // Reusing schedule for demo structure, handled by logic
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