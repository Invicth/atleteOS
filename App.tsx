import React, { useState, useEffect } from 'react';
import { DevControls } from './components/DevControls';
import { TaskCard } from './components/TaskCard';
import { Timeline } from './components/Timeline';
import { GoalProgress } from './components/GoalProgress';
import { TaskModal } from './components/TaskModal';
import { YearlyRoadmap } from './components/YearlyRoadmap';
import { SquatPath } from './components/SquatPath'; // V5 Import
import { getPhaseByDate, getDailySchedule, formatDate, getDynamicGoals } from './services/dateService';
import { calculateSquatWOD } from './services/squatLogic'; // V5 Import
import { calculateRunningWOD } from './services/runningLogic'; // V5.2 Import
import { calculateCaliWOD } from './services/calisthenicsLogic'; // V5.2 Import
import { calculateToeflTask } from './services/toeflLogic'; // V5.2 Import
import { AlertTriangle, Zap, CalendarDays, Activity, TrendingUp, Map } from 'lucide-react';
import { DailyTask } from './types';

interface ModalState {
  isOpen: boolean;
  task: DailyTask | null;
  category: 'Physical' | 'Intellectual';
}

function App() {
  // CONFIG:
  // Default State: Live Mode (System Date)
  // Simulation Start: Dec 1, 2025 (If user activates simulation)
  const PROJECT_START = new Date('2025-12-01T09:00:00');
  
  const [isSimMode, setIsSimMode] = useState<boolean>(false);
  
  // FIX: Robust Date Initialization for UTC Environments
  // If the app runs in a Cloud IDE (UTC) but the user is in LatAm (GMT-5),
  // 9PM Local = 2AM Next Day UTC. The app sees "Next Day".
  // HEURISTIC: If offset is 0 (UTC) and hour is < 5 AM, assume it's late night in Americas and shift back.
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const offset = now.getTimezoneOffset(); // 0 for UTC, 300 for GMT-5

    // If we are strictly in UTC (Offset 0) and it's early morning (00:00 - 05:00),
    // it's likely late night in the US/Colombia. Shift back 1 day.
    if (offset === 0 && utcHour < 5) {
        now.setDate(now.getDate() - 1);
    }
    
    // Normalize to Noon to prevent any further rollover
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  });

  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, task: null, category: 'Physical' });
  
  // Force Date to NOW if Simulation Mode is OFF
  useEffect(() => {
    if (!isSimMode) {
        const now = new Date();
        const utcHour = now.getUTCHours();
        const offset = now.getTimezoneOffset();

        // Apply same heuristic for live updates
        if (offset === 0 && utcHour < 5) {
             now.setDate(now.getDate() - 1);
        }

        const safeLiveDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
        setCurrentDate(safeLiveDate);
    }
  }, [isSimMode]);

  const toggleSimMode = () => {
      if (isSimMode) {
          // Turning OFF: Go back to today (with fix)
          setIsSimMode(false);
          // Re-trigger the useEffect logic by setting state implies re-render, 
          // but let's be explicit to avoid flicker
          const now = new Date();
          const utcHour = now.getUTCHours();
          const offset = now.getTimezoneOffset();
          if (offset === 0 && utcHour < 5) now.setDate(now.getDate() - 1);
          
          setCurrentDate(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0));
      } else {
          // Turning ON: Jump to project start
          setIsSimMode(true);
          setCurrentDate(PROJECT_START);
      }
  };

  const phase = getPhaseByDate(currentDate);
  let dailySchedule = getDailySchedule(currentDate, phase);
  
  // --- V5.2 DYNAMIC ENGINE INJECTION (THE BRAIN) ---
  if (dailySchedule) {
      const dayOfWeek = currentDate.getDay();

      // MONDAY (Day 1): Cali Skill + TOEFL Input
      if (dayOfWeek === 1) {
          const toeflDynamic = calculateToeflTask(currentDate, 'INPUT');
          dailySchedule = {
              ...dailySchedule,
              intellectual: { ...dailySchedule.intellectual, ...toeflDynamic }
          };
      }

      // TUESDAY (Day 2): Running Intervals + TOEFL Speaking
      if (dayOfWeek === 2) {
          const runDynamic = calculateRunningWOD(currentDate, 'INTERVALS');
          const toeflDynamic = calculateToeflTask(currentDate, 'SPEAKING');
          dailySchedule = {
              ...dailySchedule,
              physical: { ...dailySchedule.physical, ...runDynamic },
              intellectual: { ...dailySchedule.intellectual, ...toeflDynamic }
          };
      }

      // THURSDAY (Day 4): Cali/Core + TOEFL Writing
      if (dayOfWeek === 4) {
          const toeflDynamic = calculateToeflTask(currentDate, 'WRITING');
          // Optional: Add Cali dynamic logic for Thursday if needed, for now focusing on TOEFL
          dailySchedule = {
              ...dailySchedule,
              intellectual: { ...dailySchedule.intellectual, ...toeflDynamic }
          };
      }

      // FRIDAY (Day 5): Squat Engine
      if (dayOfWeek === 5) {
        const dynamicSquat = calculateSquatWOD(currentDate);
        dailySchedule = {
            ...dailySchedule,
            physical: { ...dailySchedule.physical, ...dynamicSquat }
        };
      }

      // SATURDAY (Day 6): Cali Pull + Running Long + TOEFL Integrated
      if (dayOfWeek === 6) {
          const caliDynamic = calculateCaliWOD(currentDate, 'FRONT_LEVER');
          const runDynamic = calculateRunningWOD(currentDate, 'LONG_RUN');
          const toeflDynamic = calculateToeflTask(currentDate, 'INTEGRATED');
          
          // Merge physical: Cali first, then append Running info
          const mergedPhysical = { 
              ...dailySchedule.physical, 
              ...caliDynamic,
              // We append running info to the title to show it's a double day
              title: `${caliDynamic.title} + ${runDynamic.title?.split(':')[1] || 'Run'}`,
              // We prioritize Cali methodology display but add run details
              extendedContent: [
                  ...(caliDynamic.extendedContent || []),
                  { header: "--- SECOND SESSION: RUNNING ---", items: runDynamic.extendedContent?.[1].items || [] }
              ]
          };

          dailySchedule = {
              ...dailySchedule,
              physical: mergedPhysical,
              intellectual: { ...dailySchedule.intellectual, ...toeflDynamic }
          };
      }
      
      // SUNDAY (Day 0): Cali Push (Planche)
      if (dayOfWeek === 0) {
          const caliDynamic = calculateCaliWOD(currentDate, 'PLANCHE');
          dailySchedule = {
              ...dailySchedule,
              physical: { ...dailySchedule.physical, ...caliDynamic }
          }
      }
  }
  // -----------------------------------

  const dynamicGoals = getDynamicGoals(currentDate);
  const squatGoal = dynamicGoals.find(g => g.id === '3');
  const toeflGoal = dynamicGoals.find(g => g.id === '5');

  const openModal = (task: DailyTask, category: 'Physical' | 'Intellectual') => {
    setModalState({ isOpen: true, task, category });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-20 selection:bg-neon-green/30">
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${isSimMode ? 'bg-amber-950/30 border-amber-900/50' : 'bg-[#09090b]/90 border-zinc-800'}`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-8 rounded-full ${isSimMode ? 'bg-amber-500' : 'bg-neon-green shadow-[0_0_15px_rgba(190,242,100,0.5)]'}`}></div>
              <div>
                <h1 className="font-bold text-xl leading-none tracking-tight">ATHLETE<span className="text-neon-blue">OS</span></h1>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold">v1.0.2</span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimMode ? 'bg-amber-500' : 'bg-neon-green'}`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isSimMode ? 'bg-amber-500' : 'bg-neon-green'}`}></span>
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${isSimMode ? 'text-amber-500' : 'text-neon-green'}`}>
                        {isSimMode ? 'SIMULATION ACTIVE' : 'SYSTEM ONLINE'}
                    </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded text-[10px] font-mono font-bold text-neon-blue">
                    <Zap size={12} />
                    TARGET: TOEFL 2026
                </div>

                <div className="text-right">
                    <p className="text-sm font-bold capitalize text-white">{formatDate(currentDate)}</p>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                        {phase ? phase.name.split(':')[1] : 'OFF SEASON'}
                    </p>
                </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* SECTION 1: TIMELINE */}
        <section className="animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-4 px-2">
            <CalendarDays size={16} className="text-zinc-500" />
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Macrocycle Phase</h2>
          </div>
          <Timeline currentPhase={phase} currentDate={currentDate} />
        </section>

        {/* SECTION 2: MISSION STATUS (TODAY) */}
        <section className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="text-neon-green text-4xl">///</span> 
              <span>MISSION: <span className="text-zinc-500">{formatDate(currentDate).split(',')[0].toUpperCase()}</span></span>
            </h2>
          </div>

          {dailySchedule ? (
            <div className="grid md:grid-cols-2 gap-6">
              <TaskCard 
                task={dailySchedule.physical} 
                category="Physical" 
                onClick={() => openModal(dailySchedule.physical, 'Physical')}
              />
              <TaskCard 
                task={dailySchedule.intellectual} 
                category="Intellectual" 
                onClick={() => openModal(dailySchedule.intellectual, 'Intellectual')}
              />
            </div>
          ) : (
            <div className="p-10 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 flex flex-col items-center justify-center text-center">
              <AlertTriangle className="text-amber-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white">Fuera de Temporada</h3>
              <p className="text-zinc-500 max-w-md mt-2">
                La fecha actual ({formatDate(currentDate)}) está fuera del plan operativo.
                Activa el <strong>SIMULATION MODE</strong> para visualizar entrenamientos futuros.
              </p>
            </div>
          )}
        </section>

        {/* SECTION 3: OBJECTIVES & STATS */}
        <section className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center gap-2 mb-6 px-2">
            <Activity size={16} className="text-zinc-500" />
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Performance Metrics</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Goals List */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-blue rounded-full"></span>
                Active Goals
              </h3>
              <div className="space-y-1">
                {dynamicGoals.map(goal => (
                  <GoalProgress key={goal.id} goal={goal} />
                ))}
              </div>
            </div>

            {/* Big Stat Cards */}
            <div className="flex flex-col gap-4">
              {squatGoal && (
                  <div className="flex-1 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-neon-green/50 transition-colors">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] group-hover:bg-[position:100%_100%,0_0] transition-all duration-700"></div>
                      <h4 className="text-5xl font-black text-white mb-1 italic tracking-tighter">
                          {squatGoal.currentStatus.replace('kg', '')}
                          <span className="text-lg font-normal text-zinc-600 not-italic ml-1">kg</span>
                      </h4>
                      <p className="text-[10px] font-mono text-neon-green uppercase tracking-widest font-bold">Squat Capacity</p>
                  </div>
              )}
              {toeflGoal && (
                  <div className="flex-1 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-neon-blue/50 transition-colors">
                      <h4 className="text-5xl font-black text-white mb-1 tracking-tighter">
                          {toeflGoal.currentStatus.replace('pts', '')}
                          <span className="text-lg font-normal text-zinc-600 ml-1">+</span>
                      </h4>
                      <p className="text-[10px] font-mono text-neon-blue uppercase tracking-widest font-bold">TOEFL Score</p>
                  </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: SQUAT PATH (INTEGRATED) */}
        <section className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
           <div className="flex items-center gap-2 mb-6 px-2">
            <TrendingUp size={16} className="text-zinc-500" />
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Strength Analytics</h2>
          </div>
          <SquatPath />
        </section>

        {/* SECTION 5: ROADMAP (INTEGRATED) */}
        <section className="animate-in slide-in-from-bottom-4 duration-500 delay-400">
           <div className="flex items-center gap-2 mb-6 px-2">
            <Map size={16} className="text-zinc-500" />
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Strategic Roadmap</h2>
          </div>
          <YearlyRoadmap />
        </section>

      </main>

      <DevControls 
        currentDate={currentDate} 
        onDateChange={setCurrentDate}
        onReset={() => setCurrentDate(PROJECT_START)}
        isSimMode={isSimMode}
        onToggleSimMode={toggleSimMode}
      />

      {modalState.isOpen && (
        <TaskModal 
            task={modalState.task} 
            category={modalState.category} 
            onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default App;