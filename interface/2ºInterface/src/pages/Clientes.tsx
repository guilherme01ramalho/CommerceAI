import { useState } from 'react';
import { Plus, Search, Eye, Pencil } from 'lucide-react';
import DataTable from '@/components/DataTable';
import type { Column } from '@/components/DataTable';
import type { Cliente, ClientesState } from '@/types/cliente';

interface ClientesProps {
  onFillChat: (text: string) => void;
}

export default function Clientes({ onFillChat }: ClientesProps) {
  const [search, setSearch] = useState('');
  const [data] = useState<Cliente[]>([]);
  const [state] = useState<ClientesState>('loading');

  const filtered = data.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      String(c.id).includes(search)
  );

  const columns: Column<Cliente>[] = [
    {
      key: 'id',
      label: 'ID',
      className: 'w-16',
      render: (row) => <span className="font-mono text-slate-400">{row.id}</span>,
    },
    {
      key: 'nome',
      label: 'Nome',
      render: (row) => <span className="font-medium text-white">{row.nome}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span className="text-slate-400">{row.email}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      className: 'w-28',
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            row.status.toUpperCase() === 'ATIVO'
              ? 'bg-emerald-500/15 text-emerald-400'
              : 'bg-slate-700 text-slate-400'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'acoes',
      label: 'Ações',
      className: 'w-32',
      render: (row) => (
        <div className="flex gap-1.5">
          <button
            onClick={() => onFillChat(`Consulte o cliente ${row.id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            title="Ver via assistente"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onFillChat(`Quero alterar os dados do cliente ${row.id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            title="Editar via assistente"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-slate-950 px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* Title */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Clientes</h2>
            <p className="mt-1 text-sm text-slate-500">
              Gerencie os clientes cadastrados no CommerceAI.
            </p>
          </div>
          <button
            onClick={() => onFillChat('Quero cadastrar um novo cliente')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo cliente
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar cliente..."
            className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-blue-500/60 focus:outline-none"
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(row) => String(row.id)}
          state={state}
          errorMessage="Não foi possível carregar a lista de clientes."
        />
      </div>
    </div>
  );
}
