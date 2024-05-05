import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { Header } from "../../components";
import "./userProfile.css";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate();

  const [profile, setProfile] = useState({
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    phone: user.profile.phone,
  });

  const avatar = useRef(user.profile.avatar);

  console.log(avatar);

  const loadAvatar = async () => {
    try {
      const response = await fetch(user.profile.avatar);
      const blob = await response.blob();

      const imageFile = new File([blob], "avatar.jpg", { type: "image/jpeg" });

      setAvatarSrc(imageFile);
    } catch (error) {
      console.error("Error loading avatar:", error);
    }
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const process = async () => {
      if (!isPhoneNumberValid) {
        setErrorMessage("Vui lòng nhập đúng thông tin!!!");
        return;
      }
      let userForm = new FormData();

      console.log(avatar.current.file);
      userForm.append("firstName", profile.firstName);
      userForm.append("lastName", profile.lastName);
      userForm.append("phone", profile.phone);
      if (avatar.current.files[0] === undefined) {
        userForm.append("avatar", avatarSrc);
      } else {
        userForm.append("avatar", avatar.current.files[0]);
      }

      console.log(avatar.current.files[0]);
      try {
        let profileData = await authApi().put(endpoints["profile"], userForm);

        console.log(userForm);

        setSuccessMessage("Cập nhật hồ sơ thành công");

        setTimeout(() => {
          setSuccessMessage("");
          nav("/");
        }, 2000);
      } catch (ex) {
        console.error(ex);
      }
    };

    process();
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const vietnamPhoneNumberRegex = /^(0[1-9])+([0-9]{8})$/;
    return vietnamPhoneNumberRegex.test(phoneNumber);
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  const change = (evt, field) => {
    if (field === "phone") {
      const phoneNumber = evt.target.value;
      setIsPhoneNumberValid(isValidPhoneNumber(phoneNumber));
    }

    setProfile((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  return (
    <>
      <div className="main-content container-fluid" layout:fragment="content">
        <h1 className="form-heading">HỒ SƠ CÁ NHÂN</h1>
        <Form onSubmit={updateProfile}>
          <div className="container-profile">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-horizontal">
                    <div className="form-body">
                      <span>
                        <div className="row">
                          <div className="col-md-4">
                            <span style={{
                              display: 'inline-block',
                              overflow: 'hidden',
                              borderRadius: '50%',
                              border: '2px solid black',
                              width: '250px',
                              height: '250px',
                              marginTop: '20px'
                            }}>
                              <img
                                src={user.profile.avatar}
                                width="250"
                                height="250"
                                style={{
                                  objectFit: 'cover',
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '50%'
                                }}
                              />
                            </span>
                          </div>
                          <div className="col-md-8">
                            <div className="row mt-2">
                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Tài khoản:
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <span>{user.username}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Tên:
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => change(e, "firstName")}
                                        placeholder="Tên"
                                        defaultValue={user.profile.firstName}
                                        required
                                        className="form-control"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Họ và chữ lót:
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => change(e, "lastName")}
                                        placeholder="Họ và chữ lót"
                                        defaultValue={user.profile.lastName}
                                        required
                                        className="form-control"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Số điện thoại:
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <Form.Control
                                        type="number"
                                        onChange={(e) => change(e, "phone")}
                                        placeholder="Điện thoại"
                                        defaultValue={user.profile.phone}
                                        className="form-control"
                                      />
                                      {!isPhoneNumberValid && (
                                        <div className="text text-danger">
                                          Số điện thoại không hợp lệ
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Ảnh đại diện
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <Form.Control
                                        type="file"
                                        ref={avatar}
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Form.Group className="form-group text-center">
            {errorMessage && (
              <div className="text text-danger">{errorMessage}</div>
            )}
            <button
              variant="info"
              type="submit"
              className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
            >
              Cập nhật hồ sơ
            </button>
          </Form.Group>
        </Form>
      </div>
      {/* <div className="profile-container">
        <h1 className="form-heading">HỒ SƠ NGƯỜI DÙNG</h1>

        <Form onSubmit={updateProfile}>
          <div className="flex flex-row space-x-10">
            <Form.Group className="form-group">
              <Form.Label className="form-label">Tên:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => change(e, "firstName")}
                placeholder="Tên"
                defaultValue={user.profile.firstName}
                required
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Họ và chữ lót:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => change(e, "lastName")}
                placeholder="Họ và chữ lót"
                defaultValue={user.profile.lastName}
                required
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Điện thoại:</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => change(e, "phone")}
                placeholder="Điện thoại"
                defaultValue={user.profile.phone}
                className="form-control"
              />
              {!isPhoneNumberValid && (
                <div className="text text-danger">
                  Số điện thoại không hợp lệ
                </div>
              )}
            </Form.Group>
          </div>

          <Form.Group className="form-group">
            <Form.Label className="form-label">Ảnh đại diện</Form.Label>
            <div className="flex flex-row space-x-4">
              <Form.Control type="file" ref={avatar} className="form-control" />
              <div className="">
                <div
                  className="rounded-full overflow-hidden"
                  style={{ width: "70px", height: "70px" }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={user.profile.avatar}
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="form-group text-center">
            {errorMessage && (
              <div className="text text-danger">{errorMessage}</div>
            )}
            <button
              variant="info"
              type="submit"
              className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
            >
              Cập nhật hồ sơ
            </button>
          </Form.Group>
        </Form>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
      </div> */}
    </>
  );
};

export default UserProfile;
