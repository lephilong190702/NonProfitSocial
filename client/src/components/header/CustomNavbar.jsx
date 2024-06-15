import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import MySpinner from "../../layout/MySpinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ApiConfig, { authApi, endpoints } from "../../configs/ApiConfig";
import { UserContext } from "../../App";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const CustomNavbar = () => {
  const [user, dispatch] = useContext(UserContext);
  const [employee, setEmployee] = useState(false);
  const [shipper, setShipper] = useState(false);

  const [newsCategory, setNewsCategory] = useState([]);
  const [projectCategory, setProjectCategory] = useState([]);
  const [kw, setKw] = useState("");
  const [stats, setStats] = useState();

  const nav = useNavigate();
  // const history = useHistory();

  const [scrolled, setScrolled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const [toggleSearch, setToggleSearch] = useState(false);

  const openSearchMenu = () => {
    setToggleSearch(true);
  };
  const closeSearchMenu = () => {
    setToggleSearch(false);
  };

  const toggleMobileMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        let res = await ApiConfig.get(endpoints["newsCategory"]);
        setNewsCategory(res.data);
      } catch (error) {
        console.log(error);
      }

      const handleScroll = () => {
        if (window.scrollY > 1000) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    const loadProjects = async () => {
      try {
        let res = await ApiConfig.get(endpoints["projectCategory"]);
        setProjectCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const isEmployee = async () => {
      try {
        const response = await authApi().get(endpoints["current-user"]);
        const userId = response.data.id;
        const res = await authApi().get(
          endpoints["check-employee-role"](userId)
        );
        console.log(res.data);
        if (res.data === true) {
          setEmployee(true);
          console.log(employee);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const isShipper = async () => {
      try {
        const response = await authApi().get(endpoints["current-user"]);
        const userId = response.data.id;
        const res = await authApi().get(
          endpoints["check-shipper-role"](userId)
        );
        console.log(res.data);
        if (res.data === true) {
          setShipper(true);
          // console.log(employee);
        }
      } catch (error) {
        console.log(error);
      }
    };

    isShipper();
    isEmployee();
    loadProjects();
    loadNews();
  }, [user]);

  const exportFinancialReport = async () => {
    try {
      const response = await ApiConfig.get(endpoints["statistic"], {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "financial_report.xlsx");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setKw(event.target.value);
  };

  const search = (evt) => {
    evt.preventDefault();
    nav(`/?kw=${kw}`);
  };

  const logout = () => {
    setEmployee(false);

    dispatch({
      type: "logout",
    });
    nav("/login");
  };

  if (newsCategory.length === 0) return <MySpinner />;
  if (projectCategory.length === 0) return <MySpinner />;

  return (
    <>
      <div
        className={`font-Montserrat w-full top-0 z-[1000] duration-500 ease-in-out ${
          scrolled ? "bg-[#d6fcdf]" : "bg-white"
        }`}
      >
        <div className="bg-[#d3d3d3] pl-[10px]">
          {scrolled ? (
            <div></div>
          ) : (
            <div className="flex justify-center md:justify-end md:pr-[50px] ">
              <div className="flex flex-row items-center color-[#0e740e] p-[0.2rem] mr-[10px]">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  color="#a9a9a9"
                  size="lg"
                  style={{ paddingRight: "5px" }}
                  fixedWidth
                />
                <p className="text-[13px] h-[10px]">VIETNAM</p>
              </div>
              <div className="flex flex-row items-center justify-between color-[#0e740e] px-[10px] mr-[10px]">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  color="#a9a9a9"
                  size="lg"
                  style={{ paddingRight: "5px" }}
                  fixedWidth
                />
                <p className="text-[13px] h-[10px]">CONTACT US</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <nav>
            <div className="flex flex-row px-5 py-5 md:px-20 md:py-5 border-b ">
              <a className="flex  md:pt-1">
                <img
                  src="/src/assets/charityLogo.png"
                  className="w-full md:w-60"
                  alt="Quỹ từ thiện"
                />
              </a>

              <div className="hidden ml-8  font-bold  w-full md:flex md:w-auto md:items-center md:justify-between md:order-1 ">
                <ul className="flex justify-center items-center gap-8 mr-16 text-[14px]">
                  <div>
                    <li className="top-menu-item">
                      <Link to="/" className="nav-link top-menu-item">
                        TRANG CHỦ
                      </Link>
                    </li>
                  </div>

                  <div>
                    <div className="group">
                      <li className="top-menu-item">
                        <Link
                          to="/projects-map"
                          className="nav-link top-menu-item"
                        >
                          DỰ ÁN
                        </Link>
                      </li>
                      <div className="hidden group-hover:flex flex-col absolute left-0 p-10  w-full bg-transparent z-20 text-black duration-300"></div>
                      <div
                        className={`group ${
                          !user ? "top-[145px]" : "top-[138px]"
                        }  duration-500 h-0 overflow-hidden group-hover:h-[115px] absolute bg-white z-20 text-black duration-800`}
                      >
                        <div className="border-b-[1px] border-b-[#e6e1e1]">
                          <div className="mx-1  pt-1">
                            <div className="flex flex-col top-menu-text">
                              {projectCategory.length > 0 &&
                                projectCategory.map((c) => {
                                  let h = `/projects/?cateId=${c.id}`;
                                  return (
                                    <Link
                                      to={h}
                                      className="news-link"
                                      key={c.id}
                                    >
                                      {c.name}
                                    </Link>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <li className="top-menu-item group">
                      <Link to="/livestream" className="nav-link">
                        LIVESTREAM
                      </Link>
                    </li>
                  </div>

                  <div>
                    <div className="group">
                      <li className="top-menu-item group">
                        {/* <Nav.Link
                        href="#financial_report"
                        onClick={exportFinancialReport}
                      >
                        BÁO CÁO TÀI CHÍNH
                      </Nav.Link> */}
                        <Link to="/statistic" className="nav-link">
                          BÁO CÁO TÀI CHÍNH
                        </Link>
                      </li>
                      <div className="hidden group-hover:flex flex-col absolute left-0 p-10  w-full bg-transparent z-20 text-black duration-300"></div>
                      <div
                        className={`group ${
                          !user ? "top-[145px]" : "top-[138px]"
                        }  duration-500 h-0 overflow-hidden group-hover:h-[80px] absolute bg-white z-20 text-black duration-800`}
                      >
                        <div className="border-b-[1px] border-b-[#e6e1e1]">
                          <div className="mx-1  pt-1">
                            <div className="flex flex-col top-menu-text">
                                <Link to="/statistic" className="news-link">Báo cáo theo năm</Link>
                                <Link to="/statistic-mon" className="news-link">Báo cáo theo tháng</Link>
                                <Link to="/statistic-quar" className="news-link">Báo cáo theo quý</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="group">
                      <li className="top-menu-item">
                        <Link to="" className="nav-link top-menu-item">
                          TIN TỨC
                        </Link>
                      </li>
                      <div className="hidden group-hover:flex flex-col absolute left-0 p-10  w-full bg-transparent z-20 text-black duration-300"></div>
                      <div
                        className={`group ${
                          !user ? "top-[145px]" : "top-[138px]"
                        }  duration-500 h-0 overflow-hidden group-hover:h-[115px] absolute bg-white z-20 text-black duration-800`}
                      >
                        <div className="border-b-[1px] border-b-[#e6e1e1]">
                          <div className="mx-1  pt-1">
                            <div className="flex flex-col top-menu-text">
                              {newsCategory.length > 0 &&
                                newsCategory.map((c) => {
                                  let h = `/news/?cateId=${c.id}`;
                                  return (
                                    <Link
                                      to={h}
                                      className="news-link"
                                      key={c.id}
                                    >
                                      {c.name}
                                    </Link>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <li className="top-menu-item group">
                      <Link to="/social" className="nav-link">
                        MẠNG XÃ HỘI
                      </Link>
                    </li>
                  </div>

                  <div>
                    <li className="top-menu-item group">
                      <Link to="/registerVol" className="nav-link">
                        LIÊN HỆ
                      </Link>
                    </li>
                  </div>
                  {employee && (
                    <div>
                      <li className="top-menu-item group">
                        <Link to="/accept_post" className="nav-link">
                          DUYỆT BÀI
                        </Link>
                      </li>
                    </div>
                  )}
                  {shipper && (
                    <div>
                      <li className="top-menu-item group">
                        <Link to="/delivery" className="nav-link">
                          VẬN CHUYỂN
                        </Link>
                      </li>
                    </div>
                  )}
                  
                  <div>
                    <li className="top-menu-item group">
                      <Link to="/upload-project" className="nav-link">
                        GỬI DỰ ÁN
                      </Link>
                    </li>
                  </div>
                  <div className="hidden md:flex items-center justify-between  font-bold">
                    {/* <div> */}
                    <li className="flex flex-row select-none ">
                      {toggleSearch ? (
                        <FontAwesomeIcon
                          icon={faSearch}
                          color="#38b6ff"
                          size="lg"
                          onClick={() => closeSearchMenu()}
                          className="cursor-pointer"
                          fixedWidth
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faSearch}
                          color="#000"
                          size="lg"
                          onClick={() => openSearchMenu()}
                          className="cursor-pointer"
                          fixedWidth
                        />
                      )}
                      {toggleSearch ? (
                        <div className="-z-100 ">
                          <div
                            className={`group ${
                              scrolled
                                ? "top-[110px]"
                                : "top-[150px] left-[65%]"
                            } flex flex-col left-0 absolute  w-30  bg-white z-20 text-black`}
                          >
                            <div className="flex items-center max-w-screen-2xl border-b-2 border-[#38b6ff]">
                              {/* <img src='./assets/bean.png' className='w-6 absolute top-4 left-[10]' /> */}
                              <input
                                className="appearance-none bg-transparent border-none w-full text-[#000] font-medium pl-8 leading-tight focus:outline-none  placeholder:text-[#404040] placeholder:font-normal text-lg"
                                type="text"
                                placeholder="Bạn đang tìm gì?"
                                aria-label="Full name"
                                value={kw}
                                onChange={handleInputChange}
                              />
                              <FontAwesomeIcon
                                icon={faSearch}
                                color="#38b6ff"
                                className="pb-1 float-left cursor-pointer"
                                size="2x"
                                fixedWidth
                                onClick={search}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </li>
                    {/* </div> */}
                  </div>
                  {user === null ? (
                    <>
                      <div className="hidden md:flex items-center font-bold w-auto md:order-1">
                        <div className="border-solid border-r-2 border-[#767373] h-6 pl-3"></div>
                      </div>
                      <div className="hidden md:flex items-center justify-center font-bold w-auto md:order-1">
                        <div className="group">
                          <li className="flex flex-row">
                            <div className="flex flex-row items-center group cursor-pointer">
                              <FontAwesomeIcon
                                icon={faUser}
                                color="#000"
                                size="lg"
                                style={{ paddingLeft: "10px" }}
                                className="group-hover:text-[#007fff]"
                                fixedWidth
                              />
                              <div className="flex justify-center items-center text-xs pl-1 md:text-sm font-semibold text-[#000] group-hover:text-[#007fff]">
                                Đăng Nhập
                              </div>

                              <div
                                className={`group ${
                                  scrolled ? "top-[50%]" : "bottom-[-4%]"
                                } hidden group-hover:block absolute top-[64%] right-[18%] w-32 h-5 bg-transparent  z-20 duration-300`}
                              ></div>
                              {/* <div
                            className={`group ${
                              scrolled ? "top-[50%]" : "bottom-[75%]"
                            } hidden group-hover:block absolute right-[20.5%] w-10 h-10 bg-[#007fff] z-20 rotate-45 duration-300`}
                          ></div> */}

                              <div
                                className={`group ${
                                  scrolled ? "top-[50%]" : "bottom-[63.5%]"
                                } hidden group-hover:block absolute right-[5%] px-4 py-3 w-15 h-15 border-2 rounded-sm bg-white z-20 text-black duration-800`}
                              >
                                <div className="flex flex-col gap-3 ">
                                  {/* <Link to='./login'> */}
                                  <div className="flex justify-center bg-[#38b6ff] text-sm text-[#fff] py-2 px-12 hover:bg-[#007fff] cursor-pointer">
                                    <Link to="/login" className=" nav-link ">
                                      Đăng nhập
                                    </Link>
                                  </div>
                                  {/* </Link> */}
                                  {/* <Link to='./signup'> */}
                                  <div className="flex justify-center  bg-[#38b6ff] text-sm text-[#fff] py-2 px-12 hover:bg-[#007fff] cursor-pointer">
                                    <Link to="/register" className="nav-link">
                                      Đăng ký
                                    </Link>
                                  </div>
                                  {/* </Link> */}
                                </div>
                              </div>
                            </div>
                          </li>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:flex items-center font-bold w-auto">
                        <div className="border-solid border-r-2 border-[#767373] h-6 pl-3"></div>
                      </div>
                      <Link to="/userProfile" className="text-danger nav-link ">
                        Chào {user.username}!
                      </Link>
                      <Link
                        to="/login"
                        className="nav-link "
                        variant="secondary"
                        onClick={logout}
                      >
                        Đăng xuất
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default CustomNavbar;
