const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const imageRouter = express.Router();
const Image = require("../models/imageModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage }).single("file");

imageRouter.post("/upload", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log("instance of");
      return res.status(500).send(err);
    } else if (err) {
      console.log("error here");
      return res.status(500).send(err);
    }
    console.log("all good here");
    return res.status(200).send(req.file);
  });
});

imageRouter.get("/image", auth, async (req, res) => {
  try {
    const img = await Image.find({});

    if (!img) throw new Error();

    res.send(img);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = imageRouter;
