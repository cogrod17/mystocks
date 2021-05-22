const mongoose = require("mongoose");

//DONT FORGET TO ADD THE DB NAME OT END OF URL
// const connectionURL = "mongodb://127.0.0.1:27017/generic_auth";
const connectionURL = "mongodb://127.0.0.1:27017/up-my-stock";

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log("database not cannot");
  });
