import { Search, UserPlus, UserPen, PackageSearch, PackagePlus, PackageCheck, Users, Package } from 'lucide-react';

interface QuickActionsProps {
  onFillInput: (text: string) => void;
}

interface QuickCard {
  icon: typeof Search;
  title: string;
  description: string;
  fillText: string;
}

const clienteCards: QuickCard[] = [
  {
    icon: Search,
    title: 'Consultar cliente',
    description: 'Consulte os dados de um cliente cadastrado.',
    fillText: 'Consulte o cliente',
  },
  {
    icon: UserPlus,
    title: 'Cadastrar cliente',
    description: 'Cadastre um novo cliente no sistema.',
    fillText: 'Quero cadastrar um novo cliente',
  },
  {
    icon: UserPen,
    title: 'Alterar cliente',
    description: 'Atualize os dados de um cliente existente.',
    fillText: 'Quero alterar os dados do cliente',
  },
];

const produtoCards: QuickCard[] = [
  {
    icon: PackageSearch,
    title: 'Consultar produto',
    description: 'Consulte os dados de um produto cadastrado.',
    fillText: 'Consulte o produto',
  },
  {
    icon: PackagePlus,
    title: 'Cadastrar produto',
    description: 'Cadastre um novo produto no sistema.',
    fillText: 'Quero cadastrar um novo produto',
  },
  {
    icon: PackageCheck,
    title: 'Alterar produto',
    description: 'Atualize os dados de um produto existente.',
    fillText: 'Quero alterar os dados do produto',
  },
];

const suggestions = [
  'Consulte o cliente 1',
  'Consulte o cliente 4',
  'Quero cadastrar um novo cliente',
  'Quero alterar o telefone do cliente 2',
  'Consulte o produto 10',
  'Quero cadastrar um novo produto',
  'Altere o preço do produto 5 para 199 reais',
];

function CardGroup({
  label,
  icon: Icon,
  cards,
  onFillInput,
}: {
  label: string;
  icon: typeof Users;
  cards: QuickCard[];
  onFillInput: (text: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
        <Icon className="h-3.5 w-3.5 text-blue-500" />
        {label}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((card) => {
          const CardIcon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => onFillInput(card.fillText)}
              className="group flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all hover:border-blue-700/50 hover:bg-slate-800/70 active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 transition-colors group-hover:bg-blue-600/25">
                <CardIcon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-100">
                  {card.title}
                </p>
                <p className="text-xs leading-relaxed text-slate-500">
                  {card.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function QuickActions({ onFillInput }: QuickActionsProps) {
  return (
    <div className="w-full space-y-6">
      <CardGroup
        label="Clientes"
        icon={Users}
        cards={clienteCards}
        onFillInput={onFillInput}
      />
      <CardGroup
        label="Produtos"
        icon={Package}
        cards={produtoCards}
        onFillInput={onFillInput}
      />

      {/* Suggestion chips */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          Exemplos
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onFillInput(suggestion)}
              className="rounded-lg border border-slate-800 bg-slate-900/40 px-3.5 py-2 text-xs font-medium text-slate-400 transition-all hover:border-blue-700/40 hover:bg-slate-800/60 hover:text-slate-200 active:scale-[0.98]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
