import React, { useEffect, useState } from "react";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

const Guide = () => {
  return (
    <>
      <div>
        <p>Dưới đây là danh sách các dự án từ thiện</p>
        <p>Các dự án có nút đóng góp thì có thể quyên góp được, còn cái dự án có nút đã hoàn thành thì không thể quyên góp</p>
        <img src="./src/assets/projects.jpg" />
      </div>
      <div>
        <p>Có thể quyên góp hiện kim hoặc hiện vật khi nhấn vào 2 nút dưới đây</p>
        <img src="./src/assets/project_detail.png" />
      </div>
    </>
  );
};

export default Guide;
