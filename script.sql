-- User

INSERT INTO `user` (status, id, username, email, password, enabled) VALUES 
(1,1,'admin','admin@gmail.com','$2a$10$YsX8v64HcyOCsBsKpq.0K.sfoQBagZG2Z5ybISlnbQMB.Akixxvme',1),
(1,2,'superadmin','superadmin@gmail.com','$2a$10$PKrMUFBrnTwd1Dxf9sIPUe5SczNe2209lUO.MpMcpe6zl9fwuSsUK',1),
(1,3,'user','drakecrys29@gmail.com','$2a$10$O0yot0tAvgC/S9CRiqlCQu.0/mDgb3fVhhRTrNmwDH/.XiPFBsUNi',1),
(1,4,'user123','datluongtan1410@gmail.com','$2a$10$wuBgSibOmg48Zonqf4xcUesVvUg8BZ.lVWTsB4TRZK9SatOBRxbKu',1),
(1,5,'employee','employee1410@gmail.com','$2a$10$wuBgSibOmg48Zonqf4xcUesVvUg8BZ.lVWTsB4TRZK9SatOBRxbKu',1),
(1,6,'shipper','shipper@gmail.com','$2a$10$wuBgSibOmg48Zonqf4xcUesVvUg8BZ.lVWTsB4TRZK9SatOBRxbKu',1);

-- Role
INSERT INTO `user_role` (id, name) VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_SUPERADMIN'), (4,'ROLE_EMPLOYEE'), (5, 'ROLE_SHIPPER');


-- User_Role
INSERT INTO `users_roles` (role_id, user_id) VALUES (1,1),(3,2),(2,3),(2,4),(4,5),(5,6);

-- profile
INSERT INTO `profile` (user_id, last_name, phone, first_name, avatar) VALUES 
(1,"Long","0386221906","Lê Phi","https://res.cloudinary.com/dvgpizkep/image/upload/v1697371841/a3wsjjezjqcah9atgadu.jpg"),
(2,"Đạt","0386221906","Lương Tấn","https://res.cloudinary.com/dvgpizkep/image/upload/v1697371841/a3wsjjezjqcah9atgadu.jpg"),
(3,"user","0386221906","user","https://res.cloudinary.com/dvgpizkep/image/upload/v1697371841/a3wsjjezjqcah9atgadu.jpg"),
(4,"user123","0386221906","user23","https://res.cloudinary.com/dvgpizkep/image/upload/v1697371841/a3wsjjezjqcah9atgadu.jpg"),
(5,"employee","0386221906","employee","https://res.cloudinary.com/dvgpizkep/image/upload/v1697371841/a3wsjjezjqcah9atgadu.jpg");

INSERT INTO `contribution_category` (id, name) VALUES (1,'Tiền mặt'),(2,'Hiện vật');


-- project cate

INSERT INTO `project_category` (id, name) VALUES (1,'Suất ăn'),(2,'Giáo dục'),(3,'Y tế'),(4,'Xây dựng');

-- Project

INSERT INTO `project` (contributed_amount, status, pending, total_amount, category_id, end_date, id, start_date, address, title, content) VALUES 
(40000.00,1,0,10000000.00,1,NULL,1,NULL,' Số 09 đường Bến Chợ, phường Vạn Thạnh, Nha Trang, Khánh Hòa','QUÁN YÊN VUI NHA TRANG – KHÁNH HÒA','Sau nhiều ngày tháng chuẩn bị, Quán Yên Vui tại thành phố biển Nha Trang đã ra đời. Bà con mưu sinh ở đây sẽ đỡ đần phần nào với những bữa cơm ngon miệng giá rẻ. Quán tọa lạc tại số 09 đường Bến Chợ, phường Vạn Thạnh, Nha Trang, Khánh Hòa.\r\nSau nhiều ngày tháng chuẩn bị, Quán Yên Vui tại thành phố biển Nha Trang đã ra đời. Bà con mưu sinh ở đây sẽ đỡ đần phần nào với những bữa cơm ngon miệng giá rẻ.\r\nThêm một quán mới, toàn thể chúng tôi có thêm niềm vui mới. Mọi người xúm vào, mỗi người giúp một tay, chúng tôi đang làm những việc nhỏ nhưng với tình yêu thương thật lớn.\r\nNiềm vui mở hàng, bán thử, chúng tôi nghe lâng lâng giai điệu:\r\n“Tôi không ngủ mơ đâu\r\nNgày hôm nay trời đẹp lắm, thật mà”\r\nlvc, trong nhóm chăm sóc Quỹ Bông Sen\r\nQuán Yên Vui Nha Trang – Khánh Hòa'),

