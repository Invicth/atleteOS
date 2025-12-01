import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateSquatChartData } from '../services/squatLogic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const SquatPath: React.FC = () => {
  const { labels, capacityLine, workingLine } = generateSquatChartData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Theoretical 1RM Capacity',
        data: capacityLine,
        borderColor: '#52525b', // Zinc-600
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.1
      },
      {
        label: 'LOAD ON BAR (Working Weight)',
        data: workingLine,
        borderColor: '#bef264', // Neon Green
        backgroundColor: 'rgba(190, 242, 100, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#09090b',
        pointBorderColor: '#bef264',
        pointRadius: 3,
        fill: true,
        tension: 0.2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#a1a1aa', font: { family: 'JetBrains Mono', size: 10 }, boxWidth: 10 }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(9, 9, 11, 0.95)',
        titleColor: '#bef264',
        bodyColor: '#fff',
        borderColor: '#3f3f46',
        borderWidth: 1,
        titleFont: { family: 'JetBrains Mono' }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(63, 63, 70, 0.2)' },
        ticks: { color: '#71717a', font: { family: 'JetBrains Mono' }, callback: (v: any) => `${v}kg` }
      },
      x: {
        grid: { display: false },
        ticks: { display: false } // Hide dates to keep it clean, show only on tooltip
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h3 className="text-xl font-bold text-white">Squat Path to 150kg</h3>
           <p className="text-xs text-zinc-500 font-mono">LINEAR HYPERTROPHY &gt; 5x5 &gt; WENDLER 5/3/1</p>
        </div>
        <div className="text-right">
            <span className="text-3xl font-black text-neon-green">150<span className="text-sm text-zinc-500 ml-1">KG</span></span>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">TARGET</p>
        </div>
      </div>

      <div className="h-[400px] w-full p-4 bg-zinc-900/30 rounded-xl border border-zinc-800">
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-neon-green mb-2"></div>
            <h4 className="text-sm font-bold text-white">Phase 1: Hypertrophy</h4>
            <p className="text-xs text-zinc-400 mt-1">Linear progression. High volume (4x8). Focus on technique and muscle size.</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-neon-blue mb-2"></div>
            <h4 className="text-sm font-bold text-white">Phase 2: Strength Base</h4>
            <p className="text-xs text-zinc-400 mt-1">Classic 5x5. Lower reps, higher intensity. Building the nervous system.</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-neon-red mb-2"></div>
            <h4 className="text-sm font-bold text-white">Phase 3: Peaking</h4>
            <p className="text-xs text-zinc-400 mt-1">Wendler 5/3/1 Wave Loading. Variable intensity to prevent burnout and hit 1RM.</p>
        </div>
      </div>
    </div>
  );
};