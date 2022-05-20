-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: k6e103.p.ssafy.io    Database: hanzoom
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `user_ingredient`
--

DROP TABLE IF EXISTS `user_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ingredient` (
  `user_ingredient_no` bigint NOT NULL AUTO_INCREMENT,
  `board_no` bigint DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `ingredient_no` bigint DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_ingredient_no`),
  KEY `FKpb1p0af23s3q2hqa93k1fu1w0` (`ingredient_no`),
  KEY `FKbsx866s999q5mxb068ivo0ied` (`user_email`),
  CONSTRAINT `FKbsx866s999q5mxb068ivo0ied` FOREIGN KEY (`user_email`) REFERENCES `user` (`user_email`) ON DELETE CASCADE,
  CONSTRAINT `FKpb1p0af23s3q2hqa93k1fu1w0` FOREIGN KEY (`ingredient_no`) REFERENCES `ingredient` (`ingredient_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ingredient`
--

LOCK TABLES `user_ingredient` WRITE;
/*!40000 ALTER TABLE `user_ingredient` DISABLE KEYS */;
INSERT INTO `user_ingredient` VALUES (1,1,'2022-05-20','2022-04-19','나눔',2627,'hgi7201@naver.com'),(2,7,'2022-10-22',NULL,'나눔',996,'yoonjung1205@naver.com'),(3,65,'2022-05-22','2022-05-15','나눔',588,'yoonjung1205@naver.com'),(4,NULL,'2022-05-24','2022-05-17','일반',92,'yoonjung1205@naver.com'),(5,20,'2022-05-23','2022-05-18','나눔',1855,'dongju@naver.com'),(6,4,'2022-06-09','2022-05-09','나눔',2244,'ehdgus2@naver.com'),(9,5,'2022-05-23','2022-05-17','나눔',433,'bee1404@naver.com'),(10,NULL,NULL,NULL,'교환/나눔',841,'yoonjung1205@naver.com'),(11,6,'2022-11-30','2022-05-17','나눔',338,'ehdgus@naver.com'),(12,8,'2022-05-27','2022-05-16','교환',1404,'bee1404@naver.com'),(13,10,NULL,'2022-05-10','교환',81,'ehdgus@naver.com'),(14,59,NULL,'2022-05-14','교환',1744,'yoonjung1205@naver.com'),(15,22,'2022-05-23','2022-05-16','나눔',1404,'hgi7201@naver.com'),(16,12,'2022-05-20','2022-05-16','교환',245,'bee1404@hanmail.net'),(17,13,NULL,NULL,'필요',1078,'ehdgus2@naver.com'),(18,NULL,NULL,NULL,'필요',1078,'ehdgus2@naver.com'),(19,19,'2022-05-31','2022-05-18','나눔',588,'hgi7201@naver.com'),(20,NULL,NULL,NULL,'일반',297,'ehdgus2@naver.com'),(21,NULL,'2022-05-18','2022-05-18','교환/나눔',297,'ehdgus2@naver.com'),(22,37,NULL,NULL,'필요',2244,'yoonjung1205@naver.com'),(24,NULL,NULL,NULL,'필요',297,'ehdgus2@naver.com'),(25,NULL,'2022-05-23','2022-05-16','일반',2967,'seoul@naver.com'),(26,36,NULL,'2022-05-10','나눔',2244,'seoul@naver.com'),(27,NULL,'2022-05-20','2022-05-17','일반',2967,'bee1404@hanmail.net'),(28,NULL,'2023-07-28','2022-05-09','일반',2244,'bee1404@hanmail.net'),(29,24,'2023-03-14','2021-05-30','나눔',1536,'ehdgus1@naver.com'),(30,23,'2022-05-25','2022-05-18','교환',248,'dongju@naver.com'),(31,23,'2022-05-25','2022-05-18','교환',2393,'dongju@naver.com'),(32,23,'2022-05-25','2022-05-18','교환',2345,'dongju@naver.com'),(33,NULL,'2023-08-12','2022-05-15','일반',2244,'bee1404@naver.com'),(34,NULL,'2022-05-20','2022-05-16','교환/나눔',2967,'bee1404@naver.com'),(35,27,'2022-06-01','2022-05-18','나눔',1090,'choon72001@gmail.com'),(36,NULL,NULL,NULL,'교환/나눔',886,'dongju@naver.com'),(40,NULL,'2022-05-27','2022-05-20','일반',60,'daeun503@naver.com'),(41,NULL,'2022-05-23','2022-05-19','일반',214,'daeun503@naver.com'),(42,NULL,NULL,NULL,'필요',361,'daeun503@naver.com'),(43,NULL,NULL,NULL,'필요',223,'daeun503@naver.com'),(45,NULL,NULL,NULL,'필요',2931,'choon72001@gmail.com'),(46,44,'2022-04-18','2022-07-18','나눔',2931,'choon72001@gmail.com'),(47,55,NULL,NULL,'필요',1404,'yoonjung1205@naver.com'),(48,NULL,NULL,NULL,'교환/나눔',1215,'dongju@naver.com'),(49,NULL,NULL,NULL,'필요',1215,'dongju@naver.com'),(51,NULL,NULL,NULL,'필요',2925,'seoul@naver.com'),(52,63,NULL,NULL,'필요',133,'ssafy@naver.com'),(53,NULL,NULL,NULL,'교환/나눔',2244,'ehdgus1@naver.com'),(54,NULL,NULL,'2022-04-04','일반',1536,'seoul@naver.com'),(55,NULL,NULL,NULL,'필요',1688,'hgi7201@naver.com'),(56,NULL,NULL,NULL,'필요',2117,'hgi7201@naver.com'),(57,NULL,NULL,NULL,'필요',1744,'hgi7201@naver.com'),(58,NULL,'2022-05-23','2022-05-16','교환/나눔',2896,'hgi7201@naver.com'),(59,NULL,'2022-05-26','2022-05-18','교환/나눔',75,'hgi7201@naver.com'),(60,NULL,'2022-05-23','2022-05-17','일반',2710,'hgi7201@naver.com'),(61,NULL,'2022-08-26','2022-05-17','일반',2244,'hgi7201@naver.com'),(63,NULL,NULL,'2022-05-12','일반',1238,'seoul@naver.com'),(64,NULL,NULL,NULL,'일반',1855,'hgi7201@naver.com'),(65,NULL,'2022-05-24','2022-05-10','일반',588,'seoul@naver.com'),(66,NULL,NULL,'2022-05-10','일반',245,'seoul@naver.com'),(67,NULL,'2022-10-21','2022-05-16','일반',1536,'bee1404@naver.com'),(68,NULL,'2022-05-20','2022-05-16','교환/나눔',588,'bee1404@naver.com'),(69,64,'2022-06-17','2022-05-17','교환',421,'ssafy@naver.com'),(70,69,'2022-05-30','2022-05-18','나눔',433,'dongju@naver.com'),(73,NULL,'2022-06-04','2022-05-19','교환/나눔',297,'ehdgus1@naver.com'),(74,NULL,'2022-06-04','2022-05-19','교환/나눔',78,'ehdgus1@naver.com'),(76,NULL,'2022-06-04','2022-05-19','일반',433,'ehdgus1@naver.com'),(77,70,'2022-06-02','2022-05-18','나눔',2896,'dongju@naver.com'),(78,76,'2022-05-26','2022-05-12','교환',1479,'dongju@naver.com'),(79,NULL,'2022-05-26','2022-05-19','일반',1855,'dongju@naver.com'),(85,NULL,'2022-06-04','2022-05-19','일반',2896,'ehdgus1@naver.com'),(87,NULL,'2022-05-25','2022-05-11','일반',433,'hanzoom@naver.com'),(88,NULL,NULL,'2022-05-17','교환/나눔',245,'hanzoom@naver.com'),(89,NULL,NULL,'2022-05-18','일반',2896,'hanzoom@naver.com'),(90,66,NULL,'2022-05-17','나눔',2710,'hanzoom@naver.com'),(91,NULL,NULL,'2022-05-18','교환/나눔',75,'hanzoom@naver.com'),(92,NULL,NULL,'2022-05-16','일반',1090,'hanzoom@naver.com'),(93,NULL,NULL,NULL,'필요',1688,'hanzoom@naver.com'),(94,NULL,NULL,NULL,'필요',2117,'hanzoom@naver.com'),(95,NULL,NULL,NULL,'필요',1744,'hanzoom@naver.com'),(100,67,NULL,'2022-05-01','나눔',2899,'ehdgus1@naver.com'),(101,68,'2023-08-22',NULL,'교환',716,'ehdgus3@naver.com'),(102,NULL,NULL,NULL,'일반',2896,'lewns2002@naver.com'),(103,NULL,NULL,NULL,'일반',1404,'lewns2002@naver.com'),(105,NULL,NULL,NULL,'일반',433,'lewns2002@naver.com'),(109,NULL,NULL,NULL,'필요',370,'yoonjung1205@naver.com'),(110,NULL,'2022-06-09',NULL,'일반',1564,'yoonjung1205@naver.com'),(114,71,'2022-05-20','2022-05-16','교환',1479,'bee1404@naver.com'),(115,72,NULL,'2022-05-17','나눔',1536,'ssafy@naver.com'),(116,77,NULL,'2022-04-05','나눔',2899,'ehdgus3@naver.com'),(117,78,NULL,'2022-05-16','교환',840,'roly@naver.com'),(122,NULL,NULL,NULL,'일반',433,'ehdgus3@naver.com'),(123,NULL,NULL,NULL,'일반',2896,'ehdgus3@naver.com'),(130,NULL,NULL,'2022-05-19','일반',779,'ehdgus1@naver.com'),(132,80,'2022-05-25','2022-05-18','나눔',1479,'yoonjung1205@naver.com'),(135,NULL,NULL,NULL,'필요',588,'ehdgus1@naver.com'),(136,NULL,NULL,NULL,'필요',17,'ehdgus1@naver.com'),(137,NULL,NULL,NULL,'필요',297,'ehdgus1@naver.com'),(138,NULL,NULL,'2022-05-11','일반',2244,'dongju@naver.com');
/*!40000 ALTER TABLE `user_ingredient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:06:02
