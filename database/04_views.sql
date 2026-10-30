USE commerceai;

-- ============================================
-- VIEW: Produtos disponíveis
-- ============================================

CREATE OR REPLACE VIEW vw_ProdutosDisponiveis AS
SELECT
    IdProduto,
    Nome,
    Descricao,
    Preco,
    Estoque,
    Categoria,
    CodigoBarras,
    SKU,
    DataCadastro,
    Ativo
FROM produtos
WHERE Ativo = TRUE
  AND Estoque > 0;


-- ============================================
-- VIEW: Estoque disponível
-- ============================================

CREATE OR REPLACE VIEW vw_EstoqueDisponivel AS
SELECT
    IdProduto,
    Nome,
    Categoria,
    Preco,
    Estoque
FROM produtos
WHERE Ativo = TRUE
  AND Estoque > 0;


-- ============================================
-- VIEW: Total gasto por cliente
-- ============================================

CREATE OR REPLACE VIEW vw_TotalGastoCliente AS
SELECT
    clientes.Nome AS Nome,
    SUM(itenscompra.Quantidade * itenscompra.PrecoUnitario) AS TotalGasto
FROM clientes
INNER JOIN compras
    ON clientes.IdCliente = compras.IdCliente
INNER JOIN itenscompra
    ON compras.IdCompra = itenscompra.IdCompra
GROUP BY
    clientes.IdCliente,
    clientes.Nome;