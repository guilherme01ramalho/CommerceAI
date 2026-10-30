import { useCallback, useRef, useState } from 'react';
import { sendMessageToN8N } from '@/services/n8n';

export type AgentRequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; text: string }
  | { status: 'error'; message: string };

const REQUEST_ERROR_MESSAGE =
  'Não foi possível concluir a operação. Verifique se o workflow do n8n está ativo e tente novamente.';

export function useAgentRequest() {
  const [state, setState] = useState<AgentRequestState>({ status: 'idle' });
  const inFlight = useRef(false);

  const run = useCallback(async (message: string) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setState({ status: 'loading' });

    try {
      const text = await sendMessageToN8N(message);
      setState({ status: 'success', text });
    } catch (err) {
      console.error('Erro ao comunicar com o n8n:', err);
      setState({ status: 'error', message: REQUEST_ERROR_MESSAGE });
    } finally {
      inFlight.current = false;
    }
  }, []);

  return { state, run };
}
