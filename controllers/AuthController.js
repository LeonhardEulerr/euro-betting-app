const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validate = (req, res, next) => {
  // middleware will not come here if user wasnt authenticated
  User.findOne({ login: req.user.login }).then((user) => {
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(400).json({
        message: "No user found!",
      });
    }
  });
};

const register = (req, res, next) => {
  let user = new User({
    login: req.body.login,
  });

  user
    .save()
    .then((user) => {
      let token = jwt.sign({ login: user.login }, process.env.SECRET_JWT);
      res.status(200).json({
        message: "User added successfully!",
        token,
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: "User already exists",
      });
    });
};

const login = (req, res, next) => {
  var login = req.body.login;

  User.findOne({ login: login }).then((user) => {
    if (user) {
      let token = jwt.sign({ login: user.login }, process.env.SECRET_JWT);
      res.status(200).json({
        message: "Login successful!",
        token,
      });
    } else {
      res.status(400).json({
        message: "No user found!",
      });
    }
  });
};

module.exports = {
  register,
  login,
  validate,
};
