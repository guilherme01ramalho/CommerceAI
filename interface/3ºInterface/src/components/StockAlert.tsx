import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import type { EstoqueItem } from '@/types/estoque';
import { formatNumber } from '@/utils/format';
import { stockStatusMeta } from '@/utils/status';

interface StockAlertProps {
  items: EstoqueItem[] | null;
}

export default function StockAlert({ items }: StockAlertProps) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <header className="flex items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-white">
          Estoque requer atenção
        </h3>
      </header>

      {items === null && (
        <div className="flex items-center gap-2.5 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando...
        </div>
      )}

      {items !== null && items.length === 0 && (
        <div className="flex items-center gap-2.5 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          Nenhum produto requer atenção.
        </div>
      )}

      {items !== null && items.length > 0 && (
        <ul className="divide-y divide-slate-800/80">
          {items.map((item) => {
            const meta = stockStatusMeta[item.status];
            return (
              <li
                key={item.codigo}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-100">
                    {item.produto}
                  </p>
                  <p className="text-xs text-slate-500">
                    Estoque atual: {formatNumber(item.quantidade)} unidades
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs font-semibold ${
                    item.status === 'critico' ? 'text-red-400' : 'text-amber-300'
                  }`}
                >
                  {meta.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
