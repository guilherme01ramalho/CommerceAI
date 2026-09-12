import { Menu, BrainCircuit } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';
import type { ConnectionStatusType } from '@/types/chat';

interface HeaderProps {
  connectionStatus: ConnectionStatusType;
  onToggleSidebar: () => void;
}

export default function Header({
  connectionStatus,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-900/40 md:hidden">
            <BrainCircuit className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight text-white">
              CommerceAI
            </h1>
            <p className="hidden text-[11px] text-slate-500 sm:block">
              Assistente inteligente para gestão de clientes
            </p>
          </div>
        </div>
      </div>

      <ConnectionStatus status={connectionStatus} compact />
    </header>
  );
}
