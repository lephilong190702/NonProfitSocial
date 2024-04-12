import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./footer.css";

const CustomFooter = () => {
  return (
    <>
      {/* <div className="flex flex-col font-Montserrat select-none">
        <div className="py-6 md:flex flex-row justify-between  md:px-14 md:py-6 text-sm text-[#007bff] bg-[#9cd9fd]">
          <div className="md:flex items-center flex-row gap-4 md:px-10">
            <img className="mx-auto md:mx-0" src="./assets/rabbit.svg" />
            <p className="text-center md:pt-0 pt-2">
              Trợ thành tình nguyện viên
            </p>
          </div>
          <div className="pt-6 md:pt-0 md:flex items-center flex-row gap-4 md:px-10">
            <img className="mx-auto md:mx-0" src="./assets/leaf.svg" />
            <p className="text-center md:pt-0 pt-2">
              Trợ giúp xuất ăn giá rẻ
            </p>
          </div>
          <div className="pt-6 md:pt-0 md:flex items-center flex-row gap-4 md:px-10">
            <img className="mx-auto md:mx-0" src="./assets/rice.svg" />
            <p className="text-center md:pt-0 pt-2">
              Trợ giúp y tế
            </p>
          </div>
          <div className="pt-6 md:pt-0 md:flex items-center flex-row gap-4 md:px-10">
            <img className="mx-auto md:mx-0" src="./assets/package.svg" />
            <p className="text-center md:pt-0 pt-2">Dễ dàng quyên góp</p>
          </div>
        </div>
      </div> */}
      <br />
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
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
            <p>Email nhận tin tức: abc@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Bản quyền © 2023 Công ty TNHH ABC. Mọi quyền được bảo lưu.</p>
        </div>
      </div>
    </>
  );
};

export default CustomFooter;
