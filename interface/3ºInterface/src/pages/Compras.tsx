import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import DataTable from '@/components/DataTable';
import type { Column } from '@/components/DataTable';
import NovaCompraModal from '@/components/NovaCompraModal';
import StatusBadge from '@/components/StatusBadge';
import type { Compra } from '@/types/compra';
import { formatCurrency } from '@/utils/format';
import { operacaoStatusMeta } from '@/utils/status';

export default function Compras() {
  const [search, setSearch] = useState('');
  const [compras] = useState<Compra[]>([]);
  const [novaCompraOpen, setNovaCompraOpen] = useState(false);

  const term = search.trim().toLowerCase();
  const filtered = compras.filter(
    (c) =>
      c.fornecedor.toLowerCase().includes(term) || String(c.id).includes(term)
  );

  const columns: Column<Compra>[] = [
    {
      key: 'data',
      label: 'Data',
      className: 'w-28',
      render: (row) => <span className="text-slate-400">{row.data}</span>,
    },
    {
      key: 'fornecedor',
      label: 'Fornecedor / Referência',
      render: (row) => <span className="font-medium text-white">{row.fornecedor}</span>,
    },
    {
      key: 'valor',
      label: 'Valor',
      className: 'w-32',
      render: (row) => <span className="text-slate-200">{formatCurrency(row.valor)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      className: 'w-32',
      render: (row) => {
        const meta = operacaoStatusMeta[row.status];
        return <StatusBadge label={meta.label} tone={meta.tone} />;
      },
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-slate-950 px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Compras</h2>
            <p className="mt-1 text-sm text-slate-500">
              Histórico de compras realizadas.
            </p>
          </div>
          <button
            onClick={() => setNovaCompraOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova compra
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar compra..."
            className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-blue-500/60 focus:outline-none"
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(row) => String(row.id)}
          state={compras.length > 0 ? 'loaded' : 'empty'}
          emptyMessage="O histórico de compras será exibido aqui quando o sistema disponibilizar esses registros."
        />
      </div>

      {novaCompraOpen && <NovaCompraModal onClose={() => setNovaCompraOpen(false)} />}
    </div>
  );
}
