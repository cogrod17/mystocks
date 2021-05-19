const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

//Create a new user
router.post("/users/create", async (req, res) => {
  const user = await new User(req.body);
  try {
    await user.save();
    const token = await user.giveAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Log In User
router.post("/users/login", async (req, res) => {
  try {
    const password = req.body.password;
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) throw new Error("incorrect email or password");

    //boolean
    //.compare(password input, actual password)
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) throw new Error("incorrect email or password");

    const token = await user.giveAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: "error in catch" });
  }
});

//read profile
router.get("/users/profile", auth, async (req, res) => {
  res.send(req.user);
});

//Updating users
router.patch("/users/update", auth, async (req, res) => {
  //only allow some fields to be updated
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "username",
    "password",
    "email",
    "favQuote",
    "savedStocks",
  ];
  const isValid = updates.every((key) => allowedUpdates.includes(key));

  if (!isValid) res.status(400).send({ error: "Invalid Updates" });

  try {
    updates.forEach((key) => (req.user[key] = req.body[key]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

//log out user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token !== token.token;
    });

    await req.user.save();
    res.send("logged out successfully");
  } catch (e) {
    res.status(500).send();
  }
});

//deleting
router.delete("/users/profile", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
