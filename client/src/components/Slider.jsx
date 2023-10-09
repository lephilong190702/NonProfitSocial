import React from "react";
import reactIcon from "../assets/background.jpg";
import { Button, Row } from "react-bootstrap";

const Slider = () => {
  return (
    <div className="relative w-full h-128 overflow-hidden">
      <img className="w-full object-cover" src={reactIcon} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center text-white">
          <h4>"Chúng tôi cùng với bạn, trên hành trình kiếm tìm hạnh phúc</h4>
          <h4> bằng cách lan tỏa lòng nhân ái, chuyển hóa khổ đau."</h4>
        </div>

        <div className="flex gap-4 text-blue background-white">
          <Button>Kiểm tra đóng góp</Button>
          <Button>Trở thành đối tác</Button>
          <Button>Quy tắc ứng xử</Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
