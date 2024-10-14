import React, { useState, useEffect } from "react";

function Upload(props) {
  const [content, setContent] = useState("");

  const onSubmit = () => {
    let tempArr = [...props.contentList];
    tempArr.push(content);
    props.setContentList([...tempArr]);
    setContent("");
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.currentTarget.value);
        }}
      />
      <button
        onClick={(e) => {
          onSubmit(content);
        }}
      >
        submit
      </button>
    </div>
  );
}

export default Upload;
