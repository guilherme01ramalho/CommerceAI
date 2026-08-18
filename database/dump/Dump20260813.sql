CREATE DATABASE  IF NOT EXISTS `dbenterprise` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbenterprise`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: dbenterprise
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `IdCliente` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `DataCadastro` date DEFAULT (curdate()),
  `Status` enum('ATIVO','INATIVO') DEFAULT 'ATIVO',
  PRIMARY KEY (`IdCliente`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Guilherme','guilherme0castro@gmail.com','11995682231','2026-07-28','ATIVO'),(2,'Giovanna','giovanna0castro@gmail.com','11995682969','2026-07-28','ATIVO'),(3,'João Silva','joao.silva@email.com','11990000001','2026-07-28','ATIVO'),(4,'Maria Oliveira','maria.oliveira@email.com','11990000002','2026-07-28','ATIVO'),(5,'Carlos Santos','carlos.santos@email.com','11990000003','2026-07-28','ATIVO'),(6,'Ana Pereira','ana.pereira@email.com','11990000004','2026-07-28','ATIVO'),(7,'Lucas Ferreira','lucas.ferreira@email.com','11990000005','2026-07-28','ATIVO'),(8,'Fernanda Costa','fernanda.costa@email.com','11990000006','2026-07-28','ATIVO'),(9,'Ricardo Almeida','ricardo.almeida@email.com','11990000007','2026-07-28','ATIVO'),(10,'Juliana Rocha','juliana.rocha@email.com','11990000008','2026-07-28','ATIVO'),(11,'Bruno Lima','bruno.lima@email.com','11990000009','2026-07-28','ATIVO'),(12,'Patrícia Gomes','patricia.gomes@email.com','11990000010','2026-07-28','ATIVO');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `IdCompra` int NOT NULL AUTO_INCREMENT,
  `IdCliente` int NOT NULL,
  `DataCompra` datetime DEFAULT CURRENT_TIMESTAMP,
  `ValorTotal` decimal(10,2) DEFAULT NULL,
  `Status` enum('PENDENTE','PAGO','CANCELADO') DEFAULT 'PENDENTE',
  PRIMARY KEY (`IdCompra`),
  KEY `IdCliente` (`IdCliente`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`IdCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,1,'2026-07-30 15:04:28',NULL,'PENDENTE'),(2,1,'2026-07-30 17:18:02',NULL,'PENDENTE'),(3,2,'2026-07-30 18:14:42',NULL,'PENDENTE'),(4,3,'2026-07-30 18:20:03',NULL,'PENDENTE');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itenscompra`
--

DROP TABLE IF EXISTS `itenscompra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itenscompra` (
  `IdItem` int NOT NULL AUTO_INCREMENT,
  `IdCompra` int NOT NULL,
  `IdProduto` int NOT NULL,
  `Quantidade` int NOT NULL,
  `PrecoUnitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdItem`),
  KEY `IdCompra` (`IdCompra`),
  KEY `IdProduto` (`IdProduto`),
  CONSTRAINT `itenscompra_ibfk_1` FOREIGN KEY (`IdCompra`) REFERENCES `compras` (`IdCompra`),
  CONSTRAINT `itenscompra_ibfk_2` FOREIGN KEY (`IdProduto`) REFERENCES `produtos` (`IdProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itenscompra`
--

LOCK TABLES `itenscompra` WRITE;
/*!40000 ALTER TABLE `itenscompra` DISABLE KEYS */;
INSERT INTO `itenscompra` VALUES (1,1,3,2,3514.00),(2,2,6,1,689.99),(4,3,7,5,326.60),(7,4,10,2,769.90);
/*!40000 ALTER TABLE `itenscompra` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_ValidarEstoque` BEFORE INSERT ON `itenscompra` FOR EACH ROW BEGIN

    DECLARE estoqueAtual INT;

    SELECT Estoque
    INTO estoqueAtual
    FROM Produtos
    WHERE IdProduto = NEW.IdProduto;

    IF estoqueAtual < NEW.Quantidade THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente para realizar a compra';

    ELSE

        UPDATE Produtos
        SET Estoque = Estoque - NEW.Quantidade
        WHERE IdProduto = NEW.IdProduto;

        INSERT INTO MovimentacaoEstoque
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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `movimentacaoestoque`
--