(0.00,1,0,0.00,1,NULL,2,NULL,'50 Trần Khánh Dư, Mỹ Xuyên, Long Xuyên, An Giang','QUÁN YÊN VUI LONG XUYÊN – AN GIANG','Ngày 5/4/2021, Quỹ Từ thiện Bông Sen chính thức đón quán cơm 2.000 thứ 14 mở cửa bán thử, đó là quán Yên Vui Long Xuyên - An Giang.\r\nMiền Đồng bằng sông nước Cửu long lại đón thêm 1 quán cơm mới sau quán Yên Vui Ninh Kiều – Cần Thơ. Mấy năm nay, miền Tây nhiễm mặn khắp nơi, dịch bệnh khiến hàng hoá nông sản xuất khẩu không được lại càng khiến bà con thêm phần khó khăn.Thêm nhiều người rời quê lên phố… Những bữa cơm giá rẻ hy vọng sẽ tiếp sức thêm cho những người cần thiết nơi đây.\r\n\r\nQuán Yên Vui Long Xuyên – An Giang được khởi phát từ mong muốn đóng góp cho quê hương Long Xuyên của một nhóm bạn trẻ đang làm việc và sinh sống tại nước ngoài. Quỹ Từ thiện Bông Sen sẽ là chiếc cầu nối lan toả yêu thương, chỉ cần bạn có mong muốn chia sẻ đến cộng đồng, dù nhỏ dù lớn, Quỹ Tù thiện Bông Sen sẽ cùng bạn hiện thực ước mong sẻ chia đó.'),

(0.00,1,0,0.00,1,NULL,3,NULL,' 11 Nguyễn Huy Lượng, P.14, quận Bình Thạnh, TPHCM','QUÁN CƠM XÃ HỘI NỤ CƯỜI 6','Quán cơm xã hội Nụ Cười 6 là quán cơm 2.000đ tiếp theo nằm trong dự án trợ giúp suất ăn giá rẻ của Quỹ từ thiện Bông Sen. Quán khai trương ngày 19/10/2013. Quán phục vụ các suất cơm trưa 2.000đ với đầy đủ các món mặn, canh, xào, tráng miệng, cơm thoải mái và trà đá miễn phí. Đối tượng phục vụ của quán là người mưu sinh thu nhập thấp, người già neo đơn, người khuyết tật và học sinh sinh viên có hoàn cảnh khó khăn.'),

(0.00,1,0,0.00,1,NULL,4,NULL,'Số 299 Lý Thái Tổ, Phường 9, Quận 10, TP.HCM. ','QUÁN CƠM XÃ HỘI NỤ CƯỜI 1','Quán cơm xã hội Nụ Cười 1 là quán cơm 2.000đ đầu tiên nằm trong dự án trợ giúp suất ăn giá rẻ của Quỹ từ thiện Bông Sen. Quán khai trương ngày 12/10/2012. Thời gian đầu quán bán khoảng 300 suất ăn vào các buổi trưa thứ 2, 4, 6 trong tuần. Hiện nay quán phục vụ khoảng 500 suất ăn các ngày từ thứ 2 đến thứ 7. Quán Nụ Cười 1 ghi dấu những ngày đầu khó khăn nhất khi BQL Quỹ khởi động dự án trợ giúp suất ăn giá rẻ, bắt tay thực hiện những khâu chuẩn bị đầu tiên. Quán cơm xã hội Nụ Cười 1 thành công là bước đệm quan trọng cho chuỗi các quán cơm Nụ Cười khác ra đời sau này.'),

(2200000.00,1,0,30000000.00,4,NULL,5,NULL,'','CHUNG TAY CÙNG BÀ CON TUYẾN KÊNH PHÈN, XÃ VĨNH VIỄN, LONG MỸ, HẬU GIANG XÂY CON ĐƯỜNG MONG ƯỚC CỦA BAO THẾ HỆ','Tại tuyến kênh Phèn, xã Vĩnh Viễn, Long Mỹ, Hậu Giang có 1 đoạn đường chỉ dài 1km đi vào nơi sinh sống của khoảng 30 hộ dân nhưng mấy chục năm lúc nào cũng trong tình trạng lầy lội khiến việc đi lại của người dân vô cùng vất vả. Đã gần 50 năm từ ngày bà con khai hoang ra vùng đất này, một con đường bê tông mong mỏi qua bao thế hệ vẫn chưa được hoàn thành do kinh tế khó khăn.'),

