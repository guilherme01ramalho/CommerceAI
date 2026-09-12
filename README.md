# CommerceAI 🤖

Plataforma de gestão comercial orientada por Inteligência Artificial, desenvolvida com **Google Gemini, n8n, MySQL, React e Power BI**.

O CommerceAI permite que usuários interajam com funcionalidades de gestão comercial utilizando **linguagem natural**, enquanto o n8n atua como camada de orquestração e validação entre o Agente de IA e o banco de dados.

---

## 📋 Visão Geral

O **CommerceAI** é um sistema de gestão comercial que combina uma interface gráfica moderna com um **Agente de IA capaz de interpretar solicitações em linguagem natural**.

O usuário pode realizar operações como:

* Cadastrar clientes
* Consultar clientes
* Alterar clientes
* Cadastrar produtos
* Consultar produtos
* Alterar produtos
* Consultar estoque
* Registrar vendas
* Registrar compras
* Consultar informações e indicadores
* Solicitar análises através do Agente de IA

A arquitetura foi desenvolvida para separar as responsabilidades de cada componente:

* 🤖 **Google Gemini** — interpreta a solicitação do usuário
* 🔧 **n8n** — valida, controla e executa as operações
* 🗄️ **MySQL** — armazena e processa os dados
* 💻 **Interface Web** — permite a interação do usuário com o sistema
* 📊 **Power BI** — possibilita análises e visualizações dos dados

---

## 🏗️ Arquitetura

```text
┌─────────────────────┐
│       Usuário       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Interface Gráfica   │
│   React + Vite      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Agente de IA     │
│   Google Gemini     │
└──────────┬──────────┘
           │
           │ Ação + Dados
           ▼
┌─────────────────────┐
│        n8n          │
│ Orquestração +      │
│ Validação           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       MySQL         │
│ Banco de Dados      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Power BI       │
│ Análise de Dados    │
└─────────────────────┘
```

### 🔐 Princípio da arquitetura

O Agente de IA **não possui acesso irrestrito ao banco de dados**.

O funcionamento segue o princípio:

> **IA interpreta → n8n controla → MySQL executa**

Dessa forma, o Agente de IA identifica a intenção do usuário e solicita uma operação específica. O n8n valida se essa operação é permitida e somente então realiza a comunicação com o banco de dados.

---

# 🚀 Evolução do Projeto

O CommerceAI está sendo desenvolvido em **4 entregas**, permitindo a evolução gradual do sistema.

```text
Entrega 1
Clientes + Agente IA
        ↓
Entrega 2
Produtos
        ↓
Entrega 3
Vendas + Compras + Estoque + Dashboard
        ↓
Entrega 4
Sistema Completo + Relatórios + IA Avançada + Power BI
```

---

# 🟦 Entrega 1 — Clientes + Agente IA

A primeira entrega estabeleceu a base do CommerceAI.

### 👤 Clientes

| Operação            | Status | Descrição                          |
| ------------------- | ------ | ---------------------------------- |
| `cadastrar_cliente` | ✅      | Cadastro de clientes com validação |
| `consultar_cliente` | ✅      | Consulta de clientes               |
| `alterar_cliente`   | ✅      | Alteração de dados de clientes     |

### 🤖 Agente de IA

O Agente de IA é responsável por interpretar solicitações como:

```text
"Cadastre o cliente Carlos Silva, carlos@email.com"

"Consulte o cliente 20"

"Altere o telefone do cliente 20 para 11977776666"
```

A IA transforma a solicitação em uma ação estruturada que é encaminhada ao n8n.

### 💻 Interface

A primeira versão possui:

* Chat com o Agente de IA
* Ações rápidas para Clientes
* Indicador de conexão com o n8n
* Estados de carregamento
* Tratamento de erros
* Interface responsiva
* Identidade visual do CommerceAI

---

# 🟩 Entrega 2 — Produtos

A segunda entrega amplia o sistema para o gerenciamento de produtos.

### 📦 Produtos

| Operação            | Status | Descrição             |
| ------------------- | ------ | --------------------- |
| `cadastrar_produto` | 🔄     | Cadastro de produtos  |
| `consultar_produto` | 🔄     | Consulta de produtos  |
| `alterar_produto`   | 🔄     | Alteração de produtos |
| `consultar_estoque` | 🔄     | Consulta de estoque   |

