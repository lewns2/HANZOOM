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
-- Table structure for table `like_list`
--

DROP TABLE IF EXISTS `like_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_list` (
  `like_no` bigint NOT NULL AUTO_INCREMENT,
  `board_no` bigint DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`like_no`),
  KEY `FKbhn87b8a3kfd7nq3ucrxv2x1x` (`board_no`),
  KEY `FKakxp85ufcjabqbh5smbqgke7u` (`user_email`),
  CONSTRAINT `FKakxp85ufcjabqbh5smbqgke7u` FOREIGN KEY (`user_email`) REFERENCES `user` (`user_email`) ON DELETE CASCADE,
  CONSTRAINT `FKbhn87b8a3kfd7nq3ucrxv2x1x` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_list`
--

LOCK TABLES `like_list` WRITE;
/*!40000 ALTER TABLE `like_list` DISABLE KEYS */;
INSERT INTO `like_list` VALUES (1,6,'bee1404@naver.com'),(2,1,'ssafy@naver.com'),(3,19,'ehdgus1@naver.com'),(4,44,'hanzoom@naver.com'),(5,44,'bee1404@naver.com'),(6,68,'ehdgus1@naver.com'),(7,66,'ehdgus1@naver.com'),(8,65,'hanzoom@naver.com'),(9,64,'hanzoom@naver.com'),(10,77,'ehdgus1@naver.com'),(11,71,'ehdgus1@naver.com'),(12,77,'ehdgus@naver.com'),(13,71,'ehdgus@naver.com'),(14,77,'yoonjung1205@naver.com'),(15,78,'bee1404@naver.com'),(18,80,'ehdgus1@naver.com');
/*!40000 ALTER TABLE `like_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:06:04
