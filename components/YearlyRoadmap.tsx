import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Flag, Trophy, Target } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const YearlyRoadmap: React.FC = () => {
  // Configuración de datos de la gráfica (Hardcoded logic for Periodization)
  const data = {
    labels: ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'INTENSIDAD (Carga)',
        data: [50, 55, 60, 65, 75, 85, 95, 60, 70, 80, 90, 95, 100],
        borderColor: '#f87171', // Neon Red
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#09090b',
      },
      {
        label: 'VOLUMEN (Km/Reps)',
        data: [90, 90, 85, 80, 70, 60, 50, 80, 75, 60, 50, 40, 30],
        borderColor: '#22d3ee', // Neon Blue
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#09090b',
      },
      {
        label: 'TOEFL SKILL',
        data: [40, 50, 60, 70, 80, 90, 100, 20, 20, 20, 20, 20, 20],
        borderColor: '#bef264', // Neon Green
        backgroundColor: 'rgba(190, 242, 100, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#09090b',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#a1a1aa',
          font: { family: 'JetBrains Mono', size: 10 },
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(9, 9, 11, 0.9)',
        titleColor: '#fff',
        bodyColor: '#ccc',
        borderColor: '#3f3f46',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(63, 63, 70, 0.2)' },
        ticks: { display: false }, // Ocultar números eje Y para look limpio
      },
      x: {
        grid: { display: false },
        ticks: { color: '#71717a', font: { family: 'JetBrains Mono', size: 10 } },
      },
    },
    interaction: {
        mode: 'nearest' as const,
        axis: 'x' as const,
        intersect: false
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Chart Section */}
      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 h-[350px] relative">
        <h3 className="absolute top-4 left-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Annual Performance Metrics
        </h3>
        <div className="mt-6 h-full w-full">
             <Line data={data} options={options} />
        </div>
      </div>

      {/* Strategic Timeline Section */}
      <div className="relative border-l-2 border-zinc-800 ml-4 space-y-10 pb-4">
        
        {/* Phase 1 Marker */}
        <div className="relative pl-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-neon-blue"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <span className="text-xs font-mono text-neon-blue mb-1 block">DEC '25 - MAR '26</span>
                    <h4 className="text-lg font-bold text-white">Fase 1: Base Building</h4>
                    <p className="text-sm text-zinc-400 max-w-md">
                        Enfoque en volumen alto de carrera y vocabulario masivo. Construcción de tendones para Planche.
                    </p>
                </div>
                <div className="flex gap-2 text-xs font-mono text-zinc-500 border border-zinc-800 p-2 rounded bg-zinc-900/50">
                    <Target size={14} />
                    <span>Obj: Vocab + Aeróbico</span>
                </div>
            </div>
        </div>

        {/* Phase 2 Marker (PEAK) */}
        <div className="relative pl-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-green shadow-[0_0_10px_#bef264]"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <span className="text-xs font-mono text-neon-green mb-1 block">ABR '26 - JUN '26</span>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        Fase 2: Peak Performance
                        <Flag size={16} className="text-neon-red" />
                    </h4>
                    <p className="text-sm text-zinc-400 max-w-md">
                        Intensidad máxima. Simulacros de examen diarios. Series de velocidad en pista.
                    </p>
                </div>
                <div className="text-right">
                    <div className="inline-block bg-neon-red/10 border border-neon-red/30 text-neon-red px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-1">
                        CRITICAL EVENT
                    </div>
                    <div className="text-xs text-zinc-400">TOEFL EXAM + 21K RACE</div>
                </div>
            </div>
        </div>

        {/* Phase 3 Marker */}
        <div className="relative pl-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-neon-red"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <span className="text-xs font-mono text-neon-red mb-1 block">JUL '26 - DIC '26</span>
                    <h4 className="text-lg font-bold text-white">Fase 3: Max Strength</h4>
                    <p className="text-sm text-zinc-400 max-w-md">
                        Transformación a fuerza pura. Ciclo de sentadilla pesada y especialización en Full Planche.
                    </p>
                </div>
                <div className="flex gap-2 text-xs font-mono text-zinc-500 border border-zinc-800 p-2 rounded bg-zinc-900/50">
                    <Trophy size={14} />
                    <span>Obj: 150kg Squat</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};