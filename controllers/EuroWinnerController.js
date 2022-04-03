const EuroWinner = require("../models/EuroWinner");
const RealEuroWinner = require("../models/RealEuroWinner");

const addEuroWinner = (req, res, next) => {
  let eurowinner = new EuroWinner({
    user: req.body.login,
    team: null,
  });

  eurowinner
    .save()
    .then((_eurowinner) => {
      res.status(200).json({
        message: "Eurowinner added successfully!",
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: "EuroWinner could not be added!",
      });
    });
};

const getEuroWinner = (req, res, next) => {
  EuroWinner.findOne({ user: req.user.login })
    .populate("team")
    .exec()
    .then((eurowinner) => {
      if (eurowinner) {
        res
          .status(200)
          .json({ message: "Matches fetched successfully.", eurowinner });
      } else {
        res.status(400).json({ message: "Matches coudnt be fetched." });
      }
    });
};

const updateEuroWinner = (req, res, next) => {
  console.log("eurowinner", req.body.winner);
  console.log("id", req.params.id);
  if (!req.body.winner) {
    res.status(400).json({
      message: "Matche coudnt be updated.",
    });
    return;
  }

  let eurowinner = {
    team: req.body.winner,
  };

  EuroWinner.findOneAndUpdate({ _id: req.params.id }, eurowinner)
    .exec()
    .then((m) => {
      if (m) {
        res.status(200).json({
          message: "Match updated successfully",
        });
      } else {
        res.status(400).json({
          message: "Matche coudnt be updated.",
        });
      }
    })
    .catch((_e) => {
      res.status(400).json({
        message: "Matche coudnt be updated.",
      });
    });
};

module.exports = {
  getEuroWinner,
  addEuroWinner,
  updateEuroWinner,
};
