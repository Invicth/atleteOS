import React from 'react';
import { PHASES } from '../constants';
import { Phase } from '../types';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { toLocalISOString } from '../services/dateService'; // V6.3 Import

interface TimelineProps {
  currentPhase: Phase | null;
  currentDate: Date;
}

export const Timeline: React.FC<TimelineProps> = ({ currentPhase, currentDate }) => {
  // Fix: Use local date string comparison
  const currentDateStr = toLocalISOString(currentDate);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex min-w-[600px] justify-between items-center relative px-4">
        {/* Connecting Line */}
        <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-zinc-800 -z-10" />
        
        {PHASES.map((phase) => {
          let status: 'past' | 'current' | 'future' = 'future';
          if (currentDateStr > phase.endDate) status = 'past';
          else if (currentDateStr >= phase.startDate && currentDateStr <= phase.endDate) status = 'current';

          return (
            <div key={phase.id} className="flex flex-col items-center group w-1/3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-500
                ${status === 'current' ? 'bg-zinc-900 border-neon-green text-neon-green shadow-[0_0_15px_rgba(190,242,100,0.3)]' : ''}
                ${status === 'past' ? 'bg-zinc-900 border-zinc-600 text-zinc-600' : ''}
                ${status === 'future' ? 'bg-black border-zinc-800 text-zinc-800' : ''}
              `}>
                {status === 'past' && <CheckCircle2 size={20} />}
                {status === 'current' && <Circle size={20} className="animate-pulse" />}
                {status === 'future' && <Lock size={16} />}
              </div>
              
              <div className="mt-3 text-center">
                <div className={`text-xs font-mono mb-1 ${status === 'current' ? 'text-neon-green' : 'text-zinc-500'}`}>
                  {phase.startDate.substring(0, 7)} - {phase.endDate.substring(0, 7)}
                </div>
                <h4 className={`font-bold text-sm ${status === 'current' ? 'text-white' : 'text-zinc-400'}`}>
                  {phase.name}
                </h4>
                <p className="text-[10px] text-zinc-500 max-w-[150px] mt-1 hidden md:block">
                  {phase.focus}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};