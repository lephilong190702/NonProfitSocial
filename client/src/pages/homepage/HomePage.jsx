import "./homePage.css";
import { Slider } from "../../components";
import NewsList from "./components/NewsList/NewsList"
import AboutUs from "./components/Aboutus/AboutUs";
import ProjectsList from "./components/ProjectList/ProjectsList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";
import SearchPage from "../search/SearchPage";

const HomePage = () => {
  const [q] = useSearchParams();
  const [kw, setKw] = useState(false);
  const [news, setNews] = useState(null);
  const [project, setProject] = useState(null);


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

  useEffect(() => {
    const loadNews = async () => {
      try {
        let e = endpoints.news;
        let p = endpoints.project;

        console.log(p);

        const cateId = q.get("cateId");
        if (cateId !== null) e = `${e}ncategories/${cateId}/`;
        else {
          const kw = q.get("kw");
          if (kw !== null){
            e = `${e}search?kw=${kw}`;
            p = `${p}search?kw=${kw}`;
            setKw(true);
          }
          else setKw(false);
        }

        console.log(e);

        const res = await ApiConfig.get(e);
        const res2 = await ApiConfig.get(p);
        setNews(res.data);
        setProject(res2.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadNews();
  },[q])
  return (
    <>
    {kw === false ? (
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

    ) : (
      <SearchPage news={news} project={project} />
    )}
    </>
  );
};

export default HomePage;
