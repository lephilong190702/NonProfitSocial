import React from "react";

const Guide = () => {
  const textStyle = {
    color: "red",
  };

  const imgStyle = {
    maxWidth: "50%", // Adjust this value as needed
    height: "auto",
    display: "block",
    margin: "0 auto",
  };

  return (
    <>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Dưới đây là danh sách các dự án từ thiện</h3>
        <h3 style={textStyle}>Các dự án có nút đóng góp thì có thể quyên góp được, còn cái dự án có nút đã hoàn thành thì không thể quyên góp</h3>
        <img style={imgStyle} src="./src/assets/projects.jpg" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Có thể quyên góp hiện kim hoặc hiện vật khi nhấn vào 2 nút dưới đây</h3>
        <img style={imgStyle} src="./src/assets/project_detail.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Dưới đây là danh sách các dự án từ thiện</h3>
        <img style={imgStyle} src="./src/assets/news.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Các tin tức ngoài khi nhấn vào sẽ ra tin tức ở trang web bên ngoài hệ thống, các tin tức có thể chia sẻ trên mạng xã hội khác như facebook, ... và có thể bình luận</h3>
        <img style={imgStyle} src="./src/assets/news_detail.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Có thể xem sao kê các lần quyên góp của tất cả người dùng trên hệ thống theo năm, quý, tháng</h3>
        <img style={imgStyle} src="./src/assets/year.png" />
        <img style={imgStyle} src="./src/assets/month.png" />
        <img style={imgStyle} src="./src/assets/quarter.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Có thể xem livestream bằng cách chọn tab livestream và nhập mã phòng, hoặc khi có livestream bắt đầu, vui lòng kiểm tra email của bạn để nhận link tham gia</h3>
        <img style={imgStyle} src="./src/assets/livestream123.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Có thể đăng bài viết, bình luận, tương tác, nhắn tin trực tuyến thời gian thực ở tab mạng xã hội</h3>
        <img style={imgStyle} src="./src/assets/social.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Có thể gửi bài viết về tổ chức để có thể được duyệt nếu đáp ứng đủ giấy tờ, điều kiện cần thiết</h3>
        <img style={imgStyle} src="./src/assets/uploadproject.png" />
      </div>
      <div className="mt-5 text-center">
        <h3 style={textStyle}>Có thể đăng làm tình nguyện viên nếu bạn có đam mê, hãy điền vào biểu mẫu bên dưới</h3>
        <img style={imgStyle} src="./src/assets/volunteer.png" />
      </div>
    </>
  );
};

export default Guide;
