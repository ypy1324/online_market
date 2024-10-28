import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "../style/detail.css";

function Detail() {
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteHandler = () => {
    if (window.confirm("Delete this post?")) {
      let body = {
        postNum: params.postNum,
      };

      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("Post has been deleted");
            navigate("/");
          }
        })
        .catch((e) => {
          alert("Failed to delete post");
        });
    }
  };

  return (
    <div className="detail-wrapper">
      {flag ? (
        <div>
          <div className="detail-post">
            <div className="detail-title">{postInfo.title}</div>
            {postInfo.image ? (
              <img
                src={`http://localhost:5000/${postInfo.image}`}
                className="detail-img"
              />
            ) : null}
            <div className="detail-content">{postInfo.content}</div>
          </div>
          <div className="detail-btn-wrapper">
            <Link to={`/edit/${postInfo.postNum}`}>
              <button className="detail-edit-btn">Edit</button>
            </Link>
            <button
              className="detail-delete-btn"
              onClick={() => {
                deleteHandler();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="detail-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default Detail;
