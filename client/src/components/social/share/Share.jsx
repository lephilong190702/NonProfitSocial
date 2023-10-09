import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { UserContext } from "../../../App";
import ApiConfig, { authApi, endpoints } from "../../../configs/ApiConfig";
import { Button, Form } from "react-bootstrap";

const Share = () => {
  const [user] = useContext(UserContext);
  const [postText, setPostText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [share, setShare] = useState({
    content: "",
    tags: "",
    images: [], // Mảng lưu trữ các tệp hình ảnh đã chọn
  });

  const images = useRef();

  const handleImageUpload = (event) => {
    const selectedImages = event.target.files;
    const imageArray = Array.from(selectedImages);
    setShare((current) => ({
      ...current,
      images: imageArray,
    }));
  };

  const sharePosted = async (event) => {
    event.preventDefault();

    const process = async () => {
      let shareForm = new FormData();
      shareForm.append("content", share.content);
      shareForm.append("tags", share.tags);
      share.images.forEach((image, index) => {
        shareForm.append(`images[${index}]`, image);
      });

      try {
        let res = await authApi().post(endpoints["post"], shareForm);

        setSuccessMessage("Đăng bài thành công");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setShare(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    process();
  };

  const change = (evt, field) => {
    setShare((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/public/like.png" alt="" />
          <input
            placeholder="What's in your mind?"
            className="shareInput"
            onChange={(e) => change(e, "content")}
          />
          <Form>
            <Form.Control
              placeholder="Add tags..."
              onChange={(e) => change(e, "tags")}
              value={share.tags}
            />
          </Form>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia
                htmlColor="tomato"
                className="shareIcon"
                onClick={() => images.current.click()}
              />
              <span className="shareOptionText">Photo or Video</span>
              {share.images.length > 0 && (
                <span className="selectedImagesCount">
                  {share.images.length} selected
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                ref={images}
                style={{ display: "none" }}
                multiple
                onChange={handleImageUpload}
              />
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <Button className="shareButton" type="submit" onClick={sharePosted}>
            Share
          </Button>
        </div>
      </div>
      {successMessage && <div className="successMessage">{successMessage}</div>}
    </div>
  );
};

export default Share;
