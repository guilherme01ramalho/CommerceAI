import { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import Dashboard from '@/pages/Dashboard';
import Clientes from '@/pages/Clientes';
import Produtos from '@/pages/Produtos';
import Compras from '@/pages/Compras';
import type { ConnectionStatusType } from '@/types/chat';
import type { PageId } from '@/types/navigation';

export default function App() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatusType>('idle');
  const [resetSignal, setResetSignal] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [chatFillText, setChatFillText] = useState<string | null>(null);

  const handleConnectionChange = useCallback(
    (status: ConnectionStatusType) => {
      setConnectionStatus(status);
    },
    []
  );

  const handleNewChat = useCallback(() => {
    setResetSignal((prev) => prev + 1);
    setConnectionStatus('idle');
  }, []);

  const handleNavigate = useCallback((page: PageId) => {
    setActivePage(page);
  }, []);

  const handleFillChat = useCallback((text: string) => {
    setChatFillText(text);
    setActivePage('chat');
  }, []);

  const handleChatFillConsumed = useCallback(() => {
    setChatFillText(null);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar
        connectionStatus={connectionStatus}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          connectionStatus={connectionStatus}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          activePage={activePage}
        />
        <div
          className={`${
            activePage === 'chat' ? 'flex' : 'hidden'
          } min-h-0 min-w-0 flex-1 flex-col overflow-hidden`}
        >
          <Chat
            onConnectionChange={handleConnectionChange}
            resetSignal={resetSignal}
            externalFillText={chatFillText}
            onExternalFillConsumed={handleChatFillConsumed}
          />
        </div>
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'clientes' && <Clientes onFillChat={handleFillChat} />}
        {activePage === 'produtos' && <Produtos onFillChat={handleFillChat} />}
        {activePage === 'compras' && <Compras />}
      </div>
    </div>
  );
}
