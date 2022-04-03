const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
  country: {
    type: String,
    unique: true,
  },
  winner: {
    type: Boolean,
    default: false,
  },
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
