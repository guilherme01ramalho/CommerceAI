import { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import Clientes from '@/pages/Clientes';
import Produtos from '@/pages/Produtos';
import type { ConnectionStatusType } from '@/types/chat';
import type { PageId } from '@/types/navigation';

export default function App() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatusType>('idle');
  const [resetSignal, setResetSignal] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageId>('chat');
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
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          connectionStatus={connectionStatus}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          activePage={activePage}
        />
        {activePage === 'chat' && (
          <Chat
            onConnectionChange={handleConnectionChange}
            resetSignal={resetSignal}
            externalFillText={chatFillText}
            onExternalFillConsumed={handleChatFillConsumed}
          />
        )}
        {activePage === 'clientes' && <Clientes onFillChat={handleFillChat} />}
        {activePage === 'produtos' && <Produtos onFillChat={handleFillChat} />}
      </div>
    </div>
  );
}
