const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/key");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/images", express.static("./images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", require("./router/post"));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
