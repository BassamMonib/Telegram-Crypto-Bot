require("dotenv").config();
const mongoose = require("mongoose");
const { bot } = require("./utils/instance");
const {
  START,
  REGISTER,
  GET_TOKEN,
  SET_ALERT,
  LIST_ALERTS,
  REMOVE_ALERT,
  COMMANDS,
} = require("./utils/constant");
const {
  register,
  start,
  getTokenData,
  setAlert,
  listAlert,
  removeAlert,
  alertUser,
} = require("./utils/bot");

// Bot command listeners
bot.onText(new RegExp(`${START}`), start);
bot.onText(new RegExp(`${REGISTER}`), register);
bot.onText(new RegExp(`${GET_TOKEN} (.+)`), getTokenData);
bot.onText(new RegExp(`${SET_ALERT} (.+) (.+)`), setAlert);
bot.onText(new RegExp(`${LIST_ALERTS}`), listAlert);
bot.onText(new RegExp(`${REMOVE_ALERT} (.+)`), removeAlert);

// Check alerts periodically and notify users if thresholds are crossed
setInterval(alertUser, 60000); // Check every minute

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Database Connected!");
    await bot.setMyCommands(COMMANDS);
    await bot.startPolling();
    console.log("Bot polling...");
  })
  .catch((err) => console.error(err));
