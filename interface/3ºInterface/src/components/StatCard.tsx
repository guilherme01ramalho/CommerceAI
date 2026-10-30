import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | null;
  icon: LucideIcon;
}

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  const isPending = value === null;

  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-blue-700/40 hover:bg-slate-800/60">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>
      <p
        className={`text-2xl font-bold tracking-tight ${
          isPending ? 'text-slate-600' : 'text-white'
        }`}
      >
        {value ?? '--'}
      </p>
    </div>
  );
}
