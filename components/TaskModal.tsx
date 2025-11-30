import React from 'react';
import { DailyTask } from '../types';
import { X, AlertCircle } from 'lucide-react';

interface TaskModalProps {
  task: DailyTask | null;
  onClose: () => void;
  category: 'Physical' | 'Intellectual';
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, category }) => {
  if (!task) return null;

  const accentColor = category === 'Physical' ? 'text-neon-green' : 'text-neon-blue';
  const borderColor = category === 'Physical' ? 'border-neon-green' : 'border-neon-blue';
  const bgColor = category === 'Physical' ? 'bg-neon-green/10' : 'bg-neon-blue/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur`}>
          <div>
            <span className={`text-xs font-mono uppercase tracking-widest ${accentColor} mb-1 block`}>
              {category} Detail
            </span>
            <h3 className="text-2xl font-bold text-white leading-tight">{task.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {task.extendedContent && task.extendedContent.length > 0 ? (
            task.extendedContent.map((step, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-zinc-800">
                 {/* Step Marker */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${category === 'Physical' ? 'border-neon-green bg-zinc-950' : 'border-neon-blue bg-zinc-950'}`} />
                
                <h4 className="text-lg font-bold text-zinc-100 mb-2">{step.header}</h4>
                
                <ul className="space-y-2 mb-3">
                  {step.items.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                       <span className="text-zinc-600 mt-1">›</span> {item}
                    </li>
                  ))}
                </ul>

                {step.note && (
                  <div className={`text-xs p-3 rounded-lg border border-dashed border-zinc-800 ${bgColor} text-zinc-300 flex items-start gap-2`}>
                    <AlertCircle size={14} className={`mt-0.5 shrink-0 ${accentColor}`} />
                    <span><span className="font-bold opacity-70">NOTA:</span> {step.note}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
             // Fallback if no extended content is present
            <div className="space-y-4">
               <p className="text-zinc-400 italic">Resumen general de la sesión:</p>
               <ul className="space-y-2">
                {task.details.map((d, i) => (
                    <li key={i} className="p-3 bg-zinc-900 rounded-lg text-zinc-300 text-sm border border-zinc-800">
                        {d}
                    </li>
                ))}
               </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-zinc-800 bg-zinc-900/30 text-center">
            <p className="text-xs font-mono text-zinc-500 uppercase">
                {task.duration ? `Duration: ${task.duration}` : 'Go Hard or Go Home'}
            </p>
        </div>
      </div>
    </div>
  );
};
