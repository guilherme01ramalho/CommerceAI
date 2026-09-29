import type { ReactNode } from 'react';
import { Loader2, Inbox, AlertCircle } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  state: 'loading' | 'loaded' | 'error' | 'empty';
  errorMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  state,
  errorMessage,
}: DataTableProps<T>) {
  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 py-16">
        <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
        <span className="text-sm text-slate-400">Carregando...</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-900/60 bg-red-950/20 py-16">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <p className="text-sm text-red-300">
          {errorMessage ?? 'Erro ao carregar dados.'}
        </p>
      </div>
    );
  }

  if (state === 'empty' || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 py-16">
        <Inbox className="h-8 w-8 text-slate-600" />
        <p className="text-sm text-slate-500">Nenhum registro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${col.className ?? ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              className="transition-colors hover:bg-slate-800/40"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-slate-200 ${col.className ?? ''}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
