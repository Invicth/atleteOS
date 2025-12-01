import React, { useState } from 'react';
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
import { AlertTriangle, LayoutDashboard, Map, CalendarDays, Zap, TrendingUp, Radio } from 'lucide-react';
import { DailyTask } from './types';

interface ModalState {
  isOpen: boolean;
  task: DailyTask | null;
  category: 'Physical' | 'Intellectual';
}

type Tab = 'ops' | 'roadmap' | 'squat';

function App() {
  // Start simulation at Dec 1, 2025 for the demo
  const PROJECT_START = new Date('2025-12-01T09:00:00');
  const [currentDate, setCurrentDate] = useState<Date>(PROJECT_START);
  const [activeTab, setActiveTab] = useState<Tab>('ops');
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, task: null, category: 'Physical' });
  
  const phase = getPhaseByDate(currentDate);
  let dailySchedule = getDailySchedule(currentDate, phase);
  
  // --- V5.2 DYNAMIC ENGINE INJECTION ---
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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-neon-green rounded-sm"></div>
              <div>
                <h1 className="font-bold text-lg leading-none tracking-tight">ATHLETE<span className="text-neon-blue">OS</span></h1>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest">v6.0</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                    </span>
                    <span className="text-[10px] text-neon-green font-mono font-bold">LIVE SYSTEM</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded text-[10px] font-mono font-bold text-neon-blue">
                    <Zap size={12} />
                    TARGET: NEW TOEFL FORMAT (2026)
                </div>

                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium capitalize text-white">{formatDate(currentDate)}</p>
                    <p className="text-xs text-zinc-500 font-mono">
                        {phase ? phase.name : 'OFF SEASON'}
                    </p>
                </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 text-sm font-medium overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('ops')}
              className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'ops' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <LayoutDashboard size={16} />
              OPS CENTER
              {activeTab === 'ops' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green shadow-[0_0_10px_#bef264]"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('roadmap')}
              className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'roadmap' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Map size={16} />
              YEARLY ROADMAP
              {activeTab === 'roadmap' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue shadow-[0_0_10px_#22d3ee]"></span>
              )}
            </button>
            {/* NEW V5 TAB */}
            <button 
              onClick={() => setActiveTab('squat')}
              className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'squat' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <TrendingUp size={16} />
              SQUAT PROGRESSION
              {activeTab === 'squat' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green shadow-[0_0_10px_#bef264]"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* TAB 1: OPS CENTER */}
        {activeTab === 'ops' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-300">
            <section>
              <h2 className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <CalendarDays size={14} />
                Macrocycle Phase
              </h2>
              <Timeline currentPhase={phase} currentDate={currentDate} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-neon-green">///</span> 
                  MISSION STATUS: <span className="text-zinc-300">{formatDate(currentDate).split(',')[0].toUpperCase()}</span>
                </h2>
                {phase && (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hidden sm:inline-block">
                        Focus: <span className="text-white">{phase.focus}</span>
                    </span>
                )}
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
                <div className="p-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="text-amber-500 mb-4" size={32} />
                  <h3 className="text-lg font-bold">Fuera de Temporada</h3>
                  <p className="text-zinc-500 max-w-md mt-2">
                    La fecha actual está fuera del plan programado (Dic 2025 - Dic 2026). Usa el control de desarrollador para simular una fecha válida.
                  </p>
                </div>
              )}
            </section>

            <section className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-4 bg-neon-blue rounded-sm"></span>
                  Active Objectives
                </h3>
                <div className="space-y-1">
                  {dynamicGoals.map(goal => (
                    <GoalProgress key={goal.id} goal={goal} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {squatGoal && (
                    <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                       <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-green/10 rounded-full blur-3xl group-hover:bg-neon-green/20 transition-all"></div>
                       
                       <h4 className="text-4xl font-black text-white mb-2 italic">
                           {squatGoal.currentStatus.replace('kg', '')}
                           <span className="text-lg font-normal text-zinc-500">kg</span>
                       </h4>
                       <p className="text-xs font-mono text-neon-green uppercase tracking-widest">Est. Squat RM</p>
                    </div>
                )}
                {toeflGoal && (
                    <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                       <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl group-hover:bg-neon-blue/20 transition-all"></div>

                       <h4 className="text-4xl font-black text-white mb-2">
                           {toeflGoal.currentStatus.replace('pts', '')}
                           <span className="text-lg font-normal text-zinc-500">+</span>
                       </h4>
                       <p className="text-xs font-mono text-neon-blue uppercase tracking-widest">Est. Score</p>
                    </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: YEARLY ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            <YearlyRoadmap />
          </div>
        )}

        {/* TAB 3: SQUAT PATH (V5) */}
        {activeTab === 'squat' && (
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            <SquatPath />
          </div>
        )}

      </main>

      <DevControls 
        currentDate={currentDate} 
        onDateChange={setCurrentDate}
        onReset={() => setCurrentDate(PROJECT_START)}
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