(115200000.00,1,0,18000000.00,3,NULL,6,NULL,'','MẸ NẰM VIỆN VẪN LO LẮNG CHO CON TRAI KHUYẾT TẬT Ở NHÀ','Nằm viện hơn 1 tháng nay tại Khoa nhiễm Việt Anh - Bệnh viện Nhiệt đới TP.HCM do Viêm màng não Herpes và đái tháo đường type 2, điều đầu tiên cô G quan tâm sau khi ra khỏi phòng chăm sóc đặc biệt là ai đang chăm sóc người con trai bị liệt ở nhà.\r\nCô Lê T. G. (1964) sống tại Thị xã Trảng Bàng, tỉnh Tây Ninh. Chồng mất sớm, cô G một mình nuôi con trai bằng công việc giao thịt bò từ lò mổ cho các quán ăn, thu nhập mỗi ngày được khoảng 200.000 đồng. Bao nhiêu yêu thương cô đều vun vén cho con nhưng không may năm 18 tuổi con trai bị tai nạn giao thông dẫn đến liệt nửa người, tổn thương não, cần có mẹ chăm sóc tắm rửa, cho ăn hơn 10 năm qua.\r\n\r\nBiến cố của con trai là một cú sốc lớn với cô G, mỗi ngày cô chỉ mong mình có đủ sức khoẻ để đồng hành cùng con nhưng khi tuổi ngày càng cao thì sức khoẻ của cô cũng dần đi xuống. Ngày 29/8 cô G nhập viện trong tình trạng hôn mê, phải điều trị bằng máy thở nội khí quản, cộng thêm lâu nay làm việc quá sức lại hay ăn uống tạm bợ cho qua bữa khiến cơ thể suy kiệt nên việc hồi sức cho cô G càng khó khăn hơn. Ngày chúng tôi đến thăm cũng là ngày cô G được ra khỏi phòng chăm sóc đặc biệt sau gần 40 ngày điều trị, cô vẫn chưa ăn uống được nhiều và tri giác vẫn có phần lơ mơ. Nhìn người phụ nữ nhỏ thó, gương mặt khắc khổ cũng phần nào thấy được những vất vả cô đã trải qua trong cuộc đời.'),

(10000000.00,1,0,28000000.00,3,NULL,7,NULL,'',' NGƯỜI MẸ VỠ ÒA KHI ĐƯỢC GẶP CON SAU 2 THÁNG ĐIỀU TRỊ BỆNH TIM.','Có những khoảnh khắc cảm động mà chúng tôi gặp được khi đến thăm T.P tại Viện Tim Tp.HCM. Người mẹ sau 2 tháng sinh con vừa được ôm ấp vỗ về con lần đầu, lần đầu được thay cho con bộ đồ mình đã chuẩn bị từ rất lâu, gấp gọn trong giỏ, trông chị có vẻ còn vụng về lúng túng nhưng trong ánh mắt yêu thương ấy chúng tôi tin bé sẽ cảm nhận được sự ấm áp của mẹ và có thêm sức để vượt qua căn bệnh tim bẩm sinh.\r\nBé Trần T.P, sinh năm 2023 tại Thủ Đức. T.P vừa tròn 2 tháng tuổi, con được chuyển từ bệnh viện địa phương đến Nhi Đồng và đến Viện Tim để điều trị. Mẹ vừa sinh sức khỏe còn yếu phải về nhà để gia đình chăm sóc. Bé được ba và bà nội túc trực chăm sóc. Bé được phẫu thuật tại Viện Tim ngày 19/07/2023 với chẩn đoán bệnh là TGV. Từ khi phẫu thuật đến nay, bé phải đặt nội khí quản 3 lần, nhiễm trùng nặng kèm theo nhịp thở không ổn định. Hiện tại đang điều trị tại khoa Hồi sức ngoại- Viện Tim. Ngày chúng tôi đến thăm là ngày đầu bé được ra phòng bệnh thường, được gặp mẹ. Hơn 2 tháng qua, mặc dù không được gặp con nhưng chị P-mẹ của bé vẫn cố gắng gửi sữa mẹ vào để con có thêm dưỡng chất và đó còn là cả tình yêu thương mong con mau khỏe mạnh. Đến hôm nay, cả nhà không giấu nỗi vui mừng vì sức khỏe của bé đã có tiến triển tích cực.'),

