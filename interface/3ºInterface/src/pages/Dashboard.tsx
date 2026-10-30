import { useState, useEffect, useCallback } from 'react';
import { Users, Package, ShoppingCart, Wallet, Truck, AlertTriangle, Loader2, AlertCircle } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StockAlert from '@/components/StockAlert';
import SalesChart from '@/components/SalesChart';
import type { DashboardStats, SalesPoint } from '@/types/dashboard';
import type { EstoqueItem } from '@/types/estoque';
import { formatCurrency, formatNumber } from '@/utils/format';
import { fetchDashboardData } from '@/services/n8n';

type DashboardState =
  | { status: 'loading' }
  | { status: 'success'; stats: DashboardStats; salesSeries: SalesPoint[]; stockAlerts: EstoqueItem[] }
  | { status: 'error'; message: string };

export default function Dashboard() {
  const [state, setState] = useState<DashboardState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await fetchDashboardData();
      setState({
        status: 'success',
        stats: data.stats,
        salesSeries: data.salesSeries,
        stockAlerts: data.stockAlerts,
      });
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err);
      setState({
        status: 'error',
        message: 'Não foi possível carregar os dados do Dashboard.',
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = state.status === 'success' ? state.stats : null;
  const salesSeries = state.status === 'success' ? state.salesSeries : [];
  const stockAlerts = state.status === 'success' ? state.stockAlerts : null;

  const count = (value: number | undefined) =>
    value === undefined ? null : formatNumber(value);

  const cards = [
    {
      label: 'Clientes',
      icon: Users,
      value: count(stats?.totalClientes),
    },
    {
      label: 'Produtos',
      icon: Package,
      value: count(stats?.totalProdutos),
    },
    {
      label: 'Vendas',
      icon: ShoppingCart,
      value: count(stats?.totalVendas),
    },
    {
      label: 'Valor vendido',
      icon: Wallet,
      value: stats ? formatCurrency(stats.valorTotalVendido) : null,
    },
    {
      label: 'Compras',
      icon: Truck,
      value: count(stats?.totalCompras),
    },
    {
      label: 'Estoque baixo',
      icon: AlertTriangle,
      value: count(stats?.produtosEstoqueBaixo),
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-slate-950 px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <p className="mt-1 text-sm text-slate-500">
              Visão geral do CommerceAI
            </p>
          </div>
          <button
            onClick={() => void load()}
            disabled={state.status === 'loading'}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-blue-600/60 hover:text-white disabled:opacity-50"
          >
            {state.status === 'loading' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : null}
            Atualizar
          </button>
        </div>

        {state.status === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3.5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div className="space-y-1">
              <p className="text-sm leading-relaxed text-red-300">
                {state.message}
              </p>
              <button
                onClick={() => void load()}
                className="text-xs font-semibold text-red-300 underline underline-offset-2 hover:text-red-200"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              icon={card.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart title="Vendas por período" points={salesSeries} />
          </div>
          <StockAlert items={stockAlerts} />
        </div>
      </div>
    </div>
  );
}
