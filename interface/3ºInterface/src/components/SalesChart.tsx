import { BarChart3 } from 'lucide-react';
import type { SalesPoint } from '@/types/dashboard';
import { formatCurrency } from '@/utils/format';

interface SalesChartProps {
  title: string;
  points: SalesPoint[];
}

export default function SalesChart({ title, points }: SalesChartProps) {
  const maxValue = Math.max(...points.map((p) => p.value), 0);

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <header className="flex items-center gap-2.5">
        <BarChart3 className="h-4 w-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </header>

      {points.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-800">
          <p className="px-6 text-center text-sm text-slate-500">
            Ainda não existem dados suficientes para gerar este gráfico.
          </p>
        </div>
      ) : (
        <div className="flex h-48 items-end gap-2 sm:gap-3">
          {points.map((point) => {
            const height = maxValue > 0 ? (point.value / maxValue) * 100 : 0;
            return (
              <div
                key={point.label}
                className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[11px] font-medium text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                  {formatCurrency(point.value)}
                </span>
                <div
                  className="w-full max-w-10 rounded-t-md bg-gradient-to-t from-blue-700 to-blue-500 transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-400"
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
                <span className="truncate text-[11px] text-slate-500">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
