const express = require("express");
const router = express.Router();
const multer = require("multer");
const { post } = require("../model/post");
const { counter } = require("../model/counter");

router.post("/submit", (req, res) => {
  let temp = req.body;
  counter
    .findOne({ name: "counter" })
    .exec()
    .then((count) => {
      temp.postNum = count.postNum;
      const newPost = new post(temp);
      newPost.save().then(() => {
        counter
          .updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
          .then(() => {
            res.status(200).json({ success: true });
          });
      });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});

router.post("/list", (req, res) => {
  post
    .find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});

router.post("/detail", (req, res) => {
  post
    .findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  post
    .updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  post
    .deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/imageUpload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});

module.exports = router;
