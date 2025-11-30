import React, { useState } from 'react';
import { DevControls } from './components/DevControls';
import { TaskCard } from './components/TaskCard';
import { Timeline } from './components/Timeline';
import { GoalProgress } from './components/GoalProgress';
import { TaskModal } from './components/TaskModal';
import { YearlyRoadmap } from './components/YearlyRoadmap';
import { getPhaseByDate, getDailySchedule, formatDate, getDynamicGoals } from './services/dateService';
import { AlertTriangle, LayoutDashboard, Map, CalendarDays } from 'lucide-react';
import { DailyTask } from './types';

interface ModalState {
  isOpen: boolean;
  task: DailyTask | null;
  category: 'Physical' | 'Intellectual';
}

type Tab = 'ops' | 'roadmap';

function App() {
  // Start simulation at Dec 1, 2025 for the demo
  const PROJECT_START = new Date('2025-12-01T09:00:00');
  const [currentDate, setCurrentDate] = useState<Date>(PROJECT_START);
  const [activeTab, setActiveTab] = useState<Tab>('ops');
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, task: null, category: 'Physical' });
  
  const phase = getPhaseByDate(currentDate);
  const dailySchedule = getDailySchedule(currentDate, phase);
  
  // Calculate dynamic goals based on simulated date
  const dynamicGoals = getDynamicGoals(currentDate);

  // Extract specific goals for the big cards
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-neon-green rounded-sm"></div>
              <div>
                <h1 className="font-bold text-lg leading-none tracking-tight">ATHLETE<span className="text-neon-blue">OS</span></h1>
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest">HYBRID PROTOCOL v3.0</span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium capitalize text-white">{formatDate(currentDate)}</p>
              <p className="text-xs text-zinc-500 font-mono">
                {phase ? phase.name : 'OFF SEASON'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('ops')}
              className={`pb-3 flex items-center gap-2 transition-colors relative ${
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
              className={`pb-3 flex items-center gap-2 transition-colors relative ${
                activeTab === 'roadmap' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Map size={16} />
              YEARLY ROADMAP
              {activeTab === 'roadmap' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue shadow-[0_0_10px_#22d3ee]"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* TAB 1: OPS CENTER */}
        {activeTab === 'ops' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-300">
             {/* Timeline Section */}
            <section>
              <h2 className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <CalendarDays size={14} />
                Macrocycle Phase
              </h2>
              <Timeline currentPhase={phase} currentDate={currentDate} />
            </section>

            {/* Today's Dashboard */}
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

            {/* Goals Section */}
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

              {/* Stats / Quote Area */}
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