USE commerceai;

CREATE TABLE clientes (
    IdCliente INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(150) DEFAULT NULL,
    Telefone VARCHAR(20) DEFAULT NULL,
    DataCadastro DATE DEFAULT (CURDATE()),
    Status ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO',
    PRIMARY KEY (IdCliente),
    UNIQUE KEY (Email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE produtos (
    IdProduto INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(150) NOT NULL,
    Descricao VARCHAR(300) DEFAULT NULL,
    Preco DECIMAL(10,2) NOT NULL,
    Estoque INT NOT NULL,
    Categoria VARCHAR(50) DEFAULT NULL,
    CodigoBarras VARCHAR(30) DEFAULT NULL,
    SKU VARCHAR(20) DEFAULT NULL,
    DataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    Ativo TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (IdProduto),
    UNIQUE KEY (CodigoBarras),
    UNIQUE KEY (SKU)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE compras (
    IdCompra INT NOT NULL AUTO_INCREMENT,
    IdCliente INT NOT NULL,
    DataCompra DATETIME DEFAULT CURRENT_TIMESTAMP,
    ValorTotal DECIMAL(10,2) DEFAULT NULL,
    Status ENUM('PENDENTE', 'PAGO', 'CANCELADO') DEFAULT 'PENDENTE',
    PRIMARY KEY (IdCompra),
    KEY (IdCliente),
    CONSTRAINT fk_compras_cliente
        FOREIGN KEY (IdCliente)
        REFERENCES clientes (IdCliente)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE itenscompra (
    IdItem INT NOT NULL AUTO_INCREMENT,
    IdCompra INT NOT NULL,
    IdProduto INT NOT NULL,
    Quantidade INT NOT NULL,
    PrecoUnitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (IdItem),
    KEY (IdCompra),
    KEY (IdProduto),
    CONSTRAINT fk_itenscompra_compra
        FOREIGN KEY (IdCompra)
        REFERENCES compras (IdCompra),
    CONSTRAINT fk_itenscompra_produto
        FOREIGN KEY (IdProduto)
        REFERENCES produtos (IdProduto)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE movimentacaoestoque (
    IdMovimentacao INT NOT NULL AUTO_INCREMENT,
    IdProduto INT NOT NULL,
    TipoMovimentacao VARCHAR(20) NOT NULL,
    Quantidade INT NOT NULL,
    DataMovimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (IdMovimentacao),
    KEY (IdProduto),
    CONSTRAINT fk_movimentacao_produto
        FOREIGN KEY (IdProduto)
        REFERENCES produtos (IdProduto)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;