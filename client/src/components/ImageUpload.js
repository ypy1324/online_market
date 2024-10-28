import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function ImageUpload(props) {
  const fileUpload = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post("/api/post/imageUpload", formData)
      .then((res) => {
        props.setImage(res.data.filePath);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => {
          fileUpload(e);
        }}
      />
    </div>
  );
}

export default ImageUpload;
