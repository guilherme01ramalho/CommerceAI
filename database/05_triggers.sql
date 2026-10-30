USE commerceai;

-- ============================================
-- TRIGGER: Validação e movimentação de estoque
-- ============================================

DELIMITER $$

CREATE TRIGGER trg_ValidarEstoque
BEFORE INSERT ON itenscompra
FOR EACH ROW
BEGIN

    DECLARE estoqueAtual INT;

    SELECT Estoque
    INTO estoqueAtual
    FROM produtos
    WHERE IdProduto = NEW.IdProduto;

    IF estoqueAtual < NEW.Quantidade THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente para realizar a compra';

    ELSE

        UPDATE produtos
        SET Estoque = Estoque - NEW.Quantidade
        WHERE IdProduto = NEW.IdProduto;

        INSERT INTO movimentacaoestoque
        (
            IdProduto,
            TipoMovimentacao,
            Quantidade
        )
        VALUES
        (
            NEW.IdProduto,
            'SAIDA',
            NEW.Quantidade
        );

    END IF;

END$$

DELIMITER ;