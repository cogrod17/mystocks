const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