(117000000.00,1,0,18000000.00,3,NULL,8,NULL,'','NGƯỜI CHA VỪA XUẤT VIỆN NUÔI CON TRAI BỊ TAI NẠN NHIỀU THÁNG LIỀN','Không có điều kiện chữa trị từ khi vừa tai nạn, thời gian kéo dài, vết thương càng nặng hơn và tính đến nay đã 5 tháng lên xuống bệnh viện để điều trị nhưng vẫn chưa khỏi hẳn. Dự kiến vẫn phải phẫu thuật thêm 2 lần nữa. Hai cha con luân phiên nuôi nhau ở bệnh viện kiệt cả sức lẫn tiền.\r\nHoàng X.Đ, sinh năm 1989 đang chạy grab và thuê trọ sống cùng ba ở Long An. Vào tháng 5/2023 lúc trên đường đến bệnh viện chăm ba bị bệnh thì bị tai nạn bất tỉnh được đưa vào bệnh viện cấp cứu. Chân chấn thương nặng, phải phẫu thuật nhưng vì không có BHYT chi phí sẽ cao nên Đ xuất viện về mua BHYT và chờ có hiệu lực. Sau đó, Đ được điều trị tại BV Quân Y 7A. Chẩn đoán: nhiễm trùng vết mổ 1/3 trên xương chày phải. Còn phương tiện kết hợp xương. Sau phẫu thuật lần 1 thì chân yếu, cha không đủ sức diều nên Đ bị té và nhiễm trùng. Chi phí điều trị trước nay 2 cha con xoay sở vay mượn. Bác sĩ điều trị là người đồng hành với Đạt trong thời gian dài nên hiểu hoàn cảnh và kết nối tìm nguồn lực hỗ trợ.'),

(0.00,1,0,100000000.00,2,NULL,9,NULL,'D18 – Khu dân cư Nam Long, P. Phú Thuận, Quận 7, TP HCM','NỤ CƯỜI 3 – EM ĐẾN TRƯỜNG','Dự án Nụ Cười 3 - Em đến trường là dự án Hỗ trợ giáo dục đầu tiên được Quỹ Từ thiện Bông Sen triển khai do ông Trần Trọng Thức làm chủ nhiệm dự án. Dự án gồm hai chương trình miễn phí là lo việc học cho trẻ em hoàn cảnh khó khăn, cung cấp suất ăn dinh dưỡng cho học sinh nghèo.\r\nDự án giáo dục Nụ Cười 3 – Em đến trường gồm 2 chương trình miễn phí:\r\n\r\n(1) Lo việc học cho trẻ em hoàn cảnh khó khăn (Hiện đang bảo trợ 60 học sinh từ Lớp 6 đến Lớp 11, gồm học phí, sách giáo khoa, đồng phục và bảo hiểm y tế).\r\n\r\n(2) Cung cấp suất ăn dinh dưỡng cho học sinh nghèo (Hiện đang lo cơm trưa vào các ngày thứ Hai, Tư, Sáu cho 395 học sinh của các Lớp học tình thương: Bà Huyện Thanh Quan (Quận 1), Vĩnh Hội (Quận 4), Chợ Quán (Quận 5) và Tân Hưng (Quận 7).\r\n\r\nVới niềm tin chỉ thông qua giáo dục mới có thể giúp trẻ em nghèo cơ may thay đổi được số phận. Quỹ Từ thiện Bông Sen hy vọng nhận được sự tiếp sức của quý nhà hảo tâm gần xa đồng hành với “NỤ CƯỜI 3 – EM ĐẾN TRƯỜNG”, mang đến cho những đứa trẻ kém may mắn một tương lai sáng sủa hơn.'),

