export interface DashboardStats {
  totalClientes: number;
  totalProdutos: number;
  totalVendas: number;
  valorTotalVendido: number;
  totalCompras: number;
  produtosEstoqueBaixo: number;
}

export interface SalesPoint {
  label: string;
  value: number;
}
