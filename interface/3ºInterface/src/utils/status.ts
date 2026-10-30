import type { CompraStatus } from '@/types/compra';
import type { StockStatus } from '@/types/estoque';

export type StatusTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface StatusMeta {
  label: string;
  tone: StatusTone;
}

export const stockStatusMeta: Record<StockStatus, StatusMeta> = {
  normal: { label: 'Normal', tone: 'success' },
  baixo: { label: 'Baixo', tone: 'warning' },
  critico: { label: 'Crítico', tone: 'danger' },
};

export const operacaoStatusMeta: Record<CompraStatus, StatusMeta> = {
  concluida: { label: 'Concluída', tone: 'success' },
  pendente: { label: 'Pendente', tone: 'warning' },
  cancelada: { label: 'Cancelada', tone: 'danger' },
};
