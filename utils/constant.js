const UNAUTH_MSG = "🤖 Unauthorized User 🤖 Use /register to get started.";
const START = "/start";
const REGISTER = "/register";
const GET_TOKEN = "/get_token";
const SET_ALERT = "/set_alert";
const LIST_ALERTS = "/list_alerts";
const REMOVE_ALERT = "/remove_alert";
const COMMANDS = [
  {
    command: START,
    description: "welcome message to get started",
  },
  {
    command: REGISTER,
    description: "register new user to bot",
  },
  {
    command: GET_TOKEN,
    description: "get provided token data <token_symbol> e.g. ethereum",
  },
  {
    command: SET_ALERT,
    description:
      "set alert for the provided token <token_symbol> e.g. ethereum <price_threshold> e.g. 99.23",
  },
  {
    command: LIST_ALERTS,
    description: "to view all created token alerts",
  },
  {
    command: REMOVE_ALERT,
    description: "remove alert for the provided token <alert_id>  e.g. 123456",
  },
];

module.exports = {
  UNAUTH_MSG,
  START,
  REGISTER,
  GET_TOKEN,
  SET_ALERT,
  LIST_ALERTS,
  REMOVE_ALERT,
  COMMANDS,
};
