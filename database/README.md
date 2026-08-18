🚀 Instalação
1. Requisitos

É necessário ter o MySQL Server 8.0 ou superior instalado.

Verifique a instalação:

mysql --version

Caso o comando mysql não esteja configurado no PATH do Windows, utilize o caminho completo do executável.

Exemplo:

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
2. Ordem de execução

Os scripts devem ser executados na seguinte ordem:

01_database.sql
       ↓
02_tables.sql
       ↓
03_data.sql
       ↓
05_triggers.sql
       ↓
04_views.sql

A ordem é importante porque existem dependências entre os objetos do banco.

📦 Scripts
01_database.sql

Responsável pela criação do banco de dados:

commerceai

Também seleciona o banco para execução dos próximos scripts.

02_tables.sql

Cria as tabelas principais do sistema:

Clientes

Armazena os clientes cadastrados.

Principais campos:

IdCliente
Nome
Email
Telefone
DataCadastro
Status
Produtos

Armazena os produtos disponíveis.

Principais campos:

IdProduto
Nome
Descricao
Preco
Estoque
Categoria
CodigoBarras
SKU
DataCadastro
Ativo
Compras

Armazena as compras realizadas pelos clientes.

Principais campos:

IdCompra
IdCliente
DataCompra
ValorTotal
Status
ItensCompra

Relaciona uma compra aos produtos adquiridos.

Principais campos:

IdItem
IdCompra
IdProduto
Quantidade
PrecoUnitario
MovimentacaoEstoque

Registra as movimentações realizadas no estoque.

Principais campos:

IdMovimentacao
IdProduto
TipoMovimentacao
Quantidade
DataMovimentacao
🔗 Relacionamentos

A estrutura possui os seguintes relacionamentos:

CLIENTES
   │
   │ 1:N
   ▼
COMPRAS
   │
   │ 1:N
   ▼
ITENSCOMPRA
   │
   │ N:1
   ▼
PRODUTOS
   │
   │ 1:N
   ▼
MOVIMENTACAOESTOQUE
Relacionamentos principais
clientes.IdCliente
        ↓
compras.IdCliente
compras.IdCompra
        ↓
itenscompra.IdCompra
produtos.IdProduto
        ↓
itenscompra.IdProduto
produtos.IdProduto
        ↓
movimentacaoestoque.IdProduto
👁️ Views

O banco possui três Views.

vw_ProdutosDisponiveis

Retorna produtos que:

Estão ativos
Possuem estoque disponível

Exemplo:

SELECT *
FROM vw_ProdutosDisponiveis;
vw_EstoqueDisponivel

Retorna informações resumidas sobre o estoque disponível:

Produto
Categoria
Preço
Estoque

Exemplo:

SELECT *
FROM vw_EstoqueDisponivel;
vw_TotalGastoCliente

Calcula o valor total gasto por cada cliente.

Exemplo:

SELECT *
FROM vw_TotalGastoCliente;
⚙️ Trigger

O banco possui o Trigger:

trg_ValidarEstoque

Ele é executado antes de inserir um item em uma compra.

Funcionamento

Quando um produto é adicionado a uma compra:

Nova compra
     ↓
Verifica estoque
     ↓
┌───────────────┐
│ Estoque       │
│ suficiente?   │
└───────┬───────┘
        │
   ┌────┴────┐
   │         │
  NÃO       SIM
   │         │
   ▼         ▼
Bloqueia   Diminui
compra     estoque
             │
             ▼
       Registra saída
       no estoque
Estoque insuficiente

A operação é bloqueada com:

Estoque insuficiente para realizar a compra
Estoque suficiente

O sistema:

Permite a compra
Reduz o estoque
Registra a movimentação em movimentacaoestoque
🧪 Teste do Trigger

Exemplo de tentativa de compra superior ao estoque:

INSERT INTO itenscompra
    (IdCompra, IdProduto, Quantidade, PrecoUnitario)
VALUES
    (1, 3, 9999, 3984.88);

Resultado esperado:

ERROR 1644 (45000):
Estoque insuficiente para realizar a compra

Quando a quantidade é válida:

INSERT INTO itenscompra
    (IdCompra, IdProduto, Quantidade, PrecoUnitario)
VALUES
    (1, 3, 2, 3984.88);

A operação é realizada e o estoque é reduzido.

📊 Dados iniciais

O banco possui dados de exemplo para desenvolvimento e testes.

Quantidade inicial:

Entidade	Quantidade
Clientes	12
Produtos	10
Compras	4
Itens de compra	4
🔄 Restaurando o banco através dos scripts

Para criar o banco novamente do zero, execute os scripts na ordem indicada.

Exemplo no Windows:

mysql --default-character-set=utf8mb4 -u root -p < 01_database.sql
mysql --default-character-set=utf8mb4 -u root -p < 02_tables.sql
mysql --default-character-set=utf8mb4 -u root -p < 03_data.sql
mysql --default-character-set=utf8mb4 -u root -p < 05_triggers.sql
mysql --default-character-set=utf8mb4 -u root -p < 04_views.sql

Em ambientes Windows onde o comando mysql não estiver configurado no PATH, utilize o caminho completo do mysql.exe.

📦 Dump original

A pasta:

dump/

contém o dump original utilizado durante o desenvolvimento:

Dump20260813.sql

Os scripts numerados são a versão organizada e recomendada para instalação do banco.

👥 Integração com o CommerceAI

O banco de dados será utilizado pelos demais componentes do projeto:

                  COMMERCEAI
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
       N8N          AGENTE IA     POWER BI
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
                  MYSQL
                COMMERCEAI

O banco será a principal fonte de dados para:

Automação através do n8n
Consultas realizadas pelo agente de IA
Indicadores e dashboards no Power BI
Operações relacionadas a produtos, clientes, compras e estoque
📌 Status
Banco de Dados

Status: ✅ Concluído

Funcionalidades implementadas:

 Criação do banco
 Criação das tabelas
 Relacionamentos e Foreign Keys
 Dados iniciais
 Views
 Trigger de validação de estoque
 Controle de movimentação de estoque
 Testes de funcionamento
 Scripts organizados
 Codificação UTF-8 corrigida