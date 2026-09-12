import { BrainCircuit } from 'lucide-react';
import QuickActions from './QuickActions';

interface EmptyStateProps {
  onFillInput: (text: string) => void;
}

export default function EmptyState({ onFillInput }: EmptyStateProps) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-8 px-4 py-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-900/40">
        <BrainCircuit className="h-9 w-9 text-white" strokeWidth={2} />
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-white">
          Olá! <span className="inline-block animate-pulse">👋</span>
        </h2>
        <p className="text-base text-slate-400">
          Sou o assistente do CommerceAI.
        </p>
        <p className="text-sm text-slate-500">
          Posso ajudar você a consultar, cadastrar e alterar clientes.
        </p>
      </div>

      <QuickActions onFillInput={onFillInput} />
    </div>
  );
}
