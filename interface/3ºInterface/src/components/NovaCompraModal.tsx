import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Modal from './Modal';
import AgentResultPanel from './AgentResultPanel';
import { useAgentRequest } from '@/hooks/useAgentRequest';
import { buildCompraMessage } from '@/services/n8n';

interface NovaCompraModalProps {
  onClose: () => void;
}

interface ItemRow {
  id: string;
  produtoId: string;
  quantidade: string;
}

const inputClass =
  'w-full rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-blue-500/60 focus:outline-none disabled:opacity-50';

const isPositiveInteger = (value: string) => /^\d+$/.test(value) && Number(value) > 0;

function createRow(): ItemRow {
  return { id: crypto.randomUUID(), produtoId: '', quantidade: '' };
}

export default function NovaCompraModal({ onClose }: NovaCompraModalProps) {
  const [clienteId, setClienteId] = useState('');
  const [rows, setRows] = useState<ItemRow[]>(() => [createRow()]);
  const [error, setError] = useState<string | null>(null);
  const { state, run } = useAgentRequest();

  const isLoading = state.status === 'loading';
  const isSuccess = state.status === 'success';

  const updateRow = (id: string, field: 'produtoId' | 'quantidade', value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isSuccess) return;

    if (!isPositiveInteger(clienteId.trim())) {
      setError('Informe o ID do cliente com um número válido.');
      return;
    }
    if (rows.some((row) => !isPositiveInteger(row.produtoId.trim()))) {
      setError('Informe o ID de cada produto com um número válido.');
      return;
    }
    if (rows.some((row) => !isPositiveInteger(row.quantidade.trim()))) {
      setError('Informe uma quantidade válida para cada produto.');
      return;
    }

    setError(null);
    const message = buildCompraMessage(
      clienteId.trim(),
      rows.map((row) => ({
        produtoId: row.produtoId.trim(),
        quantidade: Number(row.quantidade),
      }))
    );
    void run(message);
  };

  const hasValidRows = rows.length > 0 && rows.every(
    (row) => isPositiveInteger(row.produtoId.trim()) && isPositiveInteger(row.quantidade.trim())
  );

  return (
    <Modal
      title="Nova compra"
      description="Informe o cliente e os produtos. O sistema valida os dados, o estoque e o valor total."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="compra-cliente" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            ID do cliente
          </label>
          <input
            id="compra-cliente"
            inputMode="numeric"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            disabled={isLoading || isSuccess}
            placeholder="Ex.: 4"
            className={inputClass}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Produtos
          </p>
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <div className="flex-1 space-y-1">
                <input
                  aria-label="ID do produto"
                  inputMode="numeric"
                  value={row.produtoId}
                  onChange={(e) => updateRow(row.id, 'produtoId', e.target.value)}
                  disabled={isLoading || isSuccess}
                  placeholder="ID do produto"
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  aria-label="Quantidade"
                  inputMode="numeric"
                  value={row.quantidade}
                  onChange={(e) => updateRow(row.id, 'quantidade', e.target.value)}
                  disabled={isLoading || isSuccess}
                  placeholder="Qtd."
                  className={`${inputClass} w-24 shrink-0`}
                />
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={isLoading || isSuccess}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-800 hover:text-red-400 disabled:opacity-40"
                    aria-label="Remover produto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setRows((prev) => [...prev, createRow()])}
            disabled={isLoading || isSuccess}
            className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            Adicionar produto
          </button>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <AgentResultPanel state={state} />

        {isSuccess && hasValidRows && (
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 text-sm text-slate-300">
            <p>Compra registrada. Use a resposta acima para conferir o identificador, o cliente e o valor total.</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            {isSuccess ? 'Fechar' : 'Cancelar'}
          </button>
          {!isSuccess && (
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Registrando...' : 'Registrar compra'}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
