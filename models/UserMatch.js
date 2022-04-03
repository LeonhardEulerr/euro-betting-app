const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserMatchSchema = new Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  user: {
    type: String,
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
});

const UserMatch = mongoose.model("UserMatch", UserMatchSchema);
module.exports = UserMatch;
