import React from 'react';
import { Calendar, RefreshCw, Radio, Lock } from 'lucide-react';

interface DevControlsProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onReset: () => void;
  isSimMode: boolean;
  onToggleSimMode: () => void;
}

export const DevControls: React.FC<DevControlsProps> = ({ 
  currentDate, 
  onDateChange, 
  onReset,
  isSimMode,
  onToggleSimMode
}) => {
  // Fix: Extract local YYYY-MM-DD manually to avoid UTC shift
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Append T12:00:00 to prevent timezone shifts when parsing back
    const dateValue = e.target.value;
    if (dateValue) {
        onDateChange(new Date(`${dateValue}T12:00:00`));
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 backdrop-blur-md border p-3 rounded-lg shadow-2xl flex items-center gap-4 transition-colors duration-300 ${isSimMode ? 'bg-amber-950/90 border-amber-800' : 'bg-zinc-900/90 border-zinc-800'}`}>
      
      {/* Mode Toggle */}
      <button 
        onClick={onToggleSimMode}
        className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
            isSimMode 
            ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' 
            : 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20'
        }`}
      >
        {isSimMode ? <Radio size={14} className="animate-pulse" /> : <Lock size={14} />}
        {isSimMode ? 'SIMULATION ON' : 'LIVE SYSTEM'}
      </button>

      {/* Date Input (Disabled in Live Mode) */}
      <div className={`flex items-center gap-2 ${!isSimMode ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Calendar size={14} />
        </div>
        <input
          type="date"
          value={dateStr}
          onChange={handleDateChange}
          disabled={!isSimMode}
          className="bg-zinc-950 text-white text-sm border border-zinc-700 rounded px-2 py-1 focus:outline-none focus:border-neon-green disabled:cursor-not-allowed"
        />
        <button 
            onClick={onReset}
            disabled={!isSimMode}
            className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
            title="Reset to Project Start"
        >
            <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
};