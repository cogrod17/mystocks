const express = require("express");
const multer = require("multer");
const fs = require("fs");
const auth = require("../middleware/auth");
const imageRouter = express.Router();
const Image = require("../models/imageModel");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage }).single("file");

imageRouter.post("/upload", auth, upload, async (req, res) => {
  console.log(req.user._id);
  let imgFile = req.file;
  let { _id } = req.user;
  //console.log(req.user);
  //let { _id } = req.user;
  // const up = await upload(req, res, async (err) => {
  //   if (err instanceof multer.MulterError) throw new Error("multer");
  //   if (err) throw new Error(err);
  //   console.log("all good here");
  //   res.status(200).send();
  //   // console.log(req.file);
  // });
  //console.log(req.file);

  try {
    //console.log(imgFile);
    //console.log(fs);
    console.log(path);
    const img = await new Image({
      name: imgFile.filename,
      img: {
        data: path.join(__dirname + "/" + imgFile.path),
        contentType: imgFile.mimetype,
      },
      owner: _id,
    });
    console.log("right before save");
    await img.save();
    console.log("almost buddy");
    res.status(200).send({ img });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
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
