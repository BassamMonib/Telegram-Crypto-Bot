const axios = require("axios");
const { bot } = require("./instance");
const { UNAUTH_MSG } = require("./constant");
const {
  getUser,
  registerUser,
  addUserAlert,
  getUsers,
} = require("../models/handler");

// Function to fetch token data from CoinGecko API
async function fetchTokenData(tokenSymbol) {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    { params: { vs_currency: "usd", ids: tokenSymbol } }
  );
  if (response.data.length == 0) throw new Error("Token not found");
  return response.data[0];
}

// Function to start interaction with the bot
async function start(msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (!(await getUser(userId))) return bot.sendMessage(chatId, UNAUTH_MSG);
  bot.sendMessage(chatId, "Welcome to the Crypto Bot!");
}

// Function to register a new user
async function register(msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (await getUser(userId))
    return bot.sendMessage(chatId, "Already registered !");
  await registerUser(userId, chatId, msg.from.username, []);
  bot.sendMessage(chatId, "User registered successfully!");
}

// Function to get the number of holders for a given token
async function getTokenHolders(tokenSymbol) {
  const response = (
    await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenSymbol}`)
  ).data;
  if (response.platforms) {
    if (response.platforms["ethereum"]) {
      const res = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/erc20/${response.platforms["ethereum"]}/owners`,
        {
          params: {
            chain: "eth",
            order: "DESC",
          },
          headers: {
            Accept: "application/json",
            "X-API-Key": process.env.MORALIS_API,
          },
        }
      );
      return Array.from(res.data.result).length;
    }
  }
  return "N/A";
}

// Function to get token data based on user input
async function getTokenData(msg, match) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const tokenSymbol = match[1];
  if (!(await getUser(userId))) return bot.sendMessage(chatId, UNAUTH_MSG);
  try {
    bot.sendMessage(chatId, "Fetching token data...");
    const tokenData = await fetchTokenData(tokenSymbol);
    bot.sendMessage(
      chatId,
      `Symbol: ${tokenData.symbol.toUpperCase()}\n` +
        `Current Price: $${tokenData.current_price}\n` +
        `Holders: ${await getTokenHolders(tokenSymbol)}\n` +
        `Market Cap: $${tokenData.market_cap}\n` +
        `24h Trading Volume: $${tokenData.total_volume}\n` +
        `Price Change (24h): ${tokenData.price_change_percentage_24h}%`
    );
    return tokenData;
  } catch (err) {
    bot.sendMessage(chatId, err.message);
  }
}

// Function to set an alert for a specific token price
async function setAlert(msg, match) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  if (!(await getUser(userId))) return bot.sendMessage(chatId, UNAUTH_MSG);
  const tokenSymbol = match[1];
  const priceThreshold = parseFloat(match[2]);
  await addUserAlert(userId, tokenSymbol, priceThreshold);
  bot.sendMessage(chatId, `Alert set for ${tokenSymbol} at $${priceThreshold}`);
}

// Function to list all alerts for the user
async function listAlert(msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = await getUser(userId);
  if (!user) return bot.sendMessage(chatId, UNAUTH_MSG);
  if (user.alerts.length > 0) {
    let alertList = "";
    user.alerts.forEach((alert, index) => {
      alertList += `${index + 1}. Token: ${alert.token}, Threshold: $${
        alert.threshold
      }\n`;
    });
    bot.sendMessage(msg.chat.id, alertList);
  } else bot.sendMessage(msg.chat.id, "No alerts found.");
}

// Function to remove a specific alert
async function removeAlert(msg, match) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const user = await getUser(userId);
  if (!user) return bot.sendMessage(chatId, UNAUTH_MSG);
  const alertId = parseInt(match[1]) - 1;
  if (user.alerts.length > alertId) {
    user.alerts.splice(alertId, 1);
    await user.save();
    bot.sendMessage(msg.chat.id, "Alert removed.");
  } else bot.sendMessage(msg.chat.id, "Invalid alert ID.");
}

// Function to alert users if their price thresholds are crossed
async function alertUser() {
  try {
    (await getUsers()).forEach(async (user) => {
      for (let alert of user.alerts) {
        if (
          (await fetchTokenData(alert.token)).current_price >= alert.threshold
        ) {
          bot.sendMessage(
            user.chatId,
            `Alert! ${alert.token} has crossed $${alert.threshold}`
          );
        }
      }
    });
  } catch (err) {
    bot.sendMessage(chatId, err.message);
  }
}

module.exports = {
  start,
  register,
  getTokenData,
  setAlert,
  listAlert,
  removeAlert,
  alertUser,
};
