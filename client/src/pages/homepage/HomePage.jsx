import NewsPage from "../NewsPage";
import ProjectPage from "../ProjectPage";
import { Outlet } from "react-router-dom";
import "./homePage.css";
import { Slider } from "../../components";
import NewsList from "./components/NewsList/NewsList"

const HomePage = () => {
  const sliderUrls = [
    "./src/assets/slider1.jpg",
    "./src/assets/slider2.jpg",
    "./src/assets/slider3.jpg",
  ];
  const sliderTitle = [
    "QUYÊN GÓP TỪ THIỆN TẠI CHARITY ",
    "QUYÊN GÓP TỪ THIỆN TẠI CHARITY ",
    "",
  ];

  const sliderDescription = [
    "Chúng tôi cùng với bạn, trên hành trình tìm kiếm hạnh phúc bằng cách lan tỏa lòng nhân ái, chuyển hóa khổ đau.",
    "Chúng tôi cùng với bạn, trên hành trình tìm kiếm hạnh phúc bằng cách lan tỏa lòng nhân ái, chuyển hóa khổ đau.",
    "",
  ];
  const sliderButton = ["Tìm hiểu thêm", "Tìm hiểu thêm", ""];
  const sliderTitleColor = ["#fff", "#fff"];
  const sliderTitleDescription = ["#fff", "#fff"];
  return (
    <>
      <div className="bg-[#FAF9F5]">
        <Slider
          sliderUrls={sliderUrls}
          title={sliderTitle}
          description={sliderDescription}
          button={sliderButton}
          colorTitle={sliderTitleColor}
          colorDescription={sliderTitleDescription}
        />
        {/* <div className="flex min-h-screen md:pt-[135px] pt-[120px] font-Montserrat">
          <div className="flex flex-col justify-self-end w-full justify-between mb-[100px]">
            <Outlet />
          </div>
          <div></div>
        </div> */}
        <NewsList />
        {/* <NewsPage /> */}
        <ProjectPage />
      </div>
    </>
  );
};

export default HomePage;
