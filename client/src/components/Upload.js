import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload";

function Upload(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return alert("Please fill in all blanks");
    }

    let body = {
      title: title,
      content: content,
      image: image,
    };

    axios
      .post("/api/post/submit", body)
      .then((res) => {
        if (res.data.success) {
          alert("Post uploaded");
          navigate("/");
        } else {
          alert("Post did not upload. Try again");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="upload-wrapper">
      <form className="upload-form">
        <label className="upload-label">Title</label>
        <input
          id="title"
          className="upload-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <ImageUpload setImage={setImage} />
        <label className="upload-label">Content</label>
        <textarea
          id="content"
          className="upload-content"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <div className="upload-btn-wrapper">
          <button
            className="upload-submit"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
