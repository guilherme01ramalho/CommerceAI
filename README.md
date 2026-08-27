# CommerceAI 🤖

Plataforma comercial orientada a IA com n8n, MySQL e Power BI.

---

## 📋 Visão Geral

O CommerceAI é uma plataforma que permite que usuários interajam com um sistema de gestão comercial através de **linguagem natural**, utilizando:
- **Agente IA** (Google Gemini) para interpretar solicitações
- **n8n** para orquestrar operações
- **MySQL** para persistência de dados
- **Power BI** para análise e relatórios

---

## 🏗️ Arquitetura
Usuário → Interface Gráfica → Agente IA → n8n → MySQL
↓
Power BI (análise)

text

---

## ✅ Módulos Implementados

### 👤 Clientes (Concluído)

| Operação | Status | Descrição |
|----------|--------|-----------|
| `cadastrar_cliente` | ✅ | Com validação de email duplicado |
| `consultar_cliente` | ✅ | Com tratamento de não encontrado |
| `alterar_cliente` | ✅ | Com verificação de existência |

### 📦 Produtos (Próximo)

| Operação | Status |
|----------|--------|
| `cadastrar_produto` | 🔜 |
| `consultar_produto` | 🔜 |
| `alterar_produto` | 🔜 |
| `consultar_estoque` | 🔜 |

### 💰 Vendas (Planejado)

| Operação | Status |
|----------|--------|
| `registrar_venda` | 📅 |
| `consultar_venda` | 📅 |

---

## 📁 Estrutura do Repositório
CommerceAi/
├── n8n/
│ └── workflows/
│ ├── Agente IA.json
│ └── CommerceAI.json
├── docs/
│ └── documentacao_sprint_clientes.md
├── database/
│ └── schema.sql
└── README.md

text

---

## 🚀 Como Configurar

### 1. Importar Workflows no n8n

1. Acesse o n8n
2. Clique em **"Import from File"**
3. Selecione os arquivos JSON da pasta `n8n/workflows/`

### 2. Configurar Credenciais

**MySQL:**
- Crie uma credencial MySQL
- Configure host, usuário, senha e banco

**Google Gemini:**
- Acesse [Google AI Studio](https://aistudio.google.com)
- Crie uma API Key
- Configure a credencial no n8n

### 3. Ativar Workflows

1. Abra cada workflow
2. Ative o toggle no canto superior

### 4. Testar

Envie uma mensagem para o Webhook do Agente:

```json
{
  "mensagem": "Cadastre o cliente Carlos Silva, carlos@email.com"
}
🔗 URLs dos Webhooks
Webhook	URL	Uso
Agente	http://localhost:5678/webhook/agente	Interface Gráfica
CommerceAI	http://localhost:5678/webhook/commerceai	Uso interno
💬 Exemplos de Uso
Cadastrar Cliente
text
"Cadastre o cliente Carlos Silva, carlos@email.com, telefone 11988887777"
Consultar Cliente
text
"Consulte o cliente 20"
Alterar Cliente
text
"Altere o telefone do cliente 20 para 11977776666"
🔧 Tecnologias
n8n - Automação e orquestração

Google Gemini - IA para interpretação

MySQL - Banco de dados

Power BI - Análise e relatórios

📊 Power BI
O Power BI acessa o MySQL diretamente para:

Dashboards

Relatórios

Indicadores de vendas

Análise de estoque

Acompanhamento de clientes

📅 Roadmap
☑ Sprint 1: Clientes + Agente IA
□ Sprint 2: Produtos
□ Sprint 3: Vendas
□ Sprint 4: Projeto completo + Power BI
👥 Contribuição
Projeto desenvolvido para fins acadêmicos/comerciais.

📝 Licença
Este projeto é privado. Todos os direitos reservados.

Última atualização: 27 de Agosto de 2026
