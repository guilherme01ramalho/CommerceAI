import { BrainCircuit, Users, Package, Loader2 } from 'lucide-react';
import QuickActions from './QuickActions';

interface EmptyStateProps {
  onFillInput: (text: string) => void;
}

export default function EmptyState({ onFillInput }: EmptyStateProps) {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-8 px-4 py-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-900/40">
        <BrainCircuit className="h-9 w-9 text-white" strokeWidth={2} />
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-white">
          Olá! <span className="inline-block animate-pulse">👋</span>
        </h2>
        <p className="text-sm text-slate-500">
          Gerencie clientes e produtos através do assistente inteligente do
          CommerceAI.
        </p>
      </div>

      {/* Dashboard indicators */}
      <div className="grid w-full max-w-md grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
            <Users className="h-5 w-5" strokeWidth={2} />
          </div>
          <p className="text-xs font-medium text-slate-500">Clientes</p>
          <div className="flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-600" />
            <span className="text-lg font-bold text-slate-600">--</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
            <Package className="h-5 w-5" strokeWidth={2} />
          </div>
          <p className="text-xs font-medium text-slate-500">Produtos</p>
          <div className="flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-600" />
            <span className="text-lg font-bold text-slate-600">--</span>
          </div>
        </div>
      </div>

      <QuickActions onFillInput={onFillInput} />
    </div>
  );
}
