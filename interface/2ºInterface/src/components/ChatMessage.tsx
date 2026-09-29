import { BrainCircuit, User } from 'lucide-react';
import type { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex w-full gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isUser
            ? 'bg-blue-600'
            : 'bg-gradient-to-br from-blue-500 to-blue-700'
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" strokeWidth={2} />
        ) : (
          <BrainCircuit className="h-5 w-5 text-white" strokeWidth={2} />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[80%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <span className="px-1 text-xs font-semibold text-slate-500">
          {isUser ? 'Você' : 'CommerceAI'}
        </span>
        <div
          className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'rounded-tr-sm bg-blue-600 text-white'
              : 'rounded-tl-sm bg-slate-800 text-slate-100'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
