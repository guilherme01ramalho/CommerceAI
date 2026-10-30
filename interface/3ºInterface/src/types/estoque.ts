export type StockStatus = 'normal' | 'baixo' | 'critico';

export interface EstoqueItem {
  codigo: string;
  produto: string;
  quantidade: number;
  status: StockStatus;
}
