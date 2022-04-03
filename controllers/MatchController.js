const Match = require("../models/Match");
const UserMatch = require("../models/UserMatch");

const addMatch = (req, res, next) => {
  if (
    !req.body.date ||
    !req.body.homeId ||
    !req.body.awayId ||
    !req.body.group
  ) {
    res.status(400).json("Match could nopt be added");
    return;
  }

  let match = new Match({
    date: req.body.date,
    homeTeam: req.body.homeId,
    awayTeam: req.body.awayId,
    group: req.body.group,
  });

  match
    .save()
    .then((match) => {
      res.status(200).json({
        id: match._id,
        message: "Match added successfully!",
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: "Match could not be added!",
      });
    });
};

const getMatches = (req, res, next) => {
  Match.find({})
    .sort([["date", 1]])
    .populate("homeTeam")
    .populate("awayTeam")
    .exec()
    .then((matches) => {
      if (matches) {
        res
          .status(200)
          .json({ message: "Matches fetched successfully.", matches });
      } else {
        res.status(400).json({ message: "Matches coudnt be fecthed." });
      }
    });
};
const updateMatchResult = (req, res, next) => {
  console.log(req.body);
  if (!req.body.homeGoals || !req.body.awayGoals) {
    res.status(400).json({
      message: "Matche coudnt be updated.",
    });
    return;
  }

  // if extra time was not fully provided
  if (req.body.et && (!req.body.etHome || !req.body.etAway)) {
    res.status(400).json({
      message: "Matche coudnt be updated.",
    });
    return;
  }

  let result;
  if (req.body.homeGoals > req.body.awayGoals) {
    result = "1";
  } else if (req.body.homeGoals < req.body.awayGoals) {
    result = "2";
  } else {
    result = "0";
  }

  let match = {
    homeGoals: req.body.homeGoals,
    awayGoals: req.body.awayGoals,
    etHome: req.body.et ? req.body.etHome : null,
    etAway: req.body.et ? req.body.etAway : null,
    result,
  };

  Match.findOneAndUpdate({ _id: req.params.id }, match)
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

const addUserMatch = (req, res, next) => {
  let userMatch = new UserMatch({
    match: req.body.id,
    user: req.body.user,
    homeGoals: req.body.homeGoals,
    awayGoals: req.body.awayGoals,
    result: req.body.result,
  });

  userMatch
    .save()
    .then((_usersMatch) => {
      res.status(200).json({
        message: "Users match added successfully!",
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: "Users match could not be added!",
      });
    });
};

const getUserMatches = (req, res, next) => {
  UserMatch.find({ user: req.user.login })
    .populate({
      path: "match",
      options: { sort: { date: "asc" } },
      populate: { path: "homeTeam" },
    })
    .populate({
      path: "match",
      populate: { path: "awayTeam" },
    })
    .exec()
    .then((matches) => {
      if (matches) {
        res
          .status(200)
          .json({ message: "User matches fetched successfully.", matches });
      } else {
        res.status(400).json({ message: "User matches coudnt be fecthed." });
      }
    });
};

const getUserMatchesRanking = (req, res, next) => {
  UserMatch.find({ user: req.params.user })
    .populate({
      path: "match",
      populate: { path: "homeTeam" },
    })
    .populate({
      path: "match",
      populate: { path: "awayTeam" },
    })
    .exec()
    .then((matches) => {
      if (matches) {
        res
          .status(200)
          .json({ message: "User matches fetched successfully.", matches });
      } else {
        res.status(400).json({ message: "User matches coudnt be fecthed." });
      }
    });
};

const updateUserMatch = (req, res, next) => {
  if (!req.body.homeGoals || !req.body.awayGoals || !req.body.result) {
    res.status(400).json({
      message: "Match coudnt be updated.",
    });
    return;
  }

  let match = {
    homeGoals: req.body.homeGoals,
    awayGoals: req.body.awayGoals,
    result: req.body.result,
  };

  UserMatch.findOneAndUpdate({ _id: req.params.id }, match)
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
  addMatch,
  getMatches,
  updateMatchResult,
  addUserMatch,
  getUserMatches,
  updateUserMatch,
  getUserMatchesRanking,
};
