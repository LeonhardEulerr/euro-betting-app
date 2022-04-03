const mongoose = require("mongoose");
const { Schema } = mongoose;

const MatchSchema = new Schema({
  date: {
    type: Date,
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  homeGoals: {
    type: Number,
    default: null,
  },
  awayGoals: {
    type: Number,
    default: null,
  },
  etHome: {
    type: Number,
    default: null,
  },
  etAway: {
    type: Number,
    default: null,
  },
  result: {
    type: String,
    enum: ["1", "0", "2"],
  },
  group: { type: String },
});

const Match = mongoose.model("Match", MatchSchema);
module.exports = Match;