DROP TABLE IF EXISTS `movimentacaoestoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimentacaoestoque` (
  `IdMovimentacao` int NOT NULL AUTO_INCREMENT,
  `IdProduto` int NOT NULL,
  `TipoMovimentacao` varchar(20) NOT NULL,
  `Quantidade` int NOT NULL,
  `DataMovimentacao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdMovimentacao`),
  KEY `IdProduto` (`IdProduto`),
  CONSTRAINT `movimentacaoestoque_ibfk_1` FOREIGN KEY (`IdProduto`) REFERENCES `produtos` (`IdProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimentacaoestoque`
--

LOCK TABLES `movimentacaoestoque` WRITE;
/*!40000 ALTER TABLE `movimentacaoestoque` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimentacaoestoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `IdProduto` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(150) NOT NULL,
  `Descricao` varchar(300) DEFAULT NULL,
  `Preco` decimal(10,2) NOT NULL,
  `Estoque` int NOT NULL,
  `Categoria` varchar(50) DEFAULT NULL,
  `CodigoBarras` varchar(30) DEFAULT NULL,
  `SKU` varchar(20) DEFAULT NULL,
  `DataCadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  `Ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdProduto`),
  UNIQUE KEY `CodigoBarras` (`CodigoBarras`),
  UNIQUE KEY `SKU` (`SKU`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Dell Pro 14','Intel Core i5 11ª Geração, 16GB RAM, SSD 475GB',5670.00,130,'NOTEBOOK','NTB0001','COM-NTB-0001','2026-07-30 17:15:41',0),(2,'Lenovo ThinkPad T470','Intel Core i5 7ª Geração, 8GB RAM, SSD 480GB',3402.00,80,'NOTEBOOK','NTB0002','COM-NTB-0002','2026-07-30 17:15:41',1),(3,'ASUS Vivobook Go 15','AMD Ryzen 5 5500U, 16GB RAM, SSD 512GB',3984.88,230,'NOTEBOOK','NTB0003','COM-NTB-0003','2026-07-30 17:15:41',1),(4,'Monitor Dell 22\" Full HD','Tela 21,5\", resolução Full HD 1920x1080, antirreflexo',579.00,230,'MONITOR','MON0001','COM-MON-0001','2026-07-30 17:15:41',1),(5,'Monitor Acer CB242Y 23.8\"','Tela IPS 23,8\", resolução Full HD',841.60,170,'MONITOR','MON0002','COM-MON-0002','2026-07-30 17:15:41',1),(6,'Logitech MX Keys S','Teclado sem fio Bluetooth, layout ABNT2, cor cinza',670.67,180,'PERIFERICO','PER0001','COM-PER-0001','2026-07-30 17:15:41',1),(7,'Headset Redragon Zeus Pro','Headset Gamer sem fio 7.1 H510-PRO',352.73,230,'PERIFERICO','PER0002','COM-PER-0002','2026-07-30 17:15:41',1),(8,'Switch Intelbras S1116G','Switch Gigabit de 16 portas para rack padrão 19\"',493.00,230,'REDE','RED0001','COM-RED-0001','2026-07-30 17:15:41',1),(9,'Roteador TP-Link Archer BE550','Wi-Fi 7 Tri-Band BE9300 com EasyMesh',1599.00,130,'REDE','RED0002','COM-RED-0002','2026-07-30 17:15:41',1),(10,'SSD Kingston A400 960GB','SSD SATA III 2,5\" de 960GB',769.90,50,'ARMAZENAMENTO','ARM0001','COM-ARM-0001','2026-07-30 17:15:41',1);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_estoquedisponivel`
--

DROP TABLE IF EXISTS `vw_estoquedisponivel`;
/*!50001 DROP VIEW IF EXISTS `vw_estoquedisponivel`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_estoquedisponivel` AS SELECT 
 1 AS `IdProduto`,
 1 AS `Nome`,
 1 AS `Categoria`,
 1 AS `Preco`,
 1 AS `Estoque`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_produtosdisponiveis`
--

DROP TABLE IF EXISTS `vw_produtosdisponiveis`;
/*!50001 DROP VIEW IF EXISTS `vw_produtosdisponiveis`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_produtosdisponiveis` AS SELECT 
 1 AS `IdProduto`,
 1 AS `Nome`,
 1 AS `Descricao`,
 1 AS `Preco`,
 1 AS `Estoque`,
 1 AS `Categoria`,
 1 AS `CodigoBarras`,
 1 AS `SKU`,
 1 AS `DataCadastro`,
 1 AS `Ativo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_totalgastocliente`
--

DROP TABLE IF EXISTS `vw_totalgastocliente`;
/*!50001 DROP VIEW IF EXISTS `vw_totalgastocliente`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_totalgastocliente` AS SELECT 
 1 AS `nome`,
 1 AS `TotalGasto`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_estoquedisponivel`
--

/*!50001 DROP VIEW IF EXISTS `vw_estoquedisponivel`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_estoquedisponivel` AS select `produtos`.`IdProduto` AS `IdProduto`,`produtos`.`Nome` AS `Nome`,`produtos`.`Categoria` AS `Categoria`,`produtos`.`Preco` AS `Preco`,`produtos`.`Estoque` AS `Estoque` from `produtos` where ((`produtos`.`Ativo` = true) and (`produtos`.`Estoque` > 0)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_produtosdisponiveis`
--

/*!50001 DROP VIEW IF EXISTS `vw_produtosdisponiveis`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_produtosdisponiveis` AS select `produtos`.`IdProduto` AS `IdProduto`,`produtos`.`Nome` AS `Nome`,`produtos`.`Descricao` AS `Descricao`,`produtos`.`Preco` AS `Preco`,`produtos`.`Estoque` AS `Estoque`,`produtos`.`Categoria` AS `Categoria`,`produtos`.`CodigoBarras` AS `CodigoBarras`,`produtos`.`SKU` AS `SKU`,`produtos`.`DataCadastro` AS `DataCadastro`,`produtos`.`Ativo` AS `Ativo` from `produtos` where ((`produtos`.`Ativo` = true) and (`produtos`.`Estoque` > 0)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_totalgastocliente`
--

/*!50001 DROP VIEW IF EXISTS `vw_totalgastocliente`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_totalgastocliente` AS select `clientes`.`Nome` AS `nome`,sum((`itenscompra`.`Quantidade` * `itenscompra`.`PrecoUnitario`)) AS `TotalGasto` from ((`clientes` join `compras` on((`clientes`.`IdCliente` = `compras`.`IdCliente`))) join `itenscompra` on((`compras`.`IdCompra` = `itenscompra`.`IdCompra`))) group by `clientes`.`Nome`,`clientes`.`IdCliente` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-13 14:31:25
