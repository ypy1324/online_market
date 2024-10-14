const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://ypy1324:ypy1324@cluster0.j0n30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
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

app.post("/api/test", (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true, text: "hi" });
});
