import { Wifi, WifiOff, Clock } from 'lucide-react';
import type { ConnectionStatusType } from '@/types/chat';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
  compact?: boolean;
}

const config: Record<
  ConnectionStatusType,
  {
    label: string;
    dotClass: string;
    textClass: string;
    ringClass: string;
    Icon: typeof Wifi;
  }
> = {
  online: {
    label: 'n8n conectado',
    dotClass: 'bg-emerald-400',
    textClass: 'text-emerald-400',
    ringClass: 'shadow-emerald-400/50',
    Icon: Wifi,
  },
  offline: {
    label: 'n8n indisponível',
    dotClass: 'bg-red-500',
    textClass: 'text-red-400',
    ringClass: 'shadow-red-500/50',
    Icon: WifiOff,
  },
  idle: {
    label: 'Aguardando conexão',
    dotClass: 'bg-slate-500',
    textClass: 'text-slate-400',
    ringClass: '',
    Icon: Clock,
  },
};

export default function ConnectionStatus({
  status,
  compact = false,
}: ConnectionStatusProps) {
  const { label, dotClass, textClass, ringClass, Icon } = config[status];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`relative flex h-2 w-2 ${dotClass}`}>
          {status === 'online' && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotClass} opacity-75`}
            />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${dotClass} ${
              status === 'online' ? `shadow-sm ${ringClass}` : ''
            }`}
          />
        </span>
        <span className={`text-xs font-medium ${textClass}`}>{label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <span className={`relative flex h-2.5 w-2.5 ${dotClass}`}>
        {status === 'online' && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotClass} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotClass} ${
            status === 'online' ? `shadow-sm ${ringClass}` : ''
          }`}
        />
      </span>
      <Icon className={`h-4 w-4 ${textClass}`} />
      <span className={`text-sm font-medium ${textClass}`}>{label}</span>
    </div>
  );
}
