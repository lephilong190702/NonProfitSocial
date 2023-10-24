
# HỆ THỐNG QUYÊN GÓP VÀ MẠNG XÃ HỘI TỪ THIỆN

Từ thiện là một hoạt động nhân văn, có ý nghĩa cao đẹp trong xã hội. Tuy nhiên, không phải ai cũng có thể tham gia từ thiện một cách dễ dàng và hiệu quả. Một số người có nhu cầu nhận sự giúp đỡ nhưng không biết đến các tổ chức từ thiện uy tín, hoặc không có cách liên lạc với họ. Một số người có ý định ủng hộ các hoạt động từ thiện nhưng không tìm được thông tin chính xác và minh bạch về các dự án, hoặc không biết cách thanh toán an toàn và tiện lợi.

Để đáp ứng các yêu cầu trên, đề tài "Phát triển hệ thống quyên góp và mạng xã hội từ thiện". Mục tiêu của đề tài này là góp phần nâng cao nhận thức và khuyến khích mọi người tham gia vào các hoạt động từ thiện, cũng như tạo ra một kênh liên kết giữa các tổ chức từ thiện và cộng đồng. Hy vọng ứng dụng của chúng tôi sẽ mang lại nhiều lợi ích cho xã hội và con người.

## Các chức năng của hệ thống

**Chức năng phía người dùng**

- Đăng nhập / Đăng ký
- Xem / Bình luận / Phản hồi tin tức
- Xem / Đóng góp dự án
- Xem thống kê dự án
- Đăng ký tình nguyện viên
- Chỉnh sửa hồ sơ
- Chia sẽ / Reaction / Bình luận / Phản hồi bài viết
- Chỉnh sửa / Xóa / Báo cáo bài viết
- Xem trang cá nhân
- Nhắn tin

**Chức năng phía quản trị**

- Đăng nhập / Đăng ký
- Cập nhật hồ sơ cá nhân
- CRUD danh mục tin tức
- CRUD danh mục dự án
- CRUD danh mục kỹ năng từ thiện
- CRUD tin tức
- CRUD dự án
- CRUD kỹ năng từ thiện
- Xem / Xử lý bài viết bị báo cáo
- Xem / Xuất file excel sao kê quyên góp dự án
- Thống kê quỹ từ thiện
## Các công nghệ sử dụng

**Client:** `ReactJS` `React-Bootstrap` `Redux` `Material UI`

**Server:** `Java Spring Boot`

**Database:** `MySQL`

**Tích hợp:** `Firebase` `VNPAY`

## Hướng dẫn cài đặt
**Bước 1: Cài đặt môi trường:**
- Cài đặt JDK 17 (Java Development Kit): Cài đặt JDK 17 [tại đây](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe (sha256))
- Cài đặt biến môi trường JAVA_HOME bằng cách tìm kiếm trong Window từ Edit the system eviroment variables -> Trong tab Advanced nhấn Environment Variables -> Trong User variables chọn New -> Nhập Variable_name: JAVA_HOME và Browse Directory tới thư mục chứ jdk-17 vừa cài đặt, thường sẽ nằm ở C:\Program Files\Java\jdk-17 -> Nhấn OK
- Cài đặt MySQL Community Server: Cài đặt MySQL Community Server 8.1.0 [tại đây](https://dev.mysql.com/get/Downloads/MySQL-8.1/mysql-8.1.0-winx64.msi)
- Cài đặt MySQL Workbench: Cài đặt MySQL Workbench 8.0.34 [tại đây](https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.34-winx64.msi) 
- Cài đặt Visual Studio Code: Cài đặt Visual Studio Code [tại đây](https://code.visualstudio.com/download), phù hợp với hệ điều hành của máy.
- Cài đặt Extension Pack For Java trong Visual Studio Code: Cài đặt Extension Pack For Java [tại đây](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- Cài đặt NodeJS: Cài đặt NodeJS 18.18.2 LTS [tại đây](https://nodejs.org/dist/v18.18.2/node-v18.18.2-x64.msi)
- Cài đặt IntelliJ IDEA Community: Cài đặt IntelliJ IDEA Community [tai đây](https://www.jetbrains.com/idea/download/download-thanks.html?platform=windows&code=IIC)

**Bước 2: Mở Command Prompt hoặc Git Bash, sau đó nhập lệnh sau để lấy project từ github về máy của mình**

```bash
git clone https://github.com/lephilong190702/NonProfitSocial.git
```

**Bước 3: Mở MySQL Workbench và tạo một schema có tên là charitydb sau đó import data bằng tệp tin charitydb.sql**

**Bước 4: Mở thư mục client bằng Visual Studio Code để chạy giao diện và mở thư mục charity bằng IntelliJ IDEA Community**

**Bước 5: Sau khi đã mở thư mục charity, vào file application.properties và đổi lại các dòng sau đây**

```bash
spring.datasource.username=<Tên đăng nhập MySQL Workbench>
spring.datasource.password=<Mật khẩu MySQL Workbench>
```

Sau khi chỉnh sửa xong, tiến hành chạy server tại file `CharitySocialNetworkApplication.java`. Trang ứng dụng sẽ khởi tạo trên `http://localhost:9090/`

**Bước 6: Sau khi mở thư mục client, thực hiện các lệnh sau tại terminal để chạy project:**

Cài đặt yarn:
```bash
npm install yarn
```
Cài đặt các package cần thiết:

```bash
yarn install
```
Cài đặt extension `Extension Pack for Java` trong Visual Studio Code tại mục Extension.

Chạy ứng dụng:
```bash
yarn dev
```

Sau khi hoàn thành hết mọi thứ, hệ thống sẽ chạy trên `http://localhost:5173/`
## Hướng dẫn sử dụng
Người dùng truy cập vào `http://localhost:5173/` thực hiện đăng ký để sử dụng hoặc đăng nhập bằng tài khoản sau để test:

```bash
Tên đăng nhập: user
Mật khẩu: 123456
```

- Sau khi đăng nhập thành công có thể trải nghiệm các chức năng của người dùng.

Người quản trị truy cập vào `http://localhost:9090/` và sử dụng tài khoản sau để sử dụng:

```bash
Tên đăng nhập: admin
Mật khẩu: 123456
```

- Sau khi đăng nhập thành công có thể trải nghiệm các chức năng của người quản trị.