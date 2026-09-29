export type MessageRole = 'user' | 'assistant';

export type ChatStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type ConnectionStatusType = 'idle' | 'online' | 'offline';
