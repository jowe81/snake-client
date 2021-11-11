//Game Server Address
const IP = 'localhost';
const PORT = 50541;

//Navigation key mapping
const NAV_KEYS = {
  UP: 'w',
  LEFT: 'a',
  DOWN: 's',
  RIGHT: 'd',
};

//Key mapping for free-text messaging mode
const MESSAGE_KEY = '0';

//Canned messages key mapping (keys must be digits)
const CANNED_MESSAGES = {
  1:"How's the weather?",
  2:"Let's go for drinks!",
  3:"I'll win this game!",
  4:"This project's fun!",
  5:"How's your day?",
  6:"Had enough yet?",
  7:"Need a break, c'ya!",
  8:"My internet sucks!",
  9:"I'm so hungry!",
};

//Player initials (can be overridden by command line argument)
const INITIALS = 'JW';

module.exports = { IP, PORT, CANNED_MESSAGES, NAV_KEYS, MESSAGE_KEY };