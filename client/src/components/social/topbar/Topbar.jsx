import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Nav } from "react-bootstrap";
import { UserContext } from "../../../App";
import ApiConfig, { authApi, endpoints } from "../../../configs/ApiConfig";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { auth } from "../../../configs/Firebase";

const Topbar = () => {
  const [user] = useContext(UserContext);
  const [avatar, setAvatar] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [kw, setKw] = useState("");

  const [notification, setNotification] = useState([]);
  const [noti, setNoti] = useState();

  const nav = useNavigate();

  const openSearchMenu = () => {
    setToggleSearch(true);
  };
  const closeSearchMenu = () => {
    setToggleSearch(false);
  };

  const handleInputChange = (event) => {
    setKw(event.target.value);
  };

  const search = (evt) => {
    evt.preventDefault();
    nav(`/social/?kw=${kw}`);
  };

  const readNoti = async () => {
    const res = await authApi().put(endpoints["read-noti"](user.id))
    setNoti(0);
  }

  const toggleDropdown = () => {
    readNoti();
    setShowDropdown(!showDropdown);
  };

  const notifications = async () => {
    try {
      const res = await authApi().get(endpoints["notification"](user.id));
      setNotification(res.data);

      let currentNotificationCount = 0;

      const notiCurrent = res.data.map((n) => {
        // Kiểm tra điều kiện và tăng currentNotificationCount nếu cần
        if (n.status === false) {
          currentNotificationCount++;
        }

        // Trả về giá trị của n, bạn có thể làm gì đó với n ở đây nếu cần
        // return n;
      });

      console.log("Số lượng thông báo hiện tại:", currentNotificationCount);
      setNoti(currentNotificationCount);

      const notiPromises = res.data.map((p) => {
        // const userId = p.userId;
        return ApiConfig.get(endpoints["notification"](user.id)).then(
          (response) => response.data
        );
      });

      console.log(notiPromises);

      const reactionsData = await Promise.all(notiPromises);

      const totalNoti = {};
      reactionsData.forEach((data, index) => {
        const userId = res.data[index].id;
        totalNoti[userId] = data.length;
      });

      console.log(totalNoti);

      setNoti(totalNoti.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadUserById = async () => {
      try {
        let res = await authApi().get(endpoints["userId"](user.id));
        setAvatar(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    notifications();
    loadUserById();

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
  }, []);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social Charity</span>
      </div>
      <div className="topbarCenter">
        <div className="">
          {toggleSearch ? (
            <FontAwesomeIcon
              icon={faSearch}
              color="#38b6ff"
              size="lg"
              onClick={() => closeSearchMenu()}
              className="cursor-pointer ml-1"
              fixedWidth
            />
          ) : (
            <FontAwesomeIcon
              icon={faSearch}
              color="white"
              size="lg"
              onClick={() => openSearchMenu()}
              className="cursor-pointer ml-1"
              fixedWidth
            />
          )}
          {toggleSearch ? (
            <div className="-z-100 ">
              <div
                className={`group ${
                  scrolled
                    ? "top-[170px] left-[100%]"
                    : "top-[170px] left-[100%]"
                } flex flex-col left-0 absolute  w-60  bg-white z-100 text-black`}
              >
                <div className="flex items-center max-w-screen-2xl border-b-2 border-[#38b6ff]">
                  {/* <img src='./assets/bean.png' className='w-6 absolute top-4 left-[10]' /> */}
                  <input
                    className="appearance-none bg-transparent border-none w-full text-[#000] font-medium pl-8 leading-tight focus:outline-none  placeholder:text-[#404040] placeholder:font-normal text-lg"
                    type="text"
                    placeholder="Tìm kiếm trên social"
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
            <></>
          )}
        </div>
        <br />
        <div className="topbarRight">
          <div className="topbarLinks"></div>
          <div className="topbarIcons">
            <div className="topbarIconItem ml-1" onClick={toggleDropdown}>
              <Notifications />
              <span className="topbarIconBadge">{noti}</span>
              {showDropdown && (
                <div className="dropdownContent">
                  <div className="notificationContainer">
                    {notification.map((n, index) => (
                      <Link
                        to={`/noti/?id=${n.post.id}`}
                        key={index}
                        className="notificationItem nav-link mt-2"
                      >
                        <span className={n.status ? "" : "grayBackground"}>
                          {n.description} <br />{" "}
                          {moment(n.createDate).fromNow()}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="topbarRight"></div>
    </div>
  );
};

export default Topbar;
