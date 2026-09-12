import { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import type { ConnectionStatusType } from '@/types/chat';

export default function App() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatusType>('idle');
  const [resetSignal, setResetSignal] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar
        connectionStatus={connectionStatus}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          connectionStatus={connectionStatus}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <Chat
          onConnectionChange={handleConnectionChange}
          resetSignal={resetSignal}
        />
      </div>
    </div>
  );
}
