import "./homePage.css";
import { Slider } from "../../components";
import NewsList from "./components/NewsList/NewsList"
import AboutUs from "./components/Aboutus/AboutUs";
import ProjectsList from "./components/ProjectList/ProjectsList";

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
        <NewsList />

        <ProjectsList />

        <AboutUs />
      </div>
    </>
  );
};

export default HomePage;
