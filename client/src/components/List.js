import React, { useState, useEffect } from "react";
import axios from "axios";

function List(props) {
  const [text, setText] = useState("");

  useEffect(() => {
    let body = {
      text: "hello",
    };

    axios
      .post("/api/test", body)
      .then((res) => {
        setText(res.data.text);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div>{text}</div>
      {props.contentList.map((content, i) => {
        return (
          <div key={i}>
            content: {content}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default List;
