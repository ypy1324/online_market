import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import "../style/edit.css";

function Edit() {
  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
    setImage(postInfo.image);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return alert("Please fill in all blanks");
    }

    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
      image: image,
    };

    axios
      .post("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("Post updated");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("Post did not update. Try again");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="edit-wrapper">
      <form className="edit-form">
        <label className="edit-label">Title</label>
        <input
          id="title"
          className="edit-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <ImageUpload setImage={setImage} />
        <label className="edit-label">Content</label>
        <textarea
          id="content"
          className="edit-content"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <div className="edit-btn-wrapper">
          <button
            className="edit-cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button
            className="edit-submit"
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

export default Edit;
