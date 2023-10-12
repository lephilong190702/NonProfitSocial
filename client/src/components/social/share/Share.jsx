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
    files: [],
  });

  const images = useRef();

  const handleImageUpload = (event) => {
    const selectedImages = event.target.files;
    const imageArray = Array.from(selectedImages);
    console.log(imageArray);
    setShare((current) => ({
      ...current,
      files: current.files.concat(imageArray),
    }));
  };

  const sharePosted = (event) => {
    event.preventDefault();

    const process = async () => {
      let shareForm = new FormData();
      shareForm.append("content", share.content);
      shareForm.append("tags", share.tags);

      share.files.forEach((image, index) => {
        shareForm.append(`files[${index}]`, image);
      });

        if (share.files.length > 0)
          for (let i = 0; i < share.files.length; i++) {
            shareForm.append("files", share.files[i]);
          }

      try {
        let res = await authApi().post(endpoints["post"], shareForm);
        console.log(res.data);
        console.log(shareForm)
        setSuccessMessage("Đăng bài thành công");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setShare({ content: "", tags: "", files: [] });
      } catch (error) {
        console.error(error.response.data);
      }
    };
    // console.log(share.content, share.tags, share.files);
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
            value={share.content}
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
              <label htmlFor="imageUpload">
                <PermMedia htmlColor="tomato" className="shareIcon" />
              </label>
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="imageUpload"
                ref={images}
                style={{ display: "none" }}
                multiple
                onChange={handleImageUpload}
              />
              {share.files.length > 0 && (
                <span>{share.files.length} image(s) selected</span>
              )}
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
