const express = require("express");
const multer = require("multer");

const auth = require("../middleware/auth");
const imageRouter = express.Router();
const Image = require("../models/imageModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
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
        data: "/uploads/" + imgFile.filename,
        contentType: imgFile.mimetype,
      },
      owner: _id,
    });

    await img.save();

    res.status(200).send("/uploads/" + img.name);
  } catch (e) {
    console.log(e);
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
    //console.log(img.data.toString());
    let { data } = img;

    res.send(data);

    //res.sendFile(path.join(_dirname + "/" + img.name));
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = imageRouter;
