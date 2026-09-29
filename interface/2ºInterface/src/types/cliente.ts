export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  status: string;
}

export type ClientesState = 'loading' | 'loaded' | 'error' | 'empty';
