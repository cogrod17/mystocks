const express = require("express");
require("../database/mongoose"); //without this cannot create endpoints
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const imageRouter = require("../routers/imageRouter");
const userRouter = require("../routers/userRouter");

app.use(express.json()); //for parsing json

app.use(cors());

//using customized router
app.use(userRouter);
app.use(imageRouter);

app.listen(port, () => {
  console.log("Node is up on port" + port);
});
