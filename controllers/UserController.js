const User = require("../models/User");

const getUsers = (req, res, _next) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json({ users });
  });
};

const getUsername = (req, res, next) => {
  console.log(req.user.login);
  res.status(200).json({ user: req.user.login });
};

module.exports = { getUsers, getUsername };
