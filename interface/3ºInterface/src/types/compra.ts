export type CompraStatus = 'concluida' | 'pendente' | 'cancelada';

export interface Compra {
  id: number;
  data: string;
  fornecedor: string;
  valor: number;
  status: CompraStatus;
}
