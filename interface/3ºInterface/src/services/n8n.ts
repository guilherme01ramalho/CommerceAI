export async function sendMessageToN8N(message: string): Promise<string> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('URL do webhook do n8n não configurada.');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  const text = await response.text();

  console.log('Resposta do n8n:', text);

  return text;
}

export interface DashboardData {
  stats: {
    totalClientes: number;
    totalProdutos: number;
    totalVendas: number;
    valorTotalVendido: number;
    totalCompras: number;
    produtosEstoqueBaixo: number;
  };
  salesSeries: { label: string; value: number }[];
  stockAlerts: {
    codigo: string;
    produto: string;
    quantidade: number;
    status: 'normal' | 'baixo' | 'critico';
  }[];
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const webhookUrl = import.meta.env.VITE_N8N_DASHBOARD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('URL do webhook de Dashboard do n8n não configurada.');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'dashboard' }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  const text = await response.text();

  console.log('Resposta do dashboard:', text);

  return parseDashboardResponse(text);
}

function parseDashboardResponse(text: string): DashboardData {
  let payload: unknown;

  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error('Formato de resposta do Dashboard não reconhecido.');
  }

  // Aceita respostas diretas ou encapsuladas em arrays
  const parsed = Array.isArray(payload) ? payload[0] : payload;

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Resposta do Dashboard inválida.');
  }

  const data = parsed as Record<string, unknown>;

  // Aceita dados dentro de stats ou diretamente na raiz
  const stats = (
    data.stats && typeof data.stats === 'object'
      ? data.stats
      : data
  ) as Record<string, unknown>;

  const salesSeries = Array.isArray(data.salesSeries)
    ? data.salesSeries as Record<string, unknown>[]
    : [];

  const stockAlerts = Array.isArray(data.stockAlerts)
    ? data.stockAlerts as Record<string, unknown>[]
    : [];

  return {
    stats: {
      totalClientes: Number(stats.totalClientes ?? 0),
      totalProdutos: Number(stats.totalProdutos ?? 0),
      totalVendas: Number(stats.totalVendas ?? 0),
      valorTotalVendido: Number(
        stats.valorTotalVendido ?? stats.valorTotalCompras ?? 0
      ),
      totalCompras: Number(stats.totalCompras ?? 0),
      produtosEstoqueBaixo: Number(stats.produtosEstoqueBaixo ?? 0),
    },

    salesSeries: salesSeries.map((point) => ({
      label: String(point.label ?? ''),
      value: Number(point.value ?? 0),
    })),

    stockAlerts: stockAlerts.map((item) => ({
      codigo: String(item.codigo ?? ''),
      produto: String(item.produto ?? ''),
      quantidade: Number(item.quantidade ?? 0),
      status: (item.status as 'normal' | 'baixo' | 'critico') ?? 'baixo',
    })),
  };
}

export interface CompraItemInput {
  produtoId: string;
  quantidade: number;
}

export function buildCompraMessage(
  clienteId: string,
  itens: CompraItemInput[]
): string {
  const lista = itens
    .map((item) => `${item.quantidade} unidades do produto ${item.produtoId}`)
    .join(', ');
  return `Registre uma compra para o cliente ${clienteId} com: ${lista}.`;
}

export function buildConsultaCompraMessage(clienteId: string): string {
  return `Consulte as compras do cliente ${clienteId}.`;
}
