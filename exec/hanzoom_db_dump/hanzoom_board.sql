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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_no` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  `image_path` varchar(300) DEFAULT NULL,
  `like_cnt` bigint NOT NULL DEFAULT '0',
  `status` varchar(200) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `view_cnt` bigint NOT NULL DEFAULT '0',
  `user_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`board_no`),
  KEY `FKjcjievo961eg13ji6vvmdfm58` (`user_email`),
  CONSTRAINT `FKjcjievo961eg13ji6vvmdfm58` FOREIGN KEY (`user_email`) REFERENCES `user` (`user_email`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'저희집 동생이 자취하러 가서 냉동실에 닭 가슴살이 남아서 나눔 합니다. ㅎㅎ 연락주세요!','6d512a1c7a3e4961bd75e5e8b4049fd5.PNG',1,'거래전','닭 가슴살 나눔 합니다.','나눔',49,'hgi7201@naver.com'),(4,'배춧값이 올라서 포장 김치 3kg를 샀는데, 3인 가족이 먹기에 너무 많아서 나눔해요~^^ \n나눔은 상무지구 근처에서 할게요 채팅주세요~','56e6e01f34bd44f8bb2bf2b051ef5751.jpg',0,'거래중','홍진경 포장 김치 나눔해요~','나눔',34,'ehdgus2@naver.com'),(5,'시골에서 직접 재배한 오이입니다! 양이 너무 많아서 나눔해요.','6f5bb5fa77ab4feba747dffb602e1b92.jpg',0,'거래전','직접 재배한 오이 나눔해요~!','나눔',4,'bee1404@naver.com'),(6,'파스타를 좋아해서 면을 왕창 사두었더니 욕심이었네요ㅠㅠ\n여분 3개 정도 있으니, 근처에 사시는 분 연락주세요! 유통 기한은 널널해요','db53b3033d8145eea287d7a100833809.jfif',1,'거래전','오뚜기 프레스코 파스타 면 나눔해용','나눔',12,'ehdgus@naver.com'),(7,'체다치즈 코스트코에서 많이 사서 나눔합니다 ! 필요하신분 채팅주세요 ??','44d3dad20411453397fc4723957f4e6c.jpg',0,'거래전','체다치즈 나눔','나눔',12,'yoonjung1205@naver.com'),(8,'감자 교환신청해요!! 직접 수확한거라 상태 좋습니다 ㅎㅎ','d57b3225a6bc4cc59728d1c2ec23cbbb.png',0,'거래전','감자 교환 신청합니닷','교환',6,'bee1404@naver.com'),(10,'진라면 매운맛을 너무 많이 먹어서 다른 라면이랑 교환해요~\n짜파게티 대환영!','3fb45f3970604b99b93c70e0335090ff.jfif',0,'거래전','진라면이랑 다른 라면 교환할 분~','교환',8,'ehdgus@naver.com'),(12,'당도 만땅 포도입니다!! 다른 과일이랑 교환 희망해요~!','8dcef96384214b1298941031f2ea438f.jpg',0,'거래전','달달한 포도','교환',5,'bee1404@hanmail.net'),(13,'요즘 식용유 대란으로 구하기가 너무 어렵네요...\n나눔이나 교환하실 분 계실까요?\n언제든 채팅 주세요!!','need.jpg',0,'거래전','혹시 식용유 나눔, 교환하시는 분 계실까요...?','필요',18,'ehdgus2@naver.com'),(19,'주변 지인에게 달걀을 받았는대 혼자 먹기엔 너무 많이 남아서 \n10알 정도 나눔 합니다??','d5e44c8406f749519108e3d8a5c94afc.jpg',1,'거래전','달걀 10알 나눔 해요!!','나눔',21,'hgi7201@naver.com'),(20,'대파를 많이 사서 남습니다. 다른 식재료 가지고 계신 분 중에 교환 원하시는 분은 채팅 주세요!','12b19d2bb43c4a20a43a5d2ac1831369.jpg',0,'거래전','대파 있습니다~','나눔',14,'dongju@naver.com'),(22,'지인에게 감자를 받았는대 너무 많이 받아서 3알 정도 나눔해요!\n??','c1dae034162b4294a9e46f1b700d36a0.png',0,'거래전','감자 3알 나눔 합니다','나눔',3,'hgi7201@naver.com'),(23,'감, 귤, 청포도 가지고 있습니다. 다른 과일 가지고 계신 분 중에 교환하실 분은 채팅 주세요~','319b24ba317344d1a44c3f2813dc883d.jpg',0,'거래중','과일끼리 교환하실 분 계신가요~?','교환',67,'dongju@naver.com'),(24,'집들이 선물로 참기름을 너무 많이 받아서 나눔해요~\n사상, 주례에서 나눔할께요 고소한 하루 되세요~','05f0ac9d16dc4870bf4dc7ed32357e40.jfif',0,'거래전','참기름 나눔해요~','나눔',34,'ehdgus1@naver.com'),(27,'평소에 딸기 스무디를 집에서 해 먹기 때문에 많이 사서 냉동실에 봉지에 싸서 저장해 두는 대 냉동실에 자리가 부족해서 딸기 \'한 바구니\' 나눔해요. \n냉동실에 비닐 씌어져 있어서 싱싱합니다^^??','994b9dd3d7694a84aacf3dc6c7af1080.jpg',0,'거래중','딸기 나눔해요 !!','나눔',17,'choon72001@gmail.com'),(36,'포기김치 필요하신 분 연락주세요~!','2a9db0c86ef8401c84e98941700f606f.png',0,'거래전','농협아름찬 포기김치 나눔합니다.','나눔',10,'seoul@naver.com'),(37,'김치사려고하니 제가 곧 장기여행을 떠날예정이라서 그러기에는 너무 양이 많더라구요 ㅠㅠ 혹시나해서 글남겨봅니다! 여유분있으신분 계신가요???‍♀️','need.jpg',0,'거래전','김치구해요!','필요',11,'yoonjung1205@naver.com'),(44,'다이어트를 하고 있는 중이라 당분간 튀김해 먹을 일이 없을 것 같아 나눔 해요 ㅎㅎ??','7e36bbeac7a942f8ac9ae98b6b2f8d04.jpg',2,'거래전','튀김가루 새거 나눔 합니다.','나눔',15,'choon72001@gmail.com'),(55,'주말에 미국으로 여행가서 식재료를 구매하기가 곤란해서 급히 구해봅니다 감자혹시 여유분 있으신분?? ?‍♀️?‍♀️','need.jpg',0,'거래전','감자 구해봅니다!','필요',18,'yoonjung1205@naver.com'),(59,'부모님 과수원에서 딴 사과에요! 많이 남아서 교환하고 싶은데 관심있으신분 계실까요 ??','2798d8d170c94e3b88fffc1297d1ce00.jpg',0,'거래중','사과 교환하실분!','교환',23,'yoonjung1205@naver.com'),(63,'백종원 레시피 보고 김치 볶음밥을 해 먹고 싶은대 그렇다고 요리를 할 시간이 잘 없어서, 하나를 통채로 사기엔 너무 많아서 조금만 나눠 주실분!!! ㅠㅠ','need.jpg',0,'거래전','진간장 조금만 나눔해 주실분 계신가여??','필요',23,'ssafy@naver.com'),(64,'무생채 이번에 집에서 많이 만들어서 혹시 교환 아무거나 괜찮으니 하실분?? ','13b69222abae4d7581ad36fe429144aa.jpg',1,'거래중','무생채랑 교환하실분??','교환',19,'ssafy@naver.com'),(65,'저희 외가에서 직접 수확한 달걀이에요! 많이 가지고 있어서 나눔하려합니다 ㅎㅎ 연락주세요!!','ef0e28f7fc374b709b4ff556b308d9b6.jpg',1,'거래전','최근 수확한 달걀!','나눔',25,'yoonjung1205@naver.com'),(66,'고구마를 많이 사서 나눔합니다~ 연락주세요!','bf0132ef563949dd8b059048e24e9e16.jfif',1,'거래전','고구마 나눔합니다!','나눔',60,'hanzoom@naver.com'),(67,'오뚜기 옛날 국수 소면 나눔해요!\n유통기한은 널널하네요 연락주세요~','852678dd058f4fd69ea689587aa88b08.jfif',0,'거래전','소면 나눔해요!','나눔',14,'ehdgus1@naver.com'),(68,'남편이 순창 고추장이랑 헷갈려 해찬들껄 사왔더라구요\n혹시 순창 고추장이랑 교환하실분 계시나요~~?\n연락주세용!','9bdd90f7aafd4f2c95c9e8179b0a4fe3.jfif',1,'거래전','[해찬들] 태양초 고추장 교환해요ㅠㅠ','교환',16,'ehdgus3@naver.com'),(69,'오이가 너무 많아서 나눔받으실 분 계신가요?','8dfda20ee3074c1abed7cff93dfd635f.jpg',0,'거래전','오이 나눔합니다~','나눔',2,'dongju@naver.com'),(70,'양파 가져가실 분 채팅 주세요~','ed82d0ccec784670b12a4c415ae539cd.jpg',0,'거래전','양파가 너무 많습니다. 가져가실 분?','나눔',9,'dongju@naver.com'),(71,'주말농장에서 직접 재배한 당근!! 달달한게 맛있더라고요. 생각보다 많이 심어서 여유분이 남는데 교환 신청합니다 ㅎㅎ','fc0140c050794f6eaa026de3be17c615.jpg',2,'거래전','당근 교환신청합니다!','교환',9,'bee1404@naver.com'),(72,'참기름을 친척에게 이번에 너무 많이 받아서 한 병 나눔 합니다. \n계속해서 매섭게 참기름 쏘겠습니다.','7300ed285c8e4892ad5ec875e8bd2f94.jpg',0,'거래전','참기름 나눔 합니데이!','나눔',5,'ssafy@naver.com'),(76,'당근 필요하신 분 채팅주세요.','32d7b4ed31114349b2981c7cf22925bf.jpg',0,'거래전','당근으로 아무 식재료 구해봅니다.','교환',9,'dongju@naver.com'),(77,'곰표에서 나온 소면이래요~ 전 국수를 안좋아해서 필요하시분 가져가세요! ','99e77892411346448b0bdde679e84c38.jfif',3,'거래전','곰표에서 나온 소면 나눔해요~!','나눔',16,'ehdgus3@naver.com'),(78,'매실액 이번에 지인이 많이 샀다고 저에게 많이 줬는대 너무 많아서 아무 식재료와 교환 가능합니다^^ 편하게 연락주세요.','493013e1eed24e21a1dcab5f00df5e81.jpg',1,'거래전','매실액이랑 교환하실분!','교환',5,'roly@naver.com'),(80,'당근 나눔 합니다!','4ab0e108faef4b7e9d82a9245abb6780.jpg',1,'거래전','당근 나눔 !','나눔',12,'yoonjung1205@naver.com');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:06:03
