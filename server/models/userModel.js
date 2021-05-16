const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validator: (value) => {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [7, "Password must be at least 7 characters"],
  },
  savedStocks: [],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.giveAuthToken = async function () {
  //this is attached to the User instance
  //generates token using user _id
  const token = jwt.sign({ _id: this._id.toString() }, "secret");
  //adds the token to the user instance
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

//return the user information without exposing password and tokens
//.toJSON runs whenever you res.send()
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

//runs if .save() is called
//checks to see if the password has beeen updated, if so it hashes it
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
