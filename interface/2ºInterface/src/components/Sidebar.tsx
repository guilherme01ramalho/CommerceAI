import {
  BrainCircuit,
  Plus,
  MessagesSquare,
  Users,
  Package,
  Plug,
  X,
} from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';
import type { ConnectionStatusType } from '@/types/chat';
import type { PageId } from '@/types/navigation';

interface SidebarProps {
  connectionStatus: ConnectionStatusType;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof MessagesSquare;
}

const mainNav: NavItem[] = [
  { id: 'chat', label: 'Conversas', icon: MessagesSquare },
];

const managementNav: NavItem[] = [
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'produtos', label: 'Produtos', icon: Package },
];

export default function Sidebar({
  connectionStatus,
  onNewChat,
  isOpen,
  onClose,
  activePage,
  onNavigate,
}: SidebarProps) {
  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = activePage === item.id;
    return (
      <button
        key={item.id}
        onClick={() => handleNavigate(item.id)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? 'bg-slate-800/80 text-white'
            : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
        }`}
      >
        <Icon
          className={`h-4 w-4 ${active ? 'text-blue-400' : 'text-slate-500'}`}
        />
        {item.label}
      </button>
    );
  };

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
              handleNavigate('chat');
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
          {mainNav.map(renderItem)}

          <p className="mt-3 px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Gestão
          </p>
          {managementNav.map(renderItem)}

          <p className="mt-3 px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Status
          </p>

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
            v2.0 · Gestão de Clientes e Produtos
            <br />
            Powered by n8n AI Agent
          </p>
        </div>
      </aside>
    </>
  );
}
