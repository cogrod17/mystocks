const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const imageRouter = express.Router();
const Image = require("../models/imageModel");

const storage = multer.memoryStorage({
  limits: {
    fileSize: 1000000,
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("file");

imageRouter.post("/upload", auth, upload, async (req, res) => {
  let imgFile = req.file;

  let { _id } = req.user;

  try {
    const img = await new Image({
      name: imgFile.filename,
      img: {
        data: imgFile.buffer.toString("base64"),
        contentType: imgFile.mimetype,
      },
      owner: _id,
    });

    await img.save();

    res.status(200).send(img.img.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

imageRouter.get("/image", auth, async (req, res) => {
  let { _id } = req.user;
  try {
    const [{ img }] = await Image.find({
      owner: _id,
    });

    if (!img) throw new Error();

    res.send(img.data);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = imageRouter;
