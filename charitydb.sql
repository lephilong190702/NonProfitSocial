-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: charitydb
-- ------------------------------------------------------
-- Server version	8.0.31

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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `date` datetime(6) NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq8f93g3qb6fi7c2fd6vvbhitl` (`category_id`),
  CONSTRAINT `FKq8f93g3qb6fi7c2fd6vvbhitl` FOREIGN KEY (`category_id`) REFERENCES `new_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new`
--

LOCK TABLES `new` WRITE;
/*!40000 ALTER TABLE `new` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_category`
--

LOCK TABLES `new_category` WRITE;
/*!40000 ALTER TABLE `new_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `new_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `status` bit(1) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`user_id`),
  CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
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
  `image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsip7qv57jw2fw50g97t16nrjr` (`post_id`),
  CONSTRAINT `FKsip7qv57jw2fw50g97t16nrjr` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_image`
--

LOCK TABLES `post_image` WRITE;
/*!40000 ALTER TABLE `post_image` DISABLE KEYS */;
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
  `avatar` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `first_name` varchar(20) COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(10) COLLATE utf8mb3_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKawh070wpue34wqvytjqr4hj5e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `contributed_amount` decimal(38,2) NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3gxkqhaf86vo2jwt6yjxtdqiv` (`category_id`),
  CONSTRAINT `FK3gxkqhaf86vo2jwt6yjxtdqiv` FOREIGN KEY (`category_id`) REFERENCES `project_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Số 20V7, đường số 7, khu nhà ở Cán Bộ Đại Học,P.An Khánh, Q.Ninh Kiều, Tp.Cần Thơ','Mong rằng với địa điểm mới này,  bà con lao động và các bạn sinh viên có thể dễ dàng tiếp cận suất ăn tại quán',130000000.00,NULL,'2023-06-05 08:00:00.000000',_binary '','QUÁN YÊN VUI NINH KIỀU – CẦN THƠ CHUYỂN ĐỊA ĐIỂM HOẠT ĐỘNG',150000000.00,1),(2,NULL,'Một bài học nhỏ nhoi của cuộc sống sẽ giúp chugn1 ta nhìn nhận lại nhiều thứ',9000000000.00,NULL,NULL,_binary '','BÀI HỌC NHỎ - GIÁ TRỊ TO',10000000000.00,3),(10,NULL,'Sau nhiều ngày tháng chuẩn bị, Quán Yên Vui tại thành phố biển Nha Trang đã ra đời. Bà con mưu sinh ở đây sẽ đỡ đần phần nào với những bữa cơm ngon miệng giá rẻ.',153000000.00,NULL,'2023-06-05 08:00:00.000000',_binary '','QUÁN YÊN VUI NHA TRANG – KHÁNH HÒA MỞ BÁN THỬ',350000000.00,1),(11,NULL,'Trong những ngày qua, các Tác viên Quỹ Từ thiện Bông Sen từ các Quán Nụ Cười và Yên Vui tất bật hơn hẳn. Sau buổi bán, dù tay chân đã mỏi nhưng mọi người vẫn nán lại chuẩn bị quà bánh cùng những chiếc lồng đèn nho nhỏ cho chương trình trung thu với các em nhỏ có hoàn cảnh khó khăn, trẻ đường phố, những bệnh nhi và người vô gia cư.',0.00,NULL,NULL,_binary '\0','RỘN RÀNG MÙA TRUNG THU',300000000.00,1),(12,NULL,'Một hoạt động đặc biệt trong dự án trợ giúp suất ăn giá rẻ của Quỹ Từ thiện Bông Sen là “Phở Cho Mọi Người” do nhóm bạn “Ngày thứ Năm Hạnh Phúc” và một vài doanh nghiệp, tổ chức tài trợ.',200000000.00,'2023-09-05 08:00:00.000000','2023-06-05 08:00:00.000000',_binary '','PHỞ CHO MỌI NGƯỜI',200000000.00,1),(13,'số 68/12 Lữ Gia - phường 15 -quận 11, TP.HCM','Quán cơm Nụ Cười 7 nằm trong chuỗi quán cơm 2.000đ, thuộc dự án trợ giúp suất ăn giá rẻ của Quỹ từ thiện Bông Sen. Quán được khai trương vào ngày 18/11/2015, phục vụ bà con lao động nghèo và học sinh, sinh viên có hoàn cảnh khó khăn vào các ngày thứ Ba– Năm – Bảy trong tuần. Quán được điều hành bởi Ban thiện nguyện nụ cười Cựu học sinh Petrus Ký – Lê Hồng Phong.',98630000.00,NULL,'2022-12-31 08:00:00.000000',_binary '','QUÁN CƠM XÃ HỘI NỤ CƯỜI',100000000.00,1),(14,NULL,'Nếu được lựa chọn chắc hẳn không ai muốn mình sinh ra trong hoàn cảnh khó khăn, túng thiếu. Phát hiện u bì buồng trứng từ năm 2021 khi mang thai con út nhưng không có tiền điều trị, chị H đành phải lơ đi. Đến nay khối u quá to chị bắt buộc phải phẫu thuật để tránh nguy cơ u bị vỡ gây ảnh hưởng đến sức khoẻ. Chị Nguyễn T.T.H (1991) sống tại Quận Bình Thạnh, TP.HCM. Lấy chồng và sinh 3 người con nhưng chồng không phụ giúp kinh tế, sau khi ly thân cũng không chu cấp cho các con; cộng thêm 6 năm trước mẹ bị tai biến nằm một chỗ, chị H vừa lo về kinh tế vừa phải chăm mẹ và nuôi con, chạy ăn từng bữa nên cuộc sống rất khó khăn, thiếu thốn. Con lớn chị H đang học lớp 5 nhờ có khoản hỗ trợ hộ nghèo của địa phương, sách vở quần áo đều dùng lại từ chị họ; con giữa đã 5 tuổi có biểu hiện tăng động nhưng chưa được đến trường; con út 10 tháng tuổi khát sữa do mẹ không đủ sữa cho bú, sắp tới phẫu thuật chị định cho bé bỏ bú luôn, cả nhà 5 người chen chúc trong căn nhà nhỏ đã cũ được ông bà để lại. Nhìn vào tình cảnh này chúng tôi không khỏi xót xa, sao mà khổ quá.',21910000.00,NULL,NULL,_binary '','MẸ ĐƠN THÂN KHÓ KHĂN XOAY SỞ TIỀN PHẪU THUẬT',10000000.00,2),(15,NULL,'Hai vợ chồng đã lớn tuổi chăm nhau lúc tuổi già, lúc vợ trở bệnh chú lấy sợi dây làm đai giữ cô phía sau rồi đưa đi bệnh viện. Nhập viện lần 1 không có tiền phẫu thuật nên phải về nhà uống thuốc cầm chừng, lần 2 nhập viện vì quá mệt và khó thở nên phải tiếp tục đưa đi cấp cứu. Cô Nguyễn Thị H, sinh năm 1959 quê ở Đồng Nai đang thuê trọ tại TP.HCM. Cô bị tiểu đường hơn 10 năm nay, sức khỏe yếu nên chỉ ở nhà nội trợ nhưng nay phải nhập viện vì bệnh tim. Cô được chẩn đoán mất bù cấp suy tim mạn EF giảm –I50 – Nhồi máu cơ tim không st chênh lên – Nhồi máu cơ tim cũ điều trị nội – Tăng huyết áp – Viêm phổi – Đái tháo đường type 2 – Trào ngược dạ dày thực quản. Chồng cô là chú H túc trực chăm cô suốt thời gian ở bệnh viện. Cô chú gặp nhau sau khi cả 2 đều đổ vỡ trong cuộc hôn nhân trước cách đây hơn 20 năm, con cái hai bên lớn lên cũng đi làm ăn chật vật với cuộc sống gia đình riêng nên cũng không hỗ trợ được cô chú. Hai vợ chồng thuê căn phòng trọ với giá 2.5 triệu đồng/tháng làm nơi tá túc.',16868000.00,NULL,NULL,_binary '\0','HAI VỢ CHỒNG NƯƠNG TỰA NHAU LÚC LỚN TUỔI BỆNH ĐAU',12000000.00,2),(16,NULL,'Trở về nhà sau ca làm đêm, mệt mỏi lại gặp mưa to dẫn đến tai nạn thương tâm. Bệnh nhân là lao động chính của gia đình với 2 con còn nhỏ, vợ vừa sinh còn trong thời gian thai sản, thuộc hộ nghèo nên đã khó khăn nay càng túng thiếu hơn. Nguyễn T sinh năm 1994 tại Đak Lak và đang làm công nhân  cùng vợ  tại Đồng Xoài, Bình Phước. Trên đường đi làm về sau khi tan ca đêm, trời mưa to nên mất lái dẫn đến té và gãy xương  đùi, cẳng tay, đầu trên xương chày được người dân địa phương cấp cứu và chuyển đến BV Chợ Rẫy để tiếp tục điều trị.',17000000.00,NULL,NULL,_binary '','TAI NẠN KHI ĐI MƯA DẪN ĐẾN CHẤN THƯƠNG NẶNG',20000000.00,2),(17,NULL,'Buổi sáng chúng tôi đến thăm cô T mệt nhoài sau ca chạy thận đầu tiên tại bệnh viện. 3 giờ sáng 2 vợ chồng đã dậy để chuẩn bị, chú D-chồng cô T nấu đồ ăn sáng cho cô rồi 4 giờ chở cô từ Hóc Môn đến Bệnh viện 175 chạy thân. Mỗi tuần 3 lần đều đặn 8 năm nay. Đến nay nhà cũng bán, chú chạy từng cuốc xe ôm để trang trải chi phí điều trị. Cô T sinh năm 1968 đang sinh sống tại Hóc Môn. Cô bị bệnh thận đã 23 năm nay, đã chuyển sang suy thận và phải chạy thận khoảng 8 năm. Cô phải điều trị qua khắp các bệnh viện, do biến chứng của bệnh nên ngoài suy thận giai đoạn cuối thì cô còn bị nhồi máu não, suy tim tâm thu thất động mạch vành 2 lá , hở van tim vành 2 lá A14.',0.00,NULL,NULL,_binary '','HƠN 20 NĂM ĐỒNG HÀNH CÙNG VỢ ĐIỀU TRỊ BỆNH',17000000.00,2),(18,NULL,'Người mẹ nghẹn ngào kể về chặng đường của 2 mẹ con suốt 3 tháng kể từ lúc con được sinh ra và chẳng may mắc bệnh tim bẩm sinh. Người mẹ sinh mổ nhưng chẳng được nghỉ ngơi ngày nào khi tình trạng con sau phẫu thuật vẫn chưa cải thiện. Để có tiền trang trải chi phí khi bé nằm viện, người chồng phải về quê làm việc, một mình chị chăm con. Bé Đặng H.G.L, 3 tháng tuổi ở Đồng Nai, bé được chẩn đoán hở van 2 lá, hở van 3 lá nặng. Từ khi sinh ra, bé phải chuyển tuyến điều trị qua nhiều bệnh viện từ Đồng Nai đến TP.HCM. Hiện bé đã được phẫu thuật và đang tiếp tục được theo dõi tại Viện Tim TP.HCM nhưng tình trạng vẫn còn nặng phải nằm phòng hồi sức.',24032000.00,NULL,NULL,_binary '\0','HỒI HỘP TỪNG NGÀY ĐỒNG HÀNH CÙNG CON ĐIỀU TRỊ BỆNH TIM.',22000000.00,2),(19,NULL,'Dự án giáo dục Nụ Cười 3 – Em đến trường gồm 2 chương trình miễn phí:  (1) Lo việc học cho trẻ em hoàn cảnh khó khăn (Hiện đang bảo trợ 60 học sinh từ Lớp 6 đến Lớp 11, gồm học phí, sách giáo khoa, đồng phục và bảo hiểm y tế).  (2) Cung cấp suất ăn dinh dưỡng cho học sinh nghèo (Hiện đang lo cơm trưa vào các ngày thứ Hai, Tư, Sáu cho 395 học sinh của các Lớp học tình thương: Bà Huyện Thanh Quan (Quận 1), Vĩnh Hội (Quận 4), Chợ Quán (Quận 5) và Tân Hưng (Quận 7).  Với niềm tin chỉ thông qua giáo dục mới có thể giúp trẻ em nghèo cơ may thay đổi được số phận.',10000000.00,NULL,NULL,_binary '','NỤ CƯỜI 3 – EM ĐẾN TRƯỜNG',10000000.00,3),(20,NULL,'Trên mỗi người bệnh có thể để lại vài di chứng, nhưng trên nền kinh tế của cả nước, dấu tích Covid để lại cho nền kinh tế quá nặng nề.  Chuyến khảo sát miền Trung tháng 7 vừa qua, chúng tôi ghi nhận phần lớn người dân nghèo hơn hẳn so với trước đây. Có thể các khu du lịch, các tụ điểm vui chơi không thấy biểu hiện của sức mua suy giảm bởi một số thị dân không bị mất việc, còn phần lớn người lao động nghèo về quê, cuộc mưu sinh trở nên khó khăn hơn trước, giá cả leo thang chóng mặt.Ở những cơ sở từ thiện xã hội tại các tỉnh nghèo như Quảng Trị, Gia Lai v.v… cuộc sống vô cùng khó khăn. Người đến thăm viếng và tặng quà ít đi hẳn, giảm sút rất nhiều khiến nguồn thu không có. Các ma sơ chạy vạy đủ cách, chế biến trà gừng, bột ngũ cốc bán vài chục ngàn mong cải thiện bữa ăn cho các cháu mồ côi hoặc người dân tộc thất học. Càng xa trung tâm, càng ít người đến thì càng khó khăn. Mái ấm Cam Lộ ở Quảng Trị, nơi Quán Yên Vui trợ giúp thực phẩm khoảng 9 triệu mỗi tháng cho 32 cháu, các ma sơ cũng rất chật vật tìm thêm nguồn này nguồn kia cho các em. Cả đoàn chúng tôi vô cùng xúc động khi sơ HĐ tròn mắt, ngẩn người vì ngạc nhiên vỡ òa niềm vui khi nghe chúng tôi ngỏ lời giúp thêm 6 triệu nữa mỗi tháng để các cháu có thể uống sữa. Sữa! Ở nơi xa xôi này trẻ con trong Mái ấm từ thiện được uống sữa là điều quá hoang đường.  Vậy là thêm một dự án không thời hạn nằm trong chương trình hỗ trợ giáo dục trẻ em tỉnh Quảng Trị. Mỗi tháng sẽ cần vận động 8 triệu đồng cho Mái Ấm Lâm Bích ở Đông Hà và 15 triệu đồng cho Mái Ấm Cam Lộ. Chúng tôi chỉ là người giao nhận, là shipper vận chuyển lòng tốt của quý nhà hảo tâm đến những nơi cần thiết. Nhận một lời cám ơn từ các ma sơ cũng đã là quá ngại ngùng.',25000000.00,NULL,NULL,_binary '','GIÚP TRẺ MỒ CÔI TẠI MÁI ẤM',30000000.00,3),(21,NULL,'Người bạn lớn là một dự án có mục đích giúp đỡ Trẻ em không còn cha hoặc mẹ hoặc cả hai, đặc biệt là Trẻ nhỏ chịu mất mát này do đại dịch Covid-19. Chương trình thiết lập một mạng lưới Nhân viên đóng vai trò là “người anh tinh thần”, “người chị tinh thần” để chăm sóc các em. Khởi nguồn từ 9 trẻ tại Phường 8 Quận 4 vào năm 2021, đến nay chúng tôi đã hỗ trợ 32 trẻ tại Quận 4, Bình Chánh và Gò Vấp.  Trong hơn một năm triển khai chương trình, đồng hành cùng trẻ và gia đình chúng tôi hiểu được những khó khăn, chật vật của các gia đình sau khi trải qua một biến cố to lớn. Không chỉ về kinh tế mà những tổn thương về mặt tinh thần, cảm xúc, đời sống dường như vẫn còn tiếp diễn.  Đối với trẻ, chúng tôi tập trung vào hỗ trợ học bổng để duy trì việc học của trẻ tại trường, hỗ trợ dinh dưỡng cho những trẻ đã mất đi nguồn sữa mẹ từ khi mới lọt lòng. Bên cạnh đó, việc quan tâm, chăm sóc về mặt tinh thần của trẻ như sinh nhật, lễ, tết cũng được quan tâm. Quan trọng hơn hết, Người Bạn Lớn cũng đóng vai trò người anh, người chị, người bạn để trẻ được chia sẻ những tâm tư, những vấn trẻ đang gặp phải ở từng giai đoạn phát triển, đặc biệt tuổi teen.  Tính đến nay, chúng tôi đang hỗ trợ chi phí học tập hàng cho 21 trẻ về học phí, đồ dùng học tập, vé xe buýt,…. Về dinh dưỡng hàng tháng cho 13 trẻ. Có 2 trẻ được hỗ trợ về chi phí khám-điều trị bệnh. 32 trẻ đều được cập nhật thông tin và hỗ trợ khi cần thiết, tổ chức sinh nhật và tặng quà các dịp đặc biệt trong năm: Giáng sinh, Tết….  Không chỉ hỗ trợ cho trẻ, Người Bạn Lớn còn là nơi mà người chăm sóc trẻ được chia sẻ, được hướng dẫn hỗ trợ, tư vấn khi cần thiết. Khi gia đình bị mất đi một người thân, mất đi một người lao động chính thì người ở lại không chỉ khó khăn về mặt kinh tế mà đôi khi việc giao tiếp, chăm sóc các con cũng là một khó khăn khi những công việc đó vốn dĩ được chăm lo bởi người chồng/người vợ của mình. Không ít lần chúng tôi thấy được những giọt nước mắt rơi khi người chăm sóc chia sẻ về hiện tại, mặc dù đã qua một năm gắng gượng để chăm sóc các con.',10000000.00,NULL,NULL,_binary '\0','CHƯƠNG TRÌNH NGƯỜI BẠN LỚN – HỖ TRỢ TRẺ BỊ ẢNH HƯỞNG BỞI DỊCH COVID-19',10000000.00,3),(22,NULL,'Tại tuyến kênh Phèn, xã Vĩnh Viễn, Long Mỹ, Hậu Giang có 1 đoạn đường chỉ dài 1km đi vào nơi sinh sống của khoảng 30 hộ dân nhưng mấy chục năm lúc nào cũng trong tình trạng lầy lội khiến việc đi lại của người dân vô cùng vất vả. Đã gần 50 năm từ ngày bà con khai hoang ra vùng đất này, một con đường bê tông mong mỏi qua bao thế hệ vẫn chưa được hoàn thành do kinh tế khó khăn. Vào mùa mưa, đường luôn nhão nhoẹt, bùn lầy và hết sức trơn. Để lưu thông, bà con phải lội bộ ra đường, xin rửa chân hoặc có khi phải thay đồ nhờ ở nhà một người dân rồi mới đi học, đi làm. Những em bé nhỏ thì ba mẹ phải đưa đi, ảnh hưởng rất nhiều đến công việc đồng án.',22450000.00,NULL,NULL,_binary '\0','CHUNG TAY CÙNG BÀ CON TUYẾN KÊNH PHÈN, XÃ VĨNH VIỄN, LONG MỸ, HẬU GIANG XÂY CON ĐƯỜNG MONG ƯỚC CỦA BAO THẾ HỆ',22000000.00,4),(23,NULL,'Những căn phòng trọ tù túng, những ngày nằm chờ điều trị trong thấp thỏm lo âu, chán nản…đó là những điều chúng tôi thường bắt gặp khi hỗ trợ cơm cho các bệnh nhân tại khu phòng trọ gần bệnh viện K Tân Triều. Với mong muốn tạo một không gian thoáng đãng,mát mẻ an lành với vườn cây và những dãy ghế rộng cho bệnh nhân, thân nhân được lui tới hay lưu lại sau giờ cơm tại Quán Yên Vui – Tân Triều Hà Nội, chúng tôi sẽ cải tạo một khoảng sân thành khu vườn Yên Vui. Quán Yên Vui Tân Triều – Hà Nội ra đời trong thời điểm dịch bệnh bùng phát mạnh trên cả nước vào tháng 7/2021. Quán chủ yếu hỗ trợ suất ăn giá rẻ cho những bệnh nhân, thân nhân điều trị của viện K Tân Triều. Với gần 1 năm hoạt động, Quán đã hỗ trợ hơn 30 nghìn suất ăn thì chắc hẳn gần 30 nghìn lượt hỗ trợ là dành cho bệnh nhân, thân nhân ở khu vực này. Thấu hiểu bao khó khăn, vất vả của những cô chú bệnh nhân từ vùng quê xa xôi lên tận Hà Nội để điều trị, vô thuốc định kỳ, họ buộc lòng thuê những căn phòng nhỏ, giá rẻ, chịu khó tù túng chật hẹp hay khi thì nóng bức khi thì lạnh lẽo để ở tạm qua ngày. Từ bệnh viện lại về phòng chứ cũng chẳng biết tránh đi đâu. Thay vì bóng cây thì họ chỉ đối diện với 4 bức tường xi măng trong sự lặng lẽ. Mệt mỏi cả sức khỏe lẫn tinh thần.',5000000.00,NULL,NULL,_binary '','CÔNG TRÌNH CẢI TẠO VƯỜN YÊN VUI',15000000.00,4);
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
INSERT INTO `project_category` VALUES (1,'Suất ăn'),(2,'Y tế'),(3,'Giáo dục'),(4,'Xây dựng');
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
  `image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsrkbi9ax581cp14a13mbk9qtm` (`project_id`),
  CONSTRAINT `FKsrkbi9ax581cp14a13mbk9qtm` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_image`
--

LOCK TABLES `project_image` WRITE;
/*!40000 ALTER TABLE `project_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_image` ENABLE KEYS */;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` bit(1) NOT NULL,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  KEY `FKn4pb12f3y8ktduy8fnc2xlln1` (`role_id`),
  CONSTRAINT `FKn4pb12f3y8ktduy8fnc2xlln1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_comment_new`
--

DROP TABLE IF EXISTS `user_comment_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_comment_new` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `reply_news` bigint DEFAULT NULL,
  `new_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKra93e71o8qac9svgx3njm0lx2` (`reply_news`),
  KEY `FK6gt1cprqvln2b5d5r6huu24oe` (`new_id`),
  KEY `FKq4ko1h2bjmwqscdwycd3r41uo` (`user_id`),
  CONSTRAINT `FK6gt1cprqvln2b5d5r6huu24oe` FOREIGN KEY (`new_id`) REFERENCES `new` (`id`),
  CONSTRAINT `FKq4ko1h2bjmwqscdwycd3r41uo` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKra93e71o8qac9svgx3njm0lx2` FOREIGN KEY (`reply_news`) REFERENCES `user_comment_new` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comment_new`
--

LOCK TABLES `user_comment_new` WRITE;
/*!40000 ALTER TABLE `user_comment_new` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_comment_new` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_comment_post`
--

DROP TABLE IF EXISTS `user_comment_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_comment_post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `reply_comment` bigint DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK57d6rtfxx46dajxqa89esksk2` (`reply_comment`),
  KEY `FKp5hn4hvvik27bxi92cpan5v2g` (`post_id`),
  KEY `FK6u0eqbcn68cxvo7lrqbnrn44i` (`user_id`),
  CONSTRAINT `FK57d6rtfxx46dajxqa89esksk2` FOREIGN KEY (`reply_comment`) REFERENCES `user_comment_post` (`id`),
  CONSTRAINT `FK6u0eqbcn68cxvo7lrqbnrn44i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKp5hn4hvvik27bxi92cpan5v2g` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comment_post`
--

LOCK TABLES `user_comment_post` WRITE;
/*!40000 ALTER TABLE `user_comment_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_comment_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_contribute_project`
--

DROP TABLE IF EXISTS `user_contribute_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_contribute_project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `donate_amount` decimal(38,2) NOT NULL,
  `donate_date` datetime(6) NOT NULL,
  `note` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb3690o5hintema8v3mxhu4nc9` (`project_id`),
  KEY `FKdhcjvrrlsbbadh6ewgdtjmn6f` (`user_id`),
  CONSTRAINT `FKb3690o5hintema8v3mxhu4nc9` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKdhcjvrrlsbbadh6ewgdtjmn6f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_contribute_project`
--

LOCK TABLES `user_contribute_project` WRITE;
/*!40000 ALTER TABLE `user_contribute_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_contribute_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_event`
--

DROP TABLE IF EXISTS `user_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_event` (
  `user_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `create_date` datetime(6) NOT NULL,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) NOT NULL,
  `reaction` int NOT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbiwabnpc8dwp7at7krmlex1qr` (`post_id`),
  KEY `FKomn93vq89c8axbti7gfqt2y33` (`user_id`),
  CONSTRAINT `FKbiwabnpc8dwp7at7krmlex1qr` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `FKomn93vq89c8axbti7gfqt2y33` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_react_post`
--

LOCK TABLES `user_react_post` WRITE;
/*!40000 ALTER TABLE `user_react_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_react_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_report_post`
--

DROP TABLE IF EXISTS `user_report_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_report_post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_volunteer_project`
--

DROP TABLE IF EXISTS `user_volunteer_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_volunteer_project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `register_date` datetime(6) NOT NULL,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi7kwrlqi9pbbnq9x0hnopidgs` (`project_id`),
  KEY `FKpqb9xg9jqxuikf5j5m0d5elyr` (`user_id`),
  CONSTRAINT `FKi7kwrlqi9pbbnq9x0hnopidgs` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKpqb9xg9jqxuikf5j5m0d5elyr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_volunteer_project`
--

LOCK TABLES `user_volunteer_project` WRITE;
/*!40000 ALTER TABLE `user_volunteer_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_volunteer_project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-17 23:19:53
