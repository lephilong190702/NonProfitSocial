import React from "react";
import { Link } from "react-router-dom";

const News = ({ id, url, name, content, link }) => {
  const maxContentHeight = 100; 
  const contents = content.length > maxContentHeight ? content.substring(0, maxContentHeight) + '...' : content;
  const names = name.length > maxContentHeight ? name.substring(0, maxContentHeight) + '...' : name;
  return (
    <>
    <div className="flex flex-col  bg-[#fff] border-[1px] border-[#DFDFDF]">
      <Link to={link}>
        <img className=" w-[100%] h-[250px] rounded-sm" src={url} />
      </Link>
      <Link className="custom-card-link" to={link}>
        <p className="basis-1/3 pt-5 pl-4 font-bold text-base text-[#38b6ff] hover:text-[#059df4] cursor-pointer">
          {" "}
          {names}
        </p>
      </Link>
      <p className="basis-1/3 pt-1 pl-4 pr-2 font-medium  text-sm truncate whitespace-normal ">
        {" "}
        {contents}
      </p>
      <div className="basis-1/4 flex flex-row justify-between pb-3">
        {/* <p className="pt-5 pl-4 font-semibold text-lg"> {price}</p> */}
        <div className="py-4 pr-3">
          <Link to={link} className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default News;
