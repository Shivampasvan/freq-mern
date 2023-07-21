const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../Model/user.model");

userRouter.get("/get", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post("/add", async (req, res) => {

  const {mail} = req.body
  const useremailfound = await UserModel.find({mail})
  if (useremailfound.length === 0){
  try {
    const { fname, lname, mail, country, state, city, gender, dob, age } =
      req.body;
    const user = new UserModel({
      fname,
      lname,
      mail,
      country,
      state,
      city,
      gender,
      dob,
      age,
    });
    await user.save();
    res.status(200).send("User's data added to the database !!");
  } catch (error) {
    res.status(400).send(error.msg);
  }}else{
    res.status(401).send("User Already Registered with this email");
  }
});

module.exports = {
  userRouter,
};