(0.00,1,0,1000000.00,2,NULL,10,NULL,'','GIÚP TRẺ MỒ CÔI TẠI MÁI ẤM','Thêm một dự án không thời hạn nằm trong chương trình hỗ trợ giáo dục trẻ em tỉnh Quảng Trị. Mỗi tháng, Qũy Bông Sen sẽ cần vận động 8 triệu đồng hỗ trợ sữa cho Mái Ấm Lâm Bích ở Đông Hà và 15 triệu cho Mái Ấm Cam Lộ để hỗ trợ sữa và thực phẩm cho những trẻ mồ côi đang được nuôi dưỡng tại đây.\r\nHậu Covid\r\n\r\nTrên mỗi người bệnh có thể để lại vài di chứng, nhưng trên nền kinh tế của cả nước, dấu tích Covid để lại cho nền kinh tế quá nặng nề.\r\n\r\nChuyến khảo sát miền Trung tháng 7 vừa qua, chúng tôi ghi nhận phần lớn người dân nghèo hơn hẳn so với trước đây. Có thể các khu du lịch, các tụ điểm vui chơi không thấy biểu hiện của sức mua suy giảm bởi một số thị dân không bị mất việc, còn phần lớn người lao động nghèo về quê, cuộc mưu sinh trở nên khó khăn hơn trước, giá cả leo thang chóng mặt.Ở những cơ sở từ thiện xã hội tại các tỉnh nghèo như Quảng Trị, Gia Lai v.v… cuộc sống vô cùng khó khăn. Người đến thăm viếng và tặng quà ít đi hẳn, giảm sút rất nhiều khiến nguồn thu không có. Các ma sơ chạy vạy đủ cách, chế biến trà gừng, bột ngũ cốc bán vài chục ngàn mong cải thiện bữa ăn cho các cháu mồ côi hoặc người dân tộc thất học.\r\nCàng xa trung tâm, càng ít người đến thì càng khó khăn. Mái ấm Cam Lộ ở Quảng Trị, nơi Quán Yên Vui trợ giúp thực phẩm khoảng 9 triệu mỗi tháng cho 32 cháu, các ma sơ cũng rất chật vật tìm thêm nguồn này nguồn kia cho các em. Cả đoàn chúng tôi vô cùng xúc động khi sơ HĐ tròn mắt, ngẩn người vì ngạc nhiên vỡ òa niềm vui khi nghe chúng tôi ngỏ lời giúp thêm 6 triệu nữa mỗi tháng để các cháu có thể uống sữa. Sữa! Ở nơi xa xôi này trẻ con trong Mái ấm từ thiện được uống sữa là điều quá hoang đường.\r\n\r\nVậy là thêm một dự án không thời hạn nằm trong chương trình hỗ trợ giáo dục trẻ em tỉnh Quảng Trị. Mỗi tháng sẽ cần vận động 8 triệu đồng cho Mái Ấm Lâm Bích ở Đông Hà và 15 triệu đồng cho Mái Ấm Cam Lộ. Chúng tôi chỉ là người giao nhận, là shipper vận chuyển lòng tốt của quý nhà hảo tâm đến những nơi cần thiết. Nhận một lời cám ơn từ các ma sơ cũng đã là quá ngại ngùng.\r\nlvc, trong nhóm chăm sóc QBS'),

