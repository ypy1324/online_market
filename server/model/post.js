const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  postNum: Number,
  image: String,
});

const post = mongoose.model("post", postSchema);

module.exports = { post };