### 🤖 Evolução do Agente de IA

O Agente passa a compreender solicitações relacionadas a Clientes e Produtos.

Exemplos:

```text
"Consulte o produto 10"

"Cadastre um novo produto"

"Altere o preço do produto 5 para 199 reais"

"Consulte o cliente 4"
```

### 💻 Interface

A interface passa a possuir:

* Área de Clientes
* Área de Produtos
* Listagem de dados
* Ações de cadastro
* Ações de consulta
* Ações de alteração
* Chat integrado ao Agente de IA
* Menu de navegação

---

# 🟨 Entrega 3 — Vendas + Compras + Estoque + Dashboard

A terceira entrega transforma o CommerceAI em uma plataforma de gestão mais completa.

### 💰 Vendas

| Operação          | Status |
| ----------------- | ------ |
| `registrar_venda` | 📅     |
| `consultar_venda` | 📅     |

### 📥 Compras

| Operação           | Status |
| ------------------ | ------ |
| `registrar_compra` | 📅     |
| `consultar_compra` | 📅     |

### 📊 Estoque

| Operação                  | Status |
| ------------------------- | ------ |
| `consultar_estoque`       | 📅     |
| `consultar_estoque_baixo` | 📅     |
| Movimentação de estoque   | 📅     |

### 📈 Dashboard

O sistema passa a apresentar uma visão geral dos dados:

* Total de clientes
* Total de produtos
* Total de vendas
* Valor das vendas
* Total de compras
* Produtos com estoque baixo
* Gráficos de acompanhamento
* Alertas de estoque

O Dashboard tem como objetivo responder rapidamente:

> **"Como está o negócio?"**

### 🤖 Agente de IA

O Agente passa a compreender operações de:

* Clientes
* Produtos
* Vendas
* Compras
* Estoque

Exemplos:

```text
"Registre uma venda para o cliente 4"

"Mostre as últimas vendas"

"Qual é o estoque do produto 10?"

"Quais produtos estão com estoque baixo?"

"Registre uma compra"
```

---

# 🟥 Entrega 4 — Projeto Final

A quarta entrega representa a consolidação do CommerceAI como sistema completo.

### 🤖 Agente de IA Avançado

Além das operações de gestão, o Agente passa a compreender solicitações analíticas.

Exemplos:

```text
"Quanto vendemos este mês?"

"Quais foram os produtos mais vendidos?"

"Quais produtos estão com estoque crítico?"

"Mostre as últimas vendas"

"Compare as vendas deste mês com o período anterior"
```

### 📈 Relatórios

Será criada uma área específica para análises detalhadas:

* Relatório de vendas
* Relatório de compras
* Produtos mais vendidos
* Análise de estoque
* Movimentações de estoque
* Indicadores por período
* Filtros de datas
* Gráficos analíticos

Enquanto o Dashboard apresenta uma visão rápida do negócio, os Relatórios permitem uma análise mais detalhada dos dados.

### 📊 Power BI

Os dados do CommerceAI serão preparados para utilização no Power BI, possibilitando:

* Dashboards
* Indicadores
* Análise de vendas
* Análise de compras
* Análise de estoque
* Acompanhamento de clientes
* Análises históricas

---

# 📦 Módulos do Sistema

Ao final do projeto, o CommerceAI contará com os seguintes módulos:

| Módulo                | Entrega |
| --------------------- | ------- |
| 👤 Clientes           | 1       |
| 📦 Produtos           | 2       |
| 💰 Vendas             | 3       |
| 📥 Compras            | 3       |
| 📊 Estoque            | 3       |
| 📈 Dashboard          | 3       |
| 📑 Relatórios         | 4       |
| 🤖 Agente IA Avançado | 4       |
| 📊 Power BI           | 4       |

---

# 📁 Estrutura do Repositório

```text
CommerceAI/
│
├── n8n/
│   └── workflows/
│       ├── Agente IA.json
│       └── CommerceAI.json
│
├── database/
│   └── schema.sql
│
├── frontend/
│   └── ...
│
└── README.md
```

