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


