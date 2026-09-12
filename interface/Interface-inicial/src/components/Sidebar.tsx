import {
  BrainCircuit,
  Plus,
  MessagesSquare,
  Plug,
  X,
} from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';
import type { ConnectionStatusType } from '@/types/chat';

interface SidebarProps {
  connectionStatus: ConnectionStatusType;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  connectionStatus,
  onNewChat,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800/80 bg-black
          transition-transform duration-300 ease-in-out md:static md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-900/40">
              <BrainCircuit className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white">
                CommerceAI
              </h1>
              <p className="text-[11px] font-medium text-slate-500">
                Data Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo Chat
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Navegação
          </p>

          <button className="flex items-center gap-3 rounded-lg bg-slate-800/60 px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800">
            <MessagesSquare className="h-4 w-4 text-blue-400" />
            Conversas
          </button>

          <div className="mt-2 px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Sistema
          </div>

          <div className="flex flex-col gap-2 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Plug className="h-3.5 w-3.5" />
              Status da conexão
            </div>
            <ConnectionStatus status={connectionStatus} />
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800/80 px-5 py-4">
          <p className="text-[11px] leading-relaxed text-slate-600">
            v1.0 · Interface de testes
            <br />
            Powered by n8n AI Agent
          </p>
        </div>
      </aside>
    </>
  );
}
