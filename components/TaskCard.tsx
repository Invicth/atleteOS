import React from 'react';
import { DailyTask, TaskType } from '../types';
import { Dumbbell, BookOpen, Wind, Brain, Activity, Timer, ChevronRight } from 'lucide-react';

interface TaskCardProps {
  task: DailyTask;
  category: 'Physical' | 'Intellectual';
  onClick?: () => void;
}

const getIcon = (type: TaskType) => {
  switch (type) {
    case TaskType.RUNNING: return <Wind size={24} />;
    case TaskType.ENGLISH: return <BookOpen size={24} />;
    case TaskType.GYM: return <Dumbbell size={24} />;
    case TaskType.REST: return <Brain size={24} />;
    case TaskType.HYBRID: return <Activity size={24} />;
    default: return <Dumbbell size={24} />;
  }
};

const getColor = (category: 'Physical' | 'Intellectual', type: TaskType) => {
  if (type === TaskType.REST) return 'text-zinc-400 border-zinc-700';
  return category === 'Physical' 
    ? 'text-neon-green border-neon-green/30 bg-neon-green/5' 
    : 'text-neon-blue border-neon-blue/30 bg-neon-blue/5';
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, category, onClick }) => {
  const colorClass = getColor(category, task.type);
  const isRest = task.type === TaskType.REST;
  const hasDetails = task.extendedContent && task.extendedContent.length > 0;

  return (
    <div 
      onClick={hasDetails ? onClick : undefined}
      className={`
        relative overflow-hidden rounded-xl border p-5 transition-all duration-300 
        ${hasDetails ? 'cursor-pointer hover:scale-[1.02] active:scale-95 group' : ''}
        ${isRest ? 'border-zinc-800 bg-zinc-900/50' : `border-zinc-800 bg-zinc-900 ${colorClass.split(' ')[2] || ''}`}
      `}
    >
      {/* Accent Line */}
      {!isRest && (
        <div className={`absolute top-0 left-0 w-1 h-full ${category === 'Physical' ? 'bg-neon-green' : 'bg-neon-blue'}`} />
      )}

      {/* Tap indicator for mobile/ux */}
      {hasDetails && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className={category === 'Physical' ? 'text-neon-green' : 'text-neon-blue'} size={18} />
        </div>
      )}

      <div className="flex justify-between items-start mb-4 pl-2">
        <div>
          <span className={`text-xs font-mono uppercase tracking-wider ${category === 'Physical' ? 'text-neon-green' : 'text-neon-blue'}`}>
            {task.type}
          </span>
          <h3 className="text-xl font-bold text-white mt-1 pr-6">{task.title}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-black/20 ${category === 'Physical' ? 'text-neon-green' : 'text-neon-blue'}`}>
          {getIcon(task.type)}
        </div>
      </div>

      <ul className="space-y-2 mb-4 pl-2">
        {task.details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500" />
            <span className="line-clamp-2">{detail}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-auto pl-2 pt-2 border-t border-zinc-800/50">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Timer size={14} />
            <span>{task.duration}</span>
        </div>
        {hasDetails && (
            <span className={`text-[10px] uppercase font-bold tracking-widest ${category === 'Physical' ? 'text-neon-green' : 'text-neon-blue'}`}>
                View Details
            </span>
        )}
      </div>
    </div>
  );
};