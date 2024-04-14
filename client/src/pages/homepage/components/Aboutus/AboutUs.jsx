import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-screen-2xl px-48 flex flex-row ">
      <div className="basis-4/5 bg-[#38b6ff] pl-20 pr-6 py-10 text-[#fff]">
        <h1 className="font-semibold text-[24px]">Về Chúng Tôi</h1>
        <p className="font-normal text-sm pt-2 leading-6">
          Chúng tôi tin rằng tự thiện là việc làm kết nối giữa người với người.
          Mục đích của chúng tôi là lan tỏa tính yêu thương đến với những con
          người, hộ gia đình thật sự khó khăn.
        </p>
        <button className="mt-3 font-normal text-[#fff] text-[13px] border-2 px-6 py-3 hover:bg-[#1775ee] hover:text-[#fff] hover:shadow-md hover:shadow-[#1775ee]">
          Khám Phá Thêm
        </button>
      </div>
      <div className="basis-3/5">
        <img
          className="w-[100%] h-[100%] bg-center bg-cover"
          src="./src/assets/AboutUs.jpg"
        />
      </div>
    </div>
  );
};

export default AboutUs;
