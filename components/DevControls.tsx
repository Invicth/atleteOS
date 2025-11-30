import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';

interface DevControlsProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onReset: () => void;
}

export const DevControls: React.FC<DevControlsProps> = ({ currentDate, onDateChange, onReset }) => {
  const dateStr = currentDate.toISOString().split('T')[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-3 rounded-lg shadow-2xl flex items-center gap-3">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Calendar size={14} />
        <span>SIMULATION MODE</span>
      </div>
      <input
        type="date"
        value={dateStr}
        onChange={(e) => onDateChange(new Date(e.target.value))}
        className="bg-zinc-800 text-white text-sm border border-zinc-700 rounded px-2 py-1 focus:outline-none focus:border-neon-green"
      />
      <button 
        onClick={onReset}
        className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
        title="Reset to Project Start"
      >
        <RefreshCw size={14} />
      </button>
    </div>
  );
};