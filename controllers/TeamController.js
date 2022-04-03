const Team = require("../models/Team");

const addTeam = (req, res, next) => {
  let team = new Team({
    country: req.body.country,
  });

  team
    .save()
    .then((_team) => {
      res.status(200).json({
        message: "Team added successfully!",
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: "Team could not be added!",
      });
    });
};

const getTeams = (req, res, _next) => {
  Team.find({}).exec((err, teams) => {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json({ teams });
  });
};

const getRealEuroWinner = (req, res, next) => {
  Team.findOne({ winner: true }).exec((err, team) => {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json({ winner: team });
  });
};

const updateRealEuroWinner = (req, res, next) => {
  if (!req.body.country) {
    res.status(400).json({
      message: "Team coudnt be updated.",
    });
    return;
  }

  let team = {
    winner: true,
  };

  Team.updateMany({ winner: true }, { winner: false }).exec((err) => {
    if (!err) {
      Team.findOneAndUpdate({ country: req.body.country }, team)
        .exec()
        .then((m) => {
          if (m) {
            res.status(200).json({
              message: "Team updated successfully",
            });
          } else {
            res.status(400).json({
              message: "Team coudnt be updated.",
            });
          }
        })
        .catch((_e) => {
          res.status(400).json({
            message: "Team coudnt be updated.",
          });
        });
    } else {
      res.status(400).json({ message: "Could not add euro winner" });
    }
  });
};

module.exports = { addTeam, getTeams, getRealEuroWinner, updateRealEuroWinner };
