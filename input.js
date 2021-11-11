//Get logging function from "log" module
const { cl } = require('./log');
//Get array with canned messages from "constants" module
const { CANNED_MESSAGES, NAV_KEYS, MESSAGE_KEY } = require('./constants');

let _connection;
let _typingMessage = false;
let _message = "";

//Send a move command
const move = (direction) => {
  if (['up', 'down', 'left', 'right'].includes(direction)) {
    //This is a valid direction - send the command
    cl(`Sending the Move: ${direction} command`);
    _connection.write(`Move: ${direction}`);
  }
};

const sendMessage = (message) => {
  cl(`Sending message: ${message}`);
  _connection.write(`Say: ${message}`);
};

const setupInput = (conn) => {
  _connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf-8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

const handleUserInput = (data) => {
  //Check for CTRL+C
  if (data === '\u0003') {
    cl("CTRL+C received - goodbye!", "Stdin");
    process.exit();
  }
  //Check if we're currently typing a message
  if (!_typingMessage) {
    //Not in message mode, check for move command keys
    switch (data) {
    case NAV_KEYS.UP:
      move('up');
      break;
    case NAV_KEYS.LEFT:
      move('left');
      break;
    case NAV_KEYS.DOWN:
      move('down');
      break;
    case NAV_KEYS.RIGHT:
      move('right');
      break;
    case MESSAGE_KEY:
      //Enter message mode
      _typingMessage = true;
      cl("Start typing message","Stdin");
    }
    //Check for digit other than 0, and send canned message
    if (/[1-9]/.test(data)) {
      cl(`Selected canned message: ${CANNED_MESSAGES[data]}`,"Stdin");
      sendMessage(CANNED_MESSAGES[data]);
    }
  } else {
    //Currently typing a message - add to message until exiting with "0" key
    if (data !== "0") {
      //Add to message
      _message += data;
    } else {
      //Exit key pressed - send message and leave messaging mode
      sendMessage(_message);
      _message = "";
      _typingMessage = false;
    }
  }
};

module.exports = { setupInput };