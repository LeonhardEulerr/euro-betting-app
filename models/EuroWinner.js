const mongoose = require("mongoose");
const { Schema } = mongoose;

const EuroWinerSchema = new Schema({
  user: {
    type: String,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const EuroWinner = mongoose.model("EuroWinner", EuroWinerSchema);
module.exports = EuroWinner;
