const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { registerRules, validation } = require("../middelwares/validator");
const isAuth = require("../middelwares/passport");

// POST
//REGISTER

router.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastName, email, password, isAdmin, phone } = req.body;
  try {
    const newUser = new User({
      name,
      lastName,
      email,
      password,
      isAdmin,
      phone,
    });

    // check if the email exist
    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "email already exist" });
    }

    //hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    newUser.password = hashedPassword;

    //save the user
    const newUserToken = await newUser.save();
    res.send({ result: newUserToken, msg: "user added" });
  } catch (error) {
    res.status(500).send(" can not save the user...");
    console.log(error);
  }
});

//get current user
router.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});
// get all users
router.get("/get", async (req, res) => {
  try {
    let result = await User.find();
    res.send({ users: result, msg: "all users" });
  } catch (error) {
    console.log(error);
  }
});

//Put methode update user
router.put("/update/:id", async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { ...req.body } }
    );
    res.status(200).send({ newProfile: result, msg: "profile updated.." });
  } catch (error) {
    res.status(500).send("cannot update the profile..");
    console.log(error);
  }
});

// delete user

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    let result = await User.findOneAndRemove({
      _id: req.params.id,
    });

    res.send({ msg: "user deleted" });
  } catch (error) {
    res.status(500).send("cannot delete user..");
    console.log(error);
  }
});

module.exports = router;