(0.00,1,0,100000000.00,2,NULL,11,NULL,'','CHƯƠNG TRÌNH NGƯỜI BẠN LỚN – HỖ TRỢ TRẺ BỊ ẢNH HƯỞNG BỞI DỊCH COVID-19','Người bạn lớn là một dự án có mục đích giúp đỡ Trẻ em không còn cha hoặc mẹ hoặc cả hai, đặc biệt là Trẻ nhỏ chịu mất mát này do đại dịch Covid-19. Chương trình thiết lập một mạng lưới Nhân viên đóng vai trò là “người anh tinh thần”, “người chị tinh thần” để chăm sóc các em.\r\nKhởi nguồn từ 9 trẻ tại Phường 8 Quận 4 vào năm 2021, đến nay chúng tôi đã hỗ trợ 32 trẻ tại Quận 4, Bình Chánh và Gò Vấp.\r\n\r\nTrong hơn một năm triển khai chương trình, đồng hành cùng trẻ và gia đình chúng tôi hiểu được những khó khăn, chật vật của các gia đình sau khi trải qua một biến cố to lớn. Không chỉ về kinh tế mà những tổn thương về mặt tinh thần, cảm xúc, đời sống dường như vẫn còn tiếp diễn.\r\n\r\nĐối với trẻ, chúng tôi tập trung vào hỗ trợ học bổng để duy trì việc học của trẻ tại trường, hỗ trợ dinh dưỡng cho những trẻ đã mất đi nguồn sữa mẹ từ khi mới lọt lòng. Bên cạnh đó, việc quan tâm, chăm sóc về mặt tinh thần của trẻ như sinh nhật, lễ, tết cũng được quan tâm. Quan trọng hơn hết, Người Bạn Lớn cũng đóng vai trò người anh, người chị, người bạn để trẻ được chia sẻ những tâm tư, những vấn trẻ đang gặp phải ở từng giai đoạn phát triển, đặc biệt tuổi teen.\r\n\r\nTính đến nay, chúng tôi đang hỗ trợ chi phí học tập hàng cho 21 trẻ về học phí, đồ dùng học tập, vé xe buýt,…. Về dinh dưỡng hàng tháng cho 13 trẻ. Có 2 trẻ được hỗ trợ về chi phí khám-điều trị bệnh. 32 trẻ đều được cập nhật thông tin và hỗ trợ khi cần thiết, tổ chức sinh nhật và tặng quà các dịp đặc biệt trong năm: Giáng sinh, Tết….\r\n\r\nKhông chỉ hỗ trợ cho trẻ, Người Bạn Lớn còn là nơi mà người chăm sóc trẻ được chia sẻ, được hướng dẫn hỗ trợ, tư vấn khi cần thiết. Khi gia đình bị mất đi một người thân, mất đi một người lao động chính thì người ở lại không chỉ khó khăn về mặt kinh tế mà đôi khi việc giao tiếp, chăm sóc các con cũng là một khó khăn khi những công việc đó vốn dĩ được chăm lo bởi người chồng/người vợ của mình. Không ít lần chúng tôi thấy được những giọt nước mắt rơi khi người chăm sóc chia sẻ về hiện tại, mặc dù đã qua một năm gắng gượng để chăm sóc các con.');

