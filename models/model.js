const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  chatId: Number,
  username: String,
  alerts: [
    {
      token: String,
      threshold: Number,
    },
  ],
});

module.exports = {
  userModel: mongoose.model("User", userSchema),
};