---

# 🔧 Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide Icons

### Backend / Automação

* n8n
* Webhooks
* Workflows de automação

### Inteligência Artificial

* Google Gemini

### Banco de Dados

* MySQL

### Business Intelligence

* Power BI

---

# 🔗 Integração

O frontend se comunica com o Agente de IA através de um webhook configurado por variável de ambiente:

```env
VITE_N8N_WEBHOOK_URL=
```

O frontend envia uma solicitação no formato:

```json
{
  "message": "Consulte o cliente 1"
}
```

O Agente de IA interpreta a mensagem e encaminha a operação para o workflow do CommerceAI.

O n8n então executa a operação correspondente no banco de dados e retorna o resultado para a interface.

---

# 🔗 Webhooks

Durante o desenvolvimento, são utilizados dois endpoints principais:

| Webhook               | Uso                                             |
| --------------------- | ----------------------------------------------- |
| `/webhook/agente`     | Comunicação entre Interface e Agente IA         |
| `/webhook/commerceai` | Comunicação interna entre workflows e operações |

Exemplo de ambiente local:

```text
Agente:
http://localhost:5678/webhook/agente

CommerceAI:
http://localhost:5678/webhook/commerceai
```

> As URLs podem variar de acordo com o ambiente utilizado.

---

# 💬 Exemplos de Uso

### 👤 Cliente

```text
"Cadastre o cliente Carlos Silva, carlos@email.com"

"Consulte o cliente 20"

"Altere o telefone do cliente 20 para 11977776666"
```

### 📦 Produto

```text
"Cadastre o produto Notebook Dell por 3500 reais"

"Consulte o produto 10"

"Altere o preço do produto 5 para 199 reais"
```

### 💰 Vendas

```text
"Registre uma venda para o cliente 4"

"Mostre as últimas vendas"
```

### 📊 Estoque

```text
"Qual é o estoque do produto 10?"

"Quais produtos estão com estoque baixo?"
```

### 📈 Análises

```text
"Quanto vendemos este mês?"

"Quais foram os produtos mais vendidos?"

"Mostre os produtos com estoque crítico"
```

---

# 🔐 Segurança e Controle

O CommerceAI utiliza o n8n como camada de controle entre a Inteligência Artificial e o banco de dados.

O Agente de IA não executa comandos SQL livremente.

O fluxo segue:

```text
Usuário
   ↓
Agente IA
   ↓
Identificação da ação
   ↓
n8n
   ↓
Validação
   ↓
Operação permitida
   ↓
MySQL
   ↓
Resultado
   ↓
Usuário
```

Essa abordagem reduz o risco de operações indevidas e permite controlar quais funcionalidades podem ser executadas pelo Agente.

---

# 📊 Power BI

O Power BI será utilizado como camada de Business Intelligence do projeto.

A proposta é utilizar os dados armazenados no MySQL para construir análises como:

* Faturamento
* Volume de vendas
* Produtos mais vendidos
* Compras
* Movimentação de estoque
* Produtos com baixo estoque
* Indicadores de clientes

A integração com Power BI será desenvolvida na etapa final do projeto.

---

# 🗺️ Roadmap

```text
☑ Entrega 1 — Clientes + Agente IA

🔄 Entrega 2 — Produtos

□ Entrega 3 — Vendas + Compras + Estoque + Dashboard

□ Entrega 4 — Projeto Completo + Relatórios + IA Avançada + Power BI
```

---

# 🎯 Objetivo do Projeto

O objetivo do CommerceAI é demonstrar a integração entre:

**Inteligência Artificial + Automação + Banco de Dados + Desenvolvimento Web + Business Intelligence.**

O projeto busca transformar operações tradicionais de um sistema comercial em uma experiência mais simples e natural, permitindo que o usuário interaja com o sistema através de linguagem natural, sem abrir mão do controle e da validação das operações.

---

# 👥 Contribuição

Projeto desenvolvido para fins acadêmicos e como projeto de portfólio.

---

# 📝 Licença

Este projeto é privado. Todos os direitos reservados.

---

**Última atualização:** Setembro de 2026
