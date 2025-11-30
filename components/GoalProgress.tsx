import React from 'react';
import { Goal } from '../types';
import { Activity, Dumbbell, Wind, BookOpen, Trophy } from 'lucide-react';

const icons = {
  Activity,
  Dumbbell,
  Wind,
  BookOpen,
  Trophy
};

interface GoalProgressProps {
  goal: Goal;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({ goal }) => {
  const Icon = icons[goal.iconName];
  const colorClass = goal.category === 'Physical' ? 'bg-neon-green' : 'bg-neon-blue';
  const textColorClass = goal.category === 'Physical' ? 'text-neon-green' : 'text-neon-blue';

  return (
    <div className="flex items-center gap-4 py-3 border-b border-zinc-800/50 last:border-0">
      <div className={`p-2 rounded-full bg-zinc-900 border border-zinc-800 ${textColorClass}`}>
        <Icon size={18} />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-end mb-1">
          <span className="text-sm font-medium text-zinc-200">{goal.title}</span>
          <span className="text-xs text-zinc-400 font-mono">{goal.currentStatus}</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`} 
            style={{ width: `${goal.progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
            <span className="text-[10px] text-zinc-600">Start</span>
            <span className={`text-[10px] ${textColorClass}`}>{goal.target}</span>
        </div>
      </div>
    </div>
  );
};