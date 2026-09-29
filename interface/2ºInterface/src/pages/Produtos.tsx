import { useState } from 'react';
import { Plus, Search, Eye, Pencil } from 'lucide-react';
import DataTable from '@/components/DataTable';
import type { Column } from '@/components/DataTable';
import type { Produto, ProdutosState } from '@/types/produto';

interface ProdutosProps {
  onFillChat: (text: string) => void;
}

export default function Produtos({ onFillChat }: ProdutosProps) {
  const [search, setSearch] = useState('');
  const [data] = useState<Produto[]>([]);
  const [state] = useState<ProdutosState>('loading');

  const filtered = data.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Produto>[] = [
    {
      key: 'codigo',
      label: 'Código',
      className: 'w-20',
      render: (row) => (
        <span className="font-mono text-slate-400">{row.codigo}</span>
      ),
    },
    {
      key: 'nome',
      label: 'Produto',
      render: (row) => <span className="font-medium text-white">{row.nome}</span>,
    },
    {
      key: 'preco',
      label: 'Preço',
      className: 'w-28',
      render: (row) => <span className="text-slate-200">{row.preco}</span>,
    },
    {
      key: 'estoque',
      label: 'Estoque',
      className: 'w-24',
      render: (row) => {
        const low = row.estoque <= 10;
        return (
          <span
            className={`font-semibold ${
              low ? 'text-red-400' : 'text-slate-200'
            }`}
          >
            {row.estoque}
          </span>
        );
      },
    },
    {
      key: 'acoes',
      label: 'Ações',
      className: 'w-32',
      render: (row) => (
        <div className="flex gap-1.5">
          <button
            onClick={() => onFillChat(`Consulte o produto ${row.codigo}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            title="Ver via assistente"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onFillChat(`Quero alterar os dados do produto ${row.codigo}`)}
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
            <h2 className="text-xl font-bold text-white">Produtos</h2>
            <p className="mt-1 text-sm text-slate-500">
              Gerencie os produtos cadastrados no CommerceAI.
            </p>
          </div>
          <button
            onClick={() => onFillChat('Quero cadastrar um novo produto')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo produto
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar produto..."
            className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-blue-500/60 focus:outline-none"
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(row) => row.codigo}
          state={state}
          errorMessage="Não foi possível carregar a lista de produtos."
        />
      </div>
    </div>
  );
}
