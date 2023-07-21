const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  mail: String,
  country: String,
  state: String,
  city: String,
  gender: String,
  dob: String,
  age: Number,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
