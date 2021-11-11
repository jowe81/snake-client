// constants.js: The client can be configured here

const CONNECT_TO = {

  //Game Server Address
  IP: 'localhost',
  PORT: 50541,

};

const KEY_BINDINGS = {

  //Navigation key mapping
  NAVIGATION : {
    UP: 'w',
    LEFT: 'a',
    DOWN: 's',
    RIGHT: 'd',
  },

  //Free-text messaging mode
  TYPE_MESSAGE: '~',

  //EXIT
  EXIT: 'q',

  //Canned messages map (keys must be digits)
  CANNED_MESSAGES : {
    0:"Good morning!",
    1:"How's the weather?",
    2:"Let's go for drinks!",
    3:"I'll win this game!",
    4:"This project's fun!",
    5:"How's your day?",
    6:"Had enough yet?",
    7:"Need a break, c'ya!",
    8:"My internet sucks!",
    9:"I'm so hungry!",
  },

};

//Player initials (can be overridden by command line argument)
const PLAYER_INITIALS = 'JW';

module.exports = { CONNECT_TO, KEY_BINDINGS, PLAYER_INITIALS };