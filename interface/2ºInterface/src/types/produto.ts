export interface Produto {
  codigo: string;
  nome: string;
  preco: string;
  estoque: number;
}

export type ProdutosState = 'loading' | 'loaded' | 'error' | 'empty';
