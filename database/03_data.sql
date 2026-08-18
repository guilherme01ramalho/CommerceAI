USE commerceai;

SET NAMES utf8mb4;
-- =========================
-- CLIENTES
-- =========================

INSERT INTO clientes
    (IdCliente, Nome, Email, Telefone, DataCadastro, Status)
VALUES
    (1, 'Guilherme', 'guilherme0castro@gmail.com', '11995682231', '2026-07-28', 'ATIVO'),
    (2, 'Giovanna', 'giovanna0castro@gmail.com', '11995682969', '2026-07-28', 'ATIVO'),
    (3, 'João Silva', 'joao.silva@email.com', '11990000001', '2026-07-28', 'ATIVO'),
    (4, 'Maria Oliveira', 'maria.oliveira@email.com', '11990000002', '2026-07-28', 'ATIVO'),
    (5, 'Carlos Santos', 'carlos.santos@email.com', '11990000003', '2026-07-28', 'ATIVO'),
    (6, 'Ana Pereira', 'ana.pereira@email.com', '11990000004', '2026-07-28', 'ATIVO'),
    (7, 'Lucas Ferreira', 'lucas.ferreira@email.com', '11990000005', '2026-07-28', 'ATIVO'),
    (8, 'Fernanda Costa', 'fernanda.costa@email.com', '11990000006', '2026-07-28', 'ATIVO'),
    (9, 'Ricardo Almeida', 'ricardo.almeida@email.com', '11990000007', '2026-07-28', 'ATIVO'),
    (10, 'Juliana Rocha', 'juliana.rocha@email.com', '11990000008', '2026-07-28', 'ATIVO'),
    (11, 'Bruno Lima', 'bruno.lima@email.com', '11990000009', '2026-07-28', 'ATIVO'),
    (12, 'Patrícia Gomes', 'patricia.gomes@email.com', '11990000010', '2026-07-28', 'ATIVO');


-- =========================
-- PRODUTOS
-- =========================

INSERT INTO produtos
    (IdProduto, Nome, Descricao, Preco, Estoque, Categoria, CodigoBarras, SKU, DataCadastro, Ativo)
VALUES
    (1, 'Dell Pro 14', 'Intel Core i5 11ª Geração, 16GB RAM, SSD 475GB', 5670.00, 130, 'NOTEBOOK', 'NTB0001', 'COM-NTB-0001', '2026-07-30 17:15:41', 0),
    (2, 'Lenovo ThinkPad T470', 'Intel Core i5 7ª Geração, 8GB RAM, SSD 480GB', 3402.00, 80, 'NOTEBOOK', 'NTB0002', 'COM-NTB-0002', '2026-07-30 17:15:41', 1),
    (3, 'ASUS Vivobook Go 15', 'AMD Ryzen 5 5500U, 16GB RAM, SSD 512GB', 3984.88, 230, 'NOTEBOOK', 'NTB0003', 'COM-NTB-0003', '2026-07-30 17:15:41', 1),
    (4, 'Monitor Dell 22" Full HD', 'Tela 21,5", resolução Full HD 1920x1080, antirreflexo', 579.00, 230, 'MONITOR', 'MON0001', 'COM-MON-0001', '2026-07-30 17:15:41', 1),
    (5, 'Monitor Acer CB242Y 23.8"', 'Tela IPS 23,8", resolução Full HD', 841.60, 170, 'MONITOR', 'MON0002', 'COM-MON-0002', '2026-07-30 17:15:41', 1),
    (6, 'Logitech MX Keys S', 'Teclado sem fio Bluetooth, layout ABNT2, cor cinza', 670.67, 180, 'PERIFERICO', 'PER0001', 'COM-PER-0001', '2026-07-30 17:15:41', 1),
    (7, 'Headset Redragon Zeus Pro', 'Headset Gamer sem fio 7.1 H510-PRO', 352.73, 230, 'PERIFERICO', 'PER0002', 'COM-PER-0002', '2026-07-30 17:15:41', 1),
    (8, 'Switch Intelbras S1116G', 'Switch Gigabit de 16 portas para rack padrão 19"', 493.00, 230, 'REDE', 'RED0001', 'COM-RED-0001', '2026-07-30 17:15:41', 1),
    (9, 'Roteador TP-Link Archer BE550', 'Wi-Fi 7 Tri-Band BE9300 com EasyMesh', 1599.00, 130, 'REDE', 'RED0002', 'COM-RED-0002', '2026-07-30 17:15:41', 1),
    (10, 'SSD Kingston A400 960GB', 'SSD SATA III 2,5" de 960GB', 769.90, 50, 'ARMAZENAMENTO', 'ARM0001', 'COM-ARM-0001', '2026-07-30 17:15:41', 1);


-- =========================
-- COMPRAS
-- =========================

INSERT INTO compras
    (IdCompra, IdCliente, DataCompra, ValorTotal, Status)
VALUES
    (1, 1, '2026-07-30 15:04:28', NULL, 'PENDENTE'),
    (2, 1, '2026-07-30 17:18:02', NULL, 'PENDENTE'),
    (3, 2, '2026-07-30 18:14:42', NULL, 'PENDENTE'),
    (4, 3, '2026-07-30 18:20:03', NULL, 'PENDENTE');


-- =========================
-- ITENS DAS COMPRAS
-- =========================

INSERT INTO itenscompra
    (IdItem, IdCompra, IdProduto, Quantidade, PrecoUnitario)
VALUES
    (1, 1, 3, 2, 3514.00),
    (2, 2, 6, 1, 689.99),
    (4, 3, 7, 5, 326.60),
    (7, 4, 10, 2, 769.90);