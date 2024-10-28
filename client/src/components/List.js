import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/list.css";

function List(props) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="list-wrapper">
      {postList.map((post, i) => {
        return (
          <div key={i} className="list-post">
            <Link to={`/post/${post.postNum}`}>
              <p className="list-title">{post.title}</p>
              <p>{post.content}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default List;
