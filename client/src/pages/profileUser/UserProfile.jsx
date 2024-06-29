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
  const [avt, setAvt] = useState("");

  const nav = useNavigate();

  const [profile, setProfile] = useState({
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    phone: user.profile.phone,
    address: user.profile.address,
    career: user.profile.career,
  });

  const [profileCurrent, setProfileCurrent] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    career: "",
  })

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

      userForm.append("firstName", profile.firstName);
      userForm.append("lastName", profile.lastName);
      userForm.append("phone", profile.phone);
      userForm.append("address", profile.address);
      userForm.append("career", profile.career);
      if (avatar.current.files[0] === undefined) {
        userForm.append("avatar", avatarSrc);
      } else {
        userForm.append("avatar", avatar.current.files[0]);
      }

      try {
        let profileData = await authApi().put(endpoints["profile"], userForm);

        console.log(userForm);

        setSuccessMessage("Cập nhật hồ sơ thành công");

        updateUserContext(profileData.data);
        

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

  const updateUserContext = (newProfileData) => {
    // Dispatch action to update user context
    dispatch({ type: "UPDATE_USER", payload: newProfileData });
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const vietnamPhoneNumberRegex = /^(0[1-9])+([0-9]{8})$/;
    return vietnamPhoneNumberRegex.test(phoneNumber);
  };

  useEffect(() => {
    const userCurrent = async () => {
      const res = await authApi().get(endpoints["current-user"]);
      setAvt(res.data.profile.avatar);
      setProfileCurrent({
        firstName: res.data.profile.firstName,
        lastName: res.data.profile.lastName,
        phone: res.data.profile.phone,
        address: res.data.profile.address,
        career: res.data.profile.career,
      });
      console.log(res.data);
    }

    userCurrent();
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
                                src={avt}
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
                                  Họ và tên đệm:
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
                                        placeholder="Nhập họ và tên đệm..."
                                        defaultValue={profileCurrent.lastName}
                                        required
                                        className="form-control"
                                      />{" "}
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
                                        placeholder="Nhập tên..."
                                        defaultValue={profileCurrent.firstName}
                                        required
                                        className="form-control"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Địa chỉ: 
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => change(e, "address")}
                                        placeholder="Nhập địa chỉ..."
                                        defaultValue={profileCurrent.address}
                                        required
                                        className="form-control"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <Form.Label className="form-label">
                                  Công việc hiện tại:
                                </Form.Label>
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group has-icon-left">
                                  <div className="position-relative">
                                    <div className="form-control-icon">
                                      <i data-feather="user"></i>
                                      <Form.Control
                                        type="text"
                                        onChange={(e) => change(e, "career")}
                                        placeholder="Nhập công việc hiện tại..."
                                        defaultValue={profileCurrent.career}
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
                                        placeholder="Nhập số điện thoại..."
                                        defaultValue={profileCurrent.phone}
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
    </>
  );
};

export default UserProfile;
