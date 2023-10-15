-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: charitydb
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new`
--

DROP TABLE IF EXISTS `new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new` (
  `category_id` bigint DEFAULT NULL,
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq8f93g3qb6fi7c2fd6vvbhitl` (`category_id`),
  CONSTRAINT `FKq8f93g3qb6fi7c2fd6vvbhitl` FOREIGN KEY (`category_id`) REFERENCES `new_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new`
--

LOCK TABLES `new` WRITE;
/*!40000 ALTER TABLE `new` DISABLE KEYS */;
INSERT INTO `new` VALUES (1,'2023-10-15 18:44:16.826000',1,'Từ ngày 5/6/2023 Quán Yên Vui Ninh Kiều – Cần Thơ chuyển về địa điểm mới\r\nĐịa chỉ: số 20V7, đường số 7, khu nhà ở Cán Bộ Đại Học,P.An Khánh, Q.Ninh Kiều, Tp.Cần Thơ\r\nMong rằng với địa điểm mới này, bà con lao động và các bạn sinh viên có thể dễ dàng tiếp cận suất ăn tại Quán.','https://res.cloudinary.com/dvgpizkep/image/upload/v1697370256/aatnqotiic0pa8ntrqu7.jpg','QUÁN YÊN VUI NINH KIỀU – CẦN THƠ CHUYỂN ĐỊA ĐIỂM HOẠT ĐỘNG'),(3,'2023-10-15 19:05:25.230000',2,'Ngày 16,17,18/6 vừa qua, Quỹ Từ thiện Bông Sen đã đồng hành cùng Đoàn Y-Bác sĩ Thiện Đức thực hiện chuyến khám bệnh cho người dân nghèo, người đồng bào dân tộc tại xã Phong Phú, huyện Tuy Phong, tỉnh Bình Thuận.','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371525/eig8sow50oezouxfghwt.jpg','KHÁM BỆNH TỪ THIỆN TẠI XÃ PHONG PHÚ, TUY PHONG, BÌNH THUẬN'),(3,'2023-10-15 19:05:55.936000',3,'Ngày 20/03/2023, Quán Yên vui Mai Lĩnh – Quảng Trị đã đại diện Quỹ Từ thiện Bông Sen bàn giao đến Bệnh viện Đa khoa khu vực Triệu Hải 3 chiếc xe đẩy bệnh nhân phục vụ trong việc vận chuyển bệnh nhân tại bệnh viện.\r\nVới sự hỗ trợ này, chúng tôi mong rằng sẽ góp phần giúp bệnh viện thuận lợi hơn trong quá trình hỗ trợ bệnh nhân.','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371555/o7zdhat9wq6tzfxc7arw.jpg','BÀN GIAO 3 XE ĐẨY CÁNG 3A ĐẾN BỆNH VIỆN ĐKKV TRIỆU HẢI, QUẢNG TRỊ'),(3,'2023-10-15 19:06:42.151000',4,'Ngày 17,18,19/3, Quỹ Bông Sen đã tiếp tục đồng hành cùng đoàn y bác sĩ Thiện Đức thực hiện chuyến khám bệnh từ thiện cho bà con xã Tân Lợi và An Hảo, huyện Tịnh Biên, tỉnh An Giang. Hàng trăm người dân đã tập trung từ rất sớm với rất đông các cụ già ngồi chờ đoàn. Để kịp tiến độ, đoàn đã làm việc liên tục, các y-bác sĩ, dược sĩ và tình nguyện viên thay phiên làm việc xuyên cả buổi trưa. ','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371602/aaziaij4lan8wwgek7lr.jpg','KHÁM BỆNH TỪ THIỆN TẠI XÃ TÂN LỢI VÀ AN HẢO, HUYỆN TỊNH BIÊN, TỈNH AN GIANG');
/*!40000 ALTER TABLE `new` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_category`
--

DROP TABLE IF EXISTS `new_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_category`
--

LOCK TABLES `new_category` WRITE;
/*!40000 ALTER TABLE `new_category` DISABLE KEYS */;
INSERT INTO `new_category` VALUES (1,'Suất ăn'),(2,'Giáo dục'),(3,'Y tế'),(4,'Xây dựng');
/*!40000 ALTER TABLE `new_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `status` bit(1) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(1000) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`user_id`),
  CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (_binary '','2023-10-15 19:10:09.153000',1,2,'BÀI VIẾT 1 '),(_binary '','2023-10-15 19:11:17.677000',2,2,'BÀI VIẾT 2 ');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_image`
--

DROP TABLE IF EXISTS `post_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsip7qv57jw2fw50g97t16nrjr` (`post_id`),
  CONSTRAINT `FKsip7qv57jw2fw50g97t16nrjr` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_image`
--

LOCK TABLES `post_image` WRITE;
/*!40000 ALTER TABLE `post_image` DISABLE KEYS */;
INSERT INTO `post_image` VALUES (1,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371879/fawvctqek6yc6mwpwxtx.jpg'),(2,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371881/vp2n1zok0rkchae53qaa.jpg');
/*!40000 ALTER TABLE `post_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tag`
--

DROP TABLE IF EXISTS `post_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_tag` (
  `post_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  KEY `FKac1wdchd2pnur3fl225obmlg0` (`tag_id`),
  KEY `FKc2auetuvsec0k566l0eyvr9cs` (`post_id`),
  CONSTRAINT `FKac1wdchd2pnur3fl225obmlg0` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FKc2auetuvsec0k566l0eyvr9cs` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tag`
--

LOCK TABLES `post_tag` WRITE;
/*!40000 ALTER TABLE `post_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `user_id` bigint NOT NULL,
  `last_name` varchar(10) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `first_name` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKawh070wpue34wqvytjqr4hj5e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,NULL,NULL,NULL,NULL),(2,'Lê Phi ','1231232','Long','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371841/a3wsjjezjqcah9atgadu.jpg'),(3,'TEST','123123','USER','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371979/rcy3kr7ekeqs9otbdtks.jpg');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `contributed_amount` decimal(38,2) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3gxkqhaf86vo2jwt6yjxtdqiv` (`category_id`),
  CONSTRAINT `FK3gxkqhaf86vo2jwt6yjxtdqiv` FOREIGN KEY (`category_id`) REFERENCES `project_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (0.00,_binary '',0.00,1,NULL,1,NULL,' Số 09 đường Bến Chợ, phường Vạn Thạnh, Nha Trang, Khánh Hòa','QUÁN YÊN VUI NHA TRANG – KHÁNH HÒA','Sau nhiều ngày tháng chuẩn bị, Quán Yên Vui tại thành phố biển Nha Trang đã ra đời. Bà con mưu sinh ở đây sẽ đỡ đần phần nào với những bữa cơm ngon miệng giá rẻ. Quán tọa lạc tại số 09 đường Bến Chợ, phường Vạn Thạnh, Nha Trang, Khánh Hòa.\r\nSau nhiều ngày tháng chuẩn bị, Quán Yên Vui tại thành phố biển Nha Trang đã ra đời. Bà con mưu sinh ở đây sẽ đỡ đần phần nào với những bữa cơm ngon miệng giá rẻ.\r\nThêm một quán mới, toàn thể chúng tôi có thêm niềm vui mới. Mọi người xúm vào, mỗi người giúp một tay, chúng tôi đang làm những việc nhỏ nhưng với tình yêu thương thật lớn.\r\nNiềm vui mở hàng, bán thử, chúng tôi nghe lâng lâng giai điệu:\r\n“Tôi không ngủ mơ đâu\r\nNgày hôm nay trời đẹp lắm, thật mà”\r\nlvc, trong nhóm chăm sóc Quỹ Bông Sen\r\nQuán Yên Vui Nha Trang – Khánh Hòa'),(0.00,NULL,0.00,1,NULL,2,NULL,'50 Trần Khánh Dư, Mỹ Xuyên, Long Xuyên, An Giang','QUÁN YÊN VUI LONG XUYÊN – AN GIANG','Ngày 5/4/2021, Quỹ Từ thiện Bông Sen chính thức đón quán cơm 2.000 thứ 14 mở cửa bán thử, đó là quán Yên Vui Long Xuyên - An Giang.\r\nMiền Đồng bằng sông nước Cửu long lại đón thêm 1 quán cơm mới sau quán Yên Vui Ninh Kiều – Cần Thơ. Mấy năm nay, miền Tây nhiễm mặn khắp nơi, dịch bệnh khiến hàng hoá nông sản xuất khẩu không được lại càng khiến bà con thêm phần khó khăn.Thêm nhiều người rời quê lên phố… Những bữa cơm giá rẻ hy vọng sẽ tiếp sức thêm cho những người cần thiết nơi đây.\r\n\r\nQuán Yên Vui Long Xuyên – An Giang được khởi phát từ mong muốn đóng góp cho quê hương Long Xuyên của một nhóm bạn trẻ đang làm việc và sinh sống tại nước ngoài. Quỹ Từ thiện Bông Sen sẽ là chiếc cầu nối lan toả yêu thương, chỉ cần bạn có mong muốn chia sẻ đến cộng đồng, dù nhỏ dù lớn, Quỹ Tù thiện Bông Sen sẽ cùng bạn hiện thực ước mong sẻ chia đó.'),(0.00,_binary '',0.00,1,NULL,3,NULL,' 11 Nguyễn Huy Lượng, P.14, quận Bình Thạnh, TPHCM','QUÁN CƠM XÃ HỘI NỤ CƯỜI 6','Quán cơm xã hội Nụ Cười 6 là quán cơm 2.000đ tiếp theo nằm trong dự án trợ giúp suất ăn giá rẻ của Quỹ từ thiện Bông Sen. Quán khai trương ngày 19/10/2013. Quán phục vụ các suất cơm trưa 2.000đ với đầy đủ các món mặn, canh, xào, tráng miệng, cơm thoải mái và trà đá miễn phí. Đối tượng phục vụ của quán là người mưu sinh thu nhập thấp, người già neo đơn, người khuyết tật và học sinh sinh viên có hoàn cảnh khó khăn.'),(0.00,_binary '',0.00,1,NULL,4,NULL,'Số 299 Lý Thái Tổ, Phường 9, Quận 10, TP.HCM. ','QUÁN CƠM XÃ HỘI NỤ CƯỜI 1','Quán cơm xã hội Nụ Cười 1 là quán cơm 2.000đ đầu tiên nằm trong dự án trợ giúp suất ăn giá rẻ của Quỹ từ thiện Bông Sen. Quán khai trương ngày 12/10/2012. Thời gian đầu quán bán khoảng 300 suất ăn vào các buổi trưa thứ 2, 4, 6 trong tuần. Hiện nay quán phục vụ khoảng 500 suất ăn các ngày từ thứ 2 đến thứ 7. Quán Nụ Cười 1 ghi dấu những ngày đầu khó khăn nhất khi BQL Quỹ khởi động dự án trợ giúp suất ăn giá rẻ, bắt tay thực hiện những khâu chuẩn bị đầu tiên. Quán cơm xã hội Nụ Cười 1 thành công là bước đệm quan trọng cho chuỗi các quán cơm Nụ Cười khác ra đời sau này.'),(100000.00,_binary '',30000000.00,4,NULL,5,NULL,'','CHUNG TAY CÙNG BÀ CON TUYẾN KÊNH PHÈN, XÃ VĨNH VIỄN, LONG MỸ, HẬU GIANG XÂY CON ĐƯỜNG MONG ƯỚC CỦA BAO THẾ HỆ','Tại tuyến kênh Phèn, xã Vĩnh Viễn, Long Mỹ, Hậu Giang có 1 đoạn đường chỉ dài 1km đi vào nơi sinh sống của khoảng 30 hộ dân nhưng mấy chục năm lúc nào cũng trong tình trạng lầy lội khiến việc đi lại của người dân vô cùng vất vả. Đã gần 50 năm từ ngày bà con khai hoang ra vùng đất này, một con đường bê tông mong mỏi qua bao thế hệ vẫn chưa được hoàn thành do kinh tế khó khăn.'),(15000000.00,_binary '',18000000.00,3,NULL,6,NULL,'','MẸ NẰM VIỆN VẪN LO LẮNG CHO CON TRAI KHUYẾT TẬT Ở NHÀ','Nằm viện hơn 1 tháng nay tại Khoa nhiễm Việt Anh - Bệnh viện Nhiệt đới TP.HCM do Viêm màng não Herpes và đái tháo đường type 2, điều đầu tiên cô G quan tâm sau khi ra khỏi phòng chăm sóc đặc biệt là ai đang chăm sóc người con trai bị liệt ở nhà.\r\nCô Lê T. G. (1964) sống tại Thị xã Trảng Bàng, tỉnh Tây Ninh. Chồng mất sớm, cô G một mình nuôi con trai bằng công việc giao thịt bò từ lò mổ cho các quán ăn, thu nhập mỗi ngày được khoảng 200.000 đồng. Bao nhiêu yêu thương cô đều vun vén cho con nhưng không may năm 18 tuổi con trai bị tai nạn giao thông dẫn đến liệt nửa người, tổn thương não, cần có mẹ chăm sóc tắm rửa, cho ăn hơn 10 năm qua.\r\n\r\nBiến cố của con trai là một cú sốc lớn với cô G, mỗi ngày cô chỉ mong mình có đủ sức khoẻ để đồng hành cùng con nhưng khi tuổi ngày càng cao thì sức khoẻ của cô cũng dần đi xuống. Ngày 29/8 cô G nhập viện trong tình trạng hôn mê, phải điều trị bằng máy thở nội khí quản, cộng thêm lâu nay làm việc quá sức lại hay ăn uống tạm bợ cho qua bữa khiến cơ thể suy kiệt nên việc hồi sức cho cô G càng khó khăn hơn. Ngày chúng tôi đến thăm cũng là ngày cô G được ra khỏi phòng chăm sóc đặc biệt sau gần 40 ngày điều trị, cô vẫn chưa ăn uống được nhiều và tri giác vẫn có phần lơ mơ. Nhìn người phụ nữ nhỏ thó, gương mặt khắc khổ cũng phần nào thấy được những vất vả cô đã trải qua trong cuộc đời.'),(10000000.00,_binary '',28000000.00,3,NULL,7,NULL,'',' NGƯỜI MẸ VỠ ÒA KHI ĐƯỢC GẶP CON SAU 2 THÁNG ĐIỀU TRỊ BỆNH TIM.','Có những khoảnh khắc cảm động mà chúng tôi gặp được khi đến thăm T.P tại Viện Tim Tp.HCM. Người mẹ sau 2 tháng sinh con vừa được ôm ấp vỗ về con lần đầu, lần đầu được thay cho con bộ đồ mình đã chuẩn bị từ rất lâu, gấp gọn trong giỏ, trông chị có vẻ còn vụng về lúng túng nhưng trong ánh mắt yêu thương ấy chúng tôi tin bé sẽ cảm nhận được sự ấm áp của mẹ và có thêm sức để vượt qua căn bệnh tim bẩm sinh.\r\nBé Trần T.P, sinh năm 2023 tại Thủ Đức. T.P vừa tròn 2 tháng tuổi, con được chuyển từ bệnh viện địa phương đến Nhi Đồng và đến Viện Tim để điều trị. Mẹ vừa sinh sức khỏe còn yếu phải về nhà để gia đình chăm sóc. Bé được ba và bà nội túc trực chăm sóc. Bé được phẫu thuật tại Viện Tim ngày 19/07/2023 với chẩn đoán bệnh là TGV. Từ khi phẫu thuật đến nay, bé phải đặt nội khí quản 3 lần, nhiễm trùng nặng kèm theo nhịp thở không ổn định. Hiện tại đang điều trị tại khoa Hồi sức ngoại- Viện Tim. Ngày chúng tôi đến thăm là ngày đầu bé được ra phòng bệnh thường, được gặp mẹ. Hơn 2 tháng qua, mặc dù không được gặp con nhưng chị P-mẹ của bé vẫn cố gắng gửi sữa mẹ vào để con có thêm dưỡng chất và đó còn là cả tình yêu thương mong con mau khỏe mạnh. Đến hôm nay, cả nhà không giấu nỗi vui mừng vì sức khỏe của bé đã có tiến triển tích cực.'),(17000000.00,NULL,18000000.00,3,NULL,8,NULL,'','NGƯỜI CHA VỪA XUẤT VIỆN NUÔI CON TRAI BỊ TAI NẠN NHIỀU THÁNG LIỀN','Không có điều kiện chữa trị từ khi vừa tai nạn, thời gian kéo dài, vết thương càng nặng hơn và tính đến nay đã 5 tháng lên xuống bệnh viện để điều trị nhưng vẫn chưa khỏi hẳn. Dự kiến vẫn phải phẫu thuật thêm 2 lần nữa. Hai cha con luân phiên nuôi nhau ở bệnh viện kiệt cả sức lẫn tiền.\r\nHoàng X.Đ, sinh năm 1989 đang chạy grab và thuê trọ sống cùng ba ở Long An. Vào tháng 5/2023 lúc trên đường đến bệnh viện chăm ba bị bệnh thì bị tai nạn bất tỉnh được đưa vào bệnh viện cấp cứu. Chân chấn thương nặng, phải phẫu thuật nhưng vì không có BHYT chi phí sẽ cao nên Đ xuất viện về mua BHYT và chờ có hiệu lực. Sau đó, Đ được điều trị tại BV Quân Y 7A. Chẩn đoán: nhiễm trùng vết mổ 1/3 trên xương chày phải. Còn phương tiện kết hợp xương. Sau phẫu thuật lần 1 thì chân yếu, cha không đủ sức diều nên Đ bị té và nhiễm trùng. Chi phí điều trị trước nay 2 cha con xoay sở vay mượn. Bác sĩ điều trị là người đồng hành với Đạt trong thời gian dài nên hiểu hoàn cảnh và kết nối tìm nguồn lực hỗ trợ.'),(0.00,_binary '',100000000.00,2,NULL,9,NULL,'D18 – Khu dân cư Nam Long, P. Phú Thuận, Quận 7, TP HCM','NỤ CƯỜI 3 – EM ĐẾN TRƯỜNG','Dự án Nụ Cười 3 - Em đến trường là dự án Hỗ trợ giáo dục đầu tiên được Quỹ Từ thiện Bông Sen triển khai do ông Trần Trọng Thức làm chủ nhiệm dự án. Dự án gồm hai chương trình miễn phí là lo việc học cho trẻ em hoàn cảnh khó khăn, cung cấp suất ăn dinh dưỡng cho học sinh nghèo.\r\nDự án giáo dục Nụ Cười 3 – Em đến trường gồm 2 chương trình miễn phí:\r\n\r\n(1) Lo việc học cho trẻ em hoàn cảnh khó khăn (Hiện đang bảo trợ 60 học sinh từ Lớp 6 đến Lớp 11, gồm học phí, sách giáo khoa, đồng phục và bảo hiểm y tế).\r\n\r\n(2) Cung cấp suất ăn dinh dưỡng cho học sinh nghèo (Hiện đang lo cơm trưa vào các ngày thứ Hai, Tư, Sáu cho 395 học sinh của các Lớp học tình thương: Bà Huyện Thanh Quan (Quận 1), Vĩnh Hội (Quận 4), Chợ Quán (Quận 5) và Tân Hưng (Quận 7).\r\n\r\nVới niềm tin chỉ thông qua giáo dục mới có thể giúp trẻ em nghèo cơ may thay đổi được số phận. Quỹ Từ thiện Bông Sen hy vọng nhận được sự tiếp sức của quý nhà hảo tâm gần xa đồng hành với “NỤ CƯỜI 3 – EM ĐẾN TRƯỜNG”, mang đến cho những đứa trẻ kém may mắn một tương lai sáng sủa hơn.'),(0.00,_binary '',1000000.00,2,NULL,10,NULL,'','GIÚP TRẺ MỒ CÔI TẠI MÁI ẤM','Thêm một dự án không thời hạn nằm trong chương trình hỗ trợ giáo dục trẻ em tỉnh Quảng Trị. Mỗi tháng, Qũy Bông Sen sẽ cần vận động 8 triệu đồng hỗ trợ sữa cho Mái Ấm Lâm Bích ở Đông Hà và 15 triệu cho Mái Ấm Cam Lộ để hỗ trợ sữa và thực phẩm cho những trẻ mồ côi đang được nuôi dưỡng tại đây.\r\nHậu Covid\r\n\r\nTrên mỗi người bệnh có thể để lại vài di chứng, nhưng trên nền kinh tế của cả nước, dấu tích Covid để lại cho nền kinh tế quá nặng nề.\r\n\r\nChuyến khảo sát miền Trung tháng 7 vừa qua, chúng tôi ghi nhận phần lớn người dân nghèo hơn hẳn so với trước đây. Có thể các khu du lịch, các tụ điểm vui chơi không thấy biểu hiện của sức mua suy giảm bởi một số thị dân không bị mất việc, còn phần lớn người lao động nghèo về quê, cuộc mưu sinh trở nên khó khăn hơn trước, giá cả leo thang chóng mặt.Ở những cơ sở từ thiện xã hội tại các tỉnh nghèo như Quảng Trị, Gia Lai v.v… cuộc sống vô cùng khó khăn. Người đến thăm viếng và tặng quà ít đi hẳn, giảm sút rất nhiều khiến nguồn thu không có. Các ma sơ chạy vạy đủ cách, chế biến trà gừng, bột ngũ cốc bán vài chục ngàn mong cải thiện bữa ăn cho các cháu mồ côi hoặc người dân tộc thất học.\r\nCàng xa trung tâm, càng ít người đến thì càng khó khăn. Mái ấm Cam Lộ ở Quảng Trị, nơi Quán Yên Vui trợ giúp thực phẩm khoảng 9 triệu mỗi tháng cho 32 cháu, các ma sơ cũng rất chật vật tìm thêm nguồn này nguồn kia cho các em. Cả đoàn chúng tôi vô cùng xúc động khi sơ HĐ tròn mắt, ngẩn người vì ngạc nhiên vỡ òa niềm vui khi nghe chúng tôi ngỏ lời giúp thêm 6 triệu nữa mỗi tháng để các cháu có thể uống sữa. Sữa! Ở nơi xa xôi này trẻ con trong Mái ấm từ thiện được uống sữa là điều quá hoang đường.\r\n\r\nVậy là thêm một dự án không thời hạn nằm trong chương trình hỗ trợ giáo dục trẻ em tỉnh Quảng Trị. Mỗi tháng sẽ cần vận động 8 triệu đồng cho Mái Ấm Lâm Bích ở Đông Hà và 15 triệu đồng cho Mái Ấm Cam Lộ. Chúng tôi chỉ là người giao nhận, là shipper vận chuyển lòng tốt của quý nhà hảo tâm đến những nơi cần thiết. Nhận một lời cám ơn từ các ma sơ cũng đã là quá ngại ngùng.\r\nlvc, trong nhóm chăm sóc QBS'),(0.00,_binary '',100000000.00,2,NULL,11,NULL,'','CHƯƠNG TRÌNH NGƯỜI BẠN LỚN – HỖ TRỢ TRẺ BỊ ẢNH HƯỞNG BỞI DỊCH COVID-19','Người bạn lớn là một dự án có mục đích giúp đỡ Trẻ em không còn cha hoặc mẹ hoặc cả hai, đặc biệt là Trẻ nhỏ chịu mất mát này do đại dịch Covid-19. Chương trình thiết lập một mạng lưới Nhân viên đóng vai trò là “người anh tinh thần”, “người chị tinh thần” để chăm sóc các em.\r\nKhởi nguồn từ 9 trẻ tại Phường 8 Quận 4 vào năm 2021, đến nay chúng tôi đã hỗ trợ 32 trẻ tại Quận 4, Bình Chánh và Gò Vấp.\r\n\r\nTrong hơn một năm triển khai chương trình, đồng hành cùng trẻ và gia đình chúng tôi hiểu được những khó khăn, chật vật của các gia đình sau khi trải qua một biến cố to lớn. Không chỉ về kinh tế mà những tổn thương về mặt tinh thần, cảm xúc, đời sống dường như vẫn còn tiếp diễn.\r\n\r\nĐối với trẻ, chúng tôi tập trung vào hỗ trợ học bổng để duy trì việc học của trẻ tại trường, hỗ trợ dinh dưỡng cho những trẻ đã mất đi nguồn sữa mẹ từ khi mới lọt lòng. Bên cạnh đó, việc quan tâm, chăm sóc về mặt tinh thần của trẻ như sinh nhật, lễ, tết cũng được quan tâm. Quan trọng hơn hết, Người Bạn Lớn cũng đóng vai trò người anh, người chị, người bạn để trẻ được chia sẻ những tâm tư, những vấn trẻ đang gặp phải ở từng giai đoạn phát triển, đặc biệt tuổi teen.\r\n\r\nTính đến nay, chúng tôi đang hỗ trợ chi phí học tập hàng cho 21 trẻ về học phí, đồ dùng học tập, vé xe buýt,…. Về dinh dưỡng hàng tháng cho 13 trẻ. Có 2 trẻ được hỗ trợ về chi phí khám-điều trị bệnh. 32 trẻ đều được cập nhật thông tin và hỗ trợ khi cần thiết, tổ chức sinh nhật và tặng quà các dịp đặc biệt trong năm: Giáng sinh, Tết….\r\n\r\nKhông chỉ hỗ trợ cho trẻ, Người Bạn Lớn còn là nơi mà người chăm sóc trẻ được chia sẻ, được hướng dẫn hỗ trợ, tư vấn khi cần thiết. Khi gia đình bị mất đi một người thân, mất đi một người lao động chính thì người ở lại không chỉ khó khăn về mặt kinh tế mà đôi khi việc giao tiếp, chăm sóc các con cũng là một khó khăn khi những công việc đó vốn dĩ được chăm lo bởi người chồng/người vợ của mình. Không ít lần chúng tôi thấy được những giọt nước mắt rơi khi người chăm sóc chia sẻ về hiện tại, mặc dù đã qua một năm gắng gượng để chăm sóc các con.');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_category`
--

DROP TABLE IF EXISTS `project_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_category`
--

LOCK TABLES `project_category` WRITE;
/*!40000 ALTER TABLE `project_category` DISABLE KEYS */;
INSERT INTO `project_category` VALUES (1,'Suất ăn'),(2,'Giáo dục'),(3,'Y tế'),(4,'Xây dựng');
/*!40000 ALTER TABLE `project_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_image`
--

DROP TABLE IF EXISTS `project_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsrkbi9ax581cp14a13mbk9qtm` (`project_id`),
  CONSTRAINT `FKsrkbi9ax581cp14a13mbk9qtm` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_image`
--

LOCK TABLES `project_image` WRITE;
/*!40000 ALTER TABLE `project_image` DISABLE KEYS */;
INSERT INTO `project_image` VALUES (1,1,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697369971/yzabnno4c9lv1tgsksm4.jpg'),(2,1,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697369973/sikwrnvpsxea2ztz0v3z.jpg'),(3,1,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697369975/ujituxzyg8m1lqkvgcfz.jpg'),(4,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370120/qvqtzz3hnlmlp046cwyu.jpg'),(5,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370128/ugbdsrfrx4zhevj1z6gf.jpg'),(6,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370130/czcmvx4bkpjybwgddaj8.jpg'),(7,3,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370384/stwrwk4fm5ihpelni6hc.jpg'),(8,4,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370457/edkzlfdhsmylxlfrjefp.jpg'),(9,5,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370577/gaymldpekc0kltbugjqd.jpg'),(10,5,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370580/jy3bxfwq28epllux7t6z.jpg'),(11,6,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370719/a8k0mefmmavrozp11syc.jpg'),(12,6,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370721/gs9eymjrcmase5varj5o.jpg'),(13,7,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370804/lijwl8nuwczimc3dfbzh.jpg'),(14,7,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370806/slyc9gbbulf9iihjqywn.png'),(15,8,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370869/qnvwlpuxcvb5onmtvre9.jpg'),(16,8,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370880/fb97p0dhnononxoyapaw.jpg'),(17,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371040/by0znfcscjeiqdzbsqdi.jpg'),(18,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371042/llzaqstjs9no81mdv0y4.jpg'),(19,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371045/hoxyrnombvrutaoh5if7.jpg'),(20,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371047/e1tcyoya2ak1dksnn1i4.jpg'),(21,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371156/bt6muecydpwuw9epa1f6.jpg'),(22,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371158/p8oh9vvfealcqrnaxpxm.jpg'),(23,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371161/aiuw87pfaj1z5byb84y2.jpg'),(24,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371163/cc1b3skplu4jx9fdnixw.jpg'),(25,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371166/h9cjflq2lndfx1sf9fjo.jpg'),(26,11,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371264/iqrrilmedkjgbt6xhdfp.jpg'),(27,11,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371266/o3mgcxqqauitg2i96qld.jpg'),(28,11,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371268/lkcw0addy3bfdhw3hpta.jpg');
/*!40000 ALTER TABLE `project_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'Xây dựng'),(2,'Nấu ăn'),(3,'Ca hát'),(4,'Dựng trại'),(5,'Đốn củi');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `status` tinyint(1) DEFAULT '1',
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `auth_type` enum('Facebook','Google') COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'admin',NULL,'admin@gmail.com','$2a$10$YsX8v64HcyOCsBsKpq.0K.sfoQBagZG2Z5ybISlnbQMB.Akixxvme'),(1,2,'lephilong1907',NULL,'lephilong1907@gmail.com','$2a$10$uG5Z4uz9LLQNCY8lyLQvCe0GbRrRStYS5TIJWhSlZ4hL2QoNkk1lW'),(1,3,'user',NULL,'user@gmail.com','$2a$10$zeFW2nPGtiZj2GHYw/.rVe5dTpumxa5pWyCArvUXe2nFCNJWkGWdS');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_comment_new`
--

DROP TABLE IF EXISTS `user_comment_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_comment_new` (
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `new_id` bigint DEFAULT NULL,
  `reply_news` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKra93e71o8qac9svgx3njm0lx2` (`reply_news`),
  KEY `FK6gt1cprqvln2b5d5r6huu24oe` (`new_id`),
  KEY `FKq4ko1h2bjmwqscdwycd3r41uo` (`user_id`),
  CONSTRAINT `FK6gt1cprqvln2b5d5r6huu24oe` FOREIGN KEY (`new_id`) REFERENCES `new` (`id`),
  CONSTRAINT `FKq4ko1h2bjmwqscdwycd3r41uo` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKra93e71o8qac9svgx3njm0lx2` FOREIGN KEY (`reply_news`) REFERENCES `user_comment_new` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comment_new`
--

LOCK TABLES `user_comment_new` WRITE;
/*!40000 ALTER TABLE `user_comment_new` DISABLE KEYS */;
INSERT INTO `user_comment_new` VALUES ('2023-10-15 19:07:13.445000',1,1,NULL,1,'Bình luận 1');
/*!40000 ALTER TABLE `user_comment_new` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_comment_post`
--

DROP TABLE IF EXISTS `user_comment_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_comment_post` (
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `reply_comment` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK57d6rtfxx46dajxqa89esksk2` (`reply_comment`),
  KEY `FKp5hn4hvvik27bxi92cpan5v2g` (`post_id`),
  KEY `FK6u0eqbcn68cxvo7lrqbnrn44i` (`user_id`),
  CONSTRAINT `FK57d6rtfxx46dajxqa89esksk2` FOREIGN KEY (`reply_comment`) REFERENCES `user_comment_post` (`id`),
  CONSTRAINT `FK6u0eqbcn68cxvo7lrqbnrn44i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKp5hn4hvvik27bxi92cpan5v2g` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comment_post`
--

LOCK TABLES `user_comment_post` WRITE;
/*!40000 ALTER TABLE `user_comment_post` DISABLE KEYS */;
INSERT INTO `user_comment_post` VALUES ('2023-10-15 19:13:15.389000',1,1,NULL,3,'CMT 1'),('2023-10-15 19:13:18.171000',2,1,NULL,3,'CMT 2'),('2023-10-15 19:13:23.459000',3,2,NULL,3,'CMT 1'),('2023-10-15 19:13:50.290000',4,NULL,2,3,'Reply cmt 2'),('2023-10-15 19:13:56.410000',5,NULL,1,3,'Reply cm1');
/*!40000 ALTER TABLE `user_comment_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_contribute_project`
--

DROP TABLE IF EXISTS `user_contribute_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_contribute_project` (
  `donate_amount` decimal(38,2) NOT NULL,
  `donate_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb3690o5hintema8v3mxhu4nc9` (`project_id`),
  KEY `FKdhcjvrrlsbbadh6ewgdtjmn6f` (`user_id`),
  CONSTRAINT `FKb3690o5hintema8v3mxhu4nc9` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKdhcjvrrlsbbadh6ewgdtjmn6f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_contribute_project`
--

LOCK TABLES `user_contribute_project` WRITE;
/*!40000 ALTER TABLE `user_contribute_project` DISABLE KEYS */;
INSERT INTO `user_contribute_project` VALUES (100000.00,'2023-10-15 19:45:49.308000',1,5,2,NULL),(15000000.00,'2023-10-15 19:46:31.716000',2,6,2,NULL),(10000000.00,'2023-10-15 19:47:13.150000',3,7,2,NULL),(17000000.00,'2023-10-15 19:47:55.817000',4,8,2,NULL);
/*!40000 ALTER TABLE `user_contribute_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_event`
--

DROP TABLE IF EXISTS `user_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_event` (
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  KEY `FKspe8srtv69gubpphvrnd7wekt` (`event_id`),
  KEY `FKk3smcqwou8absq8qjt3wk4vy9` (`user_id`),
  CONSTRAINT `FKk3smcqwou8absq8qjt3wk4vy9` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKspe8srtv69gubpphvrnd7wekt` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_event`
--

LOCK TABLES `user_event` WRITE;
/*!40000 ALTER TABLE `user_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_rating_project`
--

DROP TABLE IF EXISTS `user_rating_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_rating_project` (
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKphxvyktt618bvapnri3buga4l` (`project_id`),
  KEY `FKsbsvuhpcjct2e5184e0tqnkvp` (`user_id`),
  CONSTRAINT `FKphxvyktt618bvapnri3buga4l` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKsbsvuhpcjct2e5184e0tqnkvp` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_rating_project`
--

LOCK TABLES `user_rating_project` WRITE;
/*!40000 ALTER TABLE `user_rating_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_rating_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_react_post`
--

DROP TABLE IF EXISTS `user_react_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_react_post` (
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `reaction` enum('HAHA','LIKE','SAD') COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbiwabnpc8dwp7at7krmlex1qr` (`post_id`),
  KEY `FKomn93vq89c8axbti7gfqt2y33` (`user_id`),
  CONSTRAINT `FKbiwabnpc8dwp7at7krmlex1qr` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `FKomn93vq89c8axbti7gfqt2y33` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_react_post`
--

LOCK TABLES `user_react_post` WRITE;
/*!40000 ALTER TABLE `user_react_post` DISABLE KEYS */;
INSERT INTO `user_react_post` VALUES ('2023-10-15 19:13:24.962000',1,2,3,'LIKE'),('2023-10-15 19:13:28.888000',2,1,3,'LIKE');
/*!40000 ALTER TABLE `user_react_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_report_post`
--

DROP TABLE IF EXISTS `user_report_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_report_post` (
  `resolved` bit(1) DEFAULT NULL,
  `create_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi5a113r8kse0vw397muu30dd5` (`post_id`),
  KEY `FK7836ewblboi5f66n2xyiv8g91` (`user_id`),
  CONSTRAINT `FK7836ewblboi5f66n2xyiv8g91` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKi5a113r8kse0vw397muu30dd5` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_report_post`
--

LOCK TABLES `user_report_post` WRITE;
/*!40000 ALTER TABLE `user_report_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_report_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_volunteer_project`
--

DROP TABLE IF EXISTS `user_volunteer_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_volunteer_project` (
  `end_date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint DEFAULT NULL,
  `register_date` datetime(6) NOT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi7kwrlqi9pbbnq9x0hnopidgs` (`project_id`),
  KEY `FKpqb9xg9jqxuikf5j5m0d5elyr` (`user_id`),
  CONSTRAINT `FKi7kwrlqi9pbbnq9x0hnopidgs` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKpqb9xg9jqxuikf5j5m0d5elyr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_volunteer_project`
--

LOCK TABLES `user_volunteer_project` WRITE;
/*!40000 ALTER TABLE `user_volunteer_project` DISABLE KEYS */;
INSERT INTO `user_volunteer_project` VALUES ('2023-10-16 07:00:00.000000',1,1,'2023-10-15 19:11:52.268000','2023-10-14 07:00:00.000000',2,'Em có kĩ năng nấu ăn ạ');
/*!40000 ALTER TABLE `user_volunteer_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `role_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  KEY `FKmknhyioq8hh8seoxe1fy6qo86` (`role_id`),
  KEY `FKgd3iendaoyh04b95ykqise6qh` (`user_id`),
  CONSTRAINT `FKgd3iendaoyh04b95ykqise6qh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKmknhyioq8hh8seoxe1fy6qo86` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1),(2,2),(2,3);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_skill`
--

DROP TABLE IF EXISTS `volunteer_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_skill` (
  `skill_id` bigint NOT NULL,
  `volunteer_id` bigint NOT NULL,
  KEY `FK811tpp4rntrhhc2dab8mtroy4` (`skill_id`),
  KEY `FKjn5uo4kl01wajmc6r97flmvu5` (`volunteer_id`),
  CONSTRAINT `FK811tpp4rntrhhc2dab8mtroy4` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`),
  CONSTRAINT `FKjn5uo4kl01wajmc6r97flmvu5` FOREIGN KEY (`volunteer_id`) REFERENCES `user_volunteer_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_skill`
--

LOCK TABLES `volunteer_skill` WRITE;
/*!40000 ALTER TABLE `volunteer_skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `volunteer_skill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-15 19:50:06
