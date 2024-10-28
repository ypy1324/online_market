const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: String,
  postNum: Number,
});

const counter = mongoose.model("counter", counterSchema);

module.exports = { counter };
