const mongoose = require("mongoose");
const { Schema } = mongoose;

const RealEuroWinnerSchema = new Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const RealEuroWinner = mongoose.model("RealEuroWinner", RealEuroWinnerSchema);
module.exports = RealEuroWinner;
