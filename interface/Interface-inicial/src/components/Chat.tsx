import { useEffect, useRef, useState, useCallback } from 'react';
import { BrainCircuit, AlertCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import { sendMessageToN8N } from '@/services/n8n';
import type { Message, ConnectionStatusType } from '@/types/chat';

interface ChatProps {
  onConnectionChange: (status: ConnectionStatusType) => void;
  resetSignal: number;
}

let messageIdCounter = 0;
function generateId(): string {
  messageIdCounter += 1;
  return `msg-${Date.now()}-${messageIdCounter}`;
}

const ERROR_MESSAGE =
  'Não foi possível conectar ao agente do CommerceAI.\n\nVerifique se o workflow do n8n está ativo e se o webhook está acessível.';

export default function Chat({ onConnectionChange, resetSignal }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fillText, setFillText] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, error]);

  useEffect(() => {
    setMessages([]);
    setError(null);
  }, [resetSignal]);

  const handleFillInput = useCallback((text: string) => {
    setFillText(text);
  }, []);

  const handleFillConsumed = useCallback(() => {
    setFillText(null);
  }, []);

  const send = useCallback(
    async (text: string) => {
      setError(null);

      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const agentText = await sendMessageToN8N(text);

        const agentMsg: Message = {
          id: generateId(),
          role: 'assistant',
          content: agentText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, agentMsg]);
        onConnectionChange('online');
      } catch (err) {
        console.error('Erro ao comunicar com o n8n:', err);
        setError(ERROR_MESSAGE);
        onConnectionChange('offline');
      } finally {
        setLoading(false);
      }
    },
    [onConnectionChange]
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-1 flex-col bg-slate-950">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8">
        {hasMessages ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {loading && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                  <BrainCircuit
                    className="h-5 w-5 text-white"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="px-1 text-xs font-semibold text-slate-500">
                    CommerceAI
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3">
                    <span className="text-sm text-slate-400">
                      CommerceAI está analisando
                    </span>
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-red-300">
                  {error}
                </p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        ) : (
          <EmptyState onFillInput={handleFillInput} />
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800/80 px-4 py-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            onSend={send}
            disabled={loading}
            fillText={fillText}
            onFillConsumed={handleFillConsumed}
          />
          <p className="mt-2 text-center text-xs text-slate-600">
            CommerceAI pode cometer erros. Verifique dados críticos antes de
            decidir.
          </p>
        </div>
      </div>
    </div>
  );
}
