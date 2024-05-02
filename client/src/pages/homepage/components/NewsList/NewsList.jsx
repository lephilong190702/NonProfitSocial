import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "../../../../components/news/News";
import Slider from "react-slick";
import { useSearchParams, Link } from "react-router-dom";
import ApiConfig, { endpoints } from "../../../../configs/ApiConfig";
import MySpinner from "../../../../layout/MySpinner";
import { Alert } from "react-bootstrap";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-[-5%] text-2xl rounded-full p-2 bg-black/30 hover:bg-[#38b6ff] text-white cursor-pointer"
    >
      <img src="./src/assets/right-arrow.png" className="w-8" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-[-5%] text-2xl rounded-full p-2 bg-black/30 hover:bg-[#38b6ff] text-white cursor-pointer"
    >
      <img src="./src/assets/left-arrow.png" className="w-8" />
    </div>
  );
}

export default function NewsList() {
  const [news, setNews] = useState(null);
  const [q] = useSearchParams();

  useEffect(() => {
    const loadNews = async () => {
      try {
        let e = endpoints.news;

        const cateId = q.get("cateId");
        if (cateId !== null) e = `${e}ncategories/${cateId}/`;
        else {
          const kw = q.get("kw");
          if (kw !== null) e = `${e}search?kw=${kw}`;
        }

        console.log(e);

        const res = await ApiConfig.get(e);
        setNews(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadNews();
  }, [q]);

  if (news === null) return <MySpinner />;
  if (news.length === 0)
    return (
      <div className="container">
        <Alert variant="info" className="no-news-alert">
          Không có tin tức nào
        </Alert>
      </div>
    );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex flex-col justify-center mt-16 relative group">
      <h1 className="product-title-header">TIN TỨC MỚI NHẤT</h1>
      <div className="max-w-screen-2xl px-[136px] pb-20">
        <Slider {...settings}>
          {news.map((n) => {
            const url = `/news/${n.id}`;
            return (
              <div className="px-2">
                <News
                  id={n.id}
                  url={n.image}
                  name={n.name}
                  content={n.content}
                  link={url}
                />
              </div>
            );
          })}
          {/* {productBestSeller.map((category, index) => (
            <div className="px-2" key={index}>
              <News
                id={1}
                url={category.url}
                name={category.name}
                skinType={category.skinType}
                price={category.price}
                totalStars={category.totalStars}
                totalRates={category.totalRates}
              />
            </div>
          ))} */}
        </Slider>
      </div>
    </div>
  );
}
