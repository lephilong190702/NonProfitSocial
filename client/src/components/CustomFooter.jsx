import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import "./footer.css"

const CustomFooter = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Công ty TNHH ABC</h4>
          <p>Địa chỉ: 123 Đường XYZ, Phường 1, Quận 2, TP. Hồ Chí Minh</p>
          <p>Điện thoại: 028 1234 5678</p>
          <p>Email: abc@gmail.com</p>
        </div>
        <div className="footer-column">
          <h4>Dịch vụ của chúng tôi</h4>
          <ul>
            <li>Thiết kế website</li>
            <li>Phát triển ứng dụng</li>
            <li>Tư vấn giải pháp công nghệ</li>
            <li>Bảo trì và hỗ trợ kỹ thuật</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Kết nối với chúng tôi</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
          <p>Email nhận tin tức: abc@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Bản quyền © 2023 Công ty TNHH ABC. Mọi quyền được bảo lưu.</p>
      </div>
    </div>
  );
};

export default CustomFooter;
