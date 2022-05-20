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
-- Table structure for table `user_report_history`
--

DROP TABLE IF EXISTS `user_report_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_report_history` (
  `report_no` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(600) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `reported` varchar(100) NOT NULL,
  `reporter` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT '대기',
  PRIMARY KEY (`report_no`),
  KEY `FK5f4c93nejp7let0dfx5kp26n1` (`reporter`),
  CONSTRAINT `FK5f4c93nejp7let0dfx5kp26n1` FOREIGN KEY (`reporter`) REFERENCES `user` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_report_history`
--

LOCK TABLES `user_report_history` WRITE;
/*!40000 ALTER TABLE `user_report_history` DISABLE KEYS */;
INSERT INTO `user_report_history` VALUES (1,'비매너 유저 신고합니다!! 너무 막무가네로 교환 물품을 요청하더라고요ㅠㅠ','2022-05-19 14:34:49.488320','yoonjung1205@naver.com','bee1404@naver.com','대기'),(2,'닭가슴살이... 상했더라고요.. 상한음식을 확인안한채로 주시더라고요ㅠㅠ','2022-05-19 14:35:49.799786','hgi7201@naver.com','bee1404@naver.com','승인'),(3,'닭가슴살이... 상했더라고요... 상한음식을 확인안한채로 주시더라고요ㅠㅠ','2022-05-19 21:45:42.595760','hgi7201@naver.com','bee1404@naver.com','대기'),(4,'닭가슴살이... 상했더라고요... 상한음식을 확인안한채로 주시더라고요ㅠㅠ','2022-05-19 22:46:39.079021','hgi7201@naver.com','bee1404@naver.com','대기');
/*!40000 ALTER TABLE `user_report_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:05:56
