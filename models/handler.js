const { userModel } = require("./model");

async function getUsers() {
  return await userModel.find();
}

async function getUser(userId) {
  return await userModel.findOne({ userId });
}

async function registerUser(userId, chatId, username, alerts) {
  await userModel.create({ userId, chatId, username, alerts });
}

async function addUserAlert(userId, token, threshold) {
  await userModel.updateOne(
    { userId },
    { $push: { alerts: { token, threshold } } }
  );
}

module.exports = { getUsers, getUser, registerUser, addUserAlert };
