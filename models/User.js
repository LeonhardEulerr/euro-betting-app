const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