-- project_image
INSERT INTO `project_image` (id,project_id,image) VALUES 
(1,1,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697369971/yzabnno4c9lv1tgsksm4.jpg'),
(2,1,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697369973/sikwrnvpsxea2ztz0v3z.jpg'),
(3,1,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697369975/ujituxzyg8m1lqkvgcfz.jpg'),
(4,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370120/qvqtzz3hnlmlp046cwyu.jpg'),
(5,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370128/ugbdsrfrx4zhevj1z6gf.jpg'),
(6,2,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370130/czcmvx4bkpjybwgddaj8.jpg'),
(7,3,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370384/stwrwk4fm5ihpelni6hc.jpg'),
(8,4,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370457/edkzlfdhsmylxlfrjefp.jpg'),
(9,5,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370577/gaymldpekc0kltbugjqd.jpg'),
(10,5,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370580/jy3bxfwq28epllux7t6z.jpg'),
(11,6,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370719/a8k0mefmmavrozp11syc.jpg'),
(12,6,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370721/gs9eymjrcmase5varj5o.jpg'),
(13,7,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370804/lijwl8nuwczimc3dfbzh.jpg'),
(14,7,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370806/slyc9gbbulf9iihjqywn.png'),
(15,8,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370869/qnvwlpuxcvb5onmtvre9.jpg'),
(16,8,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697370880/fb97p0dhnononxoyapaw.jpg'),
(17,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371040/by0znfcscjeiqdzbsqdi.jpg'),
(18,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371042/llzaqstjs9no81mdv0y4.jpg'),
(19,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371045/hoxyrnombvrutaoh5if7.jpg'),
(20,9,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371047/e1tcyoya2ak1dksnn1i4.jpg'),
(21,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371156/bt6muecydpwuw9epa1f6.jpg'),
(22,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371158/p8oh9vvfealcqrnaxpxm.jpg'),
(23,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371161/aiuw87pfaj1z5byb84y2.jpg'),
(24,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371163/cc1b3skplu4jx9fdnixw.jpg'),
(25,10,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371166/h9cjflq2lndfx1sf9fjo.jpg'),
(26,11,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371264/iqrrilmedkjgbt6xhdfp.jpg'),
(27,11,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371266/o3mgcxqqauitg2i96qld.jpg'),
(28,11,'https://res.cloudinary.com/dvgpizkep/image/upload/v1697371268/lkcw0addy3bfdhw3hpta.jpg');

-- news cate

INSERT INTO `new_category` (id, name) VALUES (1,'Suất ăn'),(2,'Giáo dục'),(3,'Y tế'),(4,'Xây dựng');

-- news

INSERT INTO `new` (category_id, create_date, id, content, image, name) VALUES 
(1,'2023-10-15 18:44:16.826000',1,'Từ ngày 5/6/2023 Quán Yên Vui Ninh Kiều – Cần Thơ chuyển về địa điểm mới\r\nĐịa chỉ: số 20V7, đường số 7, khu nhà ở Cán Bộ Đại Học,P.An Khánh, Q.Ninh Kiều, Tp.Cần Thơ\r\nMong rằng với địa điểm mới này, bà con lao động và các bạn sinh viên có thể dễ dàng tiếp cận suất ăn tại Quán.','https://res.cloudinary.com/dvgpizkep/image/upload/v1697370256/aatnqotiic0pa8ntrqu7.jpg','QUÁN YÊN VUI NINH KIỀU – CẦN THƠ CHUYỂN ĐỊA ĐIỂM HOẠT ĐỘNG'),

(3,'2023-10-15 19:05:25.230000',2,'Ngày 16,17,18/6 vừa qua, Quỹ Từ thiện Bông Sen đã đồng hành cùng Đoàn Y-Bác sĩ Thiện Đức thực hiện chuyến khám bệnh cho người dân nghèo, người đồng bào dân tộc tại xã Phong Phú, huyện Tuy Phong, tỉnh Bình Thuận.','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371525/eig8sow50oezouxfghwt.jpg','KHÁM BỆNH TỪ THIỆN TẠI XÃ PHONG PHÚ, TUY PHONG, BÌNH THUẬN'),

(3,'2023-10-15 19:05:55.936000',3,'Ngày 20/03/2023, Quán Yên vui Mai Lĩnh – Quảng Trị đã đại diện Quỹ Từ thiện Bông Sen bàn giao đến Bệnh viện Đa khoa khu vực Triệu Hải 3 chiếc xe đẩy bệnh nhân phục vụ trong việc vận chuyển bệnh nhân tại bệnh viện.\r\nVới sự hỗ trợ này, chúng tôi mong rằng sẽ góp phần giúp bệnh viện thuận lợi hơn trong quá trình hỗ trợ bệnh nhân.','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371555/o7zdhat9wq6tzfxc7arw.jpg','BÀN GIAO 3 XE ĐẨY CÁNG 3A ĐẾN BỆNH VIỆN ĐKKV TRIỆU HẢI, QUẢNG TRỊ'),

(3,'2023-10-15 19:06:42.151000',4,'Ngày 17,18,19/3, Quỹ Bông Sen đã tiếp tục đồng hành cùng đoàn y bác sĩ Thiện Đức thực hiện chuyến khám bệnh từ thiện cho bà con xã Tân Lợi và An Hảo, huyện Tịnh Biên, tỉnh An Giang. Hàng trăm người dân đã tập trung từ rất sớm với rất đông các cụ già ngồi chờ đoàn. Để kịp tiến độ, đoàn đã làm việc liên tục, các y-bác sĩ, dược sĩ và tình nguyện viên thay phiên làm việc xuyên cả buổi trưa. ','https://res.cloudinary.com/dvgpizkep/image/upload/v1697371602/aaziaij4lan8wwgek7lr.jpg','KHÁM BỆNH TỪ THIỆN TẠI XÃ TÂN LỢI VÀ AN HẢO, HUYỆN TỊNH BIÊN, TỈNH AN GIANG'),(1,'2023-10-19 21:53:21.399000',5,'',NULL,''),(1,'2023-10-19 21:53:49.197000',6,'',NULL,'');

-- address

INSERT INTO `address` (latitude,longitude,id,project_id,user_id,name,status) VALUES 
(10.762622,106.660172 ,1,1,1,'Địa chỉ 1','ACCEPTED'),
(20.865139,106.683830 ,2,1,3,'Địa chỉ 2','PENDING'),
(9.602521,105.973907 ,3,2,2,'Địa chỉ 3','ACCEPTED'),
(16.463713,107.590866 ,4,2,4,'Địa chỉ 4','PENDING'),
(10.924067,106.713028 ,5,3,2,'Địa chỉ 5','ACCEPTED'),
(18.679585,105.681335 ,6,3,1,'Địa chỉ 6','ACCEPTED'),
(20.959902,107.042542 ,7,4,1,'Địa chỉ 7','ACCEPTED');


