import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AgentRequestState } from '@/hooks/useAgentRequest';

interface AgentResultPanelProps {
  state: AgentRequestState;
}

export default function AgentResultPanel({ state }: AgentResultPanelProps) {
  if (state.status === 'idle') return null;

  if (state.status === 'loading') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3.5">
        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
        <span className="text-sm text-slate-400">Processando solicitação...</span>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3.5">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
        <p className="text-sm leading-relaxed text-red-300">{state.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        Resposta do CommerceAI
      </div>
      <div className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm leading-relaxed text-slate-200">
        {state.text}
      </div>
    </div>
  );
}
